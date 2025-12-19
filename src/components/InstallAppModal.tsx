import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { Download, Share, Smartphone, Check, ChevronRight, Apple, Chrome } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InstallAppModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InstallAppModal({ open, onOpenChange }: InstallAppModalProps) {
  const { 
    isInstallable, 
    isInstalled, 
    isIOS, 
    isAndroid,
    canPromptInstall,
    promptInstall,
    getInstallInstructions,
    browserName
  } = usePWAInstall();
  const { toast } = useToast();

  const handleInstallClick = async () => {
    if (canPromptInstall) {
      const success = await promptInstall();
      if (success) {
        toast({
          title: "App instalado com sucesso!",
          description: "O app agora está na sua tela inicial.",
        });
        onOpenChange(false);
      }
    }
  };

  const instructions = getInstallInstructions();

  if (isInstalled) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-success" />
              </div>
              <span>App já instalado!</span>
            </DialogTitle>
          </DialogHeader>
          <div className="p-4 rounded-xl bg-success/10 border border-success/20">
            <p className="text-sm text-muted-foreground">
              O app Palha Italiana já está instalado no seu dispositivo. 
              Você pode acessá-lo diretamente pela sua tela inicial!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border/50">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
              <Download className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="gradient-text-gold">Instalar App</span>
              <p className="text-sm text-muted-foreground font-normal mt-0.5">
                Acesso rápido na sua tela inicial
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-4">
          {/* Benefits */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-card border border-border/50">
              <Smartphone className="w-5 h-5 text-primary mb-2" />
              <p className="text-xs font-medium text-foreground">Acesso Offline</p>
              <p className="text-[10px] text-muted-foreground">Funciona sem internet</p>
            </div>
            <div className="p-3 rounded-xl bg-card border border-border/50">
              <Download className="w-5 h-5 text-accent mb-2" />
              <p className="text-xs font-medium text-foreground">Carrega Rápido</p>
              <p className="text-[10px] text-muted-foreground">Como app nativo</p>
            </div>
          </div>

          {/* Install button (for browsers that support it) */}
          {canPromptInstall && (
            <button
              onClick={handleInstallClick}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
            >
              <Download className="w-5 h-5" />
              Instalar Agora
            </button>
          )}

          {/* Manual instructions */}
          {(!canPromptInstall || isIOS) && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {isIOS ? (
                  <Apple className="w-5 h-5 text-foreground" />
                ) : (
                  <Chrome className="w-5 h-5 text-foreground" />
                )}
                <h3 className="font-heading font-bold text-foreground">
                  {instructions.title}
                </h3>
              </div>
              
              <div className="space-y-2">
                {instructions.steps.map((step, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">{index + 1}</span>
                    </div>
                    <p className="text-sm text-muted-foreground flex-1">{step}</p>
                    <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  </div>
                ))}
              </div>

              {isIOS && (
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Share className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-blue-400">Dica para iPhone</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    No Safari, o botão de compartilhar fica na parte inferior da tela (ícone de quadrado com seta para cima).
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Device info */}
          <div className="pt-3 border-t border-border/50">
            <p className="text-[10px] text-muted-foreground text-center">
              Detectamos: {isIOS ? 'iPhone/iPad' : isAndroid ? 'Android' : 'Desktop'} • {browserName}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
