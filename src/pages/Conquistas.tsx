import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Medal, Award, Crown, Star, BookOpen, GraduationCap, Brain, Flame, DollarSign, Banknote, Wallet, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xp_reward: number;
  requirement_type: string;
  requirement_value: number;
  unlocked?: boolean;
  unlocked_at?: string;
}

const iconMap: Record<string, React.ElementType> = {
  Trophy, Medal, Award, Crown, Star, BookOpen, GraduationCap, Brain, Flame, DollarSign, Banknote, Wallet
};

export default function Conquistas() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchAchievements();
  }, [user, navigate]);

  const fetchAchievements = async () => {
    try {
      const { data: achievementsData, error: achievementsError } = await supabase
        .from('achievements')
        .select('*');

      if (achievementsError) throw achievementsError;

      const { data: userAchievements } = await supabase
        .from('user_achievements')
        .select('achievement_id, unlocked_at')
        .eq('user_id', user?.id);

      const unlockedMap = new Map(
        userAchievements?.map(ua => [ua.achievement_id, ua.unlocked_at]) || []
      );

      const achievementsWithStatus = (achievementsData || []).map(a => ({
        ...a,
        unlocked: unlockedMap.has(a.id),
        unlocked_at: unlockedMap.get(a.id)
      }));

      setAchievements(achievementsWithStatus);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalXpEarned = achievements.filter(a => a.unlocked).reduce((acc, a) => acc + a.xp_reward, 0);

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
          <div>
            <h1 className="font-heading text-2xl font-bold gradient-text-gold">Conquistas</h1>
            <p className="text-sm text-muted-foreground">Suas recompensas</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="card-glow p-6 rounded-2xl text-center">
            <div className="icon-box-gold mx-auto mb-3">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <p className="text-3xl font-bold gradient-text-gold">{unlockedCount}/{achievements.length}</p>
            <p className="text-sm text-muted-foreground">Conquistadas</p>
          </div>
          <div className="card-glow p-6 rounded-2xl text-center">
            <div className="icon-box-magenta mx-auto mb-3">
              <Star className="w-6 h-6 text-accent" />
            </div>
            <p className="text-3xl font-bold text-accent">{totalXpEarned}</p>
            <p className="text-sm text-muted-foreground">XP Ganho</p>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => {
            const IconComponent = iconMap[achievement.icon] || Trophy;
            
            return (
              <div 
                key={achievement.id}
                className={`relative p-5 rounded-2xl transition-all duration-300 animate-fade-in ${
                  achievement.unlocked 
                    ? 'card-glow border-primary/30' 
                    : 'bg-card/30 border border-border/30 opacity-60'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Badge */}
                {achievement.unlocked && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-success flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-primary to-accent' 
                    : 'bg-muted'
                }`}>
                  {achievement.unlocked ? (
                    <IconComponent className="w-7 h-7 text-primary-foreground" />
                  ) : (
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>

                {/* Info */}
                <h3 className={`font-heading font-bold text-center text-sm mb-1 ${
                  achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {achievement.name}
                </h3>
                <p className="text-xs text-muted-foreground text-center mb-2">
                  {achievement.description}
                </p>

                {/* XP Reward */}
                <div className={`text-center text-xs font-medium ${
                  achievement.unlocked ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  +{achievement.xp_reward} XP
                </div>

                {/* Unlock date */}
                {achievement.unlocked && achievement.unlocked_at && (
                  <p className="text-[10px] text-muted-foreground text-center mt-2">
                    {new Date(achievement.unlocked_at).toLocaleDateString('pt-BR')}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
