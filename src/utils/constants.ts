// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  MIGRANTS: {
    PROFILE: '/api/migrants/profile',
    HEALTH_CARD: '/api/migrants/health-card',
    APPOINTMENTS: '/api/migrants/appointments',
    VACCINATIONS: '/api/migrants/vaccinations',
  },
  HOSPITALS: {
    LIST: '/api/hospitals',
    DETAILS: '/api/hospitals/:id',
    APPOINTMENTS: '/api/hospitals/:id/appointments',
    REVIEWS: '/api/hospitals/:id/reviews',
  },
  OUTBREAKS: {
    ALERTS: '/api/outbreaks/alerts',
    REPORT: '/api/outbreaks/report',
  },
  ADMIN: {
    STATS: '/api/admin/stats',
    HOSPITAL_REQUESTS: '/api/admin/hospital-requests',
    MIGRANTS: '/api/admin/migrants',
  },
};

// Application Constants
export const APP_CONFIG = {
  NAME: 'Aarogyam',
  FULL_NAME: 'Kerala Migrant Health Record System',
  VERSION: '1.0.0',
  DESCRIPTION: 'Secure Health, Fair Access, Safer Communities',
  SUPPORT_EMAIL: 'aarogyam@kerala.gov.in',
  SUPPORT_PHONE: '+91 471 2518873',
  EMERGENCY_NUMBERS: {
    EMERGENCY: '108',
    HEALTH_HELPLINE: '104',
    COVID_HELPLINE: '+91 471 2552056',
    WOMEN_HELPLINE: '181',
  },
};

// Health Status Types
export const HEALTH_STATUS = {
  HEALTHY: 'healthy',
  AT_RISK: 'at-risk',
  CRITICAL: 'critical',
  INFECTED: 'infected',
} as const;

// Appointment Status Types
export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no-show',
} as const;

// Vaccination Status Types
export const VACCINATION_STATUS = {
  COMPLETED: 'completed',
  PENDING: 'pending',
  OVERDUE: 'overdue',
} as const;

// Outbreak Severity Levels
export const OUTBREAK_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

// User Roles
export const USER_ROLES = {
  MIGRANT: 'migrant',
  HOSPITAL: 'hospital',
  ADMIN: 'admin',
} as const;

// Supported Languages
export const LANGUAGES = {
  ENGLISH: 'en',
  HINDI: 'hi',
  MALAYALAM: 'ml',
  BENGALI: 'bn',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'aarogyam_auth_token',
  REFRESH_TOKEN: 'aarogyam_refresh_token',
  USER_DATA: 'aarogyam_user_data',
  THEME: 'aarogyam_theme',
  LANGUAGE: 'aarogyam_language',
  ONBOARDING_COMPLETED: 'aarogyam_onboarding_completed',
} as const;

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  PHONE_REGEX: /^[+]?[1-9][\d]{9,14}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIGRANT_ID_REGEX: /^KL-MIG-\d{4}-\d{3,6}$/,
  HOSPITAL_ID_REGEX: /^KL-HOSP-\d{3,6}$/,
} as const;

// File Upload Limits
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  DATETIME: 'MMM dd, yyyy HH:mm',
  TIME: 'HH:mm',
} as const;

// Kerala Districts
export const KERALA_DISTRICTS = [
  'Thiruvananthapuram',
  'Kollam',
  'Pathanamthitta',
  'Alappuzha',
  'Kottayam',
  'Idukki',
  'Ernakulam',
  'Thrissur',
  'Palakkad',
  'Malappuram',
  'Kozhikode',
  'Wayanad',
  'Kannur',
  'Kasaragod',
] as const;

// Indian States
export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
] as const;

// Common Occupations for Migrant Workers
export const OCCUPATIONS = [
  'Construction Worker',
  'Domestic Worker',
  'Factory Worker',
  'Agricultural Worker',
  'Driver',
  'Security Guard',
  'Cleaner',
  'Cook',
  'Electrician',
  'Plumber',
  'Carpenter',
  'Painter',
  'Welder',
  'Mechanic',
  'Tailor',
  'Fisherman',
  'Other',
] as const;

// Medical Specialties
export const MEDICAL_SPECIALTIES = [
  'General Medicine',
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Gynecology',
  'Surgery',
  'Emergency Medicine',
  'Radiology',
  'Pathology',
  'Dermatology',
  'Psychiatry',
  'Ophthalmology',
  'ENT',
  'Urology',
  'Oncology',
  'Gastroenterology',
  'Pulmonology',
  'Nephrology',
  'Endocrinology',
] as const;

// Common Vaccines
export const VACCINES = [
  'COVID-19',
  'COVID-19 Booster',
  'Hepatitis A',
  'Hepatitis B',
  'Influenza',
  'Tetanus',
  'Typhoid',
  'Japanese Encephalitis',
  'Measles',
  'Mumps',
  'Rubella',
  'Polio',
  'BCG',
  'DPT',
  'HPV',
] as const;