import { cn } from "@/lib/utils";
import { BookOpen, ShoppingCart, UtensilsCrossed, List } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const tabs = [
    { id: 'courses', label: 'Liste de courses', icon: ShoppingCart },
    { id: 'vue-generale', label: 'Vue générale', icon: List },
    { id: 'recettes', label: 'Mes Recettes', icon: BookOpen }
  ];

  return (
    <div className="w-full bg-gradient-recipe border-b border-border/30 shadow-card">
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-6">
        {/* Header principal style livre de recettes */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <UtensilsCrossed className="w-8 h-8 warm-orange" />
            <h1 className="font-recipe text-4xl font-bold recipe-title">
              Mon Carnet de Cuisine
            </h1>
            <UtensilsCrossed className="w-8 h-8 warm-orange" />
          </div>
          <p className="text-muted-foreground font-sans text-lg italic">
            L'art de bien cuisiner et de bien s'organiser
          </p>
          <div className="w-20 h-0.5 bg-gradient-primary rounded-full mx-auto mt-4"></div>
        </div>

        {/* Navigation par onglets style livre vintage */}
        <div className="flex justify-center">
          <div className="inline-flex bg-card/50 p-1.5 rounded-2xl shadow-recipe border border-border/20 backdrop-blur-sm">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                 <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base font-sans font-medium transition-smooth rounded-xl",
                    "hover:transform hover:scale-105",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-recipe transform scale-105 font-semibold"
                      : "text-foreground hover:bg-accent/30 hover:text-primary"
                  )}
                >
                  <IconComponent size={20} className="sm:w-[22px] sm:h-[22px]" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden text-xs">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;