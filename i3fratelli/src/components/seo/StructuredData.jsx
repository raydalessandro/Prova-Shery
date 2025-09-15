import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import config from '../../data/config.json';
import prodotti from '../../data/prodotti.json';
const StructuredData = ({ page }) => {
const location = useLocation();
const currentPage = page || location.pathname;
// Schema base per Bakery/LocalBusiness
const baseSchema = {
"@context": "https://schema.org",
"@type": ["Bakery", "LocalBusiness"],
"@id": ${config.seo.url}#bakery,
"name": config.brand.name,
"description": config.brand.description,
"url": config.seo.url,
"logo": ${config.seo.url}/images/logo.png,
"image": ${config.seo.url}/images/hero-panificio.jpg,
"telephone": config.contact.phone.main,
"email": config.contact.email.info,
"address": {
"@type": "PostalAddress",
"streetAddress": config.contact.address.street,
"addressLocality": config.contact.address.city,
"addressRegion": "MI",
"postalCode": config.contact.address.cap,
"addressCountry": "IT"
},
"geo": {
"@type": "GeoCoordinates",
"latitude": config.contact.address.coordinates.lat,
"longitude": config.contact.address.coordinates.lng
},
"openingHoursSpecification": {
"@type": "OpeningHoursSpecification",
"dayOfWeek": [
"Monday", "Tuesday", "Wednesday", "Thursday",
"Friday", "Saturday", "Sunday"
],
"opens": "00:00",
"closes": "23:59"
},
"priceRange": "€",
"servesCuisine": "Italian Bakery",
"acceptsReservations": false,
"hasMenu": ${config.seo.url}/prodotti,
"aggregateRating": {
"@type": "AggregateRating",
"ratingValue": config.testimonials.googleRating,
"reviewCount": config.testimonials.googleReviews
},
"amenityFeature": [
{
"@type": "LocationFeatureSpecification",
"name": "24 Hours Service",
"value": true
},
{
"@type": "LocationFeatureSpecification",
"name": "Emergency Service",
"value": true
},
{
"@type": "LocationFeatureSpecification",
"name": "Night Delivery",
"value": true
}
],
"sameAs": [
config.social.facebook,
config.social.instagram,
config.social.tiktok,
config.social.googleBusiness
]
};
// Schema per BreadcrumbList
const breadcrumbSchema = {
"@context": "https://schema.org",
"@type": "BreadcrumbList",
"itemListElement": getBreadcrumbs(currentPage)
};
// Schema specifici per pagina
const getPageSpecificSchema = () => {
switch(currentPage) {
case '/':
return {
...baseSchema,
"@type": ["Bakery", "LocalBusiness", "EmergencyService"],
"additionalType": "24HourService",
"slogan": config.brand.tagline,
"foundingDate": "2019",
"specialty": "Panificio H24 con servizio emergenza"
};
  case '/prodotti':
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Catalogo Prodotti I 3 Fratelli",
      "description": "Pane artigianale con lievito madre, disponibile 24/7",
      "numberOfItems": prodotti.products.length,
      "itemListElement": prodotti.products.slice(0, 10).map((product, index) => ({
        "@type": "Product",
        "position": index + 1,
        "name": product.name,
        "description": product.description,
        "image": `${config.seo.url}${product.image}`,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "availableDeliveryMethod": "https://schema.org/OnSitePickup"
        }
      }))
    };

  case '/b2b':
  case '/ristoranti':
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Forniture Pane H24 per Ristoranti",
      "description": "Servizio 24/7 per ristoranti con consegne notturne ed emergenze",
      "provider": baseSchema,
      "serviceType": "B2B Bakery Supply",
      "areaServed": {
        "@type": "City",
        "name": "Milano"
      },
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "offers": {
        "@type": "AggregateOffer",
        "offerCount": "50+",
        "eligibleRegion": "Milano",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": "30",
          "priceCurrency": "EUR"
        }
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Catalogo B2B",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Burger Bun Professional"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Pane per Ristoranti"
            }
          }
        ]
      }
    };

  case '/sempre-24h':
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Siete davvero aperti 24 ore su 24?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sì, siamo sempre aperti 24/7, 360 giorni l'anno. Chiudiamo solo poche ore per Natale e Capodanno."
          }
        },
        {
          "@type": "Question",
          "name": "Fate consegne di notte?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Certamente! Consegniamo 24/7, perfetto per ristoranti e emergenze notturne."
          }
        }
      ]
    };

  case '/chi-siamo':
    return {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "Chi Siamo - I 3 Fratelli",
      "description": "La storia dei 3 fratelli che hanno aperto l'unico panificio H24 di Milano",
      "mainEntity": {
        "@type": "Organization",
        ...baseSchema,
        "founder": [
          {
            "@type": "Person",
            "name": "Francesco",
            "jobTitle": "Il Fratello Maggiore"
          },
          {
            "@type": "Person",
            "name": "Giuseppe",
            "jobTitle": "Il Fratello di Mezzo"
          },
          {
            "@type": "Person",
            "name": "Antonio",
            "jobTitle": "Il Fratello Minore"
          }
        ]
      }
    };

  case '/contatti':
    return {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contatti I 3 Fratelli",
      "description": "Siamo sempre aperti! Contattaci 24/7",
      "mainEntity": baseSchema
    };

  default:
    return baseSchema;
}
};
function getBreadcrumbs(path) {
const pathSegments = path.split('/').filter(Boolean);
const breadcrumbs = [
{
"@type": "ListItem",
"position": 1,
"name": "Home",
"item": config.seo.url
}
];
let currentPath = '';
pathSegments.forEach((segment, index) => {
  currentPath += `/${segment}`;
  const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
  
  breadcrumbs.push({
    "@type": "ListItem",
    "position": index + 2,
    "name": name,
    "item": `${config.seo.url}${currentPath}`
  });
});

return breadcrumbs;
}
// WebSite schema con search
const websiteSchema = {
"@context": "https://schema.org",
"@type": "WebSite",
"url": config.seo.url,
"name": config.brand.name,
"description": config.brand.description,
"potentialAction": {
"@type": "SearchAction",
"target": ${config.seo.url}/search?q={search_term_string},
"query-input": "required name=search_term_string"
}
};
// Combina tutti gli schema
const schemas = [
getPageSpecificSchema(),
breadcrumbSchema,
websiteSchema
];
return (
<Helmet>
{schemas.map((schema, index) => (
<script
key={index}
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
))}
</Helmet>
);
};
export default StructuredData;
