import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { AdBanner } from "@/components/AdBanner";
import { articles } from "@/lib/articles";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

/** Simple RFC 5322-compliant e-mail regex */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NewsletterState = "idle" | "success" | "error";

function HomePage() {
  const featured = articles[0];
  const rest = articles.slice(1);

  const [email, setEmail] = useState("");
  const [newsletterState, setNewsletterState] =
    useState<NewsletterState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage("Insira um e-mail válido.");
      setNewsletterState("error");
      return;
    }
    // In a real app you would call an API here.
    // For now we simply simulate a successful subscription.
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
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <span className="gold-label">Destaque</span>
              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">
                {featured.title}
              </h1>
              <p className="mt-4 text-base text-muted-foreground md:text-lg">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Link
                  to="/artigo/$slug"
                  params={{ slug: featured.slug }}
                  className="inline-flex items-center gap-2 rounded-full bg-neon px-6 py-2.5 text-sm font-semibold text-neon-foreground transition-colors hover:bg-primary/80"
                >
                  Ler artigo <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <span className="text-sm text-muted-foreground">
                  {featured.readTime} de leitura
                </span>
              </div>
            </div>
            <div className="md:col-span-7">
              <Link
                to="/artigo/$slug"
                params={{ slug: featured.slug }}
                className="group block"
              >
                <div className="neon-glow overflow-hidden rounded-2xl">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    width={1280}
                    height={720}
                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Top ad banner */}
        <div className="mx-auto max-w-7xl px-6">
          <AdBanner className="h-24 w-full" label="Publicidade — Banner Superior" />
        </div>

        {/* Articles grid */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Últimos Artigos
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
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
