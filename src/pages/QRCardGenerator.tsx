import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Download, Eye, QrCode, User, Calendar, MapPin, Phone, Heart } from 'lucide-react';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface FormData {
  name: string;
  nameHindi: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  phone: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  photo: string;
}

const QRCardGenerator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    nameHindi: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    phone: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    photo: ''
  });
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, photo: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateMigrantId = () => {
    const prefix = 'KL-MIG-';
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}${year}-${random}`;
  };

  const generateQRCode = async () => {
    setIsGenerating(true);
    
    const migrantId = generateMigrantId();
    const qrData = {
      id: migrantId,
      name: formData.name,
      nameHindi: formData.nameHindi,
      dob: formData.dateOfBirth,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      phone: formData.phone,
      emergencyContact: formData.emergencyContact,
      emergencyPhone: formData.emergencyPhone,
      issueDate: new Date().toISOString(),
      authority: 'Government of Kerala - Health Department'
    };

    try {
      const qrUrl = await QRCode.toDataURL(JSON.stringify(qrData), {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrUrl);
      setCurrentStep(4);
    } catch (error) {
      console.error('QR Code generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadCard = async (format: 'png' | 'pdf') => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#ffffff'
      });

      if (format === 'png') {
        const link = document.createElement('a');
        link.download = `aarogyam-health-card-${formData.name.replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } else {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 85.6; // Standard ID card width
        const imgHeight = 54; // Standard ID card height
        
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save(`aarogyam-health-card-${formData.name.replace(/\s+/g, '-')}.pdf`);
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name (English) *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter full name in English"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name (Hindi) *
                </label>
                <input
                  type="text"
                  name="nameHindi"
                  value={formData.nameHindi}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="पूरा नाम हिंदी में"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Blood Group *
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="+91 9876543210"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                placeholder="Complete address with city, state, pincode"
                required
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Emergency Contact
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Emergency Contact Name *
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Contact person name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Emergency Contact Phone *
                </label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="+91 9876543210"
                  required
                />
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Important Information
              </h3>
              <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-sm">
                <li>• This contact will be notified in case of medical emergencies</li>
                <li>• Ensure the contact person is easily reachable</li>
                <li>• Provide accurate phone number with country code</li>
                <li>• This information will be encrypted in your health card</li>
              </ul>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Upload Photo
            </h2>
            
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 border-4 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden">
                {formData.photo ? (
                  <img
                    src={formData.photo}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">Upload Photo</p>
                  </div>
                )}
              </div>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Photo
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    // Mock camera capture
                    setFormData(prev => ({
                      ...prev,
                      photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
                    }));
                  }}
                  className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Photo Requirements:</p>
                <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                  <li>• Clear face photo with good lighting</li>
                  <li>• JPG, PNG format, max 5MB</li>
                  <li>• Minimum 300x300 pixels</li>
                  <li>• No filters or editing</li>
                </ul>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Your Health Card
            </h2>
            
            <div className="flex justify-center mb-6">
              <div
                ref={cardRef}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-2xl shadow-2xl w-96 h-56 relative overflow-hidden"
                style={{ aspectRatio: '1.586/1' }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white transform translate-x-8 -translate-y-8" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white transform -translate-x-6 translate-y-6" />
                </div>
                
                {/* Header */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">AAROGYAM</h3>
                      <p className="text-xs opacity-90">Kerala Migrant Health Card</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Main Content */}
                  <div className="flex">
                    <div className="flex-1">
                      <div className="mb-2">
                        <p className="text-sm font-semibold">{formData.name}</p>
                        <p className="text-xs opacity-90">{formData.nameHindi}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="opacity-75">Age:</p>
                          <p className="font-medium">{calculateAge(formData.dateOfBirth)} years</p>
                        </div>
                        <div>
                          <p className="opacity-75">Blood:</p>
                          <p className="font-medium">{formData.bloodGroup}</p>
                        </div>
                        <div>
                          <p className="opacity-75">Gender:</p>
                          <p className="font-medium">{formData.gender}</p>
                        </div>
                        <div>
                          <p className="opacity-75">ID:</p>
                          <p className="font-medium text-xs">{generateMigrantId().slice(-8)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 flex flex-col items-center">
                      {formData.photo && (
                        <img
                          src={formData.photo}
                          alt="Profile"
                          className="w-16 h-16 rounded-lg object-cover border-2 border-white/30 mb-2"
                        />
                      )}
                      {qrCodeUrl && (
                        <img
                          src={qrCodeUrl}
                          alt="QR Code"
                          className="w-12 h-12 bg-white p-1 rounded"
                        />
                      )}
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="absolute bottom-2 left-6 right-6">
                    <div className="flex justify-between items-center text-xs opacity-75">
                      <span>Issued: {new Date().toLocaleDateString()}</span>
                      <span>Govt of Kerala</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? 'Edit Mode' : 'Preview Mode'}
              </button>
              
              <button
                onClick={() => downloadCard('png')}
                className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </button>
              
              <button
                onClick={() => downloadCard('pdf')}
                className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.nameHindi && formData.dateOfBirth && 
               formData.gender && formData.bloodGroup && formData.phone && formData.address;
      case 2:
        return formData.emergencyContact && formData.emergencyPhone;
      case 3:
        return formData.photo;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Generate Health Card
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create your official Aarogyam Health Card with QR code
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <React.Fragment key={step}>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                    currentStep >= step
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 rounded ${
                      currentStep > step
                        ? 'bg-green-600'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex space-x-8 text-sm text-gray-600 dark:text-gray-400">
              <span className={currentStep >= 1 ? 'text-green-600' : ''}>Personal Info</span>
              <span className={currentStep >= 2 ? 'text-green-600' : ''}>Emergency</span>
              <span className={currentStep >= 3 ? 'text-green-600' : ''}>Photo</span>
              <span className={currentStep >= 4 ? 'text-green-600' : ''}>Card</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
        >
          {renderStep()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 rounded-lg transition-colors"
            >
              Previous
            </button>
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (currentStep === 3) {
                    generateQRCode();
                  } else {
                    setCurrentStep(currentStep + 1);
                  }
                }}
                disabled={!isStepValid() || isGenerating}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center"
              >
                {isGenerating ? (
                  <>
                    <QrCode className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : currentStep === 3 ? (
                  'Generate Card'
                ) : (
                  'Next'
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => window.location.href = '/dashboard'}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QRCardGenerator;