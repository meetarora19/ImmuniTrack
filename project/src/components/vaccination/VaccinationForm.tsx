import { useState } from 'react';
import { useAppData } from '../../contexts/AppDataContext';

interface VaccinationFormProps {
  onClose: () => void;
}

// Comprehensive vaccine suggestions data
const vaccineSuggestions = [
  'COVID-19 Covishield',
  'COVID-19 Covaxin',
  'COVID-19 Sputnik V',
  'Hepatitis A',
  'Hepatitis B',
  'BCG (Bacillus Calmette-Guérin)',
  'DPT (Diphtheria, Pertussis, Tetanus)',
  'DTaP (Diphtheria, Tetanus, acellular Pertussis)',
  'Td (Tetanus, Diphtheria)',
  'MMR (Measles, Mumps, Rubella)',
  'IPV (Inactivated Polio Vaccine)',
  'OPV (Oral Polio Vaccine)',
  'Pneumococcal Conjugate',
  'Pneumococcal Polysaccharide',
  'Rotavirus',
  'Typhoid Conjugate Vaccine',
  'HPV (Human Papillomavirus)',
  'Influenza',
  'Japanese Encephalitis',
  'Meningococcal',
  'Varicella (Chickenpox)',
  'Yellow Fever',
  'Haemophilus Influenzae Type b (Hib)',
  'Cholera',
  'Rabies'
];

const manufacturerSuggestions = [
  'Serum Institute of India',
  'Bharat Biotech',
  'Biological E Limited',
  'Panacea Biotec',
  'Sanofi India',
  'GlaxoSmithKline Pharmaceuticals',
  'Pfizer India',
  'Zydus Cadila',
  'Indian Immunologicals Limited',
  'Shantha Biotechnics',
  'Wockhardt',
  'Cipla',
  'Dr. Reddy\'s Laboratories',
  'Sun Pharmaceutical Industries',
  'Biocon',
  'Gland Pharma',
  'Intas Pharmaceuticals',
  'Abbott India',
  'MSD Pharmaceuticals',
  'AstraZeneca India'
];

const VaccinationForm = ({ onClose }: VaccinationFormProps) => {
  const { addVaccination } = useAppData();

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    manufacturer: '',
    batchNumber: '',
    nextDose: '',
  });

  const [showNameSuggestions, setShowNameSuggestions] = useState(false);
  const [showManufacturerSuggestions, setShowManufacturerSuggestions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSuggestionClick = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'name') {
      setShowNameSuggestions(false);
    } else if (field === 'manufacturer') {
      setShowManufacturerSuggestions(false);
    }
  };

  const handleClickOutside = () => {
    setTimeout(() => {
      setShowNameSuggestions(false);
      setShowManufacturerSuggestions(false);
    }, 200);
  };

  const filteredVaccineSuggestions = vaccineSuggestions.filter(vaccine =>
    vaccine.toLowerCase().includes(formData.name.toLowerCase())
  );

  const filteredManufacturerSuggestions = manufacturerSuggestions.filter(manufacturer =>
    manufacturer.toLowerCase().includes(formData.manufacturer.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.date || !formData.manufacturer || !formData.batchNumber) {
      alert('Please fill all required fields.');
      return;
    }
    
    addVaccination({
      name: formData.name,
      date: formData.date,
      manufacturer: formData.manufacturer,
      batchNumber: formData.batchNumber,
      nextDose: formData.nextDose || undefined,
    });
    
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Add New Vaccination</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Vaccine Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setShowNameSuggestions(true)}
            onBlur={handleClickOutside}
            className="input"
            placeholder="Start typing for suggestions..."
            required
          />
          {showNameSuggestions && formData.name && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredVaccineSuggestions.length > 0 ? (
                filteredVaccineSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick('name', suggestion)}
                  >
                    {suggestion}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No matches found</div>
              )}
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Vaccination Date*
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        
        <div className="mb-4 relative">
          <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 mb-1">
            Manufacturer*
          </label>
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            onFocus={() => setShowManufacturerSuggestions(true)}
            onBlur={handleClickOutside}
            className="input"
            placeholder="Start typing for suggestions..."
            required
          />
          {showManufacturerSuggestions && formData.manufacturer && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredManufacturerSuggestions.length > 0 ? (
                filteredManufacturerSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick('manufacturer', suggestion)}
                  >
                    {suggestion}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No matches found</div>
              )}
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="batchNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Batch Number*
          </label>
          <input
            type="text"
            id="batchNumber"
            name="batchNumber"
            value={formData.batchNumber}
            onChange={handleChange}
            className="input"
            placeholder="Enter batch number"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="nextDose" className="block text-sm font-medium text-gray-700 mb-1">
            Next Dose Date (if applicable)
          </label>
          <input
            type="date"
            id="nextDose"
            name="nextDose"
            value={formData.nextDose}
            onChange={handleChange}
            className="input"
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Add Vaccination
          </button>
        </div>
      </form>
    </div>
  );
};

export default VaccinationForm;