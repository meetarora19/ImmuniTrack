import { User } from '../contexts/AuthContext';
import { Vaccination, Appointment, MedicineOrder, Medicine } from '../contexts/AppDataContext';

interface SampleDataCollection {
  users: (User & { password: string })[];
  vaccinations: Vaccination[];
  appointments: Appointment[];
  medicineOrders: MedicineOrder[];
  medicines: Medicine[];
  reviews: Array<{
    id: string;
    name: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

export const initializeData = (): void => {
  // Check if data is already initialized
  if (localStorage.getItem('dataInitialized')) return;
  
  const sampleData: SampleDataCollection = {
    users: [
      {
        id: '1',
        name: 'Raj Kumar',
        email: 'raj@example.com',
        password: 'password123',
        dob: '1990-05-15',
        phone: '+91 98765 43210',
        profilePicture: '/profiles/default-1.jpg',
      },
      {
        id: '2',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        password: 'password123',
        dob: '1992-08-21',
        phone: '+91 87654 32109',
        profilePicture: '/profiles/default-2.jpg',
      },
    ],
    vaccinations: [
      {
        id: '1',
        userId: '1',
        name: 'COVID-19 Covishield',
        date: '2023-06-15',
        manufacturer: 'Serum Institute of India',
        batchNumber: 'CVSH2023-001',
        nextDose: '2023-10-15',
      },
      {
        id: '2',
        userId: '1',
        name: 'Hepatitis B',
        date: '2022-11-10',
        manufacturer: 'Bharat Biotech',
        batchNumber: 'HEPB2022-458',
      },
      {
        id: '3',
        userId: '2',
        name: 'COVID-19 Covaxin',
        date: '2023-05-20',
        manufacturer: 'Bharat Biotech',
        batchNumber: 'COVX2023-187',
        nextDose: '2023-09-20',
      },
    ],
    appointments: [
      {
        id: '1',
        userId: '1',
        doctor: 'Dr. Sanjay Gupta',
        specialty: 'General Physician',
        date: '2023-12-10',
        time: '10:30',
        status: 'scheduled',
      },
      {
        id: '2',
        userId: '1',
        doctor: 'Dr. Amit Patel',
        specialty: 'Cardiologist',
        date: '2023-11-05',
        time: '15:45',
        status: 'completed',
      },
      {
        id: '3',
        userId: '2',
        doctor: 'Dr. Neha Singh',
        specialty: 'Pediatrician',
        date: '2023-12-15',
        time: '09:15',
        status: 'scheduled',
      },
    ],
    medicineOrders: [
      {
        id: '1',
        userId: '1',
        name: 'Paracetamol',
        quantity: 2,
        price: 120,
        date: '2023-11-01',
      },
      {
        id: '2',
        userId: '1',
        name: 'Vitamin D3',
        quantity: 1,
        price: 350,
        date: '2023-10-25',
      },
      {
        id: '3',
        userId: '2',
        name: 'Azithromycin',
        quantity: 1,
        price: 180,
        date: '2023-11-05',
      },
    ],
    medicines: [
      {
        id: '1',
        name: 'Paracetamol',
        description: 'Pain reliever and fever reducer',
        price: 60,
        forDisease: 'Fever, Pain',
        inStock: true,
      },
      {
        id: '2',
        name: 'Vitamin D3',
        description: 'Vitamin D supplement for bone health',
        price: 350,
        forDisease: 'Vitamin D Deficiency',
        inStock: true,
      },
      {
        id: '3',
        name: 'Azithromycin',
        description: 'Antibiotic used to treat bacterial infections',
        price: 180,
        forDisease: 'Bacterial Infections',
        inStock: true,
      },
      {
        id: '4',
        name: 'Insulin',
        description: 'Hormone medication used to treat high blood sugar',
        price: 650,
        forDisease: 'Diabetes',
        inStock: true,
      },
      {
        id: '5',
        name: 'Lisinopril',
        description: 'ACE inhibitor used to treat high blood pressure',
        price: 420,
        forDisease: 'Hypertension',
        inStock: true,
      },
      {
        id: '6',
        name: 'Levothyroxine',
        description: 'Thyroid hormone replacement',
        price: 280,
        forDisease: 'Hypothyroidism',
        inStock: true,
      },
      {
        id: '7',
        name: 'Metformin',
        description: 'Oral diabetes medicine to control blood sugar levels',
        price: 180,
        forDisease: 'Diabetes',
        inStock: true,
      },
      {
        id: '8',
        name: 'Omeprazole',
        description: 'Reduces stomach acid production',
        price: 240,
        forDisease: 'Acid Reflux',
        inStock: true,
      },
      {
        id: '9',
        name: 'Amlodipine',
        description: 'Calcium channel blocker for blood pressure',
        price: 320,
        forDisease: 'Hypertension',
        inStock: true,
      },
      {
        id: '10',
        name: 'Cetirizine',
        description: 'Antihistamine for allergies',
        price: 85,
        forDisease: 'Allergies',
        inStock: true,
      },
      {
        id: '11',
        name: 'Montelukast',
        description: 'Leukotriene receptor antagonist for asthma',
        price: 450,
        forDisease: 'Asthma',
        inStock: true,
      },
      {
        id: '12',
        name: 'Pantoprazole',
        description: 'Proton pump inhibitor for acid reflux',
        price: 280,
        forDisease: 'Acid Reflux',
        inStock: true,
      },
      {
        id: '13',
        name: 'Metoprolol',
        description: 'Beta blocker for heart conditions',
        price: 390,
        forDisease: 'Heart Conditions',
        inStock: true,
      },
      {
        id: '14',
        name: 'Sertraline',
        description: 'SSRI antidepressant medication',
        price: 520,
        forDisease: 'Depression',
        inStock: true,
      },
      {
        id: '15',
        name: 'Gabapentin',
        description: 'Anticonvulsant and nerve pain medication',
        price: 440,
        forDisease: 'Nerve Pain',
        inStock: true,
      }
    ],
    reviews: [
      {
        id: '1',
        name: 'Rajeev Mehta',
        rating: 5,
        comment: 'ImmuniTrack has simplified how I manage my family\'s vaccinations. The reminders are very helpful!',
        date: '2023-10-15',
      },
      {
        id: '2',
        name: 'Sunita Patel',
        rating: 4,
        comment: 'Great service. The telemedicine feature saved me a trip to the clinic. Highly recommended.',
        date: '2023-09-22',
      },
      {
        id: '3',
        name: 'Anand Kumar',
        rating: 5,
        comment: 'Very user-friendly interface. I can easily track my vaccination history and schedule appointments.',
        date: '2023-11-05',
      },
      {
        id: '4',
        name: 'Meera Singh',
        rating: 4,
        comment: 'The analytics feature helps me understand vaccination trends. Would recommend to others.',
        date: '2023-10-30',
      },
    ],
  };

  // Store all data in localStorage
  Object.entries(sampleData).forEach(([key, data]) => {
    localStorage.setItem(key, JSON.stringify(data));
  });

  // Export to CSV for user data (for demonstration)
  const usersCsv = generateUsersCsv(sampleData.users);
  localStorage.setItem('usersCsv', usersCsv);

  // Mark as initialized
  localStorage.setItem('dataInitialized', 'true');
};

// Function to generate CSV data for users
function generateUsersCsv(users: (User & { password: string })[]): string {
  const headers = 'ID,Name,Email,Date of Birth,Phone\n';
  const rows = users.map(user => {
    return `${user.id},"${user.name}","${user.email}","${user.dob}","${user.phone}"`;
  }).join('\n');
  
  return headers + rows;
}

// Utility to get user age from DOB
export const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Create folder for profile images
export const createProfileImagesFolder = (): void => {
  // In a real environment, we would create folders for profile images
  // Since we're in a web environment, we'll just simulate this
  console.log('Profile images folder created');
};