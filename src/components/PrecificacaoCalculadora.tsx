import { useState, useMemo } from "react";
import { Calculator, Plus, Trash2, DollarSign, Package, Sparkles, Gift, TrendingUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Produto {
  id: string;
  nome: string;
  casca: number;
  recheio: number;
  adornos: number;
  embalagem: number;
}

const produtosExemplo: Produto[] = [
  {
    id: "1",
    nome: "Ovo de Colher de Brigadeiro 500g (Kilo)",
    casca: 12,
    recheio: 9,
    adornos: 4,
    embalagem: 5,
  },
  {
    id: "2",
    nome: "Ovo de Colher de Brigadeiro 250g (Meio Kilo)",
    casca: 8,
    recheio: 5,
    adornos: 4,
    embalagem: 4,
  },
  {
    id: "3",
    nome: "Ovo de Páscoa Tradicional 500g",
    casca: 10,
    recheio: 5,
    adornos: 4,
    embalagem: 3,
  },
];

export function PrecificacaoCalculadora() {
  const [produtos, setProdutos] = useState<Produto[]>(produtosExemplo);
  const [novoProduto, setNovoProduto] = useState<Omit<Produto, "id">>({
    nome: "",
    casca: 0,
    recheio: 0,
    adornos: 0,
    embalagem: 0,
  });

  const calcularCusto = (p: Produto) => p.casca + p.recheio + p.adornos + p.embalagem;
  const calcularPrecoVenda = (p: Produto) => calcularCusto(p) * 3;
  const calcularLucro = (p: Produto) => calcularPrecoVenda(p) - calcularCusto(p);

  const totais = useMemo(() => {
    const totalCusto = produtos.reduce((acc, p) => acc + calcularCusto(p), 0);
    const totalVenda = produtos.reduce((acc, p) => acc + calcularPrecoVenda(p), 0);
    const totalLucro = produtos.reduce((acc, p) => acc + calcularLucro(p), 0);
    return { totalCusto, totalVenda, totalLucro };
  }, [produtos]);

  const adicionarProduto = () => {
    if (!novoProduto.nome.trim()) return;
    
    setProdutos([
      ...produtos,
      {
        ...novoProduto,
        id: Date.now().toString(),
      },
    ]);
    setNovoProduto({
      nome: "",
      casca: 0,
      recheio: 0,
      adornos: 0,
      embalagem: 0,
    });
  };

  const removerProduto = (id: string) => {
    setProdutos(produtos.filter((p) => p.id !== id));
  };

  const atualizarProduto = (id: string, campo: keyof Omit<Produto, "id">, valor: string | number) => {
    setProdutos(
      produtos.map((p) =>
        p.id === id
          ? { ...p, [campo]: campo === "nome" ? valor : parseFloat(String(valor)) || 0 }
          : p
      )
    );
  };

  return (
    <div className="relative">
      {/* Glow Effect Background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-gold/30 via-primary/30 to-magenta/30 rounded-3xl blur-xl opacity-60" />
      
      <div className="relative card-glass p-4 sm:p-6 md:p-8 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gold/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-magenta/10 to-transparent rounded-full blur-2xl" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col gap-3 mb-5 sm:mb-6">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold/30 to-magenta/20 flex items-center justify-center shadow-lg shrink-0">
                <Calculator className="w-5 h-5 sm:w-7 sm:h-7 text-gold" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-0.5">
                  <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase bg-gold/20 text-gold whitespace-nowrap">
                    Ferramenta Pro
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase bg-magenta/20 text-magenta whitespace-nowrap">
                    Planilha
                  </span>
                </div>
                <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold gradient-text-gold leading-tight">
                  Calculadora de Precificação
                </h3>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground mb-5 sm:mb-6 max-w-2xl flex items-start gap-2">
            <Info className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <span>Preencha os custos de cada componente. O preço de venda é calculado automaticamente com margem de 200% (3x o custo).</span>
          </p>

          {/* Resumo Geral */}
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-border/50"
            >
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-magenta" />
                <span className="text-xs sm:text-sm text-muted-foreground">Custo Total</span>
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-magenta">
                R$ {totais.totalCusto.toFixed(2)}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gold/30"
            >
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                <span className="text-xs sm:text-sm text-muted-foreground">Faturamento</span>
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text-gold">
                R$ {totais.totalVenda.toFixed(2)}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-success/10 to-success/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-success/30"
            >
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                <span className="text-xs sm:text-sm text-muted-foreground">Lucro Total</span>
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-success">
                +R$ {totais.totalLucro.toFixed(2)}
              </div>
            </motion.div>
          </div>

          {/* Lista de Produtos */}
          <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <h4 className="font-heading font-semibold text-foreground text-sm sm:text-base">Seus Produtos</h4>
              <span className="text-[10px] sm:text-xs text-muted-foreground">({produtos.length} itens)</span>
            </div>

            {/* Header da Tabela (Desktop) */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-3 px-4 py-2 bg-muted/30 rounded-xl text-xs font-semibold text-muted-foreground uppercase">
              <div className="col-span-3">Produto</div>
              <div className="col-span-1 text-center">Casca</div>
              <div className="col-span-1 text-center">Recheio</div>
              <div className="col-span-1 text-center">Adornos</div>
              <div className="col-span-1 text-center">Embalagem</div>
              <div className="col-span-2 text-center">Custo Total</div>
              <div className="col-span-2 text-center">Preço de Venda</div>
              <div className="col-span-1"></div>
            </div>

            <AnimatePresence mode="popLayout">
              {produtos.map((produto, index) => (
                <motion.div
                  key={produto.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card/50 rounded-2xl border border-border/50 overflow-hidden hover:border-primary/30 transition-colors"
                >
                  {/* Mobile Layout */}
                  <div className="lg:hidden p-3 sm:p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <Input
                        value={produto.nome}
                        onChange={(e) => atualizarProduto(produto.id, "nome", e.target.value)}
                        placeholder="Nome do produto"
                        className="flex-1 h-9 sm:h-10 bg-muted/50 border-border/50 rounded-lg sm:rounded-xl font-medium text-sm"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removerProduto(produto.id)}
                        className="shrink-0 text-destructive hover:bg-destructive/10 h-9 w-9 sm:h-10 sm:w-10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="space-y-1">
                        <Label className="text-[10px] sm:text-xs text-muted-foreground">🍫 Casca (R$)</Label>
                        <Input
                          type="number"
                          value={produto.casca || ""}
                          onChange={(e) => atualizarProduto(produto.id, "casca", e.target.value)}
                          className="h-9 sm:h-10 bg-muted/50 border-border/50 rounded-lg sm:rounded-xl text-center text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] sm:text-xs text-muted-foreground">🍫 Recheio (R$)</Label>
                        <Input
                          type="number"
                          value={produto.recheio || ""}
                          onChange={(e) => atualizarProduto(produto.id, "recheio", e.target.value)}
                          className="h-9 sm:h-10 bg-muted/50 border-border/50 rounded-lg sm:rounded-xl text-center text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] sm:text-xs text-muted-foreground">✨ Adornos (R$)</Label>
                        <Input
                          type="number"
                          value={produto.adornos || ""}
                          onChange={(e) => atualizarProduto(produto.id, "adornos", e.target.value)}
                          className="h-9 sm:h-10 bg-muted/50 border-border/50 rounded-lg sm:rounded-xl text-center text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] sm:text-xs text-muted-foreground">📦 Embalagem (R$)</Label>
                        <Input
                          type="number"
                          value={produto.embalagem || ""}
                          onChange={(e) => atualizarProduto(produto.id, "embalagem", e.target.value)}
                          className="h-9 sm:h-10 bg-muted/50 border-border/50 rounded-lg sm:rounded-xl text-center text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-border/50">
                      <div className="text-center">
                        <span className="text-[10px] sm:text-xs text-muted-foreground block">Custo</span>
                        <span className="font-bold text-sm sm:text-base text-magenta">R$ {calcularCusto(produto).toFixed(2)}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] sm:text-xs text-muted-foreground block">Preço de Venda</span>
                        <span className="font-bold text-base sm:text-xl gradient-text-gold">R$ {calcularPrecoVenda(produto).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-12 gap-3 items-center p-4">
                    <div className="col-span-3">
                      <Input
                        value={produto.nome}
                        onChange={(e) => atualizarProduto(produto.id, "nome", e.target.value)}
                        placeholder="Nome do produto"
                        className="h-10 bg-muted/50 border-border/50 rounded-xl font-medium"
                      />
                    </div>
                    <div className="col-span-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Input
                              type="number"
                              value={produto.casca || ""}
                              onChange={(e) => atualizarProduto(produto.id, "casca", e.target.value)}
                              className="h-10 bg-muted/50 border-border/50 rounded-xl text-center"
                              placeholder="0"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Custo da Casca (R$)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="col-span-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Input
                              type="number"
                              value={produto.recheio || ""}
                              onChange={(e) => atualizarProduto(produto.id, "recheio", e.target.value)}
                              className="h-10 bg-muted/50 border-border/50 rounded-xl text-center"
                              placeholder="0"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Custo do Recheio (R$)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="col-span-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Input
                              type="number"
                              value={produto.adornos || ""}
                              onChange={(e) => atualizarProduto(produto.id, "adornos", e.target.value)}
                              className="h-10 bg-muted/50 border-border/50 rounded-xl text-center"
                              placeholder="0"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Custo dos Adornos (R$)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="col-span-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Input
                              type="number"
                              value={produto.embalagem || ""}
                              onChange={(e) => atualizarProduto(produto.id, "embalagem", e.target.value)}
                              className="h-10 bg-muted/50 border-border/50 rounded-xl text-center"
                              placeholder="0"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Custo da Embalagem (R$)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="col-span-2 text-center">
                      <div className="bg-magenta/10 rounded-xl py-2 px-3">
                        <span className="font-bold text-magenta">R$ {calcularCusto(produto).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      <div className="bg-gradient-to-r from-gold/20 to-gold/10 rounded-xl py-2 px-3">
                        <span className="font-bold text-lg gradient-text-gold">R$ {calcularPrecoVenda(produto).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="col-span-1 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removerProduto(produto.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Adicionar Novo Produto */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-dashed border-2 border-primary/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                Adicionar Novo Produto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {/* Nome do Produto - Full width on mobile */}
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Nome do Produto</Label>
                  <Input
                    value={novoProduto.nome}
                    onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
                    placeholder="Ex: Palha Italiana 500g"
                    className="h-11 bg-muted/50 border-border/50 rounded-xl"
                  />
                </div>
                
                {/* Cost inputs - 2x2 grid on mobile, 4 columns on desktop */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">🍫 Casca (R$)</Label>
                    <Input
                      type="number"
                      value={novoProduto.casca || ""}
                      onChange={(e) => setNovoProduto({ ...novoProduto, casca: parseFloat(e.target.value) || 0 })}
                      placeholder="0.00"
                      className="h-11 bg-muted/50 border-border/50 rounded-xl text-center"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">🍫 Recheio (R$)</Label>
                    <Input
                      type="number"
                      value={novoProduto.recheio || ""}
                      onChange={(e) => setNovoProduto({ ...novoProduto, recheio: parseFloat(e.target.value) || 0 })}
                      placeholder="0.00"
                      className="h-11 bg-muted/50 border-border/50 rounded-xl text-center"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">✨ Adornos (R$)</Label>
                    <Input
                      type="number"
                      value={novoProduto.adornos || ""}
                      onChange={(e) => setNovoProduto({ ...novoProduto, adornos: parseFloat(e.target.value) || 0 })}
                      placeholder="0.00"
                      className="h-11 bg-muted/50 border-border/50 rounded-xl text-center"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">📦 Embalagem (R$)</Label>
                    <Input
                      type="number"
                      value={novoProduto.embalagem || ""}
                      onChange={(e) => setNovoProduto({ ...novoProduto, embalagem: parseFloat(e.target.value) || 0 })}
                      placeholder="0.00"
                      className="h-11 bg-muted/50 border-border/50 rounded-xl text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Preview do novo produto */}
              {novoProduto.nome && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-muted/30 rounded-xl p-3 md:p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-gold shrink-0" />
                      <span className="font-medium text-sm md:text-base line-clamp-1">{novoProduto.nome}</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Custo: </span>
                        <span className="font-bold text-magenta">
                          R$ {(novoProduto.casca + novoProduto.recheio + novoProduto.adornos + novoProduto.embalagem).toFixed(2)}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Venda: </span>
                        <span className="font-bold gradient-text-gold">
                          R$ {((novoProduto.casca + novoProduto.recheio + novoProduto.adornos + novoProduto.embalagem) * 3).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <Button
                onClick={adicionarProduto}
                disabled={!novoProduto.nome.trim()}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-primary via-accent to-gold hover:opacity-90 text-white font-bold text-base shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar Produto
              </Button>
            </CardContent>
          </Card>

          {/* Dicas */}
          <div className="mt-6 p-4 bg-gold/5 rounded-2xl border border-gold/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center shrink-0">
                <span className="text-xl">💡</span>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-foreground mb-1">Dica de Precificação</h4>
                <p className="text-sm text-muted-foreground">
                  A regra dos 3x é uma margem segura que cobre custos fixos (luz, gás, etc.) e garante lucro saudável.
                  Para produtos premium, você pode usar 4x ou 5x o custo!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
