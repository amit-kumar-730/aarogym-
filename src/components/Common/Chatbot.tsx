// import React, { useState, useRef, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { motion, AnimatePresence } from 'framer-motion';
// import { RootState } from '../../store';
// import { toggleChat, addMessage, setLoading } from '../../store/slices/chatSlice';
// import { useTranslation } from '../../hooks/useTranslation';
// import { 
//   MessageCircle, 
//   X, 
//   Send, 
//   Bot, 
//   User, 
//   Loader2,
//   Heart,
//   MapPin,
//   Phone,
//   Calendar,
//   AlertCircle
// } from 'lucide-react';

// const Chatbot: React.FC = () => {
//   const [inputMessage, setInputMessage] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
  
//   const { isOpen, messages, loading } = useSelector((state: RootState) => state.chat);

//   const quickActions = [
//     { icon: Heart, text: 'Health Card', action: 'health_card' },
//     { icon: MapPin, text: 'Find Hospital', action: 'find_hospital' },
//     { icon: Calendar, text: 'Book Appointment', action: 'book_appointment' },
//     { icon: AlertCircle, text: 'Emergency', action: 'emergency' },
//   ];

//   const predefinedResponses = {
//     'health_card': 'To generate your health card, please go to Profile > Generate QR Health Card. You\'ll need to upload your photo and provide basic information.',
//     'find_hospital': 'You can find nearby hospitals by visiting the Hospitals page or using the map feature. Filter by specialty, rating, or distance.',
//     'book_appointment': 'To book an appointment, select a hospital from the list, view their profile, and click "Book Appointment". You\'ll need to be logged in.',
//     'emergency': 'For medical emergencies, call 108 immediately. For health helpline, dial 104. If you need immediate care, visit the nearest hospital.',
//     'default': 'I can help you with health cards, finding hospitals, booking appointments, and emergency information. What would you like to know?',
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleSendMessage = async (message?: string) => {
//     const messageToSend = message || inputMessage.trim();
//     if (!messageToSend) return;

//     // Add user message
//     dispatch(addMessage({ message: messageToSend, sender: 'user' }));
//     setInputMessage('');
//     dispatch(setLoading(true));

//     // Simulate AI response delay
//     setTimeout(() => {
//       let response = predefinedResponses.default;
      
//       // Simple keyword matching for responses
//       const lowerMessage = messageToSend.toLowerCase();
//       if (lowerMessage.includes('health card') || lowerMessage.includes('qr')) {
//         response = predefinedResponses.health_card;
//       } else if (lowerMessage.includes('hospital') || lowerMessage.includes('doctor')) {
//         response = predefinedResponses.find_hospital;
//       } else if (lowerMessage.includes('appointment') || lowerMessage.includes('book')) {
//         response = predefinedResponses.book_appointment;
//       } else if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
//         response = predefinedResponses.emergency;
//       }

//       dispatch(addMessage({ message: response, sender: 'bot' }));
//       dispatch(setLoading(false));
//     }, 1000);
//   };

//   const handleQuickAction = (action: string) => {
//     const response = predefinedResponses[action as keyof typeof predefinedResponses] || predefinedResponses.default;
//     dispatch(addMessage({ message: quickActions.find(qa => qa.action === action)?.text || 'Quick action', sender: 'user' }));
//     setTimeout(() => {
//       dispatch(addMessage({ message: response, sender: 'bot' }));
//     }, 500);
//   };

//   return (
//     <div className="chatbot-container">
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.8, y: 20 }}
//             className="chatbot-window"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between p-4 bg-emerald-600 text-white rounded-t-lg">
//               <div className="flex items-center space-x-2">
//                 <Bot className="w-5 h-5" />
//                 <div>
//                   <h3 className="font-semibold text-sm">AI Health Assistant</h3>
//                   <p className="text-xs text-emerald-100">Always here to help</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => dispatch(toggleChat())}
//                 className="hover:bg-emerald-700 rounded-full p-1 smooth-transition"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>

//             {/* Quick Actions */}
//             <div className="p-3 border-b border-gray-200 dark:border-gray-700">
//               <div className="grid grid-cols-2 gap-2">
//                 {quickActions.map((action) => (
//                   <button
//                     key={action.action}
//                     onClick={() => handleQuickAction(action.action)}
//                     className="flex items-center space-x-2 p-2 text-xs bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg smooth-transition"
//                   >
//                     <action.icon className="w-3 h-3" />
//                     <span>{action.text}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 p-3 overflow-y-auto max-h-64 space-y-3">
//               {messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className={`flex items-start space-x-2 ${
//                     message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
//                   }`}
//                 >
//                   <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
//                     message.sender === 'bot' 
//                       ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400' 
//                       : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
//                   }`}>
//                     {message.sender === 'bot' ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
//                   </div>
//                   <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
//                     message.sender === 'bot'
//                       ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
//                       : 'bg-emerald-600 text-white'
//                   }`}>
//                     {message.message}
//                   </div>
//                 </motion.div>
//               ))}
              
//               {loading && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex items-start space-x-2"
//                 >
//                   <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
//                     <Bot className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
//                   </div>
//                   <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
//                     <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
//                   </div>
//                 </motion.div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input */}
//             <div className="p-3 border-t border-gray-200 dark:border-gray-700">
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="text"
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                   placeholder="Type your question..."
//                   className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
//                   disabled={loading}
//                 />
//                 <button
//                   onClick={() => handleSendMessage()}
//                   disabled={!inputMessage.trim() || loading}
//                   className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition"
//                 >
//                   <Send className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Toggle Button */}
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => dispatch(toggleChat())}
//         className={`chatbot-toggle ${isOpen ? '' : 'relative overflow-hidden'}`}
//       >
//         {/* {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />} */}
//         {isOpen ? <X className="w-6 h-6" /> : 
//           <motion.img 
//             src='chatbotLogo.svg' 
//             className="w-16 h-16"
//             animate={{
//               y: [0, -8, 0],
//               scale: [1, 1.05, 1]
//             }}
//             transition={{
//               duration: 1.5,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           />
//         }
//         {!isOpen && (
//           <div className="absolute -top-1 -right-1 w-3 h-3  pulse-animation" />
//         )}
//       </motion.button>
//     </div>
//   );
// };

// export default Chatbot;

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../../store';
import { toggleChat, addMessage, setLoading } from '../../store/slices/chatSlice';
import { useTranslation } from '../../hooks/useTranslation';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Heart,
  MapPin,
  Phone,
  Calendar,
  AlertCircle
} from 'lucide-react';

const Chatbot: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { t, language } = useTranslation();
  
  const { isOpen, messages, loading } = useSelector((state: RootState) => state.chat);

  const quickActions = [
    { icon: Heart, text: t('chatbot.quickActions.healthCard'), action: 'health_card' },
    { icon: MapPin, text: t('chatbot.quickActions.findHospital'), action: 'find_hospital' },
    { icon: Calendar, text: t('chatbot.quickActions.bookAppointment'), action: 'book_appointment' },
    { icon: AlertCircle, text: t('chatbot.quickActions.emergency'), action: 'emergency' },
  ];

  const predefinedResponses = {
    'health_card': t('chatbot.responses.healthCard'),
    'find_hospital': t('chatbot.responses.findHospital'),
    'book_appointment': t('chatbot.responses.bookAppointment'),
    'emergency': t('chatbot.responses.emergency'),
    'default': t('chatbot.responses.greeting'),
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage.trim();
    if (!messageToSend) return;

    // Add user message
    dispatch(addMessage({ message: messageToSend, sender: 'user' }));
    setInputMessage('');
    dispatch(setLoading(true));

    // Simulate AI response delay
    setTimeout(() => {
      let response = predefinedResponses.default;
      
      // Simple keyword matching for responses
      const lowerMessage = messageToSend.toLowerCase();
      
      // Check for multilingual keywords
      if (lowerMessage.includes('health card') || lowerMessage.includes('qr') || 
          lowerMessage.includes('हेल्थ कार्ड') || lowerMessage.includes('ഹെൽത്ത് കാർഡ്') || 
          lowerMessage.includes('হেলথ কার্ড')) {
        response = predefinedResponses.health_card;
      } else if (lowerMessage.includes('hospital') || lowerMessage.includes('doctor') || 
                 lowerMessage.includes('अस्पताल') || lowerMessage.includes('ആശുപത്രി') || 
                 lowerMessage.includes('হাসপাতাল')) {
        response = predefinedResponses.find_hospital;
      } else if (lowerMessage.includes('appointment') || lowerMessage.includes('book')) {
        response = predefinedResponses.book_appointment;
      } else if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || 
                 lowerMessage.includes('आपातकाल') || lowerMessage.includes('എമർജൻസി') || 
                 lowerMessage.includes('জরুরি')) {
        response = predefinedResponses.emergency;
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || 
                 lowerMessage.includes('नमस्ते') || lowerMessage.includes('ഹലോ') || 
                 lowerMessage.includes('হ্যালো')) {
        response = predefinedResponses.default;
      }

      dispatch(addMessage({ message: response, sender: 'bot' }));
      dispatch(setLoading(false));
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    const response = predefinedResponses[action as keyof typeof predefinedResponses] || predefinedResponses.default;
    dispatch(addMessage({ message: quickActions.find(qa => qa.action === action)?.text || 'Quick action', sender: 'user' }));
    setTimeout(() => {
      dispatch(addMessage({ message: response, sender: 'bot' }));
    }, 500);
  };

  return (
    <div className="chatbot-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="chatbot-window"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-emerald-600 text-white rounded-t-lg">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <div>
                  <h3 className="font-semibold text-sm">{t('chatbot.title')}</h3>
                  <p className="text-xs text-emerald-100">{t('chatbot.online')}</p>
                </div>
              </div>
              <button
                onClick={() => dispatch(toggleChat())}
                className="hover:bg-emerald-700 rounded-full p-1 smooth-transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.action}
                    onClick={() => handleQuickAction(action.action)}
                    className="flex items-center space-x-2 p-2 text-xs bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg smooth-transition"
                  >
                    <action.icon className="w-3 h-3" />
                    <span>{action.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto max-h-64 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start space-x-2 ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    message.sender === 'bot' 
                      ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400' 
                      : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                  }`}>
                    {message.sender === 'bot' ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                  </div>
                  <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'bot'
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      : 'bg-emerald-600 text-white'
                  }`}>
                    {message.message}
                  </div>
                </motion.div>
              ))}
              
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-2"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                    <Bot className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t('chatbot.typeMessage')}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  disabled={loading}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || loading}
                  className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => dispatch(toggleChat())}
        className={`chatbot-toggle ${isOpen ? '' : 'relative overflow-hidden'}`}
      >
        {isOpen ? <X className="w-6 h-6" /> : 
          <motion.img 
            src='chatbotLogo.svg' 
            className="w-16 h-16"
            animate={{
              y: [0, -8, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        }
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-3 h-3  pulse-animation" />
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;