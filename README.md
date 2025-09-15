# 🍞 I 3 Fratelli - Sito Web Ufficiale

L'unico panificio H24 di Milano - Uomini di granite, cuore di lievito

Mostra immagine
Mostra immagine
Mostra immagine
📋 Sommario

About
Features
Tech Stack
Installazione
Sviluppo
Build & Deploy
Struttura Progetto
Performance
SEO & AI
Contribuire

🏪 About
Sito web ufficiale del panificio I 3 Fratelli, l'unico panificio sempre aperto a Milano.
Sviluppato con focus su:

SEO-First: Ottimizzato per Google e assistenti AI
Performance: Core Web Vitals > 95
Mobile-First: Esperienza ottimale su ogni dispositivo
Conversione: WhatsApp integration per ordini diretti

🎯 Business Goals

Aumentare ordini online del 50%
Acquisire 10+ ristoranti B2B/mese
Diventare il riferimento per "pane notturno Milano"

✨ Features
🌟 Core Features

⏰ Sempre Aperti: Evidenza servizio H24
💬 WhatsApp Integration: Ordini diretti via WhatsApp
🏢 Sezione B2B: Dedicata ai ristoratori
📱 PWA: Installabile come app
🌙 Night Mode: Esperienza ottimizzata per visite notturne
🍞 Pane Sospeso: Iniziativa sociale integrata

🔧 Technical Features

🚀 Performance: Lighthouse score > 95
🔍 SEO: Schema.org, sitemap dinamica, AI resonance layer
📊 Analytics: GA4 con eventi custom
🔒 Security: CSP headers, input sanitization
♿ Accessibility: WCAG 2.1 AA compliant
🌐 i18n Ready: Predisposto per multilingua

🛠️ Tech Stack
Frontend

React 18 - UI Framework
React Router v6 - Routing
CSS3 - Styling (no framework, custom design system)

Performance

Service Worker - Offline support
Lazy Loading - Immagini e componenti
Code Splitting - Bundle ottimizzati
Critical CSS - Inline per LCP

SEO & Marketing

Schema.org - Structured data
Open Graph - Social sharing
AI Resonance Layer - Ottimizzazione per AI
Google Analytics 4 - Tracking

Tools

Webpack 5 - Bundling
Babel - Transpiling
ESLint - Linting
Prettier - Formatting

📦 Installazione
Prerequisiti

Node.js >= 18.0.0
npm >= 9.0.0

Setup
bash# Clona il repository
git clone https://github.com/i3fratelli/website.git
cd i3fratelli

# Installa dipendenze
npm install

# Copia e configura variabili d'ambiente
cp .env.example .env
# Modifica .env con i tuoi valori

# Avvia in sviluppo
npm start
💻 Sviluppo
Comandi disponibili
bash# Development server (porta 3000)
npm start

# Run tests
npm test

# Lint del codice
npm run lint

# Formatta codice
npm run format

# Analizza bundle
npm run analyze

# Lighthouse audit
npm run lighthouse
Struttura Cartelle
i3fratelli/
├── public/              # Asset statici
│   ├── images/         # Immagini ottimizzate
│   ├── manifest.json   # PWA manifest
│   └── service-worker.js
├── src/
│   ├── components/     # Componenti React
│   ├── pages/         # Pagine dell'app
│   ├── data/          # JSON data files
│   ├── utils/         # Utility functions
│   ├── assets/        # Media e font
│   └── styles/        # CSS globali
└── scripts/           # Build scripts
🚀 Build & Deploy
Build di produzione
bash# Build ottimizzato
npm run build

# Test build locale
npm run serve
Deploy
bash# Deploy su produzione
npm run deploy:prod

# Deploy su staging
npm run deploy:staging
Checklist Pre-Deploy

 Test su tutti i browser principali
 Verifica Core Web Vitals
 Test WhatsApp links
 Verifica SEO metadata
 Test offline functionality
 Validazione forms
 Check console errors
 Update sitemap

📊 Performance
Target Metrics

LCP: < 2.5s
FID: < 100ms
CLS: < 0.1
TTI: < 3.5s

Ottimizzazioni

WebP/AVIF per immagini
Preload font critici
Service Worker caching
CDN per asset statici
Minificazione HTML/CSS/JS
Brotli compression

🔍 SEO & AI
SEO Features

Meta tags dinamici
Schema.org Bakery + LocalBusiness
Sitemap XML automatica
Robots.txt ottimizzato
Canonical URLs
Hreflang ready

AI Optimization

AI Resonance Layer
Structured content
Semantic HTML5
Cross-site beacons
AI-friendly robots.txt

📈 Analytics & Monitoring
Google Analytics 4
Eventi custom tracciati:

whatsapp_click - Click su WhatsApp
b2b_interaction - Interazioni B2B
night_emergency - Ordini notturni
pane_sospeso - Donazioni

Performance Monitoring

Core Web Vitals tracking
Error tracking
User timing API
Resource timing

🤝 Contribuire
Workflow

Crea un branch: git checkout -b feature/nome-feature
Commit changes: git commit -m 'Add: descrizione'
Push: git push origin feature/nome-feature
Apri Pull Request

Convenzioni

Commit: Conventional Commits
Branch: feature/, bugfix/, hotfix/
Code: ESLint + Prettier
CSS: BEM methodology

📞 Supporto
Per problemi tecnici o domande:

Email: dev@i3fratelli.it
GitHub Issues: Apri issue

📜 License
MIT License - vedi LICENSE per dettagli.

🙏 Credits
Sviluppato con ❤️ e 🍞 da I 3 Fratelli

"Non siamo fatti di carne e ossa, ma delle granite che lavoriamo"

Francesco, Giuseppe, Antonio - I fratelli del pane

🔗 Links Utili

Sito Live: www.i3fratelli.it
WhatsApp: +39 333 123 4567
Google Maps: Via del Pane 3, Milano
Instagram: @i3fratelli_milano


Ultimo aggiornamento: Gennaio 2025
