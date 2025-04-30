import { useState } from 'react';
import { Calendar, Plus, Clock, ShoppingBag } from 'lucide-react';
import { useAppData } from '../contexts/AppDataContext';
import SectionHeader from '../components/common/SectionHeader';
import AppointmentCard from '../components/telemedicine/AppointmentCard';
import AppointmentForm from '../components/telemedicine/AppointmentForm';
import MedicineCard from '../components/telemedicine/MedicineCard';

const Telemedicine = () => {
  const { appointments, cancelAppointment, medicines, orderMedicine, medicineOrders } = useAppData();
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [activeTab, setActiveTab] = useState('appointments');

  const upcomingAppointments = appointments.filter(a => a.status === 'scheduled');
  const pastAppointments = appointments.filter(a => a.status !== 'scheduled');

  const toggleAppointmentForm = () => {
    setShowAppointmentForm(!showAppointmentForm);
  };

  const handleCancelAppointment = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      cancelAppointment(id);
    }
  };

  const handleOrderMedicine = (medicineId: string, quantity: number) => {
    orderMedicine(medicineId, quantity);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="page-container">
      <SectionHeader 
        title="Telemedicine Services" 
        description="Schedule appointments and order medicines online"
        icon={<Calendar size={28} />}
      />
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-6">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'appointments' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Appointments</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('medicines')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'medicines' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <ShoppingBag className="h-4 w-4 mr-2" />
              <span>Medicines</span>
            </div>
          </button>
        </nav>
      </div>
      
      {/* Appointments Tab */}
      {activeTab === 'appointments' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">My Appointments</h2>
            <button
              onClick={toggleAppointmentForm}
              className="btn btn-primary flex items-center"
            >
              <Plus size={16} className="mr-1" />
              Schedule Appointment
            </button>
          </div>
          
          {showAppointmentForm && (
            <div className="mb-6">
              <AppointmentForm onClose={toggleAppointmentForm} />
            </div>
          )}
          
          {upcomingAppointments.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                Upcoming Appointments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingAppointments.map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onCancel={handleCancelAppointment}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Medicine Orders */}
          {medicineOrders.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2 text-green-500" />
                Medicine Orders
              </h3>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Medicine
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {medicineOrders.map(order => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{order.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{order.quantity}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">₹{order.price.toFixed(2)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{formatDate(order.date)}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {pastAppointments.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Past Appointments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastAppointments.map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onCancel={handleCancelAppointment}
                  />
                ))}
              </div>
            </div>
          )}
          
          {appointments.length === 0 && (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No Appointments</h3>
              <p className="text-gray-600 mb-4">
                You haven't scheduled any appointments yet. Click the button below to schedule your first appointment.
              </p>
              <button
                onClick={toggleAppointmentForm}
                className="btn btn-primary flex items-center mx-auto"
              >
                <Plus size={16} className="mr-1" />
                Schedule Appointment
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Medicines Tab */}
      {activeTab === 'medicines' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Online Pharmacy</h2>
            <p className="text-gray-600">
              Browse and order medicines online. All orders will be delivered to your registered address.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicines.map(medicine => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                onOrder={handleOrderMedicine}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Telemedicine;