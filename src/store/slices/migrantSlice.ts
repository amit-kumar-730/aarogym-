import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MigrantProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  photo?: string;
  migrantId: string;
  phone: string;
  email: string;
  currentLocation: string;
  originState: string;
  occupation: string;
  healthHistory: string[];
  vaccinations: Array<{
    vaccine: string;
    date: string;
    nextDue?: string;
  }>;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  qrCode?: string;
  // added optional fields from Sumit
  dob?: string;
  bloodGroup?: string;
  address?: string;
  addressMl?: string;
}

interface MigrantState {
  profile: MigrantProfile | null;
  migrants: MigrantProfile[];
  loading: boolean;
}

const initialState: MigrantState = {
  profile: {
    id: 'mig_001',
    name: 'Rajesh Kumar',
    age: 32,
    gender: 'male',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    migrantId: 'KL-MIG-2025-001',
    phone: '+91 9876543210',
    email: 'rajesh.kumar@email.com',
    currentLocation: 'Kochi, Ernakulam',
    originState: 'Bihar',
    occupation: 'Construction Worker',
    healthHistory: ['No known allergies', 'Hypertension (controlled)', 'Regular health checkups'],
    vaccinations: [
      { vaccine: 'COVID-19', date: '2024-12-15', nextDue: '2025-06-15' },
      { vaccine: 'Hepatitis B', date: '2024-11-20' },
      { vaccine: 'Tetanus', date: '2024-10-05', nextDue: '2034-10-05' }
    ],
    emergencyContact: {
      name: 'Priya Kumar',
      phone: '9876 5432 11',
      relation: 'Spouse'
    },
    qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    // --- fields copied from Sumit because Rajesh didn't have them ---
    dob: '12/09/1997',
    bloodGroup: 'B+',
    address: 'S/O: Amit Kumar, Kizhakke Veedu, Kottukal Kollam, Kerala- 691306',
    addressMl: 'ആത്മജൻ അമിത് കുമാർ, കിഴക്കെ വീട്, കോട്ടുക്കൽ, കൊല്ലം, കേരളം-691306'
  },
  migrants: [],
  loading: false,
};

const migrantSlice = createSlice({
  name: 'migrants',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<MigrantProfile>) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<MigrantProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      } else {
        // if no active profile, set payload as profile
        state.profile = action.payload as MigrantProfile;
      }
    },
    setMigrants: (state, action: PayloadAction<MigrantProfile[]>) => {
      state.migrants = action.payload;
    },
    addMigrant: (state, action: PayloadAction<MigrantProfile>) => {
      state.migrants.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    generateQRCode: (state, action: PayloadAction<string>) => {
      if (state.profile) {
        state.profile.qrCode = action.payload;
      }
    },
  },
});

export const { setProfile, updateProfile, setMigrants, addMigrant, setLoading, generateQRCode } = migrantSlice.actions;
export default migrantSlice.reducer;
