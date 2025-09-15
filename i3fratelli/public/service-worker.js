/* ========================================
   SERVICE WORKER - I 3 FRATELLI
   PWA con supporto offline e cache strategica
   ======================================== */
const CACHE_NAME = 'i3fratelli-v1.0.0';
const RUNTIME_CACHE = 'i3fratelli-runtime';
const IMAGE_CACHE = 'i3fratelli-images';
// Asset critici da cachare subito
const PRECACHE_URLS = [
'/',
'/index.html',
'/manifest.json',
'/favicon.ico',
'/offline.html',
// CSS principali
'/static/css/main.css',
// JS principali
'/static/js/main.js',
// Immagini critiche
'/images/logo.png',
'/images/hero/pane-notte.jpg',
// Font
'/fonts/PlayfairDisplay-Bold.woff2',
'/fonts/OpenSans-Regular.woff2',
// Pagine principali
'/chi-siamo',
'/prodotti',
'/contatti'
];
// Pattern per risorse da cachare
const CACHE_PATTERNS = {
images: /.(png|jpg|jpeg|svg|gif|webp|avif)$/,
fonts: /.(woff|woff2|ttf|eot)$/,
styles: /.(css)$/,
scripts: /.(js)$/,
documents: /.(html)$/
};
// Strategia di cache per tipo di risorsa
const CACHE_STRATEGIES = {
// Cache First - per asset statici
cacheFirst: [
CACHE_PATTERNS.fonts,
CACHE_PATTERNS.images
],
// Network First - per HTML e API
networkFirst: [
CACHE_PATTERNS.documents,
//api//
],
// Stale While Revalidate - per CSS e JS
staleWhileRevalidate: [
CACHE_PATTERNS.styles,
CACHE_PATTERNS.scripts
]
};
// Install event - precache assets
self.addEventListener('install', (event) => {
console.log('[ServiceWorker] Install');
event.waitUntil(
caches.open(CACHE_NAME)
.then((cache) => {
console.log('[ServiceWorker] Pre-caching assets');
return cache.addAll(PRECACHE_URLS);
})
.then(() => {
console.log('[ServiceWorker] Skip waiting');
return self.skipWaiting();
})
.catch((error) => {
console.error('[ServiceWorker] Pre-cache failed:', error);
})
);
});
// Activate event - cleanup vecchie cache
self.addEventListener('activate', (event) => {
console.log('[ServiceWorker] Activate');
event.waitUntil(
caches.keys()
.then((cacheNames) => {
return Promise.all(
cacheNames
.filter((cacheName) => {
return cacheName !== CACHE_NAME &&
cacheName !== RUNTIME_CACHE &&
cacheName !== IMAGE_CACHE;
})
.map((cacheName) => {
console.log('[ServiceWorker] Deleting old cache:', cacheName);
return caches.delete(cacheName);
})
);
})
.then(() => {
console.log('[ServiceWorker] Claiming clients');
return self.clients.claim();
})
);
});
// Fetch event - gestione richieste
self.addEventListener('fetch', (event) => {
const { request } = event;
const url = new URL(request.url);
// Ignora richieste non-GET
if (request.method !== 'GET') {
return;
}
// Ignora richieste cross-origin
if (url.origin !== location.origin) {
return;
}
// Determina la strategia di cache
const strategy = getStrategyForRequest(request);
switch (strategy) {
case 'cacheFirst':
event.respondWith(cacheFirst(request));
break;
case 'networkFirst':
event.respondWith(networkFirst(request));
break;
case 'staleWhileRevalidate':
event.respondWith(staleWhileRevalidate(request));
break;
default:
event.respondWith(networkOnly(request));
}
});
// Strategie di cache
/**

Cache First - controlla prima la cache
*/
async function cacheFirst(request) {
const cache = await caches.open(IMAGE_CACHE);
const cached = await cache.match(request);

if (cached) {
console.log('[ServiceWorker] Cache hit:', request.url);
return cached;
}
try {
const response = await fetch(request);
if (response.ok) {
  await cache.put(request, response.clone());
}

return response;
} catch (error) {
console.error('[ServiceWorker] Fetch failed:', error);
return caches.match('/offline.html');
}
}
/**

Network First - prova prima la rete
*/
async function networkFirst(request) {
const cache = await caches.open(RUNTIME_CACHE);

try {
const response = await fetch(request);
if (response.ok) {
  await cache.put(request, response.clone());
}

return response;
} catch (error) {
console.log('[ServiceWorker] Network failed, trying cache:', request.url);
const cached = await cache.match(request);
if (cached) {
  return cached;
}

// Se è una pagina HTML, mostra offline page
if (request.headers.get('accept').includes('text/html')) {
  return caches.match('/offline.html');
}

throw error;
}
}
/**

Stale While Revalidate - ritorna dalla cache e aggiorna
*/
async function staleWhileRevalidate(request) {
const cache = await caches.open(RUNTIME_CACHE);

const fetchPromise = fetch(request).then((response) => {
if (response.ok) {
cache.put(request, response.clone());
}
return response;
});
const cached = await cache.match(request);
return cached || fetchPromise;
}
/**

Network Only - solo rete
*/
async function networkOnly(request) {
try {
return await fetch(request);
} catch (error) {
console.error('[ServiceWorker] Network only failed:', error);
if (request.headers.get('accept').includes('text/html')) {
return caches.match('/offline.html');
}
throw error;
}
}

/**

Determina strategia per richiesta
*/
function getStrategyForRequest(request) {
const url = request.url;

// Cache First
for (const pattern of CACHE_STRATEGIES.cacheFirst) {
if (pattern.test(url)) {
return 'cacheFirst';
}
}
// Network First
for (const pattern of CACHE_STRATEGIES.networkFirst) {
if (pattern.test(url)) {
return 'networkFirst';
}
}
// Stale While Revalidate
for (const pattern of CACHE_STRATEGIES.staleWhileRevalidate) {
if (pattern.test(url)) {
return 'staleWhileRevalidate';
}
}
return 'networkOnly';
}
// Background Sync per form offline
self.addEventListener('sync', (event) => {
console.log('[ServiceWorker] Background sync:', event.tag);
if (event.tag === 'sync-forms') {
event.waitUntil(syncOfflineForms());
}
});
/**

Sincronizza form salvati offline
*/
async function syncOfflineForms() {
try {
const cache = await caches.open('offline-forms');
const requests = await cache.keys();
const promises = requests.map(async (request) => {
try {
const response = await fetch(request.clone());
 if (response.ok) {
   await cache.delete(request);
   console.log('[ServiceWorker] Form synced:', request.url);
 }
} catch (error) {
console.error('[ServiceWorker] Form sync failed:', error);
}
});
await Promise.all(promises);
} catch (error) {
console.error('[ServiceWorker] Sync failed:', error);
}
}

// Push Notifications
self.addEventListener('push', (event) => {
console.log('[ServiceWorker] Push received');
const options = {
body: event.data ? event.data.text() : 'Nuovo pane appena sfornato!',
icon: '/images/icons/icon-192x192.png',
badge: '/images/icons/badge-72x72.png',
vibrate: [100, 50, 100],
data: {
dateOfArrival: Date.now(),
primaryKey: 1
},
actions: [
{
action: 'ordina',
title: 'Ordina ora',
icon: '/images/icons/cart.png'
},
{
action: 'chiudi',
title: 'Chiudi',
icon: '/images/icons/close.png'
}
]
};
event.waitUntil(
self.registration.showNotification('I 3 Fratelli - Sempre Aperti', options)
);
});
// Notification Click
self.addEventListener('notificationclick', (event) => {
console.log('[ServiceWorker] Notification click:', event.action);
event.notification.close();
if (event.action === 'ordina') {
event.waitUntil(
clients.openWindow('/prodotti')
);
} else {
event.waitUntil(
clients.openWindow('/')
);
}
});
// Message handler per comunicare con app
self.addEventListener('message', (event) => {
console.log('[ServiceWorker] Message received:', event.data);
if (event.data.type === 'SKIP_WAITING') {
self.skipWaiting();
}
if (event.data.type === 'CLEAR_CACHE') {
event.waitUntil(
caches.keys().then((cacheNames) => {
return Promise.all(
cacheNames.map((cacheName) => {
return caches.delete(cacheName);
})
);
})
);
}
});
// Periodic Background Sync (se supportato)
self.addEventListener('periodicsync', (event) => {
if (event.tag === 'update-prices') {
event.waitUntil(updatePrices());
}
});
/**

Aggiorna prezzi in background
*/
async function updatePrices() {
try {
const response = await fetch('/api/products/prices');
const prices = await response.json();
// Salva in cache
const cache = await caches.open(RUNTIME_CACHE);
await cache.put(
new Request('/api/products/prices'),
new Response(JSON.stringify(prices))
);
console.log('[ServiceWorker] Prices updated');
} catch (error) {
console.error('[ServiceWorker] Price update failed:', error);
}
}

console.log('[ServiceWorker] Loaded');
</artifact>
</artifacts>
Continuo con gli altri file mancanti?RiprovaROk vai pureModifica📱 FILE 64: public/manifest.json
Percorso completo: i3fratelli/public/manifest.json
<artifacts>
<artifact identifier="manifest-json" type="application/vnd.ant.code" language="json" title="manifest.json - PWA Manifest per installazione app">
{
  "name": "I 3 Fratelli - Panificio H24 Milano",
  "short_name": "I 3 Fratelli",
  "description": "L'unico panificio sempre aperto a Milano. Pane artigianale con lievito madre centenario, disponibile 24 ore su 24.",
  "lang": "it-IT",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#8B6F47",
  "background_color": "#FAF7F2",
  "categories": ["food", "shopping", "lifestyle"],
  "dir": "ltr",
  "scope": "/",
  "id": "i3fratelli-pwa",
"icons": [
{
"src": "/images/icons/icon-72x72.png",
"sizes": "72x72",
"type": "image/png",
"purpose": "any"
},
{
"src": "/images/icons/icon-96x96.png",
"sizes": "96x96",
"type": "image/png",
"purpose": "any"
},
{
"src": "/images/icons/icon-128x128.png",
"sizes": "128x128",
"type": "image/png",
"purpose": "any"
},
{
"src": "/images/icons/icon-144x144.png",
"sizes": "144x144",
"type": "image/png",
"purpose": "any"
},
{
"src": "/images/icons/icon-152x152.png",
"sizes": "152x152",
"type": "image/png",
"purpose": "any"
},
{
"src": "/images/icons/icon-192x192.png",
"sizes": "192x192",
"type": "image/png",
"purpose": "any"
},
{
"src": "/images/icons/icon-384x384.png",
"sizes": "384x384",
"type": "image/png",
"purpose": "any"
},
{
"src": "/images/icons/icon-512x512.png",
"sizes": "512x512",
"type": "image/png",
"purpose": "any"
},
{
"src": "/images/icons/icon-maskable-192x192.png",
"sizes": "192x192",
"type": "image/png",
"purpose": "maskable"
},
{
"src": "/images/icons/icon-maskable-512x512.png",
"sizes": "512x512",
"type": "image/png",
"purpose": "maskable"
}
],
"screenshots": [
{
"src": "/images/screenshots/home-mobile.png",
"sizes": "412x915",
"type": "image/png",
"label": "Homepage su mobile"
},
{
"src": "/images/screenshots/products-mobile.png",
"sizes": "412x915",
"type": "image/png",
"label": "Catalogo prodotti"
},
{
"src": "/images/screenshots/home-desktop.png",
"sizes": "1920x1080",
"type": "image/png",
"label": "Homepage su desktop"
}
],
"shortcuts": [
{
"name": "Ordina Pane",
"short_name": "Ordina",
"description": "Ordina subito su WhatsApp",
"url": "/prodotti?action=order",
"icons": [
{
"src": "/images/icons/shortcut-order.png",
"sizes": "96x96",
"type": "image/png"
}
]
},
{
"name": "Servizio 24H",
"short_name": "24H",
"description": "Scopri il servizio notturno",
"url": "/sempre-24h",
"icons": [
{
"src": "/images/icons/shortcut-24h.png",
"sizes": "96x96",
"type": "image/png"
}
]
},
{
"name": "Per Ristoranti",
"short_name": "B2B",
"description": "Servizi per ristoratori",
"url": "/b2b",
"icons": [
{
"src": "/images/icons/shortcut-b2b.png",
"sizes": "96x96",
"type": "image/png"
}
]
}
],
"related_applications": [],
"prefer_related_applications": false,
"share_target": {
"action": "/share",
"method": "POST",
"enctype": "multipart/form-data",
"params": {
"title": "title",
"text": "text",
"url": "url",
"files": [
{
"name": "image",
"accept": ["image/*"]
}
]
}
},
"protocol_handlers": [
{
"protocol": "web+bread",
"url": "/product?id=%s"
}
],
"edge_side_panel": {
"preferred_width": 400
},
"display_override": [
"window-controls-overlay",
"standalone",
"browser"
],
"file_handlers": [
{
"action": "/open",
"accept": {
"text/plain": [".txt", ".md"],
"application/pdf": [".pdf"]
}
}
]
}
