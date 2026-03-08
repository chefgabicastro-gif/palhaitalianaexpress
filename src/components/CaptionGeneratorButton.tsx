import { useState } from "react";
import { Sparkles, Copy, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chef-ai`;

interface CaptionGeneratorButtonProps {
  recipeName: string;
}

export function CaptionGeneratorButton({ recipeName }: CaptionGeneratorButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generate = async () => {
    setIsLoading(true);
    setCaption("");
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ type: "caption", recipeName }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error || "Erro ao gerar legenda");
      }

      const data = await resp.json();
      setCaption(data.content);
      setIsOpen(true);
    } catch (e: any) {
      toast({ title: "Erro", description: e.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(caption);
    setCopied(true);
    toast({ title: "Copiado!", description: "Legenda copiada para a área de transferência" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 text-accent border-accent/50 hover:bg-accent/10"
        onClick={generate}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Sparkles className="w-4 h-4" />
        )}
        {isLoading ? "Gerando..." : "Gerar Legenda IA"}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg bg-background">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Legenda de Venda — {recipeName}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[50vh] overflow-y-auto">
            <div className="prose prose-sm prose-invert max-w-none p-4 rounded-xl bg-secondary/50">
              <ReactMarkdown>{caption}</ReactMarkdown>
            </div>
          </div>
          <Button onClick={copyToClipboard} className="w-full gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copiado!" : "Copiar Legenda"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
