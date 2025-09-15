import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/seo/MetaTags';
import { LazyPicture } from '../components/performance/LazyImage';
import h24Content from '../data/h24-content.json';
import config from '../data/config.json';
import './Sempre24H.css';
const Sempre24H = () => {
const [currentHour, setCurrentHour] = useState(new Date().getHours());
const [activeStory, setActiveStory] = useState(0);
useEffect(() => {
const interval = setInterval(() => {
setCurrentHour(new Date().getHours());
}, 60000);
return () => clearInterval(interval);
}, []);
// Auto-rotate stories
useEffect(() => {
const storyInterval = setInterval(() => {
setActiveStory((prev) =>
(prev + 1) % h24Content.nightStories.stories.length
);
}, 5000);
return () => clearInterval(storyInterval);
}, []);
// Ottieni attività corrente basata sull'ora
const getCurrentActivity = () => {
const hourData = h24Content.timeline.hours.find(h => {
const hour = parseInt(h.time.split(':')[0]);
return hour === currentHour;
});
return hourData || h24Content.timeline.hours[0];
};
const currentActivity = getCurrentActivity();
return (
<>
<MetaTags
     title="Panificio Aperto 24 Ore Milano | Sempre Aperti H24"
     description="L'unico panificio di Milano aperto 24 ore su 24, 360 giorni l'anno. Pane fresco anche alle 3 di notte."
     keywords="panificio 24h, sempre aperto, pane notte milano, panificio notturno"
   />
  {/* Hero Section */}
  <section className="h24-hero">
    <div className="hero-background">
      <LazyPicture
        src="/images/h24/forno-notte.jpg"
        alt="Il forno che non dorme mai"
        priority={true}
        className="hero-image"
      />
      <div className="hero-overlay"></div>
    </div>
    
    <div className="hero-content">
      <div className="container">
        <h1 className="hero-title">
          {h24Content.hero.title}
        </h1>
        <p className="hero-subtitle">
          {h24Content.hero.subtitle}
        </p>
        
        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-number">{h24Content.hero.stats.hoursOpen}</span>
            <span className="stat-label">{h24Content.hero.stats.hoursPerYear}</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{h24Content.hero.stats.nightCustomers}</span>
            <span className="stat-label">{h24Content.hero.stats.nightCustomersLabel}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Timeline 24 Ore */}
  <section className="timeline-section">
    <div className="container">
      <h2 className="section-title">{h24Content.timeline.title}</h2>
      <p className="section-subtitle">{h24Content.timeline.description}</p>
      
      {/* Current Hour Highlight */}
      <div className="current-hour-highlight">
        <div className="current-time">
          <span className="time-display">{currentHour}:00</span>
          <span className="pulse-indicator"></span>
        </div>
        <div className="current-activity">
          <h3>{currentActivity.title}</h3>
          <p>{currentActivity.activity}</p>
          <p className="activity-story">{currentActivity.story}</p>
          {currentActivity.products && (
            <div className="activity-products">
              {currentActivity.products.map((product, i) => (
                <span key={i} className="product-badge">{product}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="timeline-grid">
        {h24Content.timeline.hours.map((hour, index) => {
          const hourNum = parseInt(hour.time.split(':')[0]);
          const isActive = hourNum === currentHour;
          const isNight = hourNum >= 22 || hourNum < 6;
          
          return (
            <div 
              key={index} 
              className={`timeline-item ${isActive ? 'active' : ''} ${isNight ? 'night' : 'day'}`}
            >
              <div className="timeline-time">{hour.time}</div>
              <div className="timeline-content">
                <h4>{hour.title}</h4>
                <p>{hour.activity}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>

  {/* Storie della Notte */}
  <section className="night-stories">
    <div className="container">
      <h2 className="section-title">{h24Content.nightStories.title}</h2>
      <p className="section-subtitle">{h24Content.nightStories.subtitle}</p>
      
      <div className="stories-carousel">
        <div className="stories-container">
          {h24Content.nightStories.stories.map((story, index) => (
            <div 
              key={index}
              className={`story-card ${index === activeStory ? 'active' : ''}`}
            >
              <div className="story-time">{story.time}</div>
              <h3>{story.title}</h3>
              <p className="story-text">{story.story}</p>
              <div className="story-product">
                <span className="product-icon">🍞</span>
                <span>{story.product}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="stories-navigation">
          {h24Content.nightStories.stories.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${index === activeStory ? 'active' : ''}`}
              onClick={() => setActiveStory(index)}
              aria-label={`Storia ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  </section>

  {/* Perché 24 Ore */}
  <section className="why-h24">
    <div className="container">
      <h2 className="section-title">{h24Content.whyH24.title}</h2>
      <p className="section-subtitle">{h24Content.whyH24.subtitle}</p>
      
      <div className="reasons-grid">
        {h24Content.whyH24.reasons.map((reason, index) => (
          <div key={index} className="reason-card">
            <div className="reason-icon">{reason.icon}</div>
            <h3>{reason.title}</h3>
            <p>{reason.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Stats Section */}
  <section className="h24-stats">
    <div className="container">
      <h2 className="section-title">{h24Content.stats.title}</h2>
      
      <div className="stats-grid">
        {h24Content.stats.data.map((stat, index) => (
          <div key={index} className="stat-box">
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Confronto */}
  <section className="comparison">
    <div className="container">
      <h2 className="section-title">{h24Content.comparison.title}</h2>
      
      <div className="comparison-table">
        <div className="comparison-column us">
          <h3>NOI</h3>
          <ul>
            {h24Content.comparison.us.map((item, index) => (
              <li key={index}>
                <span className="check">✅</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="comparison-column others">
          <h3>GLI ALTRI</h3>
          <ul>
            {h24Content.comparison.others.map((item, index) => (
              <li key={index}>
                <span className="cross">❌</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>

  {/* Testimonials */}
  <section className="h24-testimonials">
    <div className="container">
      <h2 className="section-title">Voci dalla Notte</h2>
      
      <div className="testimonials-grid">
        {h24Content.testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <blockquote>"{testimonial.text}"</blockquote>
            <footer>— {testimonial.author}</footer>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* CTA Section */}
  <section className="h24-cta">
    <div className="container">
      <div className="cta-box">
        <h2>{h24Content.cta.title}</h2>
        <p>{h24Content.cta.subtitle}</p>
        
        <div className="current-status">
          <span className="status-icon pulse">🟢</span>
          <span className="status-text">
            Sono le {new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })} 
            e siamo APERTI
          </span>
        </div>
        
        <div className="cta-buttons">
          <a 
            href={`tel:${config.contact.phone.main}`}
            className="btn btn-primary btn-large"
          >
            📞 {h24Content.cta.buttons.call}
          </a>
          <a 
            href={`https://wa.me/${config.contact.whatsapp.number}`}
            className="btn btn-whatsapp btn-large"
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 {h24Content.cta.buttons.whatsapp}
          </a>
          <Link 
            to="/contatti"
            className="btn btn-outline btn-large"
          >
            📍 {h24Content.cta.buttons.directions}
          </Link>
        </div>
        
        <div className="emergency-info">
          <p>{h24Content.cta.emergency}</p>
        </div>
      </div>
    </div>
  </section>

  {/* Fun Facts */}
  <section className="fun-facts">
    <div className="container">
      <h3>Lo Sapevi Che...</h3>
      <div className="facts-grid">
        <div className="fact">
          <span className="fact-icon">🌙</span>
          <p>Il 15% dei nostri clienti viene di notte</p>
        </div>
        <div className="fact">
          <span className="fact-icon">🚕</span>
          <p>Abbiamo 23 tassisti clienti fissi notturni</p>
        </div>
        <div className="fact">
          <span className="fact-icon">🏥</span>
          <p>Serviamo 3 ospedali della zona</p>
        </div>
        <div className="fact">
          <span className="fact-icon">🍞</span>
          <p>Sforniamo 500kg di pane ogni notte</p>
        </div>
      </div>
    </div>
  </section>
</>
);
};
export default Sempre24H;
