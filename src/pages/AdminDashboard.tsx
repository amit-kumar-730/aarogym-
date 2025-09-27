import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin,
  Activity,
  Shield,
  FileText,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  BarChart3,
  PieChart,
  Calendar,
  Phone
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, Pie } from 'recharts';

interface HospitalRequest {
  id: string;
  hospitalName: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  licenseNumber: string;
  specialties: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  documents: string[];
}

interface SystemStats {
  totalMigrants: number;
  totalHospitals: number;
  activeOutbreaks: number;
  pendingRequests: number;
  healthCardsGenerated: number;
  appointmentsToday: number;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  // Mock data - in real app, this would come from API
  const systemStats: SystemStats = {
    totalMigrants: 45678,
    totalHospitals: 234,
    activeOutbreaks: 12,
    pendingRequests: 8,
    healthCardsGenerated: 42156,
    appointmentsToday: 156
  };

  const hospitalRequests: HospitalRequest[] = [
    {
      id: '1',
      hospitalName: 'Sunrise Medical Center',
      contactPerson: 'Dr. Rajesh Kumar',
      email: 'admin@sunrisemedical.com',
      phone: '+91 484 2345678',
      location: 'Kochi, Ernakulam',
      licenseNumber: 'KL-HOSP-2025-001',
      specialties: ['General Medicine', 'Cardiology', 'Pediatrics'],
      status: 'pending',
      submittedDate: '2025-01-15',
      documents: ['license.pdf', 'registration.pdf', 'accreditation.pdf']
    },
    {
      id: '2',
      hospitalName: 'Green Valley Hospital',
      contactPerson: 'Dr. Priya Nair',
      email: 'contact@greenvalley.com',
      phone: '+91 471 9876543',
      location: 'Thiruvananthapuram',
      licenseNumber: 'KL-HOSP-2025-002',
      specialties: ['Orthopedics', 'Neurology', 'Emergency Care'],
      status: 'pending',
      submittedDate: '2025-01-14',
      documents: ['license.pdf', 'infrastructure.pdf']
    }
  ];

  const migrantRegistrationData = [
    { month: 'Jan', registrations: 3200 },
    { month: 'Feb', registrations: 2800 },
    { month: 'Mar', registrations: 4100 },
    { month: 'Apr', registrations: 3600 },
    { month: 'May', registrations: 4800 },
    { month: 'Jun', registrations: 5200 }
  ];

  const outbreakData = [
    { name: 'Dengue', value: 45, color: '#ef4444' },
    { name: 'Chikungunya', value: 23, color: '#f59e0b' },
    { name: 'H1N1', value: 12, color: '#3b82f6' },
    { name: 'Malaria', value: 8, color: '#8b5cf6' }
  ];

  const districtData = [
    { district: 'Ernakulam', migrants: 8500, hospitals: 45 },
    { district: 'Thiruvananthapuram', migrants: 7200, hospitals: 38 },
    { district: 'Kozhikode', migrants: 6800, hospitals: 32 },
    { district: 'Thrissur', migrants: 5900, hospitals: 28 },
    { district: 'Kollam', migrants: 4200, hospitals: 22 }
  ];

  const handleApproveRequest = (requestId: string) => {
    console.log('Approving request:', requestId);
    // API call to approve hospital request
  };

  const handleRejectRequest = (requestId: string) => {
    console.log('Rejecting request:', requestId);
    // API call to reject hospital request
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Migrants</p>
              <p className="text-2xl font-bold text-emerald-600">{systemStats.totalMigrants.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Hospitals</p>
              <p className="text-2xl font-bold text-blue-600">{systemStats.totalHospitals}</p>
            </div>
            <Building className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Outbreaks</p>
              <p className="text-2xl font-bold text-red-600">{systemStats.activeOutbreaks}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Requests</p>
              <p className="text-2xl font-bold text-yellow-600">{systemStats.pendingRequests}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Health Cards</p>
              <p className="text-2xl font-bold text-purple-600">{systemStats.healthCardsGenerated.toLocaleString()}</p>
            </div>
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Today's Appointments</p>
              <p className="text-2xl font-bold text-indigo-600">{systemStats.appointmentsToday}</p>
            </div>
            <Calendar className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Migrant Registrations Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Registrations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={migrantRegistrationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="registrations" fill="#059669" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Outbreak Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Disease Outbreaks</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={outbreakData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {outbreakData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* District-wise Data */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">District-wise Statistics</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">District</th>
                <th className="text-left py-3 px-4">Migrants</th>
                <th className="text-left py-3 px-4">Hospitals</th>
                <th className="text-left py-3 px-4">Coverage</th>
              </tr>
            </thead>
            <tbody>
              {districtData.map((district) => (
                <tr key={district.district} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">{district.district}</td>
                  <td className="py-3 px-4">{district.migrants.toLocaleString()}</td>
                  <td className="py-3 px-4">{district.hospitals}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full" 
                          style={{ width: `${Math.min((district.hospitals / district.migrants) * 10000, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {Math.round((district.hospitals / district.migrants) * 10000)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderHospitalRequests = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Hospital Registration Requests</h3>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search requests..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all duration-200 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {hospitalRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 hover:scale-105"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{request.hospitalName}</h4>
                  <p className="text-gray-600">{request.contactPerson}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  request.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {request.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{request.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{request.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>License: {request.licenseNumber}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {request.specialties.map((specialty, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 mb-2">Documents:</p>
                <div className="space-y-1">
                  {request.documents.map((doc, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <FileText className="w-3 h-3" />
                      <span>{doc}</span>
                      <button className="text-blue-600 hover:text-blue-700">
                        <Eye className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleApproveRequest(request.id)}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleRejectRequest(request.id)}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'hospital-requests', name: 'Hospital Requests', icon: Building },
    { id: 'migrants', name: 'Migrants', icon: Users },
    { id: 'outbreaks', name: 'Outbreaks', icon: AlertTriangle },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage the Aarogyam health system</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-emerald-100 px-4 py-2 rounded-lg">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">
                  System Status: Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-opacity duration-300 ${activeTab ? 'opacity-100' : 'opacity-0'}`}>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'hospital-requests' && renderHospitalRequests()}
          {activeTab === 'migrants' && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Migrants Management</h3>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          )}
          {activeTab === 'outbreaks' && (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Outbreak Management</h3>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">System Settings</h3>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;