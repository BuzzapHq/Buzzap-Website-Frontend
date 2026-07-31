'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, TrendingUp, Users, Zap } from 'lucide-react';
import './case-studies.css';

const cases = [
  {
    industry: 'E-Commerce',
    company: 'RetailPulse',
    result: '340% ROI',
    period: 'in 90 days',
    desc: 'AI-powered lead nurturing and automated follow-up sequences turned cold leads into buyers within 48 hours.',
    metrics: [
      { icon: TrendingUp, value: '340%', label: 'ROI increase' },
      { icon: Users,      value: '2.4K',  label: 'Leads converted' },
      { icon: Zap,        value: '6 min', label: 'Avg. follow-up' },
    ],
    tag: 'AI Marketing + CRM',
    image: '/product2.jpeg',
    color: '#818cf8',
  },
  {
    industry: 'Real Estate',
    company: 'UrbanNest Group',
    result: '$4.2M',
    period: 'new pipeline',
    desc: 'Full AI sales system — ad capture to WhatsApp follow-up to CRM enrichment — all automated, zero manual work.',
    metrics: [
      { icon: TrendingUp, value: '$4.2M', label: 'New pipeline' },
      { icon: Users,      value: '89%',   label: 'Lead response rate' },
      { icon: Zap,        value: '3×',    label: 'Faster conversions' },
    ],
    tag: 'Full AI Growth System',
    image: '/social.jpeg',
    color: '#10b981',
  },
  {
    industry: 'SaaS',
    company: 'Flowmatic HQ',
    result: '98%',
    period: 'client retention',
    desc: 'Replaced 5 disconnected tools with one unified automation layer. Sales cycle dropped from 14 days to 3.',
    metrics: [
      { icon: TrendingUp, value: '98%',  label: 'Retention rate' },
      { icon: Users,      value: '5→1',  label: 'Tools consolidated' },
      { icon: Zap,        value: '78%',  label: 'Faster sales cycle' },
    ],
    tag: 'Systems Integration',
    image: '/ai.jpeg',
    color: '#c084fc',
  },
];

export default function CaseStudies() {
  return (
    <section className="cs-section">
      <div className="cs-glow" />

      <div className="cs-container">
        {/* Header */}
        <motion.div
          className="cs-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="cs-badge">Proven Results</span>
          <h2 className="cs-title">
            Real businesses.{' '}
            <span className="cs-title-accent">Real numbers.</span>
          </h2>
          <p className="cs-subtitle">
            These aren&apos;t projections. They&apos;re what happens when you replace broken systems with intelligent ones.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="cs-grid">
          {cases.map((c, i) => (
            <motion.article
              key={i}
              className="cs-card"
              style={{ '--accent': c.color }}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ delay: i * 0.13, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* ── Image ── */}
              <div className="cs-img-box">
                <Image
                  src={c.image}
                  alt={c.company}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="cs-img"
                />
                <div className="cs-img-fade" />

                {/* industry pill */}
                <span className="cs-industry">{c.industry}</span>

                {/* big result */}
                <div className="cs-result">
                  <span className="cs-result-num">{c.result}</span>
                  <span className="cs-result-sub">{c.period}</span>
                </div>
              </div>

              {/* ── Body ── */}
              <div className="cs-body">
                <p className="cs-company">{c.company}</p>
                <p className="cs-desc">{c.desc}</p>

                {/* metrics */}
                <div className="cs-metrics">
                  {c.metrics.map((m, mi) => {
                    const Icon = m.icon;
                    return (
                      <div className="cs-metric" key={mi}>
                        <Icon size={11} className="cs-metric-icon" />
                        <span className="cs-metric-val">{m.value}</span>
                        <span className="cs-metric-lbl">{m.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* footer */}
                <div className="cs-footer">
                  <span className="cs-tag">{c.tag}</span>
                  <span className="cs-arrow"><ArrowUpRight size={14} /></span>
                </div>
              </div>

              {/* corner glow */}
              <div className="cs-card-glow" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
