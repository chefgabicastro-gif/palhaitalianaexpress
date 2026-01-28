import { useCallback } from "react";
import { jsPDF } from "jspdf";
import { Recipe } from "@/data/recipes";
import { useToast } from "@/hooks/use-toast";

export const useRecipePDF = () => {
  const { toast } = useToast();

  const generateRecipePDF = useCallback(async (recipe: Recipe) => {
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

      // Colors
      const colors = {
        bg: "#1e293b",
        text: "#f8fafc",
        accent: "#fbbf24",
        secondary: "#94a3b8"
      };

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

      // Background
      setFillColor(colors.bg);
      pdf.rect(0, 0, pageWidth, pageHeight, "F");

      // Header bar
      setFillColor(colors.accent);
      pdf.rect(0, 0, pageWidth, 25, "F");

      // Category
      setColor("#1e293b");
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");
      pdf.text(`${recipe.categoryEmoji} PALHA ITALIANA EXPRESS`, margin, 10);

      const difficultyText = recipe.difficulty === 'easy' ? 'Fácil' : recipe.difficulty === 'medium' ? 'Médio' : 'Difícil';
      pdf.text(`${difficultyText} • +${recipe.xpReward} XP`, pageWidth - margin, 10, { align: "right" });

      // Recipe title
      setColor(colors.text);
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      
      let yPos = 40;
      const titleLines = pdf.splitTextToSize(recipe.name, contentWidth);
      pdf.text(titleLines, margin, yPos);
      yPos += titleLines.length * 9 + 5;

      // Info
      setColor(colors.secondary);
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.text(`⏱️ ${recipe.prepTime} • 🍽️ ${recipe.yield}`, margin, yPos);
      yPos += 15;

      // Ingredients
      setColor(colors.accent);
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("📋 INGREDIENTES", margin, yPos);
      yPos += 8;

      setColor(colors.text);
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      
      for (const ing of recipe.ingredients) {
        if (yPos > pageHeight - 30) {
          pdf.addPage();
          setFillColor(colors.bg);
          pdf.rect(0, 0, pageWidth, pageHeight, "F");
          yPos = 20;
        }
        const ingText = `• ${ing.quantity} ${ing.unit} ${ing.item}${ing.notes ? ` (${ing.notes})` : ''}`;
        const ingLines = pdf.splitTextToSize(ingText, contentWidth - 5);
        pdf.text(ingLines, margin + 3, yPos);
        yPos += ingLines.length * 5;
      }

      yPos += 10;

      // Steps
      if (yPos > pageHeight - 50) {
        pdf.addPage();
        setFillColor(colors.bg);
        pdf.rect(0, 0, pageWidth, pageHeight, "F");
        yPos = 20;
      }

      setColor(colors.accent);
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("👨‍🍳 MODO DE PREPARO", margin, yPos);
      yPos += 8;

      setColor(colors.text);
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");

      for (const step of recipe.steps) {
        if (yPos > pageHeight - 25) {
          pdf.addPage();
          setFillColor(colors.bg);
          pdf.rect(0, 0, pageWidth, pageHeight, "F");
          yPos = 20;
        }

        setColor(colors.accent);
        pdf.setFont("helvetica", "bold");
        pdf.text(`${step.step}.`, margin + 3, yPos);
        
        setColor(colors.text);
        pdf.setFont("helvetica", "normal");
        const stepLines = pdf.splitTextToSize(step.instruction, contentWidth - 15);
        pdf.text(stepLines, margin + 12, yPos);
        yPos += stepLines.length * 5;

        if (step.tip) {
          setColor(colors.secondary);
          pdf.setFontSize(9);
          pdf.setFont("helvetica", "italic");
          const tipLines = pdf.splitTextToSize(`💡 ${step.tip}`, contentWidth - 18);
          pdf.text(tipLines, margin + 12, yPos);
          yPos += tipLines.length * 4.5;
          pdf.setFontSize(10);
          pdf.setFont("helvetica", "normal");
        }
        yPos += 3;
      }

      yPos += 8;

      // Freezing
      if (recipe.freezing.canFreeze && yPos < pageHeight - 40) {
        setColor(colors.accent);
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("❄️ CONGELAMENTO", margin, yPos);
        yPos += 7;

        setColor(colors.text);
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.text(`Duração: ${recipe.freezing.duration}`, margin + 3, yPos);
        yPos += 5;
        
        const freezeLines = pdf.splitTextToSize(recipe.freezing.instructions, contentWidth - 5);
        pdf.text(freezeLines, margin + 3, yPos);
        yPos += freezeLines.length * 4.5;
      }

      // Tips (if space)
      if (recipe.tips.length > 0 && yPos < pageHeight - 30) {
        yPos += 6;
        setColor(colors.accent);
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("✨ DICAS DE OURO", margin, yPos);
        yPos += 7;

        setColor(colors.text);
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");

        for (const tip of recipe.tips) {
          if (yPos > pageHeight - 15) break;
          const tipLines = pdf.splitTextToSize(`• ${tip}`, contentWidth - 5);
          pdf.text(tipLines, margin + 3, yPos);
          yPos += tipLines.length * 4.5;
        }
      }

      // Footer
      setColor(colors.secondary);
      pdf.setFontSize(8);
      pdf.text("Palha Italiana Express • www.palhaitalianaexpress.lovable.app", pageWidth / 2, pageHeight - 8, { align: "center" });

      // Generate filename
      const filename = `receita-${recipe.name.toLowerCase().replace(/\s+/g, '-').replace('palha-italiana-', '')}.pdf`;
      pdf.save(filename);

      toast({
        title: "📥 PDF Gerado!",
        description: `Receita "${recipe.name.replace('Palha Italiana ', '')}" foi baixada.`,
      });

    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast({
        title: "Erro ao gerar PDF",
        description: "Tente novamente.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const shareOnWhatsApp = useCallback((recipe: Recipe) => {
    const recipeName = recipe.name;
    const recipeUrl = `https://palhaitalianaexpress.lovable.app/modulos`;
    
    // Build ingredients list
    const ingredientsList = recipe.ingredients
      .map(ing => `• ${ing.quantity} ${ing.unit} ${ing.item}${ing.notes ? ` (${ing.notes})` : ''}`)
      .join('\n');

    // Build steps
    const stepsList = recipe.steps
      .map(step => `${step.step}. ${step.instruction}`)
      .join('\n');

    // Build tips
    const tipsList = recipe.tips
      .map(tip => `💡 ${tip}`)
      .join('\n');

    const message = `🍫 *${recipeName}* 🍫

⏱️ ${recipe.prepTime} | 🍽️ ${recipe.yield}
⭐ Dificuldade: ${recipe.difficulty === 'easy' ? 'Fácil' : recipe.difficulty === 'medium' ? 'Médio' : 'Difícil'}

📋 *INGREDIENTES:*
${ingredientsList}

👨‍🍳 *MODO DE PREPARO:*
${stepsList}

❄️ *CONGELAMENTO:*
${recipe.freezing.canFreeze ? `Até ${recipe.freezing.duration}` : 'Não recomendado'}
${recipe.freezing.instructions}

✨ *DICAS DE OURO:*
${tipsList}

📱 Quer mais receitas? Acesse:
${recipeUrl}

_Enviado via Palha Italiana Express_ 🍫`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');

    toast({
      title: "📤 WhatsApp Aberto!",
      description: "Escolha para quem enviar a receita.",
    });
  }, [toast]);

  return { generateRecipePDF, shareOnWhatsApp };
};
