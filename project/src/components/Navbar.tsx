import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { PlusCircle, User, Calendar, BarChart3, Home, Menu, X, Info, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LogoutConfirmation from './common/LogoutConfirmation';

const Navbar = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="https://cdn2.iconfinder.com/data/icons/medical-icons-set-simple/512/health_sign-2-512.png" alt="ImmuniTrack Logo" className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold text-gray-900">ImmuniTrack</span>
            </Link>
            <div className="hidden md:flex md:ml-10">
              <NavLink
                to="/"
                className={({ isActive }) => 
                  `navbar-link ${isActive ? 'navbar-link-active' : 'text-gray-600 hover:text-gray-900'}`
                }
                end
              >
                <div className="flex items-center">
                  <Home className="w-4 h-4 mr-1" />
                  <span>Home</span>
                </div>
              </NavLink>
              
              {isAuthenticated && (
                <>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => 
                      `navbar-link ${isActive ? 'navbar-link-active' : 'text-gray-600 hover:text-gray-900'}`
                    }
                  >
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>Dashboard</span>
                    </div>
                  </NavLink>

                  <NavLink
                    to="/admin"
                    className={({ isActive }) => 
                      `navbar-link ${isActive ? 'navbar-link-active' : 'text-gray-600 hover:text-gray-900'}`
                    }
                  >
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-1" />
                      <span>Admin</span>
                    </div>
                  </NavLink>
                  
                  <NavLink
                    to="/vaccination"
                    className={({ isActive }) => 
                      `navbar-link ${isActive ? 'navbar-link-active' : 'text-gray-600 hover:text-gray-900'}`
                    }
                  >
                    <div className="flex items-center">
                      <PlusCircle className="w-4 h-4 mr-1" />
                      <span>Vaccination</span>
                    </div>
                  </NavLink>
                  
                  <NavLink
                    to="/telemedicine"
                    className={({ isActive }) => 
                      `navbar-link ${isActive ? 'navbar-link-active' : 'text-gray-600 hover:text-gray-900'}`
                    }
                  >
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Telemedicine</span>
                    </div>
                  </NavLink>
                  
                  <NavLink
                    to="/analytics"
                    className={({ isActive }) => 
                      `navbar-link ${isActive ? 'navbar-link-active' : 'text-gray-600 hover:text-gray-900'}`
                    }
                  >
                    <div className="flex items-center">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      <span>Analytics</span>
                    </div>
                  </NavLink>
                </>
              )}
              
              <NavLink
                to="/about"
                className={({ isActive }) => 
                  `navbar-link ${isActive ? 'navbar-link-active' : 'text-gray-600 hover:text-gray-900'}`
                }
              >
                <div className="flex items-center">
                  <Info className="w-4 h-4 mr-1" />
                  <span>About</span>
                </div>
              </NavLink>
            </div>
          </div>
          
          <div className="hidden md:flex md:items-center">
            {isAuthenticated ? (
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <img 
                    src={currentUser?.profilePicture} 
                    alt="Profile" 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">{currentUser?.name}</span>
                </div>
                <button 
                  onClick={() => setShowLogoutConfirmation(true)}
                  className="flex items-center text-gray-600 hover:text-gray-900 navbar-link"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div>
                <Link to="/login" className="btn btn-outline mr-2">Log in</Link>
                <Link to="/register" className="btn btn-primary">Sign up</Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? 'bg-blue-50 text-navy' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
              end
            >
              <div className="flex items-center">
                <Home className="w-5 h-5 mr-2" />
                <span>Home</span>
              </div>
            </NavLink>
            
            {isAuthenticated && (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? 'bg-blue-50 text-navy' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    <span>Dashboard</span>
                  </div>
                </NavLink>

                <NavLink
                  to="/admin"
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? 'bg-blue-50 text-navy' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    <span>Admin</span>
                  </div>
                </NavLink>
                
                <NavLink
                  to="/vaccination"
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? 'bg-blue-50 text-navy' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <div className="flex items-center">
                    <PlusCircle className="w-5 h-5 mr-2" />
                    <span>Vaccination</span>
                  </div>
                </NavLink>
                
                <NavLink
                  to="/telemedicine"
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? 'bg-blue-50 text-navy' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>Telemedicine</span>
                  </div>
                </NavLink>
                
                <NavLink
                  to="/analytics"
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? 'bg-blue-50 text-navy' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <div className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    <span>Analytics</span>
                  </div>
                </NavLink>
              </>
            )}
            
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? 'bg-blue-50 text-navy' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <div className="flex items-center">
                <Info className="w-5 h-5 mr-2" />
                <span>About</span>
              </div>
            </NavLink>
            
            {isAuthenticated ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3">
                  <img 
                    src={currentUser?.profilePicture} 
                    alt="Profile" 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{currentUser?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{currentUser?.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <button
                    onClick={() => {
                      setShowLogoutConfirmation(true);
                      closeMenu();
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  >
                    <div className="flex items-center">
                      <LogOut className="w-5 h-5 mr-2" />
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex flex-col space-y-2 px-3">
                  <Link 
                    to="/login" 
                    onClick={closeMenu}
                    className="block w-full text-center px-3 py-2 rounded-md text-base font-medium btn btn-outline"
                  >
                    Log in
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={closeMenu}
                    className="block w-full text-center px-3 py-2 rounded-md text-base font-medium btn btn-primary"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {showLogoutConfirmation && (
        <LogoutConfirmation 
          isOpen={showLogoutConfirmation} 
          onClose={() => setShowLogoutConfirmation(false)} 
          onConfirm={() => {
            setShowLogoutConfirmation(false);
            navigate('/login');
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;