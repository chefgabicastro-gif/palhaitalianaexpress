import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
  variant?: "outline" | "ghost" | "default";
  size?: "sm" | "default" | "icon";
  className?: string;
}

export function ShareButton({ title, text, url, variant = "outline", size = "sm", className }: ShareButtonProps) {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    const shareText = `${text}\n\n${shareUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: shareUrl });
      } catch (e: any) {
        if (e.name !== "AbortError") {
          fallbackWhatsApp(shareText);
        }
      }
    } else {
      fallbackWhatsApp(shareText);
    }
  };

  const fallbackWhatsApp = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
    toast({ title: "Compartilhar", description: "Abrindo WhatsApp..." });
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`gap-2 text-green-500 border-green-500/50 hover:bg-green-500/10 ${className || ""}`}
      onClick={handleShare}
    >
      <Share2 className="w-4 h-4" />
      Compartilhar
    </Button>
  );
}
