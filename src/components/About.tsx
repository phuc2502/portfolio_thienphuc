
import React from 'react';

const About: React.FC = () => {
  const bio = "Thien Phuc is a dedicated analyst at the Banking Academy of Vietnam. With a system analysis mindset and a passion for technology, Phuc focuses on optimizing business processes through data-driven insights and modern architectural solutions.";

  const words = bio.split(' ');

  return (
    <div className="px-6 md:px-12 py-20 md:py-32 max-w-screen-2xl mx-auto border-t border-white/5 bg-[#0a0a0a]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-7">
          <p className="mono text-[8px] mb-8 opacity-20 tracking-[0.5em] uppercase flex items-center gap-4 animate-about-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="w-6 h-[1px] bg-white/10"></span>
            CAPABILITY PROFILE
          </p>

          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.4] tracking-tight text-white/90 mb-12">
            {words.map((word, i) => (
              <span
                key={i}
                className="inline-block mr-[0.25em] animate-about-word"
                style={{ animationDelay: `${0.2 + i * 0.03}s` }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Education Metadata Section */}
          <div className="border-l-2 border-white/20 pl-8 py-4 backdrop-blur-sm bg-white/[0.02] rounded-r-lg animate-about-slide-in" style={{ animationDelay: '1.2s' }}>
            <p className="mono text-[8px] opacity-30 tracking-[0.4em] uppercase mb-3 italic">Academic Background</p>
            <div className="space-y-2">
              <p className="mono text-[11px] md:text-sm font-bold text-white tracking-widest uppercase italic">
                Management Information Systems (MIS)
              </p>
              <p className="mono text-[9px] md:text-[11px] text-white/50 tracking-[0.3em] uppercase">
                Banking Academy of Vietnam // GPA: 3.3/4.0
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="aspect-[16/9] bg-white/5 overflow-hidden rounded-lg relative border border-white/10 group shadow-2xl animate-about-image" style={{ animationDelay: '0.5s' }}>
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"
              alt="Code"
              className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 transform group-hover:translate-x-2 transition-transform duration-500">
              <span className="mono text-[7px] tracking-[0.6em] opacity-50 uppercase bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">System Intelligence</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes about-fade-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 0.2; transform: translateX(0); }
        }
        @keyframes about-word {
          from { 
            opacity: 0; 
            transform: translateY(20px);
            filter: blur(4px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
            filter: blur(0);
          }
        }
        @keyframes about-slide-in {
          from { 
            opacity: 0; 
            transform: translateX(-30px);
            clip-path: inset(0 100% 0 0);
          }
          to { 
            opacity: 1; 
            transform: translateX(0);
            clip-path: inset(0 0 0 0);
          }
        }
        @keyframes about-image {
          from { 
            opacity: 0; 
            transform: scale(0.95);
            clip-path: inset(10% 10% 10% 10%);
          }
          to { 
            opacity: 1; 
            transform: scale(1);
            clip-path: inset(0 0 0 0);
          }
        }
        .animate-about-fade-in {
          opacity: 0;
          animation: about-fade-in 0.8s ease-out forwards;
        }
        .animate-about-word {
          opacity: 0;
          animation: about-word 0.6s ease-out forwards;
        }
        .animate-about-slide-in {
          opacity: 0;
          animation: about-slide-in 0.8s ease-out forwards;
        }
        .animate-about-image {
          opacity: 0;
          animation: about-image 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default About;
