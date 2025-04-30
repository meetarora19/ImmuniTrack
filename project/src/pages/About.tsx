import { Shield, Heart, Users, CheckCircle, MapPin } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';

const About = () => {
  return (
    <div className="page-container">
      <SectionHeader 
        title="About ImmuniTrack" 
        description="Your trusted vaccination management system"
        icon={<Shield size={28} />} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              ImmuniTrack is dedicated to empowering citizens of India with a comprehensive solution for managing their vaccination records and healthcare needs. We believe that easy access to one's own health information leads to better healthcare outcomes and more informed decisions.
            </p>
            <p className="text-gray-700 mb-4">
              In partnership with the Government of India, we've created a platform that seamlessly connects individuals with healthcare providers, simplifies vaccination tracking, and provides valuable insights through analytics.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex">
                <div className="mr-4 mt-1">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Easy Record Management</h3>
                  <p className="text-gray-600 text-sm">Securely store and access your vaccination records anytime, anywhere.</p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4 mt-1">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Telemedicine Services</h3>
                  <p className="text-gray-600 text-sm">Connect with healthcare professionals without leaving your home.</p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4 mt-1">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Data Insights</h3>
                  <p className="text-gray-600 text-sm">Get personalized analytics to better understand your health status.</p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4 mt-1">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Government Integration</h3>
                  <p className="text-gray-600 text-sm">Official recognition and support from the Government of India.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Approach</h2>
            <p className="text-gray-700 mb-4">
              At ImmuniTrack, we believe in a user-centric approach to healthcare management. Our platform is designed with simplicity and efficiency in mind, ensuring that all citizens, regardless of their technical proficiency, can easily navigate and utilize our services.
            </p>
            <p className="text-gray-700">
              We prioritize data security and privacy while providing seamless access to vital health information. By integrating with government health initiatives, we ensure that our users receive accurate information and timely updates about vaccination programs and health policies.
            </p>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-center mb-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                alt="Government of India"
                className="h-24"
              />
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">Associated With</h3>
            <div className="text-center mb-4">
              <p className="font-bold text-gray-800">Government of India</p>
              <p className="text-gray-600">Ministry of Health & Family Welfare</p>
            </div>
            <p className="text-gray-700 text-sm">
              ImmuniTrack is an official partner of the Government of India's digital health initiative, helping to track and improve vaccination coverage across the nation.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-primary to-orange-500 rounded-lg shadow-md p-6 text-white">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <p>Ministry of Health & Family Welfare, Nirman Bhawan, New Delhi - 110011, India</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p>info@immunitrack.gov.in</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p>+91 1234 567 890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <Users className="h-6 w-6 text-primary mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Our Team</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="p-6">
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Dr. Rajesh Kumar" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">Dr. Rajesh Kumar</h3>
              <p className="text-primary text-center mb-3">Director</p>
              <p className="text-gray-600 text-sm text-center">
                With over 20 years of experience in public health and immunization programs, Dr. Kumar leads our strategic initiatives.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="p-6">
              <img 
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Dr. Priya Sharma" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">Dr. Priya Sharma</h3>
              <p className="text-primary text-center mb-3">Chief Medical Officer</p>
              <p className="text-gray-600 text-sm text-center">
                Specializing in infectious diseases, Dr. Sharma oversees the medical accuracy of our platform and advises on vaccination protocols.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="p-6">
              <img 
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Vikram Singh" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">Vikram Singh</h3>
              <p className="text-primary text-center mb-3">Technology Lead</p>
              <p className="text-gray-600 text-sm text-center">
                A technology visionary with a focus on healthcare solutions, Vikram leads our technical development and data security efforts.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Vision Section */}
      <div className="bg-navy text-white rounded-lg p-8 shadow-lg">
        <div className="flex items-center mb-6">
          <Heart className="h-8 w-8 text-primary mr-3" />
          <h2 className="text-3xl font-bold">Our Vision</h2>
        </div>
        <p className="text-gray-300 text-lg mb-6">
          To create a healthier India by ensuring that every citizen has access to comprehensive vaccination services and reliable healthcare information.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Universal Access</h3>
            <p className="text-gray-300">
              Making healthcare information and services accessible to all citizens, regardless of location or socioeconomic status.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Digital Empowerment</h3>
            <p className="text-gray-300">
              Leveraging technology to empower individuals to take control of their health and make informed decisions.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Preventive Healthcare</h3>
            <p className="text-gray-300">
              Promoting preventive healthcare through timely vaccinations and regular health check-ups.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;