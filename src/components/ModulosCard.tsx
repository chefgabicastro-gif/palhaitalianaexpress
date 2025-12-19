import { BookOpen, Sparkles, ChevronRight } from "lucide-react";
import { ProgressRing } from "@/components/ui/progress-ring";

interface ModulosCardProps {
  progress: number;
  onClick?: () => void;
}

export function ModulosCard({ progress, onClick }: ModulosCardProps) {
  return (
    <div 
      onClick={onClick}
      className="card-glass min-h-[180px] p-5 flex flex-col justify-between cursor-pointer group hover:border-accent/40 transition-all duration-400 hover:shadow-[0_0_40px_hsl(var(--accent)/0.15)]"
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/25 to-purple-medium/30 flex items-center justify-center shadow-[0_4px_20px_hsl(var(--accent)/0.2)] group-hover:scale-110 transition-transform duration-300">
          <BookOpen className="w-5 h-5 text-accent" />
        </div>
        <Sparkles className="w-5 h-5 text-primary floating-animation" />
      </div>
      
      <div className="flex items-end justify-between mt-4">
        <div>
          <h3 className="font-heading font-bold text-lg text-foreground mb-0.5 group-hover:text-accent transition-colors">
            Meus Módulos
          </h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Continue aprendendo
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>
        
        <div className="transform group-hover:scale-105 transition-transform duration-300">
          <ProgressRing progress={progress} size={72} strokeWidth={6} />
        </div>
      </div>
    </div>
  );
}