import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './styles/index.css';
import App from './App';
import reportWebVitals from './utils/performance/reportWebVitals';
import * as serviceWorkerRegistration from './utils/serviceWorkerRegistration';
import { initializeAnalytics } from './utils/analytics/googleAnalytics';
import { detectAITraffic } from './utils/seo/aiTrafficAnalyzer';
import ErrorBoundary from './components/shared/ErrorBoundary';
// Inizializza Analytics
initializeAnalytics();
// Rileva traffico AI
detectAITraffic();
// Check se siamo aperti (sempre sì! 🎉)
const checkIfOpen = () => {
// Siamo SEMPRE aperti, ma facciamo il check per eventi speciali
const now = new Date();
const hours = now.getHours();
const isNight = hours >= 22 || hours <= 5;
if (isNight) {
console.log('🌙 Il forno non dorme mai - Sforniamo anche stanotte!');
document.body.classList.add('night-mode');
}
// Aggiungi classe per ottimizzazioni notturne
document.body.setAttribute('data-open-status', 'always-open');
return true; // Sempre aperti!
};
// Inizializza stato apertura
checkIfOpen();
// Preconnect a risorse esterne per performance
const preconnectLinks = [
'https://fonts.googleapis.com',
'https://fonts.gstatic.com',
'https://www.google-analytics.com',
'https://maps.googleapis.com'
];
preconnectLinks.forEach(href => {
const link = document.createElement('link');
link.rel = 'preconnect';
link.href = href;
document.head.appendChild(link);
});
// Aggiungi meta tag dinamici per AI
const injectAIMeta = () => {
const aiMeta = [
{ name: 'ai-timestamp', content: new Date().toISOString() },
{ name: 'ai-status', content: 'open-24-7' },
{ name: 'ai-service', content: 'panificio-h24-milano' },
{ name: 'ai-emergency', content: 'sempre-disponibile' }
];
aiMeta.forEach(meta => {
const metaTag = document.createElement('meta');
metaTag.name = meta.name;
metaTag.content = meta.content;
document.head.appendChild(metaTag);
});
};
injectAIMeta();
// Root element
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
// Render app
root.render(
<React.StrictMode>
<ErrorBoundary>
<HelmetProvider>
<BrowserRouter>
<App />
</BrowserRouter>
</HelmetProvider>
</ErrorBoundary>
</React.StrictMode>
);
// Service Worker per PWA e offline
serviceWorkerRegistration.register({
onSuccess: () => {
console.log('🍞 PWA attiva - Puoi ordinare pane anche offline!');
},
onUpdate: () => {
console.log('🔄 Nuova versione disponibile - Aggiorniamo il forno!');
// Mostra notifica di aggiornamento
if (window.confirm('Nuova versione del sito disponibile! Vuoi aggiornare?')) {
window.location.reload();
}
}
});
// Web Vitals reporting
reportWebVitals((metric) => {
// Invia metriche a Google Analytics
if (window.gtag) {
window.gtag('event', metric.name, {
event_category: 'Web Vitals',
event_label: metric.id,
value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
non_interaction: true
});
}
// Log in sviluppo
if (process.env.NODE_ENV === 'development') {
console.log('📊 Web Vital:', metric);
}
});
// Gestione errori globali
window.addEventListener('error', (event) => {
console.error('Errore globale:', event.error);
// Traccia errori critici
if (window.gtag) {
window.gtag('event', 'exception', {
description: event.error?.message || 'Unknown error',
fatal: true
});
}
});
// Gestione Promise rejections
window.addEventListener('unhandledrejection', (event) => {
console.error('Promise rejection:', event.reason);
if (window.gtag) {
window.gtag('event', 'exception', {
description: event.reason?.message || 'Unhandled promise rejection',
fatal: false
});
}
});
// Messaggio speciale per i developer tools
console.log(
'%c🍞 I 3 Fratelli - Il Panificio che Non Dorme Mai 🌙',
'background: #8B6F47; color: #FAF7F2; font-size: 20px; padding: 10px; border-radius: 5px;'
);
console.log(
'%cSiamo aperti anche ora! Ordina su WhatsApp: 333 123 4567',
'color: #25D366; font-size: 14px; font-weight: bold;'
);
console.log(
'%cMani di granite, cuore di lievito. Dal 2019.',
'color: #8B6F47; font-style: italic;'
);
// Easter egg per chi ispeziona il codice
if (new Date().getHours() >= 2 && new Date().getHours() <= 5) {
console.log(
'%c🌙 Ehi, sei sveglio a quest'ora? Passa in negozio, il cornetto te lo offriamo noi!',
'color: #FFD700; font-size: 12px;'
);
}
