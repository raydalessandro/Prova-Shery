/* ========================================
   SERVICE WORKER REGISTRATION.JS - I 3 FRATELLI
   Stub minimo per build - Da implementare
   ======================================== */

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);
/**
 * Registra service worker
 * @param {object} config - Configurazione
 */
export function register(config) {
  if ('serviceWorker' in navigator) {
    // Solo in produzione
    if (process.env.NODE_ENV === 'production') {
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      
      if (publicUrl.origin !== window.location.origin) {
        return;
      }

      window.addEventListener('load', () => {
        const swUrl = ${process.env.PUBLIC_URL}/service-worker.js;

        if (isLocalhost) {
          checkValidServiceWorker(swUrl, config);
        } else {
          registerValidSW(swUrl, config);
        }
      });
    }
  }
}

/**
 * Registra SW valido
 */
function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('[SW] Registered:', registration);
      
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('[SW] New content available');
              
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('[SW] Content cached for offline');
              
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('[SW] Registration error:', error);
    });
}

/**
 * Controlla SW valido
 */
function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('[SW] No internet, running offline');
    });
}

/**
 * Deregistra service worker
 */
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
        console.log('[SW] Unregistered');
      })
      .catch((error) => {
        console.error('[SW] Unregister error:', error);
      });
  }
}
