import { getAllArticles } from '@/lib/articles';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import BlurText from '@/components/ui/BlurText';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Articles - Vishwas',
  description: 'Writing about software engineering, design, and building products.',
};

function PageIndexIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="16" r="2" fill="currentColor" />
      <path d="M11 14.5 L7.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5.5 9.5 L7.5 5.5 L10 8.5 Z" fill="currentColor" />
      <path d="M13 14.5 L16.5 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14.5 9 L18.5 7.5 L17.5 11.5 Z" fill="currentColor" />
    </svg>
  );
}

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-4xl mx-auto overflow-hidden">
      <div className="mb-16">
        <BlurText
          text="Articles"
          delay={50}
          animateBy="letters"
          direction="top"
          className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4"
        />
        <BlurText
          text="Thoughts on software engineering, design, and building products."
          delay={30}
          animateBy="words"
          direction="bottom"
          className="text-xl text-foreground/60 max-w-2xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article, index) => {
          const isPageIndex = article.slug === 'pageindex-rag';
          
          return (
          <Reveal key={article.slug} delay={0.2 + index * 0.1} direction="up" overflow="visible" className="h-full">
            <Link 
              href={`/article/${article.slug}`}
              className="group flex flex-col h-full rounded-3xl border border-border/50 bg-background hover:bg-foreground/5 transition-colors duration-300 relative overflow-hidden"
            >
              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-transparent transition-colors duration-500" />
              
              {isPageIndex && (
                <div className="w-full h-36 sm:h-44 bg-gradient-to-br from-[#3b82f6]/10 via-[#3b82f6]/5 to-transparent border-b border-border/30 flex items-center justify-center relative overflow-hidden">
                  <PageIndexIcon className="w-24 h-24 text-[#3b82f6] opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-out" />
                </div>
              )}

              <div className="p-5 md:p-6 flex flex-col justify-between flex-grow relative z-10">
                <div className="mb-2">
                  {article.date && (
                    <time className="text-sm text-foreground/50 mb-3 block">
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  )}
                  <h2 className="text-xl md:text-2xl font-medium text-foreground group-hover:text-foreground/90 transition-colors mb-2">
                    {article.title}
                  </h2>
                  {article.description && (
                    <p className="text-foreground/60 leading-relaxed line-clamp-3">
                      {article.description}
                    </p>
                  )}
                </div>
                
                <div className="mt-6 flex items-center text-sm font-medium text-foreground/50 group-hover:text-foreground transition-colors">
                  Read article
                  <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            </Link>
          </Reveal>
        )})}
      </div>
    </div>
  );
}
