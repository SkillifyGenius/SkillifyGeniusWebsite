import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Archive,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Database,
  Download,
  Eye,
  FileJson,
  KeyRound,
  LayoutDashboard,
  Loader2,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  Trash2,
  Upload
} from 'lucide-react';
import './Admin.css';

const REPO_URL = import.meta.env.VITE_GITHUB_REPO_URL || '';
const DRAFT_KEY = 'skillifygenius-admin-drafts';

const parseRepoUrl = (url) => {
  const match = url.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
  if (!match) return { owner: 'SkillifyGenius', name: 'SkillifyGeniusWebsite', branch: '' };
  return { owner: match[1], name: match[2].replace(/\.git$/, ''), branch: '' };
};

const DATASETS = {
  offerBanner: {
    label: 'Offer Banner',
    path: 'src/data/offerBanner.json',
    description: 'Homepage promotional banner and CTA.',
    accent: '#e11d48',
    required: ['title', 'ctaText', 'ctaLink'],
    fields: [
      { key: 'enabled', label: 'Show Banner', type: 'boolean' },
      { key: 'eyebrow', label: 'Small Label' },
      { key: 'title', label: 'Headline', type: 'textarea' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'ctaText', label: 'Button Text' },
      { key: 'ctaLink', label: 'Button Link' },
      { key: 'note', label: 'Small Note' }
    ],
    createItem: (id) => ({
      id,
      enabled: true,
      eyebrow: 'Limited Time Offer',
      title: 'New homepage offer',
      description: 'Describe the offer shown on the homepage.',
      ctaText: 'Claim Offer',
      ctaLink: '/trial',
      note: 'No commitment required'
    })
  },
  courses: {
    label: 'Courses',
    path: 'src/data/courses.json',
    description: 'Curriculum phases, duration, modules, and outcomes.',
    accent: '#0d9488',
    required: ['title', 'duration', 'description'],
    fields: [
      { key: 'phase', label: 'Phase' },
      { key: 'title', label: 'Course' },
      { key: 'ageGroup', label: 'Age Group' },
      { key: 'level', label: 'Level' },
      { key: 'duration', label: 'Duration' },
      { key: 'classFrequency', label: 'Class Frequency' },
      { key: 'category', label: 'Category' },
      { key: 'image', label: 'Image Path' },
      { key: 'description', label: 'Short Description', type: 'textarea' },
      { key: 'goal', label: 'Goal', type: 'textarea' },
      { key: 'modules', label: 'Modules', type: 'textarea' },
      { key: 'primaryOutcome', label: 'Primary Outcome', type: 'textarea' },
      { key: 'overview', label: 'Final Outcome / Overview', type: 'textarea' }
    ],
    createItem: (id) => ({
      id,
      phase: `Phase ${id}`,
      title: 'New Course',
      ageGroup: 'Ages 10-18',
      level: 'Foundation',
      description: 'Short course description.',
      duration: '8 weeks / approx. 2 months',
      classFrequency: '2 classes weekly + optional lab',
      sessions: '2 classes weekly + optional lab',
      image: '/images/course_foundation_3d.png',
      category: `Phase ${id}`,
      goal: 'Course goal.',
      modules: 'Module 1; Module 2; Module 3.',
      primaryOutcome: 'Primary student outcome.',
      overview: 'Final outcome description.'
    })
  },
  blogs: {
    label: 'Blogs',
    path: 'src/data/blog.json',
    description: 'Resource articles and premium article flags.',
    accent: '#2563eb',
    required: ['title', 'preview'],
    fields: [
      { key: 'title', label: 'Title' },
      { key: 'date', label: 'Date' },
      { key: 'author', label: 'Author' },
      { key: 'readTime', label: 'Read Time' },
      { key: 'preview', label: 'Preview', type: 'textarea' },
      { key: 'content', label: 'Article Body', type: 'array' },
      { key: 'isPremium', label: 'Premium Article', type: 'boolean' }
    ],
    createItem: (id) => ({
      id,
      title: 'New Blog Post',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      preview: 'Short article preview.',
      author: 'Skillify Editors',
      readTime: '5 min read',
      content: ['First paragraph of the article.'],
      isPremium: false
    })
  },
  tools: {
    label: 'Software & Tools',
    path: 'src/data/tools.json',
    description: 'Recommended software shown in Resources.',
    accent: '#7c3aed',
    required: ['title', 'link'],
    fields: [
      { key: 'title', label: 'Title' },
      { key: 'type', label: 'Type' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'link', label: 'Link' },
      { key: 'reasons', label: 'Recommendation Reasons', type: 'array' }
    ],
    createItem: (id) => ({
      id,
      title: 'New Tool',
      type: 'Learning Platform',
      description: 'Describe why this tool is useful.',
      link: 'https://example.com',
      reasons: ['Reason one', 'Reason two']
    })
  },
  reviews: {
    label: 'Parent & Student Reviews',
    path: 'src/data/reviews.json',
    description: 'Testimonials shown in the homepage carousel.',
    accent: '#f59e0b',
    required: ['name', 'text'],
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'text', label: 'Review Text', type: 'textarea' },
      { key: 'rating', label: 'Rating', type: 'number' }
    ],
    createItem: (id) => ({
      id,
      name: 'New Reviewer',
      role: 'Parent',
      text: 'Write the testimonial here.',
      rating: 5
    })
  }
};

const encodeBase64 = (value) => {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return window.btoa(binary);
};

const decodeBase64 = (value) => {
  const binary = window.atob(value.replace(/\n/g, ''));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

const cloneJson = (value) => JSON.parse(JSON.stringify(value));
const formatJson = (value) => JSON.stringify(value, null, 2);

const getNextId = (items) => {
  if (!items.length) return 1;
  return Math.max(...items.map((item) => Number(item.id) || 0)) + 1;
};

const makeArchivePath = (key, filePath) => {
  const filename = filePath.split('/').pop();
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `archive/${key}/${stamp}-${filename}`;
};

const getItemTitle = (item) => item.title || item.name || `Item ${item.id}`;

const isEmptyValue = (value) => {
  if (Array.isArray(value)) return value.length === 0 || value.every((entry) => !String(entry).trim());
  return value === undefined || value === null || String(value).trim() === '';
};

const validateDataset = (key, items) => {
  const config = DATASETS[key];
  const issues = [];

  items.forEach((item, index) => {
    config.required?.forEach((field) => {
      if (isEmptyValue(item[field])) {
        const label = config.fields.find((candidate) => candidate.key === field)?.label || field;
        issues.push(`${getItemTitle(item)}: ${label} is required`);
      }
    });

    if (key === 'reviews' && (Number(item.rating) < 1 || Number(item.rating) > 5)) {
      issues.push(`${getItemTitle(item)}: Rating must be between 1 and 5`);
    }

    if (key === 'tools' && item.link && !/^https?:\/\//i.test(item.link)) {
      issues.push(`${getItemTitle(item)}: Link should start with http:// or https://`);
    }

    if (key === 'offerBanner' && item.ctaLink && !/^\/|https?:\/\//i.test(item.ctaLink)) {
      issues.push(`${getItemTitle(item)}: Button Link should start with /, http://, or https://`);
    }

    if (!item.id) {
      issues.push(`Row ${index + 1}: ID is missing`);
    }
  });

  return issues;
};

const matchesSearch = (item, query) => {
  if (!query.trim()) return true;
  const haystack = [item.title, item.name, item.phase, item.type, item.role, item.description, item.preview]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
};

const Admin = () => {
  const [repo] = useState(parseRepoUrl(REPO_URL));
  const [token, setToken] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [activeKey, setActiveKey] = useState('courses');
  const [expandedId, setExpandedId] = useState(null);
  const [datasets, setDatasets] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [search, setSearch] = useState('');
  const [previewItem, setPreviewItem] = useState(null);
  const [archives, setArchives] = useState({});
  const [showArchives, setShowArchives] = useState(false);
  const fileInputRef = useRef(null);

  const activeConfig = DATASETS[activeKey];
  const activeData = datasets[activeKey]?.items || [];
  const filteredData = activeData.filter((item) => matchesSearch(item, search));
  const activeIssues = validateDataset(activeKey, activeData);

  const stats = useMemo(() => {
    return Object.entries(DATASETS).map(([key, config]) => {
      const state = datasets[key];
      const dirty = state ? formatJson(state.items) !== formatJson(state.original) : false;
      return { key, label: config.label, count: state?.items?.length || 0, dirty };
    });
  }, [datasets]);

  useEffect(() => {
    if (!isReady || !Object.keys(datasets).length) return;
    const hasDraftChanges = Object.values(datasets).some((state) => formatJson(state.items) !== formatJson(state.original));
    if (!hasDraftChanges) {
      window.localStorage.removeItem(DRAFT_KEY);
      return;
    }
    const draftPayload = Object.fromEntries(
      Object.entries(datasets).map(([key, state]) => [key, state.items])
    );
    window.localStorage.setItem(DRAFT_KEY, formatJson(draftPayload));
  }, [datasets, isReady]);

  const githubRequest = async (path, options = {}) => {
    const readBranch = repo.branch && options.method !== 'PUT' ? `?ref=${encodeURIComponent(repo.branch)}` : '';
    const response = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}/contents/${path}${readBranch}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...(options.headers || {})
      }
    });

    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.message || `GitHub request failed with ${response.status}`);
    return body;
  };

  const fetchDataset = async (key) => {
    const config = DATASETS[key];
    const response = await githubRequest(config.path);
    const parsed = response.content ? JSON.parse(decodeBase64(response.content)) : [];
    return { items: parsed, original: cloneJson(parsed), sha: response.sha };
  };

  const loadAllData = async (event) => {
    event?.preventDefault();
    if (!token.trim() || !repo.owner.trim() || !repo.name.trim()) return;

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const entries = await Promise.all(Object.keys(DATASETS).map(async (key) => [key, await fetchDataset(key)]));
      const nextDatasets = Object.fromEntries(entries);
      const savedDrafts = JSON.parse(window.localStorage.getItem(DRAFT_KEY) || '{}');
      Object.keys(nextDatasets).forEach((key) => {
        if (Array.isArray(savedDrafts[key])) {
          nextDatasets[key].items = savedDrafts[key];
        }
      });
      setDatasets(nextDatasets);
      setIsReady(true);
      setExpandedId(null);
      setStatus({
        type: 'success',
        message: Object.keys(savedDrafts).length ? 'Content loaded. Local drafts were restored.' : 'Content loaded from GitHub.'
      });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const updateDataset = (key, updater) => {
    setDatasets((current) => ({
      ...current,
      [key]: {
        ...current[key],
        items: updater(current[key]?.items || [])
      }
    }));
  };

  const resetLocalDrafts = () => {
    if (!window.confirm('Clear local draft edits and reload the latest GitHub content?')) return;
    window.localStorage.removeItem(DRAFT_KEY);
    loadAllData();
  };

  const logout = () => {
    setToken('');
    setIsReady(false);
    setDatasets({});
    setArchives({});
    setExpandedId(null);
    setSearch('');
    setStatus({ type: '', message: '' });
  };

  const updateItem = (id, field, value) => {
    updateDataset(activeKey, (items) =>
      items.map((item) => {
        if (item.id !== id) return item;
        const nextItem = { ...item, [field]: value };
        if (field === 'classFrequency') nextItem.sessions = value;
        return nextItem;
      })
    );
  };

  const addItem = () => {
    const nextId = getNextId(activeData);
    updateDataset(activeKey, (items) => [activeConfig.createItem(nextId), ...items]);
    setExpandedId(nextId);
  };

  const deleteItem = (id) => {
    if (!window.confirm('Delete this item from the current draft?')) return;
    updateDataset(activeKey, (items) => items.filter((item) => item.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const duplicateItem = (item) => {
    const nextId = getNextId(activeData);
    updateDataset(activeKey, (items) => [{ ...cloneJson(item), id: nextId, title: `${item.title || item.name} Copy` }, ...items]);
    setExpandedId(nextId);
  };

  const moveItem = (id, direction) => {
    updateDataset(activeKey, (items) => {
      const index = items.findIndex((item) => item.id === id);
      const targetIndex = index + direction;
      if (index < 0 || targetIndex < 0 || targetIndex >= items.length) return items;
      const nextItems = [...items];
      [nextItems[index], nextItems[targetIndex]] = [nextItems[targetIndex], nextItems[index]];
      return nextItems;
    });
  };

  const importJson = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const importedItems = Array.isArray(parsed) ? parsed : parsed[activeKey];
      if (!Array.isArray(importedItems)) {
        throw new Error('Imported file must be a JSON array or a backup object containing this dataset.');
      }
      updateDataset(activeKey, () => importedItems);
      setStatus({ type: 'success', message: `${activeConfig.label} imported into the current draft.` });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      event.target.value = '';
    }
  };

  const downloadJson = (key) => {
    const config = DATASETS[key];
    const data = datasets[key]?.items || [];
    const blob = new Blob([formatJson(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = config.path.split('/').pop();
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    const payload = Object.fromEntries(Object.keys(DATASETS).map((key) => [key, datasets[key]?.items || []]));
    const blob = new Blob([formatJson(payload)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `skillifygenius-content-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const publishKeys = async (keys) => {
    const changedKeys = keys.filter((key) => {
      const state = datasets[key];
      return state && formatJson(state.items) !== formatJson(state.original);
    });

    if (!changedKeys.length) {
      setStatus({ type: 'success', message: 'No changes to publish.' });
      return;
    }

    const validationIssues = changedKeys.flatMap((key) => validateDataset(key, datasets[key]?.items || []));
    if (validationIssues.length) {
      setStatus({ type: 'error', message: validationIssues.slice(0, 3).join(' | ') });
      return;
    }

    const summary = changedKeys.map((key) => DATASETS[key].label).join(', ');
    if (!window.confirm(`Publish changes for ${summary}? Previous JSON will be archived before publishing.`)) return;

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      for (const key of changedKeys) {
        const config = DATASETS[key];
        const state = datasets[key];
        const content = formatJson(state.items);
        const originalContent = formatJson(state.original);

        await githubRequest(makeArchivePath(key, config.path), {
          method: 'PUT',
          body: JSON.stringify({
            message: `Archive ${config.label} before admin update`,
            content: encodeBase64(originalContent),
            branch: repo.branch || undefined
          })
        });

        const response = await githubRequest(config.path, {
          method: 'PUT',
          body: JSON.stringify({
            message: `Update ${config.label} via admin dashboard`,
            content: encodeBase64(content),
            sha: state.sha,
            branch: repo.branch || undefined
          })
        });

        setDatasets((current) => ({
          ...current,
          [key]: {
            ...current[key],
            original: cloneJson(current[key].items),
            sha: response.content.sha
          }
        }));
      }

      setStatus({ type: 'success', message: `Published ${changedKeys.length} file(s) with archive snapshots.` });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const loadArchives = async () => {
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await githubRequest(`archive/${activeKey}`);
      const files = Array.isArray(response)
        ? response.filter((item) => item.type === 'file').sort((a, b) => b.name.localeCompare(a.name))
        : [];
      setArchives((current) => ({ ...current, [activeKey]: files }));
      setShowArchives(true);
      setStatus({ type: 'success', message: files.length ? 'Archive history loaded.' : 'No archive files found yet.' });
    } catch (error) {
      if (String(error.message).includes('Not Found')) {
        setArchives((current) => ({ ...current, [activeKey]: [] }));
        setShowArchives(true);
        setStatus({ type: 'success', message: 'No archive folder exists yet for this dataset.' });
      } else {
        setStatus({ type: 'error', message: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const restoreArchive = async (archiveFile) => {
    if (!window.confirm(`Restore ${archiveFile.name} into the current draft?`)) return;

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await githubRequest(archiveFile.path);
      const restored = response.content ? JSON.parse(decodeBase64(response.content)) : [];
      if (!Array.isArray(restored)) throw new Error('Archive file does not contain a JSON array.');
      updateDataset(activeKey, () => restored);
      setStatus({ type: 'success', message: `${activeConfig.label} restored from archive into draft.` });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const renderField = (item, field) => {
    const value = item[field.key];

    if (field.type === 'boolean') {
      return (
        <label className="admin-switch">
          <input type="checkbox" checked={Boolean(value)} onChange={(event) => updateItem(item.id, field.key, event.target.checked)} />
          <span>{value ? 'Enabled' : 'Disabled'}</span>
        </label>
      );
    }

    if (field.type === 'array') {
      return (
        <textarea
          value={(value || []).join('\n\n')}
          onChange={(event) =>
            updateItem(item.id, field.key, event.target.value.split(/\n+/).map((line) => line.trim()).filter(Boolean))
          }
        />
      );
    }

    if (field.type === 'textarea') {
      return <textarea value={value || ''} onChange={(event) => updateItem(item.id, field.key, event.target.value)} />;
    }

    return (
      <input
        type={field.type || 'text'}
        min={field.type === 'number' ? 1 : undefined}
        max={field.type === 'number' ? 5 : undefined}
        value={value ?? ''}
        onChange={(event) => updateItem(item.id, field.key, field.type === 'number' ? Number(event.target.value) : event.target.value)}
      />
    );
  };

  if (!isReady) {
    return (
      <div className="admin-shell admin-auth-shell">
        <section className="admin-auth-card">
          <div className="admin-auth-brand">
            <div className="admin-auth-icon"><LayoutDashboard size={30} /></div>
            <div>
              <p>SkillifyGenius</p>
              <h1>Content Operations</h1>
            </div>
          </div>

          <form onSubmit={loadAllData} className="admin-auth-form">
            <label>
              GitHub Personal Access Token
              <div className="admin-secret-field">
                <KeyRound size={18} />
                <input type="password" value={token} onChange={(event) => setToken(event.target.value)} placeholder="ghp_..." />
              </div>
            </label>

            {status.message && (
              <div className={`admin-alert ${status.type}`}>
                {status.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
                {status.message}
              </div>
            )}

            <button className="admin-primary-action" type="submit" disabled={loading}>
              {loading ? <Loader2 className="admin-spin" size={18} /> : <Database size={18} />}
              {loading ? 'Loading content...' : 'Connect Dashboard'}
            </button>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="admin-auth-icon"><Database size={24} /></div>
          <div>
            <p>Admin Panel</p>
            <strong>Content Hub</strong>
          </div>
        </div>

        <nav className="admin-nav">
          {stats.map((item) => (
            <button
              key={item.key}
              className={`admin-nav-item ${activeKey === item.key ? 'active' : ''}`}
              onClick={() => {
                setActiveKey(item.key);
                setExpandedId(null);
              }}
              style={{ '--accent': DATASETS[item.key].accent }}
            >
              <FileJson size={18} />
              <span>{item.label}</span>
              <small>{item.count}</small>
              {item.dirty && <i />}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <span>{repo.owner}/{repo.name}</span>
          <button onClick={loadAllData} disabled={loading}>
            <RefreshCw size={16} />
            Refresh
          </button>
          <button onClick={resetLocalDrafts} disabled={loading}>
            <Trash2 size={16} />
            Clear Drafts
          </button>
          <button onClick={logout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="admin-kicker"><Settings size={14} /> Live JSON editor</span>
            <h1>{activeConfig.label}</h1>
            <p>{activeConfig.description}</p>
          </div>
          <div className="admin-toolbar">
            <button className="admin-soft-button" onClick={() => fileInputRef.current?.click()}>
              <Upload size={17} /> Import
            </button>
            <button className="admin-soft-button" onClick={() => downloadJson(activeKey)}>
              <Download size={17} /> Download
            </button>
            <button className="admin-soft-button" onClick={downloadAll}>
              <Archive size={17} /> Backup All
            </button>
            <button className="admin-soft-button" onClick={loadArchives} disabled={loading}>
              <Archive size={17} /> Archives
            </button>
            <button className="admin-soft-button" onClick={addItem}>
              <Plus size={17} /> New
            </button>
            <button className="admin-primary-button" onClick={() => publishKeys([activeKey])} disabled={loading}>
              {loading ? <Loader2 className="admin-spin" size={17} /> : <Save size={17} />}
              Publish
            </button>
            <button className="admin-dark-button" onClick={() => publishKeys(Object.keys(DATASETS))} disabled={loading}>
              Publish All
            </button>
          </div>
        </header>

        <input ref={fileInputRef} className="admin-hidden-input" type="file" accept="application/json,.json" onChange={importJson} />

        {status.message && (
          <div className={`admin-alert ${status.type}`}>
            {status.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
            {status.message}
          </div>
        )}

        <section className="admin-control-row">
          <label className="admin-search">
            <Search size={18} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${activeConfig.label.toLowerCase()}...`} />
          </label>
          <div className={`admin-validation-card ${activeIssues.length ? 'error' : 'success'}`}>
            {activeIssues.length ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
            <span>{activeIssues.length ? 'Needs attention' : 'Ready'}</span>
          </div>
        </section>

        {showArchives && (
          <section className="admin-archive-panel">
            <div>
              <h2>Archive History</h2>
              <p>Restore an older JSON file into the current draft, then publish when it looks right.</p>
            </div>
            <div className="admin-archive-list">
              {(archives[activeKey] || []).length === 0 ? (
                <span className="admin-empty-row">No archived versions yet.</span>
              ) : (
                archives[activeKey].map((file) => (
                  <button key={file.sha} onClick={() => restoreArchive(file)}>
                    <Archive size={16} />
                    <span>{file.name}</span>
                  </button>
                ))
              )}
            </div>
          </section>
        )}

        <section className="admin-summary-grid">
          {stats.map((item) => (
            <button
              key={item.key}
              className={`admin-summary-card ${activeKey === item.key ? 'active' : ''}`}
              onClick={() => setActiveKey(item.key)}
              style={{ '--accent': DATASETS[item.key].accent }}
            >
              <span>{item.label}</span>
              <strong>{item.count}</strong>
              <em>{item.dirty ? 'Draft changes' : 'Synced'}</em>
            </button>
          ))}
        </section>

        <section className="admin-editor-list">
          {filteredData.map((item) => {
            const isExpanded = expandedId === item.id;
            const isModified = formatJson(item) !== formatJson((datasets[activeKey]?.original || []).find((originalItem) => originalItem.id === item.id));
            return (
              <article className={`admin-editor-card ${isExpanded ? 'expanded' : ''} ${isModified ? 'modified' : ''}`} key={item.id}>
                <div
                  className="admin-card-head"
                  role="button"
                  tabIndex="0"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setExpandedId(isExpanded ? null : item.id);
                    }
                  }}
                >
                  <div>
                    <span>{item.phase || item.type || item.role || `ID ${item.id}`}</span>
                    <h2>{item.title || item.name || 'Untitled item'}</h2>
                    {isModified && <em>Modified</em>}
                  </div>
                  <div className="admin-card-actions">
                    <button type="button" onClick={(event) => { event.stopPropagation(); setPreviewItem(item); }}>
                      <Eye size={16} />
                    </button>
                    <button type="button" onClick={(event) => { event.stopPropagation(); moveItem(item.id, -1); }}>
                      <ArrowUp size={16} />
                    </button>
                    <button type="button" onClick={(event) => { event.stopPropagation(); moveItem(item.id, 1); }}>
                      <ArrowDown size={16} />
                    </button>
                    <button type="button" onClick={(event) => { event.stopPropagation(); duplicateItem(item); }}>Duplicate</button>
                    <button type="button" className="danger" onClick={(event) => { event.stopPropagation(); deleteItem(item.id); }}>
                      <Trash2 size={16} />
                    </button>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="admin-card-body">
                    <div className="admin-form-grid">
                      {activeConfig.fields.map((field) => (
                        <label key={field.key} className={field.type === 'textarea' || field.type === 'array' ? 'wide' : ''}>
                          {field.label}
                          {renderField(item, field)}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
          {filteredData.length === 0 && (
            <div className="admin-empty-state">
              <Search size={28} />
              <h3>No matching items</h3>
              <p>Try a different search term or clear the filter.</p>
            </div>
          )}
        </section>
      </main>

      {previewItem && (
        <div className="admin-preview-backdrop" onClick={() => setPreviewItem(null)}>
          <aside className="admin-preview-panel" onClick={(event) => event.stopPropagation()}>
            <button className="admin-preview-close" onClick={() => setPreviewItem(null)}>Close</button>
            <span className="admin-kicker">Preview</span>
            <h2>{getItemTitle(previewItem)}</h2>
            {activeKey === 'courses' && (
              <>
                <div className="admin-preview-meta">
                  <span>{previewItem.phase}</span>
                  <span>{previewItem.duration}</span>
                  <span>{previewItem.classFrequency}</span>
                </div>
                <p>{previewItem.description}</p>
                <strong>Goal</strong>
                <p>{previewItem.goal}</p>
                <strong>Modules</strong>
                <p>{previewItem.modules}</p>
                <strong>Outcome</strong>
                <p>{previewItem.primaryOutcome}</p>
              </>
            )}
            {activeKey === 'offerBanner' && (
              <>
                <div className="admin-preview-meta">
                  <span>{previewItem.enabled ? 'Visible' : 'Hidden'}</span>
                  <span>{previewItem.eyebrow}</span>
                  <span>{previewItem.ctaLink}</span>
                </div>
                <p>{previewItem.description}</p>
                <strong>Button</strong>
                <p>{previewItem.ctaText}</p>
                <strong>Note</strong>
                <p>{previewItem.note}</p>
              </>
            )}
            {activeKey === 'blogs' && (
              <>
                <div className="admin-preview-meta">
                  <span>{previewItem.date}</span>
                  <span>{previewItem.author}</span>
                  <span>{previewItem.readTime}</span>
                </div>
                <p>{previewItem.preview}</p>
                {(previewItem.content || []).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </>
            )}
            {activeKey === 'tools' && (
              <>
                <div className="admin-preview-meta">
                  <span>{previewItem.type}</span>
                  <span>{previewItem.link}</span>
                </div>
                <p>{previewItem.description}</p>
                <strong>Reasons</strong>
                <ul>
                  {(previewItem.reasons || []).map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </>
            )}
            {activeKey === 'reviews' && (
              <>
                <div className="admin-preview-meta">
                  <span>{previewItem.role}</span>
                  <span>{previewItem.rating}/5</span>
                </div>
                <p>"{previewItem.text}"</p>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
};

export default Admin;
