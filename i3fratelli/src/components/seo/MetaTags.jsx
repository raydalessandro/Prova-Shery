import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import config from '../../data/config.json';
import seoContent from '../../data/seo-content.json';
const MetaTags = ({
title,
description,
keywords,
image,
type = 'website',
customMeta = {}
}) => {
const location = useLocation();
const currentUrl = ${config.seo.url}${location.pathname};
// Ottieni meta di default per la pagina corrente
const pagePath = location.pathname.slice(1) || 'home';
const pageDefaults = seoContent.pages[pagePath];
// Usa i valori passati come props o i default della pagina o i default globali
const finalTitle = title || pageDefaults?.title || config.seo.defaultTitle;
const finalDescription = description || pageDefaults?.metaDescription || config.seo.defaultDescription;
const finalKeywords = keywords || pageDefaults?.keywords?.join(', ') || config.seo.defaultKeywords.join(', ');
const finalImage = image || config.seo.ogImage;
// Aggiungi suffisso al titolo se non è la home
const titleWithBrand = location.pathname === '/'
? finalTitle
: ${finalTitle} | ${config.brand.name};
// Meta tags per orari e disponibilità
const getCurrentStatus = () => {
const hour = new Date().getHours();
const isNight = hour >= 22 || hour < 5;
return {
status: 'OPEN', // Sempre aperti!
message: isNight ? 'Aperti ora - Servizio notturno attivo' : 'Aperti ora',
availability: '24/7'
};
};
const status = getCurrentStatus();
return (
<Helmet>
{/* Title */}
<title>{titleWithBrand}</title>
  {/* Basic Meta Tags */}
  <meta name="description" content={finalDescription} />
  <meta name="keywords" content={finalKeywords} />
  <meta name="author" content={config.brand.name} />
  <link rel="canonical" href={currentUrl} />
  
  {/* Status Meta Tags */}
  <meta name="business-status" content={status.status} />
  <meta name="business-hours" content="00:00-24:00" />
  <meta name="availability" content={status.availability} />
  
  {/* Open Graph Tags */}
  <meta property="og:type" content={type} />
  <meta property="og:url" content={currentUrl} />
  <meta property="og:title" content={finalTitle} />
  <meta property="og:description" content={finalDescription} />
  <meta property="og:image" content={`${config.seo.url}${finalImage}`} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content={config.brand.name} />
  <meta property="og:locale" content="it_IT" />
  
  {/* Twitter Card Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={currentUrl} />
  <meta name="twitter:title" content={finalTitle} />
  <meta name="twitter:description" content={finalDescription} />
  <meta name="twitter:image" content={`${config.seo.url}${finalImage}`} />
  
  {/* AI and Voice Search Meta Tags */}
  <meta name="ai-content-type" content="bakery-24h" />
  <meta name="ai-service-hours" content="24/7" />
  <meta name="ai-emergency-available" content="true" />
  <meta name="voice-search-optimized" content="true" />
  
  {/* Local Business Meta Tags */}
  <meta name="geo.region" content="IT-MI" />
  <meta name="geo.placename" content="Milano" />
  <meta name="geo.position" content={`${config.contact.address.coordinates.lat};${config.contact.address.coordinates.lng}`} />
  <meta name="ICBM" content={`${config.contact.address.coordinates.lat}, ${config.contact.address.coordinates.lng}`} />
  
  {/* Mobile Meta Tags */}
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta name="apple-mobile-web-app-title" content={config.brand.name} />
  
  {/* Verification Tags */}
  {config.seo.googleSiteVerification && (
    <meta name="google-site-verification" content={config.seo.googleSiteVerification} />
  )}
  
  {/* Custom Meta Tags */}
  {Object.entries(customMeta).map(([name, content]) => (
    <meta key={name} name={name} content={content} />
  ))}
  
  {/* Preload critical resources */}
  <link rel="preload" as="font" href="/fonts/PlayfairDisplay-Bold.woff2" crossOrigin="anonymous" />
  <link rel="preload" as="font" href="/fonts/OpenSans-Regular.woff2" crossOrigin="anonymous" />
  
  {/* Prefetch important pages */}
  <link rel="prefetch" href="/b2b" />
  <link rel="prefetch" href="/sempre-24h" />
  
  {/* DNS Prefetch for external resources */}
  <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
  <link rel="dns-prefetch" href="https://www.google-analytics.com" />
  <link rel="dns-prefetch" href="https://maps.googleapis.com" />
</Helmet>
);
};
export default MetaTags;
