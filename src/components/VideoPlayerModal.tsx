import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, CheckCircle, Star, Clock, Sparkles, Crown, FileDown, BookOpen, Share2 } from "lucide-react";
import { VideoLesson, getYoutubeThumbnail } from "@/data/videoLessons";
import { useState } from "react";
import { ShareButton } from "@/components/ShareButton";

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

            {/* Video Player Container */}
            <div className="relative w-full aspect-video bg-black">
              {!isPlaying ? (
                /* Thumbnail with Play Button */
                <div 
                  className="absolute inset-0 cursor-pointer group"
                  onClick={() => setIsPlaying(true)}
                >
                  <img 
                    src={lesson.thumbnail}
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
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl shadow-primary/50 cursor-pointer"
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
                /* YouTube Player - Full functionality */
                <iframe
                  src={`https://www.youtube.com/embed/${lesson.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  title={lesson.title}
                  style={{ border: 'none' }}
                />
              )}
            </div>

            {/* Lesson Info */}
            <div className="p-4 md:p-6 space-y-4">
              <p className="text-muted-foreground">{lesson.description}</p>

              {/* Material Complementar */}
              {lesson.materialUrl && (
                <motion.div 
                  className="p-4 rounded-xl bg-gradient-to-br from-accent/10 via-primary/5 to-gold/10 border border-primary/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-foreground">Material Complementar</h4>
                      <p className="text-xs text-muted-foreground">Baixe o material de apoio desta aula</p>
                    </div>
                  </div>
                  
                  <a
                    href={lesson.materialUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-card/80 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                        <FileDown className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                          {lesson.materialName || 'Material da Aula'}
                        </p>
                        <p className="text-xs text-muted-foreground">PDF • Clique para baixar</p>
                      </div>
                    </div>
                    <motion.div 
                      className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FileDown className="w-5 h-5 text-primary" />
                    </motion.div>
                  </a>
                </motion.div>
              )}

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
                <ShareButton
                  title={lesson.title}
                  text={`🎬 ${lesson.title}\n📚 ${lesson.description}\n\nConfira essa aula incrível!`}
                  variant="outline"
                  size="default"
                  className="sm:w-auto"
                />
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
