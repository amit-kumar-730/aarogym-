import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { useTranslation } from '../../hooks/useTranslation';
import { MigrantHealthReport } from '../migrantRecord-Dashboard/ui/migrant-health-report';
import HospitalMap from '../HospitalMap';

import { 
  ClipboardPlus,
  User, 
  Heart, 
  Calendar, 
  MapPin, 
  QrCode, 
  Bell, 
  Activity, 
  Shield, 
  Phone, 
  Mail,
  Edit,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Plus,
  FileText,
  Camera,
  Settings,
  LogOut,
  Stethoscope,
  Pill,
  Thermometer,
  TrendingUp
} from 'lucide-react';

interface HealthMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  lastUpdated: string;
}

interface Appointment {
  id: string;
  hospitalName: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: 'checkup' | 'consultation' | 'emergency';
}

interface Vaccination {
  id: string;
  vaccine: string;
  date: string;
  nextDue?: string;
  status: 'completed' | 'pending' | 'overdue';
  hospital: string;
}

const MigrantDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);
  const { profile } = useSelector((state: RootState) => state.migrants);

  // Mock data - in real app, this would come from API
  const healthMetrics: HealthMetric[] = [
    { id: '1', name: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal', lastUpdated: '2025-01-15' },
    { id: '2', name: 'Heart Rate', value: '72', unit: 'bpm', status: 'normal', lastUpdated: '2025-01-15' },
    { id: '3', name: 'Temperature', value: '98.6', unit: '°F', status: 'normal', lastUpdated: '2025-01-15' },
    { id: '4', name: 'Weight', value: '70', unit: 'kg', status: 'normal', lastUpdated: '2025-01-10' },
  ];

  const appointments: Appointment[] = [
    {
      id: '1',
      hospitalName: 'Amrita Institute of Medical Sciences',
      doctorName: 'Dr. Rajesh Kumar',
      specialty: 'General Medicine',
      date: '2025-01-20',
      time: '10:00 AM',
      status: 'upcoming',
      type: 'checkup'
    },
    {
      id: '2',
      hospitalName: 'Aster Medcity',
      doctorName: 'Dr. Priya Nair',
      specialty: 'Cardiology',
      date: '2025-01-18',
      time: '2:30 PM',
      status: 'completed',
      type: 'consultation'
    },
    {
      id: '3',
      hospitalName: 'KIMSHEALTH',
      doctorName: 'Dr. Suresh Menon',
      specialty: 'Orthopedics',
      date: '2025-01-25',
      time: '11:15 AM',
      status: 'upcoming',
      type: 'consultation'
    }
  ];

  const vaccinations: Vaccination[] = [
    { id: '1', vaccine: 'COVID-19 Booster', date: '2024-12-15', status: 'completed', hospital: 'Amrita Institute' },
    { id: '2', vaccine: 'Hepatitis B', date: '2024-11-20', status: 'completed', hospital: 'Aster Medcity' },
    { id: '3', vaccine: 'Influenza', date: '2025-01-30', status: 'pending', hospital: 'KIMSHEALTH' },
    { id: '4', vaccine: 'Tetanus', date: '2024-10-05', nextDue: '2034-10-05', status: 'completed', hospital: 'KIMSHEALTH' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': case 'completed': case 'upcoming': return 'text-green-600 bg-green-100';
      case 'warning': case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'critical': case 'overdue': case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMetricIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'blood pressure': return Heart;
      case 'heart rate': return Activity;
      case 'temperature': return Thermometer;
      case 'weight': return TrendingUp;
      default: return Stethoscope;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'User'}!</h2>
            <p className="text-emerald-100">Your health is our priority. Stay safe and healthy.</p>
          </div>
          <div className="hidden md:block">
            <Heart className="w-16 h-16 text-white/20" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Health Score</p>
              <p className="text-2xl font-bold text-emerald-600">95%</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Appointments</p>
              <p className="text-2xl font-bold text-blue-600">{appointments.filter(a => a.status === 'upcoming').length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Vaccinations</p>
              <p className="text-2xl font-bold text-purple-600">{vaccinations.filter(v => v.status === 'completed').length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
              <Pill className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Last Checkup</p>
              <p className="text-2xl font-bold text-amber-600">5 days</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Health Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {healthMetrics.map((metric) => {
            const IconComponent = getMetricIcon(metric.name);
            return (
              <div key={metric.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className="w-5 h-5 text-gray-400" />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                    {metric.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{metric.name}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {metric.value} <span className="text-sm font-normal text-gray-500">{metric.unit}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">Updated: {metric.lastUpdated}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Appointments</h3>
          <Link
            to="/hospital-map"
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 smooth-transition flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Book New</span>
          </Link>
        </div>
        <div className="space-y-4">
          {appointments.filter(a => a.status === 'upcoming').slice(0, 3).map((appointment) => (
            <div key={appointment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{appointment.hospitalName}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{appointment.doctorName} - {appointment.specialty}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{appointment.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHealthCard = () => (
   <div className="space-y-6">
    <div className="bg-[#ebe8e741] dark:bg-gray-800 rounded-2xl shadow-lg p-6 opacity-1 relative">
      {/* 🔘 Buttons top-right corner */}
      <div className="absolute top-4 right-4 flex space-x-3">
        {/* Download PDF Button */}
        <button
          onClick={() => console.log("Download PDF logic here")}
          className="bg-[#059669] hover:bg-[#01823f] text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md transition"
        >
          Download PDF
        </button>

        {/* View QR Button */}
        <button
          onClick={() => console.log("Open QR Modal")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md transition"
        >
          View QR
        </button>
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        My Health Card
      </h3>

      {profile ? (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen-500 gap-10 font-sans opacity-1 ">
          {/* Front Side of Card */}
          <div className="w-[500px] h-[350px] rounded-xl bg-gradient-to-r from-cyan-300/40 to-orange-300/40 shadow-[0px_0px_15px_-5px_#111] grid grid-rows-[90px_auto_50px] overflow-hidden relative pr-2">
            {/* Header */}
            <header className="flex justify-between items-center px-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Government_of_Kerala_Logo.svg"
                alt="Kerala Logo"
                className="h-20"
              />
              <img src="/logo.svg" alt="Main Logo" className="w-48" />
            </header>

            {/* Body */}
            <main className="grid grid-cols-[25%_auto_25%] items-start p-3">
              {/* Profile */}
              <div className="w-24 h-[110px] overflow-hidden rounded-md">
                <img
                  src={
                    profile.photo ||
                    `https://upload.wikimedia.org/wikipedia/commons/5/5b/Government_of_Kerala_Logo.svg`
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="ml-3 relative">
                <span className="block font-bold text-base">
                  {profile.name}
                </span>
                <span className="block font-bold text-base">സുമിത് കുമാര്</span>
                <span className="block font-bold text-base">
                  DOB: {profile.dob}
                </span>
                <span className="block font-bold text-base">
                  Gender: {profile.gender}
                </span>
                <span className="block font-bold text-base">
                  Blood Group: {profile.bloodGroup}
                </span>
                <span className="block font-bold text-base  mt-2 absolute bottom-[-80px]">
                  Health ID: {profile.migrantId}
                </span>
                <img
                  src="\logo.Aro.svg"
                  alt="Watermark"
                  className="absolute top-1/2 left-1/2 h-44 opacity-20 -translate-x-1/2 -translate-y-1/2 "
                />
              </div>

              {/* QR Code */}
              <div className="text-center relative">
                <img
                  src="/pngimg.com - qr_code_PNG33 (1).png"
                  alt="QR Code"
                  className="h-34 mx-auto "
                />
                <p className="absolute bottom-[-20px] left-3 text-[11px] font-bold">
                  Scan to view Health details
                </p>
              </div>
            </main>

            {/* Footer */}
            <footer className="flex justify-center items-center font-extrabold text-xl border-t-2 border-red-500">
              <span>
                Our <span className="text-orange-600">Health</span>, Our{" "}
                <span className="text-blue-600">Future</span>
              </span>
            </footer>
          </div>

          {/* Back Side of Card */}
          <div className="w-[500px] h-[350px] rounded-xl bg-gradient-to-r from-cyan-300/40 to-orange-300/40 shadow-[0px_0px_15px_-5px_#111] grid grid-rows-[90px_auto_50px] overflow-hidden relative pr-2">
            {/* Header */}
            <header className="flex justify-between items-center px-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Government_of_Kerala_Logo.svg"
                alt="Kerala Logo"
                className="h-20"
              />
              <img src="/logo.svg" alt="Main Logo" className="w-48" />
            </header>

            {/* Body */}
            <main className="grid grid-cols-2 items-start p-3 relative">
              {/* Address English */}
              <div className="px-3 font-bold text-lg">
                <p className="m-0">Address:</p>
                <p className="text-base font-semibold">{profile.address}</p>
              </div>

              {/* Helpline */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
                <span className="text-base font-extrabold">
                  Helpline: {profile.emergencyContact.phone}
                </span>
                <img
                  src="/logo.Aro.svg"
                  alt="Watermark"
                  className="absolute left-1/2 -translate-x-1/2 -top-48 h-44 opacity-20"
                />
              </div>

              {/* Address Malayalam */}
              <div className="px-3 font-bold text-lg">
                <p className="m-0">വിലാസം :</p>
                <p className="text-base font-semibold">{profile.addressMl}</p>
              </div>
            </main>

            {/* Disclaimer */}
            <p className="absolute  text-center text-[10px] font-bold bottom-20">
              This card is for health identification and information purpose
              only. In case of emergency, Please contact the helpline below:
            </p>

            {/* Footer */}
            <footer className="flex justify-center items-center text-lg font-extrabold border-t-2 border-red-500">
              <span>ഞങ്ങളുടെ ആരോഗ്യം, ഞങ്ങളുടെ ഭാവി</span>
            </footer>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Health Card Found
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Generate your digital health card to access healthcare services
          </p>
          <Link
            to="/health-card"
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 smooth-transition inline-flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Health Card</span>
          </Link>
        </div>
      )}
    </div>
  </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">My Appointments</h3>
          <Link
            to="/hospitals"
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 smooth-transition flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Book Appointment</span>
          </Link>
        </div>
        
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{appointment.hospitalName}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{appointment.doctorName}</p>
                  <p className="text-sm text-blue-600 mb-3">{appointment.specialty}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{appointment.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time}</span>
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {appointment.status === 'upcoming' && (
                    <>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                        <AlertTriangle className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVaccinations = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Vaccination Records</h3>
        
        <div className="space-y-4">
          {vaccinations.map((vaccination) => (
            <div key={vaccination.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{vaccination.vaccine}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{vaccination.hospital}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Date: {vaccination.date}</span>
                    {vaccination.nextDue && (
                      <span>Next Due: {vaccination.nextDue}</span>
                    )}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vaccination.status)}`}>
                  {vaccination.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'health-card', name: 'Health Card', icon: QrCode },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'vaccinations', name: 'Vaccinations', icon: Pill },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            {/* Profile Section - Top Left */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={profile?.photo || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'}
                  alt={profile?.name || 'Profile'}
                  className="w-16 h-16 rounded-full object-cover border-4 border-emerald-100 dark:border-emerald-900"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {profile?.name || user?.name || 'User'}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ID: {profile?.migrantId || 'Not Generated'}
                </p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  {profile?.currentLocation || 'Location not set'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">

              {/* <Link
                to="/profile"
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 smooth-transition"
              >
                <User className="w-4 h-4" />
                <span>Health Record</span>
              </Link> */}

              <Link
                to="/migrantrecord"
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 smooth-transition"
              >
                <ClipboardPlus className="w-4 h-4" />
                <span>Health Record</span>
              </Link>
              <Link
                to="/settings"
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 smooth-transition"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Migrant Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your health records and appointments</p>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden lg:flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">95%</div>
                <div className="text-gray-500">Health Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{appointments.filter(a => a.status === 'upcoming').length}</div>
                <div className="text-gray-500">Upcoming</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{vaccinations.filter(v => v.status === 'completed').length}</div>
                <div className="text-gray-500">Vaccines</div>
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
          {activeTab === 'health-card' && renderHealthCard()}
          {activeTab === 'appointments' && renderAppointments()}
          {activeTab === 'vaccinations' && renderVaccinations()}
        </motion.div>
      </div>
    </div>
  );
};
export default MigrantDashboard;