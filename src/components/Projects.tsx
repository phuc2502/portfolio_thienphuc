
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Outcome {
  label: string;
  value: string;
  desc: string;
}

interface AccordionSection {
  id: string;
  icon: string;
  title: string;
  content: {
    description?: string;
    items?: string[];
    subsections?: {
      title: string;
      content: string;
    }[];
    metricCards?: {
      value: string;
      label: string;
      description: string;
      color: 'green' | 'blue' | 'purple';
    }[];
    impactSections?: {
      title: string;
      icon: string;
      items: string[];
      bgColor?: string;
    }[];
    painPoints?: {
      icon: string;
      title: string;
      description: string;
    }[];
    businessImpact?: {
      label: string;
      description: string;
    }[];
    stakeholders?: {
      groupTitle: string;
      groupIcon: string;
      groupColor: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose' | 'cyan';
      items: {
        icon: string;
        title: string;
        role?: string;
        benefits?: string[];
        concerns?: string[];
        note?: string;
      }[];
    }[];
    comparisonTable?: {
      headers: string[];
      rows: {
        feature: string;
        values: string[];
      }[];
    };
    baActivities?: {
      title: string;
      icon: string;
      sections: {
        type: 'box' | 'twoColumn' | 'list';
        title?: string;
        bgColor?: string;
        items?: string[];
        columns?: {
          title: string;
          items: string[];
        }[];
        content?: string;
      }[];
    }[];
    challenges?: {
      title: string;
      icon: string;
      borderColor: 'orange' | 'purple' | 'blue';
      problem: string;
      solution: string[];
      outcome: string;
    }[];
  };
}

interface ProjectDetail {
  id: string;
  title: string;
  hoverTitle: string;
  cat: string;
  url: string;
  demoUrl?: string;
  repoUrl?: string;
  year: string;
  role: string;
  brief: string;
  strategy: string;
  technical: string;
  methodology: string[];
  ba_focus: string[];
  tech: string[];
  outcomes: Outcome[];
  accordionSections?: AccordionSection[];
  projectLinks?: {
    label: string;
    url: string;
    icon: 'github' | 'deploy' | 'figma';
  }[];
}

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayScrollRef = useRef<HTMLDivElement>(null);

  const items: ProjectDetail[] = [
    {
      id: "01",
      title: 'UNI WALLET',
      hoverTitle: 'UNI WALLET',
      cat: 'FINTECH',
      url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070',
      year: "2026",
      role: "Lead System Analyst",
      brief: "A core digital wallet platform designed to manage the full lifecycle of deposit and withdrawal transactions, ensuring real-time balance control, secure user authentication, and seamless bank integration within a scalable single-wallet architecture.",
      strategy: "Conducted an end-to-end audit of the transaction lifecycle. Streamlined payment gateway integrations and implemented asynchronous processing for improved scalability.",
      technical: "Designed robust API architectures for balance synchronization and transaction logging. Leveraged microservices to isolate core banking logic from the wallet front-end.",
      methodology: [
        "Business Process Mapping",
        "UML Sequence Modeling",
        "Sequence Diagrams",
        "Stakeholder Alignment Workshops"
      ],
      ba_focus: [
        "Requirement Engineering",
        "Process Flow Optimization",
        "User Story Mapping",
        "Risk Mitigation Strategies"
      ],
      tech: ["Fintech APIs", "System Architecture", "Security Protocols", "Node.js"],
      outcomes: [
        { label: "Stability", value: "99.99%", desc: "Ensured high availability for wallet operations." },
        { label: "Processing", value: "-40%", desc: "Reduced transaction settlement latency." },
        { label: "Automation", value: "High", desc: "Automated reconciliation processes." }
      ],
      projectLinks: [
        { label: "GitHub", url: "https://github.com/phuc2502/uniwallet_mvp", icon: "github" },
        { label: "Deploy MVP", url: "https://demouniwallet.vercel.app/#/login", icon: "deploy" },
        { label: "Figma MockUp", url: "https://www.figma.com/design/dVAzddJDxaUcpam5EJGPQa/UNI-WALLET?node-id=0-1&t=dj5WaFlzGTtmYXmk-1", icon: "figma" }
      ],
      accordionSections: [
        {
          id: "problem-opportunity",
          icon: "alert-triangle",
          title: "PROBLEM & OPPORTUNITY",
          content: {
            description: "Parents are the core user group of UniWallet, where the need for financial control and financial education for their children directly intersects with the product's core features. Children require a financial experience designed specifically for them — safe, intuitive, and educational. This user segment has largely been overlooked by the current market. The current digital financial ecosystem in Vietnam is built entirely for adult users, creating a significant market gap that UniWallet can fill.",
            painPoints: [
              {
                icon: "users",
                title: "1.1 Parents — Lack of Control Over Children's Spending",
                description: "Parents are unable to track where their children spend money or set weekly/monthly spending limits. The biggest risk is that children may spend on age-inappropriate content and develop uncontrolled spending habits early on. Potential risks: Spending on age-inappropriate digital content, loss of money due to in-app purchases or uncontrolled transactions, and formation of impulsive spending habits at an early age."
              },
              {
                icon: "chart",
                title: "1.2 Parents — Lack of Tools to Teach Financial Management",
                description: "Giving cash or transferring money does not create a learning mechanism or enable behavioral tracking. Parents lack an integrated tool that includes budget allocation, reward/penalty mechanisms, and spending reports. What is currently missing: Budget allocation tools (Spending / Saving / Goal), integrated financial reward and discipline mechanisms, and weekly/monthly spending behavior reports."
              },
              {
                icon: "shield",
                title: "1.3 Parents — Security Concerns",
                description: "Parents worry about data exposure, fraudulent transactions, or children spending beyond supervision. They require a clear Parent–Child authorization model, approval workflow, and age-based KYC control. Specific needs: Clear Parent–Child role hierarchy within the system, approval workflow for each child transaction, and tiered KYC and age-based transaction limits."
              },
              {
                icon: "heart",
                title: "2.1 Children — Lack of Understanding of Money Value",
                description: "Children cannot visualize how money 'disappears' through transactions and lack reporting tools to reflect on their spending behavior. Without clear feedback, they fail to develop awareness of money's value."
              },
              {
                icon: "dollar",
                title: "2.2 Children — Lack of Personal Money Management Tools",
                description: "Children are not equipped with tools to allocate money by purpose: Spending, Saving, or Goal-based saving. Without a structured framework, they tend to spend impulsively and struggle to build healthy financial habits."
              },
              {
                icon: "lock",
                title: "2.3 Children — Lack of a Safe Financial Experience",
                description: "When using adult wallets, children have no transaction limits, no age-appropriate guidance, and no built-in learning mechanisms. They need a financial environment designed specifically for them — both secure and educational."
              },
              {
                icon: "globe",
                title: "3.1 Market — Traditional E-Wallets Serve Only Adults",
                description: "Existing platforms such as MoMo, ZaloPay, and VNPay do not offer a Family Wallet model or account hierarchy by family structure. This gap means there is no product truly designed to support children's financial education journeys."
              },
              {
                icon: "database",
                title: "3.2 Market — Lack of Integrated Educational Mechanisms",
                description: "The market lacks features such as goal-based saving, reward systems, or age-specific spending behavior reports. This creates a significant gap between real family needs and what existing financial apps currently provide."
              },
              {
                icon: "alert",
                title: "3.3 Market — Compliance and Risk Control Limitations",
                description: "Current systems do not support tiered KYC, age-based transaction limits, or device binding specifically for children. This represents a serious gap in both legal compliance and minor user protection. Completely missing elements: A clear governance layer (Parent approval, Child sub-wallet), approval workflow for child transactions, integrated financial education dashboard, and international-standard sub-wallet architecture."
              }
            ],
            subsections: [
              {
                title: "4. Market Trends & Opportunity",
                content: "Financial literacy is now a critical life skill. Parents use allowances to teach saving; schools integrate finance into curricula. Gen Z & Gen Alpha adopt digital payments naturally — creating strong demand for a family-focused financial product."
              },
              {
                title: "5. Market Demand Analysis",
                content: "Globally, Family Wallet products (Greenlight, GoHenry, Step, Revolut <18) have matured over 5–10 years with proven demand. In Vietnam — 100M+ population, 70%+ smartphone penetration — no product offers a Parent–Child wallet hierarchy with governance and financial education. UniWallet is strategically positioned as the first-mover to capture this gap."
              }
            ],
            comparisonTable: {
              headers: ["Feature", "Greenlight (US)", "GoHenry (UK)", "Step (US)", "Revolut <18 (EU)", "UniWallet (VN)"],
              rows: [
                { feature: "Family Wallet", values: ["✅", "✅", "✅", "✅", "🚀 Building"] },
                { feature: "Parent–Child Hierarchy", values: ["✅", "✅", "❌", "✅", "🚀 Building"] },
                { feature: "Spending Limits", values: ["✅", "✅", "✅", "✅", "✅ MVP"] },
                { feature: "Transaction Monitoring", values: ["✅", "✅", "✅", "✅", "✅ MVP"] },
                { feature: "Financial Education", values: ["✅", "✅", "❌", "❌", "🚀 Planned"] },
                { feature: "Goal-Based Saving", values: ["✅", "✅", "❌", "❌", "🚀 Planned"] },
                { feature: "Multi-step KYC", values: ["✅", "✅", "✅", "✅", "✅ MVP"] },
                { feature: "Vietnam Market", values: ["❌", "❌", "❌", "❌", "✅ First-mover"] }
              ]
            },
            stakeholders: [
              {
                groupTitle: "🎯 Primary Stakeholders",
                groupIcon: "users",
                groupColor: "emerald",
                items: [
                  {
                    icon: "👨‍👩‍👧",
                    title: "Parents (Account Owner)",
                    role: "Family Account Controller",
                    benefits: ["Spending control", "Financial education", "Limit management", "Reports"],
                    concerns: ["Security", "Approval workflow", "Age restrictions", "Compliance"],
                    note: "Highest decision-making authority."
                  },
                  {
                    icon: "👶",
                    title: "Children (Sub-account User)",
                    role: "Sub-account User",
                    benefits: ["Own wallet", "Learn money management", "Safe financial environment"],
                    concerns: ["Easy UX", "Gamification", "Visual feedback"],
                    note: "Highest usage frequency."
                  }
                ]
              },
              {
                groupTitle: "🏦 Secondary Stakeholders",
                groupIcon: "globe",
                groupColor: "blue",
                items: [
                  { icon: "🏦", title: "Partner Banks" },
                  { icon: "🏛️", title: "Regulatory Authorities" },
                  { icon: "🛒", title: "Merchants & Partners" }
                ]
              },
              {
                groupTitle: "🧠 Internal Stakeholders",
                groupIcon: "target",
                groupColor: "purple",
                items: [
                  { icon: "🎯", title: "Product Owner" },
                  { icon: "📊", title: "Business Analyst" },
                  { icon: "💻", title: "Dev Team" },
                  { icon: "🧪", title: "QA / Tester" },
                  { icon: "⚖️", title: "Legal / Compliance" },
                  { icon: "🔒", title: "Security Team" }
                ]
              }
            ]
          }
        },
        {
          id: "ba-activities",
          icon: "target",
          title: "BUSINESS ANALYST ACTIVITIES",
          content: {
            baActivities: [
              {
                title: "Requirement Elicitation & Analysis",
                icon: "target",
                sections: [
                  {
                    type: "box",
                    title: "As-Is vs To-Be Analysis",
                    content: "Analyzed existing legacy workflows to identify bottlenecks. Proposed a new asynchronous event-driven architecture to decouple transaction logging from balance updates.",
                    bgColor: "blue"
                  },
                  {
                    type: "list",
                    title: "Key Deliverables",
                    items: [
                      "Detailed Use Case Specifications for Deposit/Withdraw",
                      "UML Activity Diagrams for Exception Handling",
                      "API Documentation for Third-party Gateways"
                    ]
                  }
                ]
              }
            ]
          }
        },
        {
          id: "challenges",
          icon: "wrench",
          title: "CHALLENGES & SOLUTIONS",
          content: {
            challenges: [
              {
                title: "Race Condition Management",
                icon: "alert-triangle",
                borderColor: "blue",
                problem: "Simultaneous balance updates led to 'dirty reads' and incorrect ledger entries.",
                solution: [
                  "Implemented optimistic locking mechanism at the database level.",
                  "Introduced a Redis-based distributed lock for critical transaction paths."
                ],
                outcome: "Zero balance discrepancies reported across 1M+ monthly transactions."
              }
            ]
          }
        },
        {
          id: "results",
          icon: "trending-up",
          title: "RESULTS & IMPACT",
          content: {
            metricCards: [
              {
                label: "Transaction Growth",
                value: "300%",
                description: "System successfully handled 3x more concurrent users.",
                color: "blue"
              },
              {
                label: "Support Tickets",
                value: "-65%",
                description: "Significant reduction in transaction-related complaints.",
                color: "green"
              }
            ]
          }
        }
      ]
    },
    {
      id: "02",
      title: 'UNDER DEVELOPMENT',
      hoverTitle: 'SECURITY PROTOCOL X',
      cat: 'SECURITY',
      url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000',
      year: "2026",
      role: "Security Consultant",
      brief: "An advanced cybersecurity initiative focused on implementing Zero Trust Architecture and enhanced identity management for enterprise environments.",
      strategy: "Phase 1 involves threat modeling and current-state vulnerability assessment. We are establishing foundational security policies before full-scale implementation.",
      technical: "Leveraging modern OAuth2 and OIDC standards for unified identity providers. Investigating biometrics as a secondary factor for administrative access.",
      methodology: [
        "NIST Framework Alignment",
        "Threat Modeling",
        "Security Audits"
      ],
      ba_focus: [
        "Compliance Gap Analysis",
        "IAM Policy Definition",
        "Security Requirement Elicitation"
      ],
      tech: ["Zero Trust", "OAuth2", "Cloud Security"],
      outcomes: [
        { label: "Status", value: "Planned", desc: "Currently in the requirements gathering phase." }
      ],
      accordionSections: [
        {
          id: "vision",
          icon: "alert-triangle",
          title: "VISION & OBJECTIVES",
          content: {
            description: "To transition from a perimeter-based security model to a dynamic identity-based model where no user or device is trusted by default, regardless of their location.",
            businessImpact: [
              { label: "Risk Mitigation", description: "Reduced lateral movement potential for attackers." },
              { label: "Compliance", description: "Meeting strict ISO 27001 and GDPR requirements." }
            ]
          }
        },
        {
          id: "strategy",
          icon: "target",
          title: "IMPLEMENTATION ROADMAP",
          content: {
            subsections: [
              {
                title: "Phase 1: Identity Foundation",
                content: "Centralizing all user identities into a single source of truth and enabling MFA across all internal applications."
              },
              {
                title: "Phase 2: Micro-segmentation",
                content: "Isolating high-value assets and applying granular access controls based on user role and device health."
              }
            ]
          }
        }
      ]
    }
  ];

  const categories = useMemo(() => ['ALL', ...new Set(items.map(item => item.cat))], [items]);
  const filteredItems = activeFilter === 'ALL' ? items : items.filter(item => item.cat === activeFilter);

  useEffect(() => {
    if (selectedProject) {
      // Fix: Use any-cast to bypass missing property error on window object for Lenis
      (window as any).lenis?.stop();
      document.body.style.overflow = 'hidden';
      if (overlayScrollRef.current) overlayScrollRef.current.scrollTop = 0;
      // Reset expanded sections when opening a new project
      setExpandedSections([]);
    } else {
      // Fix: Use any-cast to bypass missing property error on window object for Lenis
      (window as any).lenis?.start();
      document.body.style.overflow = '';
    }

    return () => {
      // Fix: Use any-cast to bypass missing property error on window object for Lenis
      (window as any).lenis?.start();
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const toggleAccordion = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleFilterClick = (cat: string) => {
    setActiveFilter(cat);
    // Fix: Use any-cast to bypass missing property error on window object for Lenis
    if (sectionRef.current && (window as any).lenis) {
      (window as any).lenis.scrollTo(sectionRef.current, { offset: -100 });
    }
  };

  const renderIcon = (iconType: string) => {
    const iconClass = "w-5 h-5 text-white/60";

    switch (iconType) {
      case 'alert-triangle':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'target':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z" />
          </svg>
        );
      case 'wrench':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'check-circle':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'trending-up':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={sectionRef} className="px-6 md:px-12 py-20 md:py-32 max-w-screen-2xl mx-auto scroll-mt-24">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8 border-b border-white/5 pb-12">
        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">PROJECTS</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className={`mono text-[9px] tracking-[0.3em] uppercase whitespace-nowrap transition-all duration-300 ${activeFilter === cat
                ? 'text-white opacity-100 italic'
                : 'text-white/60 hover:text-white hover:translate-x-1 hover:italic'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="space-y-24 md:space-y-40">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 60, clipPath: 'inset(10% 0% 10% 0%)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={{ opacity: 0, scale: 0.95, clipPath: 'inset(5% 0% 5% 0%)' }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              onClick={() => setSelectedProject(project)}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group cursor-pointer"
            >
              <motion.div
                className={`lg:col-span-8 aspect-[21/9] overflow-hidden bg-[#111] rounded-lg relative shadow-2xl ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              >
                <motion.img
                  src={project.url}
                  alt={project.title}
                  initial={{ scale: 1.1 }}
                  whileHover={{ scale: 1.15, opacity: 0.15 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]/30 group-hover:opacity-0 transition-opacity duration-700" />

                {/* Hover title with enhanced animation */}
                <div
                  className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                >
                  <h3
                    className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase italic tracking-tighter opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-100 scale-90 text-center w-full"
                    style={{ textShadow: '0 0 60px rgba(255,255,255,0.5), 0 0 120px rgba(255,255,255,0.2)' }}
                  >
                    {project.hoverTitle}
                  </h3>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/0 group-hover:border-white/30 transition-all duration-500 rounded-tl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/0 group-hover:border-white/30 transition-all duration-500 rounded-br-lg" />
              </motion.div>

              <div className={`lg:col-span-4 ${idx % 2 !== 0 ? 'lg:order-1 lg:text-right' : ''}`}>
                <motion.div
                  className={`flex items-center gap-3 mb-4 ${idx % 2 !== 0 ? 'justify-end' : ''}`}
                  initial={{ opacity: 0, x: idx % 2 !== 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="mono text-[10px] text-white/20 group-hover:text-white/40 transition-colors duration-500">{project.id}</span>
                  <div className="w-12 h-[1px] bg-white/10 group-hover:w-20 group-hover:bg-white/30 transition-all duration-700" />
                </motion.div>

                <motion.h4
                  className={`text-2xl md:text-4xl font-bold uppercase tracking-tight mb-4 opacity-30 group-hover:opacity-100 transition-all duration-700 ease-[0.215,0.61,0.355,1] ${idx % 2 !== 0
                    ? 'origin-right group-hover:-translate-x-4 group-hover:italic'
                    : 'origin-left group-hover:translate-x-4 group-hover:italic'
                    }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {project.title}
                </motion.h4>

                <p className="mono text-[9px] text-white/20 uppercase tracking-[0.4em] mb-6 group-hover:text-white/40 group-hover:tracking-[0.5em] transition-all duration-500">{project.cat} // {project.year}</p>

                <div className={`flex ${idx % 2 !== 0 ? 'justify-end' : ''}`}>
                  <motion.button
                    className="mono text-[8px] tracking-[0.3em] border border-white/10 px-6 py-3 rounded-full uppercase opacity-0 group-hover:opacity-80 transition-all duration-500 hover:bg-white hover:text-black hover:opacity-100 backdrop-blur-sm"
                    whileHover={{ scale: 1.1, x: idx % 2 !== 0 ? -5 : 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    VIEW CASE
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* DETAILED OVERLAY */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            ref={overlayScrollRef}
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            exit={{ clipPath: 'inset(100% 0 0 0)' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
            className="fixed inset-0 z-[300] bg-[#0a0a0a] overflow-y-auto px-6 py-10 md:p-12 lg:p-20 scroll-smooth"
          >
            <div className="max-w-screen-2xl mx-auto pb-40">
              <div className="flex justify-between items-start mb-20 md:mb-32">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="mono text-[10px] opacity-40 hover:opacity-100 transition-all uppercase tracking-widest border border-white/10 px-10 py-4 rounded-full hover:bg-white hover:text-black"
                >
                  [ RETURN TO GALLERY ]
                </button>
                <div className="text-right hidden md:block">
                  <p className="mono text-[10px] opacity-20 uppercase mb-2">INDEX NO.</p>
                  <p className="mono text-2xl font-black">#{selectedProject.id}</p>
                </div>
              </div>

              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-5xl sm:text-7xl md:text-[10vw] font-black tracking-tighter uppercase italic leading-[0.8] mb-12 text-white"
              >
                {selectedProject.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-8 mb-24 border-b border-white/5 pb-12"
              >
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 mono text-[10px] uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity"
                  >
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    LIVE DEMO
                    <svg className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                )}
                {selectedProject.repoUrl && (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 mono text-[10px] uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                    SOURCE CODE
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">[GITHUB]</span>
                  </a>
                )}
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32">
                <div className="lg:col-span-12 space-y-24">
                  {/* BRIEF SECTION */}
                  <section>
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-[1px] bg-white/20" />
                      <p className="mono text-[10px] opacity-40 tracking-[0.6em] uppercase">Context & Objectives</p>
                    </div>
                    <p className="text-2xl md:text-5xl font-light text-white leading-[1.15] tracking-tight">
                      {selectedProject.brief}
                    </p>
                  </section>

                  {/* PROJECT LINKS */}
                  {selectedProject.projectLinks && selectedProject.projectLinks.length > 0 && (
                    <section className="pt-6">
                      <div className="flex flex-wrap gap-4">
                        {selectedProject.projectLinks.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 px-5 py-3 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 transition-all duration-300"
                          >
                            {link.icon === 'github' && (
                              <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                            )}
                            {link.icon === 'deploy' && (
                              <svg className="w-5 h-5 text-white/60 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                            )}
                            {link.icon === 'figma' && (
                              <svg className="w-5 h-5 text-white/60 group-hover:text-purple-400 transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5zM12 2h3.5a3.5 3.5 0 110 7H12V2zm0 9.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0zM5 19.5A3.5 3.5 0 018.5 16H12v3.5a3.5 3.5 0 01-7 0zM5 12a3.5 3.5 0 013.5-3.5H12v7H8.5A3.5 3.5 0 015 12z" /></svg>
                            )}
                            <span className="mono text-xs uppercase tracking-[0.15em] text-white/60 group-hover:text-white transition-colors">{link.label}</span>
                            <svg className="w-3.5 h-3.5 text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* ACCORDION SECTIONS */}
                  {selectedProject.accordionSections && selectedProject.accordionSections.length > 0 && (
                    <section className="space-y-6 pt-10 border-t border-white/5">
                      <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-[1px] bg-white/20" />
                        <p className="mono text-[10px] opacity-40 tracking-[0.6em] uppercase">Project Breakdown</p>
                      </div>

                      <div className="space-y-4">
                        {selectedProject.accordionSections.map((section, idx) => {
                          const isExpanded = expandedSections.includes(section.id);

                          return (
                            <motion.div
                              key={section.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * idx }}
                              className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                            >
                              <button
                                onClick={() => toggleAccordion(section.id)}
                                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left group"
                              >
                                <div className="flex items-center gap-4 flex-1">
                                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:border-white/40 transition-colors">
                                    {renderIcon(section.icon)}
                                  </div>
                                  <h3 className="text-base md:text-xl font-bold uppercase tracking-tight text-white/80 group-hover:text-white transition-colors">
                                    {idx + 1}. {section.title}
                                  </h3>
                                </div>
                                <motion.svg
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="w-5 h-5 text-white/40 group-hover:text-white transition-colors"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </motion.svg>
                              </button>

                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-6 pb-6 pt-2 border-t border-white/5">
                                      {/* SCENARIO DESCRIPTION */}
                                      {section.content.description && (
                                        <div className="mb-8">
                                          {(() => {
                                            const colorThemes = {
                                              'FINTECH': { bg: 'bg-emerald-500', border: 'border-emerald-500', bgLight: 'bg-emerald-50' },
                                              'SECURITY': { bg: 'bg-blue-500', border: 'border-blue-500', bgLight: 'bg-blue-50' }
                                            };
                                            const theme = colorThemes[selectedProject.cat as keyof typeof colorThemes] || { bg: 'bg-white/20', border: 'border-white/20', bgLight: 'bg-white/5' };

                                            return (
                                              <>
                                                <h4 className="text-sm font-bold text-white/40 mb-3 flex items-center gap-2">
                                                  <span className={`w-1 h-4 ${theme.bg}/50 rounded`}></span>
                                                  Scenario:
                                                </h4>
                                                <div className={`pl-4 border-l-2 ${theme.border}/20 ${theme.bgLight}/5`}>
                                                  <p className="text-base md:text-lg text-white/70 leading-relaxed p-4">
                                                    {section.content.description}
                                                  </p>
                                                </div>
                                              </>
                                            );
                                          })()}
                                        </div>
                                      )}

                                      {/* PAIN POINTS GRID */}
                                      {section.content.painPoints && section.content.painPoints.length > 0 && (
                                        <div className="mb-8">
                                          {(() => {
                                            // Determine color theme based on project category
                                            const colorThemes = {
                                              'FINTECH': { accent: 'emerald', bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500' },
                                              'SECURITY': { accent: 'blue', bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500' }
                                            };
                                            const theme = colorThemes[selectedProject.cat as keyof typeof colorThemes] || { accent: 'white', bg: 'bg-white/20', text: 'text-white/60', border: 'border-white/20' };

                                            return (
                                              <>
                                                <h4 className="text-sm font-bold text-white/40 mb-6 flex items-center gap-2">
                                                  <span className={`w-1 h-4 ${theme.bg}/50 rounded`}></span>
                                                  Key Findings:
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                  {section.content.painPoints.map((point, i) => (
                                                    <div
                                                      key={i}
                                                      className="p-5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                                                    >
                                                      <div className="flex items-start gap-4">
                                                        <div className={`w-10 h-10 rounded-full ${theme.bg}/10 border ${theme.border}/20 flex items-center justify-center flex-shrink-0`}>
                                                          <span className={`${theme.text} text-lg`}>
                                                            {point.icon === 'users' && '👥'}
                                                            {point.icon === 'dollar' && '$'}
                                                            {point.icon === 'clock' && '⏱️'}
                                                            {point.icon === 'alert' && '⚠️'}
                                                            {point.icon === 'chart' && '📊'}
                                                            {point.icon === 'database' && '💾'}
                                                            {point.icon === 'shield' && '🛡️'}
                                                            {point.icon === 'heart' && '❤️'}
                                                            {point.icon === 'globe' && '🌍'}
                                                            {point.icon === 'trending-up' && '📈'}
                                                          </span>
                                                        </div>
                                                        <div className="flex-1">
                                                          <h5 className="text-sm md:text-base font-bold text-white/80 mb-2">
                                                            {point.title}
                                                          </h5>
                                                          <p className="text-xs md:text-sm text-white/50 leading-relaxed">
                                                            {point.description}
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  ))}
                                                </div>
                                              </>
                                            );
                                          })()}
                                        </div>
                                      )}

                                      {/* BUSINESS IMPACT */}
                                      {section.content.businessImpact && section.content.businessImpact.length > 0 && (
                                        <div className="mb-8">
                                          <h4 className="text-sm font-bold text-white/40 mb-4">Business Impact:</h4>
                                          <div className="p-5 rounded-lg bg-amber-50/5 border border-amber-500/20 space-y-3">
                                            {section.content.businessImpact.map((impact, i) => (
                                              <div key={i} className="text-sm md:text-base text-white/60">
                                                <span className="font-bold text-white/80">{impact.label}</span>{' '}
                                                {impact.description}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {/* STAKEHOLDERS */}
                                      {section.content.stakeholders && section.content.stakeholders.length > 0 && (
                                        <div className="mb-6">
                                          <h4 className="text-sm font-bold text-white/40 mb-6 flex items-center gap-2">
                                            <span className="w-1 h-4 bg-blue-500/50 rounded"></span>
                                            Stakeholder Analysis:
                                          </h4>
                                          <div className="space-y-6">
                                            {section.content.stakeholders.map((group, gi) => {
                                              const colorMap: Record<string, { border: string; bg: string; text: string; accent: string; tagBg: string; tagBorder: string; tagText: string }> = {
                                                'emerald': { border: 'border-emerald-500/30', bg: 'bg-emerald-500/5', text: 'text-emerald-400', accent: 'bg-emerald-500', tagBg: 'bg-emerald-500/10', tagBorder: 'border-emerald-500/30', tagText: 'text-emerald-300' },
                                                'blue': { border: 'border-blue-500/30', bg: 'bg-blue-500/5', text: 'text-blue-400', accent: 'bg-blue-500', tagBg: 'bg-blue-500/10', tagBorder: 'border-blue-500/30', tagText: 'text-blue-300' },
                                                'purple': { border: 'border-purple-500/30', bg: 'bg-purple-500/5', text: 'text-purple-400', accent: 'bg-purple-500', tagBg: 'bg-purple-500/10', tagBorder: 'border-purple-500/30', tagText: 'text-purple-300' },
                                                'amber': { border: 'border-amber-500/30', bg: 'bg-amber-500/5', text: 'text-amber-400', accent: 'bg-amber-500', tagBg: 'bg-amber-500/10', tagBorder: 'border-amber-500/30', tagText: 'text-amber-300' },
                                                'rose': { border: 'border-rose-500/30', bg: 'bg-rose-500/5', text: 'text-rose-400', accent: 'bg-rose-500', tagBg: 'bg-rose-500/10', tagBorder: 'border-rose-500/30', tagText: 'text-rose-300' },
                                                'cyan': { border: 'border-cyan-500/30', bg: 'bg-cyan-500/5', text: 'text-cyan-400', accent: 'bg-cyan-500', tagBg: 'bg-cyan-500/10', tagBorder: 'border-cyan-500/30', tagText: 'text-cyan-300' }
                                              };
                                              const colors = colorMap[group.groupColor] || colorMap['blue'];

                                              return (
                                                <div key={gi} className={`rounded-xl border ${colors.border} ${colors.bg} overflow-hidden`}>
                                                  {/* Group Header */}
                                                  <div className={`px-5 py-4 border-b ${colors.border} flex items-center gap-3`}>
                                                    <div className={`w-1 h-6 ${colors.accent} rounded-full`} />
                                                    <h5 className={`text-sm md:text-base font-bold ${colors.text} tracking-wide`}>
                                                      {group.groupTitle}
                                                    </h5>
                                                  </div>

                                                  {/* Group Items */}
                                                  <div className="divide-y divide-white/5">
                                                    {group.items.map((item, ii) => (
                                                      <div key={ii} className={`px-5 ${item.role ? 'py-5' : 'py-3'} hover:bg-white/[0.02] transition-colors`}>
                                                        <div className="flex items-start gap-4">
                                                          <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                                                          <div className="flex-1 min-w-0">
                                                            <h6 className={`text-sm md:text-base font-bold text-white/85 ${item.role ? 'mb-1' : 'mt-1'}`}>
                                                              {item.title}
                                                            </h6>

                                                            {item.role && (
                                                              <p className="text-xs text-white/40 mb-3 italic">
                                                                Role: {item.role}
                                                              </p>
                                                            )}

                                                            {(item.benefits || item.concerns) && (
                                                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                {/* Benefits */}
                                                                {item.benefits && item.benefits.length > 0 && (
                                                                  <div className="space-y-1.5">
                                                                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-1">Benefits</p>
                                                                    {item.benefits.map((b, bi) => (
                                                                      <div key={bi} className="flex items-start gap-2">
                                                                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${colors.accent}/60 flex-shrink-0`} />
                                                                        <span className="text-xs md:text-sm text-white/60">{b}</span>
                                                                      </div>
                                                                    ))}
                                                                  </div>
                                                                )}

                                                                {/* Concerns */}
                                                                {item.concerns && item.concerns.length > 0 && (
                                                                  <div className="space-y-1.5">
                                                                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-1">Concerns</p>
                                                                    {item.concerns.map((c, ci) => (
                                                                      <div key={ci} className="flex items-start gap-2">
                                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/60 flex-shrink-0" />
                                                                        <span className="text-xs md:text-sm text-white/60">{c}</span>
                                                                      </div>
                                                                    ))}
                                                                  </div>
                                                                )}
                                                              </div>
                                                            )}

                                                            {/* Note */}
                                                            {item.note && (
                                                              <div className={`mt-3 px-3 py-2 rounded-lg ${colors.tagBg} border ${colors.tagBorder}`}>
                                                                <p className={`text-xs ${colors.tagText} font-medium`}>→ {item.note}</p>
                                                              </div>
                                                            )}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    ))}
                                                  </div>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      )}

                                      {/* BA ACTIVITIES */}
                                      {section.content.baActivities && section.content.baActivities.length > 0 && (
                                        <div className="space-y-8">
                                          {section.content.baActivities.map((activity, actIdx) => (
                                            <div key={actIdx} className="space-y-4">
                                              <h3 className="text-base md:text-lg font-bold text-white/70 mb-4 flex items-center gap-2">
                                                {activity.title}
                                              </h3>

                                              {activity.sections.map((sec, secIdx) => {
                                                // Box type
                                                if (sec.type === 'box') {
                                                  const bgColors = {
                                                    blue: 'bg-blue-50/5 border-blue-500/20',
                                                    green: 'bg-emerald-50/5 border-emerald-500/20',
                                                    yellow: 'bg-amber-50/5 border-amber-500/20',
                                                    purple: 'bg-purple-50/5 border-purple-500/20',
                                                    amber: 'bg-orange-50/5 border-orange-500/20'
                                                  };
                                                  const bgClass = sec.bgColor ? bgColors[sec.bgColor as keyof typeof bgColors] : 'bg-white/[0.02] border-white/10';

                                                  return (
                                                    <div key={secIdx} className={`p-5 rounded-lg border ${bgClass}`}>
                                                      {sec.title && (
                                                        <h4 className="text-sm font-bold text-white/60 mb-3">{sec.title}</h4>
                                                      )}
                                                      {sec.content && (
                                                        <p className="text-sm md:text-base text-white/60 leading-relaxed">{sec.content}</p>
                                                      )}
                                                      {sec.items && (
                                                        <ul className="space-y-2">
                                                          {sec.items.map((item, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm md:text-base text-white/60">
                                                              <span className="text-white/40 mt-1">•</span>
                                                              <span>{item}</span>
                                                            </li>
                                                          ))}
                                                        </ul>
                                                      )}
                                                    </div>
                                                  );
                                                }

                                                // Two Column type
                                                if (sec.type === 'twoColumn' && sec.columns) {
                                                  return (
                                                    <div key={secIdx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                      {sec.columns.map((col, colIdx) => (
                                                        <div key={colIdx} className="p-5 rounded-lg border border-white/10 bg-white/[0.02]">
                                                          <h4 className="text-sm font-bold text-white/60 mb-3">{col.title}</h4>
                                                          <ul className="space-y-2">
                                                            {col.items.map((item, i) => (
                                                              <li key={i} className="flex items-start gap-3 text-sm md:text-base text-white/60">
                                                                <span className="text-white/40 mt-1">•</span>
                                                                <span>{item}</span>
                                                              </li>
                                                            ))}
                                                          </ul>
                                                        </div>
                                                      ))}
                                                    </div>
                                                  );
                                                }

                                                // List type
                                                if (sec.type === 'list') {
                                                  return (
                                                    <div key={secIdx} className="space-y-2">
                                                      {sec.title && (
                                                        <h4 className="text-sm font-bold text-white/40 mb-2">{sec.title}</h4>
                                                      )}
                                                      {sec.items && (
                                                        <ul className="space-y-2 pl-4">
                                                          {sec.items.map((item, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm md:text-base text-white/60">
                                                              <span className="text-white/40 mt-1">•</span>
                                                              <span>{item}</span>
                                                            </li>
                                                          ))}
                                                        </ul>
                                                      )}
                                                    </div>
                                                  );
                                                }

                                                return null;
                                              })}
                                            </div>
                                          ))}
                                        </div>
                                      )}

                                      {/* CHALLENGES */}
                                      {section.content.challenges && section.content.challenges.length > 0 && (
                                        <div className="space-y-6">
                                          {section.content.challenges.map((challenge, chIdx) => {
                                            const borderColors = {
                                              orange: 'border-l-orange-500/50',
                                              purple: 'border-l-purple-500/50',
                                              blue: 'border-l-blue-500/50'
                                            };
                                            const borderClass = borderColors[challenge.borderColor];

                                            return (
                                              <div key={chIdx} className={`border-l-4 ${borderClass} pl-6 space-y-4`}>
                                                <h3 className="text-base md:text-lg font-bold text-white/80 mb-4">
                                                  {challenge.title}
                                                </h3>

                                                {/* Problem */}
                                                <div className="bg-red-50/5 border border-red-500/20 p-4 rounded-lg">
                                                  <div className="flex items-start gap-2 mb-2">
                                                    <span className="text-red-400 font-bold text-sm">❌ Problem:</span>
                                                  </div>
                                                  <p className="text-sm md:text-base text-white/60 leading-relaxed">
                                                    {challenge.problem}
                                                  </p>
                                                </div>

                                                {/* Solution */}
                                                <div className="bg-amber-50/5 border border-amber-500/20 p-4 rounded-lg">
                                                  <div className="flex items-start gap-2 mb-3">
                                                    <span className="text-amber-400 font-bold text-sm">💡 Solution:</span>
                                                  </div>
                                                  <ul className="space-y-2">
                                                    {challenge.solution.map((sol, i) => (
                                                      <li key={i} className="flex items-start gap-3 text-sm md:text-base text-white/60">
                                                        <span className="text-white/40 mt-1">•</span>
                                                        <span>{sol}</span>
                                                      </li>
                                                    ))}
                                                  </ul>
                                                </div>

                                                {/* Outcome */}
                                                <div className="bg-emerald-50/5 border border-emerald-500/20 p-4 rounded-lg">
                                                  <div className="flex items-start gap-2 mb-2">
                                                    <span className="text-emerald-400 font-bold text-sm">✅ Outcome:</span>
                                                  </div>
                                                  <p className="text-sm md:text-base text-white/60 leading-relaxed">
                                                    {challenge.outcome}
                                                  </p>
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      )}

                                      {section.content.items && section.content.items.length > 0 && (
                                        <ul className="space-y-4">
                                          {section.content.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-4 group/item">
                                              <span className="w-2 h-2 mt-2 bg-blue-500/50 rounded-full flex-shrink-0 group-hover/item:bg-blue-500 group-hover/item:scale-125 transition-all" />
                                              <span className="text-sm md:text-base text-white/50 group-hover/item:text-white/80 transition-colors leading-relaxed">
                                                {item}
                                              </span>
                                            </li>
                                          ))}
                                        </ul>
                                      )}

                                      {section.content.subsections && section.content.subsections.length > 0 && (
                                        <div className="space-y-6">
                                          {section.content.subsections.map((subsection, i) => (
                                            <div key={i} className="pl-6 border-l-2 border-white/10">
                                              <h4 className="mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3 font-bold">
                                                {subsection.title}
                                              </h4>
                                              <p className="text-sm md:text-base text-white/60 leading-relaxed">
                                                {subsection.content}
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                      )}

                                      {/* COMPARISON TABLE */}
                                      {section.content.comparisonTable && (
                                        <div className="mt-8">
                                          <h4 className="mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4 font-bold">
                                            6. Competitive Comparison
                                          </h4>
                                          <div className="overflow-x-auto rounded-xl border border-white/10">
                                            <table className="w-full text-left" style={{ minWidth: '700px' }}>
                                              <thead>
                                                <tr className="bg-white/5">
                                                  {section.content.comparisonTable.headers.map((header, i) => (
                                                    <th
                                                      key={i}
                                                      className={`px-4 py-3 text-[10px] mono tracking-[0.2em] uppercase font-bold ${i === section.content.comparisonTable!.headers.length - 1
                                                        ? 'text-cyan-400'
                                                        : 'text-white/50'
                                                        }`}
                                                    >
                                                      {header}
                                                    </th>
                                                  ))}
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {section.content.comparisonTable.rows.map((row, i) => (
                                                  <tr
                                                    key={i}
                                                    className={`border-t border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''
                                                      } hover:bg-white/[0.06] transition-colors`}
                                                  >
                                                    <td className="px-4 py-3 text-xs text-white/70 font-medium">
                                                      {row.feature}
                                                    </td>
                                                    {row.values.map((val, j) => (
                                                      <td
                                                        key={j}
                                                        className={`px-4 py-3 text-xs text-center ${j === row.values.length - 1
                                                          ? 'text-cyan-400 font-semibold'
                                                          : 'text-white/50'
                                                          }`}
                                                      >
                                                        {val}
                                                      </td>
                                                    ))}
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      )}

                                      {/* METRIC CARDS */}
                                      {section.content.metricCards && section.content.metricCards.length > 0 && (
                                        <div className="space-y-4 mb-8">
                                          {section.content.metricCards.map((card, i) => {
                                            const bgColors = {
                                              green: 'bg-gradient-to-br from-green-500/90 to-green-600/90',
                                              blue: 'bg-gradient-to-br from-blue-500/90 to-blue-600/90',
                                              purple: 'bg-gradient-to-br from-purple-500/90 to-purple-600/90'
                                            };

                                            return (
                                              <div
                                                key={i}
                                                className={`${bgColors[card.color]} p-6 rounded-lg backdrop-blur-sm`}
                                              >
                                                <h4 className="text-4xl md:text-5xl font-black text-white mb-2">
                                                  {card.value}
                                                </h4>
                                                <p className="text-base md:text-lg font-semibold text-white/90 mb-1">
                                                  {card.label}
                                                </p>
                                                <p className="text-sm text-white/70">
                                                  {card.description}
                                                </p>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      )}

                                      {/* IMPACT SECTIONS */}
                                      {section.content.impactSections && section.content.impactSections.length > 0 && (
                                        <div className="space-y-6">
                                          {section.content.impactSections.map((impact, i) => {
                                            const bgColors = {
                                              yellow: 'bg-amber-50/5 border-amber-500/20',
                                              red: 'bg-red-50/5 border-red-500/20',
                                              green: 'bg-emerald-50/5 border-emerald-500/20',
                                              default: 'bg-white/[0.02] border-white/10'
                                            };

                                            const borderLeftColors = {
                                              yellow: 'border-l-amber-500/50',
                                              red: 'border-l-red-500/50',
                                              green: 'border-l-emerald-500/50',
                                              default: 'border-l-white/20'
                                            };

                                            const bgClass = impact.bgColor ? bgColors[impact.bgColor as keyof typeof bgColors] : bgColors.default;
                                            const borderClass = impact.bgColor ? borderLeftColors[impact.bgColor as keyof typeof borderLeftColors] : borderLeftColors.default;

                                            return (
                                              <div
                                                key={i}
                                                className={`p-4 md:p-6 rounded-lg border ${bgClass} border-l-4 ${borderClass}`}
                                              >
                                                <h4 className="text-sm md:text-base font-bold text-white/80 mb-4 flex items-center gap-2">
                                                  {impact.title}
                                                </h4>
                                                <ul className="space-y-3">
                                                  {impact.items.map((item, j) => (
                                                    <li key={j} className="flex items-start gap-3 text-sm md:text-base text-white/60 leading-relaxed">
                                                      <span className="text-white/40 mt-1">•</span>
                                                      <span>{item}</span>
                                                    </li>
                                                  ))}
                                                </ul>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          );
                        })}
                      </div>
                    </section>
                  )}

                  {/* ANALYSIS & METHODOLOGY GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-10 border-t border-white/5">
                    {/* NEW METHODOLOGY SECTION */}
                    <section className="space-y-10">
                      <div className="flex items-center gap-4">
                        <span className="mono text-[8px] px-2 py-0.5 border border-white/20 rounded-sm opacity-40">FRAMEWORK</span>
                        <h5 className="mono text-[10px] tracking-[0.5em] uppercase opacity-60">Methodology</h5>
                      </div>
                      <ul className="space-y-6">
                        {selectedProject.methodology.map((m, i) => (
                          <li key={i} className="group flex items-baseline gap-4">
                            <span className="mono text-[10px] opacity-20 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                            <span className="text-lg md:text-xl text-white group-hover:italic transition-all duration-300 leading-tight">{m}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* NEW BA FOCUS SECTION */}
                    <section className="space-y-10">
                      <div className="flex items-center gap-4">
                        <span className="mono text-[8px] px-2 py-0.5 border border-white/20 rounded-sm opacity-40">ANALYSIS</span>
                        <h5 className="mono text-[10px] tracking-[0.5em] uppercase opacity-60">BA Focus Areas</h5>
                      </div>
                      <ul className="space-y-6">
                        {selectedProject.ba_focus.map((b, i) => (
                          <li key={i} className="group flex items-baseline gap-4">
                            <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white group-hover:scale-125 transition-all" />
                            <span className="text-lg md:text-xl text-white group-hover:italic transition-all duration-300 leading-tight">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  {/* STRATEGY & TECHNICAL */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <section className="space-y-8">
                      <p className="mono text-[10px] opacity-20 tracking-[0.5em] uppercase border-b border-white/5 pb-4">Strategy & Vision</p>
                      <p className="text-base md:text-xl text-white/80 leading-relaxed font-light">{selectedProject.strategy}</p>
                    </section>
                    <section className="space-y-8">
                      <p className="mono text-[10px] opacity-20 tracking-[0.5em] uppercase border-b border-white/5 pb-4">Technical Execution</p>
                      <p className="text-base md:text-xl text-white/80 leading-relaxed font-light">{selectedProject.technical}</p>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
