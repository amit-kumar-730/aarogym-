import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useTranslation } from '../hooks/useTranslation';
import { 
  Users, 
  Calendar, 
  Activity, 
  FileText, 
  QrCode, 
  Bell, 
  Settings,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Heart,
  Stethoscope,
  Pill,
  AlertTriangle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Patient {
  id: string;
  name: string;
  migrantId: string;
  age: number;
  gender: string;
  phone: string;
  lastVisit: string;
  healthStatus: 'healthy' | 'at-risk' | 'critical';
  photo: string;
}

interface Appointment {
  id: string;
  patientName: string;
  migrantId: string;
  date: string;
  time: string;
  type: 'checkup' | 'consultation' | 'emergency';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  doctor: string;
  department: string;
}

const HospitalDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);

  // Mock data
  const hospitalStats = {
    totalPatients: 1245,
    todayAppointments: 28,
    pendingApprovals: 5,
    completedToday: 15,
    rating: 4.6,
    reviews: 234
  };

  const patients: Patient[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      migrantId: 'KL-MIG-2025-001',
      age: 32,
      gender: 'Male',
      phone: '+91 9876543210',
      lastVisit: '2025-01-15',
      healthStatus: 'healthy',
      photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      migrantId: 'KL-MIG-2025-002',
      age: 28,
      gender: 'Female',
      phone: '+91 9876543211',
      lastVisit: '2025-01-14',
      healthStatus: 'at-risk',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVoeNpdx4rQ-H7nREwN5l49KP3kUM0_C4VaA&s'
    },
    {
      id: '3',
      name: 'Mohammed Ali',
      migrantId: 'KL-MIG-2025-003',
      age: 35,
      gender: 'Male',
      phone: '+91 9876543212',
      lastVisit: '2025-01-13',
      healthStatus: 'healthy',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-enEnFe6PrWjMekcy7CIFnKdjs-kSZ5Mg01bt7UgJTy0J0IYYbf_FHX8&s'
    }
  ];

  const appointments: Appointment[] = [
    {
      id: '1',
      patientName: 'Rajesh Kumar',
      migrantId: 'KL-MIG-2025-001',
      date: '2025-01-16',
      time: '10:00 AM',
      type: 'checkup',
      status: 'scheduled',
      doctor: 'Dr. Priya Nair',
      department: 'General Medicine'
    },
    {
      id: '2',
      patientName: 'Priya Sharma',
      migrantId: 'KL-MIG-2025-002',
      date: '2025-01-16',
      time: '11:30 AM',
      type: 'consultation',
      status: 'scheduled',
      doctor: 'Dr. Suresh Menon',
      department: 'Cardiology'
    },
    {
      id: '3',
      patientName: 'Mohammed Ali',
      migrantId: 'KL-MIG-2025-003',
      date: '2025-01-15',
      time: '2:00 PM',
      type: 'checkup',
      status: 'completed',
      doctor: 'Dr. Anjali Krishnan',
      department: 'General Medicine'
    }
  ];

  const monthlyData = [
    { month: 'Jan', patients: 120, appointments: 180 },
    { month: 'Feb', patients: 135, appointments: 195 },
    { month: 'Mar', patients: 148, appointments: 210 },
    { month: 'Apr', patients: 162, appointments: 225 },
    { month: 'May', patients: 175, appointments: 240 },
    { month: 'Jun', patients: 188, appointments: 255 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': case 'completed': case 'scheduled': return 'text-green-600 bg-green-100';
      case 'at-risk': case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'critical': case 'cancelled': case 'no-show': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Patients</p>
              <p className="text-2xl font-bold text-emerald-600">{hospitalStats.totalPatients}</p>
            </div>
            <Users className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Today's Appointments</p>
              <p className="text-2xl font-bold text-blue-600">{hospitalStats.todayAppointments}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Completed Today</p>
              <p className="text-2xl font-bold text-green-600">{hospitalStats.completedToday}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Pending Approvals</p>
              <p className="text-2xl font-bold text-yellow-600">{hospitalStats.pendingApprovals}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Hospital Rating</p>
              <p className="text-2xl font-bold text-purple-600">{hospitalStats.rating}</p>
            </div>
            <Star className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Reviews</p>
              <p className="text-2xl font-bold text-indigo-600">{hospitalStats.reviews}</p>
            </div>
            <Heart className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="patients" fill="#059669" name="New Patients" />
              <Bar dataKey="appointments" fill="#0284c7" name="Appointments" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Patient Growth Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="patients" stroke="#059669" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Appointments</h3>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 smooth-transition flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Appointment</span>
          </button>
        </div>
        <div className="space-y-4">
          {appointments.filter(a => a.date === '2025-01-16').map((appointment) => (
            <div key={appointment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{appointment.patientName}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">ID: {appointment.migrantId}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>{appointment.time}</span>
                    <span>{appointment.doctor}</span>
                    <span>{appointment.department}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Patient Records</h3>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 smooth-transition flex items-center space-x-2">
            <QrCode className="w-4 h-4" />
            <span>Scan QR</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={patient.photo}
                alt={patient.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-emerald-100"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{patient.name}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">ID: {patient.migrantId}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.healthStatus)}`}>
                  {patient.healthStatus}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Age:</span>
                <span className="font-medium">{patient.age} years</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Gender:</span>
                <span className="font-medium">{patient.gender}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last Visit:</span>
                <span className="font-medium">{patient.lastVisit}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 smooth-transition flex items-center justify-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
              <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 smooth-transition flex items-center justify-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'patients', name: 'Patients', icon: Users },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'records', name: 'Records', icon: FileText },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hospital Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage patient records and appointments</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/20 px-4 py-2 rounded-lg">
                <Stethoscope className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  Amrita Institute of Medical Sciences
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap smooth-transition ${
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
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'patients' && renderPatients()}
          {activeTab === 'appointments' && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Appointments Management</h3>
              <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
            </div>
          )}
          {activeTab === 'records' && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Medical Records</h3>
              <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Hospital Settings</h3>
              <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HospitalDashboard;