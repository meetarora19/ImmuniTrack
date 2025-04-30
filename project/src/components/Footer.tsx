import { Wine as Vaccine, Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Vaccine className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">ImmuniTrack</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted platform for vaccination management and healthcare services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/vaccination" className="text-gray-300 hover:text-white transition-colors">Vaccination</Link>
              </li>
              <li>
                <Link to="/telemedicine" className="text-gray-300 hover:text-white transition-colors">Telemedicine</Link>
              </li>
              <li>
                <Link to="/analytics" className="text-gray-300 hover:text-white transition-colors">Analytics</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-300" />
                <a href="mailto:info@immunitrack.gov.in" className="text-gray-300 hover:text-white transition-colors">
                  info@immunitrack.gov.in
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-300" />
                <a href="tel:+911234567890" className="text-gray-300 hover:text-white transition-colors">
                  +91 1234 567 890
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Associated With</h3>
            <div className="flex items-center bg-white p-3 rounded-md">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                alt="Government of India"
                className="h-12"
              />
              <div className="ml-3">
                <p className="text-navy font-semibold text-sm">Government of India</p>
                <p className="text-gray-600 text-xs">Ministry of Health & Family Welfare</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} ImmuniTrack. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;