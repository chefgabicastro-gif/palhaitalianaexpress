import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronLeft, ChevronRight, Download, Palette, 
  Phone, Instagram, CreditCard, Banknote, QrCode,
  Check, Sparkles, ImageIcon
} from "lucide-react";
import { recipes } from "@/data/recipes";
import { toPng } from "html-to-image";
import { useToast } from "@/hooks/use-toast";

interface CardapioDigitalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SaborSelecionado {
  id: string;
  nome: string;
  emoji: string;
}

interface DadosCardapio {
  template: "elegante" | "moderno" | "colorido" | "sazonal";
  sabores: SaborSelecionado[];
  saborPersonalizado: string;
  precoUnitario: string;
  precoCaixa3: string;
  precoCaixa10: string;
  nomeNegocio: string;
  whatsapp: string;
  instagram: string;
  aceitaPix: boolean;
  aceitaCartao: boolean;
  aceitaDinheiro: boolean;
}

const templates = [
  { 
    id: "elegante" as const, 
    nome: "Elegante", 
    desc: "Dourado e sofisticado",
    colors: { bg: "from-zinc-900 to-zinc-800", accent: "text-amber-400", border: "border-amber-400/30" }
  },
  { 
    id: "moderno" as const, 
    nome: "Moderno", 
    desc: "Clean e minimalista",
    colors: { bg: "from-slate-50 to-white", accent: "text-slate-800", border: "border-slate-200" }
  },
  { 
    id: "colorido" as const, 
    nome: "Colorido", 
    desc: "Vibrante e alegre",
    colors: { bg: "from-pink-500 to-orange-400", accent: "text-white", border: "border-white/30" }
  },
  { 
    id: "sazonal" as const, 
    nome: "Festivo", 
    desc: "Natal e datas especiais",
    colors: { bg: "from-red-700 to-green-700", accent: "text-amber-300", border: "border-amber-300/30" }
  }
];

const saboresDisponiveis = recipes.slice(0, 20).map(r => ({
  id: r.id,
  nome: r.name.replace('Palha Italiana ', '').replace('de ', ''),
  emoji: r.categoryEmoji || "🍫"
}));

export function CardapioDigitalModal({ open, onOpenChange }: CardapioDigitalModalProps) {
  const { toast } = useToast();
  const cardapioRef = useRef<HTMLDivElement>(null);
  const [etapa, setEtapa] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  
  const [dados, setDados] = useState<DadosCardapio>({
    template: "elegante",
    sabores: [],
    saborPersonalizado: "",
    precoUnitario: "5",
    precoCaixa3: "12",
    precoCaixa10: "35",
    nomeNegocio: "",
    whatsapp: "",
    instagram: "",
    aceitaPix: true,
    aceitaCartao: true,
    aceitaDinheiro: true
  });

  const toggleSabor = (sabor: SaborSelecionado) => {
    setDados(prev => ({
      ...prev,
      sabores: prev.sabores.find(s => s.id === sabor.id)
        ? prev.sabores.filter(s => s.id !== sabor.id)
        : [...prev.sabores, sabor]
    }));
  };

  const adicionarSaborPersonalizado = () => {
    if (dados.saborPersonalizado.trim()) {
      const novoSabor = {
        id: `custom-${Date.now()}`,
        nome: dados.saborPersonalizado.trim(),
        emoji: "✨"
      };
      setDados(prev => ({
        ...prev,
        sabores: [...prev.sabores, novoSabor],
        saborPersonalizado: ""
      }));
    }
  };

  const exportarCardapio = async () => {
    if (!cardapioRef.current) return;
    
    setIsExporting(true);
    try {
      const dataUrl = await toPng(cardapioRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });
      
      const link = document.createElement('a');
      link.download = `cardapio-${dados.nomeNegocio || 'palha-italiana'}.png`;
      link.href = dataUrl;
      link.click();
      
      toast({
        title: "✅ Cardápio salvo!",
        description: "Agora é só compartilhar nas redes sociais!"
      });
    } catch (error) {
      toast({
        title: "Erro ao exportar",
        description: "Tente novamente",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getTemplateStyles = () => {
    const t = templates.find(t => t.id === dados.template)!;
    return t.colors;
  };

  const renderEtapa = () => {
    switch (etapa) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Palette className="w-12 h-12 text-primary mx-auto mb-2" />
              <h3 className="font-heading text-xl font-bold">Escolha seu estilo</h3>
              <p className="text-muted-foreground text-sm">Selecione o template do seu cardápio</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {templates.map(template => (
                <button
                  key={template.id}
                  onClick={() => setDados(prev => ({ ...prev, template: template.id }))}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    dados.template === template.id 
                      ? 'border-primary bg-primary/10 ring-2 ring-primary/20' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className={`w-full h-16 rounded-lg bg-gradient-to-br ${template.colors.bg} mb-3 flex items-center justify-center`}>
                    <span className={`font-bold ${template.id === 'moderno' ? 'text-slate-800' : 'text-white'}`}>
                      Aa
                    </span>
                  </div>
                  <p className="font-semibold text-sm">{template.nome}</p>
                  <p className="text-xs text-muted-foreground">{template.desc}</p>
                  {dados.template === template.id && (
                    <Check className="w-5 h-5 text-primary absolute top-2 right-2" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="font-heading text-xl font-bold">Quais sabores você vende?</h3>
              <p className="text-muted-foreground text-sm">Selecione todos que estão no seu cardápio</p>
            </div>
            <ScrollArea className="h-[280px] pr-4">
              <div className="grid grid-cols-2 gap-2">
                {saboresDisponiveis.map(sabor => (
                  <button
                    key={sabor.id}
                    onClick={() => toggleSabor(sabor)}
                    className={`p-3 rounded-lg border text-left text-sm transition-all flex items-center gap-2 ${
                      dados.sabores.find(s => s.id === sabor.id)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span>{sabor.emoji}</span>
                    <span className="truncate">{sabor.nome}</span>
                    {dados.sabores.find(s => s.id === sabor.id) && (
                      <Check className="w-4 h-4 ml-auto flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
            <div className="flex gap-2">
              <Input
                placeholder="Adicionar sabor personalizado..."
                value={dados.saborPersonalizado}
                onChange={e => setDados(prev => ({ ...prev, saborPersonalizado: e.target.value }))}
                onKeyPress={e => e.key === 'Enter' && adicionarSaborPersonalizado()}
              />
              <Button variant="outline" onClick={adicionarSaborPersonalizado}>+</Button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {dados.sabores.length} sabor(es) selecionado(s)
            </p>
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            <div className="text-center mb-4">
              <h3 className="font-heading text-xl font-bold">Defina seus preços</h3>
              <p className="text-muted-foreground text-sm">Configure os valores do seu cardápio</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Preço Unitário (R$)</Label>
                <Input
                  type="number"
                  placeholder="5.00"
                  value={dados.precoUnitario}
                  onChange={e => setDados(prev => ({ ...prev, precoUnitario: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium">Caixinha 3 un. (R$)</Label>
                  <Input
                    type="number"
                    placeholder="12.00"
                    value={dados.precoCaixa3}
                    onChange={e => setDados(prev => ({ ...prev, precoCaixa3: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Caixa 10 un. (R$)</Label>
                  <Input
                    type="number"
                    placeholder="35.00"
                    value={dados.precoCaixa10}
                    onChange={e => setDados(prev => ({ ...prev, precoCaixa10: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-5">
            <div className="text-center mb-4">
              <h3 className="font-heading text-xl font-bold">Suas informações</h3>
              <p className="text-muted-foreground text-sm">Como os clientes vão te encontrar?</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Nome do Negócio
                </Label>
                <Input
                  placeholder="Ex: Doces da Maria"
                  value={dados.nomeNegocio}
                  onChange={e => setDados(prev => ({ ...prev, nomeNegocio: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4" /> WhatsApp
                </Label>
                <Input
                  placeholder="(00) 00000-0000"
                  value={dados.whatsapp}
                  onChange={e => setDados(prev => ({ ...prev, whatsapp: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Instagram className="w-4 h-4" /> Instagram
                </Label>
                <Input
                  placeholder="@seuperfil"
                  value={dados.instagram}
                  onChange={e => setDados(prev => ({ ...prev, instagram: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Formas de Pagamento</Label>
                <div className="flex gap-3">
                  <label className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${dados.aceitaPix ? 'border-primary bg-primary/10' : 'border-border'}`}>
                    <Checkbox 
                      checked={dados.aceitaPix} 
                      onCheckedChange={(c) => setDados(prev => ({ ...prev, aceitaPix: c as boolean }))} 
                    />
                    <QrCode className="w-4 h-4" />
                    <span className="text-sm">PIX</span>
                  </label>
                  <label className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${dados.aceitaCartao ? 'border-primary bg-primary/10' : 'border-border'}`}>
                    <Checkbox 
                      checked={dados.aceitaCartao} 
                      onCheckedChange={(c) => setDados(prev => ({ ...prev, aceitaCartao: c as boolean }))} 
                    />
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm">Cartão</span>
                  </label>
                  <label className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${dados.aceitaDinheiro ? 'border-primary bg-primary/10' : 'border-border'}`}>
                    <Checkbox 
                      checked={dados.aceitaDinheiro} 
                      onCheckedChange={(c) => setDados(prev => ({ ...prev, aceitaDinheiro: c as boolean }))} 
                    />
                    <Banknote className="w-4 h-4" />
                    <span className="text-sm">Dinheiro</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        const styles = getTemplateStyles();
        return (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <h3 className="font-heading text-xl font-bold">Seu cardápio está pronto!</h3>
              <p className="text-muted-foreground text-sm">Clique em baixar para salvar a imagem</p>
            </div>
            
            {/* Preview do Cardápio */}
            <div className="flex justify-center">
              <div 
                ref={cardapioRef}
                className={`w-[320px] p-6 rounded-2xl bg-gradient-to-br ${styles.bg} ${styles.border} border-2 shadow-xl`}
                style={{ minHeight: '450px' }}
              >
                {/* Header */}
                <div className="text-center mb-5">
                  <h2 className={`font-heading text-2xl font-bold ${dados.template === 'moderno' ? 'text-slate-900' : 'text-white'}`}>
                    {dados.nomeNegocio || "Meu Negócio"}
                  </h2>
                  <p className={`text-sm ${dados.template === 'moderno' ? 'text-slate-600' : 'text-white/80'}`}>
                    🍫 Palha Italiana Artesanal
                  </p>
                </div>

                {/* Sabores */}
                <div className={`rounded-xl p-4 mb-4 ${dados.template === 'moderno' ? 'bg-slate-100' : 'bg-white/10'}`}>
                  <h3 className={`font-bold text-sm mb-3 ${styles.accent}`}>
                    ✨ NOSSOS SABORES
                  </h3>
                  <div className="grid grid-cols-2 gap-1">
                    {dados.sabores.slice(0, 8).map(sabor => (
                      <p key={sabor.id} className={`text-xs ${dados.template === 'moderno' ? 'text-slate-700' : 'text-white/90'}`}>
                        {sabor.emoji} {sabor.nome}
                      </p>
                    ))}
                  </div>
                  {dados.sabores.length > 8 && (
                    <p className={`text-xs mt-2 ${dados.template === 'moderno' ? 'text-slate-500' : 'text-white/70'}`}>
                      + {dados.sabores.length - 8} outros sabores
                    </p>
                  )}
                </div>

                {/* Preços */}
                <div className={`rounded-xl p-4 mb-4 ${dados.template === 'moderno' ? 'bg-slate-100' : 'bg-white/10'}`}>
                  <h3 className={`font-bold text-sm mb-3 ${styles.accent}`}>
                    💰 PREÇOS
                  </h3>
                  <div className="space-y-1">
                    <div className={`flex justify-between text-sm ${dados.template === 'moderno' ? 'text-slate-700' : 'text-white/90'}`}>
                      <span>Unidade</span>
                      <span className="font-bold">R$ {dados.precoUnitario}</span>
                    </div>
                    <div className={`flex justify-between text-sm ${dados.template === 'moderno' ? 'text-slate-700' : 'text-white/90'}`}>
                      <span>Caixinha (3 un.)</span>
                      <span className="font-bold">R$ {dados.precoCaixa3}</span>
                    </div>
                    <div className={`flex justify-between text-sm ${dados.template === 'moderno' ? 'text-slate-700' : 'text-white/90'}`}>
                      <span>Caixa (10 un.)</span>
                      <span className="font-bold">R$ {dados.precoCaixa10}</span>
                    </div>
                  </div>
                </div>

                {/* Contato */}
                <div className="text-center space-y-1">
                  {dados.whatsapp && (
                    <p className={`text-sm ${dados.template === 'moderno' ? 'text-slate-700' : 'text-white/90'}`}>
                      📱 {dados.whatsapp}
                    </p>
                  )}
                  {dados.instagram && (
                    <p className={`text-sm ${dados.template === 'moderno' ? 'text-slate-700' : 'text-white/90'}`}>
                      📸 {dados.instagram}
                    </p>
                  )}
                </div>

                {/* Pagamentos */}
                <div className={`flex justify-center gap-2 mt-4 pt-4 border-t ${dados.template === 'moderno' ? 'border-slate-200' : 'border-white/20'}`}>
                  {dados.aceitaPix && (
                    <span className={`px-2 py-1 rounded text-xs ${dados.template === 'moderno' ? 'bg-slate-200 text-slate-700' : 'bg-white/20 text-white'}`}>
                      PIX
                    </span>
                  )}
                  {dados.aceitaCartao && (
                    <span className={`px-2 py-1 rounded text-xs ${dados.template === 'moderno' ? 'bg-slate-200 text-slate-700' : 'bg-white/20 text-white'}`}>
                      Cartão
                    </span>
                  )}
                  {dados.aceitaDinheiro && (
                    <span className={`px-2 py-1 rounded text-xs ${dados.template === 'moderno' ? 'bg-slate-200 text-slate-700' : 'bg-white/20 text-white'}`}>
                      Dinheiro
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Button 
              onClick={exportarCardapio} 
              disabled={isExporting}
              className="w-full gap-2"
              size="lg"
            >
              <Download className="w-5 h-5" />
              {isExporting ? "Gerando..." : "Baixar Cardápio"}
            </Button>
          </div>
        );
    }
  };

  const podeAvancar = () => {
    switch (etapa) {
      case 1: return true;
      case 2: return dados.sabores.length > 0;
      case 3: return dados.precoUnitario !== "";
      case 4: return dados.nomeNegocio.trim() !== "";
      default: return true;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            Gerador de Cardápio
          </DialogTitle>
        </DialogHeader>

        {/* Progress bar */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map(step => (
            <div 
              key={step}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                step <= etapa ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {renderEtapa()}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 pt-4 border-t">
          {etapa > 1 && (
            <Button 
              variant="outline" 
              onClick={() => setEtapa(e => e - 1)}
              className="flex-1 gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar
            </Button>
          )}
          {etapa < 5 && (
            <Button 
              onClick={() => setEtapa(e => e + 1)}
              disabled={!podeAvancar()}
              className="flex-1 gap-2"
            >
              Próximo
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
