import { ExternalLink } from "lucide-react";
import type { NewsArticle } from "@/lib/newsApi";
import { formatNewsDate } from "@/lib/newsApi";

const PLACEHOLDER_IMG =
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop";

export function NewsCard({ article }: { article: NewsArticle }) {
    const imgSrc = article.urlToImage || PLACEHOLDER_IMG;
    const sourceName = article.source?.name ?? "Fonte desconhecida";
    const authorName = article.author
        ? article.author.length > 40
            ? article.author.substring(0, 40) + "..."
            : article.author
        : sourceName;

    // Não renderizar cards sem título
    if (!article.title) return null;

    return (
        <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-neon/5 hover:-translate-y-1"
        >
            {/* Imagem */}
            <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                    src={imgSrc}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = PLACEHOLDER_IMG;
                    }}
                />
                {/* Badge da fonte */}
                <span className="absolute bottom-3 left-3 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
                    {sourceName}
                </span>
            </div>

            {/* Conteúdo */}
            <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-semibold leading-snug text-foreground line-clamp-2 group-hover:text-neon transition-colors">
                    {article.title}
                </h3>

                {article.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                        {article.description}
                    </p>
                )}

                <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="truncate max-w-[60%]" title={authorName}>
                        ✍️ {authorName}
                    </span>
                    <span>{formatNewsDate(article.publishedAt)}</span>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-neon">
                    Ler na fonte <ExternalLink className="h-3 w-3" />
                </div>
            </div>
        </a>
    );
}

/** Skeleton para carregamento */
export function NewsCardSkeleton() {
    return (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card animate-pulse">
            <div className="aspect-video bg-muted" />
            <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-2/3 rounded bg-muted" />
                <div className="mt-4 flex justify-between">
                    <div className="h-3 w-24 rounded bg-muted" />
                    <div className="h-3 w-20 rounded bg-muted" />
                </div>
            </div>
        </div>
    );
}
