'use client';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import './SpotlightCard.css';

export default function SpotlightCard({ children, className = '', spotlightColor = 'rgba(99, 102, 241, 0.18)', enableBeam = false }) {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // 3D spring tilt physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 220, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 220, damping: 25 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const posX = e.clientX - rect.left;
    const posY = e.clientY - rect.top;
    setMousePosition({ x: posX, y: posY });
    x.set(posX / rect.width - 0.5);
    y.set(posY / rect.height - 0.5);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`spotlight-card ${className} ${enableBeam ? 'has-border-beam' : ''}`}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Cursor Spotlight Overlay (GetLayers Signature Animation) */}
      <div
        className="spotlight-overlay"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Traveling Border Laser Beam */}
      {enableBeam && <div className="border-beam" />}

      {/* Card Content */}
      <div className="spotlight-card-content">{children}</div>
    </motion.div>
  );
}
