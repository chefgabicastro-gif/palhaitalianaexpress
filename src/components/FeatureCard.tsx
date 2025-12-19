import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: "magenta" | "gold" | "green" | "orange";
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const iconColorClasses = {
  magenta: "bg-gradient-to-br from-accent/25 to-magenta-dark/30 text-accent shadow-[0_4px_20px_hsl(var(--accent)/0.2)]",
  gold: "bg-gradient-to-br from-primary/25 to-gold-dark/30 text-primary shadow-[0_4px_20px_hsl(var(--gold)/0.2)]",
  green: "bg-gradient-to-br from-success/25 to-success/10 text-success shadow-[0_4px_20px_hsl(var(--green-success)/0.2)]",
  orange: "bg-gradient-to-br from-orange-500/25 to-orange-600/10 text-orange-400 shadow-[0_4px_20px_rgba(251,146,60,0.2)]",
};

export function FeatureCard({
  title,
  description,
  icon: Icon,
  iconColor = "magenta",
  onClick,
  className,
  children,
}: FeatureCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn("card-feature group", className)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
          iconColorClasses[iconColor]
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <h3 className="font-heading font-bold text-base text-foreground mb-0.5 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground line-clamp-1">{description}</p>
      {children}
    </div>
  );
}