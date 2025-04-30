import { Calendar, Tag, ChevronRight, Trash2 } from 'lucide-react';
import { Vaccination } from '../../contexts/AppDataContext';

interface VaccinationCardProps {
  vaccination: Vaccination;
  onRemove: (id: string) => void;
}

const VaccinationCard = ({ vaccination, onRemove }: VaccinationCardProps) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{vaccination.name}</h3>
        <button 
          onClick={() => onRemove(vaccination.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove vaccination"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <div className="flex items-center mt-3 text-gray-600">
        <Calendar size={16} className="mr-2" />
        <span>{formatDate(vaccination.date)}</span>
      </div>
      
      <div className="flex items-center mt-2 text-gray-600">
        <Tag size={16} className="mr-2" />
        <span>Batch: {vaccination.batchNumber}</span>
      </div>
      
      <div className="mt-3 text-sm text-gray-500">
        Manufacturer: {vaccination.manufacturer}
      </div>
      
      {vaccination.nextDose && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Next dose:
              <span className="font-medium ml-1">{formatDate(vaccination.nextDose)}</span>
            </div>
            <ChevronRight size={16} className="text-primary" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VaccinationCard;