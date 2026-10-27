import { useMemo, useState } from 'react';

const navItems = ['Dashboard', 'Keyword Planner', 'Content Briefs', 'Rank Tracking', 'Content Calendar', 'Settings'];

const intentOptions = ['All', 'Informational', 'Commercial', 'Transactional', 'Navigational', 'Brand'];
const channelOptions = ['All', 'SEO blog', 'Website landing page', 'Product page', 'Instagram carousel', 'Short-form video', 'LinkedIn post', 'Newsletter', 'YouTube topic'];

const defaultProjects = [
  { id: 'proj-1', name: 'Growth Pilot', niche: 'B2B SaaS', goal: 'Increase demo bookings', status: 'Active' },
  { id: 'proj-2', name: 'Ecom Lift', niche: 'E-commerce', goal: 'Boost organic revenue', status: 'Planning' },
  { id: 'proj-3', name: 'Agency Scale', niche: 'Agency services', goal: 'Grow inbound leads', status: 'Active' },
];

const defaultKeywords = [
  {
    id: 'kw-1',
    projectId: 'proj-1',
    keyword: 'email marketing for small businesses',
    intent: 'Commercial',
    volume: 1800,
    difficulty: 47,
    relevance: 92,
    brandFit: 88,
    channel: 'SEO blog',
    contentType: 'Blog article',
    status: 'Ready',
    notes: 'Strong lead generation opportunity',
    trend: 72,
  },
  {
    id: 'kw-2',
    projectId: 'proj-1',
    keyword: 'how to grow newsletter subscribers',
    intent: 'Informational',
    volume: 1400,
    difficulty: 38,
    relevance: 89,
    brandFit: 90,
    channel: 'SEO blog',
    contentType: 'Educational article',
    status: 'Drafting',
    notes: 'High-intent educational content',
    trend: 81,
  },
  {
    id: 'kw-3',
    projectId: 'proj-1',
    keyword: 'best CRM for agencies',
    intent: 'Commercial',
    volume: 2200,
    difficulty: 56,
    relevance: 94,
    brandFit: 87,
    channel: 'Website landing page',
    contentType: 'Comparison page',
    status: 'High priority',
    notes: 'Strong competitive opportunity',
    trend: 79,
  },
  {
    id: 'kw-4',
    projectId: 'proj-1',
    keyword: 'content calendar ideas for startups',
    intent: 'Informational',
    volume: 960,
    difficulty: 31,
    relevance: 80,
    brandFit: 82,
    channel: 'Instagram carousel',
    contentType: 'Carousel',
    status: 'Scheduled',
    notes: 'Strong organic social angle',
    trend: 88,
  },
  {
    id: 'kw-5',
    projectId: 'proj-2',
    keyword: 'best ecommerce email tools',
    intent: 'Commercial',
    volume: 1600,
    difficulty: 52,
    relevance: 91,
    brandFit: 83,
    channel: 'Website landing page',
    contentType: 'Landing page',
    status: 'Ready',
    notes: 'Commercial conversion opportunity',
    trend: 76,
  },
  {
    id: 'kw-6',
    projectId: 'proj-2',
    keyword: 'how to reduce cart abandonment',
    intent: 'Informational',
    volume: 1100,
    difficulty: 41,
    relevance: 87,
    brandFit: 84,
    channel: 'SEO blog',
    contentType: 'Blog article',
    status: 'Drafting',
    notes: 'Strong educational demand',
    trend: 84,
  },
];

function scoreKeyword(item) {
  const volumeScore = Math.min(100, item.volume / 25);
  const difficultyPenalty = (item.difficulty / 100) * 35;
  const intentBoost =
    item.intent === 'Commercial' ? 20 : item.intent === 'Transactional' ? 18 : item.intent === 'Informational' ? 12 : 10;

  const total =
    item.relevance * 0.38 +
    volumeScore * 0.22 +
    item.brandFit * 0.18 +
    intentBoost * 0.12 +
    (100 - difficultyPenalty) * 0.1;

  return Math.min(100, Math.round(total));
}

function getPriorityLabel(score) {
  if (score >= 80) return 'High';
  if (score >= 60) return 'Medium';
  return 'Low';
}

function generateBrief(keyword, intent, channel) {
  const clean = keyword.trim();
  const title =
    intent === 'Commercial'
      ? `Best ${clean} options for growing your business`
      : intent === 'Informational'
        ? `How to use ${clean} the right way`
        : `${clean}: complete strategy and buying guide`;

  return {
    title,
    hook: `Why ${clean} is driving high-intent demand in your market`,
    outline: [
      'Identify the main audience problem',
      'Explain the core strategy in a simple framework',
      'Share comparison points, examples, and CTA',
      'Support with internal links and conversion-focused next steps',
    ],
    socialHook:
      channel.includes('Instagram') || channel.includes('Short-form')
        ? `Quick hook: ${clean} is one of the fastest ways to capture intent from your audience this week.`
        : `Use ${clean} as the anchor idea for a high-value content series across blog, social, and landing pages.`,
    cta: 'Capture leads with a comparison guide, newsletter signup, or demo CTA',
  };
}

export default function App() {
  const [projects, setProjects] = useState(defaultProjects);
  const [selectedProjectId, setSelectedProjectId] = useState(defaultProjects[0].id);
  const [keywords, setKeywords] = useState(defaultKeywords);
  const [projectName, setProjectName] = useState('');
  const [projectNiche, setProjectNiche] = useState('');
  const [projectGoal, setProjectGoal] = useState('');
  const [query, setQuery] = useState('');
  const [intentFilter, setIntentFilter] = useState('All');
  const [channelFilter, setChannelFilter] = useState('All');
  const [selectedKeywordId, setSelectedKeywordId] = useState(defaultKeywords[0].id);
  const [keywordInput, setKeywordInput] = useState('');
  const [intent, setIntent] = useState('Commercial');
  const [volume, setVolume] = useState(1200);
  const [difficulty, setDifficulty] = useState(42);
  const [relevance, setRelevance] = useState(85);
  const [brandFit, setBrandFit] = useState(82);
  const [channel, setChannel] = useState('SEO blog');
  const [contentType, setContentType] = useState('Blog article');
  const [status, setStatus] = useState('Ready');
  const [notes, setNotes] = useState('');

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) || projects[0],
    [projects, selectedProjectId]
  );

  const projectKeywords = useMemo(
    () => keywords.filter((item) => item.projectId === selectedProjectId),
    [keywords, selectedProjectId]
  );

  const enrichedKeywords = useMemo(
    () =>
      projectKeywords.map((item) => {
        const score = scoreKeyword(item);
        return { ...item, opportunityScore: score, priorityLabel: getPriorityLabel(score) };
      }),
    [projectKeywords]
  );

  const filteredKeywords = useMemo(() => {
    const lowered = query.trim().toLowerCase();
    return enrichedKeywords.filter((item) => {
      const matchesText = !lowered || item.keyword.toLowerCase().includes(lowered);
      const matchesIntent = intentFilter === 'All' || item.intent === intentFilter;
      const matchesChannel = channelFilter === 'All' || item.channel === channelFilter;
      return matchesText && matchesIntent && matchesChannel;
    });
  }, [enrichedKeywords, query, intentFilter, channelFilter]);

  const selectedKeyword =
    filteredKeywords.find((item) => item.id === selectedKeywordId) || enrichedKeywords[0] || null;

  const stats = useMemo(() => {
    const total = enrichedKeywords.length;
    const high = enrichedKeywords.filter((item) => item.priorityLabel === 'High').length;
    const avg = total
      ? Math.round(enrichedKeywords.reduce((sum, item) => sum + item.opportunityScore, 0) / total)
      : 0;
    const ready = enrichedKeywords.filter((item) => item.status.toLowerCase().includes('ready')).length;
    return { total, high, avg, ready };
  }, [enrichedKeywords]);

  const topOpportunities = useMemo(
    () => [...enrichedKeywords].sort((a, b) => b.opportunityScore - a.opportunityScore).slice(0, 4),
    [enrichedKeywords]
  );

  const channelSummary = useMemo(() => {
    const bucket = {};
    ['SEO blog', 'Website landing page', 'Product page', 'Instagram carousel', 'Short-form video', 'LinkedIn post', 'Newsletter', 'YouTube topic'].forEach((channelName) => {
      bucket[channelName] = enrichedKeywords.filter((item) => item.channel === channelName).length;
    });
    return bucket;
  }, [enrichedKeywords]);

  function handleAddProject(event) {
    event.preventDefault();
    const safeName = projectName.trim();
    if (!safeName) return;

    const newProject = {
      id: `proj-${Date.now()}`,
      name: safeName,
      niche: projectNiche.trim() || 'General growth strategy',
      goal: projectGoal.trim() || 'Increase organic reach',
      status: 'Planning',
    };

    setProjects((current) => [newProject, ...current]);
    setSelectedProjectId(newProject.id);
    setProjectName('');
    setProjectNiche('');
    setProjectGoal('');
  }

  function handleAddKeyword(event) {
    event.preventDefault();
    const term = keywordInput.trim();
    if (!term) return;

    const item = {
      id: `kw-${Date.now()}`,
      projectId: selectedProjectId,
      keyword: term,
      intent,
      volume: Number(volume) || 0,
      difficulty: Number(difficulty) || 0,
      relevance: Number(relevance) || 0,
      brandFit: Number(brandFit) || 0,
      channel,
      contentType,
      status,
      notes: notes.trim(),
      trend: 65,
    };

    setKeywords((current) => [item, ...current]);
    setSelectedKeywordId(item.id);
    setKeywordInput('');
    setNotes('');
    setStatus('Ready');
  }

  function handleDeleteKeyword(id) {
    setKeywords((current) => current.filter((item) => item.id !== id));
    if (selectedKeywordId === id) {
      setSelectedKeywordId('');
    }
  }

  const brief = selectedKeyword ? generateBrief(selectedKeyword.keyword, selectedKeyword.intent, selectedKeyword.channel) : null;

  return (
    <div className="saas-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">S</div>
          <div>
            <p className="label">SEO suite</p>
            <h2>Semrush-style</h2>
          </div>
        </div>

        <nav className="nav-menu">
          {navItems.map((item, index) => (
            <button key={item} className={index === 1 ? 'nav-item active' : 'nav-item'} type="button">
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <p className="label">Current project</p>
          <h3>{selectedProject.name}</h3>
          <p>{selectedProject.niche}</p>
          <span className="status-badge">{selectedProject.status}</span>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="label">Keyword research overview</p>
            <h1>Growth dashboard</h1>
          </div>

          <div className="topbar-actions">
            <div className="search-box">
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search keywords" />
            </div>
            <select value={selectedProjectId} onChange={(event) => setSelectedProjectId(event.target.value)}>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
            <button type="button">Export</button>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card accent">
            <span>Total keywords</span>
            <strong>{stats.total}</strong>
            <small>Across active projects</small>
          </div>
          <div className="stat-card">
            <span>High priority</span>
            <strong>{stats.high}</strong>
            <small>Ready for content</small>
          </div>
          <div className="stat-card">
            <span>Avg opportunity</span>
            <strong>{stats.avg}/100</strong>
            <small>Opportunity score</small>
          </div>
          <div className="stat-card">
            <span>Ready to publish</span>
            <strong>{stats.ready}</strong>
            <small>Actionable content</small>
          </div>
        </section>

        <section className="insight-grid">
          <div className="panel chart-panel">
            <div className="panel-header">
              <div>
                <p className="label">Performance</p>
                <h3>Keyword opportunity</h3>
              </div>
            </div>

            <div className="bar-list">
              {topOpportunities.map((item) => (
                <div key={item.id} className="bar-row">
                  <div className="bar-meta">
                    <span>{item.keyword}</span>
                    <strong>{item.opportunityScore}/100</strong>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${item.opportunityScore}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <p className="label">Top opportunities</p>
                <h3>Priority focus</h3>
              </div>
            </div>

            <div className="opportunity-list">
              {topOpportunities.map((item) => (
                <div key={item.id} className="opportunity-row">
                  <div>
                    <strong>{item.keyword}</strong>
                    <small>{item.intent}</small>
                  </div>
                  <span className={`pill ${item.priorityLabel.toLowerCase()}`}>{item.priorityLabel}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="workspace-grid">
          <div className="panel large-panel">
            <div className="panel-header split-header">
              <div>
                <p className="label">Keyword planner</p>
                <h3>SEO + content roadmap</h3>
              </div>
              <button type="button" className="secondary-button">Add project</button>
            </div>

            <form className="project-form" onSubmit={handleAddProject}>
              <input value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="Project name" />
              <input value={projectNiche} onChange={(event) => setProjectNiche(event.target.value)} placeholder="Niche" />
              <input value={projectGoal} onChange={(event) => setProjectGoal(event.target.value)} placeholder="Primary goal" />
              <button type="submit">Create</button>
            </form>

            <div className="table-header-row">
              <div className="table-controls">
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter by keyword" />
                <select value={intentFilter} onChange={(event) => setIntentFilter(event.target.value)}>
                  {intentOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <select value={channelFilter} onChange={(event) => setChannelFilter(event.target.value)}>
                  {channelOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="keyword-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Keyword</th>
                    <th>Intent</th>
                    <th>Volume</th>
                    <th>Difficulty</th>
                    <th>Channel</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKeywords.map((item) => (
                    <tr key={item.id} className={selectedKeyword?.id === item.id ? 'selected-row' : ''} onClick={() => setSelectedKeywordId(item.id)}>
                      <td>
                        <div className="keyword-cell">
                          <strong>{item.keyword}</strong>
                          <small>{item.notes}</small>
                        </div>
                      </td>
                      <td>{item.intent}</td>
                      <td>{item.volume}</td>
                      <td>{item.difficulty}</td>
                      <td>{item.channel}</td>
                      <td>{item.status}</td>
                      <td>
                        <span className={`pill ${item.priorityLabel.toLowerCase()}`}>{item.opportunityScore}/100</span>
                      </td>
                      <td>
                        <button type="button" className="danger-button" onClick={(event) => {
                          event.stopPropagation();
                          handleDeleteKeyword(item.id);
                        }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="panel side-panel">
            <div className="panel-header">
              <div>
                <p className="label">Content brief</p>
                <h3>Selected keyword</h3>
              </div>
            </div>

            {brief ? (
              <div className="brief-wrap">
                <div className="brief-card">
                  <span className="label">Focus topic</span>
                  <h4>{brief.title}</h4>
                </div>

                <div className="brief-card">
                  <span className="label">Hook</span>
                  <p>{brief.hook}</p>
                </div>

                <div className="brief-card">
                  <span className="label">Outline</span>
                  <ol>
                    {brief.outline.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="brief-card">
                  <span className="label">Social angle</span>
                  <p>{brief.socialHook}</p>
                </div>

                <div className="brief-card">
                  <span className="label">CTA</span>
                  <p>{brief.cta}</p>
                </div>
              </div>
            ) : (
              <p className="muted-text">Choose a keyword to generate a content brief.</p>
            )}
          </aside>
        </section>

        <section className="bottom-grid">
          <div className="panel">
            <div className="panel-header">
              <div>
                <p className="label">Planner</p>
                <h3>Add keyword</h3>
              </div>
            </div>

            <form className="entry-form" onSubmit={handleAddKeyword}>
              <div className="field-row">
                <input value={keywordInput} onChange={(event) => setKeywordInput(event.target.value)} placeholder="Add keyword or topic" />
                <select value={intent} onChange={(event) => setIntent(event.target.value)}>
                  {['Informational', 'Commercial', 'Transactional', 'Navigational', 'Brand'].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="field-row">
                <input type="number" value={volume} onChange={(event) => setVolume(event.target.value)} placeholder="Volume" />
                <input type="number" value={difficulty} onChange={(event) => setDifficulty(event.target.value)} placeholder="Difficulty" />
              </div>

              <div className="field-row">
                <input type="number" value={relevance} onChange={(event) => setRelevance(event.target.value)} placeholder="Relevance" />
                <input type="number" value={brandFit} onChange={(event) => setBrandFit(event.target.value)} placeholder="Brand fit" />
              </div>

              <div className="field-row">
                <select value={channel} onChange={(event) => setChannel(event.target.value)}>
                  {['SEO blog', 'Website landing page', 'Product page', 'Instagram carousel', 'Short-form video', 'LinkedIn post', 'Newsletter', 'YouTube topic'].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <input value={contentType} onChange={(event) => setContentType(event.target.value)} placeholder="Content type" />
              </div>

              <div className="field-row">
                <input value={status} onChange={(event) => setStatus(event.target.value)} placeholder="Status" />
                <input value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Notes" />
              </div>

              <button type="submit">Save keyword</button>
            </form>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <p className="label">Distribution</p>
                <h3>Channel mix</h3>
              </div>
            </div>

            <div className="channel-grid">
              {Object.entries(channelSummary).map(([name, count]) => (
                <div key={name} className="channel-pill">
                  <span>{name}</span>
                  <strong>{count}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
