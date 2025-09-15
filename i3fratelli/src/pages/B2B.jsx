import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/seo/MetaTags';
import { LazyPicture } from '../components/performance/LazyImage';
import b2bContent from '../data/b2b-content.json';
import config from '../data/config.json';
import './B2B.css';
const B2B = () => {
const [activeTab, setActiveTab] = useState('regular');
const [showOrderForm, setShowOrderForm] = useState(false);
const [formData, setFormData] = useState({
businessName: '',
contactName: '',
email: '',
phone: '',
type: 'ristorante',
volume: '',
message: ''
});
const handleSubmit = (e) => {
e.preventDefault();
// Track conversion
if (window.gtag) {
  window.gtag('event', 'b2b_inquiry', {
    event_category: 'B2B',
    event_label: formData.type,
    value: formData.volume
  });
}

// Qui integreresti con il tuo backend
console.log('Form submitted:', formData);

// Mostra messaggio successo
alert('Richiesta inviata! Ti contatteremo entro 30 minuti.');
setShowOrderForm(false);
};
const handleInputChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};
return (
<>
<MetaTags
     title="Forniture Ristoranti H24 Milano | Consegne Notturne"
     description="Servizio H24 per ristoranti Milano. Consegne notturne, emergenze in 30 minuti. L'unico fornitore di pane sempre aperto."
     keywords="forniture pane ristoranti, consegne notturne milano, pane per ristoranti, emergenza pane, b2b panificio"
   />
  {/* Hero Section */}
  <section className="b2b-hero">
    <div className="container">
      <div className="hero-content">
        <span className="hero-badge">SERVIZIO B2B H24</span>
        <h1 className="hero-title">{b2bContent.hero.title}</h1>
        <p className="hero-subtitle">{b2bContent.hero.subtitle}</p>
        
        <div className="hero-emergency">
          <div className="emergency-box">
            <span className="emergency-label">{b2bContent.hero.emergency.text}</span>
            <a href={`tel:${b2bContent.hero.emergency.phone}`} className="emergency-button">
              🚨 {b2bContent.hero.emergency.button}
            </a>
          </div>
        </div>

        <div className="hero-cta">
          <button 
            onClick={() => setShowOrderForm(true)}
            className="btn btn-primary btn-large"
          >
            {b2bContent.hero.cta.primary}
          </button>
          <a href="#listino" className="btn btn-outline btn-large">
            {b2bContent.hero.cta.secondary}
          </a>
        </div>
      </div>
    </div>
  </section>

  {/* Value Proposition */}
  <section className="value-proposition">
    <div className="container">
      <h2 className="section-title">{b2bContent.valueProposition.main}</h2>
      
      <div className="value-grid">
        {b2bContent.valueProposition.points.map((point, index) => (
          <div key={index} className="value-card">
            <div className="value-icon">{point.icon}</div>
            <h3>{point.title}</h3>
            <p>{point.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Services Tabs */}
  <section className="services-section">
    <div className="container">
      <h2 className="section-title">I Nostri Servizi</h2>
      
      <div className="services-tabs">
        <div className="tabs-nav">
          <button 
            className={`tab-button ${activeTab === 'regular' ? 'active' : ''}`}
            onClick={() => setActiveTab('regular')}
          >
            Servizio Programmato
          </button>
          <button 
            className={`tab-button ${activeTab === 'emergency' ? 'active' : ''}`}
            onClick={() => setActiveTab('emergency')}
          >
            Emergenza H24
          </button>
          <button 
            className={`tab-button ${activeTab === 'consulting' ? 'active' : ''}`}
            onClick={() => setActiveTab('consulting')}
          >
            Consulenza
          </button>
        </div>
        
        <div className="tabs-content">
          {activeTab === 'regular' && (
            <div className="tab-panel">
              <h3>{b2bContent.services.regular.title}</h3>
              <p>{b2bContent.services.regular.description}</p>
              <ul className="features-list">
                {b2bContent.services.regular.features.map((feature, i) => (
                  <li key={i}>✅ {feature}</li>
                ))}
              </ul>
              <div className="service-meta">
                <span>Ordine minimo: €{b2bContent.services.regular.minimumOrder}</span>
                <span>Consegna: {b2bContent.services.regular.deliveryTime}</span>
              </div>
            </div>
          )}
          
          {activeTab === 'emergency' && (
            <div className="tab-panel emergency-panel">
              <h3>{b2bContent.services.emergency.title}</h3>
              <p>{b2bContent.services.emergency.description}</p>
              <ul className="features-list">
                {b2bContent.services.emergency.features.map((feature, i) => (
                  <li key={i}>🚨 {feature}</li>
                ))}
              </ul>
              <div className="emergency-hotline">
                <span>Hotline H24:</span>
                <a href={`tel:${b2bContent.services.emergency.hotline}`}>
                  {b2bContent.services.emergency.hotline}
                </a>
              </div>
            </div>
          )}
          
          {activeTab === 'consulting' && (
            <div className="tab-panel">
              <h3>{b2bContent.services.consulting.title}</h3>
              <p>{b2bContent.services.consulting.description}</p>
              <ul className="features-list">
                {b2bContent.services.consulting.features.map((feature, i) => (
                  <li key={i}>💡 {feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>

  {/* Products Catalog */}
  <section id="listino" className="products-catalog">
    <div className="container">
      <h2 className="section-title">Catalogo Prodotti B2B</h2>
      
      {b2bContent.products.categories.map((category, index) => (
        <div key={index} className="product-category">
          <h3 className="category-title">{category.name}</h3>
          <div className="products-grid">
            {category.items.map((item, i) => (
              <div key={i} className="product-item">
                <h4>{item.name}</h4>
                {item.description && <p>{item.description}</p>}
                {item.sizes && (
                  <p className="sizes">Misure: {item.sizes.join(', ')}</p>
                )}
                <p className="price">{item.price}</p>
                {item.minOrder && (
                  <p className="min-order">Min. ordine: {item.minOrder} pz</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* Testimonials */}
  <section className="b2b-testimonials">
    <div className="container">
      <h2 className="section-title">I Nostri Partner</h2>
      
      <div className="testimonials-grid">
        {b2bContent.clients.testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="stars">{'⭐'.repeat(testimonial.rating)}</div>
            <blockquote>"{testimonial.quote}"</blockquote>
            <footer>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.type}</span>
            </footer>
          </div>
        ))}
      </div>
      
      <div className="client-stats">
        <div className="stat">
          <span className="number">{b2bContent.clients.stats.activeClients}</span>
          <span className="label">Clienti Attivi</span>
        </div>
        <div className="stat">
          <span className="number">{b2bContent.clients.stats.dailyDeliveries}</span>
          <span className="label">Consegne/Giorno</span>
        </div>
        <div className="stat">
          <span className="number">{b2bContent.clients.stats.emergenciesResolved}</span>
          <span className="label">Emergenze Risolte</span>
        </div>
        <div className="stat">
          <span className="number">{b2bContent.clients.stats.averageResponseTime}</span>
          <span className="label">Tempo Risposta</span>
        </div>
      </div>
    </div>
  </section>

  {/* Guarantees */}
  <section className="guarantees">
    <div className="container">
      <h2 className="section-title">Le Nostre Garanzie</h2>
      
      <div className="guarantees-grid">
        {b2bContent.guarantees.map((guarantee, index) => (
          <div key={index} className="guarantee-card">
            <div className="guarantee-icon">{guarantee.icon}</div>
            <h3>{guarantee.title}</h3>
            <p>{guarantee.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* FAQ */}
  <section className="b2b-faq">
    <div className="container">
      <h2 className="section-title">Domande Frequenti</h2>
      
      <div className="faq-list">
        {b2bContent.faq.map((item, index) => (
          <details key={index} className="faq-item">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>

  {/* CTA Section */}
  <section className="b2b-cta-section">
    <div className="container">
      <div className="cta-box">
        <h2>{b2bContent.cta.header}</h2>
        <div className="cta-buttons">
          <button 
            onClick={() => setShowOrderForm(true)}
            className="btn btn-primary btn-large"
          >
            {b2bContent.cta.button}
          </button>
          <a 
            href={`https://wa.me/${config.contact.whatsapp.number}?text=${encodeURIComponent(config.contact.whatsapp.b2bMessage)}`}
            className="btn btn-whatsapp btn-large"
            target="_blank"
            rel="noopener noreferrer"
          >
            {b2bContent.cta.whatsapp}
          </a>
        </div>
        <div className="cta-emergency">
          <p>{b2bContent.cta.emergency}</p>
        </div>
      </div>
    </div>
  </section>

  {/* Order Form Modal */}
  {showOrderForm && (
    <div className="modal-overlay" onClick={() => setShowOrderForm(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close"
          onClick={() => setShowOrderForm(false)}
        >
          ✕
        </button>
        
        <h2>Diventa Partner</h2>
        <p>Compila il form e ti contatteremo entro 30 minuti</p>
        
        <form onSubmit={handleSubmit} className="b2b-form">
          <div className="form-group">
            <label>Nome Attività *</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Nome Referente *</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Telefono *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Tipo Attività *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="ristorante">Ristorante</option>
                <option value="bar">Bar</option>
                <option value="hotel">Hotel</option>
                <option value="catering">Catering</option>
                <option value="altro">Altro</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Volume Mensile Stimato</label>
              <select
                name="volume"
                value={formData.volume}
                onChange={handleInputChange}
              >
                <option value="">Seleziona...</option>
                <option value="0-500">€0 - €500</option>
                <option value="500-1000">€500 - €1000</option>
                <option value="1000-2000">€1000 - €2000</option>
                <option value="2000+">Oltre €2000</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Messaggio</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
              placeholder="Raccontaci le tue esigenze..."
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Invia Richiesta
            </button>
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => setShowOrderForm(false)}
            >
              Annulla
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</>
);
};
export default B2B;
