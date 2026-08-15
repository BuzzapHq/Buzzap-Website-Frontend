'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Unplug, TrendingDown, ChevronDown, Play, Pause, Zap, CheckCircle2, ArrowRight, Activity, ShieldCheck, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import './problem.css';

const pains = [
  {
    id: 'follow-up',
    icon: Clock,
    title: 'Slow Lead Follow-up',
    shortDesc: '78% of customers buy from the first business to respond.',
    stat: '78%',
    statLabel: 'buy from first responder',
    fullDesc: `78% of customers buy from the first business to respond. The average business takes 6+ hours to follow up on a new lead. By then — the lead has already spoken to three competitors and made a decision.

Speed is not a nice-to-have. It is the difference between winning and losing the deal.`,
  },
  {
    id: 'tools',
    icon: Unplug,
    title: 'Disconnected Marketing Tools',
    shortDesc: "Your ads, CRM, WhatsApp, and website don't talk to each other.",
    stat: '4+',
    statLabel: 'tools that never sync',
    fullDesc: `When your ads, CRM, WhatsApp, and website don't talk to each other — leads fall through the gaps silently.

We connect every tool into one system. A lead comes in from any channel and the right action fires automatically. Nothing slips. Nothing goes unanswered.`,
  },
  {
    id: 'revenue',
    icon: TrendingDown,
    title: 'Unpredictable Revenue',
    shortDesc: 'Feast one month. Famine the next.',
    stat: '0',
    statLabel: 'systems running for you',
    fullDesc: `Feast one month. Famine the next. It happens when growth depends on manual effort instead of a system.

We build the system that generates and nurtures leads automatically — whether your team is busy or not. Consistent input. Consistent output.`,
  },
];

const capabilities = [
  { title: 'n8n Automation Engine', status: 'LIVE', detail: 'Instant lead routing & validation' },
  { title: 'CRM Data Sync & WhatsApp AI', status: 'ACTIVE', detail: 'Automated 2-way conversation sync' },
  { title: '24/7 Voice & Email Follow-Up', status: 'DEPLOYED', detail: 'Zero human delay pipeline' },
];

export default function Problem() {
  const [activeId, setActiveId] = useState(pains[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="problem-section" id="problem">
      <div className="problem-glow" />

      <div className="problem-container">
        {/* Bento Grid Wrapper */}
        <div className="bento-wrapper">
          <div className="bento-grid">

            {/* LEFT COLUMN: THE ROOT CAUSE WRITE-UP (From Picture 2) */}
            <motion.div
              className="bento-left-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="problem-header">
                <span className="problem-badge">
                  <Zap size={13} /> The Root Cause
                </span>
                <h2 className="problem-headline">
                  You&apos;re not losing because your product is bad.
                  <br />
                  <span className="problem-headline-accent">You&apos;re losing because your system is broken.</span>
                </h2>
              </div>

              <div className="problem-cards">
                {pains.map((pain) => {
                  const Icon = pain.icon;
                  const isActive = activeId === pain.id;

                  return (
                    <motion.div
                      key={pain.id}
                      layout
                      className={`problem-card ${isActive ? 'problem-card-active' : ''}`}
                      onClick={() => setActiveId(isActive ? null : pain.id)}
                      transition={{ layout: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }}
                    >
                      <div className={`problem-card-border ${isActive ? 'problem-card-border-active' : ''}`} />

                      <div className="problem-card-top">
                        <div className="problem-icon-wrap">
                          <Icon size={19} strokeWidth={1.8} />
                        </div>

                        <div className="problem-card-meta">
                          <h3 className="problem-card-title">{pain.title}</h3>
                          <p className="problem-card-short">{pain.shortDesc}</p>
                        </div>

                        <motion.div
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="problem-chevron"
                        >
                          <ChevronDown size={18} />
                        </motion.div>
                      </div>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="problem-card-expand"
                          >
                            <div className="problem-stat-pill">
                              <span className="problem-stat-number">{pain.stat}</span>
                              <span className="problem-stat-label">{pain.statLabel}</span>
                            </div>
                            <p className="problem-full-desc">{pain.fullDesc}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* RIGHT COLUMN: DEMO VIDEO + OPPORTUNITY HUB */}
            <div className="bento-right-col">

              {/* TOP RIGHT: DEMO VIDEO CARD (Marked DEMO VIDEO in Picture 1) */}
              <motion.div
                className="bento-video-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bento-video-header">
                  <div className="bento-video-title-wrap">
                    <span className="bento-live-indicator" />
                    <span className="bento-card-label">Live Platform Demo</span>
                  </div>
                  <span className="bento-video-duration">2 Min Video</span>
                </div>

                {/* Interactive Video Container */}
                <div className="bento-video-wrapper" onClick={togglePlay}>
                  <video
                    ref={videoRef}
                    src="/services.mp4"
                    poster="/product2.jpeg"
                    playsInline
                    loop
                    muted={false}
                    className="bento-video-element"
                    onEnded={() => setIsPlaying(false)}
                  />

                  {/* Play / Pause Overlay Overlay */}
                  {!isPlaying && (
                    <div className="bento-video-overlay">
                      <div className="bento-play-btn">
                        <Play size={22} fill="currentColor" style={{ marginLeft: 2 }} />
                      </div>
                      <div className="bento-video-caption">
                        <span className="bento-video-caption-title">A Whole System of AI Builders</span>
                        <span className="bento-video-caption-sub">Click to play live automation workflow demo</span>
                      </div>
                    </div>
                  )}

                  {isPlaying && (
                    <button className="bento-pause-btn" onClick={togglePlay}>
                      <Pause size={16} />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* BOTTOM RIGHT: OPPORTUNITY HUB CARD */}
              <motion.div
                className="bento-opportunity-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bento-opp-header">
                  <div>
                    <h3 className="bento-opp-title">AI Opportunity Hub</h3>
                    <p className="bento-opp-desc">Real automation infrastructure matched to your pipeline. As you scale, our systems handle infinite lead volume without extra head-count.</p>
                  </div>
                  <div className="bento-opp-icon">
                    <Activity size={20} />
                  </div>
                </div>

                {/* Visual Banner Preview */}
                <div className="bento-opp-banner">
                  <Image
                    src="/ai.jpeg"
                    alt="Buzzap AI Opportunity Hub"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="bento-opp-img"
                  />
                  <div className="bento-opp-banner-overlay" />
                  <span className="bento-opp-badge">
                    <Sparkles size={12} /> Active Infrastructure
                  </span>
                </div>

                {/* Workflow Items List */}
                <div className="bento-opp-list">
                  {capabilities.map((cap, i) => (
                    <div key={i} className="bento-opp-item">
                      <div className="bento-opp-item-left">
                        <div className="bento-opp-item-icon">
                          <CheckCircle2 size={15} />
                        </div>
                        <div>
                          <div className="bento-opp-item-title">{cap.title}</div>
                          <div className="bento-opp-item-detail">{cap.detail}</div>
                        </div>
                      </div>
                      <span className="bento-status-tag">{cap.status}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* BOTTOM FULL-WIDTH STRIP: SIMPLE PLANS & CTA (From Picture 1) */}
            <motion.div
              className="bento-bottom-strip"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bento-bottom-left">
                <h3 className="bento-bottom-title">Simple plans. Predictable growth.</h3>
                <p className="bento-bottom-sub">
                  Pay once for infrastructure setup. Scale from manual follow-up to 24/7 automated revenue pipelines. Mentorship and direct support included.
                </p>
                <Link href="/pricing" className="bento-bottom-cta">
                  <span>See full pricing & plans</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="bento-bottom-tiers">
                <div className="bento-tier-item">
                  <div className="bento-tier-num">1</div>
                  <div className="bento-tier-info">
                    <div className="bento-tier-name">Beginner Setup</div>
                    <div className="bento-tier-sub">Instant lead capture & validation</div>
                  </div>
                </div>

                <div className="bento-tier-item">
                  <div className="bento-tier-num">2</div>
                  <div className="bento-tier-info">
                    <div className="bento-tier-name">Intermediate Stack</div>
                    <div className="bento-tier-sub">Multi-channel CRM & WhatsApp sync</div>
                  </div>
                </div>

                <div className="bento-tier-item">
                  <div className="bento-tier-num">3</div>
                  <div className="bento-tier-info">
                    <div className="bento-tier-name">Full Automation</div>
                    <div className="bento-tier-sub">Enterprise voice AI & custom workflows</div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

