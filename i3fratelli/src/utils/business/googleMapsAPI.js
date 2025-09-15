/* ========================================
   GOOGLE MAPS API.JS - I 3 FRATELLI
   Integrazione Google Maps e Places
   ======================================== */
import config from '../../data/config.json';
// Google Maps API Key
const MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY || '';
const PLACE_ID = config.contact.googlePlaceId || '';
/**

Classe per gestire Google Maps
*/
class GoogleMapsAPI {
constructor() {
this.isLoaded = false;
this.isLoading = false;
this.callbacks = [];
this.map = null;
this.marker = null;
this.infoWindow = null;
this.directionsService = null;
this.directionsRenderer = null;
this.placesService = null;
}

/**

Carica Google Maps API
@returns {Promise} Promise che si risolve quando Maps è caricato
*/
load() {
return new Promise((resolve, reject) => {
// Se già caricato
if (this.isLoaded && window.google?.maps) {
resolve(window.google.maps);
return;
}
// Se in caricamento, aggiungi callback
if (this.isLoading) {
this.callbacks.push({ resolve, reject });
return;
}
this.isLoading = true;
// Callback globale
window.initGoogleMaps = () => {
this.isLoaded = true;
this.isLoading = false;
// Risolvi tutte le promise
this.callbacks.forEach(cb => cb.resolve(window.google.maps));
this.callbacks = [];
resolve(window.google.maps);
};
// Carica script
const script = document.createElement('script');
script.src = https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places,geometry&callback=initGoogleMaps&language=it;
script.async = true;
script.defer = true;
script.onerror = () => {
this.isLoading = false;
const error = new Error('Failed to load Google Maps');
this.callbacks.forEach(cb => cb.reject(error));
this.callbacks = [];
reject(error);
};
document.head.appendChild(script);
});
}

/**

Inizializza mappa
@param {HTMLElement} container - Container della mappa
@param {object} options - Opzioni mappa
@returns {Promise<object>} Istanza mappa
*/
async initMap(container, options = {}) {
const maps = await this.load();

const defaultOptions = {
  center: {
    lat: config.contact.address.coordinates.lat,
    lng: config.contact.address.coordinates.lng
  },
  zoom: 15,
  styles: this.getMapStyles(),
  mapTypeControl: false,
  fullscreenControl: true,
  streetViewControl: true,
  zoomControl: true,
  ...options
};

this.map = new maps.Map(container, defaultOptions);

// Aggiungi marker principale
this.addMainMarker();

// Inizializza servizi
this.directionsService = new maps.DirectionsService();
this.directionsRenderer = new maps.DirectionsRenderer({
  map: this.map,
  suppressMarkers: false
});
this.placesService = new maps.places.PlacesService(this.map);

return this.map;
}
/**

Aggiungi marker principale
*/
async addMainMarker() {
const maps = await this.load();

const position = {
  lat: config.contact.address.coordinates.lat,
  lng: config.contact.address.coordinates.lng
};

// Marker custom
this.marker = new maps.Marker({
  position,
  map: this.map,
  title: 'I 3 Fratelli - Panificio H24',
  icon: {
    url: '/images/icons/map-marker.png',
    scaledSize: new maps.Size(40, 50)
  },
  animation: maps.Animation.DROP
});

// Info window
this.infoWindow = new maps.InfoWindow({
  content: this.getInfoWindowContent()
});

// Click listener
this.marker.addListener('click', () => {
  this.infoWindow.open(this.map, this.marker);
  
  // Track evento
  if (window.gtag) {
    window.gtag('event', 'map_marker_click', {
      event_category: 'engagement'
    });
  }
});

// Apri info window all'inizio
setTimeout(() => {
  this.infoWindow.open(this.map, this.marker);
}, 1000);
}
/**

Contenuto info window
*/
getInfoWindowContent() {
return `
 <div style="padding: 10px; max-width: 250px;">
   <h3 style="margin: 0 0 10px; color: #8B6F47;">I 3 Fratelli</h3>
   <p style="margin: 5px 0; font-size: 14px;">
     <strong>🕐 SEMPRE APERTI 24/7</strong>
   </p>
   <p style="margin: 5px 0; font-size: 13px;">
     📍 ${config.contact.address.street}<br>
     ${config.contact.address.cap} ${config.contact.address.city}
   </p>
   <p style="margin: 5px 0; font-size: 13px;">
     📞 <a href="tel:${config.contact.phone.main}">${config.contact.phone.display}</a>
   </p>
   <div style="margin-top: 10px;">
     <a href="https://maps.google.com/maps?daddr=${config.contact.address.coordinates.lat},${config.contact.address.coordinates.lng}" 
        target="_blank" 
        style="display: inline-block; padding: 5px 10px; background: #8B6F47; color: white; text-decoration: none; border-radius: 4px; font-size: 12px;">
       Indicazioni stradali →
     </a>
   </div>
 </div>


`;
}
/**

Stili custom per la mappa
*/
getMapStyles() {
return [
{
featureType: 'all',
elementType: 'geometry',
stylers: [{ color: '#f5f5f5' }]
},
{
featureType: 'water',
elementType: 'geometry',
stylers: [{ color: '#c8d7d4' }]
},
{
featureType: 'road',
elementType: 'geometry',
stylers: [{ color: '#ffffff' }]
},
{
featureType: 'poi',
elementType: 'labels.icon',
stylers: [{ visibility: 'off' }]
},
{
featureType: 'landscape',
elementType: 'geometry',
stylers: [{ color: '#f5f5f5' }]
}
];
}

/**

Calcola percorso
@param {object} origin - Punto di partenza
@param {string} travelMode - Modalità di viaggio
*/
async calculateRoute(origin, travelMode = 'DRIVING') {
if (!this.directionsService || !this.directionsRenderer) {
console.error('Directions service not initialized');
return;
}

const destination = {
  lat: config.contact.address.coordinates.lat,
  lng: config.contact.address.coordinates.lng
};

const request = {
  origin,
  destination,
  travelMode,
  unitSystem: window.google.maps.UnitSystem.METRIC,
  language: 'it'
};

return new Promise((resolve, reject) => {
  this.directionsService.route(request, (result, status) => {
    if (status === 'OK') {
      this.directionsRenderer.setDirections(result);
      
      // Estrai info utili
      const route = result.routes[0].legs[0];
      const info = {
        distance: route.distance.text,
        duration: route.duration.text,
        steps: route.steps.map(step => ({
          instruction: step.instructions,
          distance: step.distance.text,
          duration: step.duration.text
        }))
      };
      
      resolve(info);
    } else {
      reject(new Error(`Directions request failed: ${status}`));
    }
  });
});
}
/**

Ottieni posizione utente
@returns {Promise<object>} Coordinate utente
*/
getUserLocation() {
return new Promise((resolve, reject) => {
if (!navigator.geolocation) {
reject(new Error('Geolocation not supported'));
return;
}
navigator.geolocation.getCurrentPosition(
(position) => {
resolve({
lat: position.coords.latitude,
lng: position.coords.longitude
});
},
(error) => {
reject(error);
},
{
enableHighAccuracy: true,
timeout: 5000,
maximumAge: 0
}
);
});
}

/**

Cerca luoghi vicini
@param {string} type - Tipo di luogo
@param {number} radius - Raggio in metri
*/
async searchNearby(type = 'restaurant', radius = 1000) {
if (!this.placesService) {
console.error('Places service not initialized');
return;
}

const center = {
  lat: config.contact.address.coordinates.lat,
  lng: config.contact.address.coordinates.lng
};

const request = {
  location: center,
  radius,
  type: [type],
  language: 'it'
};

return new Promise((resolve, reject) => {
  this.placesService.nearbySearch(request, (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      resolve(results);
    } else {
      reject(new Error(`Places search failed: ${status}`));
    }
  });
});
}
/**

Ottieni dettagli del nostro posto
*/
async getPlaceDetails() {
if (!this.placesService || !PLACE_ID) {
console.error('Places service not initialized or no place ID');
return null;
}

const request = {
  placeId: PLACE_ID,
  fields: [
    'name',
    'rating',
    'user_ratings_total',
    'reviews',
    'opening_hours',
    'photos',
    'formatted_phone_number',
    'website'
  ],
  language: 'it'
};

return new Promise((resolve, reject) => {
  this.placesService.getDetails(request, (place, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      resolve(place);
    } else {
      reject(new Error(`Place details failed: ${status}`));
    }
  });
});
}
/**

Aggiungi marker multipli
@param {array} locations - Array di posizioni
*/
async addMarkers(locations) {
const maps = await this.load();

const markers = locations.map(location => {
  return new maps.Marker({
    position: location.position,
    map: this.map,
    title: location.title,
    icon: location.icon || undefined
  });
});

// Auto-zoom per includere tutti i marker
const bounds = new maps.LatLngBounds();
markers.forEach(marker => {
  bounds.extend(marker.getPosition());
});
this.map.fitBounds(bounds);

return markers;
}
/**

Cleanup
*/
destroy() {
if (this.marker) {
this.marker.setMap(null);
}
if (this.infoWindow) {
this.infoWindow.close();
}
if (this.directionsRenderer) {
this.directionsRenderer.setMap(null);
}
this.map = null;
}
}

// Singleton instance
const googleMapsAPI = new GoogleMapsAPI();
export default googleMapsAPI;
