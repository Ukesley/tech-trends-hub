import { Link } from "@tanstack/react-router";
import { Search, Menu, X, TerminalSquare } from "lucide-react";
import { useState } from "react";
import { SearchDialog } from "./SearchDialog";
import { SubscribeDialog } from "./SubscribeDialog";

const navItems = [
  { label: "Início", to: "/" as const },
  { label: "IA", to: "/categoria/$name" as const, params: { name: "IA" } },
  {
    label: "Segurança",
    to: "/categoria/$name" as const,
    params: { name: "Segurança" },
  },
  {
    label: "Cloud",
    to: "/categoria/$name" as const,
    params: { name: "Cloud" },
  },
  {
    label: "Hardware",
    to: "/categoria/$name" as const,
    params: { name: "Hardware" },
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="group flex items-center gap-2 font-display text-2xl font-black tracking-tighter"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon to-purple-600 shadow-lg shadow-neon/20">
            <TerminalSquare className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent transition-colors group-hover:from-neon group-hover:to-purple-500">
            Compila Tecch
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Navegação principal">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              params={"params" in item ? item.params : undefined}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-sm font-medium text-neon transition-colors" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Search: aria-label so screen readers announce the purpose */}
          <button
            type="button"
            aria-label="Buscar"
            onClick={() => setSearchOpen(true)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setSubscribeOpen(true)}
            className="hidden rounded-full bg-neon px-5 py-2 text-sm font-semibold text-neon-foreground transition-colors hover:bg-primary/80 md:inline-flex"
          >
            Inscreva-se
          </button>

          {/* Mobile menu toggle: aria-expanded + aria-controls for accessibility */}
          <button
            type="button"
            className="rounded-lg p-2 text-muted-foreground md:hidden"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-background px-6 py-4 md:hidden"
          aria-label="Navegação mobile"
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                params={"params" in item ? item.params : undefined}
                className="text-sm font-medium text-muted-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <SubscribeDialog open={subscribeOpen} onOpenChange={setSubscribeOpen} />
    </header>
  );
}
