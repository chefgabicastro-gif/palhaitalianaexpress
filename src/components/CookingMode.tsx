import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ChefHat, Timer, ArrowLeft, ArrowRight, CheckCircle2, 
  Pause, Play, RotateCcw, Lightbulb 
} from "lucide-react";
import { Recipe } from "@/data/recipes";
import { Button } from "@/components/ui/button";

interface CookingModeProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
}

export function CookingMode({ recipe, isOpen, onClose }: CookingModeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerPreset, setTimerPreset] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            // Vibrate if available
            if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const setTimer = useCallback((minutes: number) => {
    setTimerSeconds(minutes * 60);
    setTimerPreset(minutes * 60);
    setTimerRunning(true);
  }, []);

  const toggleStep = (stepIndex: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepIndex) ? prev.filter((s) => s !== stepIndex) : [...prev, stepIndex]
    );
  };

  const step = recipe.steps[currentStep];
  const progress = ((completedSteps.length / recipe.steps.length) * 100).toFixed(0);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-background flex flex-col"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)", paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur-sm">
          <button onClick={onClose} className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 active:scale-95 transition-all">
            <X className="w-6 h-6 text-foreground" />
          </button>
          <div className="text-center flex-1 mx-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <ChefHat className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase text-primary">Modo Cozinha</span>
            </div>
            <p className="text-xs text-muted-foreground truncate">{recipe.name}</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-primary">{progress}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-secondary">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-5">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-5"
          >
            {/* Step Number */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/30">
                {step.step}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Passo {currentStep + 1} de {recipe.steps.length}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {completedSteps.includes(currentStep) ? "✅ Concluído" : "Em andamento..."}
                </p>
              </div>
            </div>

            {/* Instruction */}
            <div className="p-5 rounded-2xl bg-card border border-border">
              <p className="text-lg leading-relaxed text-foreground font-medium">
                {step.instruction}
              </p>
              {step.tip && (
                <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-warning/10 border border-warning/20">
                  <Lightbulb className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-warning">{step.tip}</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Compact Timer */}
          <div className="mt-6 p-4 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-foreground">Timer</span>
              </div>
              <span className={`text-2xl font-mono font-bold ${timerSeconds === 0 && timerPreset > 0 ? "text-accent animate-pulse" : "text-foreground"}`}>
                {formatTime(timerSeconds)}
              </span>
            </div>

            {/* Timer Controls */}
            <div className="flex gap-2 mb-3">
              <Button
                variant={timerRunning ? "destructive" : "default"}
                className="flex-1 h-12 text-base font-bold"
                onClick={() => setTimerRunning(!timerRunning)}
                disabled={timerSeconds === 0 && !timerRunning}
              >
                {timerRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                {timerRunning ? "Pausar" : "Iniciar"}
              </Button>
              <Button
                variant="outline"
                className="h-12 w-12"
                onClick={() => { setTimerSeconds(timerPreset); setTimerRunning(false); }}
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 3, 5, 10].map((min) => (
                <button
                  key={min}
                  onClick={() => setTimer(min)}
                  className="h-10 rounded-xl bg-secondary hover:bg-secondary/80 active:scale-95 transition-all text-sm font-bold text-foreground"
                >
                  {min} min
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-border bg-card/80 backdrop-blur-sm" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="h-14 flex-1 text-base font-bold rounded-2xl"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Anterior
            </Button>

            <Button
              variant={completedSteps.includes(currentStep) ? "outline" : "default"}
              className="h-14 w-14 rounded-2xl"
              onClick={() => toggleStep(currentStep)}
            >
              <CheckCircle2 className={`w-6 h-6 ${completedSteps.includes(currentStep) ? "text-success" : ""}`} />
            </Button>

            <Button
              className="h-14 flex-1 text-base font-bold rounded-2xl bg-gradient-to-r from-primary to-accent"
              onClick={() => {
                if (!completedSteps.includes(currentStep)) toggleStep(currentStep);
                if (currentStep < recipe.steps.length - 1) {
                  setCurrentStep((prev) => prev + 1);
                }
              }}
              disabled={currentStep === recipe.steps.length - 1 && completedSteps.includes(currentStep)}
            >
              {currentStep === recipe.steps.length - 1 ? "Finalizar" : "Próximo"}
              {currentStep < recipe.steps.length - 1 && <ArrowRight className="w-5 h-5 ml-2" />}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
