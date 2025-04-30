import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { v4 as uuidv4 } from 'uuid';

// Types
export interface Vaccination {
  id: string;
  userId: string;
  name: string;
  date: string;
  manufacturer: string;
  batchNumber: string;
  nextDose?: string;
}

export interface Appointment {
  id: string;
  userId: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface MedicineOrder {
  id: string;
  userId: string;
  name: string;
  quantity: number;
  price: number;
  date: string;
}

export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  forDisease: string;
  inStock: boolean;
}

interface AppDataContextType {
  vaccinations: Vaccination[];
  appointments: Appointment[];
  medicineOrders: MedicineOrder[];
  medicines: Medicine[];
  addVaccination: (vaccination: Omit<Vaccination, 'id' | 'userId'>) => void;
  removeVaccination: (id: string) => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'userId' | 'status'>) => void;
  cancelAppointment: (id: string) => void;
  orderMedicine: (medicineId: string, quantity: number) => void;
}

const AppDataContext = createContext<AppDataContextType | null>(null);

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};

interface AppDataProviderProps {
  children: ReactNode;
}

export const AppDataProvider: React.FC<AppDataProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medicineOrders, setMedicineOrders] = useState<MedicineOrder[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  // Load data from localStorage
  useEffect(() => {
    if (currentUser) {
      // Load vaccinations
      const vaccinationsJSON = localStorage.getItem('vaccinations');
      if (vaccinationsJSON) {
        const allVaccinations = JSON.parse(vaccinationsJSON);
        setVaccinations(allVaccinations.filter((v: Vaccination) => v.userId === currentUser.id));
      }

      // Load appointments
      const appointmentsJSON = localStorage.getItem('appointments');
      if (appointmentsJSON) {
        const allAppointments = JSON.parse(appointmentsJSON);
        setAppointments(allAppointments.filter((a: Appointment) => a.userId === currentUser.id));
      }

      // Load medicine orders
      const ordersJSON = localStorage.getItem('medicineOrders');
      if (ordersJSON) {
        const allOrders = JSON.parse(ordersJSON);
        setMedicineOrders(allOrders.filter((o: MedicineOrder) => o.userId === currentUser.id));
      }
    }

    // Load medicines (global for all users)
    const medicinesJSON = localStorage.getItem('medicines');
    if (medicinesJSON) {
      setMedicines(JSON.parse(medicinesJSON));
    }
  }, [currentUser]);

  const addVaccination = (vaccinationData: Omit<Vaccination, 'id' | 'userId'>) => {
    if (!currentUser) return;

    const newVaccination: Vaccination = {
      id: uuidv4(),
      userId: currentUser.id,
      ...vaccinationData,
    };

    // Update state
    const updatedVaccinations = [...vaccinations, newVaccination];
    setVaccinations(updatedVaccinations);

    // Update localStorage
    const allVaccinationsJSON = localStorage.getItem('vaccinations');
    const allVaccinations = allVaccinationsJSON ? JSON.parse(allVaccinationsJSON) : [];
    localStorage.setItem('vaccinations', JSON.stringify([...allVaccinations, newVaccination]));
  };

  const removeVaccination = (id: string) => {
    if (!currentUser) return;

    // Update state
    const updatedVaccinations = vaccinations.filter(v => v.id !== id);
    setVaccinations(updatedVaccinations);

    // Update localStorage
    const allVaccinationsJSON = localStorage.getItem('vaccinations');
    if (allVaccinationsJSON) {
      const allVaccinations = JSON.parse(allVaccinationsJSON);
      const updatedAllVaccinations = allVaccinations.filter((v: Vaccination) => v.id !== id);
      localStorage.setItem('vaccinations', JSON.stringify(updatedAllVaccinations));
    }
  };

  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'userId' | 'status'>) => {
    if (!currentUser) return;

    const newAppointment: Appointment = {
      id: uuidv4(),
      userId: currentUser.id,
      status: 'scheduled',
      ...appointmentData,
    };

    // Update state
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);

    // Update localStorage
    const allAppointmentsJSON = localStorage.getItem('appointments');
    const allAppointments = allAppointmentsJSON ? JSON.parse(allAppointmentsJSON) : [];
    localStorage.setItem('appointments', JSON.stringify([...allAppointments, newAppointment]));
  };

  const cancelAppointment = (id: string) => {
    if (!currentUser) return;

    // Update state
    const updatedAppointments = appointments.map(a => 
      a.id === id ? { ...a, status: 'cancelled' as const } : a
    );
    setAppointments(updatedAppointments);

    // Update localStorage
    const allAppointmentsJSON = localStorage.getItem('appointments');
    if (allAppointmentsJSON) {
      const allAppointments = JSON.parse(allAppointmentsJSON);
      const updatedAllAppointments = allAppointments.map((a: Appointment) => 
        a.id === id ? { ...a, status: 'cancelled' as const } : a
      );
      localStorage.setItem('appointments', JSON.stringify(updatedAllAppointments));
    }
  };

  const orderMedicine = (medicineId: string, quantity: number) => {
    if (!currentUser) return;

    const medicine = medicines.find(m => m.id === medicineId);
    if (!medicine) return;

    const newOrder: MedicineOrder = {
      id: uuidv4(),
      userId: currentUser.id,
      name: medicine.name,
      quantity,
      price: medicine.price * quantity,
      date: new Date().toISOString().split('T')[0],
    };

    // Update state
    const updatedOrders = [...medicineOrders, newOrder];
    setMedicineOrders(updatedOrders);

    // Update localStorage
    const allOrdersJSON = localStorage.getItem('medicineOrders');
    const allOrders = allOrdersJSON ? JSON.parse(allOrdersJSON) : [];
    localStorage.setItem('medicineOrders', JSON.stringify([...allOrders, newOrder]));
  };

  const value = {
    vaccinations,
    appointments,
    medicineOrders,
    medicines,
    addVaccination,
    removeVaccination,
    addAppointment,
    cancelAppointment,
    orderMedicine,
  };

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  );
};