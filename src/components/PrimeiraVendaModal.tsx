import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChefHat, MapPin, Copy, Rocket, Check, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { recipes } from "@/data/recipes";

interface PrimeiraVendaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const locais = [
  { id: "trabalho", nome: "Trabalho", emoji: "💼" },
  { id: "escola", nome: "Escola/Faculdade", emoji: "🎓" },
  { id: "vizinhos", nome: "Vizinhos/Condomínio", emoji: "🏠" },
  { id: "familia", nome: "Família/Amigos", emoji: "👨‍👩‍👧" },
  { id: "whatsapp", nome: "WhatsApp/Grupos", emoji: "📱" },
  { id: "instagram", nome: "Instagram", emoji: "📸" },
];

export function PrimeiraVendaModal({ isOpen, onClose }: PrimeiraVendaModalProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [selectedLocal, setSelectedLocal] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const receitasIniciais = recipes.filter(r => r.difficulty === "easy").slice(0, 6);
  const selectedRecipeData = recipes.find(r => r.id === selectedRecipe);

  const ofertaTexto = selectedRecipeData ? `🍫 *${selectedRecipeData.name.toUpperCase()}* 🍫

Oi! Estou começando a vender doces artesanais e queria te oferecer!

✨ Feita com ingredientes de qualidade
🎁 Unidade: R$ 8,00
📦 3 por R$ 20,00

Quer provar? Me avisa! 😊` : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(ofertaTexto);
    setCopied(true);
    toast({
      title: "Oferta copiada! ✅",
      description: "Agora é só enviar para seus contatos!",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleComplete = () => {
    toast({
      title: "🎉 Parabéns!",
      description: "Você está pronta para sua primeira venda! +50 XP",
    });
    onClose();
    setStep(1);
    setSelectedRecipe(null);
    setSelectedLocal(null);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-gold mx-auto mb-4 flex items-center justify-center shadow-[0_0_30px_hsl(var(--gold)/0.4)]">
                <ChefHat className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">Escolha sua Receita</h3>
              <p className="text-sm text-muted-foreground mt-1">Qual você quer vender primeiro?</p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {receitasIniciais.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe.id)}
                  className={cn(
                    "p-3 rounded-xl text-left transition-all",
                    selectedRecipe === recipe.id
                      ? "bg-primary/20 border-2 border-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                      : "bg-muted/30 border border-border hover:border-accent/50"
                  )}
                >
                  <span className="text-2xl mb-1 block">{recipe.categoryEmoji}</span>
                  <span className="text-sm font-medium text-foreground line-clamp-1">
                    {recipe.name.replace('Palha Italiana ', '')}
                  </span>
                </button>
              ))}
            </div>

            <Button 
              onClick={() => setStep(2)}
              disabled={!selectedRecipe}
              className="w-full btn-premium mt-4"
            >
              Continuar
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-magenta-dark mx-auto mb-4 flex items-center justify-center shadow-[0_0_30px_hsl(var(--accent)/0.4)]">
                <MapPin className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">Onde Vender?</h3>
              <p className="text-sm text-muted-foreground mt-1">Escolha onde vai fazer sua primeira venda</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {locais.map((local) => (
                <button
                  key={local.id}
                  onClick={() => setSelectedLocal(local.id)}
                  className={cn(
                    "p-4 rounded-xl text-left transition-all",
                    selectedLocal === local.id
                      ? "bg-accent/20 border-2 border-accent shadow-[0_0_20px_hsl(var(--accent)/0.3)]"
                      : "bg-muted/30 border border-border hover:border-accent/50"
                  )}
                >
                  <span className="text-2xl mb-1 block">{local.emoji}</span>
                  <span className="text-sm font-medium text-foreground">{local.nome}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <Button 
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                Voltar
              </Button>
              <Button 
                onClick={() => setStep(3)}
                disabled={!selectedLocal}
                className="flex-1 btn-premium"
              >
                Continuar
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.4)]">
                <Copy className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">Copie sua Oferta</h3>
              <p className="text-sm text-muted-foreground mt-1">Texto pronto para enviar!</p>
            </div>

            <div className="bg-muted/30 rounded-xl p-4 text-sm text-muted-foreground whitespace-pre-line">
              {ofertaTexto}
            </div>

            <Button 
              onClick={handleCopy}
              variant="outline"
              className={cn(
                "w-full",
                copied && "bg-green-500/20 border-green-500/50 text-green-400"
              )}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Oferta
                </>
              )}
            </Button>

            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setStep(2)}
                className="flex-1"
              >
                Voltar
              </Button>
              <Button 
                onClick={() => setStep(4)}
                className="flex-1 btn-premium"
              >
                Próximo
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-accent to-gold mx-auto mb-4 flex items-center justify-center shadow-[0_0_40px_hsl(var(--gold)/0.5)] animate-pulse">
              <Rocket className="w-10 h-10 text-primary-foreground" />
            </div>
            
            <h3 className="font-heading text-2xl font-bold gradient-text-premium">
              Agora é com você! 🚀
            </h3>
            
            <p className="text-muted-foreground">
              Envie sua oferta para pelo menos <strong className="text-primary">5 pessoas</strong> hoje e faça sua primeira venda em até <strong className="text-accent">72 horas</strong>!
            </p>

            <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
              <p className="text-sm flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span><strong className="text-primary">Dica:</strong> Quem vende 1 vez, vende sempre!</span>
              </p>
            </div>

            <Button 
              onClick={handleComplete}
              className="w-full btn-premium py-6 text-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Bora Vender!
            </Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-md">
        {/* Progress indicator */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all",
                s <= step ? "bg-gradient-to-r from-primary to-accent" : "bg-muted"
              )}
            />
          ))}
        </div>

        {renderStep()}
      </DialogContent>
    </Dialog>
  );
}