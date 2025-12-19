import { useState } from "react";
import { X, Plus, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Venda {
  id: string;
  data: string;
  quantidade: number;
  valorTotal: number;
}

interface VendasModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendas: Venda[];
  onAddVenda: (venda: Omit<Venda, "id">) => void;
}

export function VendasModal({ isOpen, onClose, vendas, onAddVenda }: VendasModalProps) {
  const [quantidade, setQuantidade] = useState<string>("");
  const [valorUnitario, setValorUnitario] = useState<string>("");
  const [data, setData] = useState<string>(new Date().toISOString().split('T')[0]);

  const handleAddVenda = () => {
    const qtd = parseInt(quantidade) || 0;
    const valor = parseFloat(valorUnitario) || 0;
    
    if (qtd > 0 && valor > 0) {
      onAddVenda({
        data,
        quantidade: qtd,
        valorTotal: qtd * valor,
      });
      setQuantidade("");
      setValorUnitario("");
    }
  };

  const totalMes = vendas.reduce((acc, v) => acc + v.valorTotal, 0);
  const totalUnidades = vendas.reduce((acc, v) => acc + v.quantidade, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="icon-box-gold">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-foreground">Minhas Vendas</h2>
            <p className="text-sm text-muted-foreground">Registre suas vendas diárias</p>
          </div>
        </div>

        {/* Resumo do Mês */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="stat-card text-center">
            <p className="text-xs text-muted-foreground mb-1">Total do Mês</p>
            <p className="text-2xl font-bold gradient-text-gold">
              R$ {totalMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="stat-card text-center">
            <p className="text-xs text-muted-foreground mb-1">Unidades Vendidas</p>
            <p className="text-2xl font-bold text-accent">{totalUnidades}</p>
          </div>
        </div>

        {/* Formulário de Nova Venda */}
        <div className="p-4 bg-secondary/50 rounded-xl mb-6">
          <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" />
            Registrar Nova Venda
          </h3>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <Label className="text-xs text-muted-foreground">Data</Label>
              <Input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="mt-1 bg-muted border-border text-sm"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Qtd</Label>
              <Input
                type="number"
                placeholder="10"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                className="mt-1 bg-muted border-border text-sm"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Valor Unit.</Label>
              <Input
                type="number"
                placeholder="6.00"
                value={valorUnitario}
                onChange={(e) => setValorUnitario(e.target.value)}
                className="mt-1 bg-muted border-border text-sm"
              />
            </div>
          </div>
          <Button 
            onClick={handleAddVenda}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Venda
          </Button>
        </div>

        {/* Lista de Vendas */}
        <div>
          <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            Histórico de Vendas
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {vendas.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhuma venda registrada ainda
              </p>
            ) : (
              vendas.map((venda) => (
                <div key={venda.id} className="stat-card flex justify-between items-center">
                  <div>
                    <p className="text-sm text-foreground">{new Date(venda.data).toLocaleDateString('pt-BR')}</p>
                    <p className="text-xs text-muted-foreground">{venda.quantidade} unidades</p>
                  </div>
                  <span className="font-bold text-success">
                    R$ {venda.valorTotal.toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
