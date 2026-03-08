
# Plano: E-book de Receitas Baixável

## Visão Geral

Vamos criar um sistema que permite ao usuário baixar todas as 37 receitas em formato de E-book PDF profissional, com layout bonito e organizado por categorias.

---

## O Que Será Criado

### 1. Botão de Download na Home
Um novo card na página inicial com destaque para baixar o E-book completo com todas as receitas.

### 2. Modal de E-book
Uma nova janela que permite:
- Visualizar preview do e-book
- Escolher template/estilo (Elegante, Moderno, etc.)
- Gerar e baixar o PDF completo

### 3. Estrutura do E-book PDF
```text
+---------------------------+
|     CAPA DO E-BOOK        |
|  "37 Receitas de Palha    |
|      Italiana"            |
|     [Logo/Imagem]         |
+---------------------------+
|     SUMÁRIO               |
|  - Base Clássica (7)      |
|  - Ninho & Variações (6)  |
|  - Frutadas (5)           |
|  - ...mais categorias     |
+---------------------------+
|     RECEITA 1             |
|  Nome + Categoria         |
|  Ingredientes             |
|  Modo de Preparo          |
|  Dicas de Congelamento    |
|  Dicas de Ouro            |
+---------------------------+
|     RECEITA 2...          |
+---------------------------+
```

---

## Arquivos a Criar/Modificar

| Arquivo | Ação |
|---------|------|
| `src/components/EbookModal.tsx` | Criar novo modal do e-book |
| `src/pages/Index.tsx` | Adicionar card/botão para o e-book |
| `package.json` | Adicionar `jspdf` e `html2canvas` |

---

## Como Vai Funcionar

1. **Usuário clica** no card "Baixar E-book" na Home
2. **Modal abre** com opções de template e preview
3. **Ao clicar "Baixar"**, o sistema:
   - Gera cada página do PDF usando HTML renderizado
   - Agrupa todas as 37 receitas organizadas por categoria
   - Baixa automaticamente o arquivo PDF

---

## Detalhes Técnicos

### Bibliotecas Necessárias
- **jsPDF**: Geração de documentos PDF
- **html2canvas**: Captura de elementos HTML para imagem

### Estrutura de Cada Página de Receita no PDF
- Título com emoji da categoria
- Badge de dificuldade e XP
- Lista de ingredientes formatada
- Passos numerados com dicas destacadas
- Seção de congelamento
- Dicas de ouro

### Templates Disponíveis
Seguindo o padrão do Cardápio Digital:
- **Elegante**: Fundo escuro com dourado
- **Moderno**: Clean e minimalista
- **Colorido**: Vibrante com gradientes

---

## Experiência do Usuário

1. Card atrativo na Home com ícone de livro
2. Modal com preview do e-book antes de baixar
3. Escolha de template visual
4. Barra de progresso durante geração
5. Download automático do PDF
6. Notificação de sucesso

---

## Resultado Final

O lead poderá baixar um PDF profissional com todas as 37 receitas, pronto para consultar offline ou imprimir, aumentando o valor percebido do aplicativo.
