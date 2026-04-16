import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { articles, Article } from "@/lib/articles";
import { Link, useRouter } from "@tanstack/react-router";

interface SearchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    trigger?: React.ReactNode;
}

export function SearchDialog({ open, onOpenChange, trigger }: SearchDialogProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Article[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = articles.filter(
            (article) =>
                article.title.toLowerCase().includes(lowerQuery) ||
                article.category.toLowerCase().includes(lowerQuery)
        );
        setResults(filtered);
    }, [query]);

    // Reset query on close
    useEffect(() => {
        if (!open) setQuery("");
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Buscar Artigos</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2 border-b pb-4">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Digite para buscar..."
                        className="border-0 shadow-none focus-visible:ring-0 px-0 h-10 text-base flex-1 bg-transparent"
                        autoFocus
                    />
                </div>
                <div className="max-h-[300px] overflow-y-auto pt-2">
                    {query && results.length === 0 && (
                        <p className="text-center text-sm text-muted-foreground py-4">Nenhum resultado encontrado.</p>
                    )}
                    {results.length > 0 && (
                        <div className="flex flex-col gap-2">
                            {results.map((article) => (
                                <Link
                                    key={article.slug}
                                    to="/artigo/$slug"
                                    params={{ slug: article.slug }}
                                    onClick={() => onOpenChange(false)}
                                    className="flex flex-col rounded-md px-4 py-2 hover:bg-secondary transition-colors"
                                >
                                    <span className="font-semibold text-foreground text-sm">{article.title}</span>
                                    <span className="text-xs text-muted-foreground">{article.category}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
