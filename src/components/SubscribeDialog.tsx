import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CheckCircle2 } from "lucide-react";

interface SubscribeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    trigger?: React.ReactNode;
}

export function SubscribeDialog({ open, onOpenChange, trigger }: SubscribeDialogProps) {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        // Mock API call
        setSubmitted(true);
        setTimeout(() => {
            onOpenChange(false);
            setTimeout(() => setSubmitted(false), 300); // Reset after close animation
            setEmail("");
        }, 2000);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Inscreva-se na nossa Newsletter</DialogTitle>
                    <DialogDescription>
                        Receba as últimas novidades em tecnologia, IA, Cloud e muito mais diretamente no seu email.
                    </DialogDescription>
                </DialogHeader>

                {submitted ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
                        <CheckCircle2 className="h-12 w-12 text-neon" />
                        <div>
                            <p className="font-medium text-foreground">Inscrição confirmada!</p>
                            <p className="text-sm text-muted-foreground mt-1">Obrigado por se inscrever.</p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 py-2">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none text-foreground sr-only">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-neon text-neon-foreground hover:bg-primary/80">
                            Inscrever
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
