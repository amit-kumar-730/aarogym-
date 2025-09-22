import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useTranslation } from '../hooks/useTranslation';
import QRCode from 'qrcode';
import { 
  Camera, 
  Upload, 
  Download, 
  QrCode, 
  User, 
  Phone, 
  MapPin, 
  Calendar,
  Heart,
  Shield,
  CheckCircle,
  AlertCircle,
  Edit,
  Save,
  X
} from 'lucide-react';

interface HealthCardData {
  name: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  currentLocation: string;
  originState: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  photo: string | null;
}

const HealthCard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<HealthCardData>({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    currentLocation: '',
    originState: '',
    occupation: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    photo: null
  });
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const occupations = [
    'Construction Worker', 'Domestic Worker', 'Factory Worker', 'Agricultural Worker',
    'Driver', 'Security Guard', 'Cleaner', 'Cook', 'Electrician', 'Plumber',
    'Carpenter', 'Painter', 'Welder', 'Mechanic', 'Other'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age.trim()) newErrors.age = 'Age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.currentLocation.trim()) newErrors.currentLocation = 'Current location is required';
    if (!formData.originState) newErrors.originState = 'Origin state is required';
    if (!formData.occupation) newErrors.occupation = 'Occupation is required';
    if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
    if (!formData.emergencyContactPhone.trim()) newErrors.emergencyContactPhone = 'Emergency contact phone is required';
    if (!formData.emergencyContactRelation.trim()) newErrors.emergencyContactRelation = 'Emergency contact relation is required';
    if (!formData.photo) newErrors.photo = 'Photo is required';

    // Validate phone numbers
    const phoneRegex = /^[+]?[1-9][\d]{9,14}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Invalid phone number format';
    }
    if (formData.emergencyContactPhone && !phoneRegex.test(formData.emergencyContactPhone.replace(/\s/g, ''))) {
      newErrors.emergencyContactPhone = 'Invalid emergency contact phone format';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Validate age
    const age = parseInt(formData.age);
    if (formData.age && (isNaN(age) || age < 18 || age > 100)) {
      newErrors.age = 'Age must be between 18 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof HealthCardData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, photo: e.target?.result as string }));
        if (errors.photo) {
          setErrors(prev => ({ ...prev, photo: '' }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      alert('Camera access denied. Please use file upload instead.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const photoData = canvas.toDataURL('image/jpeg');
        setFormData(prev => ({ ...prev, photo: photoData }));
        stopCamera();
        if (errors.photo) {
          setErrors(prev => ({ ...prev, photo: '' }));
        }
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const generateHealthCard = async () => {
    if (!validateForm()) return;
    
    setIsGenerating(true);
    
    try {
      // Generate unique migrant ID
      const migrantId = `KL-MIG-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      
      // Create QR code data
      const qrData = {
        id: migrantId,
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
        phone: formData.phone,
        currentLocation: formData.currentLocation,
        emergencyContact: {
          name: formData.emergencyContactName,
          phone: formData.emergencyContactPhone,
          relation: formData.emergencyContactRelation
        },
        generatedAt: new Date().toISOString()
      };
      
      // Generate QR code
      const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrData), {
        width: 200,
        margin: 2,
        color: {
          dark: '#059669',
          light: '#FFFFFF'
        }
      });
      
      setQrCodeUrl(qrCodeDataUrl);
      setStep(3);
    } catch (error) {
      alert('Error generating health card. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadHealthCard = () => {
    // Create a canvas to combine photo, details, and QR code
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    canvas.width = 800;
    canvas.height = 500;
    
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Header
    ctx.fillStyle = '#059669';
    ctx.fillRect(0, 0, canvas.width, 80);
    
    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Kerala Migrant Health Card', canvas.width / 2, 35);
    ctx.font = '14px Arial';
    ctx.fillText('Government of Kerala', canvas.width / 2, 55);
    
    // Add more details and styling as needed
    
    // Download
    const link = document.createElement('a');
    link.download = `health-card-${formData.name.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  // const renderStep1 = () => (
  //   <div className="space-y-6">
  //     <div className="text-center mb-8">
  //       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
  //         Personal Information
  //       </h2>
  //       <p className="text-gray-600 dark:text-gray-400">
  //         Please provide your basic details to generate your health card
  //       </p>
  //     </div>

  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
  //           Full Name *
  //         </label>
  //         <input
  //           type="text"
  //           value={formData.name}
  //           onChange={(e) => handleInputChange('name', e.target.value)}
  //           className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
  //             errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
  //           }`}
  //           placeholder="Enter your full name"
  //         />
  //         {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
  //           Age *
  //         </label>
  //         <input
  //           type="number"
  //           value={formData.age}
  //           onChange={(e) => handleInputChange('age', e.target.value)}
  //           className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
  //             errors.age ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
  //           }`}
  //           placeholder="Enter your age"
  //           min="18"
  //           max="100"
  //         />
  //         {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
  //           Gender *
  //         </label>
  //         <select
  //           value={formData.gender}
  //           onChange={(e) => handleInputChange('gender', e.target.value)}
  //           className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
  //             errors.gender ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
  //           }`}
  //         >
  //           <option value="">Select Gender</option>
  //           <option value="Male">Male</option>
  //           <option value="Female">Female</option>
  //           <option value="Other">Other</option>
  //         </select>
  //         {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
  //           Phone Number *
  //         </label>
  //         <input
  //           type="tel"
  //           value={formData.phone}
  //           onChange={(e) => handleInputChange('phone', e.target.value)}
  //           className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
  //             errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
  //           }`}
  //           placeholder="+91 9876543210"
  //         />
  //         {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
  //           Email Address *
  //         </label>
  //         <input
  //           type="email"
  //           value={formData.email}
  //           onChange={(e) => handleInputChange('email', e.target.value)}
  //           className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
  //             errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
  //           }`}
  //           placeholder="your.email@example.com"
  //         />
  //         {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
  //           Current Location *
  //         </label>
  //         <input
  //           type="text"
  //           value={formData.currentLocation}
  //           onChange={(e) => handleInputChange('currentLocation', e.target.value)}
  //           className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
  //             errors.currentLocation ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
  //           }`}
  //           placeholder="City, District, Kerala"
  //         />
  //         {errors.currentLocation && <p className="text-red-500 text-sm mt-1">{errors.currentLocation}</p>}
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
  //           Origin State *
  //         </label>
  //         <select
  //           value={formData.originState}
  //           onChange={(e) => handleInputChange('originState', e.target.value)}
  //           className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
  //             errors.originState ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
  //           }`}
  //         >
  //           <option value="">Select Origin State</option>
  //           {states.map(state => (
  //             <option key={state} value={state}>{state}</option>
  //           ))}
  //         </select>
  //         {errors.originState && <p className="text-red-500 text-sm mt-1">{errors.originState}</p>}
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
  //           Occupation *
  //         </label>
  //         <select
  //           value={formData.occupation}
  //           onChange={(e) => handleInputChange('occupation', e.target.value)}
  //           className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
  //             errors.occupation ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
  //           }`}
  //         >
  //           <option value="">Select Occupation</option>
  //           {occupations.map(occupation => (
  //             <option key={occupation} value={occupation}>{occupation}</option>
  //           ))}
  //         </select>
  //         {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
  //       </div>
  //     </div>

  //     <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
  //       <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
  //         Emergency Contact Information
  //       </h3>
        
  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
  //             Contact Name *
  //           </label>
  //           <input
  //             type="text"
  //             value={formData.emergencyContactName}
  //             onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
  //             className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
  //               errors.emergencyContactName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
  //             }`}
  //             placeholder="Emergency contact name"
  //           />
  //           {errors.emergencyContactName && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName}</p>}
  //         </div>

  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
  //             Contact Phone *
  //           </label>
  //           <input
  //             type="tel"
  //             value={formData.emergencyContactPhone}
  //             onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
  //             className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
  //               errors.emergencyContactPhone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
  //             }`}
  //             placeholder="+91 9876543210"
  //           />
  //           {errors.emergencyContactPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactPhone}</p>}
  //         </div>

  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
  //             Relationship *
  //           </label>
  //           <input
  //             type="text"
  //             value={formData.emergencyContactRelation}
  //             onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
  //             className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
  //               errors.emergencyContactRelation ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
  //             }`}
  //             placeholder="e.g., Spouse, Parent, Sibling"
  //           />
  //           {errors.emergencyContactRelation && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactRelation}</p>}
  //         </div>
  //       </div>
  //     </div>

  //     <div className="flex justify-end">
  //       <button
  //         onClick={() => setStep(2)}
  //         className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 smooth-transition flex items-center space-x-2"
  //       >
  //         <span>Next: Add Photo</span>
  //         <Camera className="w-5 h-5" />
  //       </button>
  //     </div>
  //   </div>
  // );
// Add this CSS to your stylesheet or in a <style> tag
const tickerStyles = `
  @keyframes marquee {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
  .animate-marquee {
    animation: marquee 20s linear infinite;
  }
`;

const renderStep1 = () => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Personal Information
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        Please provide your basic details to generate your health card
      </p>
      
      {/* Scrolling Ticker below header */}
      <div className="mt-6 bg-red-400 dark:bg-yellow-600 py-3 overflow-hidden rounded-lg">
        <div className="whitespace-nowrap" style={{
          animation: 'scroll-left 15s linear infinite'
        }}>
          <span className="text-sm font-medium text-white dark:text-yellow-100 px-8">
            📋 Note: Health Card Creation will only be done by verified hospitals. This form is open for every user here only for demonstration purposes.
          </span>
          <span className="text-sm font-medium text-white dark:text-yellow-100 px-8">
            📋 Note: Health Card Creation will only be done by verified hospitals. This form is open for every user here only for demonstration purposes.
          </span>
          <span className="text-sm font-medium text-white dark:text-yellow-100 px-8">
            📋 Note: Health Card Creation will only be done by verified hospitals. This form is open for every user here only for demonstration purposes.
          </span>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
            errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Enter your full name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Age *
        </label>
        <input
          type="number"
          value={formData.age}
          onChange={(e) => handleInputChange('age', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
            errors.age ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Enter your age"
          min="18"
          max="100"
        />
        {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Gender *
        </label>
        <select
          value={formData.gender}
          onChange={(e) => handleInputChange('gender', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
            errors.gender ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
            errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="+91 9876543210"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="your.email@example.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Current Location *
        </label>
        <input
          type="text"
          value={formData.currentLocation}
          onChange={(e) => handleInputChange('currentLocation', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
            errors.currentLocation ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="City, District, Kerala"
        />
        {errors.currentLocation && <p className="text-red-500 text-sm mt-1">{errors.currentLocation}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Origin State *
        </label>
        <select
          value={formData.originState}
          onChange={(e) => handleInputChange('originState', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
            errors.originState ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          <option value="">Select Origin State</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        {errors.originState && <p className="text-red-500 text-sm mt-1">{errors.originState}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Occupation *
        </label>
        <select
          value={formData.occupation}
          onChange={(e) => handleInputChange('occupation', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
            errors.occupation ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          <option value="">Select Occupation</option>
          {occupations.map(occupation => (
            <option key={occupation} value={occupation}>{occupation}</option>
          ))}
        </select>
        {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
      </div>
    </div>

    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Emergency Contact Information
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Contact Name *
          </label>
          <input
            type="text"
            value={formData.emergencyContactName}
            onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.emergencyContactName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Emergency contact name"
          />
          {errors.emergencyContactName && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Contact Phone *
          </label>
          <input
            type="tel"
            value={formData.emergencyContactPhone}
            onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.emergencyContactPhone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="+91 9876543210"
          />
          {errors.emergencyContactPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactPhone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Relationship *
          </label>
          <input
            type="text"
            value={formData.emergencyContactRelation}
            onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.emergencyContactRelation ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="e.g., Spouse, Parent, Sibling"
          />
          {errors.emergencyContactRelation && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactRelation}</p>}
        </div>
      </div>
    </div>

    <div className="flex justify-end">
      <button
        onClick={() => setStep(2)}
        className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 smooth-transition flex items-center space-x-2"
      >
        <span>Next: Add Photo</span>
        <Camera className="w-5 h-5" />
      </button>
    </div>
  </div>
);
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Add Your Photo
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Upload a clear photo of yourself for your health card
        </p>
      </div>

      <div className="max-w-md mx-auto">
        {formData.photo ? (
          <div className="text-center">
            <img
              src={formData.photo}
              alt="Profile"
              className="w-48 h-48 rounded-full object-cover mx-auto border-4 border-emerald-100 mb-4"
            />
            <button
              onClick={() => setFormData(prev => ({ ...prev, photo: null }))}
              className="text-red-600 hover:text-red-700 flex items-center space-x-2 mx-auto"
            >
              <X className="w-4 h-4" />
              <span>Remove Photo</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {isCameraActive ? (
              <div className="text-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full max-w-sm rounded-lg mb-4"
                />
                <canvas ref={canvasRef} className="hidden" />
                <div className="flex space-x-4 justify-center">
                  <button
                    onClick={capturePhoto}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 smooth-transition"
                  >
                    Capture Photo
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 smooth-transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={startCamera}
                  className="w-full bg-emerald-600 text-white py-4 px-6 rounded-lg hover:bg-emerald-700 smooth-transition flex items-center justify-center space-x-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>Take Photo with Camera</span>
                </button>
                
                <div className="text-center text-gray-500 dark:text-gray-400">
                  or
                </div>
                
                <div className="relative">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 py-4 px-6 rounded-lg hover:border-emerald-500 hover:text-emerald-600 smooth-transition flex items-center justify-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>Upload Photo from Device</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {errors.photo && <p className="text-red-500 text-sm text-center mt-2">{errors.photo}</p>}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep(1)}
          className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 smooth-transition"
        >
          Back
        </button>
        <button
          onClick={generateHealthCard}
          disabled={!formData.photo || isGenerating}
          className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 smooth-transition flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <QrCode className="w-5 h-5" />
              <span>Generate Health Card</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Health Card Generated Successfully!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your digital health card is ready. Save it to your device and keep it handy.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        {/* Health Card Preview */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">Kerala Health Card</h3>
              <p className="text-emerald-100">Government of Kerala</p>
            </div>
            <Shield className="w-12 h-12 text-white/80" />
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start space-x-6 mb-6">
            <img
              src={formData.photo!}
              alt={formData.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-emerald-100"
            />
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {formData.name}
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Age:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">{formData.age} years</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Gender:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">{formData.gender}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">{formData.phone}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Location:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">{formData.currentLocation}</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24 mx-auto mb-2" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Scan for details</p>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Origin State:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">{formData.originState}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Occupation:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">{formData.occupation}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Emergency Contact:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">{formData.emergencyContactName}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Emergency Phone:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">{formData.emergencyContactPhone}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
            <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Verified by Government of Kerala</span>
            </div>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
              Generated on {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={downloadHealthCard}
          className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 smooth-transition flex items-center justify-center space-x-2"
        >
          <Download className="w-5 h-5" />
          <span>Download Health Card</span>
        </button>
        <button
          onClick={() => {
            setStep(1);
            setFormData({
              name: '',
              age: '',
              gender: '',
              phone: '',
              email: '',
              currentLocation: '',
              originState: '',
              occupation: '',
              emergencyContactName: '',
              emergencyContactPhone: '',
              emergencyContactRelation: '',
              photo: null
            });
            setQrCodeUrl('');
            setErrors({});
          }}
          className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 smooth-transition flex items-center justify-center space-x-2"
        >
          <User className="w-5 h-5" />
          <span>Create Another Card</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/20 px-4 py-2 rounded-full mb-4">
              <QrCode className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                Digital Health Card Generator
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Generate Your Health Card
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Create your secure digital health card with QR code for instant access to your medical information.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= stepNumber 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {step > stepNumber ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span className={`ml-2 font-medium ${
                  step >= stepNumber 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {stepNumber === 1 && 'Personal Info'}
                  {stepNumber === 2 && 'Add Photo'}
                  {stepNumber === 3 && 'Health Card'}
                </span>
                {stepNumber < 3 && (
                  <div className={`w-16 h-0.5 ml-4 ${
                    step > stepNumber ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthCard;