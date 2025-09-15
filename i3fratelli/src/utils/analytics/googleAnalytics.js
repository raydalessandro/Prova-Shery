/* ========================================
   GOOGLE ANALYTICS.JS - I 3 FRATELLI
   Google Analytics 4 integration con eventi custom
   ======================================== */
// GA4 Measurement ID
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
/**

Inizializza Google Analytics
*/
export const initGA = () => {
// Carica gtag script
const script = document.createElement('script');
script.async = true;
script.src = https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID};
document.head.appendChild(script);

// Inizializza dataLayer
window.dataLayer = window.dataLayer || [];
window.gtag = function() {
window.dataLayer.push(arguments);
};
window.gtag('js', new Date());
// Configurazione iniziale
window.gtag('config', GA_MEASUREMENT_ID, {
page_path: window.location.pathname,
// Custom dimensions
custom_map: {
'dimension1': 'visitor_type',
'dimension2': 'time_of_day',
'dimension3': 'ai_source',
'dimension4': 'b2b_customer'
},
// Enhanced measurement
send_page_view: true,
cookie_flags: 'max-age=7200;secure;samesite=none'
});
// Set consent default
window.gtag('consent', 'default', {
'analytics_storage': 'denied',
'ad_storage': 'denied',
'wait_for_update': 500
});
console.log('📊 Google Analytics initialized');
};
/**

Aggiorna consenso cookie
@param {object} consent - Oggetto consenso
*/
export const updateConsent = (consent) => {
window.gtag('consent', 'update', {
'analytics_storage': consent.analytics ? 'granted' : 'denied',
'ad_storage': consent.marketing ? 'granted' : 'denied'
});
};

/**

Traccia cambio pagina
@param {string} path - Path della pagina
@param {string} title - Titolo pagina
*/
export const pageView = (path, title) => {
window.gtag('event', 'page_view', {
page_path: path,
page_title: title,
page_location: window.location.href,
visitor_type: getVisitorType(),
time_of_day: getTimeOfDay()
});
};

/**

Eventi E-commerce
*/
export const ecommerceEvents = {
// Visualizzazione prodotto
viewItem: (item) => {
window.gtag('event', 'view_item', {
currency: 'EUR',
value: item.price,
items: [{
item_id: item.id,
item_name: item.name,
item_category: item.category,
item_category2: item.availability,
price: item.price,
quantity: 1
}]
});
},

// Aggiungi al carrello
addToCart: (item, quantity = 1) => {
window.gtag('event', 'add_to_cart', {
currency: 'EUR',
value: item.price * quantity,
items: [{
item_id: item.id,
item_name: item.name,
item_category: item.category,
price: item.price,
quantity: quantity
}]
});
},
// Inizio checkout
beginCheckout: (items, total) => {
window.gtag('event', 'begin_checkout', {
currency: 'EUR',
value: total,
items: items.map(item => ({
item_id: item.id,
item_name: item.name,
item_category: item.category,
price: item.price,
quantity: item.quantity
}))
});
},
// Acquisto completato
purchase: (transactionId, items, total, shipping = 0) => {
window.gtag('event', 'purchase', {
transaction_id: transactionId,
currency: 'EUR',
value: total,
shipping: shipping,
items: items.map(item => ({
item_id: item.id,
item_name: item.name,
item_category: item.category,
price: item.price,
quantity: item.quantity
}))
});
}
};
/**

Eventi Custom per I 3 Fratelli
*/
export const customEvents = {
// Click WhatsApp
whatsappClick: (context = 'general') => {
window.gtag('event', 'whatsapp_click', {
event_category: 'engagement',
event_label: context,
time_of_day: getTimeOfDay(),
is_night_time: isNightTime()
});
},

// Chiamata telefonica
phoneClick: (type = 'main') => {
window.gtag('event', 'phone_click', {
event_category: 'engagement',
event_label: type,
time_of_day: getTimeOfDay()
});
},
// Form contatto
formSubmit: (formType) => {
window.gtag('event', 'form_submit', {
event_category: 'lead',
event_label: formType,
visitor_type: getVisitorType()
});
},
// Visualizzazione orari 24H
view24Hours: () => {
window.gtag('event', 'view_24h_info', {
event_category: 'engagement',
time_of_day: getTimeOfDay(),
is_night_time: isNightTime()
});
},
// Click B2B
b2bInteraction: (action) => {
window.gtag('event', 'b2b_interaction', {
event_category: 'b2b',
event_label: action,
b2b_customer: 'potential'
});
},
// Visualizzazione storia
viewStory: (section) => {
window.gtag('event', 'view_story', {
event_category: 'engagement',
event_label: section
});
},
// Interazione con blog
blogInteraction: (action, postId) => {
window.gtag('event', 'blog_interaction', {
event_category: 'content',
event_label: action,
post_id: postId
});
},
// Pane sospeso
paneSospeso: (action) => {
window.gtag('event', 'pane_sospeso', {
event_category: 'social',
event_label: action
});
},
// Emergenza notturna
nightEmergency: () => {
window.gtag('event', 'night_emergency', {
event_category: 'conversion',
time: new Date().toISOString(),
hour: new Date().getHours()
});
}
};
/**

Traccia errori
@param {string} description - Descrizione errore
@param {boolean} fatal - Se l'errore è fatale
*/
export const trackError = (description, fatal = false) => {
window.gtag('event', 'exception', {
description: description,
fatal: fatal
});
};

/**

Traccia timing performance
@param {string} name - Nome metrica
@param {number} value - Valore in millisecondi
@param {string} category - Categoria
*/
export const trackTiming = (name, value, category = 'performance') => {
window.gtag('event', 'timing_complete', {
name: name,
value: value,
event_category: category
});
};

/**

Traccia scroll depth
@param {number} percentage - Percentuale scroll
*/
export const trackScrollDepth = (percentage) => {
window.gtag('event', 'scroll', {
event_category: 'engagement',
percent_scrolled: percentage
});
};

/**

Traccia ricerca
@param {string} searchTerm - Termine ricercato
*/
export const trackSearch = (searchTerm) => {
window.gtag('event', 'search', {
search_term: searchTerm
});
};

/**

Traccia video (se presente)
@param {string} action - play, pause, complete
@param {string} videoTitle - Titolo video
*/
export const trackVideo = (action, videoTitle) => {
window.gtag('event', 'video_' + action, {
event_category: 'video',
event_label: videoTitle
});
};

/**

Traccia social share
@param {string} network - Social network
@param {string} contentType - Tipo contenuto
*/
export const trackShare = (network, contentType) => {
window.gtag('event', 'share', {
method: network,
content_type: contentType
});
};

/**

Set user properties
@param {object} properties - Proprietà utente
*/
export const setUserProperties = (properties) => {
window.gtag('set', 'user_properties', properties);
};

/**

Helper: Ottieni tipo visitatore
*/
const getVisitorType = () => {
const isReturning = localStorage.getItem('returning_visitor');
const isB2B = window.location.pathname.includes('b2b');

if (isB2B) return 'b2b';
if (isReturning) return 'returning';
localStorage.setItem('returning_visitor', 'true');
return 'new';
};
/**

Helper: Ottieni periodo del giorno
*/
const getTimeOfDay = () => {
const hour = new Date().getHours();

if (hour >= 5 && hour < 12) return 'morning';
if (hour >= 12 && hour < 17) return 'afternoon';
if (hour >= 17 && hour < 22) return 'evening';
return 'night';
};
/**

Helper: È ora notturna?
*/
const isNightTime = () => {
const hour = new Date().getHours();
return hour >= 22 || hour < 5;
};

/**

Enhanced Ecommerce: Raccomandazioni
*/
export const trackRecommendation = (items, listName) => {
window.gtag('event', 'view_item_list', {
item_list_name: listName,
items: items.map((item, index) => ({
item_id: item.id,
item_name: item.name,
item_category: item.category,
price: item.price,
index: index
}))
});
};

/**

Track AI visitor
*/
export const trackAIVisitor = (source) => {
window.gtag('event', 'ai_visitor', {
event_category: 'ai_traffic',
ai_source: source,
landing_page: window.location.pathname
});

setUserProperties({
visitor_type: 'ai_assisted',
ai_source: source
});
};
export default {
initGA,
updateConsent,
pageView,
ecommerceEvents,
customEvents,
trackError,
trackTiming,
trackScrollDepth,
trackSearch,
trackVideo,
trackShare,
setUserProperties,
trackRecommendation,
trackAIVisitor
};
