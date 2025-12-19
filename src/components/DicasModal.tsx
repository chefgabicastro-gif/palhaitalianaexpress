import { X, Lightbulb, Star, Lock } from "lucide-react";

interface DicasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const dicas = [
  { titulo: "Use chocolate de qualidade", desbloqueada: true },
  { titulo: "Temperatura ideal do chocolate", desbloqueada: true },
  { titulo: "Segredo do leite condensado", desbloqueada: true },
  { titulo: "Como evitar que mele", desbloqueada: true },
  { titulo: "Ponto certo da mistura", desbloqueada: true },
  { titulo: "Tempo de geladeira perfeito", desbloqueada: true },
  { titulo: "Corte profissional", desbloqueada: true },
  { titulo: "Embalagem que vende", desbloqueada: true },
  { titulo: "Precificação lucrativa", desbloqueada: true },
  { titulo: "Como fotografar para redes", desbloqueada: true },
];

const segredos = [
  { titulo: "Segredo da textura perfeita", desbloqueada: true },
  { titulo: "Ingrediente secreto premium", desbloqueada: true },
  { titulo: "Técnica exclusiva de corte", desbloqueada: false },
  { titulo: "Conservação por 15 dias", desbloqueada: false },
  { titulo: "Recheio que diferencia", desbloqueada: false },
  { titulo: "Ponto do biscoito", desbloqueada: false },
];

export function DicasModal({ isOpen, onClose }: DicasModalProps) {
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
            <Lightbulb className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-foreground">Dicas Essenciais</h2>
            <p className="text-sm text-muted-foreground">10 dicas + 6 segredos exclusivos</p>
          </div>
        </div>

        {/* Dicas */}
        <div className="mb-6">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            10 Dicas de Ouro
          </h3>
          <div className="space-y-2">
            {dicas.map((dica, index) => (
              <div 
                key={index}
                className="stat-card flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  {index + 1}
                </div>
                <span className="text-sm text-foreground">{dica.titulo}</span>
                {dica.desbloqueada && (
                  <Star className="w-4 h-4 text-primary ml-auto" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Segredos */}
        <div>
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-accent" />
            6 Segredos Exclusivos
          </h3>
          <div className="space-y-2">
            {segredos.map((segredo, index) => (
              <div 
                key={index}
                className={`stat-card flex items-center gap-3 ${!segredo.desbloqueada ? 'opacity-60' : ''}`}
              >
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                  {segredo.desbloqueada ? (
                    <Star className="w-3 h-3 text-accent" />
                  ) : (
                    <Lock className="w-3 h-3 text-muted-foreground" />
                  )}
                </div>
                <span className={`text-sm ${segredo.desbloqueada ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {segredo.titulo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
