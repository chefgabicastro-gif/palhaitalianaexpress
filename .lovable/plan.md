

# Plano: Assistente de IA "Chef IA" + Funcionalidades Premium

## Visão Geral

Adicionar um **Assistente de IA integrado** ao app que funciona como um "Chef Consultor Virtual" — o lead pode tirar dúvidas sobre receitas, precificação, vendas, embalagens e técnicas de confeitaria. Isso eleva drasticamente o valor percebido do app. Além disso, adicionar funcionalidades complementares de alto impacto.

---

## 1. Assistente de IA "Chef IA" (funcionalidade principal)

Um chatbot flutuante no canto inferior direito do app, estilo WhatsApp, onde o lead conversa com uma IA especializada em confeitaria e negócios de palha italiana.

**Como funciona:**
- Botão flutuante com ícone de chat no canto inferior direito
- Abre um painel de conversa com histórico (salvo em localStorage)
- Edge function no backend chama o Lovable AI Gateway (modelo `google/gemini-3-flash-preview`)
- System prompt especializado: "Você é o Chef IA, assistente especialista em palha italiana, confeitaria artesanal, precificação de doces e estratégias de vendas..."
- Streaming de respostas token por token para UX fluida
- Sugestões rápidas pré-definidas: "Como precificar?", "Dica de embalagem", "Receita de palha de morango"

**Componentes:**
- `src/components/ChatAssistant.tsx` — UI do chat flutuante
- `supabase/functions/chef-ai/index.ts` — Edge function com system prompt e streaming
- Atualizar `supabase/config.toml` para registrar a função

---

## 2. Gerador de Legendas para Instagram/WhatsApp (via IA)

Botão em cada receita que gera automaticamente uma legenda de venda para redes sociais usando a IA. O lead clica, recebe uma legenda pronta e copia com um toque.

- Usa a mesma edge function com um modo diferente (`type: "caption"`)
- Botão "Gerar Legenda de Venda" nas receitas

---

## 3. Sistema de Progresso Local

- Marcar aulas como assistidas (localStorage)
- Barra de progresso nos módulos e no header
- XP baseado em aulas vistas (atualiza o header que hoje mostra 0)
- Badges desbloqueáveis conforme progresso

---

## 4. Compartilhar via WhatsApp

- Botão de compartilhar em receitas e aulas
- Usa Web Share API (nativa no celular) ou link direto do WhatsApp como fallback

---

## Prioridade de Implementação

| Ordem | Feature | Impacto |
|-------|---------|---------|
| 1 | Assistente Chef IA (chat) | Altíssimo — diferencial único |
| 2 | Gerador de legendas IA | Alto — valor prático imediato |
| 3 | Sistema de progresso local | Alto — engajamento |
| 4 | Compartilhar via WhatsApp | Médio — viralização |

---

## Detalhes Técnicos

- **LOVABLE_API_KEY** precisa ser habilitada no projeto (será provisionada automaticamente pelo Cloud)
- Edge function `chef-ai` com CORS, streaming SSE, system prompt em português
- Frontend usa `fetch` direto para streaming (não `supabase.functions.invoke` que não suporta stream)
- Chat salva histórico em localStorage (sem necessidade de banco)
- Markdown rendering nas respostas da IA com `react-markdown` (precisa instalar)

