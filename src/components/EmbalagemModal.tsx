import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package, Gift, Truck, ShoppingBag, Heart, Sparkles, CheckCircle2 } from "lucide-react";

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
}

const tiposEmbalagem: TipoEmbalagem[] = [
  {
    id: 1,
    nome: "Saquinho Tradicional Transparente",
    descricao: "A opção clássica e econômica. Perfeita para quem está começando e quer manter os custos baixos sem perder a qualidade visual.",
    indicacao: "Ideal para vendas em feiras, eventos, porta a porta e encomendas simples.",
    materiais: [
      "Saquinho de celofane ou BOPP (8x12cm ou 10x15cm)",
      "Fita de cetim ou laço",
      "Etiqueta adesiva com sua marca",
      "Grampeador ou seladora"
    ],
    dicasPro: [
      "Use fitas de cores que combinem com sua marca",
      "Etiquetas personalizadas aumentam a percepção de valor",
      "Seladoras térmicas dão acabamento mais profissional"
    ],
    custoMedio: "R$ 0,30 - R$ 0,80 por unidade",
    icon: Package,
    cor: "from-amber-500 to-orange-500"
  },
  {
    id: 2,
    nome: "Saquinho Kraft Personalizado",
    descricao: "Embalagem sustentável com visual rústico e charmoso. Transmite cuidado e responsabilidade ambiental.",
    indicacao: "Perfeito para feiras gourmet, lojas de produtos naturais e público consciente.",
    materiais: [
      "Saquinho kraft com visor (janela transparente)",
      "Carimbo ou adesivo da marca",
      "Barbante ou fita de juta",
      "Tag de papel reciclado"
    ],
    dicasPro: [
      "O visor permite que o cliente veja o produto",
      "Use carimbos para personalização econômica",
      "Barbante natural reforça o conceito sustentável"
    ],
    custoMedio: "R$ 0,50 - R$ 1,20 por unidade",
    icon: Heart,
    cor: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    nome: "Caixinha Individual Premium",
    descricao: "Eleva seu produto ao nível gourmet. Ideal para presentes e ocasiões especiais.",
    indicacao: "Casamentos, aniversários, brindes corporativos e datas comemorativas.",
    materiais: [
      "Caixinha de papel cartão (pode ser com visor)",
      "Papel de seda interno",
      "Adesivo ou hot stamping com logo",
      "Laço de cetim ou fita gorgorão"
    ],
    dicasPro: [
      "Hot stamping dourado aumenta muito a percepção de valor",
      "Papel de seda protege e embeleza",
      "Caixas com visor mostram o produto sem abrir"
    ],
    custoMedio: "R$ 1,50 - R$ 3,50 por unidade",
    icon: Gift,
    cor: "from-purple-500 to-pink-500"
  },
  {
    id: 4,
    nome: "Kit Presente (Múltiplas Unidades)",
    descricao: "Conjunto com várias palhas em embalagem especial. Perfeito para presentes e para aumentar o ticket médio.",
    indicacao: "Presente para família, amigos, cestas de Natal, Páscoa e datas especiais.",
    materiais: [
      "Caixa maior (pode ser de MDF, papelão ou acrílico)",
      "Palhas embaladas individualmente dentro",
      "Papel picado ou palha decorativa",
      "Cartão personalizado com mensagem"
    ],
    dicasPro: [
      "Ofereça opções de 3, 6 e 12 unidades",
      "Inclua um cartãozinho para mensagem pessoal",
      "Caixas de MDF podem ser reaproveitadas pelo cliente"
    ],
    custoMedio: "R$ 5,00 - R$ 25,00 por kit",
    icon: Sparkles,
    cor: "from-rose-500 to-red-500"
  },
  {
    id: 5,
    nome: "Embalagem para Revenda",
    descricao: "Prática e funcional para quem vende para lojistas e revendedores. Foco em proteção e apresentação em quantidade.",
    indicacao: "Atacado, consignação em lojas, cafeterias e confeitarias.",
    materiais: [
      "Bandejas de isopor ou plástico com tampa",
      "Filme PVC ou saco BOPP maior",
      "Etiqueta com informações obrigatórias",
      "Caixa de transporte resistente"
    ],
    dicasPro: [
      "Sempre inclua data de fabricação e validade",
      "Informações nutricionais são obrigatórias para revenda",
      "Organize por sabores para facilitar a conferência"
    ],
    custoMedio: "R$ 0,20 - R$ 0,50 por unidade",
    icon: ShoppingBag,
    cor: "from-blue-500 to-cyan-500"
  },
  {
    id: 6,
    nome: "Embalagem para Delivery",
    descricao: "Robusta e segura para entregas. Mantém o produto intacto mesmo em trajetos longos.",
    indicacao: "Apps de delivery, entregas próprias, envio por motoboy ou Correios.",
    materiais: [
      "Pote plástico com tampa segura ou marmitex de alumínio",
      "Papel toalha ou papel manteiga entre camadas",
      "Caixa de papelão reforçada para transporte",
      "Lacre de segurança ou adesivo 'Delivery'"
    ],
    dicasPro: [
      "Nunca empilhe muitas camadas - máximo 2 a 3",
      "Lacres de segurança aumentam a confiança do cliente",
      "Inclua bilhetinho agradecendo a compra",
      "Plástico bolha nas laterais protege em viagens longas"
    ],
    custoMedio: "R$ 1,00 - R$ 3,00 por entrega",
    icon: Truck,
    cor: "from-indigo-500 to-violet-500"
  }
];

const EmbalagemModal = ({ open, onOpenChange }: EmbalagemModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0 bg-background">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
              <Package className="h-5 w-5 text-white" />
            </div>
            Guia de Embalagens para Palha Italiana
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[65vh] px-6 pb-6">
          <div className="space-y-6 pt-4">
            {/* Introdução */}
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-500/20">
              <p className="text-sm text-foreground/80 leading-relaxed">
                A embalagem é o primeiro contato visual do cliente com seu produto. 
                Uma boa apresentação pode <strong>aumentar suas vendas em até 40%</strong> e 
                permite cobrar um valor maior pelo mesmo produto. Escolha a embalagem 
                ideal para cada ocasião!
              </p>
            </div>

            {/* Tipos de Embalagem */}
            <div className="space-y-4">
              {tiposEmbalagem.map((tipo) => {
                const Icon = tipo.icon;
                return (
                  <div 
                    key={tipo.id} 
                    className="bg-card rounded-xl border border-border overflow-hidden"
                  >
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${tipo.cor} p-4`}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{tipo.nome}</h3>
                          <p className="text-xs text-white/80">{tipo.custoMedio}</p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                      <p className="text-sm text-foreground/80">{tipo.descricao}</p>
                      
                      <div className="bg-primary/5 rounded-lg p-3">
                        <p className="text-xs font-medium text-primary">📍 Indicação</p>
                        <p className="text-sm text-foreground/70 mt-1">{tipo.indicacao}</p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-foreground mb-2">📦 Materiais necessários:</p>
                        <ul className="space-y-1">
                          {tipo.materiais.map((material, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-foreground/70">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                              <span>{material}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-amber-500/10 rounded-lg p-3">
                        <p className="text-xs font-medium text-amber-600 mb-2">💡 Dicas Pro:</p>
                        <ul className="space-y-1">
                          {tipo.dicasPro.map((dica, idx) => (
                            <li key={idx} className="text-sm text-foreground/70">
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
                <strong> proteção do produto</strong>. Teste diferentes apresentações e 
                observe qual gera mais vendas!
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EmbalagemModal;
