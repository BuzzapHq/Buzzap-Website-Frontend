'use client';
import { motion } from 'framer-motion';
import './infrabar.css';

const tools = [
  { name: 'OpenAI', color: '#10a37f', bg: 'rgba(16,163,127,0.1)', border: 'rgba(16,163,127,0.25)', abbr: 'OA' },
  { name: 'Claude', color: '#d97706', bg: 'rgba(217,119,6,0.1)', border: 'rgba(217,119,6,0.25)', abbr: 'AI' },
  { name: 'Meta Ads', color: '#0082fb', bg: 'rgba(0,130,251,0.1)', border: 'rgba(0,130,251,0.25)', abbr: 'M' },
  { name: 'Google Ads', color: '#4285f4', bg: 'rgba(66,133,244,0.1)', border: 'rgba(66,133,244,0.25)', abbr: 'G' },
  { name: 'Make.com', color: '#a259ff', bg: 'rgba(162,89,255,0.1)', border: 'rgba(162,89,255,0.25)', abbr: 'Mk' },
  { name: 'Voiceflow', color: '#5865f2', bg: 'rgba(88,101,242,0.1)', border: 'rgba(88,101,242,0.25)', abbr: 'Vf' },
  { name: 'Vapi', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.25)', abbr: 'V' },
  { name: 'HeyGen', color: '#ec4899', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.25)', abbr: 'Hg' },
  { name: 'Zoho CRM', color: '#e84142', bg: 'rgba(232,65,66,0.1)', border: 'rgba(232,65,66,0.25)', abbr: 'Zh' },
  { name: 'Apollo.io', color: '#f97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.25)', abbr: 'Ap' },
  { name: 'Instantly', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.25)', abbr: 'In' },
  { name: 'Cal.com', color: '#6366f1', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.25)', abbr: 'Ca' },
  { name: 'Brevo', color: '#059669', bg: 'rgba(5,150,105,0.1)', border: 'rgba(5,150,105,0.25)', abbr: 'Br' },
  { name: 'Clay', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)', abbr: 'Cl' },
  { name: 'HubSpot', color: '#ff7a59', bg: 'rgba(255,122,89,0.1)', border: 'rgba(255,122,89,0.25)', abbr: 'Hs' },
  { name: 'WhatsApp', color: '#25d366', bg: 'rgba(37,211,102,0.1)', border: 'rgba(37,211,102,0.25)', abbr: 'Wa' },
];

export default function InfraBar() {
  const doubled = [...tools, ...tools];

  return (
    <section className="infra-section">
      <div className="infra-section-glow" />

      <motion.div
        className="infra-header"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="infra-title">
          Built on world-class <span className="infra-glow-text">AI infrastructure</span>
        </h2>
        <p className="infra-subtitle">Integrating the best tools so you don&apos;t have to.</p>
      </motion.div>

      <div className="infra-ticker-wrapper">
        <div className="infra-ticker-fade infra-ticker-fade-left" />
        <div className="infra-ticker-fade infra-ticker-fade-right" />

        <div className="infra-ticker-track">
          {doubled.map((tool, i) => (
            <div
              className="infra-tool-chip"
              key={i}
              style={{
                '--tool-color': tool.color,
                '--tool-bg': tool.bg,
                '--tool-border': tool.border,
              }}
            >
              <div className="infra-tool-logo" style={{ background: tool.bg, border: `1px solid ${tool.border}`, color: tool.color }}>
                {tool.abbr}
              </div>
              <span className="infra-tool-name">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
