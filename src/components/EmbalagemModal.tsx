import { forwardRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package, Gift, Truck, ShoppingBag, Heart, Sparkles, CheckCircle2 } from "lucide-react";

// Import images
import saquinhoTransparente from "@/assets/embalagens/saquinho-transparente.jpg";
import saquinhoKraft from "@/assets/embalagens/saquinho-kraft.jpg";
import caixinhaPremium from "@/assets/embalagens/caixinha-premium.jpg";
import kitPresente from "@/assets/embalagens/kit-presente.jpg";
import revenda from "@/assets/embalagens/revenda.jpg";
import delivery from "@/assets/embalagens/delivery.jpg";

interface EmbalagemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TipoEmbalagem {
  id: number;
  nome: string;
  descricao: string;
  indicacao: string;
  materiais: string[];
  dicasPro: string[];
  custoMedio: string;
  icon: React.ElementType;
  cor: string;
  imagem: string;
}

const tiposEmbalagem: TipoEmbalagem[] = [
  {
    id: 1,
    nome: "Saquinho Tradicional",
    descricao: "A opção clássica e econômica. Perfeita para quem está começando.",
    indicacao: "Feiras, eventos, porta a porta e encomendas simples.",
    materiais: [
      "Saquinho de celofane ou BOPP (8x12cm ou 10x15cm)",
      "Fita de cetim ou laço",
      "Etiqueta adesiva com sua marca",
      "Grampeador ou seladora"
    ],
    dicasPro: [
      "Use fitas de cores que combinem com sua marca",
      "Seladoras térmicas dão acabamento mais profissional"
    ],
    custoMedio: "R$ 0,30 - R$ 0,80",
    icon: Package,
    cor: "from-amber-500 to-orange-500",
    imagem: saquinhoTransparente
  },
  {
    id: 2,
    nome: "Saquinho Kraft",
    descricao: "Embalagem sustentável com visual rústico e charmoso.",
    indicacao: "Feiras gourmet, lojas de produtos naturais.",
    materiais: [
      "Saquinho kraft com visor (janela transparente)",
      "Carimbo ou adesivo da marca",
      "Barbante ou fita de juta",
      "Tag de papel reciclado"
    ],
    dicasPro: [
      "O visor permite que o cliente veja o produto",
      "Use carimbos para personalização econômica"
    ],
    custoMedio: "R$ 0,50 - R$ 1,20",
    icon: Heart,
    cor: "from-green-500 to-emerald-500",
    imagem: saquinhoKraft
  },
  {
    id: 3,
    nome: "Caixinha Premium",
    descricao: "Eleva seu produto ao nível gourmet. Ideal para presentes.",
    indicacao: "Casamentos, aniversários, brindes corporativos.",
    materiais: [
      "Caixinha de papel cartão (pode ser com visor)",
      "Papel de seda interno",
      "Adesivo ou hot stamping com logo",
      "Laço de cetim ou fita gorgorão"
    ],
    dicasPro: [
      "Hot stamping dourado aumenta a percepção de valor",
      "Caixas com visor mostram o produto sem abrir"
    ],
    custoMedio: "R$ 1,50 - R$ 3,50",
    icon: Gift,
    cor: "from-purple-500 to-pink-500",
    imagem: caixinhaPremium
  },
  {
    id: 4,
    nome: "Kit Presente",
    descricao: "Conjunto com várias palhas. Perfeito para aumentar o ticket médio.",
    indicacao: "Presente para família, cestas de Natal, Páscoa.",
    materiais: [
      "Caixa maior (MDF, papelão ou acrílico)",
      "Palhas embaladas individualmente",
      "Papel picado ou palha decorativa",
      "Cartão personalizado com mensagem"
    ],
    dicasPro: [
      "Ofereça opções de 3, 6 e 12 unidades",
      "Caixas de MDF podem ser reaproveitadas"
    ],
    custoMedio: "R$ 5,00 - R$ 25,00",
    icon: Sparkles,
    cor: "from-rose-500 to-red-500",
    imagem: kitPresente
  },
  {
    id: 5,
    nome: "Embalagem Revenda",
    descricao: "Prática para quem vende para lojistas e revendedores.",
    indicacao: "Atacado, consignação em lojas e cafeterias.",
    materiais: [
      "Bandejas de isopor ou plástico com tampa",
      "Filme PVC ou saco BOPP maior",
      "Etiqueta com informações obrigatórias",
      "Caixa de transporte resistente"
    ],
    dicasPro: [
      "Sempre inclua data de fabricação e validade",
      "Organize por sabores para facilitar conferência"
    ],
    custoMedio: "R$ 0,20 - R$ 0,50",
    icon: ShoppingBag,
    cor: "from-blue-500 to-cyan-500",
    imagem: revenda
  },
  {
    id: 6,
    nome: "Embalagem Delivery",
    descricao: "Robusta e segura para entregas. Mantém o produto intacto.",
    indicacao: "Apps de delivery, entregas próprias, envio por Correios.",
    materiais: [
      "Pote plástico com tampa segura",
      "Papel toalha entre camadas",
      "Caixa de papelão reforçada",
      "Lacre de segurança"
    ],
    dicasPro: [
      "Nunca empilhe mais de 2-3 camadas",
      "Inclua bilhetinho agradecendo a compra"
    ],
    custoMedio: "R$ 1,00 - R$ 3,00",
    icon: Truck,
    cor: "from-indigo-500 to-violet-500",
    imagem: delivery
  }
];

const EmbalagemModal = forwardRef<HTMLDivElement, EmbalagemModalProps>(
  ({ open, onOpenChange }, ref) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent ref={ref} className="max-w-2xl max-h-[85vh] p-0 bg-background">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
              <Package className="h-5 w-5 text-white" />
            </div>
            Guia de Embalagens
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[65vh] px-6 pb-6">
          <div className="space-y-6 pt-4">
            {/* Introdução */}
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-500/20">
              <p className="text-sm text-foreground/80 leading-relaxed">
                A embalagem é o primeiro contato visual do cliente com seu produto. 
                Uma boa apresentação pode <strong>aumentar suas vendas em até 40%</strong>!
              </p>
            </div>

            {/* Grid de Embalagens */}
            <div className="grid grid-cols-1 gap-5">
              {tiposEmbalagem.map((tipo) => {
                const Icon = tipo.icon;
                return (
                  <div 
                    key={tipo.id} 
                    className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
                  >
                    {/* Imagem Principal */}
                    <div className="relative">
                      <img 
                        src={tipo.imagem} 
                        alt={tipo.nome}
                        className="w-full h-48 object-cover"
                      />
                      <div className={`absolute top-3 left-3 bg-gradient-to-r ${tipo.cor} px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg`}>
                        <Icon className="h-4 w-4 text-white" />
                        <span className="text-white text-sm font-bold">{tipo.nome}</span>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white text-xs font-medium">{tipo.custoMedio} /un</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                      <p className="text-sm text-foreground/80">{tipo.descricao}</p>
                      
                      <div className="bg-primary/5 rounded-lg p-3">
                        <p className="text-xs font-medium text-primary mb-1">📍 Indicação</p>
                        <p className="text-sm text-foreground/70">{tipo.indicacao}</p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-foreground mb-2">📦 Materiais:</p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {tipo.materiais.map((material, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-xs text-foreground/70">
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                              <span>{material}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-amber-500/10 rounded-lg p-3">
                        <p className="text-xs font-medium text-amber-600 mb-1.5">💡 Dicas Pro:</p>
                        <ul className="space-y-1">
                          {tipo.dicasPro.map((dica, idx) => (
                            <li key={idx} className="text-xs text-foreground/70">
                              • {dica}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dica Final */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
              <h4 className="font-bold text-green-600 mb-2">🎯 Dica de Ouro</h4>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Comece com embalagens simples e vá evoluindo conforme suas vendas crescem. 
                O importante é manter a <strong>higiene, identificação da marca</strong> e 
                <strong> proteção do produto</strong>!
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
});

EmbalagemModal.displayName = "EmbalagemModal";

export default EmbalagemModal;
