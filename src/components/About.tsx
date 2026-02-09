
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Smooth entrance for the label
    if (labelRef.current) {
      gsap.fromTo(labelRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: labelRef.current,
            start: 'top 90%',
            once: true
          }
        }
      );
    }

    // Enhanced word-by-word reveal with smoother stagger
    if (textRef.current) {
      const words = textRef.current.querySelectorAll('.word');
      gsap.fromTo(words,
        { opacity: 0, y: 25, rotateX: 45 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.03,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }

    // Metadata slide in from left with delay
    if (metadataRef.current) {
      gsap.fromTo(metadataRef.current,
        { opacity: 0, x: -40, clipPath: 'inset(0% 100% 0% 0%)' },
        {
          opacity: 1,
          x: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          delay: 0.3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: metadataRef.current,
            start: 'top 90%',
            once: true
          }
        }
      );
    }

    // Image reveal with scale and clip-path
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        {
          scale: 1.1,
          opacity: 0,
          clipPath: 'inset(10% 10% 10% 10%)'
        },
        {
          scale: 1,
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    // Subtle parallax on image
    if (imageRef.current) {
      gsap.to(imageRef.current.querySelector('img'), {
        y: '-8%',
        ease: 'none',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
    }
  }, []);

  const bio = "Thien Phuc is a dedicated analyst at the Banking Academy of Vietnam. With a system analysis mindset and a passion for technology, Phuc focuses on optimizing business processes through data-driven insights and modern architectural solutions.";

  return (
    <div ref={containerRef} className="px-6 md:px-12 py-20 md:py-32 max-w-screen-2xl mx-auto border-t border-white/5 bg-[#0a0a0a]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-7">
          <p ref={labelRef} className="mono text-[8px] mb-8 opacity-20 tracking-[0.5em] uppercase flex items-center gap-4">
            <span className="w-6 h-[1px] bg-white/10"></span>
            CAPABILITY PROFILE
          </p>

          <div ref={textRef} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.4] tracking-tight text-white/90 mb-12" style={{ perspective: '1000px' }}>
            {bio.split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-[0.25em] word opacity-0" style={{ transformStyle: 'preserve-3d' }}>{word}</span>
            ))}
          </div>

          {/* Education Metadata Section */}
          <div ref={metadataRef} className="border-l-2 border-white/20 pl-8 py-4 backdrop-blur-sm bg-white/[0.02] rounded-r-lg">
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
          <div ref={imageRef} className="aspect-[16/9] bg-white/5 overflow-hidden rounded-lg relative border border-white/10 group shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"
              alt="Code"
              className="w-full h-[120%] object-cover grayscale opacity-40 group-hover:opacity-60 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 transform group-hover:translate-x-2 transition-transform duration-700">
              <span className="mono text-[7px] tracking-[0.6em] opacity-50 uppercase bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">System Intelligence</span>
            </div>
            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
