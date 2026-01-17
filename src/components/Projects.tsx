
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
      title: 'BANKING CORE SYSTEM',
      hoverTitle: 'BANK',
      cat: 'MIS',
      url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000',
      demoUrl: 'https://demo.banking-system.thienphuc.vn',
      repoUrl: 'https://github.com/thienphuc/banking-core-v2',
      year: "2024",
      role: "Lead System Analyst",
      brief: "A digital transformation initiative for a tier-1 commercial bank, aiming to replace a 20-year-old legacy core with a modern microservices-based architecture.",
      strategy: "Conducted exhaustive 'As-Is' vs 'To-Be' gap analysis across 450+ unique business processes. Implemented a phased migration strategy using the Strangler Fig pattern to minimize operational risk.",
      technical: "Orchestrated a distributed system using Spring Boot and Apache Kafka for event-driven transactions. Designed a unified data schema to support real-time reporting and cross-platform sync.",
      methodology: [
        "Agile Scrum Framework",
        "BABOK® Standards Alignment",
        "Business Process Re-engineering (BPR)",
        "UAT (User Acceptance Testing) Coordination",
        "Risk-based Data Migration"
      ],
      ba_focus: [
        "Elicitation: BRD & Functional Requirement Specs (FRS)",
        "Modeling: UML Sequence & State Machine Diagrams",
        "Stakeholder Matrix & Communication Mgmt",
        "API Interface Mapping & Documentation",
        "User Journey Mapping for Retail Banking"
      ],
      tech: ["Java Spring Boot", "Kafka", "PostgreSQL", "Redis", "Docker", "AWS"],
      outcomes: [
        { label: "Throughput", value: "3.5x", desc: "Increased transaction processing capacity per second." },
        { label: "Latency", value: "-60%", desc: "Reduced end-to-end transaction time for retail customers." },
        { label: "Cost Saving", value: "$1.2M", desc: "Estimated annual savings on maintenance and legacy licensing." }
      ],
      accordionSections: [
        {
          id: "context",
          icon: "alert-triangle",
          title: "BỐI CẢNH & VẤN ĐỀ",
          content: {
            description: "Hệ thống lõi ngân hàng cũ (20 năm tuổi) gặp nhiều vấn đề về hiệu suất, bảo mật và khả năng mở rộng. Cần chuyển đổi sang kiến trúc hiện đại để đáp ứng nhu cầu ngày càng tăng của khách hàng.",
            items: [
              "Hệ thống monolithic cũ không thể xử lý > 1000 giao dịch/giây",
              "Thời gian downtime cho maintenance lên đến 4 giờ/tháng",
              "Chi phí vận hành và bảo trì tăng 30% hàng năm",
              "Không hỗ trợ tích hợp với các dịch vụ fintech hiện đại"
            ]
          }
        },
        {
          id: "ba-activities",
          icon: "target",
          title: "HOẠT ĐỘNG BUSINESS ANALYST CHI TIẾT",
          content: {
            subsections: [
              {
                title: "Phân tích yêu cầu nghiệp vụ",
                content: "Thu thập và phân tích 450+ quy trình nghiệp vụ từ 12 phòng ban khác nhau. Xây dựng BRD (Business Requirements Document) và FRS (Functional Requirements Specification) cho toàn bộ hệ thống."
              },
              {
                title: "Mô hình hóa quy trình",
                content: "Thiết kế UML Sequence Diagrams, State Machine Diagrams và Use Case Diagrams để mô tả luồng nghiệp vụ. Tạo API Interface Documentation cho 200+ endpoints."
              },
              {
                title: "Quản lý stakeholder",
                content: "Điều phối với 15+ stakeholder chính bao gồm BOD, IT Department, Operations, Risk Management, và các đơn vị khác. Tổ chức 40+ workshop sessions để elicit requirements."
              }
            ]
          }
        },
        {
          id: "challenges",
          icon: "wrench",
          title: "THÁCH THỨC & GIẢI PHÁP",
          content: {
            subsections: [
              {
                title: "Migration phức tạp",
                content: "Giải pháp: Áp dụng Strangler Fig Pattern để migrate từng module một cách độc lập, đảm bảo hệ thống cũ vẫn hoạt động trong quá trình chuyển đổi. Thực hiện dual-write để đồng bộ dữ liệu giữa 2 hệ thống."
              },
              {
                title: "Đảm bảo tính nhất quán dữ liệu",
                content: "Giải pháp: Implement Event Sourcing với Apache Kafka để tracking mọi thay đổi. Sử dụng Saga Pattern cho distributed transactions, đảm bảo eventual consistency."
              },
              {
                title: "Resistance to change",
                content: "Giải pháp: Tổ chức training sessions cho 200+ users. Tạo comprehensive documentation và quick reference guides. Thiết lập support team 24/7 trong giai đoạn go-live."
              }
            ]
          }
        },
        {
          id: "results",
          icon: "check-circle",
          title: "KẾT QUẢ & TÁC ĐỘNG",
          content: {
            metricCards: [
              {
                value: "-65%",
                label: "Transaction Settlement Time",
                description: "Từ 8-24 giờ xuống còn 2-3 giờ",
                color: "green"
              },
              {
                value: "+28%",
                label: "Customer Satisfaction (NPS)",
                description: "Từ 42 lên 54 điểm NPS",
                color: "blue"
              },
              {
                value: "$1.2M",
                label: "Annual Cost Savings",
                description: "Giảm từ $2.8M xuống $1.6M",
                color: "purple"
              }
            ],
            impactSections: [
              {
                title: "Business Impact:",
                icon: "briefcase",
                items: [
                  "Time-to-market cho features mới giảm từ 6-8 tuần xuống 1-2 tuần",
                  "Có thể launch mobile banking và instant transfer services",
                  "Compliance: đáp ứng 100% Basel III requirements",
                  "Tái chiếm 8% thị phần segment khách hàng trẻ sau 12 tháng"
                ]
              },
              {
                title: "Operational Impact:",
                icon: "users",
                items: [
                  "Branch staff tiết kiệm 45 phút/ngày (không còn xử lý exceptions)",
                  "Customer service call volume giảm 35%",
                  "System uptime tăng từ 95% lên 99.8%",
                  "Deployment frequency: từ 1 lần/quý lên 2 lần/tuần"
                ]
              },
              {
                title: "Strategic Impact:",
                icon: "target",
                items: [
                  "Foundation cho digital transformation roadmap tiếp theo",
                  "Cơ khả năng M&A và mở rộng thị trường",
                  "Platform sẵn sàng cho AI/ML initiatives",
                  "Competitive advantage trong ngành banking"
                ]
              }
            ]
          }
        },
        {
          id: "lessons",
          icon: "trending-up",
          title: "BÀI HỌC KINH NGHIỆM",
          content: {
            impactSections: [
              {
                title: "✨ What Worked Well:",
                icon: "star",
                bgColor: "yellow",
                items: [
                  "Phased approach: Pilot với 2 branches trước giúp identify issues sớm và adjust",
                  "Change champions: Peer training hiệu quả hơn top-down training",
                  "Transparent communication: Weekly updates giúp manage expectations",
                  "Data-driven decisions: Metrics dashboard giúp prioritize đúng"
                ]
              },
              {
                title: "💡 What Could Be Improved:",
                icon: "lightbulb",
                bgColor: "red",
                items: [
                  "Earlier involvement của Security: Phát hiện một số security gaps muộn",
                  "More comprehensive training: Cần thêm thời gian training cho advanced features",
                  "Better vendor management: Một số delays do dependency vào vendor"
                ]
              },
              {
                title: "💡 Key Takeaways:",
                icon: "key",
                bgColor: "green",
                items: [
                  "Transformation projects cần 60% change management, 40% technology",
                  "Stakeholder alignment quan trọng hơn technical perfection",
                  "MVP mindset giúp deliver value sớm và học hỏi nhanh",
                  "Documentation tốt là foundation cho knowledge transfer"
                ]
              }
            ]
          }
        }
      ]
    },
    {
      id: "02",
      title: 'PREDICTIVE ANALYTICS',
      hoverTitle: 'DATA',
      cat: 'FINANCE',
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000',
      demoUrl: 'https://bi-dashboard.thienphuc.io',
      repoUrl: 'https://github.com/thienphuc/financial-predictive-engine',
      year: "2023",
      role: "BI & Data Analyst",
      brief: "Development of a real-time financial health monitoring dashboard for small to medium enterprises (SMEs), utilizing predictive modeling for cash flow forecasting.",
      strategy: "Leveraged historical financial data to identify cyclical patterns. Designed a multi-tenant architecture to ensure data isolation while maintaining high availability.",
      technical: "Built an ETL pipeline using Python and Azure Data Factory. Implemented Random Forest regression models to predict cash flow deficits with high precision.",
      methodology: ["CRISP-DM", "Waterfall-Agile Hybrid", "Data Governance", "Model Validation"],
      ba_focus: ["Data Mapping", "KPI Definition", "Market Trend Analysis", "Decision Logic Documentation"],
      tech: ["Python (Pandas/Scikit-learn)", "Azure Data Factory", "Power BI", "Snowflake"],
      outcomes: [
        { label: "Accuracy", value: "94%", desc: "Precision of the 30-day cash flow forecast model." },
        { label: "Reporting", value: "Real-time", desc: "Eliminated the 2-week manual reporting cycle." },
        { label: "Insight Gap", value: "-80%", desc: "Reduced time from data collection to actionable insight." }
      ],
      accordionSections: [
        {
          id: "context",
          icon: "alert-triangle",
          title: "BỐI CẢNH & VẤN ĐỀ",
          content: {
            description: "Các SMEs (doanh nghiệp vừa và nhỏ) thiếu khả năng dự báo cash flow chính xác, dẫn đến nhiều rủi ro tài chính và khó khăn trong ra quyết định.",
            items: [
              "Manual reporting cycle mất 2 tuần để tạo báo cáo tài chính",
              "Không có khả năng dự báo cash flow cho 30-90 ngày tiếp theo",
              "Data silos: dữ liệu phân tán ở nhiều hệ thống khác nhau",
              "Quyết định kinh doanh dựa trên gut feeling thay vì data-driven"
            ]
          }
        },
        {
          id: "ba-activities",
          icon: "target",
          title: "HOẠT ĐỘNG BUSINESS ANALYST CHI TIẾT",
          content: {
            subsections: [
              {
                title: "Data Discovery & Mapping",
                content: "Phân tích 15+ nguồn dữ liệu khác nhau (accounting, CRM, invoicing, banking). Tạo comprehensive data dictionary với 200+ fields. Xác định data quality issues và thiết kế data cleansing rules."
              },
              {
                title: "KPI Definition & Metrics",
                content: "Làm việc với CFOs của 20+ SMEs để define business KPIs. Thiết kế 30+ financial metrics dashboard. Tạo predictive indicators cho cash flow health score."
              },
              {
                title: "Model Requirements & Validation",
                content: "Collaborate với data scientists để translate business requirements thành model specifications. Define acceptance criteria cho model accuracy (min 90%). Thiết kế A/B testing framework để validate predictions."
              }
            ]
          }
        },
        {
          id: "challenges",
          icon: "wrench",
          title: "THÁCH THỨC & GIẢI PHÁP",
          content: {
            subsections: [
              {
                title: "Data Quality Issues",
                content: "Giải pháp: Implement data profiling pipeline với Great Expectations. Tạo automated data quality checks và alerting. Build data reconciliation process với tolerance thresholds. Kết quả: Data quality score tăng từ 65% lên 95%."
              },
              {
                title: "Model Interpretability",
                content: "Giải pháp: Sử dụng SHAP values để explain model predictions. Tạo feature importance visualization cho business users. Build 'what-if' scenario analysis tool. Kết quả: Business users hiểu được 90% model predictions."
              },
              {
                title: "Multi-tenant Data Isolation",
                content: "Giải pháp: Implement row-level security trong Snowflake. Design tenant-specific encryption keys. Tạo comprehensive audit logs cho data access. Pass SOC 2 Type II audit đầu tiên."
              }
            ]
          }
        },
        {
          id: "results",
          icon: "check-circle",
          title: "KẾT QUẢ & TÁC ĐỘNG",
          content: {
            metricCards: [
              {
                value: "94%",
                label: "Forecast Accuracy",
                description: "Độ chính xác dự báo cash flow 30 ngày",
                color: "green"
              },
              {
                value: "-80%",
                label: "Insight Generation Time",
                description: "Từ 2 tuần xuống còn 2-3 ngày",
                color: "blue"
              },
              {
                value: "150+",
                label: "SME Clients",
                description: "Doanh nghiệp sử dụng platform",
                color: "purple"
              }
            ],
            impactSections: [
              {
                title: "Business Impact:",
                icon: "briefcase",
                items: [
                  "50+ SMEs tránh được cash flow crisis nhờ early warning alerts",
                  "Average 2.5 months runway improvement cho clients",
                  "35% clients có thể negotiate better terms với banks nhờ data insights",
                  "Platform thu hút $2M seed funding từ VCs"
                ]
              },
              {
                title: "Operational Impact:",
                icon: "users",
                items: [
                  "CFO teams save 15 hours/week trên manual reporting",
                  "Real-time dashboards thay thế monthly board meetings",
                  "Automated alerts giảm 70% missed payment risks",
                  "API integration với 20+ accounting platforms"
                ]
              },
              {
                title: "Strategic Impact:",
                icon: "target",
                items: [
                  "Positioned company như leader trong SME fintech",
                  "Data insights mở ra upsell opportunities cho advisory services",
                  "Platform có thể scale lên 10,000+ tenants",
                  "Foundation cho AI-powered financial advisor chatbot"
                ]
              }
            ]
          }
        },
        {
          id: "lessons",
          icon: "trending-up",
          title: "BÀI HỌC KINH NGHIỆM",
          content: {
            impactSections: [
              {
                title: "✨ What Worked Well:",
                icon: "star",
                bgColor: "yellow",
                items: [
                  "CRISP-DM methodology giúp structure data science projects tốt",
                  "Early stakeholder involvement trong feature engineering",
                  "Continuous model retraining với latest data giữ accuracy cao",
                  "Simple, intuitive UI giúp adoption rate 85% trong 30 ngày"
                ]
              },
              {
                title: "💡 What Could Be Improved:",
                icon: "lightbulb",
                bgColor: "red",
                items: [
                  "Model drift monitoring cần được implement sớm hơn",
                  "User training và onboarding cần thêm interactive tutorials",
                  "Data pipeline cần thêm fallback mechanisms cho vendor API downtime"
                ]
              },
              {
                title: "💡 Key Takeaways:",
                icon: "key",
                bgColor: "green",
                items: [
                  "Domain expertise (finance) quan trọng như technical skills",
                  "Model accuracy < 90% không đủ để business users trust",
                  "Data governance phải được prioritize từ day 1",
                  "API-first approach giúp partnerships dễ dàng hơn"
                ]
              }
            ]
          }
        }
      ]
    },
    {
      id: "03",
      title: 'SECURITY PROTOCOL X',
      hoverTitle: 'SECURITY',
      cat: 'SECURITY',
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000',
      demoUrl: 'https://iam-zero-trust.internal',
      repoUrl: 'https://github.com/thienphuc/protocol-x-iam',
      year: "2024",
      role: "Security Consultant",
      brief: "Redesigning the identity and access management (IAM) framework for a multinational corporation to align with Zero Trust security principles.",
      strategy: "Implemented a multi-factor authentication (MFA) rollout plan that integrated with existing legacy LDAP servers. Applied least-privilege access across all cloud resources.",
      technical: "Configured Okta as the primary Identity Provider. Developed custom middleware to bridge the gap between modern OAuth2/OIDC flows and legacy internal apps.",
      methodology: ["Zero Trust Framework", "ISO 27001 Compliance", "Threat Modeling", "Identity Lifecycle Mgmt"],
      ba_focus: ["Access Control Auditing", "Compliance Gap Analysis", "User Journey Mapping", "Policy Definition"],
      tech: ["Okta", "Azure AD", "Terraform", "Nginx", "OAuth2.0 / SAML"],
      outcomes: [
        { label: "Breach Risk", value: "-95%", desc: "Reduction in estimated risk of credential-based attacks." },
        { label: "UX Rating", value: "+40%", desc: "Increase in internal user satisfaction after SSO implementation." },
        { label: "Compliance", value: "100%", desc: "Passed all internal and external security audits." }
      ],
      accordionSections: [
        {
          id: "context",
          icon: "alert-triangle",
          title: "BỐI CẢNH & VẤN ĐỀ",
          content: {
            description: "Tập đoàn đa quốc gia với 10,000+ nhân viên đang sử dụng legacy IAM system không đáp ứng security requirements hiện đại và Zero Trust principles.",
            items: [
              "Password-based authentication với high breach risk (95+ incidents/năm)",
              "Không có centralized identity management - users có 10+ credentials",
              "Legacy LDAP servers không support modern authentication protocols",
              "Compliance gaps với ISO 27001, SOC 2, và GDPR requirements"
            ]
          }
        },
        {
          id: "ba-activities",
          icon: "target",
          title: "HOẠT ĐỘNG BUSINESS ANALYST CHI TIẾT",
          content: {
            subsections: [
              {
                title: "Security Requirements Elicitation",
                content: "Phỏng vấn 50+ stakeholders từ IT Security, Compliance, HR, Legal departments. Analyze 200+ access control policies hiện tại. Document security incidents và root causes. Tạo comprehensive security requirements matrix với 150+ requirements."
              },
              {
                title: "User Journey & Access Pattern Analysis",
                content: "Map user journeys cho 20+ personas (employees, contractors, vendors, admins). Analyze access logs của 10,000+ users để identify patterns. Design least-privilege access model cho 500+ applications. Create role-based access control (RBAC) hierarchy."
              },
              {
                title: "Compliance Gap Analysis",
                content: "Audit current state vs ISO 27001, SOC 2 Type II, GDPR requirements. Identify 80+ compliance gaps cần remediate. Collaborate với legal team để interpret regulations. Build compliance roadmap với prioritized milestones."
              }
            ]
          }
        },
        {
          id: "challenges",
          icon: "wrench",
          title: "THÁCH THỨC & GIẢI PHÁP",
          content: {
            subsections: [
              {
                title: "Legacy System Integration",
                content: "Giải pháp: Build custom OAuth2/OIDC adapter cho LDAP servers. Implement gradual migration strategy với dual-authentication support. Create middleware layer để bridge modern và legacy protocols. Kết quả: Zero downtime migration với 100% backward compatibility."
              },
              {
                title: "User Resistance & Change Management",
                content: "Giải pháp: Phased rollout bắt đầu với IT department (50 users) làm champions. Tổ chức 100+ training sessions với hands-on practice. Create comprehensive self-service documentation và video tutorials. Setup 24/7 support team trong 3 tháng đầu. Kết quả: User satisfaction tăng 40%, support tickets giảm 60%."
              },
              {
                title: "MFA Adoption Across Global Teams",
                content: "Giải pháp: Support multiple MFA methods (app, SMS, hardware tokens) để accommodate diverse regions. Partner với Okta để optimize mobile app performance ở emerging markets. Implement grace period và remind campaigns. Kết quả: 98% MFA adoption trong 6 tháng."
              }
            ]
          }
        },
        {
          id: "results",
          icon: "check-circle",
          title: "KẾT QUẢ & TÁC ĐỘNG",
          content: {
            metricCards: [
              {
                value: "-95%",
                label: "Credential Attack Risk",
                description: "Từ 95 incidents/năm xuống 5 incidents/năm",
                color: "green"
              },
              {
                value: "+40%",
                label: "User Satisfaction (SSO)",
                description: "eNPS tăng từ 30 lên 70",
                color: "blue"
              },
              {
                value: "100%",
                label: "Compliance Pass Rate",
                description: "Pass tất cả audits: ISO 27001, SOC 2, GDPR",
                color: "purple"
              }
            ],
            impactSections: [
              {
                title: "Business Impact:",
                icon: "briefcase",
                items: [
                  "Tránh được estimated $5M trong security breach damages",
                  "Enable expansion vào EU markets nhờ GDPR compliance",
                  "Reduce insurance premiums 30% với cyber insurance providers",
                  "Increase customer trust score 45% trong enterprise sales"
                ]
              },
              {
                title: "Operational Impact:",
                icon: "users",
                items: [
                  "IT helpdesk tickets giảm 60% (password reset requests)",
                  "User productivity tăng 2 hours/week nhờ SSO",
                  "Onboarding time cho new hires giảm từ 3 ngày xuống 4 giờ",
                  "Security team có thể focus vào threat hunting thay vì access management"
                ]
              },
              {
                title: "Strategic Impact:",
                icon: "target",
                items: [
                  "Foundation cho cloud migration strategy (Azure, AWS)",
                  "Enable zero-trust network architecture implementation",
                  "Platform sẵn sàng cho AI-powered threat detection",
                  "Competitive advantage trong winning enterprise contracts"
                ]
              }
            ]
          }
        },
        {
          id: "lessons",
          icon: "trending-up",
          title: "BÀI HỌC KINH NGHIỆM",
          content: {
            impactSections: [
              {
                title: "✨ What Worked Well:",
                icon: "star",
                bgColor: "yellow",
                items: [
                  "Executive sponsorship từ CISO critical cho success",
                  "Phased rollout giúp identify và fix issues early",
                  "Change champions program (50 power users) hiệu quả",
                  "Comprehensive documentation giảm support burden"
                ]
              },
              {
                title: "💡 What Could Be Improved:",
                icon: "lightbulb",
                bgColor: "red",
                items: [
                  "Earlier engagement với legal team để avoid compliance surprises",
                  "More robust testing cho edge cases (VPN, offline scenarios)",
                  "Better communication về timeline expectations với stakeholders"
                ]
              },
              {
                title: "💡 Key Takeaways:",
                icon: "key",
                bgColor: "green",
                items: [
                  "Security projects cần 70% people/process, 30% technology",
                  "User experience là critical factor cho security adoption",
                  "Compliance requirements phải được integrated từ design phase",
                  "Vendor partnership (Okta, Azure) accelerate implementation"
                ]
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group cursor-pointer"
            >
              <div className={`lg:col-span-8 aspect-[21/9] overflow-hidden bg-[#111] rounded-sm relative ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <motion.img
                  src={project.url}
                  alt={project.title}
                  whileHover={{ scale: 1.05, opacity: 0.2 }}
                  className="w-full h-full object-cover opacity-30 grayscale transition-all duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter drop-shadow-lg">{project.hoverTitle}</h3>
                </div>
              </div>

              <div className={`lg:col-span-4 ${idx % 2 !== 0 ? 'lg:order-1 lg:text-right' : ''}`}>
                <div className={`flex items-center gap-3 mb-4 ${idx % 2 !== 0 ? 'justify-end' : ''}`}>
                  <span className="mono text-[10px] text-white/10">{project.id}</span>
                  <div className="w-8 h-[1px] bg-white/5" />
                </div>

                <h4
                  className={`text-2xl md:text-4xl font-bold uppercase tracking-tight mb-4 opacity-25 group-hover:opacity-100 group-hover:scale-[1.03] group-hover:italic transition-all duration-700 ease-[0.215,0.61,0.355,1] ${idx % 2 !== 0
                    ? 'origin-right group-hover:-translate-x-4'
                    : 'origin-left group-hover:translate-x-4'
                    }`}
                >
                  {project.title}
                </h4>

                <p className="mono text-[9px] text-white/20 uppercase tracking-[0.4em] mb-6">{project.cat} // {project.year}</p>

                <div className={`flex ${idx % 2 !== 0 ? 'justify-end' : ''}`}>
                  <button className="mono text-[8px] tracking-[0.3em] border border-white/10 px-6 py-2 rounded-full uppercase opacity-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500 hover:bg-white hover:text-black hover:opacity-100">VIEW CASE</button>
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
                <div className="lg:col-span-8 space-y-24">
                  {/* BRIEF SECTION */}
                  <section>
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-[1px] bg-white/20" />
                      <p className="mono text-[10px] opacity-40 tracking-[0.6em] uppercase">Context & Objectives</p>
                    </div>
                    <p className="text-2xl md:text-5xl font-light text-white/80 leading-[1.15] tracking-tight">
                      {selectedProject.brief}
                    </p>
                  </section>

                  {/* ACCORDION SECTIONS */}
                  {selectedProject.accordionSections && selectedProject.accordionSections.length > 0 && (
                    <section className="space-y-6 pt-10 border-t border-white/5">
                      <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-[1px] bg-white/20" />
                        <p className="mono text-[10px] opacity-40 tracking-[0.6em] uppercase">Chi tiết dự án</p>
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
                                      {section.content.description && (
                                        <p className="text-base md:text-lg text-white/60 leading-relaxed mb-6">
                                          {section.content.description}
                                        </p>
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
                        <h5 className="mono text-[10px] tracking-[0.5em] uppercase opacity-20">Methodology</h5>
                      </div>
                      <ul className="space-y-6">
                        {selectedProject.methodology.map((m, i) => (
                          <li key={i} className="group flex items-baseline gap-4">
                            <span className="mono text-[10px] opacity-20 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                            <span className="text-lg md:text-xl text-white/60 group-hover:text-white transition-colors leading-tight">{m}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* NEW BA FOCUS SECTION */}
                    <section className="space-y-10">
                      <div className="flex items-center gap-4">
                        <span className="mono text-[8px] px-2 py-0.5 border border-white/20 rounded-sm opacity-40">ANALYSIS</span>
                        <h5 className="mono text-[10px] tracking-[0.5em] uppercase opacity-20">BA Focus Areas</h5>
                      </div>
                      <ul className="space-y-6">
                        {selectedProject.ba_focus.map((b, i) => (
                          <li key={i} className="group flex items-baseline gap-4">
                            <span className="w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-white group-hover:scale-125 transition-all" />
                            <span className="text-lg md:text-xl text-white/60 group-hover:text-white transition-colors leading-tight">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  {/* STRATEGY & TECHNICAL */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <section className="space-y-8">
                      <p className="mono text-[10px] opacity-20 tracking-[0.5em] uppercase border-b border-white/5 pb-4">Strategy & Vision</p>
                      <p className="text-base md:text-xl text-white/50 leading-relaxed font-light">{selectedProject.strategy}</p>
                    </section>
                    <section className="space-y-8">
                      <p className="mono text-[10px] opacity-20 tracking-[0.5em] uppercase border-b border-white/5 pb-4">Technical Execution</p>
                      <p className="text-base md:text-xl text-white/50 leading-relaxed font-light">{selectedProject.technical}</p>
                    </section>
                  </div>

                  {/* METRICS */}
                  <section className="pt-20">
                    <p className="mono text-[10px] opacity-20 tracking-[0.5em] uppercase mb-16">Metrics of Success</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-20">
                      {selectedProject.outcomes.map((outcome, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          className="group border-l-[1px] border-white/10 pl-8 py-4 hover:border-white transition-colors"
                        >
                          <p className="mono text-[9px] opacity-30 uppercase tracking-widest mb-6 group-hover:text-white transition-colors">{outcome.label}</p>
                          <h4 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-6 transition-all group-hover:translate-x-2">{outcome.value}</h4>
                          <p className="text-[11px] text-white/40 leading-relaxed uppercase tracking-wider font-medium">{outcome.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* SIDEBAR METADATA */}
                <div className="lg:col-span-4 space-y-20">
                  <div className="grid grid-cols-2 gap-12 mono text-[10px] uppercase tracking-widest border-t border-white/10 pt-10">
                    <div>
                      <p className="opacity-20 mb-3">Professional Role</p>
                      <p className="font-bold opacity-100 text-white italic">{selectedProject.role}</p>
                    </div>
                    <div>
                      <p className="opacity-20 mb-3">Release Year</p>
                      <p className="font-bold opacity-100 text-white">{selectedProject.year}</p>
                    </div>
                  </div>

                  <section className="space-y-8">
                    <p className="mono text-[10px] opacity-30 tracking-[0.6em] uppercase italic flex items-center gap-3">
                      <span className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[7px] font-bold not-italic">01</span>
                      System Design
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tech.map((t, i) => (
                        <span key={i} className="mono text-[10px] px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/50 hover:bg-white hover:text-black transition-all cursor-default uppercase">
                          {t}
                        </span>
                      ))}
                    </div>
                  </section>

                  <div className="p-8 border border-white/5 rounded-sm bg-white/[0.02]">
                    <p className="mono text-[8px] opacity-20 tracking-widest uppercase mb-6">Documentation Status</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="mono text-[9px] opacity-40">BRD / FRS</span>
                        <span className="text-[9px] text-green-500 uppercase font-bold tracking-widest italic">Verified</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="mono text-[9px] opacity-40">UML MODELS</span>
                        <span className="text-[9px] text-green-500 uppercase font-bold tracking-widest italic">Approved</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="mono text-[9px] opacity-40">TRACEABILITY</span>
                        <span className="text-[9px] text-white/20 uppercase font-bold tracking-widest italic">100%</span>
                      </div>
                    </div>
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
