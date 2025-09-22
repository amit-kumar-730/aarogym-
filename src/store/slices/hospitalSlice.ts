import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  reviews: number;
  specialties: string[];
  approved: boolean;
  location: {
    lat: number;
    lng: number;
  };
  image?: string;
  badge?: 'gold' | 'silver' | 'bronze';
}

interface HospitalState {
  hospitals: Hospital[];
  loading: boolean;
  searchQuery: string;
  filters: {
    rating: number | null;
    specialty: string | null;
    location: string | null;
  };
}

const initialState: HospitalState = {
  hospitals: [
    {
      id: '1',
      name: 'Amrita Institute of Medical Sciences',
      address: 'Ponekkara, Kochi, Kerala 682041',
      phone: '+91 484 2801234',
      email: 'info@amrita.edu',
      rating: 4.8,
      reviews: 2456,
      specialties: ['Cardiology', 'Neurology', 'Oncology'],
      approved: true,
      location: { lat: 10.0889, lng: 76.3647 },
      image: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg',
      badge: 'gold',
    },
    {
      id: '2',
      name: 'Aster Medcity',
      address: 'Kuttisahib Road, Cheranelloor, Kochi 682027',
      phone: '+91 484 6699999',
      email: 'info@astermedcity.com',
      rating: 4.7,
      reviews: 1876,
      specialties: ['Orthopedics', 'Gastroenterology', 'Pediatrics'],
      approved: true,
      location: { lat: 9.9625, lng: 76.2928 },
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg',
      badge: 'gold',
    },
    {
      id: '3',
      name: 'KIMSHEALTH',
      address: 'PB No.1, Anayara, Thiruvananthapuram 695029',
      phone: '+91 471 3041400',
      email: 'info@kimshealth.org',
      rating: 4.6,
      reviews: 1543,
      specialties: ['General Medicine', 'Surgery', 'Emergency Care'],
      approved: true,
      location: { lat: 8.5241, lng: 76.9366 },
      image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg',
      badge: 'silver',
    },
  ],
  loading: false,
  searchQuery: '',
  filters: {
    rating: null,
    specialty: null,
    location: null,
  },
};

const hospitalSlice = createSlice({
  name: 'hospitals',
  initialState,
  reducers: {
    setHospitals: (state, action: PayloadAction<Hospital[]>) => {
      state.hospitals = action.payload;
    },
    addHospital: (state, action: PayloadAction<Hospital>) => {
      state.hospitals.push(action.payload);
    },
    updateHospital: (state, action: PayloadAction<{ id: string; data: Partial<Hospital> }>) => {
      const index = state.hospitals.findIndex(h => h.id === action.payload.id);
      if (index !== -1) {
        state.hospitals[index] = { ...state.hospitals[index], ...action.payload.data };
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<typeof initialState.filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setHospitals, addHospital, updateHospital, setSearchQuery, setFilters, setLoading } = hospitalSlice.actions;
export default hospitalSlice.reducer;