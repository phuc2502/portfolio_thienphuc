
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

interface Track {
  artist: string;
  title: string;
  start: string;
  end: string;
  url?: string;
}

interface Release {
  name: string;
  tracks: Track[];
}

const Releases: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);

  const releases: Release[] = [
    {
      name: "BA CORE EXPERTISE",
      tracks: [
        {
          artist: "REQUIREMENTS",
          title: "BRD, SRS, USE CASES & DIAGRAMS",
          start: "CORE",
          end: "DOC",
          url: "https://github.com/phuc2502/ba-resources/tree/main/requirements"
        },
        {
          artist: "MODELING",
          title: "UML, USER STORIES & AC",
          start: "SPEC",
          end: "REQ"
        },
        {
          artist: "PROCESSES",
          title: "BPMN, SDLC (WATERFALL/AGILE)",
          start: "FLOW",
          end: "MAP",
          url: "https://www.lucidchart.com"
        },
        {
          artist: "VALIDATION",
          title: "UAT TEST SCENARIOS & DECISION TABLE",
          start: "TEST",
          end: "SIGN"
        },
      ]
    },
    {
      name: "DATA & TECH STACK",
      tracks: [
        {
          artist: "ANALYTICS",
          title: "POWER BI & DATA VISUALS",
          start: "DASH",
          end: "INS"
        },
        {
          artist: "DATABASE",
          title: "SQL (DDL, DML, DQL)",
          start: "PRO",
          end: "QUERY"
        },
        {
          artist: "DEV BASICS",
          title: "PYTHON & PROGRAMMING",
          start: "CODE",
          end: "BASE"
        },
        {
          artist: "SYSTEMS",
          title: "API DOCUMENT & TESTING",
          start: "SYNC",
          end: "TECH"
        },
      ]
    },
    {
      name: "TOOLS & FRAMEWORKS",
      tracks: [
        { artist: "MANAGEMENT", title: "JIRA, CONFLUENCE, NOTION", start: "TASK", end: "DEL" },
        { artist: "DESIGN", title: "DRAW.IO, LUCIDCHART, FIGMA", start: "VIS", end: "IDE" },
        { artist: "OFFICE", title: "EXCEL (PIVOT, VLOOKUP)", start: "DATA", end: "CALC" },
        { artist: "BACKEND", title: "POSTMAN, VISUAL PARADIGM", start: "API", end: "TEST" },
      ]
    },
    {
      name: "PROFESSIONAL CORE",
      tracks: [
        { artist: "STRATEGY", title: "ANALYTICAL THINKING", start: "MIND", end: "SOLV" },
        { artist: "COMMUNICATION", title: "STAKEHOLDER COMMUNICATION", start: "MGMT", end: "COLL" },
        { artist: "ELICITATION", title: "REQUIREMENT ELICITATION", start: "COMM", end: "EXEC" },
        { artist: "DOCUMENTATION", title: "REQUIREMENT DOCUMENTATION", start: "DOC", end: "SPEC" },
      ]
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate header
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 90%',
            once: true
          }
        }
      );
    }

    // Animate each release section
    const releaseSections = containerRef.current?.querySelectorAll('.release-section');
    releaseSections?.forEach((section, index) => {
      gsap.fromTo(section,
        {
          opacity: 0,
          y: 60,
          clipPath: 'inset(20% 0% 20% 0%)'
        },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          delay: index * 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // Animate tracks with stagger
    const tracks = containerRef.current?.querySelectorAll('.track-item');
    tracks?.forEach((track, index) => {
      gsap.fromTo(track,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.05 * (index % 4),
          ease: "power3.out",
          scrollTrigger: {
            trigger: track,
            start: 'top 90%',
            once: true
          }
        }
      );
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  return (
    <div ref={containerRef} className="px-6 md:px-12 max-w-screen-2xl mx-auto py-12 md:py-20">
      {/* Table Header */}
      <div ref={headerRef} className="hidden lg:grid grid-cols-12 mono text-[11px] font-bold text-white/20 border-b border-white/5 pb-6 mb-12 tracking-[0.5em]">
        <div className="col-span-3 uppercase">Domain Category</div>
        <div className="col-span-6 uppercase">Specialization & Competencies</div>
        <div className="col-span-3 text-right uppercase">Stage // Link</div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-16 md:space-y-24 lg:space-y-32"
      >
        {releases.map((release, rIdx) => (
          <motion.div
            key={rIdx}
            variants={itemVariants}
            className="release-section grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 border-b border-white/5 lg:border-none pb-12 lg:pb-0"
          >
            {/* Left Column: Category Name */}
            <div className="lg:col-span-3">
              <motion.h3
                className="mono text-sm md:text-base lg:text-lg font-black text-white tracking-[0.4em] uppercase opacity-40 lg:opacity-100 italic relative overflow-hidden"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <span className="relative z-10">{release.name}</span>
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-white/40 to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: '60%' }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                />
              </motion.h3>
            </div>

            {/* Right Column: Skills List */}
            <div className="lg:col-span-9 space-y-8 lg:space-y-6">
              {release.tracks.map((track, tIdx) => {
                const trackId = `${rIdx}-${tIdx}`;
                const isHovered = hoveredTrack === trackId;

                return (
                  <motion.div
                    key={tIdx}
                    className="track-item grid grid-cols-1 lg:grid-cols-9 gap-2 lg:gap-0 group cursor-default relative"
                    onHoverStart={() => setHoveredTrack(trackId)}
                    onHoverEnd={() => setHoveredTrack(null)}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {/* Hover background glow */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          className="absolute -inset-4 bg-gradient-to-r from-white/[0.03] to-transparent rounded-lg -z-10"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="lg:col-span-7 flex flex-col md:flex-row md:items-center gap-2 md:gap-5">
                      {/* Primary Skill Label */}
                      <motion.span
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tighter text-white/70 group-hover:text-white transition-colors duration-500 uppercase leading-none"
                        animate={{
                          scale: isHovered ? 1.02 : 1,
                          letterSpacing: isHovered ? '-0.02em' : '-0.05em'
                        }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      >
                        {track.artist}
                      </motion.span>

                      {/* Competency Details */}
                      <motion.span
                        className="mono text-[11px] md:text-[13px] lg:text-[15px] font-medium opacity-50 group-hover:opacity-90 transition-all duration-500 uppercase tracking-[0.1em]"
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      >
                        {track.title}
                      </motion.span>
                    </div>

                    {/* Proficiency Metadata or Link */}
                    <div className="lg:col-span-2 lg:text-right self-center">
                      {track.url ? (
                        <motion.a
                          href={track.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mono text-[10px] md:text-[12px] inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-white/30 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-500 uppercase tracking-widest font-bold group/link"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {track.start} // {track.end}
                          <motion.svg
                            className="w-2 h-2 opacity-0 group-hover/link:opacity-100"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ x: isHovered ? 2 : 0, y: isHovered ? -2 : 0 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </motion.svg>
                        </motion.a>
                      ) : (
                        <motion.span
                          className="mono text-[10px] md:text-[12px] opacity-50 group-hover:opacity-80 tracking-[0.3em] font-bold transition-opacity"
                          animate={{ opacity: isHovered ? 0.9 : 0.5 }}
                        >
                          {track.start} // {track.end}
                        </motion.span>
                      )}
                    </div>

                    {/* Animated underline */}
                    <motion.div
                      className="col-span-full h-[1px] mt-4 hidden lg:block overflow-hidden"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isHovered ? 1 : 0.3 }}
                      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                      style={{ originX: 0 }}
                    >
                      <div className={`h-full w-full ${isHovered ? 'bg-gradient-to-r from-white/30 via-white/10 to-transparent' : 'bg-white/[0.05]'} transition-colors duration-500`} />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Releases;
