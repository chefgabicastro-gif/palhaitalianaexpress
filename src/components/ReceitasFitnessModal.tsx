import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, Flame, Clock, Star, Leaf, Zap, Apple } from "lucide-react";

interface ReceitasFitnessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ReceitaFitness {
  id: number;
  nome: string;
  descricao: string;
  calorias: string;
  proteina: string;
  rendimento: string;
  tempo: string;
  ingredientes: string[];
  modoPreparo: string[];
  dica: string;
  tag: 'low-carb' | 'proteica' | 'sem-acucar' | 'vegana' | 'sem-gluten';
  destaque?: boolean;
}

const receitasFitness: ReceitaFitness[] = [
  {
    id: 1,
    nome: "Palha Fit de Cacau com Whey",
    descricao: "A favorita dos atletas! Rica em proteína e baixa em açúcar.",
    calorias: "85 kcal",
    proteina: "8g",
    rendimento: "30 unidades",
    tempo: "25 min",
    ingredientes: [
      "200g de pasta de amendoim natural (sem açúcar)",
      "2 scoops de whey protein sabor chocolate",
      "3 colheres de cacau em pó 100%",
      "3 colheres de mel ou xilitol",
      "100g de biscoito integral sem açúcar",
      "2 colheres de óleo de coco"
    ],
    modoPreparo: [
      "Aqueça a pasta de amendoim com o óleo de coco em fogo baixo",
      "Adicione o whey, o cacau e o adoçante, misturando bem",
      "Retire do fogo e deixe amornar por 5 minutos",
      "Quebre os biscoitos em pedaços médios e misture",
      "Despeje em forma e leve à geladeira por 2 horas",
      "Corte em cubos e finalize com cacau em pó"
    ],
    dica: "Use whey isolado para menos carboidrato. Cada unidade tem 8g de proteína!",
    tag: 'proteica',
    destaque: true
  },
  {
    id: 2,
    nome: "Palha Italiana Low Carb",
    descricao: "Apenas 3g de carboidrato por unidade! Perfeita para dieta cetogênica.",
    calorias: "95 kcal",
    proteina: "4g",
    rendimento: "35 unidades",
    tempo: "30 min",
    ingredientes: [
      "400g de cream cheese",
      "100g de chocolate 85% cacau derretido",
      "4 colheres de eritritol",
      "1 colher de essência de baunilha",
      "150g de amêndoas laminadas torradas",
      "50g de coco ralado sem açúcar"
    ],
    modoPreparo: [
      "Bata o cream cheese com o eritritol até ficar cremoso",
      "Adicione o chocolate derretido (morno) e a baunilha",
      "Misture até ficar homogêneo",
      "Incorpore as amêndoas laminadas",
      "Despeje em forma forrada e refrigere por 3 horas",
      "Corte e passe no coco ralado"
    ],
    dica: "Substitui perfeitamente a versão tradicional em festas low carb. Cobra até 100% a mais!",
    tag: 'low-carb'
  },
  {
    id: 3,
    nome: "Palha de Banana com Aveia",
    descricao: "Naturalmente doce, sem açúcar adicionado. Energia pura!",
    calorias: "72 kcal",
    proteina: "3g",
    rendimento: "40 unidades",
    tempo: "35 min",
    ingredientes: [
      "4 bananas maduras amassadas",
      "1 xícara de aveia em flocos",
      "3 colheres de cacau em pó",
      "2 colheres de mel",
      "1 colher de canela em pó",
      "100g de castanhas picadas",
      "50g de nibs de cacau"
    ],
    modoPreparo: [
      "Amasse as bananas até formar um purê",
      "Adicione a aveia, cacau, mel e canela, misturando bem",
      "Leve ao fogo baixo por 8-10 minutos, mexendo sempre",
      "A massa deve ficar consistente e brilhante",
      "Retire, espere amornar e adicione castanhas",
      "Molde em forma, refrigere e finalize com nibs de cacau"
    ],
    dica: "Use bananas bem maduras (com pintinhas pretas) para máxima doçura natural!",
    tag: 'sem-acucar'
  },
  {
    id: 4,
    nome: "Palha Vegana de Chocolate",
    descricao: "100% vegetal, cremosa e irresistível. Ninguém percebe a diferença!",
    calorias: "88 kcal",
    proteina: "2g",
    rendimento: "35 unidades",
    tempo: "30 min",
    ingredientes: [
      "1 lata de leite de coco",
      "200g de chocolate 70% cacau vegano",
      "3 colheres de açúcar de coco",
      "2 colheres de óleo de coco",
      "200g de biscoito vegano (tipo Maria)",
      "Cacau em pó para finalizar"
    ],
    modoPreparo: [
      "Aqueça o leite de coco com o açúcar em fogo médio",
      "Adicione o chocolate picado e mexa até derreter",
      "Acrescente o óleo de coco e continue mexendo",
      "Cozinhe por 10 minutos até engrossar",
      "Retire, espere amornar e misture os biscoitos quebrados",
      "Coloque em forma, refrigere e finalize com cacau"
    ],
    dica: "Mercado vegano está em alta! Essa versão pode custar até 80% mais caro.",
    tag: 'vegana'
  },
  {
    id: 5,
    nome: "Palha Sem Glúten de Coco",
    descricao: "Para celíacos e intolerantes. Textura incrível com coco!",
    calorias: "92 kcal",
    proteina: "3g",
    rendimento: "35 unidades",
    tempo: "35 min",
    ingredientes: [
      "1 lata de leite condensado (verificar se é sem glúten)",
      "1 caixa de creme de leite",
      "100g de coco ralado",
      "3 colheres de cacau em pó",
      "200g de biscoito de arroz triturado grosseiramente",
      "Coco em flocos para finalizar"
    ],
    modoPreparo: [
      "Misture leite condensado, creme de leite, coco e cacau na panela",
      "Cozinhe em fogo médio por 12-15 minutos, mexendo sempre",
      "O ponto é quando desgruda do fundo",
      "Retire, espere amornar e adicione o biscoito de arroz",
      "Despeje em forma e leve à geladeira por 2 horas",
      "Corte e passe no coco em flocos"
    ],
    dica: "Sempre verifique se todos os ingredientes são certificados sem glúten!",
    tag: 'sem-gluten'
  },
  {
    id: 6,
    nome: "Palha Proteica de Amendoim",
    descricao: "30g de proteína por porção de 4 unidades! Pós-treino perfeito.",
    calorias: "110 kcal",
    proteina: "10g",
    rendimento: "25 unidades",
    tempo: "20 min",
    ingredientes: [
      "300g de pasta de amendoim integral",
      "3 scoops de whey protein sabor baunilha",
      "4 colheres de mel",
      "2 colheres de cacau em pó",
      "100g de aveia em flocos finos",
      "Amendoim picado para finalizar"
    ],
    modoPreparo: [
      "Misture a pasta de amendoim com o mel em uma tigela",
      "Adicione o whey, cacau e aveia, misturando bem",
      "Trabalhe a massa com as mãos até ficar homogênea",
      "Pressione em uma forma forrada",
      "Leve à geladeira por 1 hora",
      "Corte e finalize com amendoim picado"
    ],
    dica: "Venda para academias e personal trainers! Público fiel e recorrente.",
    tag: 'proteica',
    destaque: true
  },
  {
    id: 7,
    nome: "Palha Detox de Matcha",
    descricao: "Antioxidante e energizante natural. Sabor único e sofisticado!",
    calorias: "78 kcal",
    proteina: "2g",
    rendimento: "30 unidades",
    tempo: "30 min",
    ingredientes: [
      "1 lata de leite condensado",
      "1 caixa de creme de leite",
      "2 colheres de chá de matcha em pó",
      "1 colher de mel",
      "200g de biscoito integral",
      "Matcha para polvilhar"
    ],
    modoPreparo: [
      "Misture o leite condensado, creme de leite e matcha na panela",
      "Cozinhe em fogo baixo por 10-12 minutos, mexendo sempre",
      "Adicione o mel e continue até dar ponto",
      "Retire, espere amornar e misture os biscoitos",
      "Despeje em forma e refrigere por 2 horas",
      "Corte e polvilhe matcha na superfície"
    ],
    dica: "Matcha é tendência! Público fitness e natural adora. Visual verde impressiona!",
    tag: 'sem-acucar'
  }
];

const tagInfo = {
  'low-carb': { label: 'Low Carb', color: 'bg-orange-500/20 text-orange-400', icon: Flame },
  'proteica': { label: 'Proteica', color: 'bg-primary/20 text-primary', icon: Zap },
  'sem-acucar': { label: 'Sem Açúcar', color: 'bg-success/20 text-success', icon: Apple },
  'vegana': { label: 'Vegana', color: 'bg-accent/20 text-accent', icon: Leaf },
  'sem-gluten': { label: 'Sem Glúten', color: 'bg-yellow-500/20 text-yellow-400', icon: Star }
};

export function ReceitasFitnessModal({ open, onOpenChange }: ReceitasFitnessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-border/50 bg-gradient-to-r from-success/10 to-primary/10">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
              <Heart className="w-6 h-6 text-success" />
            </div>
            <div>
              <span className="gradient-text-gold">Receitas Fitness</span>
              <p className="text-sm text-muted-foreground font-normal mt-0.5">
                {receitasFitness.length} versões saudáveis para lucrar mais
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-4">
            {/* Intro */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-success/10 to-primary/10 border border-success/20">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <p className="text-sm text-foreground font-medium mb-1">
                    Mercado fitness: lucro até 100% maior!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Clientes fitness pagam mais por produtos de qualidade. 
                    Estas receitas têm apelo nutricional e são perfeitas para academias, 
                    nutricionistas e personal trainers.
                  </p>
                </div>
              </div>
            </div>

            {/* Tags de filtro visual */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(tagInfo).map(([key, info]) => {
                const IconComponent = info.icon;
                return (
                  <span 
                    key={key}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 ${info.color}`}
                  >
                    <IconComponent className="w-3 h-3" />
                    {info.label}
                  </span>
                );
              })}
            </div>

            {/* Lista de Receitas */}
            <div className="space-y-4">
              {receitasFitness.map((receita) => {
                const TagIcon = tagInfo[receita.tag].icon;
                return (
                  <div 
                    key={receita.id}
                    className={`p-4 rounded-xl bg-card border transition-colors ${
                      receita.destaque 
                        ? 'border-primary/50 ring-1 ring-primary/20' 
                        : 'border-border/50 hover:border-primary/30'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 ${tagInfo[receita.tag].color}`}>
                            <TagIcon className="w-3 h-3" />
                            {tagInfo[receita.tag].label}
                          </span>
                          {receita.destaque && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gold/20 text-gold flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Popular
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading font-bold text-foreground text-lg">
                          {receita.nome}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {receita.descricao}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      <div className="text-center p-2 rounded-lg bg-secondary/50">
                        <Flame className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                        <p className="text-xs font-bold text-foreground">{receita.calorias}</p>
                        <p className="text-[10px] text-muted-foreground">por unid.</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-secondary/50">
                        <Zap className="w-4 h-4 text-primary mx-auto mb-1" />
                        <p className="text-xs font-bold text-foreground">{receita.proteina}</p>
                        <p className="text-[10px] text-muted-foreground">proteína</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-secondary/50">
                        <Star className="w-4 h-4 text-gold mx-auto mb-1" />
                        <p className="text-xs font-bold text-foreground">{receita.rendimento}</p>
                        <p className="text-[10px] text-muted-foreground">rende</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-secondary/50">
                        <Clock className="w-4 h-4 text-accent mx-auto mb-1" />
                        <p className="text-xs font-bold text-foreground">{receita.tempo}</p>
                        <p className="text-[10px] text-muted-foreground">preparo</p>
                      </div>
                    </div>

                    {/* Ingredientes */}
                    <div className="mb-3">
                      <h4 className="text-xs font-bold text-foreground uppercase mb-2 flex items-center gap-1">
                        <Leaf className="w-3 h-3 text-success" />
                        Ingredientes
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {receita.ingredientes.map((ing, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 rounded-lg bg-secondary/50 text-[11px] text-muted-foreground"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Modo de preparo resumido */}
                    <div className="mb-3">
                      <h4 className="text-xs font-bold text-foreground uppercase mb-2">
                        Modo de Preparo
                      </h4>
                      <ol className="space-y-1">
                        {receita.modoPreparo.map((passo, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex gap-2">
                            <span className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 text-[10px] font-bold">
                              {idx + 1}
                            </span>
                            {passo}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Dica */}
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-primary uppercase">Dica de Venda:</span>
                          <p className="text-xs text-muted-foreground">{receita.dica}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-success/10 border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-foreground font-bold">
                    Dica de Ouro: Parcerias com academias!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Ofereça amostras para personal trainers. Eles indicam para todos os alunos!
                    Uma parceria pode render dezenas de clientes fiéis.
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
