import { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, Send } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { weatherService } from '@/api/services';

const VoiceAssistant = ({ isOpen, onClose, language, currentCity, currentWeather, onListeningChange }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'ta' ? 'ta-IN' : 'en-IN';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSendMessage(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        onListeningChange(false);
        toast.error('Voice recognition failed');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        onListeningChange(false);
      };
    }

    // Welcome message
    const welcomeMsg = language === 'ta'
      ? 'வணக்கம்! நான் Maya. உங்கள் வானிலை உதவியாளர். நான் உங்களுக்கு எப்படி உதவ முடியும்?'
      : 'Hello! I\'m Maya, your weather assistant. How can I help you today?';
    
    setMessages([{ text: welcomeMsg, sender: 'assistant' }]);

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      synthRef.current.cancel();
    };
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsListening(true);
        onListeningChange(true);
      } catch (error) {
        console.error('Error starting recognition:', error);
        toast.error('Failed to start voice recognition');
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      onListeningChange(false);
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  const handleSendMessage = async (text = inputText) => {
    if (!text.trim()) return;

    const userMessage = { text, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    try {
      const context = {
        city: currentCity,
        weather: currentWeather
      };

      const data = await weatherService.chat(text, language, context);

      const assistantMessage = { text: data.response, sender: 'assistant' };
      setMessages((prev) => [...prev, assistantMessage]);
      speak(data.response);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMsg = language === 'ta'
        ? 'மன்னிக்கவும், எனக்கு இப்போது சிக்கல் உள்ளது.'
        : 'Sorry, I\'m having trouble right now.';
      setMessages((prev) => [...prev, { text: errorMsg, sender: 'assistant' }]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" data-testid="voice-assistant-modal">
      <Card className="w-full max-w-2xl h-[600px] bg-[#ddc5a3] border-2 border-[#342721] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#342721]/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#342721] to-[#5a453a] rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-[#ddc5a3]">M</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#342721]" data-testid="assistant-title">Maya</h3>
              <p className="text-sm text-[#5a453a]" data-testid="assistant-status">
                {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Ready'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-[#342721] hover:bg-[#342721]/10"
            data-testid="close-assistant-btn"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" data-testid="messages-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              data-testid={`message-${msg.sender}-${index}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-[#342721] text-white'
                    : 'bg-white/50 text-[#342721] backdrop-blur-sm'
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[#342721]/20">
          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              onClick={isListening ? stopListening : startListening}
              className={`${
                isListening
                  ? 'bg-red-600 hover:bg-red-700 voice-pulse'
                  : 'bg-[#342721] hover:bg-[#5a453a]'
              } text-white`}
              data-testid="voice-record-btn"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={language === 'ta' ? 'செய்தி எழுதுங்கள்...' : 'Type a message...'}
              className="flex-1 bg-white/50 border-[#342721]/20 focus:border-[#342721]"
              data-testid="message-input"
            />
            
            <Button
              size="icon"
              onClick={() => handleSendMessage()}
              className="bg-[#342721] hover:bg-[#5a453a] text-white"
              data-testid="send-message-btn"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VoiceAssistant;