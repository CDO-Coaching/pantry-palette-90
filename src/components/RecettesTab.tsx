import { useState, useEffect } from 'react';
import { supabase, Recette } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ChefHat, Clock, Image } from 'lucide-react';

const RecettesTab = () => {
  const [recettes, setRecettes] = useState<Recette[]>([]);
  const [selectedRecette, setSelectedRecette] = useState<Recette | null>(null);
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

  const handleRecetteSelect = (nom: string) => {
    const recette = recettes.find(r => r.noms === nom);
    setSelectedRecette(recette || null);
  };

  const formatRecetteContent = (content: string) => {
    if (!content) return [];
    
    // Séparer par lignes et conserver la mise en forme
    return content
      .split('\n')
      .map(line => line.trim());
  };

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
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-10">
          <h1 className="font-recipe text-3xl font-bold recipe-title mb-3">
            Collection de Recettes
          </h1>
          <p className="text-muted-foreground font-sans text-lg">
            Découvrez et savourez mes recettes préférées
          </p>
        </div>

        {/* Sélecteur de recettes style livre vintage */}
        <Card className="shadow-recipe bg-gradient-card border-0 mb-8 overflow-hidden">
          <CardHeader className="bg-accent/10 border-b border-border/20">
            <CardTitle className="flex items-center gap-3 recipe-title">
              <ChefHat className="w-6 h-6 warm-orange" />
              <span className="font-recipe text-xl">Choisir une recette</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Select onValueChange={handleRecetteSelect}>
              <SelectTrigger className="w-full h-14 text-lg border-2 border-border/50 hover:border-primary/50 transition-smooth bg-card/50 rounded-xl">
                <SelectValue placeholder="Sélectionnez une recette..." className="font-sans" />
              </SelectTrigger>
              <SelectContent className="max-h-60 bg-card/95 backdrop-blur-sm">
                {recettes.length === 0 ? (
                  <SelectItem value="none" disabled>
                    Aucune recette disponible
                  </SelectItem>
                ) : (
                  recettes.map((recette) => (
                    <SelectItem 
                      key={recette.id} 
                      value={recette.noms}
                      className="text-lg py-4 font-sans hover:bg-accent/30"
                    >
                      {recette.noms}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Affichage de la recette sélectionnée style fiche de cuisine */}
        {selectedRecette && (
          <Card className="shadow-recipe bg-gradient-card border-0 transition-smooth animate-fade-in overflow-hidden">
            <CardHeader className="bg-accent/10 border-b border-border/20 pb-8">
              <CardTitle className="flex items-start gap-4">
                <div className="bg-primary/10 p-4 rounded-2xl flex-shrink-0">
                  <Image className="w-8 h-8 warm-orange" />
                </div>
                <div className="flex-1">
                  <h2 className="font-recipe text-3xl font-bold recipe-title mb-2">
                    {selectedRecette.noms}
                  </h2>
                  <div className="flex items-center gap-4 text-muted-foreground font-sans">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Temps de préparation</span>
                    </div>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span className="text-sm">Fiche de cuisine</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {/* Zone prévue pour l'image de la recette */}
              <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl p-6 mb-8 border-2 border-dashed border-accent/40">
                <div className="text-center">
                  <Image className="w-16 h-16 mx-auto mb-4 text-accent-foreground/50" />
                  <p className="text-accent-foreground font-sans text-lg font-medium">
                    Espace réservé pour la photo de la recette
                  </p>
                  <p className="text-muted-foreground font-sans text-sm mt-2">
                    Votre délicieuse création sera bientôt ici !
                  </p>
                </div>
              </div>
              
              {/* Contenu de la recette */}
              <div className="bg-card/50 rounded-2xl p-8 border border-border/20 backdrop-blur-sm">
                <div className="space-y-4">
                  {formatRecetteContent(selectedRecette.recette).map((line, index) => (
                    <div key={index}>
                      {line === '' ? (
                        <div className="h-4" />
                      ) : line.match(/^[A-ZÀ-Ÿ\s]+:$/) ? (
                        <h3 className="font-recipe text-2xl font-bold recipe-title mt-8 mb-4 first:mt-0 border-b border-border/30 pb-2">
                          {line}
                        </h3>
                      ) : line.startsWith('-') || line.startsWith('•') ? (
                        <div className="flex items-start gap-4 ml-6 p-3 bg-accent/10 rounded-lg">
                          <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0 shadow-sm"></div>
                          <span className="text-foreground font-sans text-lg leading-relaxed flex-1">
                            {line.replace(/^[-•]\s*/, '')}
                          </span>
                        </div>
                      ) : (
                        <p className="text-foreground font-sans text-lg leading-relaxed">
                          {line}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* État vide style livre de recettes */}
        {!selectedRecette && !loading && (
          <Card className="text-center p-12 shadow-recipe bg-gradient-card border-0">
            <div className="text-7xl mb-6">📖</div>
            <h3 className="font-recipe text-2xl font-semibold recipe-title mb-4">Sélectionnez une recette</h3>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed max-w-md mx-auto">
              Choisissez une recette dans le menu déroulant ci-dessus pour afficher sa fiche détaillée.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RecettesTab;