import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/seo/MetaTags';
import { LazyPicture } from '../components/performance/LazyImage';
import config from '../data/config.json';
import './ChiSiamo.css';
const ChiSiamo = () => {
return (
<>
<MetaTags
     title="Chi Siamo | Uomini di Granite dal 2019"
     description="La storia dei 3 fratelli che hanno aperto l'unico panificio H24 di Milano. Mani di granite, cuore di lievito, sempre aperti per la comunità."
     keywords="panificio milano storia, fratelli panettieri, tradizione pane, panificio artigianale"
   />
  {/* Hero Section */}
  <section className="about-hero">
    <div className="hero-background">
      <LazyPicture
        src="/images/chi-siamo/tre-fratelli.jpg"
        alt="I 3 Fratelli nel panificio"
        priority={true}
        className="hero-image"
      />
      <div className="hero-overlay"></div>
    </div>
    
    <div className="hero-content">
      <div className="container">
        <h1 className="hero-title">Uomini di Granite,<br />Cuore di Lievito</h1>
        <p className="hero-subtitle">
          Non siamo fatti di carne e ossa, ma delle granite che lavoriamo ogni notte.
        </p>
      </div>
    </div>
  </section>

  {/* Our Story */}
  <section className="our-story">
    <div className="container">
      <div className="story-content">
        <div className="story-text">
          <h2>La Nostra Storia</h2>
          <p className="lead">
            Siamo Francesco, Giuseppe e Antonio. Tre fratelli uniti da una promessa: 
            portare il vero pane di una volta nel cuore di Milano, sempre.
          </p>
          
          <p>
            Nel 2019, abbiamo aperto le porte del nostro panificio con un'idea folle: 
            <strong> non chiudere mai</strong>. Non per marketing, non per business. 
            Per essere quello che mancava: un punto fermo in una città che corre.
          </p>
          
          <p>
            Il nostro lievito madre ha più di 100 anni. Lo portò la bisnonna dalla Puglia 
            nel 1920, in treno, per 18 ore. Lo custodì durante la guerra, lo nascose durante 
            i bombardamenti, lo nutrì anche quando non c'era farina per la famiglia.
          </p>
          
          <blockquote className="story-quote">
            "Questo lievito è la nostra memoria. Ogni bolla d'aria è una storia, 
            ogni alveolo un ricordo. Non facciamo il pane. Siamo il pane."
            <footer>— Francesco, il Fratello Maggiore</footer>
          </blockquote>
          
          <p>
            Quando le persone ci chiedono perché restiamo aperti 24 ore su 24, 
            la risposta è semplice: <strong>perché la fame non ha orari</strong>. 
            E non parliamo solo di fame fisica.
          </p>
        </div>
        
        <div className="story-images">
          <LazyPicture
            src="/images/chi-siamo/lievito-madre.jpg"
            alt="Il nostro lievito madre centenario"
            className="story-image"
          />
          <LazyPicture
            src="/images/chi-siamo/mani-lavoro.jpg"
            alt="Mani di granite al lavoro"
            className="story-image"
          />
        </div>
      </div>
    </div>
  </section>

  {/* The Brothers */}
  <section className="the-brothers">
    <div className="container">
      <h2 className="section-title">I 3 Fratelli</h2>
      <p className="section-subtitle">Ognuno con il suo ruolo, tutti con lo stesso cuore</p>
      
      <div className="brothers-grid">
        <div className="brother-card">
          <LazyPicture
            src="/images/chi-siamo/francesco.jpg"
            alt="Francesco - Il Fratello Maggiore"
            className="brother-image"
          />
          <h3>Francesco</h3>
          <p className="brother-role">Il Fratello Maggiore</p>
          <p className="brother-shift">Turno di Notte (22:00 - 06:00)</p>
          <p className="brother-description">
            Il guardiano della notte. Quando Milano dorme, Francesco veglia sul forno. 
            È lui che accoglie i tassisti alle 4, gli infermieri che finiscono il turno, 
            i ragazzi che tornano dalle feste. "La notte rivela chi siamo veramente", dice sempre.
          </p>
          <blockquote className="brother-quote">
            "Alle 3 di notte non vendi pane. Dai conforto."
          </blockquote>
        </div>
        
        <div className="brother-card">
          <LazyPicture
            src="/images/chi-siamo/giuseppe.jpg"
            alt="Giuseppe - Il Fratello di Mezzo"
            className="brother-image"
          />
          <h3>Giuseppe</h3>
          <p className="brother-role">Il Fratello di Mezzo</p>
          <p className="brother-shift">Turno Mattina (06:00 - 14:00)</p>
          <p className="brother-description">
            Il custode del lievito madre. Ogni mattina alle 6, Giuseppe "parla" con il lievito. 
            Lo nutre, lo ascolta, lo capisce. È lui che mantiene viva la tradizione, 
            che tramanda i gesti antichi, che non cambia mai la ricetta.
          </p>
          <blockquote className="brother-quote">
            "Il lievito è vivo. Ha memoria. Ricorda le mani che lo hanno toccato."
          </blockquote>
        </div>
        
        <div className="brother-card">
          <LazyPicture
            src="/images/chi-siamo/antonio.jpg"
            alt="Antonio - Il Fratello Minore"
            className="brother-image"
          />
          <h3>Antonio</h3>
          <p className="brother-role">Il Fratello Minore</p>
          <p className="brother-shift">Turno Pomeriggio (14:00 - 22:00)</p>
          <p className="brother-description">
            L'innovatore della tradizione. Antonio gestisce i rapporti con i ristoranti, 
            studia nuove ricette rispettando le vecchie, porta il panificio nel futuro 
            senza dimenticare il passato. È lui che ha voluto il servizio H24 per i ristoranti.
          </p>
          <blockquote className="brother-quote">
            "Tradizione non significa non cambiare. Significa sapere cosa non deve mai cambiare."
          </blockquote>
        </div>
      </div>
    </div>
  </section>

  {/* Our Values */}
  <section className="our-values">
    <div className="container">
      <h2 className="section-title">I Nostri Valori</h2>
      <p className="section-subtitle">Non sono parole. Sono promesse.</p>
      
      <div className="values-grid">
        <div className="value-card">
          <div className="value-icon">🗿</div>
          <h3>Sostanza Granite</h3>
          <p>
            Non siamo flessibili. Non seguiamo mode. Non cambiamo per piacere. 
            Siamo granite: duri fuori, buoni dentro. Come il nostro pane.
          </p>
        </div>
        
        <div className="value-card">
          <div className="value-icon">🤝</div>
          <h3>Presenza Costante</h3>
          <p>
            24 ore su 24 non è un orario. È una filosofia. Esserci sempre, 
            senza clamore, senza eroismi. Come un faro nella notte.
          </p>
        </div>
        
        <div className="value-card">
          <div className="value-icon">❤️</div>
          <h3>Cuore di Quartiere</h3>
          <p>
            Non siamo un business. Siamo parte del tessuto sociale. 
            Il pane sospeso, il credito informale, la porta sempre aperta.
          </p>
        </div>
        
        <div className="value-card">
          <div className="value-icon">🌱</div>
          <h3>Memoria Vivente</h3>
          <p>
            Custodiamo ricette, gesti, sapori che rischiano di perdersi. 
            Ogni pane è un ponte tra passato e futuro.
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* Timeline */}
  <section className="timeline">
    <div className="container">
      <h2 className="section-title">Il Nostro Percorso</h2>
      
      <div className="timeline-content">
        <div className="timeline-item">
          <div className="timeline-date">1920</div>
          <div className="timeline-text">
            <h3>L'Inizio del Lievito</h3>
            <p>La bisnonna porta il lievito madre dalla Puglia a Milano.</p>
          </div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-date">2019</div>
          <div className="timeline-text">
            <h3>L'Apertura</h3>
            <p>I 3 fratelli aprono il panificio. Prima notte: 3 clienti.</p>
          </div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-date">2020</div>
          <div className="timeline-text">
            <h3>Il Lockdown</h3>
            <p>Restiamo aperti. Diventiamo essenziali per il quartiere.</p>
          </div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-date">2021</div>
          <div className="timeline-text">
            <h3>Il Pane Sospeso</h3>
            <p>Nasce l'iniziativa. 500 pani donati nel primo mese.</p>
          </div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-date">2023</div>
          <div className="timeline-text">
            <h3>100 Ristoranti</h3>
            <p>Raggiungiamo 100 ristoranti partner. Servizio H24 consolidato.</p>
          </div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-date">Oggi</div>
          <div className="timeline-text">
            <h3>Sempre Qui</h3>
            <p>360 giorni aperti, migliaia di storie, un'unica promessa: esserci.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Mission */}
  <section className="mission">
    <div className="container">
      <div className="mission-content">
        <h2>La Nostra Missione</h2>
        <p className="mission-text">
          Non vogliamo essere il panificio migliore di Milano. 
          Vogliamo essere il panificio che Milano sa di poter sempre trovare aperto. 
          Quello dove entri alle 3 di notte e trovi qualcuno che ti sorride. 
          Quello che non ti chiede perché sei lì, ma ti dà quello di cui hai bisogno.
        </p>
        <p className="mission-signature">
          Non vendiamo pane. Siamo pane.
        </p>
      </div>
    </div>
  </section>

  {/* CTA */}
  <section className="about-cta">
    <div className="container">
      <div className="cta-box">
        <h2>Vieni a Conoscerci</h2>
        <p>La porta è sempre aperta, il caffè sempre caldo, il pane sempre fresco.</p>
        <div className="cta-buttons">
          <Link to="/contatti" className="btn btn-primary">
            📍 Dove Siamo
          </Link>
          <Link to="/prodotti" className="btn btn-outline">
            🍞 I Nostri Pani
          </Link>
        </div>
      </div>
    </div>
  </section>
</>
);
};
export default ChiSiamo;
