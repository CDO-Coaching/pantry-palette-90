import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RecettesTab from '@/components/RecettesTab';

const ToutesRecettesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-recipe">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="mb-6 shadow-sm hover:shadow-md transition-smooth"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </Button>
        <RecettesTab />
      </div>
    </div>
  );
};

export default ToutesRecettesPage;
