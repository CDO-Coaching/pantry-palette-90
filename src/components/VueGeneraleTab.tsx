import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, Recette } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, ChefHat } from 'lucide-react';

const VueGeneraleTab = () => {
  const navigate = useNavigate();
  const [recettes, setRecettes] = useState<Recette[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRecettes();
  }, []);

  const fetchRecettes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('alimentation_recette')
        .select('*')
        .order('noms', { ascending: true });

      if (error) {
        throw error;
      }

      setRecettes(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des recettes:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les recettes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <div className="text-center mb-8">
          <Skeleton className="h-8 w-64 mx-auto mb-2" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  // Catégoriser les recettes par ID
  const petitsDej = recettes.filter(r => r.id >= 1 && r.id <= 6);
  const repas = recettes.filter(r => r.id >= 7 && r.id <= 12);

  const RecetteCard = ({ recette }: { recette: Recette }) => (
    <Card 
      key={recette.id} 
      onClick={() => navigate(`/recette/${recette.id}`)}
      className="shadow-card bg-card border border-border/40 transition-smooth hover:transform hover:scale-105 hover:shadow-xl overflow-hidden cursor-pointer rounded-2xl"
    >
      <CardHeader className="bg-gradient-warm/30 border-b border-border/20 pb-4">
        <CardTitle className="flex items-start gap-3">
          <div className="bg-primary/20 p-2 rounded-xl flex-shrink-0">
            <ChefHat className="w-5 h-5 text-primary" />
          </div>
          <div className="font-recipe text-base sm:text-lg font-bold recipe-title leading-tight break-words overflow-wrap-anywhere min-w-0 flex-1">
            {recette.noms}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <BookOpen className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-sans truncate">Voir la recette</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-recipe">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="text-center mb-10">
          <h1 className="font-recipe text-2xl sm:text-3xl font-bold recipe-title mb-3">
            Recettes de la Semaine
          </h1>
          <p className="text-muted-foreground font-sans text-base sm:text-lg">
            {recettes.length} recette{recettes.length > 1 ? 's' : ''} disponible{recettes.length > 1 ? 's' : ''}
          </p>
        </div>

        {recettes.length === 0 ? (
          <Card className="text-center p-12 shadow-card bg-card border border-border/40 rounded-3xl">
            <div className="text-7xl mb-6">📖</div>
            <h3 className="font-recipe text-2xl font-semibold recipe-title mb-4">Aucune recette</h3>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed max-w-md mx-auto">
              Commencez par ajouter vos premières recettes pour les voir apparaître ici.
            </p>
          </Card>
        ) : (
          <div className="space-y-10">
            {/* Section Petits Déjeuners */}
            {petitsDej.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-warm p-3 rounded-2xl">
                    <span className="text-2xl">☕</span>
                  </div>
                  <h2 className="font-recipe text-xl sm:text-2xl font-bold recipe-title">
                    Petits Déjeuners
                  </h2>
                  <div className="flex-1 h-px bg-gradient-primary opacity-30"></div>
                </div>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {petitsDej.map((recette) => (
                    <RecetteCard key={recette.id} recette={recette} />
                  ))}
                </div>
              </div>
            )}

            {/* Section Repas */}
            {repas.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-warm p-3 rounded-2xl">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <h2 className="font-recipe text-xl sm:text-2xl font-bold recipe-title">
                    Repas
                  </h2>
                  <div className="flex-1 h-px bg-gradient-primary opacity-30"></div>
                </div>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {repas.map((recette) => (
                    <RecetteCard key={recette.id} recette={recette} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VueGeneraleTab;
