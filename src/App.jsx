import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'keyword-planner-data-v1';

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

const intentOptions = ['Informational', 'Commercial', 'Transactional', 'Navigational', 'Brand'];

const sampleKeywords = [
  {
    id: 1,
    keyword: 'email marketing for small businesses',
    intent: 'Commercial',
    volume: 1800,
    difficulty: 47,
    relevance: 92,
    brandFit: 88,
    contentType: 'Blog article',
    channel: 'SEO blog',
    status: 'Ready',
    notes: 'Strong lead generation opportunity',
  },
  {
    id: 2,
    keyword: 'how to grow newsletter subscribers',
    intent: 'Informational',
    volume: 1400,
    difficulty: 38,
    relevance: 89,
    brandFit: 90,
    contentType: 'Educational article',
    channel: 'SEO blog',
    status: 'Drafting',
    notes: 'Fits top-of-funnel content',
  },
  {
    id: 3,
    keyword: 'best CRM for agencies',
    intent: 'Commercial',
    volume: 2200,
    difficulty: 56,
    relevance: 94,
    brandFit: 87,
    contentType: 'Comparison page',
    channel: 'Website landing page',
    status: 'High priority',
    notes: 'Strong commercial intent',
  },
  {
    id: 4,
    keyword: 'content calendar ideas for startups',
    intent: 'Informational',
    volume: 960,
    difficulty: 31,
    relevance: 80,
    brandFit: 82,
    contentType: 'Carousel',
    channel: 'Instagram carousel',
    status: 'Scheduled',
    notes: 'Good social engagement angle',
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
  ];

  return [...new Set(patterns)];
}

function getPriorityLabel(score) {
  if (score >= 80) return 'High priority';
  if (score >= 60) return 'Medium';
  return 'Low';
}

function App() {
  const [keywords, setKeywords] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Failed to parse saved keywords:', error);
      }
    }
    return sampleKeywords;
  });

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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keywords));
  }, [keywords]);

  const enrichedKeywords = useMemo(
    () =>
      keywords.map((item) => ({
        ...item,
        opportunityScore: scoreKeyword(item),
        priorityLabel: getPriorityLabel(scoreKeyword(item)),
      })),
    [keywords]
  );

  const filteredKeywords = useMemo(() => {
    return enrichedKeywords.filter((item) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery = !q || item.keyword.toLowerCase().includes(q);
      const matchesIntent = intentFilter === 'All' || item.intent === intentFilter;
      const matchesChannel = channelFilter === 'All' || item.channel === channelFilter;
      return matchesQuery && matchesIntent && matchesChannel;
    });
  }, [enrichedKeywords, searchQuery, intentFilter, channelFilter]);

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

  function addKeyword(event) {
    event.preventDefault();
    const trimmed = keywordInput.trim();
    if (!trimmed) return;

    const candidate = {
      id: Date.now(),
      keyword: trimmed,
      intent,
      volume: Number(volume) || 0,
      difficulty: Number(difficulty) || 0,
      relevance: Number(relevance) || 0,
      brandFit: Number(brandFit) || 0,
      contentType,
      channel,
      status,
      notes: notes.trim(),
    };

    setKeywords((current) => [candidate, ...current]);
    setKeywordInput('');
    setNotes('');
    setStatus('Ready');
  }

  function addSeedTopic() {
    if (!keywordInput.trim()) return;
    const related = generateRelatedKeywords(keywordInput);
    const generated = related.map((term, index) => ({
      id: Date.now() + index + 1,
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
    }));

    setKeywords((current) => [...generated, ...current]);
    setKeywordInput('');
  }

  function resetDemo() {
    setKeywords(sampleKeywords);
  }

  function removeKeyword(id) {
    setKeywords((current) => current.filter((item) => item.id !== id));
  }

  function exportCsv() {
    const rows = [
      ['Keyword', 'Intent', 'Volume', 'Difficulty', 'Relevance', 'Brand Fit', 'Channel', 'Content Type', 'Status'],
      ...enrichedKeywords.map((item) => [
        item.keyword,
        item.intent,
        item.volume,
        item.difficulty,
        item.relevance,
        item.brandFit,
        item.channel,
        item.contentType,
        item.status,
      ]),
    ];

    const csv = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'keyword-planner.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Organic growth toolkit</p>
          <h1>Keyword Planner</h1>
        </div>
        <div className="actions">
          <button className="secondary" onClick={resetDemo}>Reset demo</button>
          <button onClick={exportCsv}>Export CSV</button>
        </div>
      </header>

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
          <span>Ready to use</span>
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
                placeholder="e.g. small business email automation"
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
          <h2>Planner filters</h2>
          <div className="filters">
            <label>
              Search
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Find keyword"
              />
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
        </div>
      </section>

      <section className="panel">
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
                <th>Content type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredKeywords.map((item) => (
                <tr key={item.id}>
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
                  <td>{item.contentType}</td>
                  <td>{item.status}</td>
                  <td>
                    <button className="danger" onClick={() => removeKeyword(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;
