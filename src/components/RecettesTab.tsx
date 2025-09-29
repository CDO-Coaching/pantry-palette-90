import { useState, useEffect } from 'react';
import { supabase, Recette } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            👨‍🍳 Mes Recettes
          </h1>
          <p className="text-muted-foreground">
            Découvrez et savourez vos recettes préférées
          </p>
        </div>

        <Card className="shadow-card bg-gradient-card border-0 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-primary">
              <span className="text-2xl">🔍</span>
              Choisir une recette
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={handleRecetteSelect}>
              <SelectTrigger className="w-full h-12 text-lg border-2 border-border/50 hover:border-primary/50 transition-colors">
                <SelectValue placeholder="Sélectionnez une recette..." />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {recettes.length === 0 ? (
                  <SelectItem value="none" disabled>
                    Aucune recette disponible
                  </SelectItem>
                ) : (
                  recettes.map((recette) => (
                    <SelectItem 
                      key={recette.id} 
                      value={recette.noms}
                      className="text-lg py-3"
                    >
                      {recette.noms}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {selectedRecette && (
          <Card className="shadow-soft bg-gradient-card border-0 transition-all duration-500 animate-fade-in">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl md:text-3xl font-bold text-primary flex items-center gap-3">
                <span className="text-3xl">🍽️</span>
                {selectedRecette.noms}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none">
                <div className="bg-accent/20 rounded-xl p-6 border border-accent/30">
                  {formatRecetteContent(selectedRecette.recette).map((line, index) => (
                    <div key={index} className="mb-3">
                      {line === '' ? (
                        <div className="h-3" />
                      ) : line.match(/^[A-ZÀ-Ÿ\s]+:$/) ? (
                        <h3 className="text-xl font-semibold text-primary mt-6 mb-3 first:mt-0">
                          {line}
                        </h3>
                      ) : line.startsWith('-') || line.startsWith('•') ? (
                        <div className="flex items-start gap-3 ml-4">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-foreground leading-relaxed">
                            {line.replace(/^[-•]\s*/, '')}
                          </span>
                        </div>
                      ) : (
                        <p className="text-foreground leading-relaxed">
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

        {!selectedRecette && !loading && (
          <Card className="text-center p-8 shadow-card bg-gradient-card border-0">
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-xl font-semibold mb-2">Sélectionnez une recette</h3>
            <p className="text-muted-foreground">
              Choisissez une recette dans le menu déroulant ci-dessus pour afficher ses détails.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RecettesTab;