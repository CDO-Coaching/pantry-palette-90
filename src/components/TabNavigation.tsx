import { cn } from "@/lib/utils";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const tabs = [
    { id: 'courses', label: 'Liste de courses', icon: '🛒' },
    { id: 'recettes', label: 'Recettes', icon: '👨‍🍳' }
  ];

  return (
    <div className="w-full bg-white border-b border-border shadow-sm">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-300 relative",
                "hover:text-primary hover:bg-accent/50 rounded-t-lg",
                activeTab === tab.id
                  ? "text-primary bg-gradient-to-b from-accent/30 to-transparent border-b-2 border-primary"
                  : "text-muted-foreground"
              )}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;