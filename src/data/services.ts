export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
}

export interface ServiceDetail {
  id: string;
  name: string;
  desc: string;
  iconName: string;
  features: string[]; // Short features for the card
  
  // Detailed page data
  longDescription: string;
  benefits: string[];
  deliverables: string[];
  pricing: PricingTier[];
}

export interface ServiceCategoryData {
  title: string;
  colorClass: string;
  bgGlowClass: string;
  borderHoverClass: string;
  accentColor: string;
  services: ServiceDetail[];
}

export const servicesData: ServiceCategoryData[] = [
  {
    title: "AI & Tech",
    colorClass: "text-brand-blue",
    bgGlowClass: "rgba(59, 130, 246, 0.03)",
    borderHoverClass: "neon-border-blue",
    accentColor: "#3b82f6",
    services: [
      {
        id: "RT-AI-01",
        name: "AI Automation",
        desc: "Streamline workflows, ingest LLMs, and build intelligent autonomous agent pipelines to eliminate repetitive labor.",
        iconName: "Brain",
        features: ["LLM integration", "Agentic workflows", "RAG architectures"],
        longDescription: "Transform your business operations with cutting-edge AI automation. We design and implement custom LLM-powered agents and RAG (Retrieval-Augmented Generation) architectures that understand your internal data, automate customer support, and streamline repetitive administrative workflows, allowing your human capital to focus on strategic growth.",
        benefits: [
          "Reduce operational costs by up to 40%",
          "24/7 autonomous customer inquiry resolution",
          "Eliminate manual data entry and repetitive tasks",
          "Scalable infrastructure using the latest OpenAI/Anthropic APIs"
        ],
        deliverables: [
          "Custom LLM Agent Architecture",
          "Vector Database Setup & Data Ingestion",
          "Workflow Automation Integration (Zapier/Make)",
          "Employee Training & Handoff Documentation"
        ],
        pricing: [
          {
            name: "Pilot Integration",
            price: "₹50,000",
            description: "A proof-of-concept AI chatbot or single automated workflow.",
            features: ["1 Custom GPT/Agent", "Basic Knowledge Base (RAG)", "Website Integration", "14 Days Support"]
          },
          {
            name: "Enterprise Automation",
            price: "₹1,50,000+",
            description: "Full-scale multi-agent system integrated into your core business tools.",
            features: ["Multiple Specialized Agents", "CRM/ERP Integrations", "Advanced Analytics Dashboard", "Priority Support SLA"]
          }
        ]
      },
      {
        id: "RT-CRM-02",
        name: "Custom CRM Solutions",
        desc: "Tailored customer relations software integrated directly with your internal operations and automated reporting workflows.",
        iconName: "Database",
        features: ["Live syncing", "Custom reporting", "Granular API endpoints"],
        longDescription: "Off-the-shelf CRMs often force you to change your business processes to fit their software. We build bespoke CRM solutions from the ground up, perfectly mapped to your sales pipelines, inventory tracking, and client management needs. Featuring live syncing, automated follow-ups, and robust reporting.",
        benefits: [
          "No per-user monthly licensing fees",
          "Exactly matches your unique sales workflow",
          "Complete data ownership and security",
          "Seamless integration with Indian payment gateways (Razorpay, PhonePe)"
        ],
        deliverables: [
          "Requirements Analysis & Architecture Design",
          "Custom Dashboard Development",
          "Data Migration from existing tools",
          "Automated Lead Capture & Nurture Sequences"
        ],
        pricing: [
          {
            name: "Standard CRM",
            price: "₹80,000",
            description: "Custom built sales pipeline and lead management system.",
            features: ["Lead Management", "Custom Dashboards", "Basic Automations", "Role-based Access"]
          },
          {
            name: "Advanced ERP/CRM",
            price: "₹2,50,000+",
            description: "End-to-end operational software including inventory and billing.",
            features: ["Inventory Management", "Invoice & Billing Sync", "Advanced APIs", "Mobile Application View"]
          }
        ]
      },
      {
        id: "RT-ENT-03",
        name: "Enterprise IT Setup",
        desc: "Cloud migration, enterprise infrastructure optimization, security setups, and continuous technical support architecture.",
        iconName: "Cpu",
        features: ["Cloud migration", "Server audits", "Cybersecurity setups"],
        longDescription: "Robust IT infrastructure is the backbone of any scaling enterprise. We provide end-to-end cloud migration, server architecture optimization (AWS, GCP, Azure), and uncompromising cybersecurity setups tailored to Indian compliance standards (DPDP Act).",
        benefits: [
          "99.99% Guaranteed Server Uptime",
          "Reduced AWS/GCP monthly billing through optimization",
          "Enterprise-grade data security and encryption",
          "Future-proof scalable architecture"
        ],
        deliverables: [
          "Complete Cloud Migration",
          "Infrastructure as Code (Terraform/Ansible) Setup",
          "Vulnerability & Penetration Testing",
          "Disaster Recovery Implementation"
        ],
        pricing: [
          {
            name: "Infrastructure Audit",
            price: "₹30,000",
            description: "Comprehensive review of current servers and security.",
            features: ["Security Vulnerability Report", "Cost Optimization Suggestions", "Architecture Review", "Actionable Roadmap"]
          },
          {
            name: "Complete Migration & Setup",
            price: "₹1,20,000+",
            description: "Full transition to optimized cloud infrastructure.",
            features: ["Zero-Downtime Migration", "Load Balancing Setup", "Automated Backups", "CI/CD Pipeline Setup"]
          }
        ]
      },
    ],
  },
  {
    title: "Development",
    colorClass: "text-brand-orange",
    bgGlowClass: "rgba(250, 90, 21, 0.03)",
    borderHoverClass: "neon-border-gold",
    accentColor: "#fa5a15",
    services: [
      {
        id: "RT-DEV-01",
        name: "Web Development",
        desc: "Ultra-fast, high-converting React and Next.js applications engineered with premium interactive assets.",
        iconName: "Globe",
        features: ["Next.js App Router", "Framer Motion", "60fps animation"],
        longDescription: "Your website is your ultimate digital storefront. We don't just build websites; we engineer high-performance web applications using modern stacks like Next.js and React. Expect lightning-fast load times, flawless SEO architecture, and stunning 60fps animations that convert visitors into paying clients.",
        benefits: [
          "Sub-second page load speeds",
          "Bespoke, template-free premium designs",
          "Built-in Technical SEO best practices",
          "Mobile-first responsive engineering"
        ],
        deliverables: [
          "Custom UI/UX Figma Prototypes",
          "Frontend & Backend Development",
          "CMS Integration (Sanity, WordPress headless)",
          "Global CDN Deployment"
        ],
        pricing: [
          {
            name: "Corporate Website",
            price: "₹45,000",
            description: "High-end corporate presence with animations and CMS.",
            features: ["Up to 10 Pages", "Custom Animations", "Contact Forms & Lead Capture", "Mobile Optimized"]
          },
          {
            name: "Complex Web Application",
            price: "₹1,50,000+",
            description: "Full-stack web apps like marketplaces or SaaS platforms.",
            features: ["User Authentication", "Database Architecture", "Payment Gateways", "Custom Dashboards"]
          }
        ]
      },
      {
        id: "RT-MOB-02",
        name: "App Development",
        desc: "Native iOS and Android platforms designed with responsive layouts, smooth animations, and high performance.",
        iconName: "Smartphone",
        features: ["React Native / Flutter", "Performance optimized", "Store submissions"],
        longDescription: "Capture the mobile-first Indian market with native-feeling applications built on React Native or Flutter. We handle the entire lifecycle—from wireframing the user experience to writing highly performant code and successfully navigating the Apple App Store and Google Play Store submission processes.",
        benefits: [
          "Cross-platform efficiency (iOS & Android)",
          "Native performance and fluid gestures",
          "Offline capabilities and caching",
          "Secure user data handling"
        ],
        deliverables: [
          "Interactive UI/UX Prototypes",
          "Cross-platform Codebase",
          "Third-party API Integrations",
          "App Store Deployment & Optimization (ASO)"
        ],
        pricing: [
          {
            name: "MVP Application",
            price: "₹1,50,000",
            description: "Core feature app to test the market and pitch investors.",
            features: ["Core Features Development", "iOS & Android Builds", "Basic Authentication", "3 Months Bug Support"]
          },
          {
            name: "Scale Application",
            price: "₹4,00,000+",
            description: "Feature-rich application ready for thousands of users.",
            features: ["Complex Animations", "Real-time Chat/Location", "Advanced Analytics", "Enterprise Security"]
          }
        ]
      },
    ],
  },
  {
    title: "Marketing & Growth",
    colorClass: "text-brand-blue",
    bgGlowClass: "rgba(59, 130, 246, 0.03)",
    borderHoverClass: "neon-border-blue",
    accentColor: "#3b82f6",
    services: [
      {
        id: "RT-SEO-01",
        name: "SEO & GMB Setup",
        desc: "Hyper-local SEO strategies and clean GMB profile configurations to dominate search listings and drive organic traffic.",
        iconName: "MapPin",
        features: ["Local GMB optimization", "Keyword strategy", "Index optimization"],
        longDescription: "Dominate search engine results and capture high-intent local traffic. We optimize your Google My Business (GMB) profile for local dominance and implement rigorous technical and content SEO strategies to ensure you rank #1 for your most profitable keywords in the Indian market.",
        benefits: [
          "Consistent, free organic traffic",
          "Increased brand trust and authority",
          "Dominance in 'Near Me' local searches",
          "Long-term compound ROI"
        ],
        deliverables: [
          "Comprehensive Technical SEO Audit",
          "Keyword Mapping & Content Strategy",
          "GMB Profile Verification & Optimization",
          "High-DA Backlink Building"
        ],
        pricing: [
          {
            name: "Local SEO & GMB",
            price: "₹15,000 /mo",
            description: "Perfect for local businesses wanting foot traffic.",
            features: ["GMB Optimization", "Local Citations", "Monthly Reporting", "Targeted Local Keywords"]
          },
          {
            name: "National SEO Growth",
            price: "₹35,000+ /mo",
            description: "Aggressive SEO for nationwide ranking.",
            features: ["Advanced Content Creation", "Premium Link Building", "Technical Audits", "Competitor Analysis"]
          }
        ]
      },
      {
        id: "RT-SMM-02",
        name: "Social Growth (SMM)",
        desc: "Brand building, authority setups, and community engagement campaigns across major platforms (LinkedIn, Instagram).",
        iconName: "Share2",
        features: ["Platform authority", "Post scheduling", "Community outreach"],
        longDescription: "We transform your social media profiles into powerful brand assets. From aesthetic Instagram grids to authoritative LinkedIn leadership content, we manage your community, schedule high-impact posts, and foster engagement that builds absolute trust with your audience.",
        benefits: [
          "Massive brand awareness and recall",
          "Direct engagement with target demographics",
          "Establish industry thought leadership",
          "Visual storytelling that resonates"
        ],
        deliverables: [
          "Monthly Content Calendar",
          "Custom Graphic Design & Copywriting",
          "Community Management & Replies",
          "Platform Analytics Reporting"
        ],
        pricing: [
          {
            name: "Brand Presence",
            price: "₹20,000 /mo",
            description: "Consistent, high-quality posting schedule.",
            features: ["12 Posts / Month", "2 Platforms (e.g. IG, FB)", "Custom Graphics", "Basic Community Management"]
          },
          {
            name: "Aggressive Growth",
            price: "₹45,000+ /mo",
            description: "High-volume content including short-form video.",
            features: ["20+ Posts / Month", "Includes 4-6 Reels/Shorts", "LinkedIn Authority Building", "Comprehensive Reporting"]
          }
        ]
      },
      {
        id: "RT-ADS-03",
        name: "Performance Ads",
        desc: "Highly-optimized search and social media ad campaigns (Google, Meta, TikTok Ads) mapping direct ROI.",
        iconName: "TrendingUp",
        features: ["A/B testing", "Direct ROI mapping", "Audience definition"],
        longDescription: "Stop burning ad spend. We engineer highly targeted, data-driven ad campaigns on Google and Meta platforms. By utilizing rigorous A/B testing, precise audience targeting, and compelling ad creatives, we maximize your Return on Ad Spend (ROAS) and generate high-quality, convertible leads.",
        benefits: [
          "Immediate lead generation and sales",
          "Predictable and scalable revenue",
          "Laser-targeted audience reach",
          "Clear ROI and cost-per-acquisition tracking"
        ],
        deliverables: [
          "Campaign Strategy & Funnel Design",
          "Ad Copywriting & Creative Generation",
          "Pixel & Conversion Tracking Setup",
          "Daily Optimization & Scaling"
        ],
        pricing: [
          {
            name: "Growth Ads Setup",
            price: "₹25,000 /mo",
            description: "Management fee for spends up to ₹1 Lakh.",
            features: ["Meta or Google Ads", "Custom Ad Creatives", "Pixel Setup", "Bi-Weekly Reporting"]
          },
          {
            name: "Scale Performance",
            price: "15% of Ad Spend",
            description: "For established businesses spending ₹3 Lakh+ monthly.",
            features: ["Omnichannel Campaigns", "Advanced Retargeting", "Conversion Rate Optimization", "Dedicated Account Manager"]
          }
        ]
      },
    ],
  },
  {
    title: "Creative & Production",
    colorClass: "text-brand-orange",
    bgGlowClass: "rgba(250, 90, 21, 0.03)",
    borderHoverClass: "neon-border-orange",
    accentColor: "#fa5a15",
    services: [
      {
        id: "RT-UGC-01",
        name: "UGC Ads Shooting",
        desc: "Authentic, high-converting User Generated Content ads structured specifically to drive social commerce sales.",
        iconName: "Video",
        features: ["Direct-response formulas", "Hook testing", "High conversions"],
        longDescription: "Modern consumers trust authentic voices. We produce highly effective User Generated Content (UGC) ads utilizing a network of Indian creators. By focusing on strong hooks, relatable pain points, and clear direct-response formulas, our UGC drives massive conversions for D2C brands.",
        benefits: [
          "Highest converting ad format on Meta/TikTok",
          "Builds instant brand trust and relatability",
          "Cost-effective compared to studio productions",
          "Rapid testing of multiple video hooks"
        ],
        deliverables: [
          "Creator Sourcing & Briefing",
          "Scriptwriting & Hook Development",
          "Raw Footage Sourcing",
          "Final Edited Video Variants for Ads"
        ],
        pricing: [
          {
            name: "UGC Starter Pack",
            price: "₹30,000",
            description: "Perfect for testing new products.",
            features: ["3 Final UGC Videos", "1 Creator", "Scriptwriting Included", "Commercial Usage Rights"]
          },
          {
            name: "D2C Scale Pack",
            price: "₹75,000+",
            description: "Volume content for rigorous A/B testing.",
            features: ["10 Final Videos", "Multiple Creators", "A/B Hook Variations", "Trend-based Audio"]
          }
        ]
      },
      {
        id: "RT-VID-02",
        name: "Cinematic Productions",
        desc: "Ultra-high-definition brand videos, promotional materials, and commercial productions.",
        iconName: "Camera",
        features: ["Branded promos", "4K video capture", "Commercial lighting"],
        longDescription: "Elevate your brand perception with ultra-high-definition cinematic video production. From conceptualization and storyboarding to on-location shooting with RED/ARRI cinema cameras and commercial lighting, we craft visual masterpieces that tell your brand's story with prestige.",
        benefits: [
          "Premium brand positioning",
          "High engagement on websites and presentations",
          "Professional narrative storytelling",
          "Unmatched visual quality"
        ],
        deliverables: [
          "Pre-production & Storyboarding",
          "On-location or Studio Shooting",
          "Drone & Specialty Cinematography",
          "Full Post-production & Color Grade"
        ],
        pricing: [
          {
            name: "Corporate Film",
            price: "₹1,00,000",
            description: "Professional overview of your business/factory.",
            features: ["1 Day Shoot", "Standard Crew", "Basic Lighting", "Final 2-min Video"]
          },
          {
            name: "Premium Commercial",
            price: "₹3,50,000+",
            description: "High-end cinematic ad for TV or heavy digital use.",
            features: ["Cinema Cameras (RED/ARRI)", "Full Production Crew", "Actor/Model Casting", "Advanced Color Grade"]
          }
        ]
      },
      {
        id: "RT-EDT-03",
        name: "Post Video Editing",
        desc: "Elite level post-production, fast-paced editing, motion graphics design, and sound design optimization.",
        iconName: "Film",
        features: ["Motion graphics", "Premium color grade", "Sound design"],
        longDescription: "Raw footage is only half the battle. Our elite post-production team uses industry-standard tools (Premiere Pro, After Effects, DaVinci Resolve) to deliver fast-paced edits, engaging motion graphics, precise color grading, and immersive sound design to ensure your content retains attention.",
        benefits: [
          "Maximize viewer retention rates",
          "Professional, polished final product",
          "Consistent brand aesthetics",
          "Quick turnaround times"
        ],
        deliverables: [
          "Narrative Editing & Pacing",
          "Color Correction & Grading",
          "Motion Graphics & Text Animations",
          "Audio Mixing & Sound Design"
        ],
        pricing: [
          {
            name: "Short-Form Retainer",
            price: "₹35,000 /mo",
            description: "Daily Reels/Shorts for personal brands.",
            features: ["Up to 15 Reels/Mo", "Alex Hormozi Style Captions", "Sound Effects", "48hr Turnaround"]
          },
          {
            name: "Long-Form Editing",
            price: "₹8,000 /video",
            description: "YouTube videos or podcasts.",
            features: ["Multi-cam Sync", "B-Roll Addition", "Color Grade", "Audio Enhancement"]
          }
        ]
      },
      {
        id: "RT-BRN-04",
        name: "Branding & Identity",
        desc: "Logo design, comprehensive design systems, typography standards, and futuristic brand manuals.",
        iconName: "Sparkles",
        features: ["Design system", "Branding guide", "High-fidelity vectors"],
        longDescription: "A brand is more than a logo; it's a feeling. We develop comprehensive brand identities that resonate with your target market. From conceptualizing the core logo to defining typography, color palettes, and creating a futuristic brand manual, we ensure your identity is cohesive and memorable.",
        benefits: [
          "Stand out in crowded markets",
          "Cohesive identity across all touchpoints",
          "Establishes immediate professional trust",
          "Clear guidelines for future marketing"
        ],
        deliverables: [
          "Primary & Secondary Logo Design",
          "Color Palette & Typography System",
          "Comprehensive Brand Guidelines (PDF)",
          "Social Media Kit & Stationery Design"
        ],
        pricing: [
          {
            name: "Identity Starter",
            price: "₹25,000",
            description: "Core assets needed to launch a new business.",
            features: ["2 Logo Concepts", "Color Palette", "Basic Typography", "Final Vector Files"]
          },
          {
            name: "Full Brand System",
            price: "₹75,000+",
            description: "Complete design system for serious enterprises.",
            features: ["Extensive Logo Explorations", "50+ Page Brand Book", "Stationery Design", "Social Media Templates"]
          }
        ]
      },
    ],
  },
];
