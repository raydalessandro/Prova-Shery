/* ========================================
   IMAGE OPTIMIZER.JS - I 3 FRATELLI
   Ottimizzazione e lazy loading immagini
   ======================================== */
/**

Classe per ottimizzare il caricamento delle immagini
*/
class ImageOptimizer {
constructor() {
this.supportedFormats = this.detectSupportedFormats();
this.intersectionObserver = null;
this.performanceObserver = null;
this.imageCache = new Map();
this.initObservers();
}

/**

Rileva i formati immagine supportati dal browser
@returns {object} Formati supportati
*/
detectSupportedFormats() {
const formats = {
webp: false,
avif: false
};

// Check WebP support
const webpCanvas = document.createElement('canvas');
webpCanvas.width = 1;
webpCanvas.height = 1;
formats.webp = webpCanvas.toDataURL('image/webp').indexOf('image/webp') === 5;

// Check AVIF support (metodo più complesso, usando feature detection)
if (window.Image) {
  const avifImg = new Image();
  avifImg.onload = () => { formats.avif = true; };
  avifImg.onerror = () => { formats.avif = false; };
  avifImg.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=';
}

return formats;
}
/**

Inizializza gli observer
*/
initObservers() {
// Intersection Observer per lazy loading
if ('IntersectionObserver' in window) {
this.intersectionObserver = new IntersectionObserver(
(entries) => this.handleIntersection(entries),
{
rootMargin: '50px',
threshold: 0.01
}
);
}

// Performance Observer per monitorare le immagini
if ('PerformanceObserver' in window) {
  try {
    this.performanceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP elemento:', entry.element);
        }
      }
    });
    this.performanceObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    console.log('PerformanceObserver non supportato per LCP');
  }
}
}
/**

Gestisce l'intersezione per lazy loading
@param {Array} entries - Entries dell'observer
*/
handleIntersection(entries) {
entries.forEach(entry => {
if (entry.isIntersecting) {
const img = entry.target;
this.loadImage(img);
this.intersectionObserver.unobserve(img);
}
});
}

/**

Carica un'immagine
@param {HTMLElement} img - Elemento immagine
*/
loadImage(img) {
const src = img.dataset.src;
const srcset = img.dataset.srcset;
const sizes = img.dataset.sizes;

if (!src) return;
// Preload dell'immagine
const tempImg = new Image();

tempImg.onload = () => {
  // Applica attributi all'immagine reale
  if (src) img.src = src;
  if (srcset) img.srcset = srcset;
  if (sizes) img.sizes = sizes;
  
  // Aggiungi classe per fade-in
  img.classList.add('loaded');
  
  // Rimuovi blur/placeholder
  if (img.previousElementSibling?.classList.contains('image-placeholder')) {
    img.previousElementSibling.style.opacity = '0';
    setTimeout(() => {
      img.previousElementSibling?.remove();
    }, 300);
  }
  
  // Cache dell'immagine
  this.imageCache.set(src, true);
};

tempImg.onerror = () => {
  console.error(`Errore caricamento immagine: ${src}`);
  img.classList.add('error');
};

// Inizia il caricamento
if (srcset) tempImg.srcset = srcset;
tempImg.src = src;
}
/**

Ottiene l'URL ottimale per un'immagine
@param {string} originalSrc - URL originale
@param {object} options - Opzioni
@returns {string} URL ottimizzato
*/
getOptimizedImageUrl(originalSrc, options = {}) {
const {
width = null,
quality = 85,
format = 'auto'
} = options;

// Se l'immagine è già in cache, ritorna l'originale
if (this.imageCache.has(originalSrc)) {
  return originalSrc;
}

// Determina il formato migliore
let optimalFormat = format;
if (format === 'auto') {
  if (this.supportedFormats.avif) {
    optimalFormat = 'avif';
  } else if (this.supportedFormats.webp) {
    optimalFormat = 'webp';
  } else {
    optimalFormat = 'jpg';
  }
}

// Costruisci nuovo URL (assumendo che ci sia un servizio di ottimizzazione)
const baseUrl = originalSrc.replace(/\.[^/.]+$/, '');
const newUrl = `${baseUrl}.${optimalFormat}`;

// Se abbiamo specifiche di dimensione
if (width) {
  return `${newUrl}?w=${width}&q=${quality}`;
}

return `${newUrl}?q=${quality}`;
}
/**

Genera srcset responsive
@param {string} src - URL base immagine
@param {Array} widths - Array di larghezze
@returns {string} Srcset string
*/
generateSrcset(src, widths = [320, 640, 768, 1024, 1280, 1920]) {
return widths
.map(width => {
const url = this.getOptimizedImageUrl(src, { width });
return ${url} ${width}w;
})
.join(', ');
}

/**

Genera sizes attribute
@param {object} breakpoints - Breakpoints e sizes
@returns {string} Sizes string
*/
generateSizes(breakpoints = {}) {
const defaultBreakpoints = {
'(max-width: 320px)': '280px',
'(max-width: 640px)': '600px',
'(max-width: 768px)': '728px',
'(max-width: 1024px)': '984px',
'(max-width: 1280px)': '1240px'
};

const merged = { ...defaultBreakpoints, ...breakpoints };
return Object.entries(merged)
  .map(([media, size]) => `${media} ${size}`)
  .join(', ') + ', 100vw';
}
/**

Preleva un'immagine critica
@param {string} src - URL immagine
@param {string} as - Tipo risorsa
*/
preloadImage(src, as = 'image') {
const link = document.createElement('link');
link.rel = 'preload';
link.as = as;
link.href = src;

// Aggiungi type se necessario
if (src.includes('.webp')) {
  link.type = 'image/webp';
} else if (src.includes('.avif')) {
  link.type = 'image/avif';
}

document.head.appendChild(link);
}
/**

Osserva un'immagine per lazy loading
@param {HTMLElement} img - Elemento immagine
*/
observe(img) {
if (this.intersectionObserver) {
this.intersectionObserver.observe(img);
} else {
// Fallback per browser che non supportano IntersectionObserver
this.loadImage(img);
}
}

/**

Calcola la dimensione ottimale per il viewport
@returns {number} Larghezza ottimale
*/
getOptimalImageWidth() {
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const dpr = window.devicePixelRatio || 1;

// Arrotonda alla dimensione standard più vicina
const targetWidth = vw * dpr;
const standardWidths = [320, 640, 768, 1024, 1280, 1920, 2560];

return standardWidths.find(w => w >= targetWidth) || standardWidths[standardWidths.length - 1];
}
/**

Crea un placeholder blur per l'immagine
@param {string} src - URL immagine
@param {number} width - Larghezza
@param {number} height - Altezza
@returns {string} Data URL del placeholder
*/
createBlurPlaceholder(src, width = 20, height = 20) {
// Questo dovrebbe essere generato server-side idealmente
// Per ora ritorniamo un placeholder generico
return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' +
width + ' ' + height +
'"%3E%3Crect width="100%25" height="100%25" fill="%23f5e6d3"/%3E%3C/svg%3E';
}

/**

Pulisce le risorse
*/
cleanup() {
if (this.intersectionObserver) {
this.intersectionObserver.disconnect();
}
if (this.performanceObserver) {
this.performanceObserver.disconnect();
}
this.imageCache.clear();
}
}

// Singleton instance
const imageOptimizer = new ImageOptimizer();
// Funzioni helper esportate
export const optimizeImage = (src, options) => imageOptimizer.getOptimizedImageUrl(src, options);
export const generateSrcset = (src, widths) => imageOptimizer.generateSrcset(src, widths);
export const generateSizes = (breakpoints) => imageOptimizer.generateSizes(breakpoints);
export const preloadImage = (src, as) => imageOptimizer.preloadImage(src, as);
export const observeImage = (img) => imageOptimizer.observe(img);
export const getOptimalWidth = () => imageOptimizer.getOptimalImageWidth();
export const createPlaceholder = (src, w, h) => imageOptimizer.createBlurPlaceholder(src, w, h);
export default imageOptimizer;
