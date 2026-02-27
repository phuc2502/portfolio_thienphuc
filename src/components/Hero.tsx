
import React, { useState, useEffect } from 'react';
import HeroVideoPlayer from './HeroVideoPlayer';

interface HeroProps {
  closeVideoTrigger?: number;
}

const Hero: React.FC<HeroProps> = ({ closeVideoTrigger }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Close video when trigger changes (navigation from menu)
  useEffect(() => {
    if (closeVideoTrigger && closeVideoTrigger > 0) {
      setIsVideoOpen(false);
    }
  }, [closeVideoTrigger]);

  // Use images from components/img/ folder
  const heroImageUrl = new URL('./img/avt1.png', import.meta.url).href;
  const videoUrl = new URL('./img/video.mp4', import.meta.url).href;

  return (
    <div className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Section */}
      <div className="absolute inset-0 z-0 animate-fade-in">
        <img
          src={heroImageUrl}
          alt="Hero Background"
          className="w-full h-full object-cover grayscale opacity-[0.67]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/40" />
      </div>

      {/* Animated grain overlay */}
      <div className="absolute inset-0 z-[5] opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Top Metadata */}
      <div className="absolute top-12 left-0 w-full px-6 md:px-12 z-20 flex justify-between items-start pointer-events-none animate-slide-in-left" style={{ animationDelay: '0.5s' }}>
        <div className="mono text-[7px] md:text-[9px] text-white/30 tracking-[0.5em] uppercase leading-relaxed">
          <p className="mb-1 text-white/10">PROJECT EDITION</p>
          <p className="font-bold">SYSTEM ARCHITECT ©2024</p>
        </div>
        <div />
      </div>

      {/* Main Title Section */}
      <div className="relative z-10 w-full flex flex-col items-center mt-[35vh] md:mt-[40vh]">
        <p className="mono text-[8px] md:text-[11px] tracking-[0.7em] mb-6 opacity-40 uppercase font-black text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          Business Analyst / MIS Specialist
        </p>

        <div className="w-full overflow-hidden flex justify-center px-4">
          <h1
            className="text-[13vw] sm:text-[14vw] md:text-[16vw] font-black tracking-[-0.08em] select-none uppercase text-center text-white leading-[0.75] whitespace-nowrap drop-shadow-2xl flex items-baseline justify-center"
            style={{
              textShadow: '0 0 80px rgba(255,255,255,0.1), 0 0 160px rgba(255,255,255,0.05)'
            }}
          >
            {/* THIEN - each letter drops */}
            {'THIEN'.split('').map((char, i) => (
              <span
                key={`thien-${i}`}
                className="inline-block animate-drop-from-sky"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                {char}
              </span>
            ))}
            {/* Space between words */}
            <span className="inline-block w-[0.2em]"></span>
            {/* PHUC - each letter drops */}
            {'PHUC'.split('').map((char, i) => (
              <span
                key={`phuc-${i}`}
                className="inline-block animate-drop-from-sky"
                style={{ animationDelay: `${0.5 + i * 0.08}s` }}
              >
                {char}
              </span>
            ))}
            <span className="text-[2.5vw] opacity-10 italic ml-2 align-top font-light animate-fade-in" style={{ animationDelay: '1.2s' }}>®</span>
          </h1>
        </div>

        {/* Action Button */}
        <div
          onClick={() => setIsVideoOpen(true)}
          className="mt-10 md:mt-16 flex flex-col items-center gap-4 group cursor-pointer pointer-events-auto animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="relative w-16 h-16 md:w-18 md:h-18 flex items-center justify-center">
            {/* Outer glow */}
            <div className="absolute inset-[-8px] bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Animated rotating ring */}
            <div
              className="absolute inset-[-4px] rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)',
                animation: 'spin 4s linear infinite'
              }}
            />

            {/* Outer ring pulse */}
            <div className="absolute inset-0 border-2 border-white/10 rounded-full animate-ping opacity-30"
              style={{ animationDuration: '2s' }} />

            {/* Secondary ring */}
            <div className="absolute inset-1 border border-white/20 rounded-full group-hover:scale-110 transition-transform duration-700" />

            {/* Main button with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-full border border-white/30 group-hover:bg-white/50 group-hover:border-white/60 group-hover:scale-110 transition-all duration-500 ease-out" />

            {/* Play icon */}
            <div className="relative z-10 flex items-center justify-center">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black/80 transition-colors duration-500 ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          <p className="mono text-[9px] md:text-[10px] tracking-[0.4em] opacity-40 group-hover:opacity-100 uppercase transition-all duration-700 group-hover:tracking-[0.6em] font-medium">
            Play Video
          </p>
        </div>
      </div>

      {/* Bottom status */}
      <div className="absolute bottom-12 right-12 z-20 hidden md:block animate-slide-in-right" style={{ animationDelay: '0.7s' }}>
        <div className="mono text-[8px] text-right text-white/10 tracking-widest uppercase">
          <p className="mb-1">STATUS</p>
          <p className="font-bold text-white/30">SENIOR STUDENT</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 animate-bounce" style={{ animationDuration: '2s' }}>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
        <span className="mono text-[7px] tracking-[0.4em] opacity-20 uppercase">Scroll</span>
      </div>

      {/* Fullscreen Video Player */}
      {isVideoOpen && (
        <HeroVideoPlayer
          videoUrl={videoUrl}
          onBack={() => setIsVideoOpen(false)}
        />
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes drop-from-sky {
          0% {
            opacity: 0;
            transform: translateY(-200px) scale(1.2);
            filter: blur(10px);
          }
          60% {
            opacity: 1;
            transform: translateY(20px) scale(0.98);
            filter: blur(0px);
          }
          80% {
            transform: translateY(-10px) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 1.5s ease-out forwards;
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fade-in-up 1s ease-out forwards;
        }
        .animate-slide-in-left {
          opacity: 0;
          animation: slide-in-left 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          opacity: 0;
          animation: slide-in-right 0.8s ease-out forwards;
        }
        .animate-drop-from-sky {
          opacity: 0;
          animation: drop-from-sky 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;
