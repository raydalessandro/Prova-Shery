/* ========================================
   CONTENT SECURITY.JS - I 3 FRATELLI
   Content Security Policy e headers sicurezza
   ======================================== */
/**

Genera Content Security Policy headers
@param {boolean} isDevelopment - Se siamo in sviluppo
@returns {object} Headers CSP
/
export const generateCSPHeaders = (isDevelopment = false) => {
const policies = {
'default-src': ["'self'"],
'script-src': [
"'self'",
isDevelopment && "'unsafe-inline'",
"'unsafe-eval'", // Solo per React DevTools in dev
'https://www.googletagmanager.com',
'https://www.google-analytics.com',
'https://maps.googleapis.com',
'https://cdn.jsdelivr.net',
'https://unpkg.com'
].filter(Boolean),
'style-src': [
"'self'",
"'unsafe-inline'", // Necessario per styled components
'https://fonts.googleapis.com',
'https://cdn.jsdelivr.net'
],
'img-src': [
"'self'",
'data:',
'blob:',
'https:',
'https://www.google-analytics.com',
'https://maps.gstatic.com',
'https://maps.googleapis.com'
],
'font-src': [
"'self'",
'data:',
'https://fonts.gstatic.com'
],
'connect-src': [
"'self'",
'https://www.google-analytics.com',
'https://maps.googleapis.com',
'https://api.whatsapp.com',
'wss://.whatsapp.com',
isDevelopment && 'ws://localhost:',
isDevelopment && 'http://localhost:'
].filter(Boolean),
'media-src': ["'self'", 'https:'],
'object-src': ["'none'"],
'child-src': ["'self'"],
'frame-src': [
"'self'",
'https://www.google.com/maps/',
'https://www.youtube.com'
],
'frame-ancestors': ["'self'"],
'form-action': ["'self'"],
'base-uri': ["'self'"],
'manifest-src': ["'self'"],
'worker-src': ["'self'", 'blob:']
};

// Costruisci la stringa CSP
const cspString = Object.entries(policies)
.map(([directive, sources]) => ${directive} ${sources.join(' ')})
.join('; ');
return {
'Content-Security-Policy': cspString,
'X-Content-Type-Options': 'nosniff',
'X-Frame-Options': 'SAMEORIGIN',
'X-XSS-Protection': '1; mode=block',
'Referrer-Policy': 'strict-origin-when-cross-origin',
'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
};
};
/**

Sanitizza input HTML per prevenire XSS
@param {string} dirty - HTML non sanitizzato
@returns {string} HTML sanitizzato
/
export const sanitizeHTML = (dirty) => {
// Rimuovi tutti i tag script
let clean = dirty.replace(/<script\b[^<](?:(?!</script>)<[^<])</script>/gi, '');

// Rimuovi attributi on* (onclick, onload, etc.)
clean = clean.replace(/\son\w+\s=\s*["'][^"']*["']/gi, '');
// Rimuovi javascript: URLs
clean = clean.replace(/javascript:/gi, '');
// Rimuovi data: URLs pericolosi
clean = clean.replace(/data:text/html/gi, '');
// Escape caratteri HTML speciali
const escapeMap = {
'&': '&',
'<': '<',
'>': '>',
'"': '"',
"'": ''',
'/': '/'
};
// Mantieni solo tag sicuri
const safeTags = ['p', 'div', 'span', 'a', 'img', 'strong', 'em', 'br', 'ul', 'ol', 'li'];
const tagRegex = /</?([a-z][a-z0-9])\b[^>]>/gi;
clean = clean.replace(tagRegex, (match, tag) => {
if (safeTags.includes(tag.toLowerCase())) {
return match;
}
return '';
});
return clean;
};
/**

Valida e sanitizza input form
@param {object} formData - Dati del form
@returns {object} Dati sanitizzati
*/
export const sanitizeFormData = (formData) => {
const sanitized = {};

for (const [key, value] of Object.entries(formData)) {
if (typeof value === 'string') {
// Rimuovi caratteri di controllo
let clean = value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  // Trim spazi
  clean = clean.trim();
  
  // Limita lunghezza
  if (clean.length > 1000) {
    clean = clean.substring(0, 1000);
  }
  
  // Escape HTML per campi di testo
  if (['name', 'email', 'phone', 'message', 'subject'].includes(key)) {
    clean = clean.replace(/[<>]/g, '');
  }
  
  sanitized[key] = clean;
} else {
  sanitized[key] = value;
}
}
return sanitized;
};
/**

Valida email
@param {string} email - Email da validare
@returns {boolean} True se valida
*/
export const validateEmail = (email) => {
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
return emailRegex.test(email) && email.length < 255;
};

/**

Valida numero di telefono italiano
@param {string} phone - Numero da validare
@returns {boolean} True se valido
*/
export const validatePhone = (phone) => {
// Rimuovi spazi e caratteri non numerici
const cleaned = phone.replace(/\D/g, '');

// Verifica formato italiano (con o senza +39)
const italianPhoneRegex = /^(39)?3\d{8,9}$/;
const landlineRegex = /^(39)?0\d{8,10}$/;
return italianPhoneRegex.test(cleaned) || landlineRegex.test(cleaned);
};
/**

Rate limiting per prevenire spam
*/
class RateLimiter {
constructor(maxRequests = 5, windowMs = 60000) {
this.maxRequests = maxRequests;
this.windowMs = windowMs;
this.requests = new Map();
}

/**

Controlla se una richiesta è permessa
@param {string} identifier - IP o user ID
@returns {boolean} True se permesso
*/
isAllowed(identifier) {
const now = Date.now();
const userRequests = this.requests.get(identifier) || [];

// Filtra richieste vecchie
const recentRequests = userRequests.filter(
  timestamp => now - timestamp < this.windowMs
);

if (recentRequests.length >= this.maxRequests) {
  return false;
}

// Aggiungi nuova richiesta
recentRequests.push(now);
this.requests.set(identifier, recentRequests);

// Cleanup vecchie entries
this.cleanup();

return true;
}
/**

Pulisci entries vecchie
*/
cleanup() {
const now = Date.now();

for (const [identifier, timestamps] of this.requests.entries()) {
  const recentRequests = timestamps.filter(
    timestamp => now - timestamp < this.windowMs
  );
  
  if (recentRequests.length === 0) {
    this.requests.delete(identifier);
  } else {
    this.requests.set(identifier, recentRequests);
  }
}
}
/**

Reset limiti per un identifier
@param {string} identifier - IP o user ID
*/
reset(identifier) {
this.requests.delete(identifier);
}
}

// Istanza rate limiter per form contatti
export const contactFormLimiter = new RateLimiter(3, 300000); // 3 richieste ogni 5 minuti
// Istanza rate limiter per ordini
export const orderLimiter = new RateLimiter(10, 60000); // 10 richieste al minuto
/**

Genera token CSRF
@returns {string} Token CSRF
*/
export const generateCSRFToken = () => {
const array = new Uint8Array(32);
crypto.getRandomValues(array);
return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**

Verifica token CSRF
@param {string} token - Token da verificare
@param {string} sessionToken - Token di sessione
@returns {boolean} True se valido
*/
export const verifyCSRFToken = (token, sessionToken) => {
return token === sessionToken && token.length === 64;
};

/**

Cripta dati sensibili
@param {string} text - Testo da criptare
@param {string} password - Password per criptare
@returns {Promise<string>} Testo criptato
*/
export const encrypt = async (text, password) => {
const encoder = new TextEncoder();
const data = encoder.encode(text);

const passwordKey = await crypto.subtle.importKey(
'raw',
encoder.encode(password),
{ name: 'PBKDF2' },
false,
['deriveBits', 'deriveKey']
);
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const key = await crypto.subtle.deriveKey(
{
name: 'PBKDF2',
salt,
iterations: 100000,
hash: 'SHA-256'
},
passwordKey,
{ name: 'AES-GCM', length: 256 },
false,
['encrypt']
);
const encrypted = await crypto.subtle.encrypt(
{ name: 'AES-GCM', iv },
key,
data
);
const encryptedArray = new Uint8Array(encrypted);
const combined = new Uint8Array(salt.length + iv.length + encryptedArray.length);
combined.set(salt, 0);
combined.set(iv, salt.length);
combined.set(encryptedArray, salt.length + iv.length);
return btoa(String.fromCharCode(...combined));
};
/**

Decripta dati
@param {string} encryptedText - Testo criptato
@param {string} password - Password per decriptare
@returns {Promise<string>} Testo decriptato
*/
export const decrypt = async (encryptedText, password) => {
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const combined = Uint8Array.from(atob(encryptedText), c => c.charCodeAt(0));
const salt = combined.slice(0, 16);
const iv = combined.slice(16, 28);
const encrypted = combined.slice(28);
const passwordKey = await crypto.subtle.importKey(
'raw',
encoder.encode(password),
{ name: 'PBKDF2' },
false,
['deriveBits', 'deriveKey']
);
const key = await crypto.subtle.deriveKey(
{
name: 'PBKDF2',
salt,
iterations: 100000,
hash: 'SHA-256'
},
passwordKey,
{ name: 'AES-GCM', length: 256 },
false,
['decrypt']
);
const decrypted = await crypto.subtle.decrypt(
{ name: 'AES-GCM', iv },
key,
encrypted
);
return decoder.decode(decrypted);
};
export default {
generateCSPHeaders,
sanitizeHTML,
sanitizeFormData,
validateEmail,
validatePhone,
contactFormLimiter,
orderLimiter,
generateCSRFToken,
verifyCSRFToken,
encrypt,
decrypt
};
