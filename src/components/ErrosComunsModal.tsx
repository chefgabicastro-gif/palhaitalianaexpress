import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, CheckCircle, XCircle, Lightbulb, ThermometerSun, Clock, Scale, Flame } from "lucide-react";

interface ErrosComunsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ErroComum {
  id: number;
  titulo: string;
  descricao: string;
  consequencia: string;
  solucao: string;
  dica: string;
  icon: React.ReactNode;
  categoria: 'preparo' | 'ingredientes' | 'armazenamento' | 'tecnica';
}

const errosComuns: ErroComum[] = [
  {
    id: 1,
    titulo: "Não dar ponto na massa",
    descricao: "Tirar a massa do fogo antes do ponto certo, quando ainda está mole e escorrendo.",
    consequencia: "A palha não firma, fica mole demais e derrete na mão do cliente.",
    solucao: "Mexa até a massa desgrudar completamente do fundo da panela e formar uma bola. Isso leva de 10 a 15 minutos.",
    dica: "Teste passando a colher no fundo - se você vê o fundo da panela por 2 segundos, está no ponto!",
    icon: <Flame className="w-5 h-5" />,
    categoria: 'tecnica'
  },
  {
    id: 2,
    titulo: "Passar do ponto",
    descricao: "Deixar a massa tempo demais no fogo, ficando muito dura e ressecada.",
    consequencia: "A palha fica dura como pedra, quebradiça e com gosto de queimado.",
    solucao: "Assim que a massa formar uma bola e desgrudar, retire imediatamente do fogo.",
    dica: "Se passou um pouco, adicione 1 colher de creme de leite e misture rapidamente.",
    icon: <ThermometerSun className="w-5 h-5" />,
    categoria: 'tecnica'
  },
  {
    id: 3,
    titulo: "Usar biscoito triturado demais",
    descricao: "Bater o biscoito no liquidificador até virar farinha.",
    consequencia: "A palha perde a textura característica e fica com consistência de brigadeiro.",
    solucao: "Quebre os biscoitos com as mãos em pedaços de 1 a 2 cm. Nunca use liquidificador.",
    dica: "Pedaços irregulares são o segredo! É isso que diferencia a palha do brigadeiro.",
    icon: <Scale className="w-5 h-5" />,
    categoria: 'preparo'
  },
  {
    id: 4,
    titulo: "Adicionar biscoito na massa quente",
    descricao: "Misturar os biscoitos imediatamente após tirar a massa do fogo.",
    consequencia: "Os biscoitos amolecem e perdem a crocância, virando papa.",
    solucao: "Espere a massa amornar por 5 a 10 minutos antes de adicionar os biscoitos.",
    dica: "A massa deve estar morna (suportável ao toque), não quente.",
    icon: <Clock className="w-5 h-5" />,
    categoria: 'tecnica'
  },
  {
    id: 5,
    titulo: "Usar ingredientes de baixa qualidade",
    descricao: "Economizar usando chocolate em pó barato ou biscoito genérico.",
    consequencia: "Sabor fraco, cor pálida e cliente não volta a comprar.",
    solucao: "Use chocolate em pó com no mínimo 50% cacau e biscoitos de marca conhecida.",
    dica: "O cliente percebe a diferença! Qualidade = fidelização = mais lucro.",
    icon: <AlertTriangle className="w-5 h-5" />,
    categoria: 'ingredientes'
  },
  {
    id: 6,
    titulo: "Não refrigerar adequadamente",
    descricao: "Deixar a palha em temperatura ambiente ou não esperar tempo suficiente na geladeira.",
    consequencia: "Palha mole, difícil de cortar e que derrete rapidamente.",
    solucao: "Refrigere por no mínimo 2 horas. Idealmente, deixe de um dia para o outro.",
    dica: "Use geladeira bem gelada (2-4°C). Freezer por 30 min se tiver pressa.",
    icon: <ThermometerSun className="w-5 h-5" />,
    categoria: 'armazenamento'
  },
  {
    id: 7,
    titulo: "Cortar no tamanho errado",
    descricao: "Fazer pedaços muito grandes ou muito pequenos, sem padrão.",
    consequencia: "Dificuldade para precificar, visual amador e desperdício.",
    solucao: "Use régua e corte quadrados de 3x3cm para unidades padrão ou 4x4cm para versão grande.",
    dica: "Corte com faca aquecida em água quente para cortes perfeitos!",
    icon: <Scale className="w-5 h-5" />,
    categoria: 'tecnica'
  },
  {
    id: 8,
    titulo: "Guardar sem proteção",
    descricao: "Deixar a palha exposta ao ar ou em recipiente aberto.",
    consequencia: "Resseca por fora, absorve cheiros da geladeira e fica dura.",
    solucao: "Guarde em pote hermético com tampa. Separe camadas com papel manteiga.",
    dica: "Prazo de validade: 15 dias na geladeira, 3 meses no freezer.",
    icon: <AlertTriangle className="w-5 h-5" />,
    categoria: 'armazenamento'
  },
  {
    id: 9,
    titulo: "Não pesar os ingredientes",
    descricao: "Usar medidas 'a olho' em vez de pesar os ingredientes.",
    consequencia: "Resultado inconsistente, algumas fornadas boas, outras ruins.",
    solucao: "Use balança de cozinha digital para pesar todos os ingredientes.",
    dica: "Receita padronizada = qualidade consistente = confiança do cliente.",
    icon: <Scale className="w-5 h-5" />,
    categoria: 'ingredientes'
  },
  {
    id: 10,
    titulo: "Fogo alto demais",
    descricao: "Cozinhar a massa em fogo alto para 'acelerar' o processo.",
    consequencia: "Massa queimada no fundo, gosto amargo e textura granulada.",
    solucao: "Use sempre fogo médio-baixo e mexa constantemente.",
    dica: "Paciência é tudo! Os 15 minutos de preparo certo evitam horas de prejuízo.",
    icon: <Flame className="w-5 h-5" />,
    categoria: 'tecnica'
  }
];

const categoriaInfo = {
  preparo: { label: 'Preparo', color: 'bg-accent/20 text-accent' },
  ingredientes: { label: 'Ingredientes', color: 'bg-primary/20 text-primary' },
  armazenamento: { label: 'Armazenamento', color: 'bg-success/20 text-success' },
  tecnica: { label: 'Técnica', color: 'bg-orange-500/20 text-orange-400' }
};

export function ErrosComunsModal({ open, onOpenChange }: ErrosComunsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-border/50 bg-gradient-to-r from-destructive/10 to-orange-500/10">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <span className="gradient-text-gold">10 Erros Fatais</span>
              <p className="text-sm text-muted-foreground font-normal mt-0.5">
                Evite prejuízos e garanta a qualidade perfeita
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-4">
            {/* Intro */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-foreground font-medium mb-1">
                    Aprenda com os erros dos outros!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Estes são os erros mais comuns que fazem iniciantes perderem dinheiro e clientes. 
                    Estude cada um e nunca mais cometa!
                  </p>
                </div>
              </div>
            </div>

            {/* Lista de Erros */}
            <div className="space-y-4">
              {errosComuns.map((erro, index) => (
                <div 
                  key={erro.id}
                  className="p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
                >
                  {/* Header do erro */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-destructive font-bold text-sm">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-heading font-bold text-foreground">
                          {erro.titulo}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${categoriaInfo[erro.categoria].color}`}>
                          {categoriaInfo[erro.categoria].label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {erro.descricao}
                      </p>
                    </div>
                  </div>

                  {/* Consequência */}
                  <div className="flex items-start gap-2 mb-2 ml-13 pl-13">
                    <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-destructive uppercase">Consequência:</span>
                      <p className="text-xs text-muted-foreground">{erro.consequencia}</p>
                    </div>
                  </div>

                  {/* Solução */}
                  <div className="flex items-start gap-2 mb-2 ml-13 pl-13">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-success uppercase">Solução:</span>
                      <p className="text-xs text-muted-foreground">{erro.solucao}</p>
                    </div>
                  </div>

                  {/* Dica Pro */}
                  <div className="flex items-start gap-2 ml-13 pl-13 p-2 rounded-lg bg-primary/5 border border-primary/10">
                    <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-primary uppercase">Dica Pro:</span>
                      <p className="text-xs text-muted-foreground">{erro.dica}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-success/10 to-primary/10 border border-success/20">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-success" />
                <div>
                  <p className="text-sm text-foreground font-bold">
                    Evite esses erros e você já está à frente de 90% da concorrência!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Qualidade consistente é o que fideliza clientes e constrói sua reputação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
