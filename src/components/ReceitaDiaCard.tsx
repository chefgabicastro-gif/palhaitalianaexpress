import { Sparkles } from "lucide-react";

interface ReceitaDiaCardProps {
  titulo: string;
  xpReward: number;
  onClick?: () => void;
}

export function ReceitaDiaCard({ titulo, xpReward, onClick }: ReceitaDiaCardProps) {
  return (
    <div 
      onClick={onClick}
      className="card-feature min-h-[200px] relative overflow-hidden"
      style={{
        background: `linear-gradient(145deg, hsl(var(--secondary)), hsl(var(--card))), url('/placeholder.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="tag-avancado">Avançado</span>
          <span className="tag-hoje">Hoje</span>
        </div>
        
        <div className="flex justify-center py-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center floating-animation">
            <span className="text-3xl">🍫</span>
          </div>
        </div>
        
        <div>
          <h3 className="font-heading font-bold text-xl text-foreground mb-1">
            Receita do Dia
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{titulo}</p>
          
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">+{xpReward} XP ao completar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
