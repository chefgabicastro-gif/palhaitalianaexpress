import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { recipes, recipeCategories, Recipe } from "@/data/recipes";
import { BookOpen, Download, Check, Sparkles, ChefHat, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";

type TemplateType = "elegante" | "moderno" | "colorido";

interface EbookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const templates = [
  {
    id: "elegante" as const,
    name: "Elegante",
    description: "Fundo escuro com detalhes dourados",
    preview: "bg-gradient-to-br from-slate-900 to-slate-800",
    colors: { bg: "#1e293b", text: "#f8fafc", accent: "#fbbf24", secondary: "#94a3b8" }
  },
  {
    id: "moderno" as const,
    name: "Moderno",
    description: "Clean e minimalista",
    preview: "bg-gradient-to-br from-white to-gray-100",
    colors: { bg: "#ffffff", text: "#1f2937", accent: "#8b5cf6", secondary: "#6b7280" }
  },
  {
    id: "colorido" as const,
    name: "Colorido",
    description: "Vibrante com gradientes",
    preview: "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500",
    colors: { bg: "#fef3c7", text: "#78350f", accent: "#d946ef", secondary: "#a16207" }
  },
];

const EbookModal = ({ open, onOpenChange }: EbookModalProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("elegante");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const getRecipesByCategory = () => {
    const grouped: { [key: string]: Recipe[] } = {};
    recipeCategories.forEach(cat => {
      grouped[cat.id] = recipes.filter(r => r.category === cat.id);
    });
    return grouped;
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    setProgress(0);

    const template = templates.find(t => t.id === selectedTemplate)!;
    const { colors } = template;
    
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - (margin * 2);

      // Helper functions
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
      };

      const setColor = (hex: string) => {
        const { r, g, b } = hexToRgb(hex);
        pdf.setTextColor(r, g, b);
      };

      const setFillColor = (hex: string) => {
        const { r, g, b } = hexToRgb(hex);
        pdf.setFillColor(r, g, b);
      };

      const addBackground = () => {
        setFillColor(colors.bg);
        pdf.rect(0, 0, pageWidth, pageHeight, "F");
      };

      // ========== COVER PAGE ==========
      addBackground();
      setProgress(5);

      // Decorative elements
      setFillColor(colors.accent);
      pdf.rect(0, 0, pageWidth, 8, "F");
      pdf.rect(0, pageHeight - 8, pageWidth, 8, "F");

      // Title
      setColor(colors.accent);
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "normal");
      pdf.text("E-BOOK EXCLUSIVO", pageWidth / 2, 50, { align: "center" });

      setColor(colors.text);
      pdf.setFontSize(32);
      pdf.setFont("helvetica", "bold");
      pdf.text("37 Receitas de", pageWidth / 2, 80, { align: "center" });
      pdf.text("Palha Italiana", pageWidth / 2, 95, { align: "center" });

      setColor(colors.secondary);
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "normal");
      pdf.text("Do tradicional ao gourmet", pageWidth / 2, 115, { align: "center" });

      // Categories preview
      let catY = 140;
      setColor(colors.text);
      pdf.setFontSize(11);
      recipeCategories.forEach(cat => {
        const count = recipes.filter(r => r.category === cat.id).length;
        pdf.text(`${cat.emoji} ${cat.name} (${count} receitas)`, pageWidth / 2, catY, { align: "center" });
        catY += 8;
      });

      // Footer
      setColor(colors.secondary);
      pdf.setFontSize(10);
      pdf.text("Palha Italiana Express", pageWidth / 2, pageHeight - 25, { align: "center" });
      pdf.text("© 2025 - Todos os direitos reservados", pageWidth / 2, pageHeight - 18, { align: "center" });

      setProgress(10);

      // ========== TABLE OF CONTENTS ==========
      pdf.addPage();
      addBackground();

      setFillColor(colors.accent);
      pdf.rect(0, 0, pageWidth, 6, "F");

      setColor(colors.accent);
      pdf.setFontSize(24);
      pdf.setFont("helvetica", "bold");
      pdf.text("Sumário", margin, 35);

      let tocY = 55;
      let pageNum = 3;
      const recipesByCategory = getRecipesByCategory();

      recipeCategories.forEach((cat, catIndex) => {
        const catRecipes = recipesByCategory[cat.id] || [];
        if (catRecipes.length === 0) return;

        setColor(colors.accent);
        pdf.setFontSize(13);
        pdf.setFont("helvetica", "bold");
        pdf.text(`${cat.emoji} ${cat.name}`, margin, tocY);
        
        setColor(colors.secondary);
        pdf.setFontSize(10);
        pdf.text(`(${catRecipes.length} receitas)`, margin + pdf.getTextWidth(`${cat.emoji} ${cat.name}`) + 3, tocY);
        tocY += 8;

        setColor(colors.text);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        
        catRecipes.forEach((recipe, idx) => {
          if (tocY > pageHeight - 30) {
            pdf.addPage();
            addBackground();
            setFillColor(colors.accent);
            pdf.rect(0, 0, pageWidth, 6, "F");
            tocY = 30;
          }

          const recipeName = recipe.name.replace('Palha Italiana ', '').replace('de ', '');
          const displayName = recipeName.length > 45 ? recipeName.substring(0, 45) + "..." : recipeName;
          
          setColor(colors.text);
          pdf.text(`${idx + 1}. ${displayName}`, margin + 5, tocY);
          
          setColor(colors.secondary);
          pdf.text(`pág. ${pageNum}`, pageWidth - margin - 15, tocY);
          
          pageNum++;
          tocY += 6;
        });

        tocY += 6;
      });

      setProgress(15);

      // ========== RECIPE PAGES ==========
      let currentRecipe = 0;
      const totalRecipes = recipes.length;

      for (const cat of recipeCategories) {
        const catRecipes = recipesByCategory[cat.id] || [];
        if (catRecipes.length === 0) continue;

        for (const recipe of catRecipes) {
          pdf.addPage();
          addBackground();
          currentRecipe++;

          // Progress update
          const progressValue = 15 + ((currentRecipe / totalRecipes) * 80);
          setProgress(Math.round(progressValue));

          // Category header bar
          setFillColor(colors.accent);
          pdf.rect(0, 0, pageWidth, 20, "F");

          setColor(colors.bg);
          pdf.setFontSize(10);
          pdf.setFont("helvetica", "bold");
          pdf.text(`${cat.emoji} ${cat.name.toUpperCase()}`, margin, 13);

          // Recipe number
          const difficultyText = recipe.difficulty === 'easy' ? '⭐ Fácil' : recipe.difficulty === 'medium' ? '⭐⭐ Médio' : '⭐⭐⭐ Difícil';
          pdf.text(`Receita ${currentRecipe}/${totalRecipes} • ${difficultyText}`, pageWidth - margin, 13, { align: "right" });

          // Recipe title
          let yPos = 35;
          setColor(colors.text);
          pdf.setFontSize(18);
          pdf.setFont("helvetica", "bold");
          
          const title = recipe.name;
          const titleLines = pdf.splitTextToSize(title, contentWidth);
          pdf.text(titleLines, margin, yPos);
          yPos += titleLines.length * 8 + 5;

          // Info badges
          setColor(colors.secondary);
          pdf.setFontSize(9);
          pdf.setFont("helvetica", "normal");
          pdf.text(`⏱️ ${recipe.prepTime} • 🍽️ ${recipe.yield} • ⚡ +${recipe.xpReward} XP`, margin, yPos);
          yPos += 12;

          // Ingredients section
          setColor(colors.accent);
          pdf.setFontSize(12);
          pdf.setFont("helvetica", "bold");
          pdf.text("📋 INGREDIENTES", margin, yPos);
          yPos += 8;

          setColor(colors.text);
          pdf.setFontSize(9);
          pdf.setFont("helvetica", "normal");
          
          for (const ing of recipe.ingredients) {
            if (yPos > pageHeight - 40) {
              pdf.addPage();
              addBackground();
              setFillColor(colors.accent);
              pdf.rect(0, 0, pageWidth, 6, "F");
              yPos = 25;
            }
            const ingText = `• ${ing.quantity} ${ing.unit} ${ing.item}${ing.notes ? ` (${ing.notes})` : ''}`;
            const ingLines = pdf.splitTextToSize(ingText, contentWidth - 5);
            pdf.text(ingLines, margin + 3, yPos);
            yPos += ingLines.length * 4.5;
          }

          yPos += 8;

          // Steps section
          if (yPos > pageHeight - 60) {
            pdf.addPage();
            addBackground();
            setFillColor(colors.accent);
            pdf.rect(0, 0, pageWidth, 6, "F");
            yPos = 25;
          }

          setColor(colors.accent);
          pdf.setFontSize(12);
          pdf.setFont("helvetica", "bold");
          pdf.text("👨‍🍳 MODO DE PREPARO", margin, yPos);
          yPos += 8;

          setColor(colors.text);
          pdf.setFontSize(9);
          pdf.setFont("helvetica", "normal");

          for (const step of recipe.steps) {
            if (yPos > pageHeight - 30) {
              pdf.addPage();
              addBackground();
              setFillColor(colors.accent);
              pdf.rect(0, 0, pageWidth, 6, "F");
              yPos = 25;
            }

            const stepText = `${step.step}. ${step.instruction}`;
            const stepLines = pdf.splitTextToSize(stepText, contentWidth - 8);
            
            pdf.setFont("helvetica", "bold");
            setColor(colors.accent);
            pdf.text(`${step.step}.`, margin + 3, yPos);
            
            pdf.setFont("helvetica", "normal");
            setColor(colors.text);
            pdf.text(pdf.splitTextToSize(step.instruction, contentWidth - 15), margin + 10, yPos);
            yPos += stepLines.length * 4.5;

            if (step.tip) {
              setColor(colors.secondary);
              pdf.setFontSize(8);
              pdf.setFont("helvetica", "italic");
              const tipText = `💡 Dica: ${step.tip}`;
              const tipLines = pdf.splitTextToSize(tipText, contentWidth - 15);
              pdf.text(tipLines, margin + 10, yPos);
              yPos += tipLines.length * 4;
              pdf.setFontSize(9);
              pdf.setFont("helvetica", "normal");
            }
            yPos += 2;
          }

          yPos += 6;

          // Freezing info
          if (recipe.freezing.canFreeze && yPos < pageHeight - 50) {
            setColor(colors.accent);
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "bold");
            pdf.text("❄️ CONGELAMENTO", margin, yPos);
            yPos += 7;

            setColor(colors.text);
            pdf.setFontSize(8);
            pdf.setFont("helvetica", "normal");
            
            pdf.text(`Duração: ${recipe.freezing.duration}`, margin + 3, yPos);
            yPos += 4;
            
            const freezeLines = pdf.splitTextToSize(recipe.freezing.instructions, contentWidth - 5);
            pdf.text(freezeLines, margin + 3, yPos);
            yPos += freezeLines.length * 4 + 2;
            
            const thawLines = pdf.splitTextToSize(`Descongelar: ${recipe.freezing.thawing}`, contentWidth - 5);
            pdf.text(thawLines, margin + 3, yPos);
            yPos += thawLines.length * 4;
          }

          // Tips (if space)
          if (recipe.tips.length > 0 && yPos < pageHeight - 35) {
            yPos += 6;
            setColor(colors.accent);
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "bold");
            pdf.text("✨ DICAS DE OURO", margin, yPos);
            yPos += 7;

            setColor(colors.text);
            pdf.setFontSize(8);
            pdf.setFont("helvetica", "normal");

            for (const tip of recipe.tips) {
              if (yPos > pageHeight - 15) break;
              const tipLines = pdf.splitTextToSize(`• ${tip}`, contentWidth - 5);
              pdf.text(tipLines, margin + 3, yPos);
              yPos += tipLines.length * 4;
            }
          }

          // Page footer
          setColor(colors.secondary);
          pdf.setFontSize(8);
          pdf.text(`Palha Italiana Express • Página ${pdf.getNumberOfPages()}`, pageWidth / 2, pageHeight - 8, { align: "center" });
        }
      }

      setProgress(98);

      // ========== BACK COVER ==========
      pdf.addPage();
      addBackground();

      setFillColor(colors.accent);
      pdf.rect(0, 0, pageWidth, 8, "F");
      pdf.rect(0, pageHeight - 8, pageWidth, 8, "F");

      setColor(colors.accent);
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.text("Obrigado por baixar!", pageWidth / 2, 80, { align: "center" });

      setColor(colors.text);
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text("Agora você tem todas as 37 receitas", pageWidth / 2, 100, { align: "center" });
      pdf.text("na palma da mão!", pageWidth / 2, 110, { align: "center" });

      setColor(colors.secondary);
      pdf.setFontSize(10);
      pdf.text("Continue praticando e conquistando", pageWidth / 2, 135, { align: "center" });
      pdf.text("novos sabores e clientes!", pageWidth / 2, 145, { align: "center" });

      setColor(colors.accent);
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("🍫 Boas vendas! 🍫", pageWidth / 2, 175, { align: "center" });

      setProgress(100);

      // Download
      pdf.save("ebook-37-receitas-palha-italiana.pdf");

      toast({
        title: "✅ E-book Gerado!",
        description: "Seu PDF foi baixado com sucesso. Confira sua pasta de downloads!",
      });

    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast({
        title: "Erro ao gerar PDF",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <BookOpen className="w-6 h-6 text-primary" />
            E-book de Receitas
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Preview Card */}
          <div className="relative rounded-xl overflow-hidden border border-border shadow-lg">
            <div className={`${templates.find(t => t.id === selectedTemplate)?.preview} p-6 text-center`}>
              <div className="absolute top-2 right-2">
                <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-primary/20 text-primary backdrop-blur-sm">
                  Preview
                </span>
              </div>
              <ChefHat className={`w-12 h-12 mx-auto mb-3 ${selectedTemplate === 'elegante' ? 'text-amber-400' : selectedTemplate === 'moderno' ? 'text-purple-600' : 'text-white'}`} />
              <h3 className={`font-bold text-lg ${selectedTemplate === 'elegante' ? 'text-white' : selectedTemplate === 'moderno' ? 'text-gray-800' : 'text-white'}`}>
                37 Receitas de Palha Italiana
              </h3>
              <p className={`text-sm mt-1 ${selectedTemplate === 'elegante' ? 'text-gray-300' : selectedTemplate === 'moderno' ? 'text-gray-500' : 'text-white/80'}`}>
                E-book completo com todas as categorias
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span><strong>37 receitas</strong> organizadas por categoria</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-green-500" />
              <span>Ingredientes, modo de preparo e dicas</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-green-500" />
              <span>Instruções de congelamento incluídas</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-green-500" />
              <span>PDF profissional pronto para imprimir</span>
            </div>
          </div>

          {/* Template Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Escolha o Template:</label>
            <div className="grid grid-cols-3 gap-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedTemplate === template.id 
                      ? 'border-primary ring-2 ring-primary/30 scale-[1.02]' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className={`${template.preview} h-16`} />
                  <div className="p-2 bg-card text-center">
                    <span className="text-xs font-medium">{template.name}</span>
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          {isGenerating && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Gerando PDF...</span>
                <span className="font-medium text-primary">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">
                {progress < 15 ? 'Preparando capa e sumário...' : 
                 progress < 95 ? 'Adicionando receitas ao PDF...' : 
                 'Finalizando e-book...'}
              </p>
            </div>
          )}

          {/* Download Button */}
          <Button
            onClick={generatePDF}
            disabled={isGenerating}
            className="w-full h-12 text-base font-semibold gap-2"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Gerando E-book...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Baixar E-book (PDF)
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EbookModal;
