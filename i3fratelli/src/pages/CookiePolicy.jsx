import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/seo/MetaTags';
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema';
import config from '../data/config.json';
import './Legal.css';
const CookiePolicy = () => {
const [expandedSection, setExpandedSection] = useState(null);
const lastUpdate = '13 Gennaio 2025';
const toggleSection = (section) => {
setExpandedSection(expandedSection === section ? null : section);
};
const handleCookieSettings = () => {
// Rimuovi il consenso salvato per mostrare di nuovo il banner
localStorage.removeItem('cookieConsent');
localStorage.removeItem('cookieConsentDate');
window.location.reload();
};
return (
<>
<MetaTags
     title="Cookie Policy"
     description="Cookie Policy di I 3 Fratelli. Scopri quali cookie usiamo e come gestire le tue preferenze."
     keywords="cookie policy, gdpr, cookies, privacy"
   />
  <BreadcrumbSchema />
  
  <div className="legal-page">
    <div className="container">
      <header className="legal-header">
        <h1>Cookie Policy</h1>
        <p className="legal-update">Ultimo aggiornamento: {lastUpdate}</p>
        
        <div className="cookie-intro">
          <p className="lead">
            🍪 <strong>In parole semplici:</strong> I cookie sono piccoli file che il sito 
            salva sul tuo dispositivo. Noi li usiamo solo per far funzionare il sito e, 
            con il tuo consenso, per capire come migliorarlo. 
            Non li usiamo per spiarti o venderti cose strane!
          </p>
        </div>
      </header>
      
      <div className="legal-content">
        {/* Cosa sono i Cookie */}
        <section className="legal-section">
          <h2>1. Cosa Sono i Cookie?</h2>
          <p>
            I cookie sono piccoli file di testo che i siti web salvano sul tuo computer o 
            dispositivo mobile quando li visiti. Servono a:
          </p>
          <ul>
            <li>Ricordare le tue preferenze (come la lingua o il consenso cookie)</li>
            <li>Far funzionare correttamente il sito</li>
            <li>Capire come usi il sito per migliorarlo</li>
            <li>Mostrarti contenuti pertinenti</li>
          </ul>
          <p>
            <strong>I nostri cookie NON possono:</strong>
          </p>
          <ul>
            <li>❌ Danneggiare il tuo dispositivo</li>
            <li>❌ Accedere ad altri file sul tuo computer</li>
            <li>❌ Rubare informazioni personali</li>
            <li>❌ Installare virus o malware</li>
          </ul>
        </section>

        {/* Quali Cookie Usiamo */}
        <section className="legal-section">
          <h2>2. Quali Cookie Usiamo</h2>
          
          {/* Cookie Necessari */}
          <div className="cookie-category">
            <button 
              className="category-header"
              onClick={() => toggleSection('necessary')}
            >
              <span className="category-title">
                <span className="cookie-icon">🔒</span>
                Cookie Necessari (Sempre Attivi)
              </span>
              <span className="toggle-icon">
                {expandedSection === 'necessary' ? '−' : '+'}
              </span>
            </button>
            
            {expandedSection === 'necessary' && (
              <div className="category-content">
                <p>Essenziali per il funzionamento del sito. Non puoi disattivarli.</p>
                <table className="cookie-table">
                  <thead>
                    <tr>
                      <th>Nome Cookie</th>
                      <th>Scopo</th>
                      <th>Durata</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>cookieConsent</td>
                      <td>Ricorda le tue preferenze sui cookie</td>
                      <td>1 anno</td>
                    </tr>
                    <tr>
                      <td>sessionId</td>
                      <td>Mantiene la sessione attiva</td>
                      <td>Sessione</td>
                    </tr>
                    <tr>
                      <td>security_token</td>
                      <td>Protezione contro attacchi CSRF</td>
                      <td>Sessione</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Cookie Analytics */}
          <div className="cookie-category">
            <button 
              className="category-header"
              onClick={() => toggleSection('analytics')}
            >
              <span className="category-title">
                <span className="cookie-icon">📊</span>
                Cookie Analitici (Con Consenso)
              </span>
              <span className="toggle-icon">
                {expandedSection === 'analytics' ? '−' : '+'}
              </span>
            </button>
            
            {expandedSection === 'analytics' && (
              <div className="category-content">
                <p>Ci aiutano a capire come usi il sito per migliorarlo.</p>
                <table className="cookie-table">
                  <thead>
                    <tr>
                      <th>Nome Cookie</th>
                      <th>Provider</th>
                      <th>Scopo</th>
                      <th>Durata</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>_ga</td>
                      <td>Google Analytics</td>
                      <td>Distingue i visitatori</td>
                      <td>2 anni</td>
                    </tr>
                    <tr>
                      <td>_gid</td>
                      <td>Google Analytics</td>
                      <td>Distingue i visitatori</td>
                      <td>24 ore</td>
                    </tr>
                    <tr>
                      <td>_gat</td>
                      <td>Google Analytics</td>
                      <td>Limita la frequenza delle richieste</td>
                      <td>1 minuto</td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy di Google Analytics →
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* Cookie Marketing */}
          <div className="cookie-category">
            <button 
              className="category-header"
              onClick={() => toggleSection('marketing')}
            >
              <span className="category-title">
                <span className="cookie-icon">📣</span>
                Cookie di Marketing (Con Consenso)
              </span>
              <span className="toggle-icon">
                {expandedSection === 'marketing' ? '−' : '+'}
              </span>
            </button>
            
            {expandedSection === 'marketing' && (
              <div className="category-content">
                <p>Per mostrarti contenuti e offerte pertinenti (se attivi).</p>
                <table className="cookie-table">
                  <thead>
                    <tr>
                      <th>Nome Cookie</th>
                      <th>Provider</th>
                      <th>Scopo</th>
                      <th>Durata</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>fbp</td>
                      <td>Facebook</td>
                      <td>Tracciamento pubblicitario</td>
                      <td>3 mesi</td>
                    </tr>
                    <tr>
                      <td>fr</td>
                      <td>Facebook</td>
                      <td>Pubblicità pertinente</td>
                      <td>3 mesi</td>
                    </tr>
                  </tbody>
                </table>
                <p className="note">
                  <strong>Nota:</strong> Al momento NON usiamo cookie di marketing. 
                  Li attiveremo solo se decideremo di fare pubblicità online.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Come Gestire i Cookie */}
        <section className="legal-section">
          <h2>3. Come Gestire i Cookie</h2>
          
          <h3>3.1 Tramite il nostro sito</h3>
          <p>
            Puoi gestire le tue preferenze cookie in qualsiasi momento:
          </p>
          <button 
            onClick={handleCookieSettings}
            className="btn btn-primary"
          >
            ⚙️ Gestisci Preferenze Cookie
          </button>
          
          <h3>3.2 Tramite il browser</h3>
          <p>
            Puoi anche gestire i cookie dalle impostazioni del tuo browser:
          </p>
          <ul>
            <li>
              <strong>Chrome:</strong> Settings → Privacy and security → Cookies
              <br /><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                Guida Chrome →
              </a>
            </li>
            <li>
              <strong>Firefox:</strong> Settings → Privacy & Security → Cookies
              <br /><a href="https://support.mozilla.org/kb/cookies" target="_blank" rel="noopener noreferrer">
                Guida Firefox →
              </a>
            </li>
            <li>
              <strong>Safari:</strong> Preferences → Privacy → Cookies
              <br /><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471" target="_blank" rel="noopener noreferrer">
                Guida Safari →
              </a>
            </li>
            <li>
              <strong>Edge:</strong> Settings → Privacy → Cookies
              <br /><a href="https://support.microsoft.com/help/4027947" target="_blank" rel="noopener noreferrer">
                Guida Edge →
              </a>
            </li>
          </ul>
          
          <div className="warning-box">
            <p>
              <strong>⚠️ Attenzione:</strong> Bloccare tutti i cookie potrebbe impedire 
              il corretto funzionamento del sito. Alcune funzioni potrebbero non essere disponibili.
            </p>
          </div>
        </section>

        {/* Cookie di Terze Parti */}
        <section className="legal-section">
          <h2>4. Cookie di Terze Parti</h2>
          <p>
            Alcuni servizi esterni potrebbero impostare propri cookie:
          </p>
          <ul>
            <li>
              <strong>Google Maps:</strong> Per mostrare la mappa nella pagina contatti
            </li>
            <li>
              <strong>YouTube:</strong> Se incorporiamo video (al momento non presenti)
            </li>
            <li>
              <strong>Font Google:</strong> Per i caratteri del sito
            </li>
          </ul>
          <p>
            Non abbiamo controllo su questi cookie. Consulta le privacy policy dei 
            rispettivi servizi per maggiori informazioni.
          </p>
        </section>

        {/* Do Not Track */}
        <section className="legal-section">
          <h2>5. Do Not Track</h2>
          <p>
            Rispettiamo il segnale "Do Not Track" del tuo browser. Se attivo, 
            non attiveremo cookie analytics o marketing senza il tuo consenso esplicito.
          </p>
        </section>

        {/* Aggiornamenti */}
        <section className="legal-section">
          <h2>6. Aggiornamenti alla Cookie Policy</h2>
          <p>
            Potremmo aggiornare questa policy per riflettere cambiamenti nei nostri 
            servizi o nelle normative. Controlla la data di "Ultimo aggiornamento" 
            in alto per vedere quando è stata modificata.
          </p>
        </section>

        {/* Contatti */}
        <section className="legal-section">
          <h2>7. Domande?</h2>
          <p>
            Se hai domande sui cookie o sulla privacy in generale:
          </p>
          <div className="contact-box">
            <p>
              <strong>Email:</strong> <a href={`mailto:${config.contact.email.info}`}>
                {config.contact.email.info}
              </a>
            </p>
            <p>
              <strong>Telefono:</strong> <a href={`tel:${config.contact.phone.main}`}>
                {config.contact.phone.display}
              </a>
            </p>
            <p>
              <strong>Di persona:</strong> Vieni in {config.contact.address.street} 
              (siamo sempre aperti!)
            </p>
          </div>
          
          <div className="friendly-note">
            <p>
              <strong>🍞 Promessa del panettiere:</strong> Usiamo i cookie digitali con 
              la stessa onestà con cui facciamo il pane. Niente ingredienti nascosti, 
              niente sorprese. Solo quello che serve per darti il meglio.
            </p>
          </div>
        </section>

        {/* Glossario */}
        <section className="legal-section">
          <h2>8. Glossario Cookie 🤓</h2>
          <dl className="glossary">
            <dt>Cookie di sessione</dt>
            <dd>Si cancellano quando chiudi il browser</dd>
            
            <dt>Cookie persistenti</dt>
            <dd>Restano sul dispositivo per un tempo determinato</dd>
            
            <dt>Cookie di prima parte</dt>
            <dd>Creati dal nostro sito (i3fratelli.it)</dd>
            
            <dt>Cookie di terze parti</dt>
            <dd>Creati da altri siti (es. Google Analytics)</dd>
            
            <dt>Cookie tecnici</dt>
            <dd>Necessari per il funzionamento del sito</dd>
            
            <dt>Cookie di profilazione</dt>
            <dd>Tracciano le tue preferenze (noi NON li usiamo)</dd>
          </dl>
        </section>
      </div>
      
      {/* Footer Actions */}
      <footer className="legal-footer">
        <button 
          onClick={handleCookieSettings}
          className="btn btn-primary"
        >
          ⚙️ Gestisci Cookie
        </button>
        <Link to="/privacy" className="btn btn-outline">
          🔒 Privacy Policy
        </Link>
        <Link to="/" className="btn btn-outline">
          🏠 Torna alla Home
        </Link>
      </footer>
    </div>
  </div>
</>
);
};
export default CookiePolicy;
