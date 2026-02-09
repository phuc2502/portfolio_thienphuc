
import React from 'react';

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

  return (
    <div className="px-6 md:px-12 max-w-screen-2xl mx-auto py-12 md:py-20">
      {/* Table Header */}
      <div className="hidden lg:grid grid-cols-12 mono text-[11px] font-bold text-white/20 border-b border-white/5 pb-6 mb-12 tracking-[0.5em]">
        <div className="col-span-3 uppercase">Domain Category</div>
        <div className="col-span-6 uppercase">Specialization & Competencies</div>
        <div className="col-span-3 text-right uppercase">Stage // Link</div>
      </div>

      <div className="space-y-16 md:space-y-24 lg:space-y-32">
        {releases.map((release, rIdx) => (
          <div key={rIdx} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 border-b border-white/5 lg:border-none pb-12 lg:pb-0">
            {/* Left Column: Category Name */}
            <div className="lg:col-span-3">
              <h3 className="mono text-sm md:text-base lg:text-lg font-black text-white tracking-[0.4em] uppercase opacity-40 lg:opacity-100 italic">
                {release.name}
              </h3>
            </div>

            {/* Right Column: Skills List */}
            <div className="lg:col-span-9 space-y-8 lg:space-y-6">
              {release.tracks.map((track, tIdx) => (
                <div key={tIdx} className="grid grid-cols-1 lg:grid-cols-9 gap-2 lg:gap-0 group cursor-default">
                  <div className="lg:col-span-7 flex flex-col md:flex-row md:items-center gap-2 md:gap-5">
                    {/* Primary Skill Label - Increased base visibility */}
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tighter text-white/70 group-hover:text-white transition-all duration-500 uppercase leading-none">
                      {track.artist}
                    </span>

                    {/* Competency Details - Increased base visibility */}
                    <span className="mono text-[11px] md:text-[13px] lg:text-[15px] font-medium opacity-50 group-hover:opacity-80 transition-opacity duration-500 uppercase tracking-[0.1em]">
                      {track.title}
                    </span>
                  </div>

                  {/* Proficiency Metadata or Link - Increased base visibility */}
                  <div className="lg:col-span-2 lg:text-right self-center">
                    {track.url ? (
                      <a
                        href={track.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono text-[10px] md:text-[12px] inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-white/30 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-500 uppercase tracking-widest font-bold group/link"
                      >
                        {track.start} // {track.end}
                        <svg
                          className="w-2 h-2 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <span className="mono text-[10px] md:text-[12px] opacity-50 group-hover:opacity-80 tracking-[0.3em] font-bold transition-opacity">
                        {track.start} // {track.end}
                      </span>
                    )}
                  </div>

                  {/* Subtle underline */}
                  <div className="col-span-full h-[1px] bg-white/[0.05] mt-4 group-hover:bg-white/[0.15] transition-colors hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Releases;
