import { Calendar, Clock, User, X } from 'lucide-react';
import { Appointment } from '../../contexts/AppDataContext';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: (id: string) => void;
}

const AppointmentCard = ({ appointment, onCancel }: AppointmentCardProps) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };
  
  const formatTime = (timeString: string) => {
    // Convert 24-hour format to 12-hour format
    const [hour, minute] = timeString.split(':');
    const hourNum = parseInt(hour);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${period}`;
  };

  return (
    <div className={`rounded-lg shadow-md p-5 relative ${
      appointment.status === 'scheduled' 
        ? 'bg-white' 
        : appointment.status === 'completed' 
          ? 'bg-green-50' 
          : 'bg-gray-50'
    }`}>
      {appointment.status === 'scheduled' && (
        <button 
          onClick={() => onCancel(appointment.id)}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Cancel appointment"
        >
          <X size={18} />
        </button>
      )}
      
      <div className="flex flex-col h-full">
        <div className="mb-3">
          <span className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
            appointment.status === 'scheduled' 
              ? 'bg-blue-100 text-blue-800' 
              : appointment.status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
          }`}>
            {appointment.status === 'scheduled' ? 'Upcoming' : 
             appointment.status === 'completed' ? 'Completed' : 'Cancelled'}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{appointment.doctor}</h3>
        <p className="text-sm text-gray-600 mb-3">{appointment.specialty}</p>
        
        <div className="mt-auto">
          <div className="flex items-center text-gray-600 mb-2">
            <Calendar size={16} className="mr-2" />
            <span>{formatDate(appointment.date)}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-2" />
            <span>{formatTime(appointment.time)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;