'use client';
// Buzzap Services Page Component
import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BarChart2, Search, Cpu, MessageSquare, PenTool, Layers, CheckCircle, Globe, Video, Wrench, Trophy, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import LazyVideo from '@/components/LazyVideo';
import './service.css';

const categories = [
  { id: 'all', label: 'All Capabilities' },
  { id: 'ads', label: 'AI Marketing & Ads' },
  { id: 'automation', label: 'CRM & Automations' },
  { id: 'support', label: 'Voice AI & Support' },
  { id: 'strategy', label: 'Web & Strategy' },
];

const services = [
  {
    id: 'ai-marketing',
    icon: BarChart2,
    label: '01',
    title: 'PAID ADS & AI MARKETING',
    capability: 'PAID ADS',
    tagline: 'High-converting, hyper-targeted campaigns.',
    desc: 'High-converting, hyper-targeted campaigns across premium digital channels designed to capture attention and scale ROI through autonomous testing and instant lead distribution.',
    bullets: ['Meta & Google Ads automation', 'AI-driven ad copy and creative testing', 'Multi-channel lead capture systems', 'Automated email and SMS sequences', 'Real-time campaign performance dashboards'],
    image: '/product2.jpeg',
    video: '/Paid Ads and AI marketing.mp4',
    color: '#818cf8',
  },
  {
    id: 'brand-boost-seo',
    icon: Search,
    label: '02',
    title: 'AI-DRIVEN SEO & BRAND BOOST',
    capability: 'AI-DRIVEN SEO',
    tagline: 'Algorithmic search positioning.',
    desc: 'Algorithmic search positioning and predictive keyword intent structures engineered to dominate traffic channels and build long-term authority.',
    bullets: ['Technical SEO audit and implementation', 'Keyword strategy and content architecture', 'Brand identity and positioning', 'Local SEO and Google Business optimisation', 'Authority link building campaigns'],
    image: '/social.jpeg',
    video: '/AI SEO.mp4',
    color: '#10b981',
  },
  {
    id: 'crm-automation',
    icon: Layers,
    label: '03',
    title: 'CRM & LEAD AUTOMATION',
    capability: 'AI-LEAD GENERATION',
    tagline: 'Autonomous prospect sourcing pipelines.',
    desc: 'Autonomous prospect sourcing pipelines that automatically track, qualify, and score high-intent buyers into your pipeline 24/7.',
    bullets: ['CRM setup and full configuration', 'Automated lead routing and scoring', 'WhatsApp and SMS follow-up sequences', 'Pipeline stage automation', 'Zoho, HubSpot, and Apollo.io integrations'],
    image: '/product3.jpeg',
    video: '/CRM & LEAD AUTOMATION.mp4',
    color: '#f59e0b',
  },
  {
    id: 'ai-agents',
    icon: Cpu,
    label: '04',
    title: 'AI VOICE AGENTS & CHATBOTS',
    capability: 'AI CUSTOMER SUPPORT',
    tagline: 'Intelligent, conversational automated engines.',
    desc: 'Intelligent, conversational automated engines delivering instant resolution to your clients around the clock across WhatsApp, Web, and Voice AI.',
    bullets: ['Custom-trained chatbots (Voiceflow, Vapi)', 'WhatsApp AI agents for instant resolution', 'Voice AI for inbound and outbound calls', 'Appointment booking automation via Cal.com', 'Handoff to human agents when needed'],
    image: '/ai.jpeg',
    video: '/animation for AI-voice agents.mp4',
    color: '#c084fc',
  },
  {
    id: 'ai-video-ads',
    icon: Video,
    label: '05',
    title: 'AI VIDEO ADS & CREATIVE',
    capability: 'AI VIDEO CREATIVE',
    tagline: 'Generative video & dynamic ad hooks.',
    desc: 'Automated video production pipelines producing high-converting video hooks, UGC variations, and video ad creatives tailored for Meta, TikTok, and YouTube.',
    bullets: ['AI video script generation & storyboard', 'Dynamic UGC & avatar video ad hooks', 'Multi-variant testing for high ROAS', 'Automated video resizing for all formats', 'Continuous creative refresh engine'],
    image: '/product4.jpeg',
    video: '/AI VIDEO ADS.mp4',
    color: '#f43f5e',
  },
  {
    id: 'brand-identity',
    icon: PenTool,
    label: '06',
    title: 'BRAND & VISUAL IDENTITY',
    capability: 'BRAND IDENTITY',
    tagline: 'Distinctive, premium visual positioning.',
    desc: 'Engineered brand identity systems, typography, color palettes, and motion design guidelines that position your business as an industry leader.',
    bullets: ['Complete brand visual systems', 'Logo design & typography guidelines', 'Motion graphics & video asset suites', 'Ad creative templates & asset libraries', 'Brand messaging & voice framework'],
    image: '/buzz.jpeg',
    video: '/Brand and Visual Identity.mp4',
    color: '#ec4899',
  },
  {
    id: 'web-design-dev',
    icon: Globe,
    label: '07',
    title: 'WEB DESIGN & WEB DEVELOPMENT',
    capability: 'WEB INFRASTRUCTURE',
    tagline: 'Ultra-fast, high-converting digital experiences.',
    desc: 'Custom Next.js & React web applications designed for maximum speed, seamless mobile conversion, and direct integration into your AI pipelines.',
    bullets: ['Ultra-fast Next.js / React web apps', 'Conversion-rate optimized UI/UX design', 'Full API & CRM integration', 'Zero-latency mobile performance', 'Automated analytics & lead tracking'],
    image: '/produc5.jpeg',
    video: '/WEB DESIGN & WEB DEVELOPMENT.mp4',
    color: '#06b6d4',
  },
  {
    id: 'growth-consulting',
    icon: MessageSquare,
    label: '08',
    title: 'GROWTH CONSULTING',
    capability: 'SYSTEM ARCHITECTURE',
    tagline: 'Strategy before execution.',
    desc: 'Before we build anything, we audit where your current systems are breaking down. Our consulting engagements identify your highest-leverage opportunities.',
    bullets: ['Full business growth audit', 'Revenue gap analysis', 'AI readiness assessment', 'Custom automation roadmap', 'Monthly strategy and performance reviews'],
    image: '/gb.jpeg',
    video: '/services.mp4',
    color: '#3b82f6',
  },
];

const processSteps = [
  {
    n: '01',
    title: 'Audit',
    desc: 'We analyse your current marketing, sales, and operations stack to identify where you are losing revenue.',
    icon: Search,
    color: '#10b981',
  },
  {
    n: '02',
    title: 'Architect',
    desc: 'We design a custom growth system — selecting the right tools, automations, and channels for your business.',
    icon: Wrench,
    color: '#06b6d4',
  },
  {
    n: '03',
    title: 'Build',
    desc: 'Our team deploys your AI infrastructure end-to-end — CRM, ads, automations, agents, and content systems.',
    icon: Layers,
    color: '#818cf8',
  },
  {
    n: '04',
    title: 'Optimise',
    desc: 'We monitor performance weekly and continuously refine every lever — so your results compound over time.',
    icon: Trophy,
    color: '#f59e0b',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0); y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export default function ServicesClient({ isHomepage = false }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <main className={`svc-page ${isHomepage ? 'svc-homepage-embed' : ''}`}>
      {isHomepage ? (
        <section className="svc-section-header">
          <div className="svc-container" style={{ textAlign: 'center', paddingTop: '90px', paddingBottom: '30px' }}>
            <motion.span className="svc-label" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              Core Capabilities
            </motion.span>
            <motion.h2 className="svc-section-title" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', marginBottom: '16px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              AI Infrastructure Built For<br />
              <span className="svc-hero-muted">Infinite Scale</span>
            </motion.h2>
            <motion.p className="svc-hero-desc" style={{ margin: '0 auto 40px', maxWidth: '640px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
              Modular AI solutions engineered to capture leads, automate workflows, and accelerate pipeline velocity.
            </motion.p>
          </div>
        </section>
      ) : (
        <section className="svc-hero">
          <div className="svc-hero-glow" />
          <div className="svc-hero-grid" />
          <div className="svc-hero-inner">
            <motion.span className="svc-label" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              Services
            </motion.span>
            <motion.h1 className="svc-hero-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              Everything your business needs<br />
              <span className="svc-hero-muted">to grow on autopilot.</span>
            </motion.h1>
            <motion.p className="svc-hero-desc" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
              Buzzap combines AI marketing, SEO, CRM automation, and intelligent agents into one
              cohesive growth system — built specifically for your business.
            </motion.p>
            <motion.div className="svc-hero-actions" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}>
              <Link href="/booking" className="svc-btn-primary">Get a Free Audit <ArrowRight size={16} /></Link>
              <Link href="/case-studies" className="svc-btn-ghost">View case studies <ArrowUpRight size={16} /></Link>
            </motion.div>
          </div>
        </section>
      )}

      <section className="svc-grid-section">
        <div className="svc-container">
          <div className="svc-grid">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.id}
                  id={s.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.08 }}
                  variants={fadeUp}
                  custom={i % 2}
                >
                  <TiltCard className="svc-card">
                    <div className="svc-card-img-wrap" style={{ '--svc-color': s.color }}>
                      {s.video ? (
                        <LazyVideo src={s.video} poster={s.image} alt={s.title} className="svc-card-video" />
                      ) : (
                        <Image src={s.image} alt={s.title} fill className="svc-card-img" sizes="(max-width: 768px) 100vw, 50vw" />
                      )}
                      <div className="svc-card-img-overlay" />

                      <div className="svc-card-img-label">
                        <div className="svc-card-icon">
                          <Icon size={16} strokeWidth={1.5} />
                        </div>
                        <span className="svc-capability-tag">{s.capability}</span>
                        <span className="svc-card-num">{s.label}</span>
                      </div>
                    </div>

                    <div className="svc-card-body">
                      <h3 className="svc-card-title" style={{ '--svc-color': s.color }}>{s.title}</h3>
                      <p className="svc-card-tagline" style={{ color: s.color }}>{s.tagline}</p>
                      <p className="svc-card-desc">{s.desc}</p>
                      <ul className="svc-bullets">
                        {s.bullets.map((b, bi) => (
                          <li key={bi}>
                            <CheckCircle size={12} className="svc-check" style={{ color: s.color }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div className="svc-card-footer">
                        <Link href="/booking" className="svc-card-link" style={{ '--svc-color': s.color }}>
                          Explore Capability <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>

                    <div className="svc-card-glow" style={{ background: `radial-gradient(circle, ${s.color}15 0%, transparent 70%)` }} />
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="svc-process-section" id="process">
        <div className="svc-container">
          <div className="svc-process-header">
            <span className="svc-label">How the system runs</span>
            <h2 className="svc-section-title">
              A process built for results,<br />
              <span className="svc-muted">not activity.</span>
            </h2>
          </div>

          <div className="svc-process-split">
            <motion.div
              className="svc-loop-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="svc-loop-container">
                <div className="svc-loop-ring" />
                <div className="svc-loop-ring-pulse" />

                <div className="svc-orbit-dot-track">
                  <div className="svc-orbit-dot" />
                </div>

                <div className="svc-loop-core">
                  <span className="svc-loop-core-sub">EVERY</span>
                  <span className="svc-loop-core-main">30 DAYS</span>
                  <span className="svc-loop-core-foot">ONE FULL LOOP</span>
                </div>

                <div className="svc-loop-node svc-node-top">
                  <div className="svc-node-card">
                    <Search size={22} color="#0d9488" strokeWidth={2.2} />
                    <span className="svc-node-badge">01</span>
                  </div>
                  <span className="svc-node-label">BRANDING</span>
                </div>

                <div className="svc-loop-node svc-node-right">
                  <div className="svc-node-card">
                    <Wrench size={22} color="#0d9488" strokeWidth={2.2} />
                    <span className="svc-node-badge">02</span>
                  </div>
                  <span className="svc-node-label">PAID ADS / AI SEO</span>
                </div>

                <div className="svc-loop-node svc-node-bottom">
                  <div className="svc-node-card">
                    <Layers size={22} color="#0d9488" strokeWidth={2.2} />
                    <span className="svc-node-badge">03</span>
                  </div>
                  <span className="svc-node-label">CRM - AUTOMATED FOLLOW UP</span>
                </div>

                <div className="svc-loop-node svc-node-left">
                  <div className="svc-node-card">
                    <Trophy size={22} color="#0d9488" strokeWidth={2.2} />
                    <span className="svc-node-badge">04</span>
                  </div>
                  <span className="svc-node-label">$1,000,000,000 REVENUE</span>
                </div>
              </div>
            </motion.div>

            <div className="svc-timeline-wrapper">
              {processSteps.map((step, i) => {
                const StepIcon = step.icon || CheckCircle;
                return (
                  <motion.div
                    key={i}
                    className="svc-timeline-item"
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="svc-timeline-icon-box" style={{ '--step-color': step.color }}>
                      <StepIcon size={20} />
                    </div>
                    <div className="svc-timeline-content">
                      <div className="svc-timeline-header">
                        <span className="svc-timeline-num">{step.n}</span>
                        <h3 className="svc-timeline-title">{step.title}</h3>
                      </div>
                      <p className="svc-timeline-desc">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {!isHomepage && (
        <section className="svc-cta-section">
          <div className="svc-container">
            <div className="svc-cta-inner">
              <span className="svc-label">Ready to start</span>
              <h2 className="svc-section-title">Let&apos;s build your<br /><span className="svc-muted">growth system.</span></h2>
              <p className="svc-cta-desc">Book a free 30-minute strategy call. We&apos;ll audit your current setup and show you exactly where you&apos;re leaving revenue on the table.</p>
              <Link href="/booking" className="svc-btn-primary">Book a Free Call <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      )}

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="svc-video-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="svc-video-modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="svc-video-modal-close"
                onClick={() => setSelectedVideo(null)}
              >
                <X size={20} />
              </button>
              <div className="svc-video-modal-header">
                <h3>{selectedVideo.title}</h3>
                <span className="svc-capability-tag">{selectedVideo.capability}</span>
              </div>
              <div className="svc-video-modal-body">
                <video src={selectedVideo.video} controls autoPlay className="svc-modal-video-player" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
