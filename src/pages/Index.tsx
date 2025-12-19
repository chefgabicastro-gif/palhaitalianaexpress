import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, Calculator, Store, Lightbulb, 
  Heart, Users, Download, Sparkles, Flame, Play,
  ChefHat, Trophy, BarChart3, Star, Zap, TrendingUp, Share2, Rocket,
  GraduationCap
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { UserHeader } from "@/components/UserHeader";
import { ModulosCard } from "@/components/ModulosCard";
import { VendasCard } from "@/components/VendasCard";
import { FeatureCard } from "@/components/FeatureCard";
import { CalculadoraModal } from "@/components/CalculadoraModal";
import { VendasModal } from "@/components/VendasModal";
import { FormasVendaModal } from "@/components/FormasVendaModal";
import { DicasModal } from "@/components/DicasModal";
import { OnboardingModal } from "@/components/OnboardingModal";
import { RecipeDetailModal } from "@/components/RecipeDetailModal";
import { DesafioSemanaCard } from "@/components/DesafioSemanaCard";
import { SimuladorLucroModal } from "@/components/SimuladorLucroModal";
import { KitVendaModal } from "@/components/KitVendaModal";
import { PrimeiraVendaModal } from "@/components/PrimeiraVendaModal";
import { useToast } from "@/hooks/use-toast";
import { recipes, getPopularRecipes } from "@/data/recipes";

interface Sale {
  id: string;
  date: string;
  quantity: number;
  total: number;
  unit_price: number;
}

interface Profile {
  name: string | null;
  xp: number;
  level: number;
  avatar_url: string | null;
}

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [calculadoraOpen, setCalculadoraOpen] = useState(false);
  const [vendasOpen, setVendasOpen] = useState(false);
  const [formasVendaOpen, setFormasVendaOpen] = useState(false);
  const [dicasOpen, setDicasOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [receitaDiaOpen, setReceitaDiaOpen] = useState(false);
  const [simuladorOpen, setSimuladorOpen] = useState(false);
  const [kitVendaOpen, setKitVendaOpen] = useState(false);
  const [primeiraVendaOpen, setPrimeiraVendaOpen] = useState(false);
  const [sales, setSales] = useState<Sale[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [modulesProgress, setModulesProgress] = useState(0);

  // Random recipe of the day (changes daily)
  const receitaDoDia = useMemo(() => {
    const popularRecipes = getPopularRecipes();
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return popularRecipes[dayOfYear % popularRecipes.length];
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
      checkOnboarding();
    }
  }, [user]);

  const checkOnboarding = () => {
    const hasCompletedOnboarding = localStorage.getItem(`onboarding_${user?.id}`);
    if (!hasCompletedOnboarding) {
      setTimeout(() => setShowOnboarding(true), 500);
    }
  };

  const handleOnboardingComplete = async () => {
    setShowOnboarding(false);
    localStorage.setItem(`onboarding_${user?.id}`, 'true');
    
    if (user) {
      const { data: currentProfile } = await supabase
        .from('profiles')
        .select('xp')
        .eq('user_id', user.id)
        .maybeSingle();
      
      const newXp = (currentProfile?.xp || 0) + 100;
      await supabase
        .from('profiles')
        .update({ xp: newXp })
        .eq('user_id', user.id);

      await supabase.from('notifications').insert({
        user_id: user.id,
        title: '🎉 Bem-vindo(a)!',
        message: 'Você ganhou +100 XP de bônus por completar o onboarding!',
        type: 'success'
      });

      toast({
        title: '🎉 +100 XP de Bônus!',
        description: 'Parabéns por completar o onboarding!',
      });

      fetchUserData();
    }
  };

  const fetchUserData = async () => {
    if (!user) return;

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (profileData) {
      setProfile(profileData);
    }

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data: salesData } = await supabase
      .from('sales')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', startOfMonth.toISOString().split('T')[0])
      .order('date', { ascending: false });

    setSales(salesData || []);

    const { data: progress } = await supabase
      .from('user_progress')
      .select('lesson_id')
      .eq('user_id', user.id)
      .eq('completed', true);

    const { data: totalLessons } = await supabase
      .from('lessons')
      .select('id');

    if (totalLessons && totalLessons.length > 0) {
      const completedCount = progress?.length || 0;
      setModulesProgress(Math.round((completedCount / totalLessons.length) * 100));
    }
  };

  const handleAddVenda = async (venda: { data: string; quantidade: number; valorTotal: number }) => {
    if (!user) return;

    const { error } = await supabase.from('sales').insert({
      user_id: user.id,
      date: venda.data,
      quantity: venda.quantidade,
      unit_price: venda.valorTotal / venda.quantidade,
      total: venda.valorTotal
    });

    if (error) {
      toast({
        title: "Erro ao salvar venda",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Venda registrada!",
        description: `+${venda.quantidade} unidades vendidas`,
      });
      fetchUserData();
      checkAchievements();
    }
  };

  const checkAchievements = async () => {
    if (!user) return;

    const { data: allSales } = await supabase
      .from('sales')
      .select('quantity, total')
      .eq('user_id', user.id);

    const totalUnits = allSales?.reduce((acc, s) => acc + s.quantity, 0) || 0;
    const totalRevenue = allSales?.reduce((acc, s) => acc + Number(s.total), 0) || 0;

    const { data: achievements } = await supabase
      .from('achievements')
      .select('*');

    const { data: userAchievements } = await supabase
      .from('user_achievements')
      .select('achievement_id')
      .eq('user_id', user.id);

    const unlockedIds = new Set(userAchievements?.map(ua => ua.achievement_id) || []);

    for (const achievement of achievements || []) {
      if (unlockedIds.has(achievement.id)) continue;

      let shouldUnlock = false;

      if (achievement.requirement_type === 'total_sales' && totalUnits >= achievement.requirement_value) {
        shouldUnlock = true;
      } else if (achievement.requirement_type === 'total_revenue' && totalRevenue >= achievement.requirement_value) {
        shouldUnlock = true;
      }

      if (shouldUnlock) {
        await supabase.from('user_achievements').insert({
          user_id: user.id,
          achievement_id: achievement.id
        });

        await supabase.from('notifications').insert({
          user_id: user.id,
          title: `🏆 Nova Conquista!`,
          message: `Você desbloqueou "${achievement.name}"! +${achievement.xp_reward} XP`,
          type: 'success'
        });

        const newXp = (profile?.xp || 0) + achievement.xp_reward;
        await supabase
          .from('profiles')
          .update({ xp: newXp })
          .eq('user_id', user.id);

        toast({
          title: `🏆 ${achievement.name}`,
          description: `Conquista desbloqueada! +${achievement.xp_reward} XP`,
        });

        fetchUserData();
      }
    }
  };

  const totalFaturamento = sales.reduce((acc, v) => acc + Number(v.total), 0);

  const vendasForModal = sales.map(s => ({
    id: s.id,
    data: s.date,
    quantidade: s.quantity,
    valorTotal: Number(s.total)
  }));

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pb-12">
        {/* Header do Usuário */}
        <UserHeader 
          nome={profile?.name || "Chef"}
          xp={profile?.xp || 0}
          nivel=""
          avatarUrl={profile?.avatar_url || undefined}
        />

        {/* HERO Card - Receita do Dia */}
        <div 
          className="card-hero p-6 md:p-8 mb-6 cursor-pointer breathe animate-fade-in"
          onClick={() => setReceitaDiaOpen(true)}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Content */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <span className="tag-hoje">
                  <Flame className="w-3 h-3" />
                  HOJE
                </span>
                <span className="tag-destaque">
                  <Star className="w-3 h-3" />
                  Destaque
                </span>
              </div>
              
              <div>
                <p className="text-muted-foreground text-sm uppercase tracking-wider mb-1">Receita do Dia</p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  {receitaDoDia?.name.replace('Palha Italiana ', '') || "Tradicional de Chocolate"}
                </h2>
              </div>

              <p className="text-muted-foreground text-sm md:text-base line-clamp-2">
                Aprenda a receita mais vendida do dia e comece a lucrar hoje mesmo!
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-primary font-bold">+{receitaDoDia?.xpReward || 50} XP</span>
                </div>
                
                <button className="btn-premium flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Começar Agora
                </button>
              </div>
            </div>

            {/* Visual Element */}
            <div className="hidden md:flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center floating-animation">
                <ChefHat className="w-16 h-16 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* HERO SECUNDÁRIO - Aulas em Vídeo */}
        <div 
          className="card-glow p-5 md:p-6 mb-6 cursor-pointer group animate-fade-in relative overflow-hidden"
          onClick={() => navigate('/aulas')}
          style={{ animationDelay: '100ms' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary/5 to-gold/10 opacity-50" />
          <div className="relative flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary/20 text-primary">
                  8 AULAS
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gold/20 text-gold">
                  +700 XP
                </span>
              </div>
              <h3 className="font-heading text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                Aulas em Vídeo
              </h3>
              <p className="text-sm text-muted-foreground">
                Domine todas as técnicas passo a passo
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Play className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Desafio da Semana + Cards Secundários */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
            <DesafioSemanaCard onClick={() => toast({ title: "🔥 Desafio em andamento!", description: "Continue vendendo para desbloquear recompensas!" })} />
          </div>
          <div 
            className="animate-fade-in cursor-pointer" 
            style={{ animationDelay: '200ms' }} 
            onClick={() => navigate('/modulos')}
          >
            <ModulosCard progress={modulesProgress} />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '250ms' }}>
            <VendasCard 
              faturamento={totalFaturamento}
              onClick={() => setVendasOpen(true)}
            />
          </div>
        </div>

        {/* Ações Rápidas - Features principais de conversão */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className="animate-fade-in next-action" style={{ animationDelay: '250ms' }}>
            <FeatureCard
              title="Primeira Venda"
              description="Guia passo a passo"
              icon={Rocket}
              iconColor="magenta"
              onClick={() => setPrimeiraVendaOpen(true)}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <FeatureCard
              title="Simular Lucro"
              description="Quanto dá pra ganhar?"
              icon={TrendingUp}
              iconColor="gold"
              onClick={() => setSimuladorOpen(true)}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '350ms' }}>
            <FeatureCard
              title="Kit de Vendas"
              description="Textos prontos"
              icon={Share2}
              iconColor="magenta"
              onClick={() => setKitVendaOpen(true)}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <FeatureCard
              title="Calculadora"
              description="Preço ideal"
              icon={Calculator}
              iconColor="gold"
              onClick={() => setCalculadoraOpen(true)}
            />
          </div>
        </div>

        {/* Features Grid - Ferramentas e Conteúdo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className="animate-fade-in" style={{ animationDelay: '450ms' }}>
            <FeatureCard
              title="Dicas Essenciais"
              description="10 dicas + 6 segredos"
              icon={Lightbulb}
              iconColor="gold"
              onClick={() => setDicasOpen(true)}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
            <FeatureCard
              title="Formas de Venda"
              description="Estratégias de lucro"
              icon={Store}
              iconColor="magenta"
              onClick={() => setFormasVendaOpen(true)}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '550ms' }}>
            <FeatureCard
              title="Gráficos"
              description="Análise de vendas"
              icon={BarChart3}
              iconColor="magenta"
              onClick={() => navigate('/graficos')}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
            <FeatureCard
              title="Todas as Receitas"
              description={`${recipes.length} sabores`}
              icon={ChefHat}
              iconColor="gold"
              onClick={() => navigate('/modulos')}
            />
          </div>
        </div>

        {/* Segunda linha de features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div className="animate-fade-in" style={{ animationDelay: '650ms' }}>
            <FeatureCard
              title="Receitas Fitness"
              description="Versões saudáveis"
              icon={Heart}
              iconColor="green"
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '700ms' }}>
            <FeatureCard
              title="Comunidade"
              description="Inspire-se!"
              icon={Users}
              iconColor="magenta"
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '750ms' }}>
            <FeatureCard
              title="Conquistas"
              description="Desbloqueie recompensas"
              icon={Trophy}
              iconColor="gold"
              onClick={() => navigate('/conquistas')}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '800ms' }}>
            <FeatureCard
              title="Erros Comuns"
              description="Evite prejuízos"
              icon={Lightbulb}
              iconColor="orange"
            />
          </div>
        </div>

        {/* Banner de Instalação Premium */}
        <div className="animate-fade-in" style={{ animationDelay: '1100ms' }}>
          <div className="card-glass p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shine-effect">
            <div className="flex items-center gap-4">
              <div className="icon-box-premium">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground flex items-center gap-2">
                  Instalar App
                  <Sparkles className="w-4 h-4 text-primary" />
                </h3>
                <p className="text-sm text-muted-foreground">Acesso offline no celular</p>
              </div>
            </div>
            <button className="btn-premium w-full sm:w-auto">
              Instalar Agora
            </button>
          </div>
        </div>
      </div>

      {/* Modais */}
      <CalculadoraModal 
        isOpen={calculadoraOpen} 
        onClose={() => setCalculadoraOpen(false)} 
      />
      <VendasModal 
        isOpen={vendasOpen} 
        onClose={() => setVendasOpen(false)}
        vendas={vendasForModal}
        onAddVenda={handleAddVenda}
      />
      <FormasVendaModal 
        isOpen={formasVendaOpen} 
        onClose={() => setFormasVendaOpen(false)} 
      />
      <DicasModal 
        isOpen={dicasOpen} 
        onClose={() => setDicasOpen(false)} 
      />
      <OnboardingModal
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
        userName={profile?.name || "Chef"}
      />
      {receitaDoDia && (
        <RecipeDetailModal
          isOpen={receitaDiaOpen}
          onClose={() => setReceitaDiaOpen(false)}
          recipe={receitaDoDia}
        />
      )}
      <SimuladorLucroModal
        isOpen={simuladorOpen}
        onClose={() => setSimuladorOpen(false)}
      />
      <KitVendaModal
        isOpen={kitVendaOpen}
        onClose={() => setKitVendaOpen(false)}
      />
      <PrimeiraVendaModal
        isOpen={primeiraVendaOpen}
        onClose={() => setPrimeiraVendaOpen(false)}
      />
    </div>
  );
};

export default Index;