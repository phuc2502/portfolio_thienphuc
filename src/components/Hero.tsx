
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoPlayer from './VideoPlayer';

const Hero: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const metadataTopRef = useRef<HTMLDivElement>(null);
  const metadataBottomRef = useRef<HTMLDivElement>(null);
  const actionButtonRef = useRef<HTMLDivElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Sử dụng ảnh từ folder components/img/
  const heroImageUrl = new URL('./img/avt.jpg', import.meta.url).href;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ delay: 0.3 });

    // Initial entrance animations
    tl.fromTo(bgRef.current,
      { scale: 1.3, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
    )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 30, letterSpacing: '0.3em' },
        { opacity: 0.4, y: 0, letterSpacing: '0.7em', duration: 1.2, ease: "power4.out" },
        "-=1.5"
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power4.out" },
        "-=1"
      )
      .fromTo(actionButtonRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(metadataTopRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(metadataBottomRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

    // Scroll-based parallax for background
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 20,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }

    // Title scroll animation - smooth fade and rise
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        y: -80,
        opacity: 0.15,
        scale: 0.98,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      });
    }

    // Subtitle parallax
    if (subtitleRef.current) {
      gsap.to(subtitleRef.current, {
        y: -40,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '40% top',
          scrub: 1,
        },
      });
    }

    // Action button fade
    if (actionButtonRef.current) {
      gsap.to(actionButtonRef.current, {
        y: -20,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '30% top',
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Section */}
      <div ref={bgRef} className="absolute inset-0 z-0 opacity-0">
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
      <div ref={metadataTopRef} className="absolute top-12 left-0 w-full px-6 md:px-12 z-20 flex justify-between items-start pointer-events-none opacity-0">
        <div className="mono text-[7px] md:text-[9px] text-white/30 tracking-[0.5em] uppercase leading-relaxed">
          <p className="mb-1 text-white/10">PROJECT EDITION</p>
          <p className="font-bold">SYSTEM ARCHITECT ©2024</p>
        </div>
        <div />
      </div>

      {/* Main Title Section */}
      <div className="relative z-10 w-full flex flex-col items-center mt-[35vh] md:mt-[40vh]">
        <p ref={subtitleRef} className="mono text-[8px] md:text-[11px] tracking-[0.7em] mb-6 opacity-0 uppercase font-black text-center">
          Creative Strategist / MIS Specialist
        </p>

        <div className="w-full overflow-hidden flex justify-center px-4">
          <h1
            ref={titleRef}
            className="text-[13vw] sm:text-[14vw] md:text-[16vw] font-black tracking-[-0.08em] select-none uppercase text-center text-white leading-[0.75] whitespace-nowrap drop-shadow-2xl opacity-0"
            style={{
              textShadow: '0 0 80px rgba(255,255,255,0.1), 0 0 160px rgba(255,255,255,0.05)'
            }}
          >
            THIEN PHUC
            <span className="text-[2.5vw] opacity-10 italic ml-2 align-top font-light">®</span>
          </h1>
        </div>

        {/* Action Button */}
        <div
          ref={actionButtonRef}
          onClick={() => setIsVideoOpen(true)}
          className="mt-10 md:mt-16 flex flex-col items-center gap-4 group cursor-pointer pointer-events-auto opacity-0"
        >
          <div className="relative w-14 h-14 flex items-center justify-center">
            {/* Outer ring pulse */}
            <div className="absolute inset-0 border border-white/5 rounded-full animate-ping opacity-20"
              style={{ animationDuration: '3s' }} />
            {/* Main button */}
            <div className="absolute inset-0 border border-white/20 rounded-full group-hover:scale-125 group-hover:bg-white group-hover:border-white transition-all duration-700 ease-[0.23,1,0.32,1]" />
            <span className="mono text-[10px] font-black group-hover:text-black transition-colors duration-500 uppercase tracking-tighter relative z-10">PLAY</span>
          </div>
          <p className="mono text-[8px] tracking-[0.4em] opacity-20 group-hover:opacity-100 uppercase transition-all duration-700 group-hover:tracking-[0.6em]">
            Discover Story
          </p>
        </div>
      </div>

      {/* Bottom status */}
      <div ref={metadataBottomRef} className="absolute bottom-12 right-12 z-20 hidden md:block opacity-0">
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

      <VideoPlayer
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={new URL('./img/caythong.mp4', import.meta.url).href}
      />
    </div>
  );
};

export default Hero;
