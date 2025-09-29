import { useState, useEffect } from 'react';
import { supabase, ListeDeCourse } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const ListeDeCoursesTab = () => {
  const [liste, setListe] = useState<ListeDeCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchListe();
  }, []);

  const fetchListe = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('alimentation_liste_de_course')
        .select('*')
        .eq('id', 1)
        .single();

      if (error) {
        throw error;
      }

      setListe(data);
    } catch (error) {
      console.error('Erreur lors du chargement de la liste:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste de courses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatListeContent = (content: string) => {
    if (!content) return [];
    
    // Séparer par lignes et nettoyer
    return content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center mb-8">
          <Skeleton className="h-8 w-64 mx-auto mb-2" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="shadow-card">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[...Array(4)].map((_, j) => (
                  <Skeleton key={j} className="h-4 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-recipe">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-10">
          <h1 className="font-recipe text-3xl font-bold recipe-title mb-3">
            Ma Liste de Courses
          </h1>
          <p className="text-muted-foreground font-sans text-lg">
            Mes courses soigneusement organisées
          </p>
        </div>

        {!liste ? (
          <Card className="text-center p-12 shadow-recipe bg-gradient-card border-0">
            <div className="text-7xl mb-6">📝</div>
            <h3 className="font-recipe text-2xl font-semibold recipe-title mb-4">Aucune liste trouvée</h3>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed">
              Votre liste de courses apparaîtra ici une fois ajoutée à la base de données.
            </p>
          </Card>
        ) : (
          <Card className="shadow-recipe hover:shadow-soft transition-smooth bg-gradient-card border-0 overflow-hidden">
            <CardHeader className="bg-accent/10 border-b border-border/20 pb-6">
              <CardTitle className="flex items-center gap-4 recipe-title">
                <div className="bg-primary/10 p-3 rounded-full">
                  <span className="text-2xl warm-orange font-bold">#1</span>
                </div>
                <div>
                  <h2 className="font-recipe text-2xl font-bold">Ma Liste de Courses</h2>
                  <p className="font-sans text-muted-foreground text-base font-normal mt-1">
                    Tous mes essentiels pour cuisiner
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                {formatListeContent(liste.liste_de_course).map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="flex items-start gap-4 p-4 bg-accent/20 rounded-xl hover:bg-accent/30 transition-smooth border border-accent/30"
                  >
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0 shadow-sm"></div>
                    <span className="text-foreground font-sans text-lg leading-relaxed flex-1">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ListeDeCoursesTab;