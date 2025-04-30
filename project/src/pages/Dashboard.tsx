import { User, Clock, Calendar, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAppData } from '../contexts/AppDataContext';
import { calculateAge } from '../utils/dataInitializer';
import SectionHeader from '../components/common/SectionHeader';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { vaccinations, appointments, medicineOrders } = useAppData();
  
  if (!currentUser) return null;
  
  const age = calculateAge(currentUser.dob);
  
  const upcomingAppointments = appointments.filter(a => a.status === 'scheduled');
  const upcomingVaccinations = vaccinations.filter(v => v.nextDose && new Date(v.nextDose) > new Date());
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="page-container">
      <SectionHeader 
        title="My Dashboard" 
        description="Your personal health information and statistics"
        icon={<User size={28} />} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile */}
        <div className="lg:col-span-1">
          <div className="card mb-6">
            <div className="flex flex-col items-center">
              <img 
                src={currentUser.profilePicture} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">{currentUser.name}</h2>
              <div className="mt-4 w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Date of Birth</span>
                    <span className="font-medium">{formatDate(currentUser.dob)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Age</span>
                    <span className="font-medium">{age} years</span>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-col">
                  <span className="text-sm text-gray-500">Email</span>
                  <span className="font-medium">{currentUser.email}</span>
                </div>
                
                <div className="mt-4 flex flex-col">
                  <span className="text-sm text-gray-500">Phone</span>
                  <span className="font-medium">{currentUser.phone}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Health Statistics */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Health Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <ShieldCheck className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-blue-700">Vaccinations</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">{vaccinations.length}</p>
                <p className="text-xs text-blue-600 mt-1">Total records</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-green-700">Appointments</span>
                </div>
                <p className="text-2xl font-bold text-green-900">{upcomingAppointments.length}</p>
                <p className="text-xs text-green-600 mt-1">Upcoming</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="lg:col-span-2">
          {/* Upcoming Appointments */}
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map(appointment => (
                  <div key={appointment.id} className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{appointment.doctor}</h4>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(appointment.date)} at {appointment.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic">No upcoming appointments.</p>
            )}
          </div>
          
          {/* Medicine Orders */}
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Medicine Orders</h3>
            </div>
            
            {medicineOrders.length > 0 ? (
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
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {medicineOrders.slice(0, 3).map(order => (
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
            ) : (
              <p className="text-gray-600 italic">No medicine orders yet.</p>
            )}
          </div>
          
          {/* Upcoming Vaccinations */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Upcoming Vaccinations</h3>
              <ShieldCheck className="h-5 w-5 text-gray-400" />
            </div>
            
            {upcomingVaccinations.length > 0 ? (
              <div className="space-y-4">
                {upcomingVaccinations.map(vaccination => (
                  <div key={vaccination.id} className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{vaccination.name}</h4>
                      <p className="text-sm text-gray-600">Manufacturer: {vaccination.manufacturer}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Next Dose: {vaccination.nextDose ? formatDate(vaccination.nextDose) : 'N/A'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic">No upcoming vaccinations.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;