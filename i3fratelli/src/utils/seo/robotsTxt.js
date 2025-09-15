/* ========================================
   ROBOTS TXT.JS - I 3 FRATELLI
   Generatore robots.txt dinamico
   ======================================== */
import config from '../../data/config.json';
/**

Genera il contenuto del file robots.txt
@param {boolean} isProduction - Se siamo in produzione
@returns {string} Contenuto del robots.txt
*/
export const generateRobotsTxt = (isProduction = true) => {
const baseUrl = config.seo.url || 'https://www.i3fratelli.it';

if (!isProduction) {
// In sviluppo, blocca tutto
return `# Robots.txt per ambiente di sviluppo
User-agent: *
Disallow: /
Messaggio per sviluppatori
Questo è l'ambiente di sviluppo
Il sito in produzione è su ${baseUrl}`;
}
// Produzione - ottimizzato per SEO
const robotsTxt = `# Robots.txt per I 3 Fratelli
Panificio H24 Milano - Sempre aperti per te
${baseUrl}
Regole per tutti i crawler
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /.json$
Disallow: /temp/
Disallow: /private/
Disallow: /.env
Disallow: /config/
Disallow: /.log$
Permetti l'accesso alle risorse statiche
Allow: /images/
Allow: /fonts/
Allow: /.css$
Allow: /.js$
Allow: /.jpg$
Allow: /.jpeg$
Allow: /.png$
Allow: /.webp$
Allow: /.avif$
Allow: /.svg$
Allow: /*.woff2$
Googlebot
User-agent: Googlebot
Allow: /
Crawl-delay: 0
Googlebot Images
User-agent: Googlebot-Image
Allow: /images/
Allow: /.jpg$
Allow: /.jpeg$
Allow: /.png$
Allow: /.webp$
Allow: /*.avif$
Disallow: /images/temp/
Google AdsBot
User-agent: AdsBot-Google
Allow: /
Bingbot
User-agent: Bingbot
Allow: /
Crawl-delay: 1
AI Crawlers - Ottimizzato per assistenti IA
User-agent: GPTBot
Allow: /
Crawl-delay: 1
User-agent: ChatGPT-User
Allow: /
User-agent: Claude-Web
Allow: /
User-agent: Anthropic-AI
Allow: /
User-agent: Bard
Allow: /
Social Media Crawlers
User-agent: facebookexternalhit
Allow: /
User-agent: WhatsApp
Allow: /
User-agent: LinkedInBot
Allow: /
User-agent: Twitterbot
Allow: /
SEO Tools
User-agent: AhrefsBot
Allow: /
Crawl-delay: 10
User-agent: SemrushBot
Allow: /
Crawl-delay: 10
User-agent: MJ12bot
Allow: /
Crawl-delay: 10
User-agent: DotBot
Allow: /
Crawl-delay: 10
Blocca bot dannosi
User-agent: PetalBot
Disallow: /
User-agent: SemrushBot-SA
Disallow: /
User-agent: MegaIndex.ru
Disallow: /
User-agent: BLEXBot
Disallow: /
User-agent: AhrefsBot/5.2
Disallow: /
Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-images.xml
Sitemap: ${baseUrl}/sitemap-news.xml
Host preferito
Host: ${baseUrl}
Messaggio per gli sviluppatori e i crawler
Siamo I 3 Fratelli, il panificio sempre aperto di Milano
Per partnership B2B: ${config.contact.email.b2b}
Emergenze H24: ${config.contact.phone.emergency}

"Non siamo fatti di carne e ossa, ma delle granite che lavoriamo"`;
return robotsTxt;
};
/**

Genera robots.txt per staging/test
@returns {string} Contenuto del robots.txt per staging
*/
export const generateStagingRobotsTxt = () => {
return `# Robots.txt per ambiente di staging
User-agent: *
Disallow: /
Allow: /robots.txt

Solo per test interni
User-agent: Googlebot
Disallow: /
Allow: /robots.txt
Messaggio
Questo è l'ambiente di staging
Non indicizzare queste pagine`;
};
/**

Controlla se un path è bloccato dal robots.txt
@param {string} path - Path da controllare
@param {string} userAgent - User agent del crawler
@returns {boolean} True se il path è bloccato
/
export const isPathBlocked = (path, userAgent = '') => {
const blockedPatterns = [
/^/admin//,
/^/api//,
/.json$/,
/^/temp//,
/^/private//,
/^/.env/,
/^/config//,
/.log$/
];

// Controlla se il path corrisponde a un pattern bloccato
return blockedPatterns.some(pattern => pattern.test(path));
};
/**

Ottiene il crawl delay per un user agent
@param {string} userAgent - User agent del crawler
@returns {number} Crawl delay in secondi
/
export const getCrawlDelay = (userAgent) => {
const crawlDelays = {
'Googlebot': 0,
'Bingbot': 1,
'GPTBot': 1,
'ChatGPT-User': 1,
'Claude-Web': 1,
'AhrefsBot': 10,
'SemrushBot': 10,
'MJ12bot': 10,
'DotBot': 10,
'': 2 // Default
};

return crawlDelays[userAgent] || crawlDelays['*'];
};
/**

Salva il robots.txt su file (per build time)
*/
export const saveRobotsTxtToFile = async () => {
const fs = await import('fs').then(m => m.promises);
const path = await import('path');

const publicDir = path.join(process.cwd(), 'public');
const isProduction = process.env.NODE_ENV === 'production';
const robotsTxt = generateRobotsTxt(isProduction);
await fs.writeFile(path.join(publicDir, 'robots.txt'), robotsTxt);
console.log(✅ robots.txt generato per ambiente: ${isProduction ? 'PRODUZIONE' : 'SVILUPPO'});
};
export default generateRobotsTxt;
