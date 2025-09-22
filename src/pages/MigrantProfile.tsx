import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Camera, 
  Edit3, 
  Save, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Heart,
  Shield,
  FileText,
  Download,
  QrCode,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Home,
  Briefcase,
  Globe
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const MigrantProfile: React.FC = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [profilePhoto, setProfilePhoto] = useState('https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150');

  const [profileData, setProfileData] = useState({
    // Personal Information
    name: 'Rajesh Kumar',
    nameEnglish: 'സുമിത് കുമാര്',
    migrantId: 'KL-MIG-2025-001',
    dateOfBirth: '12/09/1997',
    gender: 'Male',
    bloodGroup: 'B+',
    maritalStatus: 'Married',
    
    // Contact Information
    phone: '+91 9876543210',
    email: 'ram.kumar@email.com',
    emergencyContact: '+91 9876543211',
    emergencyContactName: 'Sita Kumar',
    emergencyRelation: 'Wife',
    
    // Address Information
    currentAddress: 'Room 12, Workers Hostel, Kakkanad, Kochi, Kerala - 682030',
    permanentAddress: 'Village Rampur, District Sitapur, Uttar Pradesh - 261001',
    currentState: 'Kerala',
    permanentState: 'Uttar Pradesh',
    
    // Work Information
    occupation: 'Construction Worker',
    employer: 'Kerala Construction Company Ltd.',
    workLocation: 'Kochi Metro Project Site',
    workPermitNumber: 'WP2024001234',
    workPermitExpiry: '2025-06-15',
    
    // Health Information
    height: '170',
    weight: '65',
    allergies: 'None',
    chronicDiseases: 'None',
    medications: 'None',
    lastCheckup: '2024-01-15',
    
    // Language Preferences
    primaryLanguage: 'Hindi',
    secondaryLanguage: 'English',
    canSpeak: ['Hindi', 'English', 'Basic Malayalam']
  });

  const healthMetrics = [
    { label: 'Blood Pressure', value: '120/80', status: 'normal', icon: Heart },
    { label: 'Heart Rate', value: '72 bpm', status: 'normal', icon: Heart },
    { label: 'BMI', value: '22.5', status: 'normal', icon: User },
    { label: 'Last Checkup', value: '15 Jan 2024', status: 'recent', icon: Calendar }
  ];

  const vaccinations = [
    { name: 'COVID-19 (Dose 1)', date: '2021-05-15', status: 'completed', hospital: 'PHC Kakkanad' },
    { name: 'COVID-19 (Dose 2)', date: '2021-08-20', status: 'completed', hospital: 'PHC Kakkanad' },
    { name: 'COVID-19 (Booster)', date: '2022-02-10', status: 'completed', hospital: 'PHC Kakkanad' },
    { name: 'Hepatitis B', date: '2023-03-15', status: 'completed', hospital: 'Aster Medcity' },
    { name: 'Tetanus', date: '2023-06-20', status: 'completed', hospital: 'KIMSHEALTH' }
  ];

  const documents = [
    { name: 'Aadhaar Card', status: 'verified', uploadDate: '2024-01-10' },
    { name: 'Work Permit', status: 'verified', uploadDate: '2024-01-10' },
    { name: 'Health Certificate', status: 'verified', uploadDate: '2024-01-15' },
    { name: 'Address Proof', status: 'pending', uploadDate: '2024-01-20' }
  ];

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'health', label: 'Health Records', icon: Heart },
    { id: 'work', label: 'Work Details', icon: Briefcase },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'emergency', label: 'Emergency', icon: AlertCircle }
  ];

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save profile data
    console.log('Profile saved:', profileData);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'verified':
      case 'normal':
      case 'recent':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'pending':
      case 'overdue':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'expired':
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Profile Photo Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <img
            src={profilePhoto}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors duration-200">
              <Camera className="h-4 w-4" />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profileData.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">{profileData.nameEnglish}</p>
          <p className="text-sm text-blue-600 dark:text-blue-400">ID: {profileData.migrantId}</p>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name (Hindi)
          </label>
          {isEditing ? (
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <p className="text-gray-900 dark:text-white font-medium">{profileData.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name (English)
          </label>
          {isEditing ? (
            <input
              type="text"
              value={profileData.nameEnglish}
              onChange={(e) => handleInputChange('nameEnglish', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <p className="text-gray-900 dark:text-white font-medium">{profileData.nameEnglish}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date of Birth
          </label>
          {isEditing ? (
            <input
              type="date"
              value={profileData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <p className="text-gray-900 dark:text-white font-medium">
              {new Date(profileData.dateOfBirth).toLocaleDateString('en-IN')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gender
          </label>
          {isEditing ? (
            <select
              value={profileData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-gray-900 dark:text-white font-medium">{profileData.gender}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Blood Group
          </label>
          {isEditing ? (
            <select
              value={profileData.bloodGroup}
              onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          ) : (
            <p className="text-gray-900 dark:text-white font-medium">{profileData.bloodGroup}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Marital Status
          </label>
          {isEditing ? (
            <select
              value={profileData.maritalStatus}
              onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          ) : (
            <p className="text-gray-900 dark:text-white font-medium">{profileData.maritalStatus}</p>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <p className="text-gray-900 dark:text-white font-medium">{profileData.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <p className="text-gray-900 dark:text-white font-medium">{profileData.email}</p>
            )}
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Address Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Address (Kerala)
            </label>
            {isEditing ? (
              <textarea
                value={profileData.currentAddress}
                onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <p className="text-gray-900 dark:text-white font-medium">{profileData.currentAddress}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Permanent Address (Home State)
            </label>
            {isEditing ? (
              <textarea
                value={profileData.permanentAddress}
                onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <p className="text-gray-900 dark:text-white font-medium">{profileData.permanentAddress}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderHealthRecords = () => (
    <div className="space-y-6">
      {/* Health Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Health Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {healthMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{metric.value}</p>
                  </div>
                </div>
                <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${getStatusColor(metric.status)}`}>
                  {metric.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Physical Information */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Physical Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Height (cm)
            </label>
            {isEditing ? (
              <input
                type="number"
                value={profileData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <p className="text-gray-900 dark:text-white font-medium">{profileData.height} cm</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight (kg)
            </label>
            {isEditing ? (
              <input
                type="number"
                value={profileData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <p className="text-gray-900 dark:text-white font-medium">{profileData.weight} kg</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              BMI
            </label>
            <p className="text-gray-900 dark:text-white font-medium">
              {((parseFloat(profileData.weight) / Math.pow(parseFloat(profileData.height) / 100, 2))).toFixed(1)}
            </p>
          </div>
        </div>
      </div>

      {/* Medical History */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Medical History</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Allergies
            </label>
            {isEditing ? (
              <textarea
                value={profileData.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="List any allergies..."
              />
            ) : (
              <p className="text-gray-900 dark:text-white font-medium">{profileData.allergies}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Chronic Diseases
            </label>
            {isEditing ? (
              <textarea
                value={profileData.chronicDiseases}
                onChange={(e) => handleInputChange('chronicDiseases', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="List any chronic diseases..."
              />
            ) : (
              <p className="text-gray-900 dark:text-white font-medium">{profileData.chronicDiseases}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Medications
            </label>
            {isEditing ? (
              <textarea
                value={profileData.medications}
                onChange={(e) => handleInputChange('medications', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="List current medications..."
              />
            ) : (
              <p className="text-gray-900 dark:text-white font-medium">{profileData.medications}</p>
            )}
          </div>
        </div>
      </div>

      {/* Vaccination Records */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Vaccination Records</h3>
        <div className="space-y-3">
          {vaccinations.map((vaccine, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{vaccine.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(vaccine.date).toLocaleDateString('en-IN')} • {vaccine.hospital}
                  </p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(vaccine.status)}`}>
                  {vaccine.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWorkDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Occupation
          </label>
          {isEditing ? (
            <input
              type="text"
              value={profileData.occupation}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <p className="text-gray-900 dark:text-white font-medium">{profileData.occupation}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Employer
          </label>
          {isEditing ? (
            <input
              type="text"
              value={profileData.employer}
              onChange={(e) => handleInputChange('employer', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <p className="text-gray-900 dark:text-white font-medium">{profileData.employer}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Work Location
          </label>
          {isEditing ? (
            <input
              type="text"
              value={profileData.workLocation}
              onChange={(e) => handleInputChange('workLocation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <p className="text-gray-900 dark:text-white font-medium">{profileData.workLocation}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Work Permit Number
          </label>
          <p className="text-gray-900 dark:text-white font-medium">{profileData.workPermitNumber}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Work Permit Expiry
          </label>
          <p className="text-gray-900 dark:text-white font-medium">
            {new Date(profileData.workPermitExpiry).toLocaleDateString('en-IN')}
          </p>
        </div>
      </div>

      {/* Language Skills */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Language Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primary Language
            </label>
            <p className="text-gray-900 dark:text-white font-medium">{profileData.primaryLanguage}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Secondary Language
            </label>
            <p className="text-gray-900 dark:text-white font-medium">{profileData.secondaryLanguage}</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Languages Spoken
            </label>
            <div className="flex flex-wrap gap-2">
              {profileData.canSpeak.map((lang, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-500" />
                <h4 className="font-medium text-gray-900 dark:text-white">{doc.name}</h4>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(doc.status)}`}>
                {doc.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Uploaded: {new Date(doc.uploadDate).toLocaleDateString('en-IN')}
            </p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
                View
              </button>
              <button className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm">
                Replace
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upload New Document</h3>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Drag and drop your document here, or click to browse
          </p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Choose File
          </button>
        </div>
      </div>
    </div>
  );

  const renderEmergencyInfo = () => (
    <div className="space-y-6">
      {/* Emergency Contact */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contact Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.emergencyContactName}
                onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <p className="text-gray-900 dark:text-white font-medium">{profileData.emergencyContactName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Relationship
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.emergencyRelation}
                onChange={(e) => handleInputChange('emergencyRelation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <p className="text-gray-900 dark:text-white font-medium">{profileData.emergencyRelation}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Emergency Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <p className="text-gray-900 dark:text-white font-medium">{profileData.emergencyContact}</p>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Services */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Emergency Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Medical Emergency', number: '108', desc: '24/7 Ambulance Service' },
            { name: 'Health Helpline', number: '104', desc: 'Free Health Advisory' },
            { name: 'Police Emergency', number: '100', desc: 'Police Emergency Service' },
            { name: 'Fire Emergency', number: '101', desc: 'Fire & Rescue Service' }
          ].map((service, index) => (
            <div key={index} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-red-800 dark:text-red-200">{service.name}</h4>
                  <p className="text-sm text-red-600 dark:text-red-300">{service.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{service.number}</p>
                  <button className="text-sm text-red-600 dark:text-red-400 hover:underline">
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Card QR */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Access</h3>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center">
          <QrCode className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Health Card QR Code</h4>
          <p className="text-sm text-blue-600 dark:text-blue-300 mb-4">
            Show this QR code to healthcare providers for instant access to your health records
          </p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            View QR Code
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal': return renderPersonalInfo();
      case 'health': return renderHealthRecords();
      case 'work': return renderWorkDetails();
      case 'documents': return renderDocuments();
      case 'emergency': return renderEmergencyInfo();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{profileData.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{profileData.nameEnglish}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">ID: {profileData.migrantId}</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </motion.button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </motion.button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MigrantProfile;