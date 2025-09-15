import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/seo/MetaTags';
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema';
import config from '../data/config.json';
import './Legal.css';
const Privacy = () => {
const lastUpdate = '13 Gennaio 2025';
return (
<>
<MetaTags
     title="Privacy Policy"
     description="Privacy Policy di I 3 Fratelli. Scopri come trattiamo i tuoi dati personali nel rispetto del GDPR."
     keywords="privacy policy, gdpr, dati personali, cookies"
   />
  <BreadcrumbSchema />
  
  <div className="legal-page">
    <div className="container">
      <header className="legal-header">
        <h1>Privacy Policy</h1>
        <p className="legal-update">Ultimo aggiornamento: {lastUpdate}</p>
      </header>
      
      <div className="legal-content">
        {/* Introduzione */}
        <section className="legal-section">
          <h2>1. Introduzione</h2>
          <p>
            La presente Privacy Policy descrive come <strong>I 3 Fratelli S.r.l.</strong> 
            ("noi", "nostro" o "I 3 Fratelli"), con sede in {config.contact.address.street}, 
            {config.contact.address.cap} {config.contact.address.city}, P.IVA {config.legal.vatNumber}, 
            raccoglie, utilizza e protegge i tuoi dati personali in conformità al 
            Regolamento Generale sulla Protezione dei Dati (GDPR - Regolamento UE 2016/679).
          </p>
          <p>
            <strong>Siamo un panificio, non una multinazionale tech.</strong> Trattiamo i tuoi 
            dati con la stessa cura con cui impastiamo il pane: con rispetto, attenzione e 
            solo quando necessario.
          </p>
        </section>

        {/* Titolare del Trattamento */}
        <section className="legal-section">
          <h2>2. Titolare del Trattamento</h2>
          <div className="info-box">
            <p><strong>I 3 Fratelli S.r.l.</strong></p>
            <p>Indirizzo: {config.contact.address.street}, {config.contact.address.city}</p>
            <p>Email: {config.contact.email.info}</p>
            <p>Telefono: {config.contact.phone.display}</p>
            <p>P.IVA: {config.legal.vatNumber}</p>
          </div>
        </section>

        {/* Dati Raccolti */}
        <section className="legal-section">
          <h2>3. Quali Dati Raccogliamo</h2>
          
          <h3>3.1 Dati forniti volontariamente</h3>
          <ul>
            <li><strong>Dati di contatto:</strong> nome, email, numero di telefono (quando compili un form o ci contatti)</li>
            <li><strong>Dati di consegna:</strong> indirizzo (solo per consegne a domicilio)</li>
            <li><strong>Dati aziendali:</strong> ragione sociale, P.IVA (per clienti B2B)</li>
            <li><strong>Messaggi:</strong> contenuto delle comunicazioni via form, email o WhatsApp</li>
          </ul>
          
          <h3>3.2 Dati raccolti automaticamente</h3>
          <ul>
            <li><strong>Dati di navigazione:</strong> indirizzo IP, browser, sistema operativo</li>
            <li><strong>Cookie:</strong> vedi la nostra <Link to="/cookie-policy">Cookie Policy</Link></li>
            <li><strong>Analytics:</strong> pagine visitate, tempo di permanenza, percorso di navigazione</li>
          </ul>
          
          <div className="notice-box">
            <p>
              <strong>📌 Nota:</strong> NON raccogliamo mai dati sensibili (salute, orientamento 
              politico/religioso, etc.) a meno che tu non ce li fornisca spontaneamente, nel 
              qual caso li cancelleremo immediatamente.
            </p>
          </div>
        </section>

        {/* Finalità del Trattamento */}
        <section className="legal-section">
          <h2>4. Perché Usiamo i Tuoi Dati</h2>
          
          <table className="legal-table">
            <thead>
              <tr>
                <th>Finalità</th>
                <th>Base Giuridica</th>
                <th>Periodo di Conservazione</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rispondere alle tue richieste</td>
                <td>Esecuzione del contratto / Consenso</td>
                <td>6 mesi</td>
              </tr>
              <tr>
                <td>Processare ordini</td>
                <td>Esecuzione del contratto</td>
                <td>10 anni (obbligo fiscale)</td>
              </tr>
              <tr>
                <td>Inviare newsletter (se iscritto)</td>
                <td>Consenso</td>
                <td>Fino a disiscrizione</td>
              </tr>
              <tr>
                <td>Migliorare il sito (analytics)</td>
                <td>Interesse legittimo</td>
                <td>26 mesi</td>
              </tr>
              <tr>
                <td>Sicurezza e prevenzione frodi</td>
                <td>Interesse legittimo</td>
                <td>6 mesi</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Come Proteggiamo i Dati */}
        <section className="legal-section">
          <h2>5. Come Proteggiamo i Tuoi Dati</h2>
          <p>
            Usiamo misure di sicurezza tecniche e organizzative per proteggere i tuoi dati:
          </p>
          <ul>
            <li>🔒 Connessione HTTPS criptata</li>
            <li>🛡️ Firewall e sistemi anti-intrusione</li>
            <li>🔐 Accesso limitato ai dati solo al personale autorizzato</li>
            <li>📝 Formazione del personale sulla protezione dati</li>
            <li>🔄 Backup regolari e criptati</li>
          </ul>
          <p>
            <strong>Promessa:</strong> Trattiamo i tuoi dati con la stessa cura con cui 
            custodiamo il nostro lievito madre centenario.
          </p>
        </section>

        {/* Con Chi Condividiamo */}
        <section className="legal-section">
          <h2>6. Con Chi Condividiamo i Dati</h2>
          <p>
            NON vendiamo MAI i tuoi dati. Li condividiamo solo quando strettamente necessario:
          </p>
          <ul>
            <li>
              <strong>Fornitori di servizi:</strong>
              <ul>
                <li>Google (Analytics, Maps) - <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
                <li>WhatsApp/Meta (messaggistica) - <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
                <li>Servizio hosting (Vercel/Netlify)</li>
                <li>Servizio email (se usi il form contatti)</li>
              </ul>
            </li>
            <li>
              <strong>Autorità:</strong> solo se richiesto per legge
            </li>
            <li>
              <strong>Corrieri:</strong> solo dati necessari per consegne (nome, indirizzo, telefono)
            </li>
          </ul>
        </section>

        {/* I Tuoi Diritti */}
        <section className="legal-section">
          <h2>7. I Tuoi Diritti</h2>
          <p>Secondo il GDPR, hai diritto a:</p>
          <div className="rights-grid">
            <div className="right-card">
              <h3>✅ Accesso</h3>
              <p>Sapere se trattiamo tuoi dati e riceverne copia</p>
            </div>
            <div className="right-card">
              <h3>✏️ Rettifica</h3>
              <p>Correggere dati errati o incompleti</p>
            </div>
            <div className="right-card">
              <h3>🗑️ Cancellazione</h3>
              <p>Richiedere la cancellazione dei tuoi dati</p>
            </div>
            <div className="right-card">
              <h3>⏸️ Limitazione</h3>
              <p>Limitare il trattamento dei tuoi dati</p>
            </div>
            <div className="right-card">
              <h3>📦 Portabilità</h3>
              <p>Ricevere i tuoi dati in formato leggibile</p>
            </div>
            <div className="right-card">
              <h3>🚫 Opposizione</h3>
              <p>Opporti al trattamento per marketing</p>
            </div>
          </div>
          
          <p>
            Per esercitare questi diritti, scrivici a: <a href={`mailto:${config.contact.email.info}`}>
              {config.contact.email.info}
            </a>
          </p>
          <p>
            Risponderemo entro 30 giorni. Se non sei soddisfatto, puoi presentare reclamo al 
            Garante per la Protezione dei Dati Personali.
          </p>
        </section>

        {/* Cookie */}
        <section className="legal-section">
          <h2>8. Cookie</h2>
          <p>
            Usiamo cookie per far funzionare il sito e migliorare la tua esperienza. 
            Per tutti i dettagli, consulta la nostra <Link to="/cookie-policy">Cookie Policy</Link>.
          </p>
          <p>
            <strong>In breve:</strong> usiamo solo cookie necessari e, con il tuo consenso, 
            cookie analytics per capire come migliorare il sito.
          </p>
        </section>

        {/* Minori */}
        <section className="legal-section">
          <h2>9. Minori</h2>
          <p>
            Il nostro sito non è destinato a minori di 16 anni. Non raccogliamo 
            consapevolmente dati di minori. Se sei un genitore e scopri che tuo figlio 
            ci ha fornito dati, contattaci e li cancelleremo immediatamente.
          </p>
        </section>

        {/* Trasferimenti Extra-UE */}
        <section className="legal-section">
          <h2>10. Trasferimenti Extra-UE</h2>
          <p>
            Alcuni servizi (Google, Meta) potrebbero trasferire dati fuori dall'UE. 
            Questi trasferimenti avvengono con garanzie appropriate (Standard Contractual Clauses).
          </p>
        </section>

        {/* Modifiche */}
        <section className="legal-section">
          <h2>11. Modifiche alla Privacy Policy</h2>
          <p>
            Potremmo aggiornare questa policy. Pubblicheremo eventuali modifiche su questa 
            pagina con la nuova data di "Ultimo aggiornamento". Per modifiche sostanziali, 
            ti avviseremo via email (se abbiamo il tuo contatto).
          </p>
        </section>

        {/* Contatti */}
        <section className="legal-section">
          <h2>12. Contattaci</h2>
          <p>
            Per qualsiasi domanda sulla privacy o per esercitare i tuoi diritti:
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
              <strong>Indirizzo:</strong> {config.contact.address.street}, 
              {config.contact.address.cap} {config.contact.address.city}
            </p>
          </div>
          
          <div className="friendly-note">
            <p>
              <strong>💝 Nota umana:</strong> Siamo un panificio, non una big tech. 
              Se hai dubbi sulla privacy, vieni a trovarci di persona (siamo sempre aperti!) 
              e ne parliamo davanti a un buon caffè e una brioche calda.
            </p>
          </div>
        </section>
      </div>
      
      {/* Footer Links */}
      <footer className="legal-footer">
        <Link to="/cookie-policy" className="btn btn-outline">
          🍪 Cookie Policy
        </Link>
        <Link to="/contatti" className="btn btn-outline">
          📞 Contattaci
        </Link>
        <Link to="/" className="btn btn-primary">
          🏠 Torna alla Home
        </Link>
      </footer>
    </div>
  </div>
</>
);
};
export default Privacy;
