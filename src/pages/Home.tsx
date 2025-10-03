import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, List, BookOpen, UtensilsCrossed } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'courses',
      title: 'Liste de courses',
      description: 'Gérez vos listes de courses hebdomadaires',
      icon: ShoppingCart,
      path: '/courses',
      gradient: 'from-orange-500/10 to-red-500/10'
    },
    {
      id: 'recettes-semaine',
      title: 'Recettes de la semaine',
      description: 'Découvrez les recettes planifiées pour cette semaine',
      icon: List,
      path: '/recettes-semaine',
      gradient: 'from-green-500/10 to-emerald-500/10'
    },
    {
      id: 'toutes-recettes',
      title: 'Toutes les Recettes',
      description: 'Explorez toute votre collection de recettes',
      icon: BookOpen,
      path: '/toutes-recettes',
      gradient: 'from-blue-500/10 to-cyan-500/10'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-recipe">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <UtensilsCrossed className="w-10 h-10 sm:w-12 sm:h-12 warm-orange" />
            <h1 className="font-recipe text-4xl sm:text-5xl md:text-6xl font-bold recipe-title">
              Mon Carnet de Cuisine
            </h1>
            <UtensilsCrossed className="w-10 h-10 sm:w-12 sm:h-12 warm-orange" />
          </div>
          <p className="text-muted-foreground font-sans text-lg sm:text-xl italic max-w-2xl mx-auto">
            Bienvenue dans votre espace culinaire personnel
          </p>
          <div className="w-24 h-1 bg-gradient-primary rounded-full mx-auto mt-6"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Card
                key={section.id}
                onClick={() => navigate(section.path)}
                className={`shadow-recipe bg-gradient-card border-0 transition-smooth hover:transform hover:scale-105 hover:shadow-xl cursor-pointer group overflow-hidden relative`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
                <CardHeader className="relative z-10 pb-4 pointer-events-none">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-6 rounded-2xl group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-12 h-12 warm-orange" />
                    </div>
                  </div>
                  <CardTitle className="font-recipe text-2xl font-bold recipe-title text-center">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 pointer-events-none">
                  <CardDescription className="text-center font-sans text-base leading-relaxed">
                    {section.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Quote */}
        <div className="text-center mt-16 sm:mt-20">
          <p className="text-muted-foreground font-sans text-lg italic">
            "La cuisine est un art et tout le monde peut être un artiste"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
