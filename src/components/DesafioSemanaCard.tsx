import { useState } from "react";
import { Flame, Trophy, Gift, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface DesafioSemanaCardProps {
  onClick?: () => void;
}

export function DesafioSemanaCard({ onClick }: DesafioSemanaCardProps) {
  const [vendas, setVendas] = useState(7); // Simulated current progress
  const checkpoints = [5, 10, 20];
  
  const getCheckpointStatus = (checkpoint: number) => {
    if (vendas >= checkpoint) return "completed";
    if (vendas > checkpoints[checkpoints.indexOf(checkpoint) - 1] || (checkpoint === 5 && vendas > 0)) return "active";
    return "locked";
  };

  return (
    <div 
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl p-5 cursor-pointer group"
      style={{
        background: "linear-gradient(145deg, hsl(42 100% 50% / 0.15), hsl(var(--card)))",
        border: "1px solid hsl(42 100% 50% / 0.3)",
      }}
    >
      {/* Animated glow effect */}
      <div className="absolute inset-0 opacity-50 animate-pulse" style={{
        background: "radial-gradient(circle at 30% 30%, hsl(42 100% 50% / 0.2), transparent 60%)"
      }} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-gold flex items-center justify-center shadow-[0_0_20px_hsl(var(--gold)/0.4)] pulse-glow-gold">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="tag-destaque text-[10px] py-0.5 px-2">
                🔥 NOVO
              </span>
            </div>
          </div>
          <Trophy className="w-5 h-5 text-gold floating-animation" />
        </div>

        <h3 className="font-heading font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
          Desafio da Semana
        </h3>
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
          Venda 20 unidades até domingo e ganhe recompensas exclusivas!
        </p>

        {/* Checkpoints */}
        <div className="flex items-center gap-2 mb-3">
          {checkpoints.map((checkpoint, index) => {
            const status = getCheckpointStatus(checkpoint);
            return (
              <div key={checkpoint} className="flex items-center gap-1">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  status === "completed" && "bg-gradient-to-br from-primary to-gold text-primary-foreground shadow-[0_0_15px_hsl(var(--gold)/0.5)]",
                  status === "active" && "bg-accent/20 text-accent border-2 border-accent animate-pulse",
                  status === "locked" && "bg-muted/50 text-muted-foreground"
                )}>
                  {status === "completed" ? <Check className="w-4 h-4" /> : checkpoint}
                </div>
                {index < checkpoints.length - 1 && (
                  <div className={cn(
                    "w-6 h-0.5",
                    vendas >= checkpoints[index + 1] ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-heading font-extrabold gradient-text-gold">{vendas}</span>
            <span className="text-xs text-muted-foreground">/20 vendas</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-accent">
            <Gift className="w-3 h-3" />
            <span>+150 XP</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}