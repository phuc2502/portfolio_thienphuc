
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Story: React.FC = () => {
  const storyImageUrl = new URL('./img/anh.jpg', import.meta.url).href;
  const img1Ref = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const backgroundTextRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Background text parallax
    if (backgroundTextRef.current) {
      gsap.fromTo(backgroundTextRef.current,
        { x: '-10%' },
        {
          x: '10%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          }
        }
      );
    }

    // Image container reveal with clip-path
    if (imageContainerRef.current) {
      gsap.fromTo(imageContainerRef.current,
        {
          clipPath: 'inset(100% 0% 0% 0%)',
          opacity: 0
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.8,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    // Smooth parallax on image
    if (img1Ref.current) {
      gsap.fromTo(img1Ref.current,
        { y: '8%', scale: 1.1 },
        {
          y: '-8%',
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: img1Ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          }
        }
      );
    }

    // Badge animation
    if (badgeRef.current) {
      gsap.fromTo(badgeRef.current,
        {
          scale: 0.8,
          opacity: 0,
          rotate: -5
        },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1,
          delay: 0.8,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top 70%',
            once: true
          }
        }
      );
    }

    // Text container reveals with enhanced stagger
    if (textContainerRef.current) {
      const reveals = textContainerRef.current.querySelectorAll('.reveal');

      reveals.forEach((el, index) => {
        gsap.fromTo(el,
          {
            opacity: 0,
            y: 50,
            clipPath: 'inset(0% 0% 100% 0%)'
          },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            delay: index * 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: textContainerRef.current,
              start: 'top 75%',
              once: true
            }
          }
        );
      });
    }

    // Decorative line animation
    const decorLines = containerRef.current?.querySelectorAll('.decor-line');
    decorLines?.forEach((line, index) => {
      gsap.fromTo(line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          delay: index * 0.2 + 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: line,
            start: 'top 90%',
            once: true
          }
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} id="story-content" className="px-6 md:px-12 py-24 md:py-48 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      {/* Background Text Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] select-none z-0">
        <h2 ref={backgroundTextRef} className="text-[25vw] font-black italic tracking-tighter uppercase whitespace-nowrap">BRIDGE</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center max-w-screen-2xl mx-auto relative z-10">
        <div className="lg:col-span-5 lg:col-start-2 relative">
          <div ref={imageContainerRef} className="aspect-[3/4] bg-white/5 overflow-hidden rounded-lg border border-white/10 shadow-2xl relative group">
            <img
              ref={img1Ref}
              src={storyImageUrl}
              className="w-full h-[120%] object-cover object-center opacity-70 grayscale contrast-125 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-1000 ease-out"
              alt="Analytical focus"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30 opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
          {/* Floating Badge */}
          <div ref={badgeRef} className="absolute -bottom-6 -right-6 bg-white text-black p-6 hidden md:block rounded-lg shadow-2xl transform hover:scale-105 hover:rotate-2 transition-all duration-500 cursor-default">
            <p className="mono text-[8px] font-black tracking-[0.4em] uppercase">BA VISION 2026</p>
          </div>
          {/* Decorative corner lines */}
          <div className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-white/10 rounded-tl-lg hidden lg:block decor-line" style={{ transformOrigin: 'top left' }} />
        </div>

        <div ref={textContainerRef} className="lg:col-span-5 lg:col-start-8 space-y-12">
          <div className="space-y-4">
            <h3 className="reveal text-4xl md:text-6xl lg:text-7xl font-black italic tracking-tighter uppercase leading-[0.9] text-white relative overflow-hidden">
              MY <br />STORY
            </h3>
            <p className="reveal mono text-[10px] tracking-[0.5em] text-white/30 uppercase italic">Exploring the gap between logic and human needs</p>
          </div>

          <div className="space-y-8 max-w-xl">
            <p className="reveal text-lg md:text-2xl text-white/70 leading-relaxed font-light">
              I perceive complex systems not merely as static lines of code, but as a continuous, vital dialogue between <span className="text-white italic font-medium">people</span> and <span className="text-white italic font-medium">solutions</span>.
            </p>

            <p className="reveal text-lg md:text-2xl text-white/70 leading-relaxed font-light">
              With a foundation in the Banking sector, I have honed a meticulous approach to data analysis and a sharp eye for operational workflows. My mission is to decode intricate business challenges into <span className="underline decoration-white/30 underline-offset-8 decoration-2">streamlined and high-impact</span> technological blueprints.
            </p>
          </div>

          <div className="reveal pt-8 space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-[2px] bg-gradient-to-r from-white/40 to-transparent decor-line" style={{ transformOrigin: 'left' }} />
              <span className="mono text-[9px] tracking-[0.5em] uppercase text-white/40">Core Mission</span>
            </div>
            <p className="text-sm md:text-base font-bold italic tracking-tight opacity-100 text-white/90 pl-6 border-l-2 border-white/20">
              "Translating organizational chaos into absolute clarity, and business hurdles into technical innovation."
            </p>
          </div>

          {/* Quick Stats for BA Intern */}
          <div className="reveal grid grid-cols-2 gap-8 pt-12 border-t border-white/10">
            <div className="group cursor-default">
              <p className="mono text-[8px] opacity-30 uppercase mb-2 group-hover:opacity-50 transition-opacity">Requirement Strategy</p>
              <p className="text-xs font-bold tracking-widest uppercase group-hover:translate-x-1 transition-transform duration-300">Elicitation Focused</p>
            </div>
            <div className="group cursor-default">
              <p className="mono text-[8px] opacity-30 uppercase mb-2 group-hover:opacity-50 transition-opacity">Development Approach</p>
              <p className="text-xs font-bold tracking-widest uppercase italic group-hover:translate-x-1 transition-transform duration-300">User-Centric Architecture</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
