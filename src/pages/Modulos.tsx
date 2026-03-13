import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Lock, CheckCircle, Clock, Sparkles, ChefHat, Star, Flame, Crown, Search, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { recipes, recipeCategories, Recipe } from '@/data/recipes';
import { RecipeDetailModal } from '@/components/RecipeDetailModal';

export default function Modulos() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [completedRecipes, setCompletedRecipes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [userXp, setUserXp] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    if (!user) return;
    
    try {
      // Get completed recipes from localStorage (or could be from database)
      const saved = localStorage.getItem(`completed_recipes_${user.id}`);
      if (saved) {
        setCompletedRecipes(new Set(JSON.parse(saved)));
      }

      // Get user XP
      const { data: profile } = await supabase
        .from('profiles')
        .select('xp')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profile) {
        setUserXp(profile.xp || 0);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRecipe = async (recipe: Recipe) => {
    if (!user || completedRecipes.has(recipe.id)) return;

    const newCompleted = new Set([...completedRecipes, recipe.id]);
    setCompletedRecipes(newCompleted);
    
    // Save to localStorage
    localStorage.setItem(`completed_recipes_${user.id}`, JSON.stringify([...newCompleted]));

    // Update XP in database
    const newXp = userXp + recipe.xpReward;
    setUserXp(newXp);

    await supabase
      .from('profiles')
      .update({ xp: newXp })
      .eq('user_id', user.id);

    // Add notification
    await supabase.from('notifications').insert({
      user_id: user.id,
      title: `🍫 Receita Concluída!`,
      message: `Você aprendeu "${recipe.name}"! +${recipe.xpReward} XP`,
      type: 'success'
    });

    toast({
      title: `+${recipe.xpReward} XP!`,
      description: `Receita "${recipe.name.replace('Palha Italiana ', '')}" concluída!`,
    });
  };

  const getRecipesByCategory = (categoryId: string) => 
    recipes.filter(r => r.category === categoryId);

  const getCategoryProgress = (categoryId: string) => {
    const categoryRecipes = getRecipesByCategory(categoryId);
    const completed = categoryRecipes.filter(r => completedRecipes.has(r.id)).length;
    return Math.round((completed / categoryRecipes.length) * 100);
  };

  // Search functionality
  const filteredRecipes = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    return recipes.filter(recipe => {
      // Search by name
      if (recipe.name.toLowerCase().includes(query)) return true;
      
      // Search by ingredients
      if (recipe.ingredients?.some(ing => 
        ing.item.toLowerCase().includes(query)
      )) return true;
      
      return false;
    });
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  const totalCompleted = completedRecipes.size;
  const totalRecipes = recipes.length;
  const overallProgress = Math.round((totalCompleted / totalRecipes) * 100);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-success bg-success/20';
      case 'medium': return 'text-primary bg-primary/20';
      case 'hard': return 'text-accent bg-accent/20';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Avançado';
      default: return difficulty;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="font-heading text-2xl font-bold gradient-text-gold">Meus Módulos</h1>
            <p className="text-sm text-muted-foreground">Aprenda todas as receitas</p>
          </div>
          <div className="icon-box-gold">
            <ChefHat className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por nome ou ingrediente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-10 h-12 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Search Results */}
        {isSearching && (
          <div className="mb-6 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading font-bold text-foreground">
                Resultados da busca
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredRecipes.length} {filteredRecipes.length === 1 ? 'receita encontrada' : 'receitas encontradas'}
              </span>
            </div>
            
            {filteredRecipes.length === 0 ? (
              <div className="card-glow p-8 rounded-2xl text-center">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Nenhuma receita encontrada para "{searchQuery}"</p>
                <p className="text-sm text-muted-foreground mt-1">Tente buscar por outro nome ou ingrediente</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredRecipes.map((recipe) => {
                  const isCompleted = completedRecipes.has(recipe.id);
                  const category = recipeCategories.find(c => c.id === recipe.category);
                  
                  return (
                    <div 
                      key={recipe.id}
                      className={`flex items-center gap-3 p-4 rounded-xl transition-all cursor-pointer card-glow ${
                        isCompleted 
                          ? 'bg-success/10 border border-success/20 hover:bg-success/15' 
                          : 'hover:bg-secondary/80'
                      }`}
                      onClick={() => setSelectedRecipe(recipe)}
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                        isCompleted ? 'bg-success/20' : 'bg-primary/10'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-success" />
                        ) : (
                          <span>{recipe.categoryEmoji}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-foreground text-sm truncate">
                            {recipe.name.replace('Palha Italiana ', '')}
                          </p>
                          {recipe.isPopular && (
                            <Flame className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          )}
                          {recipe.isPremium && (
                            <Crown className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground">{category?.name}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                            {getDifficultyLabel(recipe.difficulty)}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-primary">
                            <Star className="w-3 h-3" />
                            +{recipe.xpReward} XP
                          </span>
                        </div>
                      </div>
                      {!isCompleted && (
                        <div className="flex-shrink-0">
                          <Play className="w-5 h-5 text-primary" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Progress Overview - only show when not searching */}
        {!isSearching && (
          <div className="card-glow p-6 rounded-2xl mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Progresso Geral</p>
                <p className="text-2xl font-bold text-foreground">
                  {totalCompleted} / {totalRecipes} receitas
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">XP Total</p>
                <p className="text-2xl font-bold gradient-text-gold">{userXp}</p>
              </div>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2 text-center">{overallProgress}% concluído</p>
          </div>
        )}

        {/* Modules List (Recipe Categories) - only show when not searching */}
        {!isSearching && (
          <div className="space-y-4">
            {recipeCategories.map((category, index) => {
              const isExpanded = expandedModule === category.id;
              const progress = getCategoryProgress(category.id);
              const categoryRecipes = getRecipesByCategory(category.id);
              const completedInCategory = categoryRecipes.filter(r => completedRecipes.has(r.id)).length;

              return (
                <div 
                  key={category.id}
                  className="rounded-2xl overflow-hidden transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <button
                    onClick={() => setExpandedModule(isExpanded ? null : category.id)}
                    className="w-full card-glow p-5 text-left flex items-center gap-4"
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${
                      progress === 100 
                        ? 'bg-success/20' 
                        : 'bg-primary/20'
                    }`}>
                      {progress === 100 ? (
                        <CheckCircle className="w-7 h-7 text-success" />
                      ) : (
                        <span>{category.emoji}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-heading font-bold text-foreground">{category.name}</h3>
                        <span className="text-xs text-muted-foreground">
                          ({completedInCategory}/{categoryRecipes.length})
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Progress value={progress} className="flex-1 h-2" />
                        <span className="text-xs text-muted-foreground min-w-[40px]">{progress}%</span>
                      </div>
                    </div>
                  </button>

                  {/* Recipes List */}
                  {isExpanded && (
                    <div className="bg-card/50 px-5 pb-5 space-y-2 animate-fade-in">
                      {categoryRecipes.map((recipe) => {
                        const isCompleted = completedRecipes.has(recipe.id);
                        
                        return (
                          <div 
                            key={recipe.id}
                            className={`flex items-center gap-3 p-4 rounded-xl transition-all cursor-pointer ${
                              isCompleted 
                                ? 'bg-success/10 border border-success/20 hover:bg-success/15' 
                                : 'bg-secondary hover:bg-secondary/80'
                            }`}
                            onClick={() => setSelectedRecipe(recipe)}
                          >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                              isCompleted ? 'bg-success/20' : 'bg-primary/10'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="w-6 h-6 text-success" />
                              ) : (
                                <span>{recipe.categoryEmoji}</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium text-foreground text-sm truncate">
                                  {recipe.name.replace('Palha Italiana ', '')}
                                </p>
                                {recipe.isPopular && (
                                  <Flame className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                )}
                                {recipe.isPremium && (
                                  <Crown className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                                )}
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                                  {getDifficultyLabel(recipe.difficulty)}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-primary">
                                  <Star className="w-3 h-3" />
                                  +{recipe.xpReward} XP
                                </span>
                              </div>
                            </div>
                            {!isCompleted && (
                              <div className="flex-shrink-0">
                                <Play className="w-5 h-5 text-primary" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Stats Footer - only show when not searching */}
        {!isSearching && (
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="stat-card text-center">
              <p className="text-2xl font-bold gradient-text-gold">{totalRecipes}</p>
              <p className="text-xs text-muted-foreground">Receitas</p>
            </div>
            <div className="stat-card text-center">
              <p className="text-2xl font-bold text-accent">{totalCompleted}</p>
              <p className="text-xs text-muted-foreground">Concluídas</p>
            </div>
            <div className="stat-card text-center">
              <p className="text-2xl font-bold text-success">{recipeCategories.length}</p>
              <p className="text-xs text-muted-foreground">Categorias</p>
            </div>
          </div>
        )}

        {/* Recipe Detail Modal */}
        <RecipeDetailModal
          recipe={selectedRecipe}
          isOpen={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onComplete={handleCompleteRecipe}
          isCompleted={selectedRecipe ? completedRecipes.has(selectedRecipe.id) : false}
        />
      </div>
    </div>
  );
}
