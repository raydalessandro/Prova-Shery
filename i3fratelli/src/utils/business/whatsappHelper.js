/* ========================================
   WHATSAPP HELPER.JS - I 3 FRATELLI
   Utility per integrazione WhatsApp Business
   ======================================== */
import config from '../../data/config.json';
/**

Classe helper per WhatsApp
*/
class WhatsAppHelper {
constructor() {
this.baseUrl = 'https://wa.me';
this.apiUrl = 'https://api.whatsapp.com/send';
this.defaultNumber = config.contact.whatsapp.number;
this.businessNumber = config.contact.whatsapp.business || this.defaultNumber;
}

/**

Genera link WhatsApp con messaggio precompilato
@param {object} options - Opzioni per il link
@returns {string} URL WhatsApp
*/
generateLink(options = {}) {
const {
phone = this.defaultNumber,
text = '',
source = 'website',
campaign = null
} = options;

// Pulisci numero (rimuovi spazi, +, etc)
const cleanPhone = phone.replace(/\D/g, '');

// Aggiungi tracking al messaggio se necessario
let message = text;
if (campaign) {
  message += `\n[Ref: ${campaign}]`;
}

// Encode messaggio
const encodedText = encodeURIComponent(message);

// Costruisci URL
const url = `${this.baseUrl}/${cleanPhone}`;
const params = encodedText ? `?text=${encodedText}` : '';

return url + params;
}
/**

Messaggi precompilati per contesti diversi
*/
templates = {
// Ordine generico
orderGeneric: () => {
const hour = new Date().getHours();
const greeting = this.getGreeting(hour);
return ${greeting}! Vorrei ordinare del pane. Sono disponibile per il ritiro.;
},

// Ordine prodotto specifico
orderProduct: (productName, quantity = 1) => {
  return `Salve! Vorrei ordinare:\n- ${productName} (x${quantity})\n\nQuando posso ritirare?`;
},

// Ordine notturno
orderNight: () => {
  return `🌙 Buonasera! Avrei bisogno di pane questa notte. Siete aperti ora? Posso passare tra 30 minuti?`;
},

// Emergenza ristorante
emergencyRestaurant: (restaurantName = '') => {
  const restaurant = restaurantName ? ` Sono del ristorante ${restaurantName}.` : '';
  return `🚨 URGENTE: Ho bisogno di pane con consegna immediata.${restaurant} Quanti minuti per la consegna?`;
},

// B2B primo contatto
b2bFirstContact: (businessName, type = 'ristorante') => {
  return `Buongiorno! Sono ${businessName}, un ${type} in zona. Vorrei informazioni sulla fornitura pane per ristoranti. Quando possiamo parlarne?`;
},

// B2B ordine ricorrente
b2bRecurringOrder: (items = []) => {
  const itemsList = items.map(item => `- ${item.name}: ${item.quantity}`).join('\n');
  return `Ordine ricorrente per domani:\n${itemsList}\n\nConfermate la consegna alle 6:00?`;
},

// Richiesta info
infoRequest: (topic) => {
  const topics = {
    'orari': 'Vorrei conferma degli orari di apertura.',
    'prezzi': 'Potreste inviarmi il listino prezzi aggiornato?',
    'disponibilita': 'Che tipi di pane avete disponibili ora?',
    'allergeni': 'Avete pane senza glutine o per intolleranti?',
    'catering': 'Fate servizio catering per eventi?'
  };
  
  const message = topics[topic] || 'Vorrei alcune informazioni.';
  return `Buongiorno! ${message}`;
},

// Feedback/Recensione
feedback: (positive = true) => {
  if (positive) {
    return `Volevo ringraziarvi per l'ottimo pane! Sempre una garanzia 👏`;
  }
  return `Vorrei segnalare un problema con l'ultimo ordine. Possiamo parlarne?`;
},

// Pane sospeso
paneSospeso: (action = 'donate') => {
  if (action === 'donate') {
    return `Vorrei partecipare all'iniziativa Pane Sospeso. Come posso contribuire?`;
  }
  return `Ho bisogno di aiuto. Ho sentito del Pane Sospeso. Come funziona?`;
}
};
/**

Ottieni saluto basato sull'ora
@param {number} hour - Ora del giorno
@returns {string} Saluto appropriato
*/
getGreeting(hour = new Date().getHours()) {
if (hour >= 5 && hour < 12) return 'Buongiorno';
if (hour >= 12 && hour < 17) return 'Buon pomeriggio';
if (hour >= 17 && hour < 22) return 'Buonasera';
return 'Buona notte';
}

/**

Genera link per diversi contesti
*/
quickLinks = {
// Ordine veloce
quickOrder: () => this.generateLink({
text: this.templates.orderGeneric()
}),

// Emergenza notturna
nightEmergency: () => this.generateLink({
  text: this.templates.orderNight(),
  campaign: 'night-emergency'
}),

// B2B
b2bInquiry: () => this.generateLink({
  phone: this.businessNumber,
  text: 'Salve! Sono interessato ai servizi B2B per ristoranti.',
  campaign: 'b2b-inquiry'
}),

// Catering
catering: () => this.generateLink({
  text: this.templates.infoRequest('catering'),
  campaign: 'catering'
}),

// Support
support: () => this.generateLink({
  text: 'Ho bisogno di assistenza con il mio ordine.',
  campaign: 'support'
})
};
/**

Genera link per condivisione
@param {string} url - URL da condividere
@param {string} text - Testo da condividere
@returns {string} Link WhatsApp per condivisione
*/
shareLink(url, text = '') {
const message = text ? ${text}\n${url} : url;
return https://wa.me/?text=${encodeURIComponent(message)};
}

/**

Verifica se WhatsApp è disponibile
@returns {boolean} True se WhatsApp è disponibile
*/
isAvailable() {
// Check se siamo su mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Check se WhatsApp Web è supportato
const isDesktopSupported = !isMobile && window.innerWidth > 768;

return isMobile || isDesktopSupported;
}
/**

Apri WhatsApp con handling errori
@param {string} url - URL WhatsApp
@param {function} fallback - Funzione fallback
*/
open(url, fallback = null) {
try {
// Prova ad aprire WhatsApp
window.open(url, '_blank');
// Track evento
if (window.gtag) {
window.gtag('event', 'whatsapp_open', {
event_category: 'engagement',
event_label: 'success'
});
}
} catch (error) {
console.error('Errore apertura WhatsApp:', error);
// Esegui fallback se disponibile
if (fallback && typeof fallback === 'function') {
fallback();
} else {
// Mostra numero da copiare
this.showPhoneNumber();
}
// Track errore
if (window.gtag) {
window.gtag('event', 'whatsapp_open', {
event_category: 'engagement',
event_label: 'error'
});
}
}
}

/**

Mostra numero per copia manuale
*/
showPhoneNumber() {
const formattedNumber = this.formatPhoneNumber(this.defaultNumber);

// Crea modal o alert
if (navigator.clipboard) {
  navigator.clipboard.writeText(this.defaultNumber)
    .then(() => {
      alert(`Numero copiato: ${formattedNumber}\nIncollalo su WhatsApp!`);
    })
    .catch(() => {
      alert(`Il nostro WhatsApp: ${formattedNumber}`);
    });
} else {
  alert(`Il nostro WhatsApp: ${formattedNumber}`);
}
}
/**

Formatta numero per display
@param {string} phone - Numero da formattare
@returns {string} Numero formattato
*/
formatPhoneNumber(phone) {
const cleaned = phone.replace(/\D/g, '');

// Formato italiano
if (cleaned.startsWith('39')) {
  const number = cleaned.substring(2);
  return `+39 ${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6)}`;
}

return phone;
}
/**

Genera QR code per WhatsApp (richiede libreria esterna)
@param {string} text - Messaggio precompilato
@returns {string} Data URL del QR code
*/
generateQRCode(text = '') {
const url = this.generateLink({ text });

// Qui integreresti con una libreria QR code
// Per esempio: qrcode.js
console.log('QR Code URL:', url);

return url;
}
/**

Calcola tempo di risposta stimato
@returns {string} Tempo di risposta
*/
getResponseTime() {
const hour = new Date().getHours();
const isWeekend = [0, 6].includes(new Date().getDay());

// Orari di punta
if ((hour >= 7 && hour <= 9) || (hour >= 12 && hour <= 14)) {
  return '5-10 minuti';
}

// Notte
if (hour >= 22 || hour < 5) {
  return 'Immediata (siamo svegli!)';
}

// Weekend
if (isWeekend) {
  return '2-5 minuti';
}

// Normale
return '2-3 minuti';
}
/**

Suggerimenti per messaggio basati su contesto
@param {object} context - Contesto della pagina
@returns {array} Array di suggerimenti
*/
getMessageSuggestions(context = {}) {
const { page, time, isB2B } = context;
const suggestions = [];

// Basato sulla pagina
if (page === 'prodotti') {
  suggestions.push('Vorrei ordinare del pane');
  suggestions.push('Cosa avete disponibile ora?');
}

if (page === 'b2b' || isB2B) {
  suggestions.push('Info forniture ristoranti');
  suggestions.push('Listino prezzi B2B');
}

// Basato sull'ora
const hour = time || new Date().getHours();
if (hour >= 22 || hour < 5) {
  suggestions.push('Avete pane fresco ora?');
  suggestions.push('Emergenza notturna');
}

// Default
if (suggestions.length === 0) {
  suggestions.push('Vorrei ordinare');
  suggestions.push('Info e orari');
  suggestions.push('Servizio consegna');
}

return suggestions;
}
}
// Singleton instance
const whatsappHelper = new WhatsAppHelper();
// Export helper functions
export const generateWhatsAppLink = (options) => whatsappHelper.generateLink(options);
export const whatsappTemplates = whatsappHelper.templates;
export const quickLinks = whatsappHelper.quickLinks;
export const shareOnWhatsApp = (url, text) => whatsappHelper.shareLink(url, text);
export const openWhatsApp = (url, fallback) => whatsappHelper.open(url, fallback);
export const isWhatsAppAvailable = () => whatsappHelper.isAvailable();
export const getResponseTime = () => whatsappHelper.getResponseTime();
export const getMessageSuggestions = (context) => whatsappHelper.getMessageSuggestions(context);
export default whatsappHelper;
