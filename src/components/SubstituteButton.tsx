import { useState } from "react";
import { RefreshCw, Loader2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chef-ai`;

interface SubstituteButtonProps {
  ingredientName: string;
  recipeName: string;
}

export function SubstituteButton({ ingredientName, recipeName }: SubstituteButtonProps) {
  const [suggestion, setSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const fetchSubstitute = async () => {
    if (suggestion) {
      setIsOpen(!isOpen);
      return;
    }
    setIsLoading(true);
    setIsOpen(true);
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          type: "chat",
          messages: [
            {
              role: "user",
              content: `Na receita "${recipeName}", preciso substituir "${ingredientName}". Me dê 2-3 opções de substituição com as proporções corretas. Responda de forma bem curta e direta, máximo 4 linhas.`,
            },
          ],
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error || "Erro ao buscar substituição");
      }

      // Parse streaming response
      const reader = resp.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let textBuffer = "";
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              result += content;
              setSuggestion(result);
            }
          } catch {}
        }
      }
    } catch (e: any) {
      toast({ title: "Erro", description: e.message, variant: "destructive" });
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        variant="outline"
        size="sm"
        className="w-full mt-1.5 h-8 text-xs gap-1.5 bg-accent/10 border-accent/30 text-accent hover:bg-accent/20 hover:text-accent font-semibold"
        onClick={fetchSubstitute}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <RefreshCw className="w-3 h-3" />
        )}
        {isLoading ? "Buscando..." : suggestion ? (isOpen ? "Ocultar" : "Ver substituição") : "Substituir"}
      </Button>

      {isOpen && suggestion && (
        <div className="mt-2 p-3 rounded-xl bg-accent/10 border border-accent/20 animate-fade-in">
          <div className="flex items-center gap-2 mb-1.5">
            <Bot className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] font-bold uppercase text-accent">Chef IA sugere</span>
          </div>
          <div className="prose prose-sm prose-invert max-w-none text-xs [&_p]:mb-1 [&_p:last-child]:mb-0">
            <ReactMarkdown>{suggestion}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
