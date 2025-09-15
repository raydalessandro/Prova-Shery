import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import config from '../../data/config.json';
import './BreadcrumbSchema.css';
const BreadcrumbSchema = ({ customPath = null }) => {
const location = useLocation();
const pathSegments = customPath || location.pathname.split('/').filter(Boolean);
// Mapping dei path ai nomi user-friendly
const pathNames = {
'chi-siamo': 'Chi Siamo',
'prodotti': 'Prodotti',
'b2b': 'Per Ristoranti',
'ristoranti': 'Per Ristoranti',
'sempre-24h': 'Servizio 24H',
'blog': 'Blog',
'contatti': 'Contatti',
'privacy': 'Privacy Policy',
'cookie-policy': 'Cookie Policy',
'panificio-aperto-ora': 'Panificio Aperto Ora',
'dove-comprare-pane-notte': 'Pane di Notte',
'emergenza-pane-ristorante': 'Emergenza Ristoranti'
};
// Costruisci breadcrumb items
const breadcrumbItems = [
{
position: 1,
name: 'Home',
item: config.seo.url || 'https://www.i3fratelli.it'
}
];
let currentPath = '';
pathSegments.forEach((segment, index) => {
currentPath += /${segment};
breadcrumbItems.push({
position: index + 2,
name: pathNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
item: ${config.seo.url || 'https://www.i3fratelli.it'}${currentPath}
});
});
// Schema.org JSON-LD
const schemaData = {
"@context": "https://schema.org",
"@type": "BreadcrumbList",
"itemListElement": breadcrumbItems.map(item => ({
"@type": "ListItem",
"position": item.position,
"name": item.name,
"item": item.item
}))
};
// Non mostrare breadcrumb sulla home
if (location.pathname === '/') {
return null;
}
return (
<>
{/* Schema.org JSON-LD */}
<Helmet>
<script type="application/ld+json">
{JSON.stringify(schemaData)}
</script>
</Helmet>
  {/* Visual Breadcrumb */}
  <nav className="breadcrumb" aria-label="Breadcrumb">
    <div className="container">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link">
            <span className="breadcrumb-icon">🏠</span>
            Home
          </Link>
        </li>
        
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const name = pathNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
          
          return (
            <li key={path} className="breadcrumb-item">
              <span className="breadcrumb-separator">/</span>
              {isLast ? (
                <span className="breadcrumb-current" aria-current="page">
                  {name}
                </span>
              ) : (
                <Link to={path} className="breadcrumb-link">
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      
      {/* Quick status */}
      <div className="breadcrumb-status">
        <span className="status-badge">
          <span className="pulse-dot"></span>
          SEMPRE APERTI
        </span>
      </div>
    </div>
  </nav>
</>
);
};
// Componente per breadcrumb personalizzati
export const CustomBreadcrumb = ({ items }) => {
const breadcrumbItems = [
{ name: 'Home', path: '/' },
...items
];
return (
<nav className="breadcrumb custom-breadcrumb" aria-label="Breadcrumb">
<div className="container">
<ol className="breadcrumb-list">
{breadcrumbItems.map((item, index) => {
const isLast = index === breadcrumbItems.length - 1;
        return (
          <li key={item.path || index} className="breadcrumb-item">
            {index > 0 && <span className="breadcrumb-separator">/</span>}
            
            {isLast ? (
              <span className="breadcrumb-current" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link to={item.path} className="breadcrumb-link">
                {index === 0 && <span className="breadcrumb-icon">🏠</span>}
                {item.name}
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  </div>
</nav>
);
};
export default BreadcrumbSchema;
