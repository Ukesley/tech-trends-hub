import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login, useAuth, isAuthenticated } from "@/lib/auth";

export const Route = createFileRoute("/login")({
    component: LoginPage,
});

function LoginPage() {
    const navigate = useNavigate();
    const { authed } = useAuth();

    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    // Se já estiver logado, manda pra raiz ou pro editor
    if (authed || typeof window !== "undefined" && isAuthenticated()) {
        navigate({ to: "/novo-artigo", replace: true });
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = login(password);
        if (success) {
            // Refresh event dispatches in auth, then redirect
            window.dispatchEvent(new Event("auth-change"));
            navigate({ to: "/novo-artigo" });
        } else {
            setError(true);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center bg-background px-4">
                <div className="w-full max-w-sm space-y-6 rounded-2xl border border-border bg-card p-10 shadow-lg relative overflow-hidden">
                    {/* Subtle gradient flair */}
                    <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-neon/20 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-purple-600/20 blur-3xl" />

                    <div className="relative text-center">
                        <h1 className="font-display text-2xl font-bold text-foreground">
                            Acesso Autor
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Insira a chave mestra para continuar.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="relative space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-foreground block text-left"
                            >
                                Senha
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError(false);
                                }}
                                className={error ? "border-destructive focus-visible:ring-destructive" : ""}
                                required
                            />
                            {error && (
                                <p className="text-xs text-destructive text-left font-medium">
                                    Senha incorreta. Acesso negado.
                                </p>
                            )}
                        </div>

                        <Button type="submit" className="w-full bg-neon text-neon-foreground hover:bg-neon/90 font-semibold shadow-md shadow-neon/10">
                            Acessar Painel
                        </Button>
                    </form>

                    <button
                        type="button"
                        onClick={() => { setPassword("123"); setTimeout(() => login("123"), 300) }}
                        className="text-[10px] text-muted-foreground opacity-30 hover:opacity-100 mx-auto block"
                    >
                        Dica: a senha é 123
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
