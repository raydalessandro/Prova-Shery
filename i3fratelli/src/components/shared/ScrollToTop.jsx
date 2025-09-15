import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ScrollToTop.css';
// Componente per scrollare in alto al cambio di route
const ScrollToTop = () => {
const { pathname } = useLocation();
useEffect(() => {
window.scrollTo({
top: 0,
left: 0,
behavior: 'instant' // Instant per cambio pagina
});
}, [pathname]);
return null;
};
// Bottone per tornare in alto
export const ScrollToTopButton = () => {
const [isVisible, setIsVisible] = useState(false);
const [scrollProgress, setScrollProgress] = useState(0);
useEffect(() => {
// Funzione per gestire lo scroll
const handleScroll = () => {
const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  // Mostra il bottone dopo 300px di scroll
  setIsVisible(scrollTop > 300);
  
  // Calcola la percentuale di scroll
  const progress = (scrollTop / scrollHeight) * 100;
  setScrollProgress(progress);
};

// Aggiungi listener con throttling
let ticking = false;
const scrollListener = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
};

window.addEventListener('scroll', scrollListener);

// Cleanup
return () => window.removeEventListener('scroll', scrollListener);
}, []);
const scrollToTop = () => {
window.scrollTo({
top: 0,
behavior: 'smooth'
});
// Track evento
if (window.gtag) {
  window.gtag('event', 'scroll_to_top', {
    event_category: 'engagement',
    page_path: window.location.pathname
  });
}
};
// Non mostrare se non visibile
if (!isVisible) return null;
return (
<button
   className="scroll-to-top"
   onClick={scrollToTop}
   aria-label="Torna su"
   title="Torna su"
 >
{/* Progress circle */}
<svg className="progress-circle" width="50" height="50">
<circle
       className="progress-circle-bg"
       cx="25"
       cy="25"
       r="20"
       strokeWidth="3"
       fill="none"
     />
<circle
className="progress-circle-fill"
cx="25"
cy="25"
r="20"
strokeWidth="3"
fill="none"
strokeDasharray={${2 * Math.PI * 20}}
strokeDashoffset={${2 * Math.PI * 20 * (1 - scrollProgress / 100)}}
transform="rotate(-90 25 25)"
/>
</svg>
  {/* Arrow icon */}
  <span className="arrow-up">↑</span>
</button>
);
};
// Hook per rilevare la direzione dello scroll
export const useScrollDirection = () => {
const [scrollDirection, setScrollDirection] = useState('up');
const [lastScrollY, setLastScrollY] = useState(0);
useEffect(() => {
const handleScroll = () => {
const currentScrollY = window.pageYOffset;
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    setScrollDirection('down');
  } else if (currentScrollY < lastScrollY) {
    setScrollDirection('up');
  }
  
  setLastScrollY(currentScrollY);
};

// Throttle scroll event
let ticking = false;
const scrollListener = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
};

window.addEventListener('scroll', scrollListener);

return () => window.removeEventListener('scroll', scrollListener);
}, [lastScrollY]);
return scrollDirection;
};
// Hook per rilevare quando un elemento entra nel viewport
export const useIntersectionObserver = (
ref,
options = {
threshold: 0.1,
rootMargin: '0px'
}
) => {
const [isIntersecting, setIsIntersecting] = useState(false);
const [hasIntersected, setHasIntersected] = useState(false);
useEffect(() => {
const observer = new IntersectionObserver(([entry]) => {
setIsIntersecting(entry.isIntersecting);
  // Track se l'elemento è mai entrato nel viewport
  if (entry.isIntersecting && !hasIntersected) {
    setHasIntersected(true);
  }
}, options);

const currentRef = ref.current;
if (currentRef) {
  observer.observe(currentRef);
}

return () => {
  if (currentRef) {
    observer.unobserve(currentRef);
  }
};
}, [ref, options, hasIntersected]);
return { isIntersecting, hasIntersected };
};
// Componente per animazioni on scroll
export const ScrollAnimation = ({
children,
animation = 'fadeIn',
duration = 0.6,
delay = 0,
threshold = 0.1
}) => {
const [isVisible, setIsVisible] = useState(false);
const elementRef = React.useRef(null);
useEffect(() => {
const observer = new IntersectionObserver(
([entry]) => {
if (entry.isIntersecting) {
setTimeout(() => {
setIsVisible(true);
}, delay * 1000);
      // Unobserve dopo l'animazione
      observer.unobserve(entry.target);
    }
  },
  { threshold }
);

if (elementRef.current) {
  observer.observe(elementRef.current);
}

return () => {
  if (elementRef.current) {
    observer.unobserve(elementRef.current);
  }
};
}, [delay, threshold]);
return (
<div
ref={elementRef}
className={scroll-animation ${animation} ${isVisible ? 'visible' : ''}}
style={{
animationDuration: ${duration}s,
animationDelay: ${delay}s
}}
>
{children}
</div>
);
};
export default ScrollToTop;
