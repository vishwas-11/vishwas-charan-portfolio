# PageIndex: How a YouTube Rabbit Hole Led Me to Vectorless RAG

## Where this started

I've been building a Retrieval Augmented Generation pipeline recently — nothing exotic, the usual setup. Chunk the documents, embed them, throw the vectors into a database, retrieve the top-k matches at query time, stuff them into the prompt. It works, mostly. But the more I pushed it against longer, denser documents, the more I started noticing a pattern that was hard to ignore: the retriever kept pulling back text that *sounded* like the question but didn't actually *answer* it. Numbers were near numbers. Section headers matched section headers. But the actual answer — the one buried in an appendix three "see also" references away — never showed up.

I didn't have a name for the problem yet. I just knew my retrieval step was the weak link, not the model.

Then, scrolling through my recommendations one evening, I landed on a video by [Piyush Garg](https://youtu.be/f3zHina9MTo?si=99C13WCos-_Xr8n_). I went in expecting another "build a RAG app in 20 minutes" tutorial, and instead walked away with a completely different mental model of retrieval — one that didn't route through embeddings and cosine similarity at all. The idea, roughly: what if the model retrieved information the way a person does — by opening a document, glancing at the table of contents, and *reasoning* about which section is worth reading, rather than pattern-matching on vocabulary?

That sent me down a rabbit hole into [PageIndex](https://pageindex.ai/blog/pageindex-intro) and its [GitHub repo](https://github.com/VectifyAI/PageIndex). A few hours of reading later, I had enough of a picture to want to write it down properly — partly for my own notes, partly because I think this is a genuinely useful shift in how to think about retrieval, and partly because I'm still learning this space and writing tends to be how I actually understand something.

So here's what I found, explained the way I wish someone had explained it to me first: intuition before jargon.

---

## First, the intuition: why does RAG exist at all?

Every LLM has a context window — a hard cap on how much text it can look at in one go. Even as these windows have grown into the hundreds of thousands of tokens, there's a second, sneakier problem: just because a model *can* fit a document in context doesn't mean it reasons well over all of it. This is sometimes called "context rot" — performance quietly degrades as the stuffed context grows, even when nothing is technically truncated.

![The context window problem](/images/article/the-context-window-problem.svg)

So instead of feeding a model an entire 200-page filing, RAG tries to hand it just the handful of paragraphs that actually matter for the question being asked. That's the whole premise. The question is *how* you decide which paragraphs those are — and it turns out the popular answer has some real cracks in it.

---

## How I'd been doing it: vector-based RAG, and where it quietly breaks

![Vector-based RAG pipeline](/images/article/vector-based-rag-pipeline.svg)

The standard pipeline looks like this: split the document into chunks, embed each chunk into a vector, store those vectors in a database like Chroma or Pinecone, then embed the incoming query and pull back whatever chunks sit closest to it in vector space. It's elegant, fast, and honestly works fine for a lot of use cases — short documents, FAQ-style retrieval, casual search.

But once I sat down and actually listed out where it was failing me, a few recurring issues showed up, and they map closely to what I read afterward on PageIndex's blog:

- **Queries express intent, not content.** A question like "how did liabilities trend this year?" doesn't necessarily share vocabulary with the paragraph that answers it. Semantic similarity assumes it does. It often doesn't.
- **Similar isn't the same as relevant.** This gets worse in domain-heavy documents — legal filings, financial reports, technical manuals — where dozens of passages can *sound* alike while only one of them is actually the one you need.
- **Hard chunking cuts through meaning.** Splitting text into fixed 512- or 1000-token blocks doesn't respect sentence or section boundaries. You can end up with a chunk that starts mid-sentence and a table separated from its own caption.
- **No memory of the conversation.** Each query gets embedded and searched in isolation, so a natural multi-turn flow ("what about last year?" as a follow-up) doesn't carry context into retrieval the way it should.
- **In-document references get lost.** Documents constantly say things like "see Appendix G" or "refer to Table 5.3." Those phrases don't share any semantic similarity with the appendix itself, so a similarity search walks right past the cross-reference.

None of these are exotic edge cases — they're the everyday reality of working with real documents. And they're exactly why my retrieval kept surfacing text that was topically adjacent but not actually the answer.

---

## The idea PageIndex is built on

Here's the reframe that clicked for me after watching that video and reading through PageIndex's writeup: **stop treating retrieval as a search problem and start treating it as a navigation problem.**

Think about how you'd actually find something in a 300-page annual report. You wouldn't skim every paragraph looking for similar-sounding text. You'd open the table of contents, read the section titles, make a judgment call about which section probably has your answer, jump there, and — if it turns out to be incomplete — follow a cross-reference or backtrack and try a different section. That's a reasoning process, not a similarity search.

PageIndex tries to get an LLM to do exactly that. Instead of pre-computing embeddings for chunks and storing them externally, it builds a **table-of-contents tree** for the document — a hierarchical, JSON-structured index where each node represents a section, carries a short summary, and links to its sub-sections. Critically, this tree lives *inside the model's context window* as something the model can directly read and reason over, rather than sitting in an external vector store the model never actually "sees." PageIndex's team calls this an **in-context index**.

![ToC tree structure](/images/article/toc-tree-structure.svg)

Each node maps to a `node_id`, and that `node_id` maps to the actual raw content — text, tables, images — so once the model decides a section is worth opening, it can pull the real content for that node on demand.

### The retrieval loop, step by step

![PageIndex reasoning loop](/images/article/pageindex-reasoning-loop.svg)

1. **Read the table of contents** — get an overview of how the document is structured.
2. **Select a section** that seems most likely to contain the answer, based on reasoning about the question, not keyword overlap.
3. **Extract relevant information** from that section.
4. **Check sufficiency** — does this actually answer the question? If not, loop back and pick another section (this is also where following a cross-reference like "see Appendix G" comes in naturally, since the model can just navigate the tree to that node).
5. **Answer** once enough has been gathered.

It's iterative and agentic rather than a single similarity lookup — closer to how Claude Code reasons about which files to open in a codebase than to a classic vector search.

### Why this actually addresses the five problems above

Going back to the list of vector-RAG pain points, the reasoning-based approach handles them fairly directly:

- **Intent vs. content mismatch** — the model can infer "debt trends are probably in the financial summary or Appendix G" even if those exact words never appear in the query.
- **Similarity ≠ relevance** — the model is reading and judging section *meaning*, via summaries and titles, not just matching surface text.
- **Hard chunking** — retrieval happens at the level of whole, coherent sections rather than arbitrary token windows, so meaning doesn't get sliced mid-sentence.
- **Chat history** — because this all happens through reasoning inside the same context, prior turns in a conversation can naturally inform which section gets opened next.
- **Cross-references** — following "see Appendix G" is just tree navigation, something a similarity search structurally cannot do since a reference phrase shares no semantic overlap with the section it's pointing to.

One example from PageIndex's own writeup stuck with me: a question about total deferred asset value only had its *increase* reported in the main section, with the actual total tucked away in "Appendix G — Statistical Tables," referenced by a single line of text on an unrelated page. A similarity search has basically no way to find that. A reasoning-based retriever that can read "see Appendix G" and navigate there does.

---

## Where I think this fits — and where it doesn't replace vector search

I want to be careful not to oversell this, because I don't think it's a strict upgrade in every situation, and PageIndex's own material doesn't claim that either. A few honest caveats from working through this:

- **Vector RAG is still simpler and cheaper for short, flat content.** FAQs, chat logs, short articles — content without much internal structure doesn't benefit much from a ToC-style tree, and a similarity search is faster and cheaper to run.
- **Reasoning-based retrieval costs more per query.** Iterating through a reasoning loop, potentially multiple times, means more LLM calls than a single embedding lookup. For very high-throughput, low-latency retrieval at scale, that tradeoff matters.
- **It depends on the document having real structure.** The whole approach leans on there being a meaningful table of contents or hierarchy to reason over. Unstructured blobs of text without natural sections don't give the model much to navigate.
- **The two approaches aren't mutually exclusive.** It's easy to imagine hybrid setups — using structure-aware navigation for long, hierarchical documents (financial reports, legal filings, technical manuals) while keeping vector search around for flatter, high-volume content.

So my current read is: this is the right tool specifically for *long, structured, reference-heavy documents* — the exact category that traditional RAG struggles with — rather than a universal replacement for vector search everywhere.

---

## Where I'm at with this

I haven't wired PageIndex into my own project yet — right now I'm still at the "read the blog, skim the repo, watch the video twice" stage. But the reframe from "search for similar text" to "reason about where to look" is one of those ideas that's hard to unsee once you've internalized it, and it's already changing how I think about the retrieval layer I'm building.

If you've actually used PageIndex, or something like it — a reasoning-based or structure-aware retriever — in a real pipeline, I'd genuinely like to hear how it held up: latency, cost, failure modes, anything that didn't show up in the marketing writeup. I'm still very much learning this part of the RAG landscape, and comparing notes with other people building in this space is exactly how I've made sense of it so far.

*References: [PageIndex blog — "Next-Generation Vectorless, Reasoning-based RAG"](https://pageindex.ai/blog/pageindex-intro), [VectifyAI/PageIndex on GitHub](https://github.com/VectifyAI/PageIndex), and the video that started this for me — [Piyush Garg on YouTube](https://youtu.be/f3zHina9MTo?si=99C13WCos-_Xr8n_).*
