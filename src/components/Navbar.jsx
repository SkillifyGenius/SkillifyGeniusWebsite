import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <img src="/favicon.png" alt="SkillifyGenius Logo" className="logo-icon" />
          <span>SkillifyGenius</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="nav-links desktop-menu">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/courses" className={location.pathname === '/courses' ? 'active' : ''}>Courses</Link>
          <Link to="/resources" className={location.pathname === '/resources' ? 'active' : ''}>Resources</Link>
          <Link to="/faq" className={location.pathname === '/faq' ? 'active' : ''}>FAQ</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
        </div>
        
        <div className="nav-actions desktop-menu">
           <Link to="/trial" className="btn btn-primary">Book a Trial</Link>
        </div>

        {/* Mobile menu toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/courses" className={location.pathname === '/courses' ? 'active' : ''}>Courses</Link>
          <Link to="/resources" className={location.pathname === '/resources' ? 'active' : ''}>Resources</Link>
          <Link to="/faq" className={location.pathname === '/faq' ? 'active' : ''}>FAQ</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
          <Link to="/trial" className="btn btn-primary mobile-btn">Book a Trial</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
