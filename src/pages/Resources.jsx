import React, { useState } from 'react';
import blogData from '../data/blog.json';
import toolsData from '../data/tools.json';
import { ExternalLink, BookOpen, Clock, ArrowRight, Wrench, CheckCircle2 } from 'lucide-react';
import Modal from '../components/Modal';
import './Resources.css';

const Resources = () => {
  const [activeTab, setActiveTab] = useState('blog');
  const [activeBlog, setActiveBlog] = useState(null);
  const [activeTool, setActiveTool] = useState(null);

  return (
    <div className="resources-page page-padding section-padding">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="section-title">Platform Resources</h1>
          <p className="text-muted text-lg">
            Stay updated with our latest insights on K12 education and access the coding tools we use.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="tabs-wrapper flex justify-center mb-12">
          <div className="tabs">
            <button 
              className={`tab-btn ${activeTab === 'blog' ? 'active' : ''}`}
              onClick={() => setActiveTab('blog')}
            >
              Blog Articles
            </button>
            <button 
              className={`tab-btn ${activeTab === 'tools' ? 'active' : ''}`}
              onClick={() => setActiveTab('tools')}
            >
              Software & Tools
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'blog' && (
          <div className="resource-grid">
            {blogData.map(post => (
              <div key={post.id} className="card blog-card">
                <div className="blog-card-meta">
                  <span className="blog-tag">{post.date}</span>
                  <span className="blog-read-time">
                    <Clock size={14} /> {post.readTime}
                  </span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.preview}</p>
                <div className="blog-card-footer">
                  <span>By {post.author}</span>
                  <button className="resource-link-button" onClick={() => setActiveBlog(post)}>
                    Read Article <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="resource-grid">
            {toolsData.map(tool => (
              <div key={tool.id} className="card tool-card">
                <div className="tool-card-head">
                  <div className="tool-icon">
                    <Wrench className="text-primary" size={26} />
                  </div>
                  <span>{tool.type}</span>
                </div>
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                
                <button onClick={() => setActiveTool(tool)} className="btn btn-outline tool-card-button">
                  View Details <ArrowRight size={17} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Modals */}
        <Modal isOpen={!!activeBlog} onClose={() => setActiveBlog(null)}>
          {activeBlog && (
            <article className="resource-modal blog-modal">
              <header className="resource-modal-header">
                <span className="blog-tag">{activeBlog.date}</span>
                <h2>{activeBlog.title}</h2>
                <div className="resource-modal-meta">
                  <span><BookOpen size={16} /> {activeBlog.author}</span>
                  <span><Clock size={16} /> {activeBlog.readTime}</span>
                </div>
              </header>
              
              <div className="resource-modal-body">
                {activeBlog.content ? (
                  activeBlog.content.map((paragraph, i) => (
                    <p key={i} className={activeBlog.isPremium && i === 0 ? 'premium-note' : ''}>
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p>{activeBlog.preview}</p>
                )}
              </div>
            </article>
          )}
        </Modal>

        <Modal isOpen={!!activeTool} onClose={() => setActiveTool(null)}>
          {activeTool && (
            <article className="resource-modal tool-modal">
              <header className="resource-modal-header">
                <span className="tool-type-pill">{activeTool.type}</span>
                <h2>{activeTool.title}</h2>
              </header>
              
              <div className="resource-modal-body">
                <p className="tool-modal-description">{activeTool.description}</p>
                
                {activeTool.reasons && activeTool.reasons.length > 0 && (
                  <div className="tool-reasons">
                    <h3>Why We Recommend This</h3>
                    <ul>
                      {activeTool.reasons.map((reason, i) => (
                        <li key={i}>
                          <CheckCircle2 size={18} />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="resource-modal-actions">
                <a href={activeTool.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Visit {activeTool.title}
                  <ExternalLink size={18} />
                </a>
                <button className="btn btn-outline" onClick={() => setActiveTool(null)}>
                  Close
                </button>
              </div>
            </article>
          )}
        </Modal>

      </div>
    </div>
  );
};

export default Resources;
