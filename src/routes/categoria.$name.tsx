import { createFileRoute, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { AdBanner } from "@/components/AdBanner";
import { getArticlesByCategory, categories } from "@/lib/articles";
import { Link } from "@tanstack/react-router";

// Derive the valid category names (excluding "Todos") for type-safe validation
const validCategories = categories.filter((cat) => cat !== "Todos");

export const Route = createFileRoute("/categoria/$name")({
  component: CategoryPage,
  // Validate the URL param before rendering — reject unknown categories
  beforeLoad: ({ params }) => {
    const isValid = validCategories.includes(
      params.name as (typeof validCategories)[number],
    );
    if (!isValid) {
      throw notFound();
    }
  },
  head: ({ params }) => ({
    meta: [
      { title: `${params.name} — Compila Tech` },
      {
        name: "description",
        content: `Artigos sobre ${params.name} no Compila Tech — Blog de Tecnologia.`,
      },
      { property: "og:title", content: `${params.name} — Compila Tech` },
      {
        property: "og:description",
        content: `Artigos sobre ${params.name} no Compila Tech.`,
      },
    ],
  }),
});

function CategoryPage() {
  const { name } = Route.useParams();
  const filteredArticles = getArticlesByCategory(name);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <span className="gold-label">Categoria</span>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
            {name}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {filteredArticles.length} artigo
            {filteredArticles.length !== 1 ? "s" : ""} encontrado
            {filteredArticles.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Category chips */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={cat === "Todos" ? "/" : "/categoria/$name"}
              params={cat === "Todos" ? undefined : { name: cat }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${cat === name
                ? "bg-neon text-neon-foreground"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        <AdBanner
          className="mb-10 h-24 w-full"
          label="Publicidade — Topo da categoria"
        />

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">
              Nenhum artigo encontrado nesta categoria.
            </p>
          </div>
        )}

        <AdBanner
          className="mt-12 h-28 w-full"
          label="Publicidade — Rodapé da categoria"
        />
      </main>

      <Footer />
    </div>
  );
}
