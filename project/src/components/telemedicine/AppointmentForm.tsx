import { useState } from 'react';
import { useAppData } from '../../contexts/AppDataContext';

interface AppointmentFormProps {
  onClose: () => void;
}

const doctors = [
  { id: '1', name: 'Dr. Sanjay Gupta', specialty: 'General Physician' },
  { id: '2', name: 'Dr. Priya Sharma', specialty: 'Pediatrician' },
  { id: '3', name: 'Dr. Rajiv Mehta', specialty: 'Cardiologist' },
  { id: '4', name: 'Dr. Anita Patel', specialty: 'Dermatologist' },
  { id: '5', name: 'Dr. Vikram Singh', specialty: 'Orthopedic Surgeon' },
];

const AppointmentForm = ({ onClose }: AppointmentFormProps) => {
  const { addAppointment } = useAppData();
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.doctorId || !formData.date || !formData.time) {
      alert('Please fill all required fields.');
      return;
    }
    
    const selectedDoctor = doctors.find(d => d.id === formData.doctorId);
    
    if (!selectedDoctor) {
      alert('Please select a valid doctor.');
      return;
    }
    
    addAppointment({
      doctor: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: formData.date,
      time: formData.time,
    });
    
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Schedule an Appointment</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700 mb-1">
            Select Doctor*
          </label>
          <select
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">-- Select a doctor --</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialty}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Appointment Date*
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={today}
            className="input"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
            Appointment Time*
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="input"
            required
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
            Schedule Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;