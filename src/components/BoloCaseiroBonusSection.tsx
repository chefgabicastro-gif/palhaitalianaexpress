import { useState } from 'react';
import { Play, Lock, Cake, Sparkles, Gift, ChefHat, Crown } from 'lucide-react';
import bonusBoloCaseiroThumb from '@/assets/thumbnails/bonus-bolo-caseiro.jpg';

interface BonusLesson {
  title: string;
  youtubeId: string;
  category: 'bolo' | 'recheio';
}

const boloLessons: BonusLesson[] = [
  { title: 'Seja bem vindo - Utensílios Necessários', youtubeId: 'Ki8fXAB_3ug', category: 'bolo' },
  { title: 'Receita Base', youtubeId: 'QaVOqPPG-pU', category: 'bolo' },
  { title: 'Bolo Caseiro de Goiabada', youtubeId: '_pZ_btZLSIo', category: 'bolo' },
  { title: 'Bolo Caseiro de Limão', youtubeId: 'cnwSipL7Rps', category: 'bolo' },
  { title: 'Bolo Caseiro de Cenoura', youtubeId: 'nxFGawb0dgg', category: 'bolo' },
  { title: 'Bolo de Napolitano', youtubeId: 'nxFGawb0dgg', category: 'bolo' },
  { title: 'Bolo Caseiro de Limão com Calda', youtubeId: 'JZeGLOlwXSA', category: 'bolo' },
  { title: 'Bolo Caseiro de Banana', youtubeId: 'YWP9R-tm1u0', category: 'bolo' },
  { title: 'Bolo Caseiro de Chocolate', youtubeId: 'hnaIP1MstwI', category: 'bolo' },
  { title: 'Bolo Caseiro de Capuccino', youtubeId: 'ZHFAHyToipg', category: 'bolo' },
  { title: 'Bolo de Amendoim', youtubeId: 'Y2B31ui7Jlk', category: 'bolo' },
  { title: 'Bolo de Fubá', youtubeId: 'Fou-C83IbnY', category: 'bolo' },
  { title: 'Bolo Caseiro de Castanha', youtubeId: 'ZQsQgmkuTE8', category: 'bolo' },
  { title: 'Bolo Caseiro de Coco', youtubeId: '3UrM8bwHO_8', category: 'bolo' },
  { title: 'Bolo Caseiro de Maracujá', youtubeId: 'GohAm-aAUos', category: 'bolo' },
  { title: 'Bolo Caseiro de Ninho', youtubeId: 'RNQovEdVNpE', category: 'bolo' },
  { title: 'Bolo Caseiro de Laranja', youtubeId: 'ToUEyIL2ViU', category: 'bolo' },
  { title: 'Bolo de Brigadeiro', youtubeId: '5lWCQROf1Gw', category: 'bolo' },
  { title: 'Bolo Caseiro de Churros', youtubeId: '42MArXekIOw', category: 'bolo' },
  { title: 'Bolo Caseiro Ninho com Nutella', youtubeId: 'z8lUrQUvd8s', category: 'bolo' },
];

const recheioLessons: BonusLesson[] = [
  { title: 'Recheios de Morangos, Ameixas e Abacaxi', youtubeId: 'rJEI6IVB_iY', category: 'recheio' },
  { title: 'Recheios de Alpino, Sensação e Diamante Negro', youtubeId: '6rT7SKFE9AA', category: 'recheio' },
  { title: 'Brigadeiros em Ponto de Bico', youtubeId: 'TU0NpuvXId8', category: 'recheio' },
  { title: 'Recheio e Cobertura de Chocolate Cremoso', youtubeId: 'wXcLzHbF3Os', category: 'recheio' },
  { title: 'Recheio de Doce de Leite e Ameixa', youtubeId: '9fLglDYi6PM', category: 'recheio' },
  { title: 'Três Recheios de Chocolates Famosos', youtubeId: '9f2mN7aR81I', category: 'recheio' },
  { title: 'Mousse Cremoso de Leite Condensado', youtubeId: 'u5TF0u3tEQA', category: 'recheio' },
];

const allLessons = [...boloLessons, ...recheioLessons];

export function BoloCaseiroBonusSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="mb-6 animate-fade-in" style={{ animationDelay: '32ms' }}>
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-yellow-500/20 rounded-3xl blur-xl opacity-40" />
      
      <div className="relative card-glass p-6 md:p-8 overflow-hidden rounded-2xl border-2 border-amber-500/30">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-amber-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10">
          {/* Header com badges */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/40 to-orange-500/30 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Cake className="w-7 h-7 text-amber-500" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-500 flex items-center gap-1 animate-pulse">
                    <Gift className="w-3 h-3" />
                    BÔNUS EXCLUSIVO
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary/20 text-primary">
                    27 AULAS
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gold/20 text-gold flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    PREMIUM
                  </span>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                  🎂 Curso Completo de Bolo Caseiro
                </h3>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-5 max-w-3xl">
            Você ganhou acesso a este curso <span className="text-amber-500 font-semibold">100% gratuito</span>! 
            São <span className="font-semibold text-foreground">20 receitas de bolos</span> + <span className="font-semibold text-foreground">7 aulas de recheios profissionais</span>. 
            Diversifique seu negócio e multiplique seus lucros! 🚀
          </p>

          {/* Preview Video - Aula 01 */}
          <div className="mb-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/20 border border-amber-500/30">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-2xl opacity-30 blur-sm animate-pulse" />
              
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
                {!showVideo ? (
                  <div 
                    className="relative w-full h-full cursor-pointer group"
                    onClick={() => setShowVideo(true)}
                  >
                    <img 
                      src={bonusBoloCaseiroThumb}
                      alt="Curso de Bolo Caseiro"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/50 group-hover:scale-110 transition-transform">
                        <Play className="w-9 h-9 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>

                    {/* Bottom overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white">
                          ▶ Aula 01 - Preview
                        </span>
                      </div>
                      <p className="text-white font-bold text-lg">Seja Bem Vindo - Utensílios Necessários</p>
                      <p className="text-white/70 text-sm">Clique para assistir a primeira aula grátis!</p>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src="https://www.youtube.com/embed/Ki8fXAB_3ug?rel=0&modestbranding=1&autoplay=1"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    title="Bolo Caseiro - Aula 01"
                    style={{ border: 'none' }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Seção: 20 Receitas de Bolos */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <ChefHat className="w-5 h-5 text-amber-500" />
              <h4 className="font-heading text-base font-bold text-foreground">20 Receitas de Bolos Caseiros</h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
              {boloLessons.map((lesson, index) => (
                <div
                  key={index}
                  className="group relative rounded-xl overflow-hidden bg-card/60 border border-border/50 opacity-90"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video">
                    <img 
                      src={`https://img.youtube.com/vi/${lesson.youtubeId}/hqdefault.jpg`}
                      alt={lesson.title}
                      className="w-full h-full object-cover brightness-50"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Lock className="w-4 h-4 text-white/80" />
                      </div>
                    </div>
                    <div className="absolute top-1.5 left-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/60 text-white/80">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-[11px] font-medium text-muted-foreground line-clamp-2 leading-tight">
                      {lesson.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seção: 7 Recheios Profissionais */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <h4 className="font-heading text-base font-bold text-foreground">7 Recheios Profissionais</h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {recheioLessons.map((lesson, index) => (
                <div
                  key={index}
                  className="group relative rounded-xl overflow-hidden bg-card/60 border border-border/50 opacity-90"
                >
                  <div className="relative aspect-video">
                    <img 
                      src={`https://img.youtube.com/vi/${lesson.youtubeId}/hqdefault.jpg`}
                      alt={lesson.title}
                      className="w-full h-full object-cover brightness-50"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Lock className="w-4 h-4 text-white/80" />
                      </div>
                    </div>
                    <div className="absolute top-1.5 left-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-orange-500/80 text-white">
                        Recheio
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-[11px] font-medium text-muted-foreground line-clamp-2 leading-tight">
                      {lesson.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity animate-pulse" />
              <button 
                className="relative px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white font-bold text-lg shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/60 transition-all hover:scale-105 flex items-center gap-3"
                onClick={() => setShowVideo(true)}
              >
                <Cake className="w-6 h-6" />
                Começar Curso de Bolo Caseiro
                <Sparkles className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
