/* ========================================
   GENERATE SITEMAP.JS - I 3 FRATELLI
   Generatore dinamico sitemap.xml
   ======================================== */
import config from '../../data/config.json';
import blogPosts from '../../data/blog-posts.json';
import seoContent from '../../data/seo-content.json';
/**

Genera la sitemap XML per il sito
@returns {string} XML della sitemap
*/
export const generateSitemap = () => {
const baseUrl = config.seo.url || 'https://www.i3fratelli.it';
const currentDate = new Date().toISOString();

// Pagine statiche con priorità e frequenza di aggiornamento
const staticPages = [
{
url: '/',
priority: 1.0,
changefreq: 'daily',
lastmod: currentDate
},
{
url: '/chi-siamo',
priority: 0.8,
changefreq: 'monthly',
lastmod: currentDate
},
{
url: '/prodotti',
priority: 0.9,
changefreq: 'weekly',
lastmod: currentDate
},
{
url: '/b2b',
priority: 0.9,
changefreq: 'weekly',
lastmod: currentDate
},
{
url: '/sempre-24h',
priority: 0.8,
changefreq: 'monthly',
lastmod: currentDate
},
{
url: '/blog',
priority: 0.7,
changefreq: 'daily',
lastmod: currentDate
},
{
url: '/contatti',
priority: 0.8,
changefreq: 'monthly',
lastmod: currentDate
},
{
url: '/privacy',
priority: 0.3,
changefreq: 'yearly',
lastmod: '2025-01-13T00:00:00.000Z'
},
{
url: '/cookie-policy',
priority: 0.3,
changefreq: 'yearly',
lastmod: '2025-01-13T00:00:00.000Z'
}
];
// Aggiungi pagine SEO dinamiche
const seoPages = seoContent.landingPages.map(page => ({
url: /${page.slug},
priority: 0.7,
changefreq: 'weekly',
lastmod: page.lastModified || currentDate
}));
// Aggiungi post del blog
const blogPages = blogPosts.posts.map(post => ({
url: /blog/${post.slug},
priority: 0.6,
changefreq: 'monthly',
lastmod: post.lastModified || post.date
}));
// Combina tutte le pagine
const allPages = [...staticPages, ...seoPages, ...blogPages];
// Genera XML
const xml = <?xml version="1.0" encoding="UTF-8"?> <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"         xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"         xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"> ${allPages.map(page =>   <url>
<loc>baseUrl{baseUrl}
baseUrl{page.url}
</loc>
<lastmod>${page.lastmod}</lastmod>
<changefreq>${page.changefreq}</changefreq>
<priority>${page.priority}</priority>
</url>).join('\n')} </urlset>;
return xml;
};
/**

Genera sitemap per Google News (se abilitato)
@returns {string} XML della news sitemap
*/
export const generateNewsSitemap = () => {
const baseUrl = config.seo.url || 'https://www.i3fratelli.it';

// Filtra solo i post recenti (ultimi 2 giorni)
const twoDaysAgo = new Date();
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
const recentPosts = blogPosts.posts.filter(post => {
const postDate = new Date(post.date);
return postDate > twoDaysAgo;
});
if (recentPosts.length === 0) {
return null;
}
const xml = <?xml version="1.0" encoding="UTF-8"?> <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"         xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"> ${recentPosts.map(post =>   <url>
<loc>baseUrl/blog/{baseUrl}/blog/
baseUrl/blog/{post.slug}
</loc>
news:news
news:publication
news:nameI 3 Fratelli Blog</news:name>
news:languageit</news:language>
</news:publication>
news:publication_date${post.date}</news:publication_date>
news:title${escapeXml(post.title)}</news:title>
news:keywords${post.tags.join(', ')}</news:keywords>
</news:news>
</url>).join('\n')} </urlset>;
return xml;
};
/**

Genera sitemap per immagini
@returns {string} XML della image sitemap
*/
export const generateImageSitemap = () => {
const baseUrl = config.seo.url || 'https://www.i3fratelli.it';

// Raccogli tutte le immagini importanti
const images = [
{
page: '/',
images: [
{
loc: '/images/hero/pane-notte.jpg',
title: 'Panificio I 3 Fratelli - Sempre aperti 24h',
caption: 'Il panificio sempre aperto a Milano'
},
{
loc: '/images/chi-siamo/tre-fratelli.jpg',
title: 'I 3 Fratelli panettieri',
caption: 'Francesco, Giuseppe e Antonio - I fratelli del pane'
}
]
},
{
page: '/prodotti',
images: seoContent.products?.map(product => ({
loc: product.image,
title: product.name,
caption: product.description
})) || []
}
];
const xml = <?xml version="1.0" encoding="UTF-8"?> <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"         xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"> ${images.map(pageImages =>   <url>
<loc>baseUrl{baseUrl}
baseUrl{pageImages.page}
</loc>
${pageImages.images.map(img => <image:image>       <image:loc>${baseUrl}${img.loc}</image:loc>       <image:title>${escapeXml(img.title)}</image:title>       <image:caption>${escapeXml(img.caption)}</image:caption>     </image:image>).join('\n    ')}
</url>).join('\n')} </urlset>;
return xml;
};
/**

Genera l'indice delle sitemap
@returns {string} XML dell'indice sitemap
*/
export const generateSitemapIndex = () => {
const baseUrl = config.seo.url || 'https://www.i3fratelli.it';
const currentDate = new Date().toISOString();

const xml = <?xml version="1.0" encoding="UTF-8"?> <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">   <sitemap>     <loc>${baseUrl}/sitemap.xml</loc>     <lastmod>${currentDate}</lastmod>   </sitemap>   <sitemap>     <loc>${baseUrl}/sitemap-images.xml</loc>     <lastmod>${currentDate}</lastmod>   </sitemap>   <sitemap>     <loc>${baseUrl}/sitemap-news.xml</loc>     <lastmod>${currentDate}</lastmod>   </sitemap> </sitemapindex>;
return xml;
};
/**

Escape caratteri speciali per XML
@param {string} str - Stringa da escapare
@returns {string} Stringa escaped
*/
const escapeXml = (str) => {
if (!str) return '';

const xmlEscapeMap = {
'&': '&',
'<': '<',
'>': '>',
'"': '"',
"'": '''
};
return str.replace(/[&<>"']/g, (char) => xmlEscapeMap[char]);
};
/**

Salva la sitemap su file (per build time)
*/
export const saveSitemapToFile = async () => {
const fs = await import('fs').then(m => m.promises);
const path = await import('path');

const publicDir = path.join(process.cwd(), 'public');
// Genera e salva sitemap principale
const mainSitemap = generateSitemap();
await fs.writeFile(path.join(publicDir, 'sitemap.xml'), mainSitemap);
// Genera e salva image sitemap
const imageSitemap = generateImageSitemap();
await fs.writeFile(path.join(publicDir, 'sitemap-images.xml'), imageSitemap);
// Genera e salva news sitemap se ci sono post recenti
const newsSitemap = generateNewsSitemap();
if (newsSitemap) {
await fs.writeFile(path.join(publicDir, 'sitemap-news.xml'), newsSitemap);
}
// Genera e salva sitemap index
const sitemapIndex = generateSitemapIndex();
await fs.writeFile(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex);
console.log('✅ Sitemaps generate con successo!');
};
export default generateSitemap;
