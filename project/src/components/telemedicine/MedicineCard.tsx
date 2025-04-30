import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Medicine } from '../../contexts/AppDataContext';

interface MedicineCardProps {
  medicine: Medicine;
  onOrder: (medicineId: string, quantity: number) => void;
}

const MedicineCard = ({ medicine, onOrder }: MedicineCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    onOrder(medicine.id, quantity);
    setOrdered(true);
    
    // Reset ordered state after 3 seconds
    setTimeout(() => {
      setOrdered(false);
      setQuantity(1);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{medicine.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{medicine.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-gray-900">₹{medicine.price.toFixed(2)}</span>
          <span className="text-sm badge badge-primary">{medicine.forDisease}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md"
              disabled={ordered}
            >
              -
            </button>
            <div className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300">
              {quantity}
            </div>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md"
              disabled={ordered}
            >
              +
            </button>
          </div>
          
          <button
            onClick={handleOrder}
            disabled={ordered || !medicine.inStock}
            className={`btn ${
              ordered ? 'bg-green-500 hover:bg-green-600' : 
              medicine.inStock ? 'btn-secondary' : 'bg-gray-300 cursor-not-allowed'
            } flex items-center`}
          >
            {ordered ? (
              <>
                <Check size={16} className="mr-1" />
                Ordered
              </>
            ) : (
              <>
                <ShoppingCart size={16} className="mr-1" />
                {medicine.inStock ? 'Buy Now' : 'Out of Stock'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;