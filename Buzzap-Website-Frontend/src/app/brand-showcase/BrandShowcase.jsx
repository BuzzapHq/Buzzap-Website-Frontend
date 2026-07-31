'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import './brand-showcase.css';

const slides = [
  {
    id: 1,
    brand: 'TechFlow',
    category: 'SaaS Growth',
    result: '+487% MRR in 6 months',
    stat: '$2.4M',
    statLabel: 'Revenue added',
    description: 'From 200 to 2,800 paying users through AI-powered outbound + CRM automation.',
    image: '/product2.jpeg',
    accent: '#818cf8',
    tags: ['AI Marketing', 'CRM Automation', 'SEO'],
  },
  {
    id: 2,
    brand: 'SolarEdge',
    category: 'Home Services',
    result: '12× lead volume in 90 days',
    stat: '12×',
    statLabel: 'More leads',
    description: 'Meta Ads + WhatsApp AI agent combo that booked 340 qualified calls per month on autopilot.',
    image: '/social.jpeg',
    accent: '#10b981',
    tags: ['Meta Ads', 'WhatsApp AI', 'Lead Gen'],
  },
  {
    id: 3,
    brand: 'HealthFirst',
    category: 'Healthcare SaaS',
    result: '98% lead response rate via AI',
    stat: '98%',
    statLabel: 'Response rate',
    description: 'AI chatbot + email sequence that responds to every inbound lead within 60 seconds.',
    image: '/ai.jpeg',
    accent: '#c084fc',
    tags: ['AI Agents', 'Email Automation', 'CRM'],
  },
  {
    id: 4,
    brand: 'LuxBuild',
    category: 'Construction',
    result: '340% ROI on ad spend',
    stat: '340%',
    statLabel: 'Ad spend ROI',
    description: 'Google Ads + SEO strategy that positioned them as the #1 builder in their region within 5 months.',
    image: '/buzz.jpeg',
    accent: '#f59e0b',
    tags: ['Google Ads', 'SEO', 'Brand Authority'],
  },
];

export default function BrandShowcase() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const next = () => { setDir(1); setActive((p) => (p + 1) % slides.length); };
  const prev = () => { setDir(-1); setActive((p) => (p - 1 + slides.length) % slides.length); };

  useEffect(() => {
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, []);

  const slide = slides[active];

  return (
    <section className="bs-section">
      <div className="bs-bg-glow" />

      <div className="bs-container">
        {/* Header */}
        <motion.div
          className="bs-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="bs-badge">
            <Sparkles size={11} />
            Client Success Stories
          </span>
          <h2 className="bs-title">
            Results that speak<br />
            <span className="bs-title-accent">for themselves.</span>
          </h2>
        </motion.div>

        {/* Main slide */}
        <div className="bs-slide-wrapper">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              className="bs-slide"
              custom={dir}
              initial={{ opacity: 0, x: dir * 80, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: dir * -80, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ '--bs-accent': slide.accent }}
            >
              {/* Image */}
              <div className="bs-img-col">
                <div className="bs-img-card">
                  <Image
                    src={slide.image}
                    alt={slide.brand}
                    fill
                    className="bs-img"
                  />
                  <div className="bs-img-overlay" />
                  <div className="bs-big-stat">
                    <div className="bs-big-stat-value" style={{ color: slide.accent }}>{slide.stat}</div>
                    <div className="bs-big-stat-label">{slide.statLabel}</div>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="bs-text-col">
                <div className="bs-brand-row">
                  <span className="bs-brand-name">{slide.brand}</span>
                  <span className="bs-category">{slide.category}</span>
                </div>

                <h3 className="bs-result" style={{ color: slide.accent }}>{slide.result}</h3>
                <p className="bs-description">{slide.description}</p>

                <div className="bs-tags">
                  {slide.tags.map((t) => (
                    <span key={t} className="bs-tag" style={{
                      borderColor: `${slide.accent}35`,
                      color: slide.accent,
                      background: `${slide.accent}12`
                    }}>{t}</span>
                  ))}
                </div>

                <div className="bs-impact-row">
                  <TrendingUp size={14} style={{ color: slide.accent }} />
                  <span>Achieved within 90 days of launch</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <div className="bs-nav">
            <button className="bs-nav-btn" onClick={prev} aria-label="Previous">
              <ArrowLeft size={16} />
            </button>
            <div className="bs-dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`bs-dot ${i === active ? 'bs-dot-active' : ''}`}
                  onClick={() => { setDir(i > active ? 1 : -1); setActive(i); }}
                  aria-label={`Slide ${i + 1}`}
                  style={i === active ? { background: slides[i].accent, width: '24px' } : {}}
                />
              ))}
            </div>
            <button className="bs-nav-btn" onClick={next} aria-label="Next">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
