import React from 'react';
import './Loading.css';
const Loading = ({
fullScreen = false,
size = 'medium',
message = null,
showLogo = true
}) => {
// Messaggi casuali per il loading
const loadingMessages = [
"Il forno si sta scaldando...",
"Impastiamo il tuo ordine...",
"Il lievito sta facendo la sua magia...",
"Sforniamo qualcosa di buono...",
"Prepariamo il pane fresco...",
"Un attimo, stiamo lievitando...",
"Il profumo sta arrivando..."
];
// Seleziona un messaggio casuale se non ne viene fornito uno
const displayMessage = message || loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
// Determina le classi CSS basate sulle props
const containerClass = loading-container ${fullScreen ? 'fullscreen' : ''} ${size};
if (fullScreen) {
return (
<div className={containerClass}>
<div className="loading-content">
{showLogo && (
<div className="loading-logo">
<span className="logo-icon">🍞</span>
<h2 className="logo-text">I 3 Fratelli</h2>
</div>
)}
      <div className="loading-animation">
        <div className="bread-loader">
          <div className="bread-slice"></div>
          <div className="bread-slice"></div>
          <div className="bread-slice"></div>
        </div>
      </div>
      
      <p className="loading-message">{displayMessage}</p>
      
      <div className="loading-dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  </div>
);
}
// Loading inline/component
return (
<div className={containerClass}>
<div className="loading-spinner">
<div className="spinner-ring">
<div></div>
<div></div>
<div></div>
<div></div>
</div>
</div>
{displayMessage && (
<p className="loading-text">{displayMessage}</p>
)}
</div>
);
};
// Skeleton loader per contenuti
export const SkeletonLoader = ({
type = 'text',
width = '100%',
height = '20px',
count = 1,
className = ''
}) => {
const renderSkeleton = () => {
switch(type) {
case 'card':
return (
<div className="skeleton-card">
<div className="skeleton-image"></div>
<div className="skeleton-content">
<div className="skeleton-title"></div>
<div className="skeleton-text"></div>
<div className="skeleton-text"></div>
<div className="skeleton-button"></div>
</div>
</div>
);
  case 'product':
    return (
      <div className="skeleton-product">
        <div className="skeleton-product-image"></div>
        <div className="skeleton-product-info">
          <div className="skeleton-product-title"></div>
          <div className="skeleton-product-price"></div>
          <div className="skeleton-product-description">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>
        </div>
      </div>
    );
  
  case 'blog':
    return (
      <div className="skeleton-blog">
        <div className="skeleton-blog-image"></div>
        <div className="skeleton-blog-content">
          <div className="skeleton-blog-meta"></div>
          <div className="skeleton-blog-title"></div>
          <div className="skeleton-blog-excerpt">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>
        </div>
      </div>
    );
  
  case 'text':
  default:
    return (
      <div 
        className="skeleton-text"
        style={{ width, height }}
      ></div>
    );
}
};
return (
<div className={skeleton-loader ${className}}>
{Array.from({ length: count }).map((_, index) => (
<div key={index} className="skeleton-item">
{renderSkeleton()}
</div>
))}
</div>
);
};
// Componente per lazy loading con placeholder
export const LoadingPlaceholder = ({ children, isLoading }) => {
if (isLoading) {
return <Loading size="small" />;
}
return children;
};
export default Loading;
