import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollDirection } from '../shared/ScrollToTop';
import config from '../../data/config.json';
import './Navigation.css';
const Navigation = () => {
const location = useLocation();
const scrollDirection = useScrollDirection();
const [isOpen, setIsOpen] = useState(false);
const [isScrolled, setIsScrolled] = useState(false);
// Controlla se siamo di notte
const isNightTime = new Date().getHours() >= 22 || new Date().getHours() < 5;
useEffect(() => {
const handleScroll = () => {
setIsScrolled(window.scrollY > 100);
};
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);
// Chiudi menu al cambio di route
useEffect(() => {
setIsOpen(false);
}, [location]);
const navItems = [
{ path: '/', label: 'Home', icon: '🏠' },
{ path: '/chi-siamo', label: 'Chi Siamo', icon: '👥' },
{ path: '/prodotti', label: 'Prodotti', icon: '🍞' },
{ path: '/b2b', label: 'Ristoranti', icon: '🏢', highlight: true },
{ path: '/sempre-24h', label: '24H', icon: '🌙', special: true },
{ path: '/blog', label: 'Blog', icon: '📖' },
{ path: '/contatti', label: 'Contatti', icon: '📍' }
];
const isActive = (path) => {
if (path === '/') {
return location.pathname === '/';
}
return location.pathname.startsWith(path);
};
return (
<>
{/* Desktop Navigation (integrata nell'header) */}
<nav
className={navigation-desktop ${isScrolled ? 'scrolled' : ''} ${scrollDirection === 'down' ? 'hidden' : ''}}
>
<div className="container">
<div className="nav-wrapper">
<ul className="nav-list">
{navItems.map(item => (
<li key={item.path} className="nav-item">
<Link
to={item.path}
className={nav-link                        ${isActive(item.path) ? 'active' : ''}                        ${item.highlight ? 'highlight' : ''}                        ${item.special ? 'special' : ''}
}
>
{item.special && <span className="nav-icon">{item.icon}</span>}
{item.label}
{item.special && isNightTime && (
<span className="night-badge pulse">ORA</span>
)}
</Link>
</li>
))}
</ul>
</div>
</div>
</nav>
  {/* Mobile Bottom Navigation */}
  <nav className="navigation-mobile">
    <div className="mobile-nav-bar">
      {navItems.slice(0, 5).map(item => (
        <Link
          key={item.path}
          to={item.path}
          className={`mobile-nav-item ${isActive(item.path) ? 'active' : ''}`}
        >
          <span className="mobile-nav-icon">{item.icon}</span>
          <span className="mobile-nav-label">{item.label}</span>
          {item.special && isNightTime && (
            <span className="mobile-night-dot"></span>
          )}
        </Link>
      ))}
    </div>
  </nav>

  {/* Quick Action Button Mobile */}
  <div className="mobile-quick-actions">
    
      href={`https://wa.me/${config.contact.whatsapp.number}`}
      className="quick-action-whatsapp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="whatsapp-icon">💬</span>
    </a>
  </div>
</>
);
};
export default Navigation;
