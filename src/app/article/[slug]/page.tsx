import { getArticleBySlug, getArticleSlugs } from '@/lib/articles';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import BlurText from '@/components/ui/BlurText';
import { Reveal } from '@/components/ui/Reveal';

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const article = getArticleBySlug(params.slug);
  if (!article) {
    return { title: 'Article Not Found' };
  }
  return {
    title: `${article.title} - Vishwas`,
    description: article.description || 'Article by Vishwas',
  };
}

export default async function ArticlePage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="min-h-screen pt-32 pb-32 px-4">
      {/* Scroll Progress Indicator - Can be added later with client component if needed */}
      <div className="max-w-3xl mx-auto mb-16">
        <Reveal delay={0.1} direction="up" overflow="visible">
          <Link 
            href="/article"
            className="inline-flex items-center text-sm font-medium text-foreground/50 hover:text-foreground transition-colors mb-12 group"
          >
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to articles
          </Link>
        </Reveal>
        
        <header className="mb-16">
          {article.date && (
            <Reveal delay={0.2} direction="up" overflow="visible">
              <time className="text-sm font-mono text-accent mb-4 block uppercase tracking-wider">
                {new Date(article.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </Reveal>
          )}
          
          <BlurText
            text={article.title}
            delay={50}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
          />
          
          {article.description && (
            <BlurText
              text={article.description}
              delay={30}
              animateBy="words"
              direction="bottom"
              className="text-xl md:text-2xl text-foreground/60 leading-relaxed font-light"
            />
          )}
        </header>
        
        {/* We use MarkdownRenderer which internally uses GSAP to fade things in */}
        <MarkdownRenderer content={article.content} />
      </div>
    </article>
  );
}
