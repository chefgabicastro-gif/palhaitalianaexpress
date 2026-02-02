import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Clock, Sparkles, FileDown, BookOpen, Star, ChefHat } from "lucide-react";
import { useState } from "react";

interface FeaturedLessonModalProps {
  lesson: {
    id: string;
    title: string;
    videoUrl: string;
    materialUrl: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function FeaturedLessonModal({ 
  lesson, 
  isOpen, 
  onClose
}: FeaturedLessonModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!lesson) return null;

  const getMaterialName = (title: string) => {
    if (title.includes('Ninho')) return 'Receita Palha Italiana Leite Ninho';
    return 'Receita Palha Italiana Tradicional';
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gold/20 text-gold">
                      ⭐ Essencial
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary/20 text-primary">
                      +100 XP
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
              <iframe
                src={`${lesson.videoUrl}?autoplay=0&rel=0&modestbranding=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                title={lesson.title}
                style={{ border: 'none' }}
              />
            </div>

            {/* Lesson Info */}
            <div className="p-4 md:p-6 space-y-4">
              <p className="text-muted-foreground">
                Aprenda passo a passo como preparar uma deliciosa {lesson.title} com dicas exclusivas 
                para garantir o sucesso da sua receita e conquistar seus clientes!
              </p>

              {/* Material Complementar */}
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
                
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = window.location.origin + lesson.materialUrl;
                    link.download = getMaterialName(lesson.title) + '.pdf';
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-card/80 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <FileDown className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                        {getMaterialName(lesson.title)}
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
                </button>
              </motion.div>

              {/* Tips */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground text-sm">Dica de Ouro</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Esta é uma das receitas mais vendidas! Domine-a primeiro e você terá uma base sólida 
                  para explorar todas as outras variações. Pratique até ficar perfeita!
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
