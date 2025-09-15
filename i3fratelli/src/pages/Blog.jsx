import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/seo/MetaTags';
import { LazyPicture } from '../components/performance/LazyImage';
import blogPosts from '../data/blog-posts.json';
import './Blog.css';
const Blog = () => {
const [selectedCategory, setSelectedCategory] = useState('all');
const [searchQuery, setSearchQuery] = useState('');
const [filteredPosts, setFilteredPosts] = useState(blogPosts.posts);
const [featuredPost, setFeaturedPost] = useState(null);
useEffect(() => {
// Trova post in evidenza
const featured = blogPosts.posts.find(post => post.featured);
setFeaturedPost(featured);
// Filtra posts
let filtered = blogPosts.posts;

if (selectedCategory !== 'all') {
  filtered = filtered.filter(post => post.category === selectedCategory);
}

if (searchQuery) {
  filtered = filtered.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
}

setFilteredPosts(filtered);
}, [selectedCategory, searchQuery]);
const formatDate = (dateString) => {
const date = new Date(dateString);
return date.toLocaleDateString('it-IT', {
day: 'numeric',
month: 'long',
year: 'numeric'
});
};
const getAuthor = (authorId) => {
const author = blogPosts.authors.find(a => a.id === authorId);
return author || blogPosts.authors[0];
};
return (
<>
<MetaTags
     title="Blog | Storie dal Forno che Non Dorme"
     description="Storie notturne, ricette con lievito madre, consigli per ristoratori. Dal panificio H24 di Milano."
     keywords="blog panificio, storie notturne, ricette pane, lievito madre, consigli ristoratori"
   />
  {/* Hero Section */}
  <section className="blog-hero">
    <div className="container">
      <h1 className="hero-title">Storie dal Forno che Non Dorme</h1>
      <p className="hero-subtitle">
        Racconti notturni, segreti del lievito madre, vita di panificio
      </p>
    </div>
  </section>

  {/* Search and Filters */}
  <section className="blog-filters">
    <div className="container">
      <div className="filters-wrapper">
        <div className="search-box">
          <input
            type="text"
            placeholder="Cerca articoli..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="category-filters">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            Tutti ({blogPosts.posts.length})
          </button>
          
          {blogPosts.categories.map(category => {
            const count = blogPosts.posts.filter(p => p.category === category.id).length;
            return (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                {category.name} ({count})
              </button>
            );
          })}
        </div>
      </div>
    </div>
  </section>

  {/* Featured Post */}
  {featuredPost && selectedCategory === 'all' && !searchQuery && (
    <section className="featured-post">
      <div className="container">
        <div className="featured-card">
          <div className="featured-image">
            <LazyPicture
              src={featuredPost.image}
              alt={featuredPost.title}
              className="featured-img"
            />
            <span className="featured-badge">⭐ In Evidenza</span>
          </div>
          
          <div className="featured-content">
            <div className="post-meta">
              <span className="post-category">
                {blogPosts.categories.find(c => c.id === featuredPost.category)?.name}
              </span>
              <span className="post-date">{formatDate(featuredPost.date)}</span>
              <span className="post-read-time">📖 {featuredPost.readTime}</span>
            </div>
            
            <h2 className="featured-title">
              <Link to={`/blog/${featuredPost.slug}`}>
                {featuredPost.title}
              </Link>
            </h2>
            
            <p className="featured-excerpt">{featuredPost.excerpt}</p>
            
            <div className="featured-footer">
              <div className="post-author">
                <span>Di {featuredPost.author}</span>
              </div>
              
              <Link to={`/blog/${featuredPost.slug}`} className="read-more">
                Leggi tutto →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )}

  {/* Posts Grid */}
  <section className="posts-grid-section">
    <div className="container">
      {filteredPosts.length === 0 ? (
        <div className="no-posts">
          <p>Nessun articolo trovato</p>
          <button 
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="btn btn-outline"
          >
            Mostra tutti gli articoli
          </button>
        </div>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map(post => {
            const author = getAuthor(post.author);
            const category = blogPosts.categories.find(c => c.id === post.category);
            
            return (
              <article key={post.id} className="post-card">
                <Link to={`/blog/${post.slug}`} className="post-image-link">
                  <LazyPicture
                    src={post.image}
                    alt={post.title}
                    className="post-image"
                  />
                </Link>
                
                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-category">
                      {category?.icon} {category?.name}
                    </span>
                    <span className="post-date">{formatDate(post.date)}</span>
                  </div>
                  
                  <h3 className="post-title">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="post-excerpt">{post.excerpt}</p>
                  
                  <div className="post-tags">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="post-footer">
                    <div className="post-author">
                      <span>{author.name}</span>
                      <span className="author-role">{author.role}</span>
                    </div>
                    
                    <span className="read-time">
                      📖 {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  </section>

  {/* Authors Section */}
  <section className="authors-section">
    <div className="container">
      <h2 className="section-title">I Nostri Autori</h2>
      <p className="section-subtitle">Le voci dal forno</p>
      
      <div className="authors-grid">
        {blogPosts.authors.map(author => (
          <div key={author.id} className="author-card">
            {author.avatar && (
              <LazyPicture
                src={author.avatar}
                alt={author.name}
                className="author-avatar"
              />
            )}
            <h3>{author.name}</h3>
            <p className="author-role">{author.role}</p>
            <p className="author-bio">{author.bio}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Newsletter CTA */}
  <section className="newsletter-cta">
    <div className="container">
      <div className="newsletter-box">
        <h2>Non Perderti le Storie della Notte</h2>
        <p>Ricevi le nostre storie, ricette e news direttamente nella tua email</p>
        
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="La tua email"
            required
            className="newsletter-input"
          />
          <button type="submit" className="btn btn-primary">
            Iscriviti
          </button>
        </form>
        
        <p className="newsletter-note">
          📧 Una volta a settimana, niente spam, solo storie vere
        </p>
      </div>
    </div>
  </section>
</>
);
};
export default Blog;
