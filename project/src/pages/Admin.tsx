import { useState } from 'react';
import { Shield, UserPlus, Plus, Users, Pill, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SectionHeader from '../components/common/SectionHeader';

const ADMIN_EMAIL = 'admin@immunitrack.gov.in';
const ADMIN_PASSWORD = 'admin123';

interface AdminLoginForm {
  email: string;
  password: string;
}

interface UserForm {
  name: string;
  email: string;
  password: string;
  dob: string;
  phone: string;
}

interface DoctorForm {
  id: string;
  name: string;
  specialty: string;
}

interface MedicineForm {
  name: string;
  description: string;
  price: number;
  forDisease: string;
  inStock: boolean;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const [loginForm, setLoginForm] = useState<AdminLoginForm>({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  
  const [userForm, setUserForm] = useState<UserForm>({
    name: '',
    email: '',
    password: '',
    dob: '',
    phone: '',
  });

  const [doctorForm, setDoctorForm] = useState<DoctorForm>({
    id: '',
    name: '',
    specialty: '',
  });

  const [medicineForm, setMedicineForm] = useState<MedicineForm>({
    name: '',
    description: '',
    price: 0,
    forDisease: '',
    inStock: true,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email === ADMIN_EMAIL && loginForm.password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser = {
      ...userForm,
      id: crypto.randomUUID(),
      profilePicture: `/profiles/default-${Math.floor(Math.random() * 5) + 1}.jpg`,
    };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    setUserForm({
      name: '',
      email: '',
      password: '',
      dob: '',
      phone: '',
    });
    alert('User added successfully!');
  };

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    const newDoctor = {
      ...doctorForm,
      id: crypto.randomUUID(),
    };
    localStorage.setItem('doctors', JSON.stringify([...doctors, newDoctor]));
    setDoctorForm({
      id: '',
      name: '',
      specialty: '',
    });
    alert('Doctor added successfully!');
  };

  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    const medicines = JSON.parse(localStorage.getItem('medicines') || '[]');
    const newMedicine = {
      ...medicineForm,
      id: crypto.randomUUID(),
    };
    localStorage.setItem('medicines', JSON.stringify([...medicines, newMedicine]));
    setMedicineForm({
      name: '',
      description: '',
      price: 0,
      forDisease: '',
      inStock: true,
    });
    alert('Medicine added successfully!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="flex justify-center mb-8">
            <div className="bg-white p-2 rounded-full shadow-md">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
              <p className="text-gray-600">Access the admin dashboard</p>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="input"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="input"
                  required
                />
              </div>
              
              <button type="submit" className="w-full btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <SectionHeader 
          title="Admin Dashboard" 
          description="Manage users, doctors, and medicines"
          icon={<Shield size={28} />}
        />
        <Link to="/" className="btn btn-outline">
          Back to Home
        </Link>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-6">
          <button
            onClick={() => setActiveTab('users')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>Users</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('doctors')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'doctors' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Stethoscope className="h-4 w-4 mr-2" />
              <span>Doctors</span>
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
              <Pill className="h-4 w-4 mr-2" />
              <span>Medicines</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <UserPlus className="h-5 w-5 text-primary mr-2" />
            <h2 className="text-xl font-semibold">Add New User</h2>
          </div>
          
          <form onSubmit={handleAddUser}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={userForm.password}
                  onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={userForm.dob}
                  onChange={(e) => setUserForm({ ...userForm, dob: e.target.value })}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={userForm.phone}
                  onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                  className="input"
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </button>
          </form>
        </div>
      )}

      {/* Doctors Tab */}
      {activeTab === 'doctors' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Stethoscope className="h-5 w-5 text-primary mr-2" />
            <h2 className="text-xl font-semibold">Add New Doctor</h2>
          </div>
          
          <form onSubmit={handleAddDoctor}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={doctorForm.name}
                  onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                <input
                  type="text"
                  value={doctorForm.specialty}
                  onChange={(e) => setDoctorForm({ ...doctorForm, specialty: e.target.value })}
                  className="input"
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Doctor
            </button>
          </form>
        </div>
      )}

      {/* Medicines Tab */}
      {activeTab === 'medicines' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Pill className="h-5 w-5 text-primary mr-2" />
            <h2 className="text-xl font-semibold">Add New Medicine</h2>
          </div>
          
          <form onSubmit={handleAddMedicine}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={medicineForm.name}
                  onChange={(e) => setMedicineForm({ ...medicineForm, name: e.target.value })}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={medicineForm.description}
                  onChange={(e) => setMedicineForm({ ...medicineForm, description: e.target.value })}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  value={medicineForm.price}
                  onChange={(e) => setMedicineForm({ ...medicineForm, price: Number(e.target.value) })}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">For Disease</label>
                <input
                  type="text"
                  value={medicineForm.forDisease}
                  onChange={(e) => setMedicineForm({ ...medicineForm, forDisease: e.target.value })}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                <select
                  value={medicineForm.inStock.toString()}
                  onChange={(e) => setMedicineForm({ ...medicineForm, inStock: e.target.value === 'true' })}
                  className="input"
                >
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Medicine
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;