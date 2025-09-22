import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { 
  Camera, 
  Scan, 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Heart, 
  Shield,
  AlertCircle,
  CheckCircle,
  X,
  Upload,
  Zap
} from 'lucide-react';

interface HealthRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  migrantId: string;
  photo: string;
  phone: string;
  currentLocation: string;
  healthStatus: 'healthy' | 'at-risk' | 'infected';
  lastCheckup: string;
  vaccinations: Array<{
    vaccine: string;
    date: string;
    status: 'completed' | 'pending' | 'overdue';
  }>;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  medicalHistory: string[];
}

const QRScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<HealthRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useTranslation();

  // Mock health record data
  const mockHealthRecord: HealthRecord = {
    id: 'MH2025001',
    name: 'Rajesh Kumar',
    age: 32,
    gender: 'Male',
    migrantId: 'KL-MIG-2025-001',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    phone: '+91 9876543210',
    currentLocation: 'Kochi, Ernakulam',
    healthStatus: 'healthy',
    lastCheckup: '2025-01-10',
    vaccinations: [
      { vaccine: 'COVID-19', date: '2024-12-15', status: 'completed' },
      { vaccine: 'Hepatitis B', date: '2024-11-20', status: 'completed' },
      { vaccine: 'Tetanus', date: '2024-10-05', status: 'completed' },
      { vaccine: 'Influenza', date: '2025-01-15', status: 'pending' }
    ],
    emergencyContact: {
      name: 'Priya Kumar',
      phone: '+91 9876543211',
      relation: 'Spouse'
    },
    medicalHistory: [
      'No known allergies',
      'Hypertension (controlled)',
      'Regular health checkups'
    ]
  };

  useEffect(() => {
    if (isScanning) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isScanning]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
        setError(null);
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions.');
      setHasPermission(false);
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleScan = () => {
    // Simulate QR code scanning
    setTimeout(() => {
      setScannedData(mockHealthRecord);
      setIsScanning(false);
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate QR code processing from uploaded image
      setTimeout(() => {
        setScannedData(mockHealthRecord);
      }, 1000);
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'at-risk': return 'text-yellow-600 bg-yellow-100';
      case 'infected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getVaccinationStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/20 px-4 py-2 rounded-full mb-4">
              <Scan className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                Secure QR Scanner
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Health Record Scanner
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Scan QR codes to instantly access migrant worker health records securely and efficiently.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!scannedData ? (
          <div className="max-w-2xl mx-auto">
            {/* Scanner Interface */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              {/* Scanner Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  QR Code Scanner
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Position the QR code within the frame to scan
                </p>
              </div>

              {/* Camera View */}
              <div className="relative">
                {isScanning ? (
                  <div className="relative bg-black aspect-square">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Scanning Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Scanning Frame */}
                        <div className="w-64 h-64 border-2 border-emerald-500 rounded-lg relative">
                          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-lg"></div>
                          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-lg"></div>
                          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-lg"></div>
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-lg"></div>
                          
                          {/* Scanning Line */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-0.5 bg-emerald-500 animate-pulse"></div>
                          </div>
                        </div>
                        
                        {/* Instructions */}
                        <p className="text-white text-center mt-4 bg-black/50 px-4 py-2 rounded-lg">
                          Align QR code within the frame
                        </p>
                      </div>
                    </div>

                    {/* Scan Button */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                      <button
                        onClick={handleScan}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg smooth-transition"
                      >
                        <Zap className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Camera Not Active
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Start scanning to access the camera
                      </p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="absolute inset-0 bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                    <div className="text-center p-6">
                      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <p className="text-red-600 dark:text-red-400">{error}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="p-6 space-y-4">
                {!isScanning ? (
                  <div className="space-y-4">
                    <button
                      onClick={() => setIsScanning(true)}
                      className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 smooth-transition flex items-center justify-center space-x-2"
                    >
                      <Camera className="w-5 h-5" />
                      <span>Start Scanning</span>
                    </button>
                    
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <button className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 py-3 px-6 rounded-lg hover:border-emerald-500 hover:text-emerald-600 smooth-transition flex items-center justify-center space-x-2">
                        <Upload className="w-5 h-5" />
                        <span>Upload QR Code Image</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsScanning(false)}
                    className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 smooth-transition flex items-center justify-center space-x-2"
                  >
                    <X className="w-5 h-5" />
                    <span>Stop Scanning</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Health Record Display */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Health Record Found
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Scanned successfully at {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setScannedData(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Information */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Personal Information
                  </h3>
                  
                  <div className="flex items-start space-x-4 mb-6">
                    <img
                      src={scannedData.photo}
                      alt={scannedData.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-emerald-100"
                    />
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {scannedData.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        ID: {scannedData.migrantId}
                      </p>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getHealthStatusColor(scannedData.healthStatus)}`}>
                        <Heart className="w-4 h-4 mr-1" />
                        {scannedData.healthStatus.charAt(0).toUpperCase() + scannedData.healthStatus.slice(1)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Age</label>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{scannedData.age} years</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</label>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{scannedData.gender}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{scannedData.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Checkup</label>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{scannedData.lastCheckup}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Location</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{scannedData.currentLocation}</p>
                    </div>
                  </div>
                </div>

                {/* Vaccinations */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Vaccination Records
                  </h3>
                  
                  <div className="space-y-3">
                    {scannedData.vaccinations.map((vaccination, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{vaccination.vaccine}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{vaccination.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getVaccinationStatusColor(vaccination.status)}`}>
                          {vaccination.status.charAt(0).toUpperCase() + vaccination.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Medical History */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Medical History
                  </h3>
                  
                  <ul className="space-y-2">
                    {scannedData.medicalHistory.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Emergency Contact & Actions */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Emergency Contact
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{scannedData.emergencyContact.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Relation</label>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{scannedData.emergencyContact.relation}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
                      <a
                        href={`tel:${scannedData.emergencyContact.phone}`}
                        className="text-lg font-semibold text-emerald-600 hover:text-emerald-700 flex items-center space-x-2"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{scannedData.emergencyContact.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                  </h3>
                  
                  <div className="space-y-3">
                    <button className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 smooth-transition flex items-center justify-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Schedule Checkup</span>
                    </button>
                    <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 smooth-transition flex items-center justify-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Update Record</span>
                    </button>
                    <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 smooth-transition flex items-center justify-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>View Full History</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QRScanner;