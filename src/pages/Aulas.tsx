import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Play, CheckCircle, Clock, Star, 
  Crown, Sparkles, Trophy, Lock, Flame, GraduationCap,
  TrendingUp, Quote
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { videoLessons, VideoLesson } from '@/data/videoLessons';
import { VideoPlayerModal } from '@/components/VideoPlayerModal';

export default function Aulas() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [selectedLesson, setSelectedLesson] = useState<VideoLesson | null>(null);
  const [userXp, setUserXp] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchProgress();
  }, [user, navigate]);

  const fetchProgress = async () => {
    if (!user) return;
    
    try {
      // Get completed lessons from localStorage
      const saved = localStorage.getItem(`completed_video_lessons_${user.id}`);
      if (saved) {
        setCompletedLessons(new Set(JSON.parse(saved)));
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

  const handleCompleteLesson = async (lesson: VideoLesson) => {
    if (!user || completedLessons.has(lesson.id)) return;

    const newCompleted = new Set([...completedLessons, lesson.id]);
    setCompletedLessons(newCompleted);
    
    // Save to localStorage
    localStorage.setItem(`completed_video_lessons_${user.id}`, JSON.stringify([...newCompleted]));

    // Update XP in database
    const newXp = userXp + lesson.xpReward;
    setUserXp(newXp);

    await supabase
      .from('profiles')
      .update({ xp: newXp })
      .eq('user_id', user.id);

    // Add notification
    await supabase.from('notifications').insert({
      user_id: user.id,
      title: `🎬 Aula Concluída!`,
      message: `Você completou "${lesson.title}"! +${lesson.xpReward} XP`,
      type: 'success'
    });

    toast({
      title: `+${lesson.xpReward} XP!`,
      description: `Aula "${lesson.title.slice(0, 30)}..." concluída!`,
    });
  };

  // Aulas principais (7-9) - nosso conteúdo
  const regularLessons = videoLessons.filter(l => !l.isBonus && l.order >= 7).sort((a, b) => a.order - b.order);
  // Aulas bônus
  const bonusLessons = videoLessons.filter(l => l.isBonus).sort((a, b) => a.order - b.order);
  // Referências (1-6) - conteúdo da Anelyse para inspiração
  const referenceLessons = videoLessons.filter(l => !l.isBonus && l.order <= 6).sort((a, b) => a.order - b.order);

  const totalLessons = videoLessons.length;
  const totalCompleted = completedLessons.size;
  const progressPercent = Math.round((totalCompleted / totalLessons) * 100);

  const totalXpAvailable = videoLessons.reduce((acc, l) => acc + l.xpReward, 0);
  const xpEarned = videoLessons
    .filter(l => completedLessons.has(l.id))
    .reduce((acc, l) => acc + l.xpReward, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="font-heading text-2xl md:text-3xl font-bold gradient-text-gold flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-primary" />
              Aulas em Vídeo
            </h1>
            <p className="text-sm text-muted-foreground">Domine todas as técnicas de Palha Italiana</p>
          </div>
        </div>

        {/* Stats Overview */}
        <motion.div 
          className="card-glow p-6 rounded-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-3 gap-6 mb-4">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold gradient-text-gold">{totalCompleted}/{totalLessons}</p>
              <p className="text-xs text-muted-foreground">Aulas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">{xpEarned}</p>
              <p className="text-xs text-muted-foreground">XP Ganho</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-accent">{progressPercent}%</p>
              <p className="text-xs text-muted-foreground">Progresso</p>
            </div>
          </div>
          <Progress value={progressPercent} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Ganhe até <span className="text-primary font-bold">{totalXpAvailable} XP</span> completando todas as aulas
          </p>
        </motion.div>

        {/* Regular Lessons */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center">
              <Play className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">Aulas Principais</h2>
              <p className="text-sm text-muted-foreground">{regularLessons.length} aulas disponíveis</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regularLessons.map((lesson, index) => {
              const isCompleted = completedLessons.has(lesson.id);
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
                    isCompleted 
                      ? 'ring-2 ring-success/50' 
                      : 'hover:ring-2 hover:ring-primary/50'
                  }`}
                  onClick={() => setSelectedLesson(lesson)}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={lesson.thumbnail}
                      alt={lesson.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 transition-colors ${
                      isCompleted ? 'bg-success/30' : 'bg-black/30 group-hover:bg-black/20'
                    }`} />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isCompleted ? (
                        <div className="w-14 h-14 rounded-full bg-success/90 flex items-center justify-center">
                          <CheckCircle className="w-7 h-7 text-white" />
                        </div>
                      ) : (
                        <motion.div 
                          className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Play className="w-7 h-7 text-white ml-1" fill="white" />
                        </motion.div>
                      )}
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-bold">
                        Aula {lesson.order.toString().padStart(2, '0')}
                      </span>
                    </div>
                    
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-primary/80 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        +{lesson.xpReward} XP
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 bg-card border-t border-border/50">
                    <h3 className="font-heading font-bold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {lesson.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bonus Lessons */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/30 to-primary/20 flex items-center justify-center">
              <Crown className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold gradient-text-gold">Aulas Bônus</h2>
              <p className="text-sm text-muted-foreground">Conteúdo exclusivo premium</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bonusLessons.map((lesson, index) => {
              const isCompleted = completedLessons.has(lesson.id);
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (regularLessons.length + index) * 0.1 }}
                  className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ring-2 ring-gold/30 ${
                    isCompleted 
                      ? 'ring-success/50' 
                      : 'hover:ring-gold/60'
                  }`}
                  onClick={() => setSelectedLesson(lesson)}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={lesson.thumbnail}
                      alt={lesson.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 transition-colors ${
                      isCompleted ? 'bg-success/30' : 'bg-black/30 group-hover:bg-black/20'
                    }`} />
                    
                    {/* Gold Gradient Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gold/20 via-transparent to-gold/10 pointer-events-none" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isCompleted ? (
                        <div className="w-14 h-14 rounded-full bg-success/90 flex items-center justify-center">
                          <CheckCircle className="w-7 h-7 text-white" />
                        </div>
                      ) : (
                        <motion.div 
                          className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-gold/30"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Play className="w-7 h-7 text-white ml-1" fill="white" />
                        </motion.div>
                      )}
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-gold to-primary text-white text-xs font-bold flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        BÔNUS
                      </span>
                    </div>
                    
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-lg bg-gold/80 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        +{lesson.xpReward} XP
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 bg-gradient-to-r from-card via-card to-gold/5 border-t border-gold/20">
                    <h3 className="font-heading font-bold text-foreground mb-1 line-clamp-1 group-hover:text-gold transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {lesson.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Referências que vendem - Seção Inspiracional */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-magenta/30 to-accent/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-magenta" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">Referências que vendem</h2>
              <p className="text-sm text-muted-foreground">{referenceLessons.length} conteúdos inspiracionais</p>
            </div>
          </div>

          {/* Texto inspiracional */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 border border-border/50 mb-5">
            <div className="flex gap-3">
              <Quote className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Aqui você encontra conteúdos reais de quem está no mercado, produz, vende e cresce todos os anos — mesmo recebendo críticas, opiniões e julgamentos. Use como inspiração, aprendizado e referência de que é possível dar certo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {referenceLessons.map((lesson, index) => {
              const isCompleted = completedLessons.has(lesson.id);
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
                    isCompleted 
                      ? 'ring-2 ring-success/50' 
                      : 'hover:ring-2 hover:ring-magenta/40'
                  }`}
                  onClick={() => setSelectedLesson(lesson)}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={lesson.thumbnail}
                      alt={lesson.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 transition-colors ${
                      isCompleted ? 'bg-success/30' : 'bg-black/30 group-hover:bg-black/20'
                    }`} />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isCompleted ? (
                        <div className="w-14 h-14 rounded-full bg-success/90 flex items-center justify-center">
                          <CheckCircle className="w-7 h-7 text-white" />
                        </div>
                      ) : (
                        <motion.div 
                          className="w-14 h-14 rounded-full bg-magenta/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Play className="w-7 h-7 text-white ml-1" fill="white" />
                        </motion.div>
                      )}
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg bg-magenta/80 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Referência
                      </span>
                    </div>
                    
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-primary/80 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        +{lesson.xpReward} XP
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 bg-card border-t border-border/50">
                    <h3 className="font-heading font-bold text-foreground mb-1 line-clamp-1 group-hover:text-magenta transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {lesson.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Completion Badge */}
        {progressPercent === 100 && (
          <motion.div 
            className="p-6 rounded-2xl bg-gradient-to-r from-gold/20 via-primary/20 to-accent/20 border border-gold/30 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Trophy className="w-12 h-12 text-gold mx-auto mb-3" />
            <h3 className="font-heading text-xl font-bold gradient-text-gold mb-2">
              Parabéns! Você completou todas as aulas!
            </h3>
            <p className="text-muted-foreground">
              Você é uma verdadeira especialista em Palha Italiana!
            </p>
          </motion.div>
        )}
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal
        lesson={selectedLesson}
        isOpen={!!selectedLesson}
        onClose={() => setSelectedLesson(null)}
        isCompleted={selectedLesson ? completedLessons.has(selectedLesson.id) : false}
        onComplete={handleCompleteLesson}
      />
    </div>
  );
}
