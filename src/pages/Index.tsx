import { useState } from 'react';
import TabNavigation from '@/components/TabNavigation';
import ListeDeCoursesTab from '@/components/ListeDeCoursesTab';
import RecettesTab from '@/components/RecettesTab';

const Index = () => {
  const [activeTab, setActiveTab] = useState('courses');

  return (
    <div className="min-h-screen bg-gradient-recipe">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="transition-all duration-300">
        {activeTab === 'courses' && <ListeDeCoursesTab />}
        {activeTab === 'recettes' && <RecettesTab />}
      </main>
    </div>
  );
};

export default Index;
