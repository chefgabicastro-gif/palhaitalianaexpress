import { useState } from "react";
import { Calculator, X, DollarSign, Clock, TrendingUp, Lightbulb, Sparkles, Gift, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

interface CalculadoraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tiposVenda = [
  { value: "unidade", label: "Por Unidade", multiplicador: 1 },
  { value: "duzia", label: "Por Dúzia (12 unid.)", multiplicador: 12 },
  { value: "meia-duzia", label: "Meia Dúzia (6 unid.)", multiplicador: 6 },
  { value: "cento", label: "Por Cento (100 unid.)", multiplicador: 100 },
];

export function CalculadoraModal({ isOpen, onClose }: CalculadoraModalProps) {
  const [custoIngredientes, setCustoIngredientes] = useState<string>("25");
  const [quantidadeUnidades, setQuantidadeUnidades] = useState<string>("12");
  const [tempoPreparo, setTempoPreparo] = useState<string>("90");
  const [valorHora, setValorHora] = useState<string>("30");
  const [margemLucro, setMargemLucro] = useState<string>("100");
  const [tipoVenda, setTipoVenda] = useState<string>("duzia");

  const calcularResultados = () => {
    const ingredientes = parseFloat(custoIngredientes) || 0;
    const quantidade = parseInt(quantidadeUnidades) || 1;
    const tempo = parseFloat(tempoPreparo) || 0;
    const horaValor = parseFloat(valorHora) || 0;
    const margem = parseFloat(margemLucro) || 0;

    // Custo de mão de obra
    const maoDeObra = (tempo / 60) * horaValor;
    
    // Custo total
    const custoTotal = ingredientes + maoDeObra;
    
    // Custo por unidade
    const custoPorUnidade = custoTotal / quantidade;
    
    // Preço sugerido com margem
    const precoUnidade = custoPorUnidade * (1 + margem / 100);
    
    // Encontrar tipo de venda
    const tipoSelecionado = tiposVenda.find(t => t.value === tipoVenda) || tiposVenda[0];
    const precoLote = precoUnidade * tipoSelecionado.multiplicador;
    
    // Lucro por unidade
    const lucroPorUnidade = precoUnidade - custoPorUnidade;
    
    // Lucro total do lote
    const lucroTotal = lucroPorUnidade * tipoSelecionado.multiplicador;

    return {
      ingredientes,
      maoDeObra,
      custoTotal,
      custoPorUnidade,
      precoUnidade,
      precoLote,
      lucroPorUnidade,
      lucroTotal,
      tipoSelecionado
    };
  };

  const resultados = calcularResultados();

  const dicas = [
    { emoji: "✨", texto: "Doces gourmet podem ter margem de 150-200%" },
    { emoji: "🎁", texto: "Ofereça descontos para grandes quantidades" },
    { emoji: "🎀", texto: "Caixas decoradas podem custar 20-30% mais" },
    { emoji: "📦", texto: "Considere custo de embalagem no preço final" },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/90 backdrop-blur-md" 
          onClick={onClose} 
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-4xl bg-gradient-to-br from-card via-card to-purpleDeep/20 border border-border/50 rounded-3xl p-6 md:p-8 my-4 shadow-2xl"
        >
          {/* Efeito de glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-magenta/20 via-gold/10 to-magenta/20 rounded-3xl blur-xl opacity-50 -z-10" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-gold/20 to-magenta/20 border border-gold/30">
              <Calculator className="w-8 h-8 text-gold" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl gradient-text-gold">
                Calculadora de Preços
              </h2>
              <p className="text-muted-foreground">Descubra o preço ideal para seus doces 🍪</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Lado Esquerdo - Dados da Receita */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">⚙️</span>
                <h3 className="font-heading font-semibold text-lg text-foreground">Dados da Receita</h3>
              </div>

              {/* Custo Ingredientes */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="w-4 h-4 text-gold" />
                  Custo Total dos Ingredientes (R$)
                </Label>
                <Input
                  type="number"
                  placeholder="Ex: 25.00"
                  value={custoIngredientes}
                  onChange={(e) => setCustoIngredientes(e.target.value)}
                  className="h-12 bg-muted/50 border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 focus:ring-gold/20"
                />
              </div>

              {/* Quantidade */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground">
                  Quantas unidades essa receita rende?
                </Label>
                <Input
                  type="number"
                  placeholder="12"
                  value={quantidadeUnidades}
                  onChange={(e) => setQuantidadeUnidades(e.target.value)}
                  className="h-12 bg-muted/50 border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 focus:ring-gold/20"
                />
              </div>

              {/* Tempo de Preparo */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-magenta" />
                  Tempo de Preparo (minutos)
                </Label>
                <Input
                  type="number"
                  placeholder="Ex: 90"
                  value={tempoPreparo}
                  onChange={(e) => setTempoPreparo(e.target.value)}
                  className="h-12 bg-muted/50 border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:border-magenta/50 focus:ring-magenta/20"
                />
              </div>

              {/* Valor da Hora */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground">
                  Quanto vale sua hora? (R$/hora)
                </Label>
                <Input
                  type="number"
                  placeholder="30"
                  value={valorHora}
                  onChange={(e) => setValorHora(e.target.value)}
                  className="h-12 bg-muted/50 border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 focus:ring-gold/20"
                />
                <p className="text-xs text-magenta/80">Sugestão: R$ 20-50 para iniciantes, R$ 50-100 para experientes</p>
              </div>

              {/* Margem de Lucro */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-success" />
                  Margem de Lucro Desejada (%)
                </Label>
                <Input
                  type="number"
                  placeholder="100"
                  value={margemLucro}
                  onChange={(e) => setMargemLucro(e.target.value)}
                  className="h-12 bg-muted/50 border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:border-success/50 focus:ring-success/20"
                />
                <p className="text-xs text-magenta/80">Recomendado: 80-150% para doces artesanais</p>
              </div>

              {/* Tipo de Venda */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground">
                  Como você vai vender?
                </Label>
                <Select value={tipoVenda} onValueChange={setTipoVenda}>
                  <SelectTrigger className="h-12 bg-muted/50 border-border/50 rounded-xl text-foreground">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {tiposVenda.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value} className="text-foreground">
                        {tipo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lado Direito - Resultados */}
            <div className="space-y-5">
              {/* Análise de Custos */}
              <div className="glass-card-premium rounded-2xl p-5 border border-border/30">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">📊</span>
                  <h3 className="font-heading font-semibold text-lg text-foreground">Análise de Custos</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border/20">
                    <span className="text-muted-foreground">Ingredientes:</span>
                    <span className="font-semibold text-foreground">R$ {resultados.ingredientes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/20">
                    <span className="text-muted-foreground">Mão de obra:</span>
                    <span className="font-semibold text-foreground">R$ {resultados.maoDeObra.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-magenta/10 rounded-xl px-3 -mx-1">
                    <span className="font-semibold text-foreground">Custo Total:</span>
                    <span className="font-bold text-xl text-magenta">R$ {resultados.custoTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Custo por unidade:</span>
                    <span className="font-semibold text-foreground">R$ {resultados.custoPorUnidade.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Preço Sugerido de Venda */}
              <div className="glass-card-premium rounded-2xl p-5 border border-gold/30 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-magenta/5" />
                
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">💰</span>
                    <h3 className="font-heading font-semibold text-lg text-gold">Preço Sugerido de Venda</h3>
                  </div>

                  {/* Card de destaque do preço */}
                  <div className="bg-gradient-to-br from-magenta/20 via-purple-600/20 to-magenta/10 rounded-2xl p-6 mb-4 text-center border border-magenta/20">
                    <span className="text-sm text-muted-foreground">Por unidade</span>
                    <div className="text-4xl md:text-5xl font-bold gradient-text-gold my-2">
                      R$ {resultados.precoUnidade.toFixed(2)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      R$ {resultados.precoLote.toFixed(2)} {tipoVenda === "duzia" ? "a dúzia" : tipoVenda === "meia-duzia" ? "meia dúzia" : tipoVenda === "cento" ? "o cento" : ""}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Lucro por unidade:</span>
                      <span className="font-bold text-success">+R$ {resultados.lucroPorUnidade.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-success/10 rounded-xl px-3 -mx-1">
                      <span className="font-semibold text-foreground">
                        Lucro Total ({resultados.tipoSelecionado.multiplicador} unid.):
                      </span>
                      <span className="font-bold text-xl text-success">+R$ {resultados.lucroTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botão Salvar */}
              <Button className="w-full h-14 rounded-xl bg-gradient-to-r from-magenta via-pink-500 to-orange-400 hover:from-magenta/90 hover:via-pink-500/90 hover:to-orange-400/90 text-white font-bold text-lg shadow-lg shadow-magenta/25 transition-all duration-300 hover:shadow-xl hover:shadow-magenta/30 hover:scale-[1.02]">
                <Sparkles className="w-5 h-5 mr-2" />
                Salvar Cálculo
              </Button>

              {/* Dicas de Precificação */}
              <div className="glass-card-premium rounded-2xl p-5 border border-border/30">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-gold" />
                  <h3 className="font-heading font-semibold text-foreground">Dicas de Precificação</h3>
                </div>
                <div className="space-y-2">
                  {dicas.map((dica, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span>{dica.emoji}</span>
                      <span>{dica.texto}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
