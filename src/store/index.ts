import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import languageReducer from './slices/languageSlice';
import themeReducer from './slices/themeSlice';
import hospitalReducer from './slices/hospitalSlice';
import migrantReducer from './slices/migrantSlice';
import outbreakReducer from './slices/outbreakSlice';
import chatReducer from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    theme: themeReducer,
    hospitals: hospitalReducer,
    migrants: migrantReducer,
    outbreaks: outbreakReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;