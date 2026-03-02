import { XPBadge } from "./XPBadge";
import { LevelBadge } from "./LevelBadge";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { Crown } from "lucide-react";

interface UserHeaderProps {
  nome: string;
  xp: number;
  nivel: string;
  avatarUrl?: string;
}

export function UserHeader({ nome, xp, nivel, avatarUrl }: UserHeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const getLevelFromXP = (xp: number) => {
    if (xp >= 5000) return "Mestre";
    if (xp >= 2500) return "Expert";
    if (xp >= 1000) return "Avançado";
    if (xp >= 500) return "Intermediário";
    return "Iniciante";
  };

  const displayLevel = nivel || getLevelFromXP(xp);

  return (
    <div className="flex flex-col items-center text-center py-6 md:py-8">
      {/* Top Actions */}
      <div className="w-full flex justify-end gap-2 mb-4">
        <NotificationsDropdown />
      </div>

      {/* Avatar with Premium Border */}
      <div className="relative mb-4">
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden p-1 bg-gradient-to-br from-primary via-accent to-gold animate-[spin_8s_linear_infinite] hover:animate-none transition-all">
          <div className="w-full h-full rounded-xl overflow-hidden bg-card">
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt={nome} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-card text-4xl">
                👩‍🍳
              </div>
            )}
          </div>
        </div>
        
        {/* Crown for high level users */}
        {xp >= 1000 && (
          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-gold to-primary flex items-center justify-center shadow-[0_0_20px_hsl(var(--gold)/0.5)] floating-animation">
            <Crown className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
        
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
          <LevelBadge level={displayLevel} />
        </div>
      </div>

      {/* Greeting */}
      <h1 className="font-heading font-bold text-2xl md:text-3xl mb-1">
        <span className="gradient-text-premium">{getGreeting()}, Chef {nome}!</span>
        <span className="ml-2">✨</span>
      </h1>
      <p className="text-muted-foreground text-sm mb-4">
        Vamos lucrar com palha italiana hoje? 🍫
      </p>

      {/* XP Badge */}
      <XPBadge xp={xp} />
    </div>
  );
}
