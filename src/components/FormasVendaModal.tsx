import { X, Store, Users, Instagram, ShoppingBag, Briefcase, Coffee } from "lucide-react";

interface FormasVendaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formasVenda = [
  {
    icon: Store,
    titulo: "Ponto Fixo",
    descricao: "Venda em seu próprio espaço ou loja",
    dica: "Ideal para quem quer ter um local próprio",
    cor: "text-primary",
  },
  {
    icon: Users,
    titulo: "Encomendas",
    descricao: "Receba pedidos personalizados",
    dica: "Sem desperdício, produza sob demanda",
    cor: "text-accent",
  },
  {
    icon: Instagram,
    titulo: "Redes Sociais",
    descricao: "Venda pelo Instagram e WhatsApp",
    dica: "Alcance mais clientes online",
    cor: "text-pink-500",
  },
  {
    icon: ShoppingBag,
    titulo: "Delivery",
    descricao: "Entregue na casa do cliente",
    dica: "iFood, Rappi ou entrega própria",
    cor: "text-orange-400",
  },
  {
    icon: Briefcase,
    titulo: "Escritórios",
    descricao: "Venda para empresas e funcionários",
    dica: "Volume grande e recorrente",
    cor: "text-blue-400",
  },
  {
    icon: Coffee,
    titulo: "Cafeterias",
    descricao: "Forneça para estabelecimentos",
    dica: "Parceria que rende lucro fixo",
    cor: "text-amber-500",
  },
];

export function FormasVendaModal({ isOpen, onClose }: FormasVendaModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="icon-box text-accent">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-foreground">Formas de Venda</h2>
            <p className="text-sm text-muted-foreground">Estratégias para vender sua palha italiana</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formasVenda.map((forma, index) => {
            const Icon = forma.icon;
            return (
              <div 
                key={index}
                className="card-feature p-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <Icon className={`w-5 h-5 ${forma.cor}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{forma.titulo}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{forma.descricao}</p>
                    <p className="text-xs text-primary">💡 {forma.dica}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
