import { Link } from "@tanstack/react-router";
import type { Article } from "@/lib/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to="/artigo/$slug"
      params={{ slug: article.slug }}
      className="glass-card group flex flex-col overflow-hidden transition-all duration-300"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          width={800}
          height={512}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="gold-label mb-3">{article.category}</span>
        <h3 className="font-display text-lg font-semibold leading-tight text-foreground line-clamp-2">
          {article.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neon/20 text-xs font-bold text-neon">
              {article.authorInitials}
            </div>
            <span className="text-xs text-muted-foreground">{article.author}</span>
          </div>
          <span className="text-xs text-muted-foreground">{article.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
