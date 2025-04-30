import { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from 'recharts';
import { useAppData } from '../contexts/AppDataContext';
import SectionHeader from '../components/common/SectionHeader';

const Analytics = () => {
  const { vaccinations } = useAppData();
  const [timeframe, setTimeframe] = useState('all');
  
  // Group vaccinations by name for chart data
  const vaccinationsByType = vaccinations.reduce((acc, curr) => {
    const existingIndex = acc.findIndex(item => item.name === curr.name);
    if (existingIndex >= 0) {
      acc[existingIndex].count += 1;
    } else {
      acc.push({ name: curr.name, count: 1 });
    }
    return acc;
  }, [] as { name: string; count: number }[]);
  
  // Group by manufacturer
  const vaccinationsByManufacturer = vaccinations.reduce((acc, curr) => {
    const existingIndex = acc.findIndex(item => item.name === curr.manufacturer);
    if (existingIndex >= 0) {
      acc[existingIndex].value += 1;
    } else {
      acc.push({ name: curr.manufacturer, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);
  
  // Mock vaccination trends data
  const mockTrendsData = [
    { month: 'Jan', vaccinations: 65 },
    { month: 'Feb', vaccinations: 59 },
    { month: 'Mar', vaccinations: 80 },
    { month: 'Apr', vaccinations: 81 },
    { month: 'May', vaccinations: 56 },
    { month: 'Jun', vaccinations: 55 },
    { month: 'Jul', vaccinations: 40 },
    { month: 'Aug', vaccinations: 70 },
    { month: 'Sep', vaccinations: 90 },
    { month: 'Oct', vaccinations: 110 },
    { month: 'Nov', vaccinations: 130 },
    { month: 'Dec', vaccinations: 95 },
  ];
  
  // Filter data based on timeframe
  const filteredTrendsData = timeframe === 'last3months' 
    ? mockTrendsData.slice(-3) 
    : timeframe === 'last6months' 
      ? mockTrendsData.slice(-6) 
      : mockTrendsData;
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

  return (
    <div className="page-container">
      <SectionHeader 
        title="Analytics Dashboard" 
        description="View vaccination trends and statistics"
        icon={<BarChart3 size={28} />}
      />
      
      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center space-x-2">
        <span className="flex items-center text-gray-700 font-medium">
          <Filter size={16} className="mr-1" />
          Timeframe:
        </span>
        <button
          onClick={() => setTimeframe('all')}
          className={`btn ${timeframe === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
        >
          All Time
        </button>
        <button
          onClick={() => setTimeframe('last6months')}
          className={`btn ${timeframe === 'last6months' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
        >
          Last 6 Months
        </button>
        <button
          onClick={() => setTimeframe('last3months')}
          className={`btn ${timeframe === 'last3months' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
        >
          Last 3 Months
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vaccination Trends */}
        <div className="card">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Vaccination Trends</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="vaccinations" name="Vaccinations" fill="#FF9933" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Vaccinations by Manufacturer */}
        <div className="card">
          <div className="flex items-center mb-4">
            <PieChart className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Vaccinations by Manufacturer</h3>
          </div>
          <div className="h-80">
            {vaccinationsByManufacturer.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={vaccinationsByManufacturer}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {vaccinationsByManufacturer.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPie>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Vaccination Distribution */}
      <div className="card mt-6">
        <div className="flex items-center mb-4">
          <BarChart3 className="h-5 w-5 text-purple-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Your Vaccination Distribution</h3>
        </div>
        <div className="h-80">
          {vaccinationsByType.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vaccinationsByType} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Count" fill="#138808" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No vaccination records available</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-primary bg-opacity-10 p-4 rounded-lg border border-primary border-opacity-20">
          <h4 className="text-primary font-medium mb-1">Total Vaccinations</h4>
          <p className="text-2xl font-bold text-gray-800">{vaccinations.length}</p>
        </div>
        
        <div className="bg-green-100 p-4 rounded-lg border border-green-200">
          <h4 className="text-green-700 font-medium mb-1">Vaccination Types</h4>
          <p className="text-2xl font-bold text-gray-800">{vaccinationsByType.length}</p>
        </div>
        
        <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
          <h4 className="text-blue-700 font-medium mb-1">Manufacturers</h4>
          <p className="text-2xl font-bold text-gray-800">{vaccinationsByManufacturer.length}</p>
        </div>
        
        <div className="bg-purple-100 p-4 rounded-lg border border-purple-200">
          <h4 className="text-purple-700 font-medium mb-1">Vaccination Rate</h4>
          <p className="text-2xl font-bold text-gray-800">92%</p>
          <p className="text-xs text-gray-600">Compared to national average</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;