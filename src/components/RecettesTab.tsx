import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, HistoriqueRecette } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ChefHat, Search, BookOpen } from 'lucide-react';

const RecettesTab = () => {
  const navigate = useNavigate();
  const [recettes, setRecettes] = useState<HistoriqueRecette[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRecettes();
  }, []);

  const fetchRecettes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('historique_recette')
        .select('*')
        .order('nom', { ascending: true });

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

  const filteredRecettes = recettes.filter(recette =>
    recette.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center mb-8">
          <Skeleton className="h-8 w-64 mx-auto mb-2" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
        <Card className="shadow-card">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-full mb-4" />
            <div className="space-y-2">
              {[...Array(6)].map((_, j) => (
                <Skeleton key={j} className="h-4 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-recipe">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="text-center mb-10">
          <h1 className="font-recipe text-2xl sm:text-3xl font-bold recipe-title mb-3">
            Toutes les Recettes
          </h1>
          <p className="text-muted-foreground font-sans text-base sm:text-lg">
            {recettes.length} recette{recettes.length > 1 ? 's' : ''} disponible{recettes.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Barre de recherche */}
        <Card className="shadow-recipe bg-gradient-card border-0 mb-8">
          <CardHeader className="bg-accent/10 border-b border-border/20">
            <CardTitle className="flex items-center gap-3 recipe-title">
              <Search className="w-6 h-6 warm-orange" />
              <span className="font-recipe text-xl">Rechercher une recette</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Input
              type="text"
              placeholder="Tapez le nom d'une recette..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 text-base sm:text-lg border-2 border-border/50 hover:border-primary/50 transition-smooth bg-card/50 rounded-xl"
            />
          </CardContent>
        </Card>

        {filteredRecettes.length === 0 ? (
          <Card className="text-center p-12 shadow-recipe bg-gradient-card border-0">
            <div className="text-7xl mb-6">🔍</div>
            <h3 className="font-recipe text-2xl font-semibold recipe-title mb-4">
              {searchTerm ? 'Aucune recette trouvée' : 'Aucune recette'}
            </h3>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed max-w-md mx-auto">
              {searchTerm 
                ? 'Essayez avec un autre terme de recherche.' 
                : 'Commencez par ajouter vos premières recettes pour les voir apparaître ici.'}
            </p>
          </Card>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecettes.map((recette) => (
              <Card 
                key={recette.id} 
                onClick={() => navigate(`/historique/${recette.id}`)}
                className="shadow-recipe bg-gradient-card border-0 transition-smooth hover:transform hover:scale-105 hover:shadow-xl overflow-hidden cursor-pointer"
              >
                <CardHeader className="bg-accent/10 border-b border-border/20 pb-4">
                  <CardTitle className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                      <ChefHat className="w-5 h-5 warm-orange" />
                    </div>
                    <div className="font-recipe text-base sm:text-lg font-bold recipe-title leading-tight break-words overflow-wrap-anywhere min-w-0 flex-1">
                      {recette.nom}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecettesTab;