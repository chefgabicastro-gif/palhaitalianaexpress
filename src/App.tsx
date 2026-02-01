import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Modulos from "./pages/Modulos";
import Conquistas from "./pages/Conquistas";
import Graficos from "./pages/Graficos";
import Aulas from "./pages/Aulas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      gcTime: 30 * 60 * 1000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/modulos" element={<Modulos />} />
          <Route path="/conquistas" element={<Conquistas />} />
          <Route path="/graficos" element={<Graficos />} />
          <Route path="/aulas" element={<Aulas />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
