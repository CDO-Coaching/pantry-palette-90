import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ListeDeCoursesTab from '@/components/ListeDeCoursesTab';

const CoursesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-recipe">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="mb-6 shadow-sm hover:shadow-md transition-smooth"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </Button>
        <ListeDeCoursesTab />
      </div>
    </div>
  );
};

export default CoursesPage;
