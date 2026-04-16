import { Link } from "@tanstack/react-router";
import { TerminalSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <Link to="/" className="group flex items-center gap-2 font-display text-xl font-black tracking-tighter">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-neon to-purple-600 shadow-md shadow-neon/20">
                <TerminalSquare className="h-4 w-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent transition-colors group-hover:from-neon group-hover:to-purple-500">
                Compila Tecch
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Seu centro de comando para as últimas novidades em tecnologia, entregues com precisão.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground">Categorias</h4>
            <ul className="mt-4 space-y-2">
              {["IA", "Segurança", "Cloud", "Hardware", "Desenvolvimento", "Mobile"].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/categoria/$name"
                    params={{ name: cat }}
                    className="text-sm text-muted-foreground transition-colors hover:text-neon"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground">Empresa</h4>
            <ul className="mt-4 space-y-2">
              {["Sobre", "Contato", "Trabalhe Conosco", "Imprensa"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground">Conecte-se</h4>
            <ul className="mt-4 space-y-2">
              {["Twitter / X", "LinkedIn", "RSS Feed", "Newsletter"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © 2026 Compila Tecch. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
