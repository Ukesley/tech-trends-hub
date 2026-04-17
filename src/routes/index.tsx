import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdBanner } from "@/components/AdBanner";
import { NewsCard, NewsCardSkeleton } from "@/components/NewsCard";
import { fetchNewsByCategory, formatNewsDate } from "@/lib/newsApi";
import type { NewsCategory, NewsArticle } from "@/lib/newsApi";
import { ExternalLink, RefreshCw, Monitor, Gamepad2, FlaskConical, FileText } from "lucide-react";
import { useState, useMemo } from "react";
import { articles as localArticles } from "@/lib/articles";

export const Route = createFileRoute("/")({
  component: HomePage,
});

/** Simple RFC 5322-compliant e-mail regex */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NewsletterState = "idle" | "success" | "error";

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1280&auto=format&fit=crop";

const CATEGORY_TABS: { key: NewsCategory; label: string; icon: React.ReactNode }[] = [
  { key: "tecnologia", label: "Tecnologia", icon: <Monitor className="h-4 w-4" /> },
  { key: "games", label: "Games", icon: <Gamepad2 className="h-4 w-4" /> },
  { key: "ciência", label: "Ciência", icon: <FlaskConical className="h-4 w-4" /> },
  { key: "artigos", label: "Artigos", icon: <FileText className="h-4 w-4" /> },
];

function HomePage() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("tecnologia");
  const [email, setEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState<NewsletterState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: apiArticles,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["news", activeCategory],
    queryFn: () => fetchNewsByCategory(activeCategory, 30),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: activeCategory !== "artigos",
  });

  const articles = useMemo(() => {
    if (activeCategory === "artigos") {
      return localArticles.map((a) => ({
        source: { id: null, name: "Compila Tech" },
        author: a.author,
        title: a.title,
        description: a.excerpt,
        url: a.slug, // Usado como slug interno
        urlToImage: a.image,
        publishedAt: new Date().toISOString(), // Fallback para data atual se o parse falhar
        content: a.content,
      })) as NewsArticle[];
    }
    return apiArticles ?? [];
  }, [activeCategory, apiArticles]);

  const allNews: NewsArticle[] = articles ?? [];
  const featured = allNews[0];
  const rest = allNews.slice(1);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage("Insira um e-mail válido.");
      setNewsletterState("error");
      return;
    }
    setErrorMessage("");
    setNewsletterState("success");
    setEmail("");
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Category Tabs */}
        <section className="mx-auto max-w-7xl px-6 pt-8">
          <div className="flex flex-wrap items-center gap-3">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${activeCategory === tab.key
                  ? "bg-neon text-neon-foreground shadow-md shadow-neon/20"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Hero featured article */}
        <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          {isLoading ? (
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12 animate-pulse">
              <div className="md:col-span-5 space-y-4">
                <div className="h-6 w-20 rounded bg-muted" />
                <div className="h-10 w-full rounded bg-muted" />
                <div className="h-10 w-3/4 rounded bg-muted" />
                <div className="h-5 w-full rounded bg-muted" />
                <div className="h-5 w-2/3 rounded bg-muted" />
              </div>
              <div className="md:col-span-7">
                <div className="aspect-video rounded-2xl bg-muted" />
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive font-semibold">
                Erro ao carregar notícias. Verifique sua conexão.
              </p>
              <button
                onClick={() => refetch()}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-neon px-6 py-2.5 text-sm font-semibold text-neon-foreground"
              >
                <RefreshCw className="h-4 w-4" /> Tentar novamente
              </button>
            </div>
          ) : featured ? (
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-5">
                <span className="gold-label">Destaque</span>
                <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">
                  {featured.title}
                </h1>
                {featured.description && (
                  <p className="mt-4 text-base text-muted-foreground md:text-lg">
                    {featured.description}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span>📰 {featured.source.name}</span>
                  {featured.author && <span>✍️ {featured.author}</span>}
                  <span>{formatNewsDate(featured.publishedAt)}</span>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  {activeCategory === "artigos" ? (
                    <Link
                      to="/artigo/$slug"
                      params={{ slug: featured.url }}
                      className="inline-flex items-center gap-2 rounded-full bg-neon px-6 py-2.5 text-sm font-semibold text-neon-foreground transition-colors hover:bg-primary/80"
                    >
                      Ler artigo completo <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ) : (
                    <a
                      href={featured.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-neon px-6 py-2.5 text-sm font-semibold text-neon-foreground transition-colors hover:bg-primary/80"
                    >
                      Ler na fonte <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
              <div className="md:col-span-7">
                {activeCategory === "artigos" ? (
                  <Link
                    to="/artigo/$slug"
                    params={{ slug: featured.url }}
                    className="group block"
                  >
                    <div className="neon-glow overflow-hidden rounded-2xl">
                      <img
                        src={featured.urlToImage || PLACEHOLDER_IMG}
                        alt={featured.title}
                        width={1280}
                        height={720}
                        className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = PLACEHOLDER_IMG;
                        }}
                      />
                    </div>
                  </Link>
                ) : (
                  <a
                    href={featured.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="neon-glow overflow-hidden rounded-2xl">
                      <img
                        src={featured.urlToImage || PLACEHOLDER_IMG}
                        alt={featured.title}
                        width={1280}
                        height={720}
                        className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = PLACEHOLDER_IMG;
                        }}
                      />
                    </div>
                  </a>
                )}
              </div>
            </div>
          ) : null}
        </section>

        {/* Top ad banner */}
        <div className="mx-auto max-w-7xl px-6">
          <AdBanner className="h-24 w-full" label="Publicidade — Banner Superior" />
        </div>

        {/* Articles grid */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              {activeCategory === "tecnologia" && "Últimas de Tecnologia"}
              {activeCategory === "games" && "Últimas de Games"}
              {activeCategory === "ciência" && "Últimas de Ciência"}
            </h2>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-secondary/80 transition-colors"
              title="Atualizar notícias"
            >
              <RefreshCw className="h-4 w-4" /> Atualizar
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                <NewsCardSkeleton key={i} />
              ))
              : articles.map((article, i) => (
                <NewsCard
                  key={article.url + i}
                  article={article}
                  isInternal={activeCategory === "artigos"}
                />
              ))}
          </div>

          {!isLoading && rest.length === 0 && !error && (
            <p className="text-center text-muted-foreground py-12">
              Nenhuma notícia encontrada no momento. Tente novamente mais tarde.
            </p>
          )}
        </section>

        {/* Mid-page ad */}
        <div className="mx-auto max-w-7xl px-6 pb-16">
          <AdBanner className="h-32 w-full" label="Publicidade — Banner Central" />
        </div>

        {/* Newsletter CTA */}
        <section className="border-t border-b border-border bg-card py-16">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Fique por dentro das novidades
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Receba os melhores artigos de tecnologia direto no seu e-mail. Sem
              spam, apenas conteúdo de qualidade.
            </p>

            {newsletterState === "success" ? (
              <p
                role="status"
                aria-live="polite"
                className="mx-auto mt-8 max-w-md rounded-full bg-neon/10 px-6 py-3 text-sm font-medium text-neon"
              >
                ✓ Inscrição realizada com sucesso! Obrigado.
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                noValidate
                aria-label="Formulário de newsletter"
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Endereço de e-mail
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (newsletterState === "error") {
                        setNewsletterState("idle");
                        setErrorMessage("");
                      }
                    }}
                    placeholder="seu@email.com"
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={newsletterState === "error"}
                    aria-describedby={
                      newsletterState === "error"
                        ? "newsletter-error"
                        : undefined
                    }
                    className="w-full rounded-full border border-border bg-input px-5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-neon px-6 py-2.5 text-sm font-semibold text-neon-foreground transition-colors hover:bg-primary/80"
                >
                  Inscrever
                </button>
              </form>
            )}

            {newsletterState === "error" && (
              <p
                id="newsletter-error"
                role="alert"
                aria-live="assertive"
                className="mx-auto mt-2 max-w-md text-sm text-destructive"
              >
                {errorMessage}
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
