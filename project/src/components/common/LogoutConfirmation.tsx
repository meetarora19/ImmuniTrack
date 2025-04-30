import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LogoutConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmation = ({ isOpen, onClose, onConfirm }: LogoutConfirmationProps) => {
  const { logout } = useAuth();

  if (!isOpen) return null;

  const handleConfirm = () => {
    logout();
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fade-in">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 slide-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Confirm Logout</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to logout? You will need to login again to access your account.
        </p>
        <div className="flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="btn btn-outline"
          >
            No, Cancel
          </button>
          <button 
            onClick={handleConfirm}
            className="btn btn-primary"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;