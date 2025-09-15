import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../data/config.json';
import './ErrorBoundary.css';
class ErrorBoundary extends Component {
constructor(props) {
super(props);
this.state = {
hasError: false,
error: null,
errorInfo: null,
errorCount: 0
};
}
static getDerivedStateFromError(error) {
// Aggiorna lo state per mostrare l'UI di fallback
return { hasError: true };
}
componentDidCatch(error, errorInfo) {
// Log dell'errore
console.error('ErrorBoundary caught an error:', error, errorInfo);
// Aggiorna lo state con i dettagli dell'errore
this.setState(prevState => ({
  error: error,
  errorInfo: errorInfo,
  errorCount: prevState.errorCount + 1
}));

// Invia errore a Google Analytics se disponibile
if (window.gtag) {
  window.gtag('event', 'exception', {
    description: error?.message || 'Unknown error',
    fatal: true,
    error_boundary: true
  });
}

// Invia a servizio di error tracking (es. Sentry)
if (window.Sentry) {
  window.Sentry.captureException(error, {
    contexts: {
      react: {
        componentStack: errorInfo.componentStack
      }
    }
  });
}
}
handleReset = () => {
this.setState({
hasError: false,
error: null,
errorInfo: null
});
// Ricarica la pagina se ci sono stati troppi errori
if (this.state.errorCount > 3) {
  window.location.reload();
}
};
render() {
if (this.state.hasError) {
const isDevelopment = process.env.NODE_ENV === 'development';
  return (
    <div className="error-boundary">
      <div className="error-container">
        {/* Logo e Header */}
        <div className="error-header">
          <div className="error-logo">
            <span className="logo-icon">🍞</span>
            <h1>I 3 Fratelli</h1>
          </div>
        </div>
        
        {/* Messaggio principale */}
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          
          <h2 className="error-title">
            Ops! Il forno ha avuto un problema
          </h2>
          
          <p className="error-message">
            Qualcosa è andato storto, ma non preoccuparti! 
            Il nostro panificio fisico è sempre aperto e funzionante.
          </p>
          
          {/* Dettagli errore (solo in sviluppo) */}
          {isDevelopment && this.state.error && (
            <details className="error-details">
              <summary>Dettagli tecnici (Development)</summary>
              <div className="error-stack">
                <p><strong>Error:</strong> {this.state.error.toString()}</p>
                {this.state.errorInfo && (
                  <pre>{this.state.errorInfo.componentStack}</pre>
                )}
              </div>
            </details>
          )}
          
          {/* Azioni */}
          <div className="error-actions">
            <button 
              onClick={this.handleReset}
              className="btn btn-primary"
            >
              🔄 Riprova
            </button>
            
            <button 
              onClick={() => window.location.href = '/'}
              className="btn btn-outline"
            >
              🏠 Torna alla Home
            </button>
          </div>
          
          {/* Contatti alternativi */}
          <div className="error-contact">
            <h3>Nel frattempo, puoi sempre:</h3>
            
            <div className="contact-options">
              <a 
                href={`tel:${config.contact.phone.main}`}
                className="contact-option"
              >
                <span className="icon">📞</span>
                <span>
                  Chiamarci<br />
                  <strong>{config.contact.phone.display}</strong>
                </span>
              </a>
              
              <a 
                href={`https://wa.me/${config.contact.whatsapp.number}`}
                className="contact-option"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">💬</span>
                <span>
                  WhatsApp<br />
                  <strong>Ordina ora</strong>
                </span>
              </a>
              
              <div className="contact-option">
                <span className="icon">📍</span>
                <span>
                  Venire di persona<br />
                  <strong>Siamo sempre aperti!</strong>
                </span>
              </div>
            </div>
          </div>
          
          {/* Status */}
          <div className="current-status">
            <span className="pulse-dot"></span>
            <p>
              Sono le {new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })} 
              e il panificio è <strong>APERTO</strong>
            </p>
          </div>
          
          {/* Error count warning */}
          {this.state.errorCount > 2 && (
            <div className="error-warning">
              <p>
                ⚠️ Si sono verificati multipli errori. 
                Se il problema persiste, prova a <button onClick={() => window.location.reload()}>ricaricare la pagina</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

return this.props.children;
}
}
// HOC per wrappare componenti con error boundary
export const withErrorBoundary = (Component, fallback) => {
return (props) => (
<ErrorBoundary fallback={fallback}>
<Component {...props} />
</ErrorBoundary>
);
};
export default ErrorBoundary;
