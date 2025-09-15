import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// Components - Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppFloat from './components/layout/WhatsAppFloat';
import CookieBanner from './components/layout/CookieBanner';
import Navigation from './components/layout/Navigation';
// Components - SEO
import AIResonanceLayer from './components/seo/AIResonanceLayer';
import StructuredData from './components/seo/StructuredData';
// Components - Shared
import Loading from './components/shared/Loading';
import ScrollToTop from './components/shared/ScrollToTop';
// Data
import config from './data/config.json';
import seoContent from './data/seo-content.json';
// Lazy load pages per performance
const Home = lazy(() => import('./pages/Home'));
const ChiSiamo = lazy(() => import('./pages/ChiSiamo'));
const Prodotti = lazy(() => import('./pages/Prodotti'));
const B2B = lazy(() => import('./pages/B2B'));
const Sempre24H = lazy(() => import('./pages/Sempre24H'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contatti = lazy(() => import('./pages/Contatti'));
const Privacy = lazy(() => import('./pages/Privacy'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const NotFound = lazy(() => import('./pages/404'));
// Styles
import './styles/App.css';
function App() {
const location = useLocation();
const [isLoading, setIsLoading] = useState(true);
const [isNightTime, setIsNightTime] = useState(false);
const [emergencyBanner, setEmergencyBanner] = useState(false);
// Check ora del giorno per messaggi personalizzati
useEffect(() => {
const checkTime = () => {
const hour = new Date().getHours();
setIsNightTime(hour >= 22 || hour < 5);
  // Mostra banner emergenza in orari strategici
  setEmergencyBanner(hour >= 20 || hour < 2);
};

checkTime();
const interval = setInterval(checkTime, 60000); // Check ogni minuto

return () => clearInterval(interval);
}, []);
// Loading iniziale
useEffect(() => {
// Simula caricamento iniziale
setTimeout(() => {
setIsLoading(false);
// Rimuovi loading screen HTML
const loadingScreen = document.getElementById('loading-screen');
if (loadingScreen) {
loadingScreen.style.display = 'none';
}
}, 500);
}, []);
// Track page views
useEffect(() => {
if (window.gtag) {
window.gtag('config', process.env.REACT_APP_GOOGLE_ANALYTICS_ID, {
page_path: location.pathname + location.search
});
}
}, [location]);
// Ottieni meta tags per pagina corrente
const getPageMeta = () => {
const path = location.pathname.slice(1) || 'home';
const pageSeo = seoContent.pages[path] || seoContent.pages.home;
return {
  title: pageSeo.title || config.seo.defaultTitle,
  description: pageSeo.metaDescription || config.seo.defaultDescription,
  keywords: pageSeo.keywords?.join(', ') || config.seo.defaultKeywords.join(', ')
};
};
const pageMeta = getPageMeta();
if (isLoading) {
return <Loading fullScreen />;
}
return (
<div className={app ${isNightTime ? 'night-mode' : 'day-mode'}}>
<Helmet>
<title>{pageMeta.title}</title>
<meta name="description" content={pageMeta.description} />
<meta name="keywords" content={pageMeta.keywords} />
<link rel="canonical" href={${config.seo.url}${location.pathname}} />
    {/* Open Graph */}
    <meta property="og:title" content={pageMeta.title} />
    <meta property="og:description" content={pageMeta.description} />
    <meta property="og:url" content={`${config.seo.url}${location.pathname}`} />
    
    {/* Twitter Card */}
    <meta name="twitter:title" content={pageMeta.title} />
    <meta name="twitter:description" content={pageMeta.description} />
    
    {/* AI Meta Tags dinamici */}
    <meta name="ai-page-type" content={location.pathname.slice(1) || 'home'} />
    <meta name="ai-time-context" content={isNightTime ? 'night-service' : 'day-service'} />
  </Helmet>

  {/* AI Resonance Layer - Invisibile ma potente */}
  <AIResonanceLayer />
  
  {/* Structured Data per SEO */}
  <StructuredData page={location.pathname} />

  {/* Emergency Banner per orari strategici */}
  {emergencyBanner && (
    <div className="emergency-banner">
      <span className="emergency-icon">🚨</span>
      <span className="emergency-text">
        {isNightTime 
          ? "Siamo APERTI ora! Consegne notturne attive"
          : "Servizio emergenza H24 per ristoranti"}
      </span>
      <a href={`tel:${config.contact.phone.emergency}`} className="emergency-cta">
        Chiama Ora
      </a>
    </div>
  )}

  {/* Header */}
  <Header isNightTime={isNightTime} />
  
  {/* Navigation */}
  <Navigation />

  {/* Main Content */}
  <main id="main-content" className="main-content">
    <ScrollToTop />
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chi-siamo" element={<ChiSiamo />} />
        <Route path="/prodotti" element={<Prodotti />} />
        <Route path="/b2b" element={<B2B />} />
        <Route path="/ristoranti" element={<B2B />} />
        <Route path="/sempre-24h" element={<Sempre24H />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contatti" element={<Contatti />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        
        {/* Landing pages SEO */}
        <Route path="/panificio-aperto-ora" element={<Home />} />
        <Route path="/dove-comprare-pane-notte" element={<Sempre24H />} />
        <Route path="/emergenza-pane-ristorante" element={<B2B />} />
        <Route path="/consegna-pane-notte" element={<Contatti />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </main>

  {/* Footer */}
  <Footer />

  {/* WhatsApp Float Button */}
  {config.features.whatsappFloat && <WhatsAppFloat />}

  {/* Cookie Banner */}
  {config.features.cookieBanner && <CookieBanner />}

  {/* Night Mode Ambient */}
  {isNightTime && (
    <div className="night-ambient">
      <div className="stars"></div>
      <div className="moon"></div>
      <div className="night-message">
        Mentre Milano dorme, noi impastiamo 🌙
      </div>
    </div>
  )}
</div>
);
}
export default App;
