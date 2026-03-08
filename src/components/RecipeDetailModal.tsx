import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Recipe } from "@/data/recipes";
import { Clock, ChefHat, Snowflake, Lightbulb, CheckCircle2, Star, Download, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRecipePDF } from "@/hooks/useRecipePDF";
import { CaptionGeneratorButton } from "@/components/CaptionGeneratorButton";
import { ShareButton } from "@/components/ShareButton";
import { SubstituteButton } from "@/components/SubstituteButton";
import { CookingMode } from "@/components/CookingMode";

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (recipe: Recipe) => void;
  isCompleted?: boolean;
}

export const RecipeDetailModal = ({ 
  recipe, 
  isOpen, 
  onClose, 
  onComplete,
  isCompleted 
}: RecipeDetailModalProps) => {
  const { generateRecipePDF } = useRecipePDF();
  const [cookingMode, setCookingMode] = useState(false);

  const difficultyColors = {
    easy: 'bg-success/20 text-success',
    medium: 'bg-warning/20 text-warning',
    hard: 'bg-destructive/20 text-destructive'
  };

  const difficultyLabels = {
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil'
  };

  if (!recipe) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0 bg-background">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-2xl">{recipe.categoryEmoji}</span>
                  <Badge className={difficultyColors[recipe.difficulty]}>
                    {difficultyLabels[recipe.difficulty]}
                  </Badge>
                  <Badge variant="outline" className="text-primary">
                    +{recipe.xpReward} XP
                  </Badge>
                  {isCompleted && (
                    <Badge className="bg-success/20 text-success">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Concluída
                    </Badge>
                  )}
                </div>
                <DialogTitle className="text-xl font-bold text-foreground">
                  {recipe.name}
                </DialogTitle>
              </div>
            </div>
            
            <div className="flex gap-4 mt-4 text-sm text-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {recipe.prepTime}
              </div>
              <div className="flex items-center gap-1">
                <ChefHat className="w-4 h-4" />
                {recipe.yield}
              </div>
            </div>

            {/* Modo Cozinha Button */}
            <Button
              className="w-full mt-4 h-12 text-base font-bold gap-2 bg-gradient-to-r from-accent to-primary rounded-xl"
              onClick={() => setCookingMode(true)}
            >
              <Flame className="w-5 h-5" />
              Modo Cozinha
            </Button>

            {/* Share & Download Buttons */}
            <div className="flex flex-wrap gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2"
                onClick={() => generateRecipePDF(recipe)}
              >
                <Download className="w-4 h-4" />
                Baixar PDF
              </Button>
              <ShareButton
                title={recipe.name}
                text={`🍫 Receita: ${recipe.name}\n📋 Rendimento: ${recipe.yield}\n⏱ Tempo: ${recipe.prepTime}\n\nConfira essa receita incrível de palha italiana!`}
              />
              <CaptionGeneratorButton recipeName={recipe.name} />
            </div>
          </DialogHeader>

          <ScrollArea className="max-h-[55vh] px-6">
            {/* Ingredientes */}
            <div className="py-4">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <span className="text-xl">🥄</span> Ingredientes
              </h3>
              <div className="grid gap-2">
                {recipe.ingredients.map((ing, index) => (
                  <div key={index} className="rounded-xl bg-secondary/50 overflow-hidden">
                    <div className="flex items-center gap-3 p-3">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="font-medium">{ing.quantity} {ing.unit}</span>
                        <span className="text-muted-foreground ml-1">{ing.item}</span>
                        {ing.notes && (
                          <span className="text-xs text-muted-foreground italic ml-1">({ing.notes})</span>
                        )}
                      </div>
                    </div>
                    <div className="px-3 pb-2">
                      <SubstituteButton ingredientName={`${ing.quantity} ${ing.unit} de ${ing.item}`} recipeName={recipe.name} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Modo de Preparo */}
            <div className="py-4">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <span className="text-xl">👩‍🍳</span> Modo de Preparo
              </h3>
              <div className="space-y-3">
                {recipe.steps.map((step) => (
                  <div 
                    key={step.step}
                    className="flex gap-3 p-3 rounded-lg bg-secondary/30"
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground">{step.instruction}</p>
                      {step.tip && (
                        <div className="mt-2 flex items-start gap-2 text-sm text-warning bg-warning/10 p-2 rounded-md">
                          <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{step.tip}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Congelamento */}
            <div className="py-4">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Snowflake className="w-5 h-5 text-blue-400" />
                Congelamento
              </h3>
              <div className="space-y-2 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    {recipe.freezing.canFreeze ? `Até ${recipe.freezing.duration}` : 'Não recomendado'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>Como congelar:</strong> {recipe.freezing.instructions}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Descongelamento:</strong> {recipe.freezing.thawing}
                </p>
              </div>
            </div>

            <Separator />

            {/* Dicas */}
            <div className="py-4">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Dicas de Ouro
              </h3>
              <div className="space-y-2">
                {recipe.tips.map((tip, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-2 p-2 rounded-lg bg-yellow-500/10"
                  >
                    <span className="text-yellow-400">💡</span>
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t">
            {isCompleted ? (
              <Button className="w-full" variant="outline" disabled>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Receita já concluída!
              </Button>
            ) : (
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => {
                  onComplete?.(recipe);
                  onClose();
                }}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Marcar como concluída (+{recipe.xpReward} XP)
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Cooking Mode Fullscreen */}
      <CookingMode 
        recipe={recipe} 
        isOpen={cookingMode} 
        onClose={() => setCookingMode(false)} 
      />
    </>
  );
};
