import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export interface ArticleData {
  slug: string;
  title: string;
  date?: string;
  description?: string;
  content: string;
}

export function getArticleSlugs() {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }
  return fs.readdirSync(articlesDirectory).filter(file => file.endsWith('.md'));
}

export function getArticleBySlug(slug: string): ArticleData | null {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(articlesDirectory, `${realSlug}.md`);
    if (!fs.existsSync(fullPath)) return null;
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // If the markdown file starts with a # title, let's try to extract it if no title in frontmatter
    let title = data.title || '';
    let parsedContent = content;
    
    if (!title) {
      const match = content.match(/^#\s+(.*)/m);
      if (match) {
        title = match[1];
        // Remove the first h1 from the content so we can render it separately in the hero
        parsedContent = content.replace(/^#\s+(.*)/m, '').trim();
      } else {
        title = realSlug;
      }
    }

    return {
      slug: realSlug,
      title,
      date: data.date || '',
      description: data.description || '',
      content: parsedContent,
      ...data,
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

export function getAllArticles(): ArticleData[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is ArticleData => article !== null)
    // sort articles by date in descending order if dates exist
    .sort((a, b) => (a.date && b.date ? (a.date > b.date ? -1 : 1) : 0));
  return articles;
}
