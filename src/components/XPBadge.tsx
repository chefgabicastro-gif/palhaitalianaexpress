import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface XPBadgeProps {
  xp: number;
  className?: string;
}

export function XPBadge({ xp, className }: XPBadgeProps) {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold",
      "bg-gradient-to-r from-gold-dark via-primary to-gold",
      "text-primary-foreground shadow-[0_4px_30px_hsl(var(--gold)/0.4)]",
      "shine-effect hover:shadow-[0_4px_40px_hsl(var(--gold)/0.6)] transition-shadow duration-300",
      className
    )}>
      <Zap className="w-4 h-4 fill-current" />
      <span className="font-heading font-extrabold tracking-wide">{xp.toLocaleString()} XP</span>
    </div>
  );
}