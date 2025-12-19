import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, DollarSign, Calendar, Package, Sparkles } from "lucide-react";

interface SimuladorLucroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SimuladorLucroModal({ isOpen, onClose }: SimuladorLucroModalProps) {
  const [docesPerDay, setDocesPerDay] = useState(10);
  const [precoMedio, setPrecoMedio] = useState(8);
  const [diasTrabalhados, setDiasTrabalhados] = useState(20);
  
  const lucroMensal = docesPerDay * precoMedio * diasTrabalhados;
  const lucroSemanal = lucroMensal / 4;
  const lucroAnual = lucroMensal * 12;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl gradient-text-gold flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Simule seu Lucro
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Doces por dia */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-foreground">
                <Package className="w-4 h-4 text-accent" />
                Doces por dia
              </Label>
              <span className="text-xl font-bold text-primary">{docesPerDay}</span>
            </div>
            <Slider
              value={[docesPerDay]}
              onValueChange={(v) => setDocesPerDay(v[0])}
              min={5}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>

          {/* Preço médio */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-foreground">
                <DollarSign className="w-4 h-4 text-primary" />
                Preço médio (R$)
              </Label>
              <span className="text-xl font-bold text-primary">R$ {precoMedio}</span>
            </div>
            <Slider
              value={[precoMedio]}
              onValueChange={(v) => setPrecoMedio(v[0])}
              min={5}
              max={20}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>R$ 5</span>
              <span>R$ 12</span>
              <span>R$ 20</span>
            </div>
          </div>

          {/* Dias trabalhados */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-foreground">
                <Calendar className="w-4 h-4 text-accent" />
                Dias por mês
              </Label>
              <span className="text-xl font-bold text-primary">{diasTrabalhados}</span>
            </div>
            <Slider
              value={[diasTrabalhados]}
              onValueChange={(v) => setDiasTrabalhados(v[0])}
              min={5}
              max={30}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5 dias</span>
              <span>15 dias</span>
              <span>30 dias</span>
            </div>
          </div>

          {/* Resultado */}
          <div className="relative overflow-hidden rounded-2xl p-6 mt-6" style={{
            background: "linear-gradient(145deg, hsl(42 100% 50% / 0.15), hsl(var(--secondary)))",
            border: "1px solid hsl(42 100% 50% / 0.3)"
          }}>
            <Sparkles className="absolute top-3 right-3 w-5 h-5 text-primary floating-animation" />
            
            <p className="text-sm text-muted-foreground mb-2">Seu potencial de ganho:</p>
            
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-heading font-extrabold money-display">
                  R$ {lucroMensal.toLocaleString('pt-BR')}
                </span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Semanal: </span>
                  <span className="text-primary font-bold">R$ {lucroSemanal.toLocaleString('pt-BR')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Anual: </span>
                  <span className="text-gold font-bold">R$ {lucroAnual.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-accent mt-4 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Isso é só o começo! Alunas faturam até R$ 15.000/mês
            </p>
          </div>

          <Button 
            onClick={onClose}
            className="w-full btn-premium"
          >
            Começar Agora 🚀
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}