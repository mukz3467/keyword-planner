import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'keyword-planner-data-v2';
const DEFAULT_PROJECT_ID = 'project-demo';

const intentOptions = ['Informational', 'Commercial', 'Transactional', 'Navigational', 'Brand'];
const channelOptions = [
  'SEO blog',
  'Website landing page',
  'Product page',
  'Instagram carousel',
  'Short-form video',
  'LinkedIn post',
  'Newsletter',
  'YouTube topic',
];

const defaultProjects = [
  {
    id: DEFAULT_PROJECT_ID,
    name: 'Demo brand',
    niche: 'B2B growth marketing',
    goal: 'Generate qualified leads through SEO and social content',
  },
];

const defaultKeywords = [
  {
    id: 'kw-1',
    projectId: DEFAULT_PROJECT_ID,
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
    createdAt: new Date().toISOString(),
  },
  {
    id: 'kw-2',
    projectId: DEFAULT_PROJECT_ID,
    keyword: 'how to grow newsletter subscribers',
    intent: 'Informational',
    volume: 1400,
    difficulty: 38,
    relevance: 89,
    brandFit: 90,
    channel: 'SEO blog',
    contentType: 'Educational article',
    status: 'Drafting',
    notes: 'Good top-of-funnel article',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'kw-3',
    projectId: DEFAULT_PROJECT_ID,
    keyword: 'best CRM for agencies',
    intent: 'Commercial',
    volume: 2200,
    difficulty: 56,
    relevance: 94,
    brandFit: 87,
    channel: 'Website landing page',
    contentType: 'Comparison page',
    status: 'High priority',
    notes: 'Strong commercial intent',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'kw-4',
    projectId: DEFAULT_PROJECT_ID,
    keyword: 'content calendar ideas for startups',
    intent: 'Informational',
    volume: 960,
    difficulty: 31,
    relevance: 80,
    brandFit: 82,
    channel: 'Instagram carousel',
    contentType: 'Carousel',
    status: 'Scheduled',
    notes: 'Good social engagement angle',
    createdAt: new Date().toISOString(),
  },
];

function scoreKeyword(item) {
  const volumeScore = Math.min(100, item.volume / 25);
  const difficultyPenalty = (item.difficulty / 100) * 35;
  const intentBoost =
    item.intent === 'Commercial'
      ? 20
      : item.intent === 'Transactional'
        ? 18
        : item.intent === 'Informational'
          ? 12
          : 10;

  const total =
    item.relevance * 0.38 +
    volumeScore * 0.22 +
    item.brandFit * 0.18 +
    intentBoost * 0.12 +
    (100 - difficultyPenalty) * 0.1;

  return Math.min(100, Math.round(total));
}

function getPriorityLabel(score) {
  if (score >= 80) return 'High priority';
  if (score >= 60) return 'Medium';
  return 'Low';
}

function generateRelatedKeywords(term) {
  const base = term.trim();
  if (!base) return [];

  const patterns = [
    `${base} tips`,
    `${base} for beginners`,
    `best ${base}`,
    `how to ${base}`,
    `${base} strategy`,
    `${base} guide`,
    `${base} examples`,
    `${base} mistakes`,
  ];

  return [...new Set(patterns)];
}

function buildBrief(keyword, intent, channel) {
  const cleanKeyword = keyword.trim();
  const title =
    intent === 'Commercial'
      ? `Best ${cleanKeyword} options for growing your business`
      : intent === 'Informational'
        ? `How to use ${cleanKeyword} the right way`
        : intent === 'Transactional'
          ? `${cleanKeyword}: the complete buying guide`
          : `${cleanKeyword}: strategy guide`; 

  const hooks = [
    `Why ${cleanKeyword} matters for your audience`,
    `The biggest mistakes people make with ${cleanKeyword}`,
    `What to do first when targeting ${cleanKeyword}`,
  ];

  const contentOutline = [
    'Start with the core problem the audience faces',
    'Explain the practical solution in simple language',
    'Offer a clear CTA or lead magnet',
    'Link this topic to supporting pages or related content',
  ];

  const socialPost =
    channel.includes('Instagram') || channel.includes('Short-form')
      ? `Hook: ${cleanKeyword} is a high-intent topic your audience is already searching for. Share a quick framework and CTA.`
      : `Write a concise post explaining why ${cleanKeyword} matters and link to a deeper article or page.`;

  return {
    title,
    hooks,
    contentOutline,
    socialPost,
    cta: 'Collect email signups or encourage product exploration',
  };
}

function normalizeKeywordImport(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, ' ');
}

export default function App() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}-projects`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Could not parse project data', error);
      }
    }
    return defaultProjects;
  });

  const [selectedProjectId, setSelectedProjectId] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}-selected-project`);
    return saved || DEFAULT_PROJECT_ID;
  });

  const [keywords, setKeywords] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Could not parse keyword data', error);
      }
    }
    return defaultKeywords;
  });

  const [projectName, setProjectName] = useState('');
  const [projectNiche, setProjectNiche] = useState('');
  const [projectGoal, setProjectGoal] = useState('');

  const [keywordInput, setKeywordInput] = useState('');
  const [intent, setIntent] = useState('Commercial');
  const [volume, setVolume] = useState(1200);
  const [difficulty, setDifficulty] = useState(42);
  const [relevance, setRelevance] = useState(85);
  const [brandFit, setBrandFit] = useState(80);
  const [channel, setChannel] = useState('SEO blog');
  const [contentType, setContentType] = useState('Blog article');
  const [status, setStatus] = useState('Ready');
  const [notes, setNotes] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [intentFilter, setIntentFilter] = useState('All');
  const [channelFilter, setChannelFilter] = useState('All');
  const [selectedKeywordId, setSelectedKeywordId] = useState(null);
  const [importText, setImportText] = useState('');

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}-projects`, JSON.stringify(projects));
    localStorage.setItem(`${STORAGE_KEY}-selected-project`, selectedProjectId);
  }, [projects, selectedProjectId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keywords));
  }, [keywords]);

  const selectedProject = projects.find((project) => project.id === selectedProjectId) || projects[0];

  const currentProjectKeywords = useMemo(
    () =>
      keywords.filter((item) => item.projectId === selectedProjectId),
    [keywords, selectedProjectId]
  );

  const enrichedKeywords = useMemo(
    () =>
      currentProjectKeywords.map((item) => {
        const score = scoreKeyword(item);
        return {
          ...item,
          opportunityScore: score,
          priorityLabel: getPriorityLabel(score),
        };
      }),
    [currentProjectKeywords]
  );

  const filteredKeywords = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return enrichedKeywords.filter((item) => {
      const matchesQuery = !query || item.keyword.toLowerCase().includes(query);
      const matchesIntent = intentFilter === 'All' || item.intent === intentFilter;
      const matchesChannel = channelFilter === 'All' || item.channel === channelFilter;
      return matchesQuery && matchesIntent && matchesChannel;
    });
  }, [enrichedKeywords, searchQuery, intentFilter, channelFilter]);

  const selectedKeyword = filteredKeywords.find((item) => item.id === selectedKeywordId) || enrichedKeywords[0] || null;

  const stats = useMemo(() => {
    const total = enrichedKeywords.length;
    const highPriority = enrichedKeywords.filter((item) => item.priorityLabel === 'High priority').length;
    const avgOpportunity = total
      ? Math.round(enrichedKeywords.reduce((sum, item) => sum + item.opportunityScore, 0) / total)
      : 0;
    const readyCount = enrichedKeywords.filter((item) => item.status.toLowerCase().includes('ready')).length;
    return { total, highPriority, avgOpportunity, readyCount };
  }, [enrichedKeywords]);

  const channelBuckets = useMemo(() => {
    const buckets = {};
    channelOptions.forEach((option) => {
      buckets[option] = enrichedKeywords.filter((item) => item.channel === option);
    });
    return buckets;
  }, [enrichedKeywords]);

  function addProject(event) {
    event.preventDefault();
    const trimmedName = projectName.trim();
    if (!trimmedName) return;

    const newProject = {
      id: `project-${Date.now()}`,
      name: trimmedName,
      niche: projectNiche.trim() || 'General growth marketing',
      goal: projectGoal.trim() || 'Increase organic and social reach',
    };

    setProjects((current) => [newProject, ...current]);
    setSelectedProjectId(newProject.id);
    setProjectName('');
    setProjectNiche('');
    setProjectGoal('');
  }

  function addKeyword(event) {
    event.preventDefault();
    const trimmed = keywordInput.trim();
    if (!trimmed) return;

    const candidate = {
      id: `kw-${Date.now()}`,
      projectId: selectedProjectId,
      keyword: trimmed,
      intent,
      volume: Number(volume) || 0,
      difficulty: Number(difficulty) || 0,
      relevance: Number(relevance) || 0,
      brandFit: Number(brandFit) || 0,
      channel,
      contentType,
      status,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    };

    setKeywords((current) => [candidate, ...current]);
    setKeywordInput('');
    setNotes('');
    setStatus('Ready');
    setSelectedKeywordId(candidate.id);
  }

  function addSeedTopic() {
    if (!keywordInput.trim()) return;
    const related = generateRelatedKeywords(keywordInput);
    const generated = related.map((term, index) => ({
      id: `seed-${Date.now()}-${index}`,
      projectId: selectedProjectId,
      keyword: term,
      intent: index % 2 === 0 ? 'Informational' : 'Commercial',
      volume: 700 + index * 220,
      difficulty: 25 + index * 9,
      relevance: 78 + index * 5,
      brandFit: 72 + index * 6,
      contentType: index % 2 === 0 ? 'Blog article' : 'Social content',
      channel: index % 2 === 0 ? 'SEO blog' : 'Instagram carousel',
      status: 'New idea',
      notes: 'Generated from topic cluster',
      createdAt: new Date().toISOString(),
    }));

    setKeywords((current) => [...generated, ...current]);
    setKeywordInput('');
  }

  function removeKeyword(id) {
    setKeywords((current) => current.filter((item) => item.id !== id));
    setSelectedKeywordId((current) => (current === id ? null : current));
  }

  function resetDemo() {
    setProjects(defaultProjects);
    setSelectedProjectId(DEFAULT_PROJECT_ID);
    setKeywords(defaultKeywords);
  }

  function handleImport(event) {
    const text = importText.trim();
    if (!text) return;

    const rows = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    const imported = rows
      .map((line) => normalizeKeywordImport(line))
      .filter(Boolean)
      .map((term, index) => ({
        id: `import-${Date.now()}-${index}`,
        projectId: selectedProjectId,
        keyword: term,
        intent: index % 2 === 0 ? 'Informational' : 'Commercial',
        volume: 600 + index * 180,
        difficulty: 20 + index * 7,
        relevance: 70 + index * 6,
        brandFit: 70 + index * 5,
        channel: channelOptions[index % channelOptions.length],
        contentType: 'Imported topic',
        status: 'Imported',
        notes: 'Imported from CSV or pasted list',
        createdAt: new Date().toISOString(),
      }));

    setKeywords((current) => [...imported, ...current]);
    setImportText('');
  }

  function exportCsv() {
    const rows = [
      ['Project', 'Keyword', 'Intent', 'Volume', 'Difficulty', 'Relevance', 'Brand Fit', 'Channel', 'Content Type', 'Status', 'Opportunity'],
      ...enrichedKeywords.map((item) => [
        selectedProject?.name || 'Project',
        item.keyword,
        item.intent,
        item.volume,
        item.difficulty,
        item.relevance,
        item.brandFit,
        item.channel,
        item.contentType,
        item.status,
        item.opportunityScore,
      ]),
    ];

    const csv = rows
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(selectedProject?.name || 'keyword-project').replace(/\s+/g, '-').toLowerCase()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const brief = selectedKeyword ? buildBrief(selectedKeyword.keyword, selectedKeyword.intent, selectedKeyword.channel) : null;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Organic growth system</p>
          <h1>Keyword Planner</h1>
        </div>
        <div className="actions">
          <button className="secondary" onClick={resetDemo}>Reset demo</button>
          <button onClick={exportCsv}>Export CSV</button>
        </div>
      </header>

      <section className="project-strip panel">
        <div className="project-header">
          <div>
            <h2>Projects</h2>
            <p>{selectedProject?.niche || 'Niche not set'}</p>
          </div>
          <select value={selectedProjectId} onChange={(event) => setSelectedProjectId(event.target.value)}>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>

        <form onSubmit={addProject} className="project-form">
          <input value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="Project name" />
          <input value={projectNiche} onChange={(event) => setProjectNiche(event.target.value)} placeholder="Niche or business sector" />
          <input value={projectGoal} onChange={(event) => setProjectGoal(event.target.value)} placeholder="Primary goal" />
          <button type="submit">Add project</button>
        </form>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Total keywords</span>
          <strong>{stats.total}</strong>
        </div>
        <div className="stat-card">
          <span>High priority</span>
          <strong>{stats.highPriority}</strong>
        </div>
        <div className="stat-card">
          <span>Average opportunity</span>
          <strong>{stats.avgOpportunity}/100</strong>
        </div>
        <div className="stat-card">
          <span>Ready to publish</span>
          <strong>{stats.readyCount}</strong>
        </div>
      </section>

      <section className="panel-grid">
        <div className="panel">
          <h2>Add keyword</h2>
          <form onSubmit={addKeyword} className="keyword-form">
            <label>
              Keyword or topic
              <input
                value={keywordInput}
                onChange={(event) => setKeywordInput(event.target.value)}
                placeholder="e.g. ecommerce email automation"
              />
            </label>

            <div className="field-row">
              <label>
                Intent
                <select value={intent} onChange={(event) => setIntent(event.target.value)}>
                  {intentOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label>
                Channel
                <select value={channel} onChange={(event) => setChannel(event.target.value)}>
                  {channelOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="field-row">
              <label>
                Volume
                <input type="number" value={volume} onChange={(event) => setVolume(event.target.value)} />
              </label>

              <label>
                Difficulty
                <input type="number" value={difficulty} onChange={(event) => setDifficulty(event.target.value)} />
              </label>
            </div>

            <div className="field-row">
              <label>
                Relevance
                <input type="number" min="0" max="100" value={relevance} onChange={(event) => setRelevance(event.target.value)} />
              </label>

              <label>
                Brand fit
                <input type="number" min="0" max="100" value={brandFit} onChange={(event) => setBrandFit(event.target.value)} />
              </label>
            </div>

            <div className="field-row">
              <label>
                Content type
                <input value={contentType} onChange={(event) => setContentType(event.target.value)} />
              </label>

              <label>
                Status
                <input value={status} onChange={(event) => setStatus(event.target.value)} />
              </label>
            </div>

            <label>
              Notes
              <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows="3" />
            </label>

            <div className="button-row">
              <button type="submit">Add keyword</button>
              <button type="button" className="secondary" onClick={addSeedTopic}>Generate related</button>
            </div>
          </form>
        </div>

        <div className="panel">
          <h2>Filters & import</h2>
          <div className="filters">
            <label>
              Search
              <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Find keyword" />
            </label>

            <label>
              Intent
              <select value={intentFilter} onChange={(event) => setIntentFilter(event.target.value)}>
                <option value="All">All</option>
                {intentOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>

            <label>
              Channel
              <select value={channelFilter} onChange={(event) => setChannelFilter(event.target.value)}>
                <option value="All">All</option>
                {channelOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mini-summary">
            <h3>Channel planning</h3>
            {channelOptions.map((option) => (
              <div key={option} className="channel-row">
                <span>{option}</span>
                <strong>{channelBuckets[option].length}</strong>
              </div>
            ))}
          </div>

          <div className="import-box">
            <h3>Import from CSV / pasted list</h3>
            <textarea
              value={importText}
              onChange={(event) => setImportText(event.target.value)}
              rows="5"
              placeholder="Paste one keyword per line"
            />
            <button className="secondary" type="button" onClick={handleImport}>Import keywords</button>
          </div>
        </div>
      </section>

      <section className="panel detail-grid">
        <div className="detail-panel">
          <h2>Keyword roadmap</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Keyword</th>
                  <th>Intent</th>
                  <th>Volume</th>
                  <th>Difficulty</th>
                  <th>Opportunity</th>
                  <th>Channel</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredKeywords.map((item) => (
                  <tr
                    key={item.id}
                    className={selectedKeyword?.id === item.id ? 'selected-row' : ''}
                    onClick={() => setSelectedKeywordId(item.id)}
                  >
                    <td>
                      <div className="keyword-cell">
                        <strong>{item.keyword}</strong>
                        {item.notes && <small>{item.notes}</small>}
                      </div>
                    </td>
                    <td>{item.intent}</td>
                    <td>{item.volume}</td>
                    <td>{item.difficulty}</td>
                    <td>
                      <span className={`pill ${item.priorityLabel.toLowerCase().replace(/\s+/g, '-')}`}>
                        {item.opportunityScore}/100
                      </span>
                      <small>{item.priorityLabel}</small>
                    </td>
                    <td>{item.channel}</td>
                    <td>{item.status}</td>
                    <td>
                      <button className="danger" type="button" onClick={(event) => {
                        event.stopPropagation();
                        removeKeyword(item.id);
                      }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="brief-panel">
          <h2>Content brief</h2>
          {brief ? (
            <>
              <div className="brief-block">
                <span className="label">Primary idea</span>
                <h3>{brief.title}</h3>
              </div>

              <div className="brief-block">
                <span className="label">Content hooks</span>
                <ul>
                  {brief.hooks.map((hook) => (
                    <li key={hook}>{hook}</li>
                  ))}
                </ul>
              </div>

              <div className="brief-block">
                <span className="label">Outline</span>
                <ol>
                  {brief.contentOutline.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="brief-block">
                <span className="label">Social angle</span>
                <p>{brief.socialPost}</p>
              </div>

              <div className="brief-block">
                <span className="label">CTA</span>
                <p>{brief.cta}</p>
              </div>
            </>
          ) : (
            <p>Select a keyword to generate a content brief.</p>
          )}
        </aside>
      </section>
    </div>
  );
}
