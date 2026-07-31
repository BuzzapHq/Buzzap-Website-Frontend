'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Calendar, Zap, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import './final-cta.css';

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

const avatarImages = ['/product2.jpeg', '/ai.jpeg', '/social.jpeg', '/buzz.jpeg'];

export default function FinalCta() {
  return (
    <section className="fcta-section">
      <div className="fcta-orb fcta-orb-left" />
      <div className="fcta-orb fcta-orb-right" />
      <div className="fcta-orb fcta-orb-center" />
      <div className="fcta-grid-overlay" />

      <div className="fcta-container">
        {/* Image strip */}
        <motion.div
          className="fcta-img-strip"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="fcta-avatar-stack">
            {avatarImages.map((src, i) => (
              <div key={i} className="fcta-avatar" style={{ zIndex: avatarImages.length - i }}>
                <Image src={src} alt="Client" fill className="fcta-avatar-img" />
              </div>
            ))}
          </div>
          <div className="fcta-avatar-text">
            <span className="fcta-avatar-stars">★★★★★</span>
            <span>Trusted by 500+ growing companies</span>
          </div>
        </motion.div>

        <motion.div
          className="fcta-inner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span className="fcta-badge" variants={fadeUp} custom={0}>
            <Zap size={10} />
            Limited Spots Available
          </motion.span>

          <motion.h2 className="fcta-headline" variants={fadeUp} custom={1}>
            Your growth system is<br />
            <span className="fcta-headline-glow">one call away.</span>
          </motion.h2>

          <motion.p className="fcta-desc" variants={fadeUp} custom={2}>
            Book a free strategy call. We&apos;ll audit your current systems, identify your biggest
            revenue leaks, and show you exactly how to fix them with AI automation.
          </motion.p>

          {/* What you get */}
          <motion.div className="fcta-benefits" variants={fadeUp} custom={2.5}>
            {[
              'Full system audit (value: $2,000)',
              'Custom AI growth roadmap',
              'Live demo of your growth stack',
            ].map((b, i) => (
              <div className="fcta-benefit" key={i}>
                <CheckCircle size={13} className="fcta-benefit-check" />
                <span>{b}</span>
              </div>
            ))}
          </motion.div>

          <motion.div className="fcta-actions" variants={fadeUp} custom={3}>
            <Link href="/booking" className="fcta-primary-btn">
              <Calendar size={17} />
              <span>Book a Free Call</span>
              <ArrowRight size={17} />
            </Link>
            <Link href="/demo" className="fcta-secondary-btn">
              Watch Demo First
            </Link>
          </motion.div>

          <motion.p className="fcta-note" variants={fadeUp} custom={4}>
            No commitment. No credit card. Just a conversation.
          </motion.p>
        </motion.div>

        {/* Bottom floating images */}
        <motion.div
          className="fcta-bottom-images"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {['/product4.jpeg', '/product3.jpeg', '/gb.jpeg'].map((src, i) => (
            <div key={i} className="fcta-bottom-img-card">
              <Image src={src} alt="Results" fill className="fcta-bottom-img" />
              <div className="fcta-bottom-img-overlay" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
