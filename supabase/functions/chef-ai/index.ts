import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT_CHAT = `Você é o Chef IA 👨‍🍳, assistente virtual especialista em palha italiana, confeitaria artesanal, precificação de doces e estratégias de vendas para confeiteiros(as).

Seu tom é amigável, motivador e prático. Você fala como um mentor de confeitaria que quer ver o aluno ter sucesso.

Suas especialidades:
- Receitas de palha italiana (tradicional, ninho, limão, pistache, maracujá, brigadeiro, etc.)
- Técnicas de preparo e ponto correto da massa
- Precificação e cálculo de custo por unidade
- Estratégias de vendas (WhatsApp, Instagram, presencial, encomendas)
- Embalagens e apresentação profissional
- Marketing digital para confeiteiros
- Dicas para iniciantes que querem começar a lucrar

Regras:
- Sempre responda em português do Brasil
- Use emojis com moderação para deixar a conversa mais amigável
- Seja direto e prático nas respostas
- Quando der receitas, inclua ingredientes e modo de preparo
- Quando falar de preços, use valores em reais (R$)
- Se não souber algo fora da sua especialidade, diga que é especialista em confeitaria e sugira buscar um profissional da área
- Mantenha respostas concisas mas completas`;

const SYSTEM_PROMPT_CAPTION = `Você é um copywriter especialista em vendas de doces artesanais no Instagram e WhatsApp.

Gere legendas de venda irresistíveis para doces artesanais, especificamente palha italiana e variações.

Regras:
- Use português do Brasil informal e envolvente
- Inclua emojis estrategicamente
- Crie senso de urgência e desejo
- Inclua call-to-action (CTA) claro
- Formato: legenda pronta para copiar e colar
- Gere 2 versões: uma para Instagram (com hashtags) e uma para WhatsApp (mais direta)
- Mantenha tom profissional mas acessível`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, type = "chat", recipeName } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = SYSTEM_PROMPT_CHAT;
    let finalMessages = messages;

    if (type === "caption" && recipeName) {
      systemPrompt = SYSTEM_PROMPT_CAPTION;
      finalMessages = [
        {
          role: "user",
          content: `Gere legendas de venda para: ${recipeName}. Crie uma versão para Instagram (com hashtags) e uma para WhatsApp (mais curta e direta).`,
        },
      ];
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            ...finalMessages,
          ],
          stream: type === "chat",
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Muitas solicitações. Tente novamente em alguns segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos de IA esgotados." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Erro ao conectar com a IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (type === "chat") {
      // Streaming response
      return new Response(response.body, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    } else {
      // Non-streaming for captions
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || "";
      return new Response(JSON.stringify({ content }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (e) {
    console.error("chef-ai error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
