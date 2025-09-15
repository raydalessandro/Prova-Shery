import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MetaTags from '../components/seo/MetaTags';
import { LazyPicture } from '../components/performance/LazyImage';
import blogPosts from '../data/blog-posts.json';
import config from '../data/config.json';
import './BlogPost.css';
const BlogPost = () => {
const { slug } = useParams();
const navigate = useNavigate();
const [post, setPost] = useState(null);
const [author, setAuthor] = useState(null);
const [category, setCategory] = useState(null);
const [relatedPosts, setRelatedPosts] = useState([]);
useEffect(() => {
// Trova il post
const currentPost = blogPosts.posts.find(p => p.slug === slug);
if (!currentPost) {
  navigate('/404');
  return;
}

setPost(currentPost);

// Trova autore
const postAuthor = blogPosts.authors.find(a => 
  currentPost.author.toLowerCase().includes(a.name.toLowerCase())
);
setAuthor(postAuthor);

// Trova categoria
const postCategory = blogPosts.categories.find(c => c.id === currentPost.category);
setCategory(postCategory);

// Trova post correlati
const related = blogPosts.posts
  .filter(p => 
    p.id !== currentPost.id && 
    (p.category === currentPost.category || 
     p.tags.some(tag => currentPost.tags.includes(tag)))
  )
  .slice(0, 3);
setRelatedPosts(related);

// Scroll to top
window.scrollTo(0, 0);
}, [slug, navigate]);
if (!post) return null;
const formatDate = (dateString) => {
const date = new Date(dateString);
return date.toLocaleDateString('it-IT', {
day: 'numeric',
month: 'long',
year: 'numeric'
});
};
const handleShare = (platform) => {
const url = window.location.href;
const title = post.title;
let shareUrl = '';

switch(platform) {
  case 'facebook':
    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    break;
  case 'twitter':
    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    break;
  case 'whatsapp':
    shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
    break;
  case 'copy':
    navigator.clipboard.writeText(url);
    alert('Link copiato!');
    return;
  default:
    return;
}

window.open(shareUrl, '_blank', 'width=600,height=400');
};
return (
<>
<MetaTags
title={post.title}
description={post.seo?.metaDescription || post.excerpt}
keywords={post.seo?.keywords?.join(', ') || post.tags.join(', ')}
type="article"
image={post.image}
/>
  {/* Article Header */}
  <article className="blog-post">
    <header className="post-header">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/blog">Blog</Link>
          <span>/</span>
          <span>{category?.name}</span>
        </nav>
        
        {/* Category Badge */}
        <div className="post-category-badge">
          <span className="category-icon">{category?.icon}</span>
          <span>{category?.name}</span>
        </div>
        
        {/* Title */}
        <h1 className="post-title">{post.title}</h1>
        
        {/* Meta */}
        <div className="post-meta">
          <div className="meta-left">
            {author && (
              <div className="author-info">
                {author.avatar && (
                  <img 
                    src={author.avatar} 
                    alt={author.name}
                    className="author-avatar"
                  />
                )}
                <div>
                  <span className="author-name">{post.author}</span>
                  <span className="author-role">{author.role}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="meta-right">
            <span className="post-date">📅 {formatDate(post.date)}</span>
            <span className="read-time">📖 {post.readTime}</span>
          </div>
        </div>
      </div>
    </header>

    {/* Featured Image */}
    <div className="post-featured-image">
      <LazyPicture
        src={post.image}
        alt={post.title}
        className="featured-image"
        priority={true}
      />
    </div>

    {/* Content */}
    <div className="post-content">
      <div className="container">
        <div className="content-wrapper">
          {/* Introduction */}
          <div className="post-introduction">
            <p className="lead">{post.content.introduction}</p>
          </div>
          
          {/* Sections */}
          {post.content.sections.map((section, index) => (
            <section key={index} className="content-section">
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </section>
          ))}
          
          {/* Conclusion */}
          <div className="post-conclusion">
            <p>
              <strong>
                Il pane non è solo cibo. È storia, memoria, comunità. 
                E noi siamo qui, sempre, per mantenerla viva.
              </strong>
            </p>
          </div>
          
          {/* Tags */}
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
          
          {/* Share Buttons */}
          <div className="share-section">
            <h3>Condividi questa storia</h3>
            <div className="share-buttons">
              <button 
                onClick={() => handleShare('facebook')}
                className="share-btn facebook"
                aria-label="Condividi su Facebook"
              >
                📘 Facebook
              </button>
              <button 
                onClick={() => handleShare('twitter')}
                className="share-btn twitter"
                aria-label="Condividi su Twitter"
              >
                🐦 Twitter
              </button>
              <button 
                onClick={() => handleShare('whatsapp')}
                className="share-btn whatsapp"
                aria-label="Condividi su WhatsApp"
              >
                💬 WhatsApp
              </button>
              <button 
                onClick={() => handleShare('copy')}
                className="share-btn copy"
                aria-label="Copia link"
              >
                🔗 Copia Link
              </button>
            </div>
          </div>
          
          {/* Author Bio */}
          {author && (
            <div className="author-bio-section">
              <h3>L'Autore</h3>
              <div className="author-bio-card">
                {author.avatar && (
                  <img 
                    src={author.avatar} 
                    alt={author.name}
                    className="bio-avatar"
                  />
                )}
                <div className="bio-content">
                  <h4>{author.name}</h4>
                  <p className="bio-role">{author.role}</p>
                  <p className="bio-text">{author.bio}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Related Posts */}
    {relatedPosts.length > 0 && (
      <section className="related-posts">
        <div className="container">
          <h2 className="section-title">Altre Storie dal Forno</h2>
          
          <div className="related-grid">
            {relatedPosts.map(relatedPost => {
              const relatedCategory = blogPosts.categories.find(c => c.id === relatedPost.category);
              
              return (
                <article key={relatedPost.id} className="related-card">
                  <Link to={`/blog/${relatedPost.slug}`}>
                    <LazyPicture
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="related-image"
                    />
                  </Link>
                  
                  <div className="related-content">
                    <span className="related-category">
                      {relatedCategory?.icon} {relatedCategory?.name}
                    </span>
                    
                    <h3 className="related-title">
                      <Link to={`/blog/${relatedPost.slug}`}>
                        {relatedPost.title}
                      </Link>
                    </h3>
                    
                    <p className="related-excerpt">{relatedPost.excerpt}</p>
                    
                    <div className="related-meta">
                      <span>{formatDate(relatedPost.date)}</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    )}

    {/* CTA Section */}
    <section className="post-cta">
      <div className="container">
        <div className="cta-box">
          <h2>Vieni a Trovarci</h2>
          <p>Le storie sono belle, ma il pane vero è ancora meglio!</p>
          <div className="cta-buttons">
            <Link to="/prodotti" className="btn btn-primary">
              🍞 Scopri i Nostri Pani
            </Link>
            <a 
              href={`https://wa.me/${config.contact.whatsapp.number}`}
              className="btn btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Ordina su WhatsApp
            </a>
          </div>
          <p className="cta-note">
            Siamo sempre aperti, anche ora!
          </p>
        </div>
      </div>
    </section>
  </article>
</>
);
};
export default BlogPost;
