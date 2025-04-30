import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppDataProvider } from './contexts/AppDataContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Vaccination from './pages/Vaccination';
import Telemedicine from './pages/Telemedicine';
import Analytics from './pages/Analytics';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { initializeData } from './utils/dataInitializer';

function App() {
  useEffect(() => {
    // Initialize demo data
    initializeData();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <AppDataProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="admin" element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="vaccination" element={
                <ProtectedRoute>
                  <Vaccination />
                </ProtectedRoute>
              } />
              <Route path="telemedicine" element={
                <ProtectedRoute>
                  <Telemedicine />
                </ProtectedRoute>
              } />
              <Route path="analytics" element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AppDataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;