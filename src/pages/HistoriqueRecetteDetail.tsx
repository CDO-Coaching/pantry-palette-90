import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase, HistoriqueRecette } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ChefHat } from 'lucide-react';

const HistoriqueRecetteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recette, setRecette] = useState<HistoriqueRecette | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchRecette();
    }
  }, [id]);

  const fetchRecette = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('historique_recette')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!data) {
        toast({
          title: "Recette introuvable",
          description: "Cette recette n'existe pas",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      setRecette(data);
    } catch (error) {
      console.error('Erreur lors du chargement de la recette:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la recette",
        variant: "destructive",
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-recipe">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
          <Skeleton className="h-10 w-32 mb-6" />
          <Card className="shadow-recipe bg-gradient-card border-0">
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!recette) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-recipe">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="mb-6 shadow-sm hover:shadow-md transition-smooth"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>

        <Card className="shadow-recipe bg-gradient-card border-0">
          <CardHeader className="bg-accent/10 border-b border-border/20 pb-6">
            <CardTitle className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                <ChefHat className="w-6 h-6 warm-orange" />
              </div>
              <h1 className="font-recipe text-2xl sm:text-3xl font-bold recipe-title leading-tight break-words overflow-wrap-anywhere min-w-0 flex-1">
                {recette.nom}
              </h1>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <div className="prose prose-sm sm:prose-base max-w-none">
              <div className="font-sans text-base sm:text-lg leading-relaxed whitespace-pre-wrap break-words">
                {recette.recette}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HistoriqueRecetteDetail;
