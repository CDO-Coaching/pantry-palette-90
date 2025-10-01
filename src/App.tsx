import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoursesPage from "./pages/CoursesPage";
import RecettesSemainePage from "./pages/RecettesSemainePage";
import ToutesRecettesPage from "./pages/ToutesRecettesPage";
import RecetteDetail from "./pages/RecetteDetail";
import HistoriqueRecetteDetail from "./pages/HistoriqueRecetteDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/recettes-semaine" element={<RecettesSemainePage />} />
          <Route path="/toutes-recettes" element={<ToutesRecettesPage />} />
          <Route path="/recette/:id" element={<RecetteDetail />} />
          <Route path="/historique/:id" element={<HistoriqueRecetteDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
