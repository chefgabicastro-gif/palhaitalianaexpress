import { useRef, useState, useEffect } from "react";
import { XPBadge } from "./XPBadge";
import { LevelBadge } from "./LevelBadge";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { Crown, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AVATAR_KEY = "chef-avatar";

interface UserHeaderProps {
  nome: string;
  xp: number;
  nivel: string;
  avatarUrl?: string;
}

export function UserHeader({ nome, xp, nivel, avatarUrl }: UserHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localAvatar, setLocalAvatar] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem(AVATAR_KEY);
    if (stored) setLocalAvatar(stored);
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Formato inválido", description: "Selecione uma imagem (JPG, PNG, etc.)", variant: "destructive" });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "Imagem muito grande", description: "Máximo 2MB", variant: "destructive" });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      // Compress to fit localStorage
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = 256;
        let w = img.width;
        let h = img.height;
        if (w > h) { h = (h / w) * maxSize; w = maxSize; }
        else { w = (w / h) * maxSize; h = maxSize; }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, w, h);
        const compressed = canvas.toDataURL("image/jpeg", 0.8);
        localStorage.setItem(AVATAR_KEY, compressed);
        setLocalAvatar(compressed);
        toast({ title: "Foto atualizada! 📸", description: "Ficou incrível, Chef!" });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const displayAvatar = localAvatar || avatarUrl;

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
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Top Actions */}
      <div className="w-full flex justify-end gap-2 mb-4">
        <NotificationsDropdown />
      </div>

      {/* Avatar with Premium Border */}
      <div className="relative mb-4 group cursor-pointer" onClick={handleAvatarClick}>
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden p-1 bg-gradient-to-br from-primary via-accent to-gold animate-[spin_8s_linear_infinite] hover:animate-none transition-all">
          <div className="w-full h-full rounded-xl overflow-hidden bg-card relative">
            {displayAvatar ? (
              <img 
                src={displayAvatar} 
                alt={nome} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-card text-4xl">
                👩‍🍳
              </div>
            )}
            {/* Camera overlay on hover/tap */}
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity rounded-xl">
              <Camera className="w-6 h-6 text-white mb-1" />
              <span className="text-[10px] text-white font-bold">Trocar foto</span>
            </div>
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
