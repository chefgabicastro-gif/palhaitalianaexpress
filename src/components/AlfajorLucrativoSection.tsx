import { useState } from "react";
import { Download, FileText, Sparkles, X, Gift, Crown } from "lucide-react";
import banner from "@/assets/alfajor-lucrativo-banner.webp.asset.json";
import ebookAsset from "@/assets/alfajor-ebook-completo.pdf.asset.json";
import rotaAsset from "@/assets/alfajor-rota-7-dias.pdf.asset.json";

const materiais = [
  { title: "E-book Completo", subtitle: "Alfajor de Vitrine", icon: "📘", url: ebookAsset.url },
  { title: "Comece Aqui", subtitle: "Rota de 7 Dias", icon: "🚀", url: rotaAsset.url },
  { title: "Seu Primeiro Alfajor", subtitle: "Passo a passo perfeito", icon: "🥇", url: "/materials/alfajor-primeiro-perfeito.pdf" },
  { title: "Guia Universal", subtitle: "Todas as variações", icon: "🌎", url: "/materials/alfajor-guia-universal.pdf" },
  { title: "Atlas de Erros", subtitle: "Diagnóstico e correção", icon: "🧭", url: "/materials/alfajor-atlas-erros.pdf" },
  { title: "Caderno de Testes", subtitle: "Padronização", icon: "📝", url: "/materials/alfajor-caderno-testes.pdf" },
  { title: "Kit de Venda", subtitle: "Vender e lucrar", icon: "💰", url: "/materials/alfajor-kit-venda.pdf" },
];

export function AlfajorLucrativoSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-6 animate-fade-in" style={{ animationDelay: "34ms" }}>
        <button
          onClick={() => setOpen(true)}
          className="group relative w-full overflow-hidden rounded-2xl border-2 border-gold/40 hover:border-gold transition-all duration-500 hover:shadow-2xl hover:shadow-gold/20 hover:-translate-y-0.5 text-left"
        >
          {/* Glow pulse */}
          <div className="absolute -inset-1 bg-gradient-to-r from-gold/30 via-primary/20 to-gold/30 blur-2xl opacity-60 animate-pulse" />
          {/* Shine sweep */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
            <div className="absolute top-0 -left-1/3 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[400%] transition-transform duration-1000" />
          </div>

          <div className="relative z-10">
            <img
              src={banner.url}
              alt="Baixe seu material completo de Alfajor Lucrativo"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/90 to-transparent flex items-center justify-between gap-2">
              <span className="text-[11px] sm:text-sm font-bold text-gold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> 7 materiais em PDF
              </span>
              <span className="px-3 py-1.5 rounded-full bg-gold text-background text-[11px] sm:text-xs font-bold flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" /> Baixar agora
              </span>
            </div>
          </div>
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full sm:max-w-2xl max-h-[88vh] overflow-y-auto card-glass rounded-t-2xl sm:rounded-2xl border border-gold/30 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/80 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4 pr-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/30 to-primary/20 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-gold" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-1.5 mb-1">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-gold/20 text-gold flex items-center gap-1">
                    <Gift className="w-2.5 h-2.5" /> Bônus Exclusivo
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-primary/20 text-primary flex items-center gap-1">
                    <Crown className="w-2.5 h-2.5" /> Premium
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  🥮 Alfajor Lucrativo
                </h3>
                <p className="text-xs text-muted-foreground">Receita, montagem e dicas para vender</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {materiais.map((m) => (
                <a
                  key={m.url}
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-xl bg-card/60 border border-border/50 hover:border-gold/50 hover:bg-card/90 transition-all"
                >
                  <span className="text-2xl">{m.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-foreground group-hover:text-gold transition-colors leading-tight">
                      {m.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground truncate">{m.subtitle}</p>
                  </div>
                  <Download className="w-4 h-4 text-gold shrink-0" />
                </a>
              ))}
            </div>

            <p className="text-[11px] text-muted-foreground text-center mt-4">
              Toque em qualquer material para abrir ou baixar o PDF.
            </p>
          </div>
        </div>
      )}
    </>
  );
}