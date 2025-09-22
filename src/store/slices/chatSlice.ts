import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  loading: boolean;
}

const initialState: ChatState = {
  isOpen: false,
  messages: [
    {
      id: '1',
      message: 'Hello! I\'m your AI Health Assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ],
  loading: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    addMessage: (state, action: PayloadAction<Omit<ChatMessage, 'id' | 'timestamp'>>) => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        ...action.payload,
        timestamp: new Date(),
      };
      state.messages.push(newMessage);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [
        {
          id: '1',
          message: 'Hello! I\'m your AI Health Assistant. How can I help you today?',
          sender: 'bot',
          timestamp: new Date(),
        },
      ];
    },
  },
});

export const { toggleChat, addMessage, setLoading, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;