import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, MessageCircle, Instagram, Share2, Gift, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface KitVendaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const textos = {
  whatsapp: {
    titulo: "WhatsApp",
    icon: MessageCircle,
    texto: `🍫 *PALHA ITALIANA ARTESANAL* 🍫

Feita com muito carinho e ingredientes de qualidade!

✨ Sabores disponíveis:
• Tradicional (Chocolate)
• Ninho com Nutella
• Paçoca
• Prestígio

📦 *PROMOÇÃO:*
• Unidade: R$ 8,00
• 3 por R$ 20,00
• 10 por R$ 60,00

🚗 Entrega ou retirada
📍 [Seu bairro]

Peça já pelo WhatsApp! 👇`
  },
  instagram: {
    titulo: "Instagram",
    icon: Instagram,
    texto: `🍫 PALHA ITALIANA ARTESANAL 🍫

Derrete na boca e no coração! 💛

Sabores:
🟤 Tradicional
🤍 Ninho com Nutella  
🥜 Paçoca
🥥 Prestígio

💰 A partir de R$ 8,00

📦 Encomendas pelo link na bio!

#PalhaItaliana #Doces #Confeitaria #DocesCaseiros #Encomendas`
  },
  status: {
    titulo: "Status/Stories",
    icon: Share2,
    texto: `Quem quer uma PALHA ITALIANA fresquinha? 🍫

Acabou de sair do forno! 🔥

Tradicional, Ninho, Paçoca ou Prestígio?

Responde aqui 👇 que eu reservo a sua!`
  },
  combo: {
    titulo: "Oferta Combo",
    icon: Gift,
    texto: `🎁 *SUPER COMBO PALHA ITALIANA* 🎁

Leve MAIS, pague MENOS!

✅ 5 unidades: R$ 35 (de R$ 40)
✅ 10 unidades: R$ 60 (de R$ 80)
✅ 20 unidades: R$ 100 (de R$ 160)

🎯 Perfeito para:
• Presente
• Sobremesa no trabalho
• Festa
• Revenda

⚡ Promoção por TEMPO LIMITADO!

Garanta já o seu! 👇`
  }
};

export function KitVendaModal({ isOpen, onClose }: KitVendaModalProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (key: string, texto: string) => {
    await navigator.clipboard.writeText(texto);
    setCopied(key);
    toast({
      title: "Copiado! ✅",
      description: "Texto copiado para a área de transferência",
    });
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl gradient-text-premium flex items-center gap-2">
            <Share2 className="w-6 h-6 text-accent" />
            Kit Pronto de Venda
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground mb-4">
          Textos prontos para você copiar e colar. Só personalizar e vender! 🚀
        </p>

        <div className="space-y-4">
          {Object.entries(textos).map(([key, item]) => {
            const Icon = item.icon;
            const isCopied = copied === key;
            
            return (
              <div 
                key={key}
                className="card-glass p-4 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="font-semibold text-foreground">{item.titulo}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(key, item.texto)}
                    className={isCopied ? "bg-green-500/20 border-green-500/50 text-green-400" : ""}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-3 text-xs text-muted-foreground whitespace-pre-line max-h-32 overflow-y-auto">
                  {item.texto}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
          <p className="text-sm text-foreground flex items-center gap-2">
            <span className="text-lg">💡</span>
            <span><strong>Dica:</strong> Personalize com seu nome, bairro e formas de pagamento!</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}