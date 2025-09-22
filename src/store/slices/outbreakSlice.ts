import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OutbreakAlert {
  id: string;
  disease: string;
  location: string;
  district: string;
  cases: number;
  severity: 'low' | 'medium' | 'high';
  date: string;
  description: string;
  preventionTips: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface OutbreakState {
  alerts: OutbreakAlert[];
  activeAlerts: OutbreakAlert[];
  loading: boolean;
}

const initialState: OutbreakState = {
  alerts: [
    {
      id: '1',
      disease: 'Dengue',
      location: 'Kochi',
      district: 'Ernakulam',
      cases: 45,
      severity: 'medium',
      date: '2025-01-15',
      description: 'Increased dengue cases reported in Kochi area',
      preventionTips: [
        'Remove stagnant water',
        'Use mosquito repellents',
        'Wear long-sleeved clothing',
        'Seek immediate medical attention for fever'
      ],
      coordinates: { lat: 9.9312, lng: 76.2673 }
    },
    {
      id: '2',
      disease: 'Chikungunya',
      location: 'Thiruvananthapuram',
      district: 'Thiruvananthapuram',
      cases: 23,
      severity: 'low',
      date: '2025-01-14',
      description: 'Few cases of chikungunya detected',
      preventionTips: [
        'Eliminate mosquito breeding sites',
        'Use protective clothing',
        'Apply mosquito repellent',
        'Maintain cleanliness'
      ],
      coordinates: { lat: 8.5241, lng: 76.9366 }
    },
    {
      id: '3',
      disease: 'H1N1',
      location: 'Calicut',
      district: 'Kozhikode',
      cases: 12,
      severity: 'low',
      date: '2025-01-13',
      description: 'Seasonal flu outbreak reported',
      preventionTips: [
        'Get vaccinated',
        'Wash hands frequently',
        'Avoid crowded places',
        'Cover mouth when coughing'
      ],
      coordinates: { lat: 11.2588, lng: 75.7804 }
    }
  ],
  activeAlerts: [],
  loading: false,
};

const outbreakSlice = createSlice({
  name: 'outbreaks',
  initialState,
  reducers: {
    setAlerts: (state, action: PayloadAction<OutbreakAlert[]>) => {
      state.alerts = action.payload;
    },
    addAlert: (state, action: PayloadAction<OutbreakAlert>) => {
      state.alerts.unshift(action.payload);
      if (action.payload.severity === 'high') {
        state.activeAlerts.unshift(action.payload);
      }
    },
    updateAlert: (state, action: PayloadAction<{ id: string; data: Partial<OutbreakAlert> }>) => {
      const index = state.alerts.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.alerts[index] = { ...state.alerts[index], ...action.payload.data };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    dismissAlert: (state, action: PayloadAction<string>) => {
      state.activeAlerts = state.activeAlerts.filter(a => a.id !== action.payload);
    },
  },
});

export const { setAlerts, addAlert, updateAlert, setLoading, dismissAlert } = outbreakSlice.actions;
export default outbreakSlice.reducer;