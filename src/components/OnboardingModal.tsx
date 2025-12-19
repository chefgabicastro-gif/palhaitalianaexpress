import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, TrendingUp, Trophy, ChevronRight, Sparkles, Star, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
  userName: string;
}

const steps = [
  {
    id: 1,
    icon: BookOpen,
    title: "Aprenda com os Módulos",
    subtitle: "Seu caminho para o sucesso!",
    description: "Complete aulas e ganhe XP para subir de nível. Quanto mais você aprende, mais você evolui!",
    features: [
      { emoji: "📚", text: "6 módulos completos" },
      { emoji: "🎬", text: "Aulas em vídeo passo a passo" },
      { emoji: "⭐", text: "+50 XP por aula concluída" },
    ],
    gradient: "from-accent to-pink-500",
    bgGlow: "bg-accent/20",
  },
  {
    id: 2,
    icon: TrendingUp,
    title: "Registre suas Vendas",
    subtitle: "Acompanhe seu faturamento!",
    description: "Registre cada venda e veja seus lucros crescerem. Gráficos mostram sua evolução!",
    features: [
      { emoji: "💰", text: "Controle de faturamento" },
      { emoji: "📊", text: "Gráficos de desempenho" },
      { emoji: "🎯", text: "Metas e projeções" },
    ],
    gradient: "from-primary to-gold",
    bgGlow: "bg-primary/20",
  },
  {
    id: 3,
    icon: Trophy,
    title: "Conquiste Recompensas",
    subtitle: "Você merece reconhecimento!",
    description: "Desbloqueie conquistas vendendo e aprendendo. Cada vitória te aproxima do topo!",
    features: [
      { emoji: "🏆", text: "12 conquistas exclusivas" },
      { emoji: "🔥", text: "Bônus de XP especiais" },
      { emoji: "👑", text: "Níveis de prestígio" },
    ],
    gradient: "from-gold to-amber-400",
    bgGlow: "bg-gold/20",
  },
];

export function OnboardingModal({ isOpen, onComplete, userName }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsCompleting(true);
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#ec4899', '#10b981', '#6366f1']
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f59e0b', '#ec4899']
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#10b981', '#6366f1']
      });
    }, 400);

    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  if (!isOpen) return null;

  const step = steps[currentStep];
  const StepIcon = step.icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        className="absolute inset-0 bg-background/95 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      
      <motion.div 
        className="relative w-full max-w-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        {/* Welcome Header (only on first step) */}
        {currentStep === 0 && (
          <motion.div 
            className="text-center mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-4">
              <Rocket className="w-4 h-4" />
              <span className="text-sm font-medium">Bem-vindo(a)!</span>
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Olá, <span className="gradient-text-gold">{userName || 'Chef'}!</span> 🎉
            </h1>
            <p className="text-muted-foreground">Vamos começar sua jornada lucrativa</p>
          </motion.div>
        )}

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground">Passo {currentStep + 1} de {steps.length}</span>
            <span className="text-xs font-medium text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="card-glow rounded-3xl overflow-hidden"
          >
            {/* Glow Effect */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 ${step.bgGlow} rounded-full blur-3xl opacity-50`} />
            
            <div className="relative p-8">
              {/* Icon */}
              <motion.div 
                className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center`}
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
              >
                <StepIcon className="w-10 h-10 text-white" />
              </motion.div>

              {/* Content */}
              <div className="text-center mb-6">
                <motion.p 
                  className="text-sm text-primary font-medium mb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {step.subtitle}
                </motion.p>
                <motion.h2 
                  className="font-heading text-2xl font-bold text-foreground mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  {step.title}
                </motion.h2>
                <motion.p 
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {step.description}
                </motion.p>
              </div>

              {/* Features */}
              <motion.div 
                className="space-y-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                {step.features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <span className="text-2xl">{feature.emoji}</span>
                    <span className="text-sm text-foreground">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Navigation */}
              <div className="flex gap-3">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={isCompleting}
                  className={`flex-1 bg-gradient-to-r ${step.gradient} hover:opacity-90 text-white border-0 btn-glow`}
                >
                  {isCompleting ? (
                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      Preparando...
                    </motion.div>
                  ) : currentStep === steps.length - 1 ? (
                    <>
                      <Star className="w-4 h-4 mr-2" />
                      Começar Jornada!
                    </>
                  ) : (
                    <>
                      Próximo
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              {/* Step Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep 
                        ? 'bg-primary w-6' 
                        : index < currentStep 
                          ? 'bg-primary/50' 
                          : 'bg-muted'
                    }`}
                    animate={{ width: index === currentStep ? 24 : 8 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* XP Bonus Badge */}
        <motion.div 
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/20 text-success">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-medium">+100 XP de Bônus ao concluir!</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
