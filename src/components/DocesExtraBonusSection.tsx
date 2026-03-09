import { useState } from "react";
import { Sparkles, ChefHat, Star, ArrowRight } from "lucide-react";
import { bonusRecipeCategories, bonusRecipes, getBonusRecipesByCategory } from "@/data/bonusRecipes";
import { RecipeDetailModal } from "@/components/RecipeDetailModal";
import { Recipe } from "@/data/recipes";

import thumbBrigadeiros from '@/assets/thumbnails/bonus-brigadeiros.jpg';
import thumbTrufas from '@/assets/thumbnails/bonus-trufas.jpg';
import thumbBeijinhos from '@/assets/thumbnails/bonus-beijinhos.jpg';
import thumbBrownies from '@/assets/thumbnails/bonus-brownies.jpg';
import thumbPaoDeMel from '@/assets/thumbnails/bonus-pao-de-mel.jpg';
import thumbAlfajor from '@/assets/thumbnails/bonus-alfajor.jpg';
import thumbBemCasado from '@/assets/thumbnails/bonus-bem-casado.jpg';
import thumbDocesGelados from '@/assets/thumbnails/bonus-doces-gelados.jpg';

const categoryThumbnails: Record<string, string> = {
  brigadeiros: thumbBrigadeiros,
  trufas: thumbTrufas,
  beijinhos: thumbBeijinhos,
  brownies: thumbBrownies,
  'pao-de-mel': thumbPaoDeMel,
  alfajor: thumbAlfajor,
  'bem-casado': thumbBemCasado,
  'doces-gelados': thumbDocesGelados,
};

export function DocesExtraBonusSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const categoryRecipes = selectedCategory ? getBonusRecipesByCategory(selectedCategory) : [];
  const activeCat = bonusRecipeCategories.find(c => c.id === selectedCategory);

  return (
    <>
      <div className="mb-6 animate-fade-in" style={{ animationDelay: '32ms' }}>
        <div className="relative card-glass p-6 md:p-8 overflow-hidden rounded-2xl border-2 border-primary/30">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-gold/10 to-transparent rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-gold/5 rounded-full blur-[100px]" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/40 to-gold/30 flex items-center justify-center shadow-lg shadow-primary/20">
                  <ChefHat className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary/20 text-primary">
                      Bônus Exclusivo
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gold/20 text-gold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> {bonusRecipes.length} Receitas
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground">
                    🍬 Doces Extras para Vender
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    8 categorias de doces lucrativos com passo a passo completo
                  </p>
                </div>
              </div>
            </div>

            {/* Category Grid with Thumbnails */}
            {!selectedCategory ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {bonusRecipeCategories.map((cat) => {
                  const count = getBonusRecipesByCategory(cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className="group relative rounded-xl overflow-hidden aspect-[4/5] border border-border/50 hover:border-primary/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {/* Thumbnail */}
                      <img
                        src={categoryThumbnails[cat.id]}
                        alt={cat.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      {/* Count Badge */}
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/90 text-primary-foreground">
                          {count} receitas
                        </span>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <span className="text-2xl mb-1 block">{cat.emoji}</span>
                        <h3 className="text-sm font-bold text-white leading-tight mb-0.5">
                          {cat.name}
                        </h3>
                        <p className="text-[10px] text-white/70 line-clamp-2">
                          {cat.description}
                        </p>
                        <div className="flex items-center gap-1 mt-1.5 text-[10px] text-primary font-semibold group-hover:gap-2 transition-all">
                          Ver receitas <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Expanded Category View */
              <div>
                {/* Back Button */}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2 mb-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  <span>Voltar às categorias</span>
                </button>

                {/* Active Category Header */}
                <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-card/60 border border-border/50">
                  <img
                    src={categoryThumbnails[selectedCategory]}
                    alt={activeCat?.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <span>{activeCat?.emoji}</span> {activeCat?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{activeCat?.description}</p>
                  </div>
                </div>

                {/* Recipe Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categoryRecipes.map((recipe) => (
                    <button
                      key={recipe.id}
                      onClick={() => setSelectedRecipe(recipe)}
                      className="text-left p-4 rounded-xl bg-card/60 border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-2xl">{recipe.categoryEmoji}</span>
                        <div className="flex items-center gap-1">
                          {recipe.isPremium && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-gold/20 text-gold flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5" /> Premium
                            </span>
                          )}
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            recipe.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                            recipe.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {recipe.difficulty === 'easy' ? 'Fácil' : recipe.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                        {recipe.name}
                      </h3>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span>🎯 {recipe.yield}</span>
                        <span className="text-primary font-medium">+{recipe.xpReward} XP</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          isOpen={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </>
  );
}
