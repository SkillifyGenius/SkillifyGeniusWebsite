import React, { useState } from 'react';
import blogData from '../data/blog.json';
import toolsData from '../data/tools.json';
import { ExternalLink, BookOpen, Clock, Calendar } from 'lucide-react';
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogData.map(post => (
              <div key={post.id} className="card blog-card">
                <div className="blog-meta mt-2 mb-4">
                  <span className="blog-tag text-primary bg-light-green">{post.date}</span>
                  <span className="blog-author flex gap-1 items-center text-muted text-sm">
                    <Clock size={14} /> {post.readTime}
                  </span>
                </div>
                <h3 className="mb-2 text-xl">{post.title}</h3>
                <p className="text-muted mb-6 flex-grow">{post.preview}</p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-color text-sm">
                  <span>By {post.author}</span>
                  <button className="text-primary font-semibold flex items-center gap-1 cursor-pointer" style={{background: 'transparent', border: 'none'}} onClick={() => setActiveBlog(post)}>
                    Read Article <ArrowRightIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {toolsData.map(tool => (
              <div key={tool.id} className="card tool-card flex flex-col items-start">
                <div className="tool-icon mb-4">
                  <BookOpen className="text-primary" size={28} />
                </div>
                <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2">{tool.type}</div>
                <h3 className="mb-2 text-2xl">{tool.title}</h3>
                <p className="text-muted mb-6 flex-grow">{tool.description}</p>
                
                <button onClick={() => setActiveTool(tool)} className="btn btn-outline w-full mt-auto">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Modals */}
        <Modal isOpen={!!activeBlog} onClose={() => setActiveBlog(null)}>
          {activeBlog && (
            <>
              <div className="modal-header">
                <span className="blog-tag text-primary bg-light-green inline-block mb-4 px-3 py-1 rounded-full text-sm font-semibold">{activeBlog.date}</span>
                <h2 className="modal-title">{activeBlog.title}</h2>
                <div className="modal-meta mt-2">
                  <span className="flex items-center gap-1"><BookOpen size={16} /> {activeBlog.author}</span>
                  <span className="flex items-center gap-1"><Clock size={16} /> {activeBlog.readTime}</span>
                </div>
              </div>
              
              <div className="modal-body">
                {activeBlog.content ? (
                  activeBlog.content.map((paragraph, i) => (
                    <p key={i} className={`text-lg leading-relaxed mb-4 ${activeBlog.isPremium && i === 0 ? 'p-6 bg-light-green rounded-xl text-center text-primary border border-color my-4 font-bold' : ''}`}>
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-lg leading-relaxed mb-6">{activeBlog.preview}</p>
                )}
              </div>
            </>
          )}
        </Modal>

        <Modal isOpen={!!activeTool} onClose={() => setActiveTool(null)}>
          {activeTool && (
            <>
              <div className="modal-header">
                <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2">{activeTool.type}</div>
                <h2 className="modal-title">{activeTool.title}</h2>
              </div>
              
              <div className="modal-body">
                <p className="text-lg mb-6">{activeTool.description}</p>
                
                {activeTool.reasons && activeTool.reasons.length > 0 && (
                  <div className="bg-base p-4 rounded-xl mb-6">
                    <h4 className="font-semibold mb-2">Why we recommend this:</h4>
                    <ul className="list-disc pl-5 text-muted">
                      {activeTool.reasons.map((reason, i) => (
                        <li key={i} className="mb-2">{reason}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t border-color" style={{ borderTop: '1px solid var(--pk-border)' }}>
                <a href={activeTool.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex-grow text-center justify-center">
                  Visit {activeTool.title}
                  <ExternalLink size={18} className="inline ml-2"/>
                </a>
                <button className="btn btn-outline" onClick={() => setActiveTool(null)}>
                  Close
                </button>
              </div>
            </>
          )}
        </Modal>

      </div>
    </div>
  );
};

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

export default Resources;
