import { useState } from "react";
import { Sparkles, ChefHat, Star } from "lucide-react";
import { bonusRecipeCategories, bonusRecipes, getBonusRecipesByCategory } from "@/data/bonusRecipes";
import { RecipeDetailModal } from "@/components/RecipeDetailModal";
import { Recipe } from "@/data/recipes";

export function DocesExtraBonusSection() {
  const [selectedCategory, setSelectedCategory] = useState(bonusRecipeCategories[0].id);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const categoryRecipes = getBonusRecipesByCategory(selectedCategory);

  return (
    <>
      <div className="mb-6 animate-fade-in" style={{ animationDelay: '32ms' }}>
        <div className="relative card-glass p-6 overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-gold/10 to-transparent rounded-full blur-2xl" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-gold/20 flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary/20 text-primary">
                    Bônus
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gold/20 text-gold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {bonusRecipes.length} Receitas
                  </span>
                </div>
                <h2 className="text-xl font-heading font-bold text-foreground">
                  Doces Extras 🍬
                </h2>
                <p className="text-xs text-muted-foreground">
                  Brigadeiros, trufas, beijinhos, brownies e cookies para diversificar suas vendas
                </p>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
              {bonusRecipeCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'bg-card/50 text-muted-foreground border border-border/50 hover:bg-card'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-70">
                    ({getBonusRecipesByCategory(cat.id).length})
                  </span>
                </button>
              ))}
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
