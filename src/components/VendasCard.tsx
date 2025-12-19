import { TrendingUp, Plus, ChevronRight } from "lucide-react";

interface VendasCardProps {
  faturamento: number;
  onClick?: () => void;
}

export function VendasCard({ faturamento, onClick }: VendasCardProps) {
  return (
    <div 
      onClick={onClick}
      className="card-glass min-h-[180px] p-5 flex flex-col justify-between cursor-pointer group hover:border-primary/40 transition-all duration-400 hover:shadow-[0_0_40px_hsl(var(--gold)/0.15)]"
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/25 to-gold-dark/30 flex items-center justify-center shadow-[0_4px_20px_hsl(var(--gold)/0.2)] group-hover:scale-110 transition-transform duration-300">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <button className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <div className="mt-4">
        <h3 className="font-heading font-bold text-lg text-foreground mb-0.5 group-hover:text-primary transition-colors">
          Minhas Vendas
        </h3>
        <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
          Faturamento do mês
          <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </p>
        
        <div className="flex items-baseline gap-1">
          <span className="text-sm text-muted-foreground">R$</span>
          <span className="money-display text-3xl">
            {faturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}