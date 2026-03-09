import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, Calculator, Store, Lightbulb, 
  Heart, Users, Download, Sparkles, Flame, Play,
  ChefHat, Trophy, BarChart3, Star, Zap, TrendingUp, Share2, Rocket,
  GraduationCap, Package, FileImage, Megaphone, Palette, MessageCircle, FileText
} from "lucide-react";
import thumbPalhaTradicional from "@/assets/thumbnails/aula-palha-tradicional.jpg";
import thumbPalhaNinho from "@/assets/thumbnails/aula-palha-ninho.jpg";
import thumbPalhaLimao from "@/assets/thumbnails/aula-palha-limao.jpg";
import thumbPalhaPistache from "@/assets/thumbnails/aula-palha-pistache.jpg";
import { supabase } from "@/integrations/supabase/client";
import { UserHeader } from "@/components/UserHeader";
import { ModulosCard } from "@/components/ModulosCard";
import { VendasCard } from "@/components/VendasCard";
import { FeatureCard } from "@/components/FeatureCard";
import { CalculadoraModal } from "@/components/CalculadoraModal";
import { VendasModal } from "@/components/VendasModal";
import { FormasVendaModal } from "@/components/FormasVendaModal";
import { DicasModal } from "@/components/DicasModal";

import { RecipeDetailModal } from "@/components/RecipeDetailModal";
import { DesafioSemanaCard } from "@/components/DesafioSemanaCard";
import { SimuladorLucroModal } from "@/components/SimuladorLucroModal";
import { KitVendaModal } from "@/components/KitVendaModal";
import { PrimeiraVendaModal } from "@/components/PrimeiraVendaModal";
import { ErrosComunsModal } from "@/components/ErrosComunsModal";
import { ReceitasFitnessModal } from "@/components/ReceitasFitnessModal";
import EmbalagemModal from "@/components/EmbalagemModal";
import { InstallAppModal } from "@/components/InstallAppModal";
import { CardapioDigitalModal } from "@/components/CardapioDigitalModal";
import { VideoPlayerModal } from "@/components/VideoPlayerModal";
import EbookModal from "@/components/EbookModal";
import { FeaturedLessonModal } from "@/components/FeaturedLessonModal";
import { PrecificacaoCalculadora } from "@/components/PrecificacaoCalculadora";
import { BoloCaseiroBonusSection } from "@/components/BoloCaseiroBonusSection";
import { DocesExtraBonusSection } from "@/components/DocesExtraBonusSection";
import { useToast } from "@/hooks/use-toast";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useNotifications } from "@/hooks/useNotifications";
import { recipes, getPopularRecipes } from "@/data/recipes";
import { videoLessons } from "@/data/videoLessons";
import { useLocalProgress } from "@/hooks/useLocalProgress";

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
  const chefName = localStorage.getItem('chef-name') || 'Chef';
  const { toast } = useToast();
  const { notifyAppInstalled } = useNotifications();
  const { xp, level, markLessonWatched, markRecipeCompleted, isLessonWatched, isRecipeCompleted, sales, addSale } = useLocalProgress();
  const [calculadoraOpen, setCalculadoraOpen] = useState(false);
  const [vendasOpen, setVendasOpen] = useState(false);
  const [formasVendaOpen, setFormasVendaOpen] = useState(false);
  const [dicasOpen, setDicasOpen] = useState(false);
  
  const [receitaDiaOpen, setReceitaDiaOpen] = useState(false);
  const [simuladorOpen, setSimuladorOpen] = useState(false);
  const [kitVendaOpen, setKitVendaOpen] = useState(false);
  const [primeiraVendaOpen, setPrimeiraVendaOpen] = useState(false);
  const [errosComunsOpen, setErrosComunsOpen] = useState(false);
  const [receitasFitnessOpen, setReceitasFitnessOpen] = useState(false);
  const [installAppOpen, setInstallAppOpen] = useState(false);
  const [embalagemOpen, setEmbalagemOpen] = useState(false);
  const [cardapioOpen, setCardapioOpen] = useState(false);
  const [marketingVideoOpen, setMarketingVideoOpen] = useState(false);
  const [ebookOpen, setEbookOpen] = useState(false);
  const [selectedMarketingLesson, setSelectedMarketingLesson] = useState<typeof videoLessons[0] | null>(null);
  const [selectedFeaturedLesson, setSelectedFeaturedLesson] = useState<{id: string; title: string; videoUrl: string; materialUrl: string} | null>(null);
  const [featuredVideoOpen, setFeaturedVideoOpen] = useState(false);

  // Featured lessons data
  const featuredLessons = [
    {
      id: 'palha-tradicional',
      title: 'Palha Italiana Tradicional',
      description: 'A receita clássica que conquistou o Brasil',
      videoUrl: 'https://www.youtube.com/embed/COIxbvPzccM',
      thumbnail: thumbPalhaTradicional,
      materialUrl: '/materials/palha-tradicional-material.pdf',
      duration: '12:30',
      xp: 100,
      badge: 'Mais Popular'
    },
    {
      id: 'palha-ninho',
      title: 'Palha Italiana Leite Ninho',
      description: 'A versão cremosa que derrete na boca',
      videoUrl: 'https://www.youtube.com/embed/GdYyEnoG0Fc',
      thumbnail: thumbPalhaNinho,
      materialUrl: '/materials/palha-ninho-material.pdf',
      duration: '10:45',
      xp: 100,
      badge: 'Favorita'
    },
    {
      id: 'palha-limao',
      title: 'Palha Italiana de Limão',
      description: 'Uma combinação tropical irresistível e refrescante',
      videoUrl: 'https://www.youtube.com/embed/jIVM84ybDV0',
      thumbnail: thumbPalhaLimao,
      materialUrl: '/materials/palha-limao-guia.pdf',
      duration: '15:00',
      xp: 100,
      badge: 'Novidade'
    },
    {
      id: 'palha-pistache',
      title: 'Palha Italiana de Pistache',
      description: 'Elegante e sofisticada, sabor gourmet',
      videoUrl: 'https://www.youtube.com/embed/MezShDsCChI',
      thumbnail: thumbPalhaPistache,
      materialUrl: '/materials/palha-pistache-guia.pdf',
      duration: '16:00',
      xp: 100,
      badge: 'Premium'
    }
  ];
  const pwa = usePWAInstall();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [modulesProgress, setModulesProgress] = useState(0);

  // Filter marketing lessons
  const marketingLessons = useMemo(() => 
    videoLessons.filter(lesson => lesson.isMarketing), 
    []
  );

  // Random recipe of the day (changes daily)
  const receitaDoDia = useMemo(() => {
    const popularRecipes = getPopularRecipes();
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return popularRecipes[dayOfYear % popularRecipes.length];
  }, []);

  useEffect(() => {
    checkPWAInstallation();
  }, []);

  // Check if app was just installed and create notification
  const checkPWAInstallation = async () => {
    const justInstalled = localStorage.getItem('pwa-just-installed');
    if (justInstalled === 'true') {
      localStorage.removeItem('pwa-just-installed');
      await notifyAppInstalled();
      toast({
        title: "🎉 App Instalado!",
        description: "Agora você pode acessar pela tela inicial.",
      });
    }
  };

  const handleAddVenda = async (venda: { data: string; quantidade: number; valorTotal: number }) => {
    toast({
      title: "Venda registrada!",
      description: `+${venda.quantidade} unidades vendidas`,
    });
  };

  const checkAchievements = async () => {
    // No-op without auth
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
          nome={chefName}
          xp={xp}
          nivel={level}
        />

        {/* HERO - Vídeo de Boas-Vindas */}
        <div className="relative mb-6 animate-fade-in">
          {/* Glow Effect Background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-accent/30 to-gold/30 rounded-3xl blur-xl opacity-60" />
          
          <div className="relative card-hero p-6 md:p-8 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-2xl" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      Bem-Vindo(a)!
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-gold/20 text-gold">
                      Assista Primeiro
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                    Antes de Começar sua Jornada...
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm md:text-base">
                    Veja este vídeo especial e descubra como transformar sua vida com Palha Italiana!
                  </p>
                </div>
              </div>

              {/* Video Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-2 border-primary/20">
                {/* Animated Border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-gold rounded-2xl opacity-50 blur-sm animate-pulse" />
                
                <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/mYcUFmXdaRU?rel=0&modestbranding=1"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    title="Vídeo de Boas-Vindas"
                    style={{ border: 'none' }}
                  />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-border/50">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Play className="w-4 h-4 text-primary" />
                    <span>Vídeo de Apresentação</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-magenta" />
                    <span>Feito com carinho para você</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Sua jornada começa agora!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEÇÃO - Aulas Principais em Destaque */}
        <div className="mb-6 animate-fade-in" style={{ animationDelay: '30ms' }}>
          <div className="relative card-glass p-6 overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-2xl" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary/20 text-primary">
                        Essenciais
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gold/20 text-gold">
                        Comece Aqui
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      Aulas Principais
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
                Domine as duas receitas fundamentais que são a base de todo negócio de Palha Italiana de sucesso!
              </p>

              {/* Video Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {featuredLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10"
                    onClick={() => {
                      setSelectedFeaturedLesson({
                        id: lesson.id,
                        title: lesson.title,
                        videoUrl: lesson.videoUrl,
                        materialUrl: lesson.materialUrl
                      });
                      setFeaturedVideoOpen(true);
                    }}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video">
                      <img 
                        src={lesson.thumbnail} 
                        alt={lesson.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-primary/40">
                          <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                        </div>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-white text-xs font-medium">
                        {lesson.duration}
                      </div>

                      {/* Badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-gold/90 text-black text-xs font-bold">
                        ⭐ {lesson.badge}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h4 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                        {lesson.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {lesson.description}
                      </p>
                      
                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            +{lesson.xp} XP
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <FileText className="w-4 h-4" />
                          Material Incluso
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
        </div>

        {/* SEÇÃO BÔNUS - Curso de Bolo Caseiro */}
        <BoloCaseiroBonusSection />

        {/* SEÇÃO BÔNUS - Doces Extras */}
        <DocesExtraBonusSection />

        {/* SEÇÃO - Apostilas Extras / Material Complementar */}
        <div className="mb-6 animate-fade-in" style={{ animationDelay: '35ms' }}>
          <div className="relative card-glass p-6 overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-gold/15 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-2xl" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/30 to-primary/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gold/20 text-gold">
                        Exclusivo
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary/20 text-primary flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Novo
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      📚 Apostilas Extras
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
                Material complementar exclusivo para você aprofundar seus conhecimentos! Clique para baixar.
              </p>

              {/* Apostilas Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { title: 'Palha Tradicional', subtitle: 'Apostila Completa', url: '/materials/palha-tradicional-apostila.pdf', color: 'from-amber-500 to-orange-600', icon: '🍫' },
                  { title: 'Leite Ninho', subtitle: 'Guia Premium', url: '/materials/palha-leite-ninho-apostila.pdf', color: 'from-yellow-400 to-amber-500', icon: '🥛' },
                  { title: 'Maracujá', subtitle: 'Guia Completo', url: '/materials/palha-maracuja-guia.pdf', color: 'from-yellow-500 to-orange-500', icon: '🍋' },
                  { title: 'Limão', subtitle: 'Da Panela ao Lucro', url: '/materials/palha-limao-guia.pdf', color: 'from-lime-400 to-green-500', icon: '🍋‍🟩' },
                  { title: 'Pistache', subtitle: 'Guia Mestre', url: '/materials/palha-pistache-guia.pdf', color: 'from-green-400 to-emerald-500', icon: '🥜' },
                  { title: 'Corte & Preço', subtitle: 'Estratégias', url: '/materials/palha-corte-preco.pdf', color: 'from-violet-500 to-purple-600', icon: '✂️' },
                  { title: 'Pudim Branco', subtitle: 'Técnica de Precisão', url: '/materials/pudim-branco-tecnica.pdf', color: 'from-pink-400 to-rose-500', icon: '🍮' },
                  { title: 'Pé de Moça', subtitle: 'Chef Edition', url: '/materials/pe-de-moca-chef.pdf', color: 'from-rose-400 to-red-500', icon: '🍬' },
                  { title: 'Professional', subtitle: 'Mastery Guide', url: '/materials/palha-professional-mastery.pdf', color: 'from-blue-500 to-indigo-600', icon: '👨‍🍳' },
                  { title: 'Bônus Extra', subtitle: 'Técnicas Avançadas', url: '/materials/palha-corte-preco-2.pdf', color: 'from-indigo-500 to-purple-600', icon: '🎁' },
                ].map((apostila, index) => (
                  <a
                    key={index}
                    href={apostila.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-4 rounded-xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 text-left block"
                  >
                    {/* Gradient accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r ${apostila.color} opacity-80 group-hover:opacity-100`} />
                    
                    {/* Icon */}
                    <div className="text-2xl mb-2">{apostila.icon}</div>
                    
                    {/* Title */}
                    <h4 className="font-heading text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-1">
                      {apostila.title}
                    </h4>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      {apostila.subtitle}
                    </p>
                    
                    {/* Download indicator */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download className="w-4 h-4 text-primary" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SEÇÃO - Calculadora de Precificação Detalhada */}
        <div className="mb-6 animate-fade-in" style={{ animationDelay: '38ms' }}>
          <PrecificacaoCalculadora />
        </div>

        {/* Banner - Acesso ao Drive */}
        <a 
          href="https://drive.google.com/drive/folders/1y8Xdjq3oCo4ZhIaov6qw2nQa9f7cPKKz?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="relative mb-4 animate-fade-in cursor-pointer group block"
          style={{ animationDelay: '39ms' }}
        >
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border-2 border-dashed border-amber-500/50 hover:border-amber-500 transition-all p-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/30 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-amber-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-500 animate-pulse">
                    ALTERNATIVA
                  </span>
                </div>
                <h4 className="font-heading text-base font-bold text-foreground group-hover:text-amber-500 transition-colors">
                  Não conseguiu acessar o material?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Clique aqui e tenha acesso ao <span className="text-amber-500 font-semibold">Drive completo</span> com todos os arquivos!
                </p>
              </div>
              <div className="shrink-0">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/20 text-amber-500 font-semibold text-sm group-hover:bg-amber-500 group-hover:text-white transition-all">
                  Acessar Drive
                  <Rocket className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </a>

        {/* HERO - E-book de Receitas */}
        <div 
          className="relative mb-6 animate-fade-in cursor-pointer group"
          onClick={() => setEbookOpen(true)}
          style={{ animationDelay: '40ms' }}
        >
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/40 via-gold/40 to-accent/40 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
          
          <div className="relative card-glass p-5 md:p-6 overflow-hidden rounded-2xl border border-primary/30 group-hover:border-primary/50 transition-all">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-gold/10 to-transparent rounded-full blur-xl" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              
              {/* Content */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary/20 text-primary">
                    E-BOOK
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gold/20 text-gold">
                    GRÁTIS
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-accent/20 text-accent">
                    37 RECEITAS
                  </span>
                </div>
                <h3 className="font-heading text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  Baixe Todas as Receitas em PDF
                </h3>
                <p className="text-sm text-muted-foreground">
                  E-book profissional para consultar offline ou imprimir
                </p>
              </div>
              
              {/* CTA */}
              <div className="flex-shrink-0">
                <button className="btn-premium flex items-center gap-2 px-5 py-2.5">
                  <Download className="w-4 h-4" />
                  Baixar E-book
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* HERO - Grupo do WhatsApp */}
        <a 
          href="https://chat.whatsapp.com/LmYYTy6HORE5Z9xCNaAA48?mode=gi_t"
          target="_blank"
          rel="noopener noreferrer"
          className="relative mb-6 animate-fade-in cursor-pointer group block"
          style={{ animationDelay: '60ms' }}
        >
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#25D366]/40 via-[#128C7E]/40 to-[#25D366]/40 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
          
          <div className="relative card-glass p-5 md:p-6 overflow-hidden rounded-2xl border border-[#25D366]/30 group-hover:border-[#25D366]/50 transition-all">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#25D366]/10 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#128C7E]/10 to-transparent rounded-full blur-xl" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#25D366]/30 to-[#128C7E]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-[#25D366]" />
              </div>
              
              {/* Content */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#25D366]/20 text-[#25D366]">
                    COMUNIDADE
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gold/20 text-gold">
                    EXCLUSIVO
                  </span>
                </div>
                <h3 className="font-heading text-lg md:text-xl font-bold text-foreground group-hover:text-[#25D366] transition-colors">
                  Entre no Grupo de Receitas
                </h3>
                <p className="text-sm text-muted-foreground">
                  Troque experiências e receba dicas exclusivas no WhatsApp
                </p>
              </div>
              
              {/* CTA */}
              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] shadow-lg shadow-[#25D366]/30 group-hover:shadow-xl group-hover:shadow-[#25D366]/40 transition-all">
                  <MessageCircle className="w-4 h-4" />
                  Entrar no Grupo
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* HERO Card - Receita do Dia */}
        <div 
          className="card-hero p-6 md:p-8 mb-6 cursor-pointer breathe animate-fade-in"
          onClick={() => setReceitaDiaOpen(true)}
          style={{ animationDelay: '50ms' }}
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

        {/* Seção Muito Além do Doce - Marketing */}
        <div className="mb-6 animate-fade-in" style={{ animationDelay: '120ms' }}>
          <div className="relative card-glass p-6 overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-gold/10 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-magenta/10 to-transparent rounded-full blur-xl" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/30 to-magenta/20 flex items-center justify-center">
                    <Megaphone className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gold/20 text-gold">
                        Marketing
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-magenta/20 text-magenta">
                        Novo
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      Muito Além do Doce
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
                Vender é tão importante quanto produzir! Aprenda a criar materiais profissionais que 
                destacam seu negócio e atraem mais clientes.
              </p>

              {/* Video Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {marketingLessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="group relative rounded-xl overflow-hidden cursor-pointer bg-card/50 border border-border/50 hover:border-gold/50 transition-all duration-300"
                    onClick={() => {
                      setSelectedMarketingLesson(lesson);
                      setMarketingVideoOpen(true);
                    }}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video">
                      <img 
                        src={lesson.thumbnail} 
                        alt={lesson.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg shadow-gold/30">
                          <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
                        </div>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/70 text-white text-xs font-medium">
                        {lesson.duration}
                      </div>

                      {/* Bonus Badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-gold to-gold/80 text-black text-[10px] font-bold uppercase flex items-center gap-1">
                        <Palette className="w-3 h-3" />
                        Bônus
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h4 className="font-heading font-bold text-foreground group-hover:text-gold transition-colors line-clamp-1 mb-1">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                        {lesson.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          Por <span className="text-gold font-medium">{lesson.author}</span>
                        </span>
                        <span className="text-xs font-bold text-primary flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          +{lesson.xpReward} XP
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


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
              description="7 versões saudáveis"
              icon={Heart}
              iconColor="green"
              onClick={() => navigate('/modulos')}
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
              description="10 erros fatais"
              icon={Lightbulb}
              iconColor="orange"
              onClick={() => setErrosComunsOpen(true)}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '850ms' }}>
            <FeatureCard
              title="Guia Embalagens"
              description="Do saquinho ao delivery"
              icon={Package}
              iconColor="gold"
              onClick={() => setEmbalagemOpen(true)}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '900ms' }}>
            <FeatureCard
              title="E-book Receitas"
              description="37 receitas em PDF"
              icon={BookOpen}
              iconColor="gold"
              onClick={() => setEbookOpen(true)}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '950ms' }}>
            <FeatureCard
              title="Cardápio Digital"
              description="Crie seu cardápio pro"
              icon={FileImage}
              iconColor="magenta"
              onClick={() => setCardapioOpen(true)}
            />
          </div>
        </div>

        {/* Banner de Instalação Premium */}
        {!pwa.isInstalled && (
          <div className="animate-fade-in" style={{ animationDelay: '1100ms' }}>
            <div 
              className="card-glass p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shine-effect cursor-pointer"
              onClick={() => setInstallAppOpen(true)}
            >
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
              <button 
                className="btn-premium w-full sm:w-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  if (pwa.canPromptInstall) {
                    pwa.promptInstall().then(success => {
                      if (success) {
                        toast({
                          title: "App instalado!",
                          description: "Agora você pode acessar pela tela inicial.",
                        });
                      }
                    });
                  } else {
                    setInstallAppOpen(true);
                  }
                }}
              >
                Instalar Agora
              </button>
            </div>
          </div>
        )}
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
      <ErrosComunsModal
        open={errosComunsOpen}
        onOpenChange={setErrosComunsOpen}
      />
      <ReceitasFitnessModal
        open={receitasFitnessOpen}
        onOpenChange={setReceitasFitnessOpen}
      />
      <InstallAppModal
        open={installAppOpen}
        onOpenChange={setInstallAppOpen}
      />
      <EmbalagemModal
        open={embalagemOpen}
        onOpenChange={setEmbalagemOpen}
      />
      <CardapioDigitalModal
        open={cardapioOpen}
        onOpenChange={setCardapioOpen}
      />
      <EbookModal
        open={ebookOpen}
        onOpenChange={setEbookOpen}
      />
      <VideoPlayerModal
        lesson={selectedMarketingLesson}
        isOpen={marketingVideoOpen}
        onClose={() => {
          setMarketingVideoOpen(false);
          setSelectedMarketingLesson(null);
        }}
        isCompleted={false}
        onComplete={() => {}}
      />
      <FeaturedLessonModal
        lesson={selectedFeaturedLesson}
        isOpen={featuredVideoOpen}
        onClose={() => {
          setFeaturedVideoOpen(false);
          setSelectedFeaturedLesson(null);
        }}
      />
    </div>
  );
};

export default Index;