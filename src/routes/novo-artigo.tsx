import { createFileRoute, useNavigate, Navigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { categories, addArticle } from "@/lib/articles";
import { useAuth, isAuthenticated } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/novo-artigo")({
    component: NovoArtigoPage,
});

const formSchema = z.object({
    title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
    excerpt: z.string().min(10, "O resumo deve ter pelo menos 10 caracteres"),
    content: z.string().min(20, "O conteúdo deve ter pelo menos 20 caracteres"),
    category: z.string().min(1, "A categoria é obrigatória"),
    image: z.string().url("Insira uma URL válida para a imagem fictícia"),
    readTime: z.string().min(4, "Informe o tempo de leitura (ex: 5 min)"),
});

type FormValues = z.infer<typeof formSchema>;

function NovoArtigoPage() {
    const navigate = useNavigate();
    const { authed } = useAuth();

    if (!authed && typeof window !== "undefined" && !isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            excerpt: "",
            content: "",
            category: "",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1280&auto=format&fit=crop",
            readTime: "5 min",
        },
    });

    const onSubmit = (data: FormValues) => {
        // Inject the new article in memory
        addArticle({
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            category: data.category,
            image: data.image,
            readTime: data.readTime,
        });

        // Navigate to homepage to see the new article
        navigate({ to: "/" });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 bg-background py-12">
                <div className="mx-auto max-w-3xl px-6">
                    <div className="mb-8">
                        <h1 className="font-display text-3xl font-bold text-foreground">
                            Criar Novo Artigo
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            Preencha os dados abaixo para publicar um artigo como Kesley Barros.
                        </p>
                    </div>

                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Título</label>
                                <Input {...register("title")} placeholder="Ex: A revolução do 6G" />
                                {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Resumo</label>
                                <Textarea {...register("excerpt")} rows={2} placeholder="Um breve parágrafo resumo" />
                                {errors.excerpt && <p className="text-xs text-destructive">{errors.excerpt.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Conteúdo Completo</label>
                                <Textarea {...register("content")} rows={8} placeholder="Escreva o texto completo do artigo..." />
                                {errors.content && <p className="text-xs text-destructive">{errors.content.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Categoria</label>
                                    <select
                                        {...register("category")}
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">Selecione...</option>
                                        {categories.filter(c => c !== "Todos").map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Tempo de Leitura</label>
                                    <Input {...register("readTime")} placeholder="Ex: 5 min" />
                                    {errors.readTime && <p className="text-xs text-destructive">{errors.readTime.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">URL da Imagem de Capa</label>
                                <Input {...register("image")} placeholder="https://..." />
                                {errors.image && <p className="text-xs text-destructive">{errors.image.message}</p>}
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <Button variant="outline" type="button" onClick={() => navigate({ to: "/" })}>
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={isSubmitting} className="bg-neon text-neon-foreground hover:bg-neon/90">
                                    Publicar Artigo
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
