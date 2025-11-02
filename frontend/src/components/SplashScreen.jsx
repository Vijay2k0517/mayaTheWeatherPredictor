import { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun } from 'lucide-react';

const SplashScreen = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ddc5a3] via-[#c9b8a0] to-[#b8a892] overflow-hidden">
      <div className="text-center relative" data-testid="splash-screen">
        {/* Animated Weather Icons */}
        <div className="relative mb-8">
          <div 
            className={`absolute -top-12 -left-12 transition-all duration-1000 ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            <Sun className="w-16 h-16 text-yellow-500" style={{ animation: 'float 3s ease-in-out infinite' }} />
          </div>
          
          <div 
            className={`absolute -top-8 -right-8 transition-all duration-1000 ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
            style={{ animationDelay: '0.4s' }}
          >
            <Cloud className="w-12 h-12 text-white/70" style={{ animation: 'float 4s ease-in-out infinite 0.5s' }} />
          </div>
          
          <div 
            className={`absolute top-0 -right-16 transition-all duration-1000 ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
            style={{ animationDelay: '0.6s' }}
          >
            <CloudRain className="w-10 h-10 text-blue-400" style={{ animation: 'float 3.5s ease-in-out infinite 1s' }} />
          </div>
          
          {/* Maya Logo */}
          <div 
            className={`w-32 h-32 mx-auto bg-gradient-to-br from-[#342721] to-[#5a453a] rounded-full flex items-center justify-center shadow-2xl transition-all duration-1000 ${
              animate ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
            data-testid="maya-logo"
          >
            <span className="text-5xl font-bold text-[#ddc5a3]">M</span>
          </div>
        </div>

        {/* Text */}
        <h1 
          className={`text-5xl font-bold text-[#342721] mb-3 transition-all duration-1000 delay-300 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          data-testid="splash-title"
        >
          Maya
        </h1>
        
        <p 
          className={`text-xl text-[#5a453a] mb-6 transition-all duration-1000 delay-500 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          data-testid="splash-subtitle"
        >
          Your Tamil Nadu Weather Companion
        </p>
        
        <div 
          className={`flex items-center justify-center space-x-2 transition-all duration-1000 delay-700 ${
            animate ? 'opacity-100' : 'opacity-0'
          }`}
          data-testid="splash-loading"
        >
          <div className="w-2 h-2 bg-[#342721] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-[#342721] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-[#342721] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        <p className="mt-4 text-sm text-[#5a453a]/70">Initializing Weather Intelligence...</p>
      </div>
    </div>
  );
};

export default SplashScreen;