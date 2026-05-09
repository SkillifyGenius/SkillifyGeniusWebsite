import React, { useState } from 'react';
import { Save, Plus, Trash2, LayoutDashboard, KeyRound, AlertCircle, CheckCircle, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import './BlogAdmin.css';

const REPO_OWNER = 'SkillifyGenius';
const REPO_NAME = 'SkillifyGeniusWebsite';
const FILE_PATH = 'src/data/blog.json';
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

// Helper functions for safe browser base64 encoding/decoding of unicode
const base64ToUtf8 = (base64) => {
  try {
    return new TextDecoder().decode(Uint8Array.from(window.atob(base64), c => c.charCodeAt(0)));
  } catch {
    return decodeURIComponent(escape(window.atob(base64)));
  }
};

const utf8ToBase64 = (str) => {
  try {
    return window.btoa(String.fromCharCode(...new TextEncoder().encode(str)));
  } catch {
    return window.btoa(unescape(encodeURIComponent(str)));
  }
};

// Date converters
const convertToInputDate = (dateStr) => {
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const convertFromInputDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const BlogAdmin = () => {
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [fileSha, setFileSha] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const [expandedPostId, setExpandedPostId] = useState(null);

  // Authentication & Fetch
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!token.trim()) return;

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) throw new Error('Invalid GitHub Token or incorrect permissions.');
        if (response.status === 404) throw new Error('blog.json not found on GitHub. Check repository name/path.');
        throw new Error('GitHub API Error: ' + response.status);
      }

      const data = await response.json();
      setFileSha(data.sha);

      if (data.content) {
        const decodedContent = base64ToUtf8(data.content);
        setBlogs(JSON.parse(decodedContent));
      } else {
        setBlogs([]);
      }

      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  // CRUD Operations
  const handleAddPost = () => {
    const newId = blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    setBlogs([
      {
        id: newId,
        title: 'New Blog Post',
        date: today,
        preview: 'Enter a short preview description...',
        author: 'Skillify Editors',
        readTime: '5 min read',
        content: ['First paragraph of the new blog post.'],
        isPremium: false
      },
      ...blogs
    ]);
    setExpandedPostId(newId);
  };

  const handleDeletePost = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogs(blogs.filter(blog => blog.id !== id));
      if (expandedPostId === id) setExpandedPostId(null);
    }
  };

  const handleUpdateField = (id, field, value) => {
    setBlogs(blogs.map(blog => {
      if (blog.id === id) {
        return { ...blog, [field]: value };
      }
      return blog;
    }));
  };

  const handleUpdateContent = (id, textValue) => {
    const paragraphs = textValue.split('\n').filter(p => p.trim() !== '');
    handleUpdateField(id, 'content', paragraphs);
  };

  const toggleExpand = (id) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  // Save to GitHub
  const handleSaveToLive = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const jsonString = JSON.stringify(blogs, null, 2);
      const encodedContent = utf8ToBase64(jsonString);

      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Update blog posts via Admin panel`,
          content: encodedContent,
          sha: fileSha
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(`Failed to save: ${errData.message || response.statusText}`);
      }

      const data = await response.json();
      setFileSha(data.content.sha); 
      setStatus({ type: 'success', message: 'Successfully saved to live website!' });

      setTimeout(() => {
        setStatus({ type: '', message: '' });
      }, 5000);
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  // --- Auth Screen ---
  if (!isAuthenticated) {
    return (
      <div className="admin-auth-container min-h-screen flex items-center justify-center page-padding bg-light">
        <div className="card max-w-md w-full p-8 shadow-xl border-none">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 ring-8 ring-primary/5">
              <KeyRound size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Blog Manager</h2>
            <p className="text-muted mt-2">Enter your GitHub PAT to securely manage live content.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-group border-none">
              <label className="text-sm font-semibold text-gray-700">Master Password</label>
              <input 
                type="password" 
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxx" 
                required 
                className="w-full bg-gray-50 border-gray-200 focus:bg-white focus:ring-primary focus:border-primary rounded-lg transition-all"
              />
            </div>
            
            {status.message && (
              <div className="p-3 rounded-lg bg-red-50 text-red-700 flex items-center gap-2 text-sm border border-red-100">
                <AlertCircle size={16} />
                {status.message}
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full flex justify-center py-3 text-lg font-medium shadow-md shadow-primary/20" disabled={loading}>
              {loading ? 'Authenticating...' : 'Secure Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Dashboard Screen ---
  return (
    <div className="blog-admin-page">
      
      {/* Action Bar */}
      <div className="admin-header-bar">
        <div className="admin-title">
          <LayoutDashboard size={24} />
          Content Manager
        </div>
        
        <div className="admin-actions">
          {status.message && (
            <span className={`admin-status ${status.type}`}>
              {status.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {status.message}
            </span>
          )}
          <button onClick={handleAddPost} className="admin-btn-outline">
            <Plus size={18} /> New Post
          </button>
          <button onClick={handleSaveToLive} disabled={loading} className="admin-btn-primary">
            <Save size={18} /> {loading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content-area">
        {blogs.length === 0 ? (
          <div className="admin-empty-state">
            <Plus size={32} />
            <h3>No blog posts yet</h3>
            <p>Click "New Post" to create your first article.</p>
          </div>
        ) : (
          blogs.map((blog) => {
            const isExpanded = expandedPostId === blog.id;
            
            return (
              <div key={blog.id} className={`admin-card ${isExpanded ? 'expanded' : ''}`}>
                
                {/* Collapsed Header */}
                <div className="admin-card-header" onClick={() => toggleExpand(blog.id)}>
                  <div className="admin-card-info">
                    <div className="admin-card-meta">
                      <span className="admin-badge id-badge">ID: {blog.id}</span>
                      {blog.isPremium && <span className="admin-badge premium-badge">Premium</span>}
                      <span className="admin-date"><Calendar size={14} /> {blog.date}</span>
                    </div>
                    <h3 className="admin-card-title">{blog.title || 'Untitled Post'}</h3>
                  </div>
                  
                  <div className="admin-card-controls">
                    <button 
                      onClick={(e) => handleDeletePost(blog.id, e)}
                      className="admin-icon-btn delete-btn"
                      title="Delete Post"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="admin-icon-btn expand-btn">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Form Content */}
                {isExpanded && (
                  <div className="admin-card-body">
                    <div className="admin-grid-2">
                      <div className="admin-form-group">
                        <label>Article Title</label>
                        <input type="text" value={blog.title} onChange={(e) => handleUpdateField(blog.id, 'title', e.target.value)} />
                      </div>
                      
                      <div className="admin-form-group">
                        <label>Publish Date</label>
                        <input type="date" value={convertToInputDate(blog.date)} onChange={(e) => handleUpdateField(blog.id, 'date', convertFromInputDate(e.target.value))} />
                      </div>
                      
                      <div className="admin-form-group">
                        <label>Author Name</label>
                        <input type="text" value={blog.author} onChange={(e) => handleUpdateField(blog.id, 'author', e.target.value)} />
                      </div>
                      
                      <div className="admin-form-group">
                        <label>Est. Read Time</label>
                        <input type="text" value={blog.readTime} onChange={(e) => handleUpdateField(blog.id, 'readTime', e.target.value)} />
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label>Preview Summary (Shown on Blog Feed)</label>
                      <input type="text" value={blog.preview} onChange={(e) => handleUpdateField(blog.id, 'preview', e.target.value)} />
                    </div>

                    <div className="admin-premium-toggle">
                      <label>
                        <input type="checkbox" checked={blog.isPremium} onChange={(e) => handleUpdateField(blog.id, 'isPremium', e.target.checked)} />
                        <div>
                          <strong>Lock completely behind Premium Flag</strong>
                          <span>Users will need an account or trial to read the full body</span>
                        </div>
                      </label>
                    </div>

                    <div className="admin-form-group">
                      <label>Article Body (Press Enter for new paragraphs)</label>
                      <textarea 
                        value={blog.content.join('\n\n')} 
                        onChange={(e) => handleUpdateContent(blog.id, e.target.value)}
                        placeholder="Start typing your article here..."
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BlogAdmin;
