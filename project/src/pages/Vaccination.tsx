import { useState } from 'react';
import { Wine as Vaccine, Plus } from 'lucide-react';
import { useAppData } from '../contexts/AppDataContext';
import SectionHeader from '../components/common/SectionHeader';
import VaccinationCard from '../components/vaccination/VaccinationCard';
import VaccinationForm from '../components/vaccination/VaccinationForm';

const Vaccination = () => {
  const { vaccinations, removeVaccination } = useAppData();
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleRemoveVaccination = (id: string) => {
    if (window.confirm('Are you sure you want to remove this vaccination record?')) {
      removeVaccination(id);
    }
  };

  const filteredVaccinations = vaccinations.filter(vaccination => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'upcoming' && vaccination.nextDose && new Date(vaccination.nextDose) > new Date()) return true;
    if (filterStatus === 'past' && (!vaccination.nextDose || new Date(vaccination.nextDose) <= new Date())) return true;
    return false;
  });

  return (
    <div className="page-container">
      <SectionHeader 
        title="Vaccination Records" 
        description="Manage your vaccination history and upcoming doses"
        icon={<Vaccine size={28} />}
        action={
          <button
            onClick={toggleForm}
            className="btn btn-primary flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Add Vaccination
          </button>
        }
      />
      
      {/* Filter Controls */}
      <div className="mb-6 flex flex-wrap items-center space-x-2">
        <span className="text-gray-700 font-medium">Filter:</span>
        <button
          onClick={() => setFilterStatus('all')}
          className={`btn ${filterStatus === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
        >
          All Records
        </button>
        <button
          onClick={() => setFilterStatus('upcoming')}
          className={`btn ${filterStatus === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
        >
          Upcoming Doses
        </button>
        <button
          onClick={() => setFilterStatus('past')}
          className={`btn ${filterStatus === 'past' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-800'}`}
        >
          Past Vaccinations
        </button>
      </div>
      
      {showForm && (
        <div className="mb-6">
          <VaccinationForm onClose={toggleForm} />
        </div>
      )}
      
      {filteredVaccinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVaccinations.map(vaccination => (
            <VaccinationCard
              key={vaccination.id}
              vaccination={vaccination}
              onRemove={handleRemoveVaccination}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <Vaccine className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No Vaccination Records</h3>
          <p className="text-gray-600 mb-4">
            You haven't added any vaccination records yet. Click the button below to add your first record.
          </p>
          <button
            onClick={toggleForm}
            className="btn btn-primary flex items-center mx-auto"
          >
            <Plus size={16} className="mr-1" />
            Add Vaccination
          </button>
        </div>
      )}
    </div>
  );
};

export default Vaccination;