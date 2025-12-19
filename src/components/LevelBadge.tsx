import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface LevelBadgeProps {
  level: string;
  className?: string;
}

export function LevelBadge({ level, className }: LevelBadgeProps) {
  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
      "bg-gradient-to-r from-accent to-magenta-dark",
      "text-accent-foreground shadow-[0_2px_20px_hsl(var(--accent)/0.4)]",
      className
    )}>
      <Star className="w-3 h-3 fill-current" />
      <span>{level}</span>
    </div>
  );
}