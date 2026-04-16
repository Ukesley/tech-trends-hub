import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdBanner } from "@/components/AdBanner";
import { NewsCard, NewsCardSkeleton } from "@/components/NewsCard";
import { fetchTechNews, fetchEverythingTech, formatNewsDate } from "@/lib/newsApi";
import type { NewsArticle } from "@/lib/newsApi";
import { ArrowRight, ExternalLink, RefreshCw } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

/** Simple RFC 5322-compliant e-mail regex */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NewsletterState = "idle" | "success" | "error";

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1280&auto=format&fit=crop";

function HomePage() {
  const [email, setEmail] = useState("");
  const [newsletterState, setNewsletterState] =
    useState<NewsletterState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Buscar notícias de tecnologia do Brasil
  const {
    data: headlines,
    isLoading: loadingHeadlines,
    error: headlinesError,
    refetch,
  } = useQuery({
    queryKey: ["tech-headlines"],
    queryFn: () => fetchTechNews(20),
    staleTime: 5 * 60 * 1000, // Cache de 5 minutos
    retry: 2,
  });

  // Buscar notícias complementares (everything)
  const { data: extraNews, isLoading: loadingExtra } = useQuery({
    queryKey: ["tech-everything"],
    queryFn: () => fetchEverythingTech(20),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const isLoading = loadingHeadlines;

  // Combinar manchetes e extras, removendo duplicatas por URL
  const allNews: NewsArticle[] = [];
  const seenUrls = new Set<string>();
  for (const article of [...(headlines ?? []), ...(extraNews ?? [])]) {
    if (!seenUrls.has(article.url)) {
      seenUrls.add(article.url);
      allNews.push(article);
    }
  }

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
        {/* Hero featured article */}
        <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">
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
          ) : headlinesError ? (
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
                  <a
                    href={featured.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-neon px-6 py-2.5 text-sm font-semibold text-neon-foreground transition-colors hover:bg-primary/80"
                  >
                    Ler na fonte <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div className="md:col-span-7">
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
              Últimas Notícias de Tecnologia
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
              : rest.map((article, i) => (
                <NewsCard key={article.url + i} article={article} />
              ))}
          </div>

          {!isLoading && rest.length === 0 && !headlinesError && (
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

            {/* Accessible inline error message */}
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
