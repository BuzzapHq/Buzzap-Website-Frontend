'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Globe, Menu, X, ChevronDown, HelpCircle, DollarSign, Play, FileText, Briefcase, LayoutGrid, BookOpen, Users } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (pathname === '/login' || pathname.startsWith('/dashboard') || pathname === '/signup') return null;

  const servicesItems = [
    { href: '/services#ai-marketing', icon: LayoutGrid, title: 'AI Marketing', desc: 'Automated campaigns that maximize ROI across every channel.' },
    { href: '/services#brand-growth', icon: Briefcase, title: 'Brand Growth', desc: 'Strategy-driven campaigns that amplify authority and awareness.' },
    { href: '/services#ai-solutions', icon: Users, title: 'AI Solutions', desc: 'Custom AI integrations that streamline operations.' },
  ];

  const moreItems = [
    { href: '/demo', icon: Play, title: 'Demo', desc: 'See Buzzap AI systems live in action.' },
    { href: '/faq', icon: HelpCircle, title: 'FAQ', desc: 'Frequently asked questions answered.' },
    { href: '/terms', icon: FileText, title: 'Terms & Conditions', desc: 'Our policies and legal agreements.' },
  ];

  return (
    <>
      <nav className={`navbar-container ${isScrolled ? 'scrolled' : ''}`} ref={navRef}>
        <div className="navbar-wrapper">

          {/* Brand Logo + Name */}
          <div className="navbar-left">
            <Link href="/" className="navbar-brand">
              <Image src="/logo.png" alt="Buzzap" className="logo-img" width={120} height={30} style={{ height: 30, width: 'auto' }} />
              <span className="brand-name">Buzzap</span>
            </Link>
          </div>

          {/* Center Nav Links */}
          <div className="navbar-center">
            <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>

            {/* Services Dropdown */}
            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`nav-link dropdown-toggle ${activeDropdown === 'services' ? 'active' : ''}`}>
                Services <ChevronDown size={14} className={`chevron-icon ${activeDropdown === 'services' ? 'rotated' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="nav-mega-dropdown"
                  >
                    {servicesItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link key={item.href} href={item.href} className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                          <div className="dropdown-icon-box"><Icon size={16} /></div>
                          <div><h4>{item.title}</h4><p>{item.desc}</p></div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/why-buzzap" className={`nav-link ${pathname === '/why-buzzap' ? 'active' : ''}`}>Why Buzzap</Link>
            <Link href="/insights" className={`nav-link ${pathname === '/insights' ? 'active' : ''}`}>Insights</Link>
            <Link href="/case-studies" className={`nav-link ${pathname === '/case-studies' ? 'active' : ''}`}>Case Studies</Link>
            <Link href="/pricing" className={`nav-link ${pathname === '/pricing' ? 'active' : ''}`}>Pricing</Link>

            {/* More Dropdown */}
            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setActiveDropdown('more')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`nav-link dropdown-toggle ${activeDropdown === 'more' ? 'active' : ''}`}>
                More <ChevronDown size={14} className={`chevron-icon ${activeDropdown === 'more' ? 'rotated' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'more' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="nav-mega-dropdown"
                  >
                    {moreItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link key={item.href} href={item.href} className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                          <div className="dropdown-icon-box"><Icon size={16} /></div>
                          <div><h4>{item.title}</h4><p>{item.desc}</p></div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side */}
          <div className="navbar-right">
            <div className="lang-selection">
              <Globe size={16} />
              <span className="uppercase-code">EN</span>
            </div>
            <Link href="/booking" className="btn-audit">
              <span>Get Free Audit</span>
              <ArrowUpRight size={14} className="audit-arrow" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="mobile-menu"
          >
            <div className="mobile-menu-links">
              <Link href="/" onClick={() => setMobileMenu(false)}>Home</Link>
              <Link href="/services" onClick={() => setMobileMenu(false)}>Services</Link>
              <Link href="/why-buzzap" onClick={() => setMobileMenu(false)}>Why Buzzap</Link>
              <Link href="/insights" onClick={() => setMobileMenu(false)}>Insights</Link>
              <Link href="/case-studies" onClick={() => setMobileMenu(false)}>Case Studies</Link>
              <Link href="/pricing" onClick={() => setMobileMenu(false)}>Pricing</Link>
              <Link href="/demo" onClick={() => setMobileMenu(false)}>Demo</Link>
              <Link href="/faq" onClick={() => setMobileMenu(false)}>FAQ</Link>
            </div>
            <button className="mobile-btn" onClick={() => setMobileMenu(false)}>
              <Link href="/booking">Get Free Audit</Link>
              <ArrowUpRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
