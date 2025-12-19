import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, CheckCircle, Star, Clock, Sparkles, Lock, Crown } from "lucide-react";
import { VideoLesson, getYoutubeThumbnail } from "@/data/videoLessons";
import { useState } from "react";

interface VideoPlayerModalProps {
  lesson: VideoLesson | null;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onComplete: (lesson: VideoLesson) => void;
}

export function VideoPlayerModal({ 
  lesson, 
  isOpen, 
  onClose, 
  isCompleted,
  onComplete 
}: VideoPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!lesson) return null;

  const handleComplete = () => {
    if (!isCompleted) {
      onComplete(lesson);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => { onClose(); setIsPlaying(false); }}>
      <DialogContent className="max-w-4xl w-[95vw] p-0 bg-gradient-to-br from-card via-card to-secondary border-primary/20 overflow-hidden max-h-[95vh] overflow-y-auto">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="relative p-4 md:p-6 border-b border-border/50">
              <button 
                onClick={() => { onClose(); setIsPlaying(false); }}
                className="absolute top-4 right-4 p-2 rounded-full bg-secondary/80 hover:bg-secondary transition-colors z-10"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
              
              <div className="flex items-center gap-3">
                {lesson.isBonus ? (
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/30 to-primary/20 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-gold" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {lesson.isBonus && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gold/20 text-gold">
                        Bônus
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      Aula {lesson.order.toString().padStart(2, '0')}
                    </span>
                  </div>
                  <h2 className="font-heading text-lg md:text-xl font-bold text-foreground pr-8">
                    {lesson.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Video Player Container - Protected */}
            <div className="relative w-full aspect-video bg-black">
              {!isPlaying ? (
                /* Thumbnail with Play Button */
                <div 
                  className="absolute inset-0 cursor-pointer group"
                  onClick={() => setIsPlaying(true)}
                >
                  <img 
                    src={getYoutubeThumbnail(lesson.youtubeId, 'maxres')}
                    alt={lesson.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = getYoutubeThumbnail(lesson.youtubeId, 'hq');
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl shadow-primary/50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
                    </motion.div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-white">{lesson.duration}</span>
                  </div>

                  {/* XP Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary/90 to-accent/90 backdrop-blur-sm flex items-center gap-2">
                    <Star className="w-4 h-4 text-white" />
                    <span className="text-sm font-bold text-white">+{lesson.xpReward} XP</span>
                  </div>
                </div>
              ) : (
                /* Protected YouTube Player */
                <div className="relative w-full h-full">
                  {/* Cloak Layer - Blocks YouTube Logo clicks */}
                  <div className="absolute top-0 left-0 right-0 h-16 z-10 pointer-events-auto" />
                  <div className="absolute bottom-0 left-0 right-0 h-14 z-10 pointer-events-auto" />
                  <div className="absolute top-0 right-0 w-20 h-20 z-10 pointer-events-auto" />
                  
                  <iframe
                    src={`https://www.youtube.com/embed/${lesson.youtubeId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=0&fs=0&iv_load_policy=3&playsinline=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={false}
                    title={lesson.title}
                  />
                </div>
              )}
            </div>

            {/* Lesson Info */}
            <div className="p-4 md:p-6 space-y-4">
              <p className="text-muted-foreground">{lesson.description}</p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {isCompleted ? (
                  <div className="flex-1 py-3 px-6 rounded-xl bg-success/20 border border-success/30 flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="font-medium text-success">Aula Concluída!</span>
                  </div>
                ) : (
                  <motion.button
                    className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleComplete}
                  >
                    <CheckCircle className="w-5 h-5" />
                    Marcar como Concluída
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-sm">
                      +{lesson.xpReward} XP
                    </span>
                  </motion.button>
                )}
              </div>

              {/* Tips */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground text-sm">Dica</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Assista a aula completa e pratique a receita para maximizar seu aprendizado. 
                  Cada aula concluída aumenta seu XP e desbloqueia novas conquistas!
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
