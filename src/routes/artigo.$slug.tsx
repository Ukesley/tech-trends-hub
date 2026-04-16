import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdBanner } from "@/components/AdBanner";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticleBySlug, articles } from "@/lib/articles";
import { ArrowLeft, Clock, User } from "lucide-react";

export const Route = createFileRoute("/artigo/$slug")({
  component: ArticlePage,
  head: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    return {
      meta: [
        { title: article ? `${article.title} — Compila Tecch` : "Artigo — Compila Tecch" },
        { name: "description", content: article?.excerpt ?? "" },
        { property: "og:title", content: article?.title ?? "Compila Tecch" },
        { property: "og:description", content: article?.excerpt ?? "" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold text-foreground">Artigo não encontrado</h1>
        <Link to="/" className="mt-4 inline-block text-neon hover:underline">Voltar ao início</Link>
      </div>
    </div>
  ),
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const article = getArticleBySlug(slug);

  if (!article) {
    throw notFound();
  }

  const related = articles.filter((a) => a.slug !== slug && a.category === article.category).slice(0, 2);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-neon">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main content */}
          <article className="lg:col-span-8">
            <span className="gold-label">{article.category}</span>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {article.author}
              </div>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </div>
            </div>

            <div className="neon-glow mt-8 overflow-hidden rounded-2xl">
              <img
                src={article.image}
                alt={article.title}
                width={1280}
                height={720}
                className="aspect-video w-full object-cover"
              />
            </div>

            {/* Ad after image */}
            <AdBanner className="mt-8 h-24 w-full" label="Publicidade" />

            <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/90">
              {article.content.split("\n\n").map((paragraph) => (
                // Use a stable content-based key instead of the array index
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>

            {/* Ad after content */}
            <AdBanner className="mt-10 h-28 w-full" label="Publicidade — Após conteúdo" />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <AdBanner className="h-64" label="Publicidade — Sidebar" />

              {related.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">Artigos Relacionados</h3>
                  <div className="mt-4 space-y-4">
                    {related.map((a) => (
                      <Link
                        key={a.slug}
                        to="/artigo/$slug"
                        params={{ slug: a.slug }}
                        className="glass-card group block p-4 transition-all duration-300"
                      >
                        <span className="gold-label text-[10px]">{a.category}</span>
                        <h4 className="mt-1 font-display text-sm font-semibold text-foreground line-clamp-2">
                          {a.title}
                        </h4>
                        <span className="mt-2 block text-xs text-muted-foreground">{a.readTime}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <AdBanner className="h-48" label="Publicidade — Sidebar 2" />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
