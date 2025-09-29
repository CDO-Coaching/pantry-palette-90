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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            🛒 Mes Listes de Courses
          </h1>
          <p className="text-muted-foreground">
            Toutes vos listes organisées pour faciliter vos achats
          </p>
        </div>

        {!liste ? (
          <Card className="text-center p-8 shadow-card bg-gradient-card">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Aucune liste trouvée</h3>
            <p className="text-muted-foreground">
              Votre liste de courses apparaîtra ici une fois ajoutée à la base de données.
            </p>
          </Card>
        ) : (
          <Card 
            className="shadow-card hover:shadow-soft transition-all duration-300 bg-gradient-card border-0"
          >
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-primary">
                <span className="bg-primary/10 p-2 rounded-full text-sm">#1</span>
                Ma Liste de courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {formatListeContent(liste.liste_de_course).map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground leading-relaxed">{item}</span>
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