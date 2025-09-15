/* ========================================
   REPORT WEB VITALS.JS - I 3 FRATELLI
   Stub minimo per build - Da implementare
   ======================================== */

/**
 * Report Web Vitals metrics
 * @param {Function} onPerfEntry - Callback per metriche
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // In futuro qui importeremo web-vitals
    // import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    //   getCLS(onPerfEntry);
    //   getFID(onPerfEntry);
    //   getFCP(onPerfEntry);
    //   getLCP(onPerfEntry);
    //   getTTFB(onPerfEntry);
    // });
    
    // Per ora solo log
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals] Ready to report (stub)');
    }
  }
};

export default reportWebVitals;
