import { Link } from 'react-router-dom';
import { Wine as Vaccine, Calendar, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';

const Home = () => {
  const reviews = [
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
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <svg 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    ));
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-orange-400 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                Your Vaccination Journey, Simplified
              </h1>
              <p className="text-white text-lg md:text-xl opacity-90 mb-8">
                Track vaccinations, schedule appointments, and stay protected with ImmuniTrack - 
                associated with the Government of India.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register" className="btn bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-6 rounded-md">
                  Get Started
                </Link>
                <Link to="/about" className="btn border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-3 px-6 rounded-md">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.pexels.com/photos/5863400/pexels-photo-5863400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Vaccination" 
                className="rounded-lg shadow-xl max-w-full h-auto"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              ImmuniTrack provides a comprehensive solution for all your vaccination and healthcare needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Vaccine className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Vaccination Tracking</h3>
              <p className="text-gray-600 mb-4">
                Keep track of all your vaccinations in one place, with detailed records and reminders for future doses.
              </p>
              <Link to="/vaccination" className="text-primary font-medium flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Telemedicine</h3>
              <p className="text-gray-600 mb-4">
                Schedule online appointments with healthcare professionals, access prescriptions, and order medicines.
              </p>
              <Link to="/telemedicine" className="text-primary font-medium flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-gray-600 mb-4">
                View vaccination trends, statistics, and insights to better understand your health status.
              </p>
              <Link to="/analytics" className="text-primary font-medium flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Users Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hear from some of our users about their experience with ImmuniTrack.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map(review => (
              <div key={review.id} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex mb-4">{renderStars(review.rating)}</div>
                <p className="text-gray-700 mb-4">"{review.comment}"</p>
                <div className="flex items-center">
                  <div className="bg-primary rounded-full h-10 w-10 flex items-center justify-center text-white font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-semibold text-gray-900">{review.name}</h4>
                    <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-3 rounded-full">
              <ShieldCheck className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Take Control of Your Healthcare?</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            Join ImmuniTrack today and experience a smarter way to manage your vaccinations and healthcare needs.
          </p>
          <Link to="/register" className="btn bg-primary hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-md">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;