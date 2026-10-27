import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const dataDir = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'keyword-planner.db');

export function createDatabase() {
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  db.prepare(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      niche TEXT,
      goal TEXT,
      created_at TEXT NOT NULL
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS keywords (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      keyword TEXT NOT NULL,
      intent TEXT NOT NULL,
      volume INTEGER NOT NULL DEFAULT 0,
      difficulty INTEGER NOT NULL DEFAULT 0,
      relevance INTEGER NOT NULL DEFAULT 0,
      brand_fit INTEGER NOT NULL DEFAULT 0,
      channel TEXT NOT NULL,
      content_type TEXT,
      status TEXT,
      notes TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    )
  `).run();

  return db;
}

export function seedDatabase(db) {
  const projectCount = db.prepare('SELECT COUNT(*) AS count FROM projects').get()?.count || 0;
  if (projectCount > 0) return;

  const now = new Date().toISOString();

  const demoProject = {
    id: 'project-demo',
    name: 'Demo brand',
    niche: 'B2B growth marketing',
    goal: 'Generate qualified leads through SEO and social content',
    created_at: now,
  };

  db.prepare(
    `INSERT INTO projects (id, name, niche, goal, created_at) VALUES (?, ?, ?, ?, ?)`
  ).run(demoProject.id, demoProject.name, demoProject.niche, demoProject.goal, demoProject.created_at);

  const sampleKeywords = [
    {
      id: 'kw-demo-1',
      project_id: demoProject.id,
      keyword: 'email marketing for small businesses',
      intent: 'Commercial',
      volume: 1800,
      difficulty: 47,
      relevance: 92,
      brand_fit: 88,
      channel: 'SEO blog',
      content_type: 'Blog article',
      status: 'Ready',
      notes: 'Strong lead generation opportunity',
      created_at: now,
    },
    {
      id: 'kw-demo-2',
      project_id: demoProject.id,
      keyword: 'how to grow newsletter subscribers',
      intent: 'Informational',
      volume: 1400,
      difficulty: 38,
      relevance: 89,
      brand_fit: 90,
      channel: 'SEO blog',
      content_type: 'Educational article',
      status: 'Drafting',
      notes: 'Fits top-of-funnel content',
      created_at: now,
    },
    {
      id: 'kw-demo-3',
      project_id: demoProject.id,
      keyword: 'best CRM for agencies',
      intent: 'Commercial',
      volume: 2200,
      difficulty: 56,
      relevance: 94,
      brand_fit: 87,
      channel: 'Website landing page',
      content_type: 'Comparison page',
      status: 'High priority',
      notes: 'Strong commercial intent',
      created_at: now,
    },
    {
      id: 'kw-demo-4',
      project_id: demoProject.id,
      keyword: 'content calendar ideas for startups',
      intent: 'Informational',
      volume: 960,
      difficulty: 31,
      relevance: 80,
      brand_fit: 82,
      channel: 'Instagram carousel',
      content_type: 'Carousel',
      status: 'Scheduled',
      notes: 'Good social engagement angle',
      created_at: now,
    },
  ];

  const insert = db.prepare(`
    INSERT INTO keywords (
      id, project_id, keyword, intent, volume, difficulty, relevance, brand_fit, channel, content_type, status, notes, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const row of sampleKeywords) {
    insert.run(
      row.id,
      row.project_id,
      row.keyword,
      row.intent,
      row.volume,
      row.difficulty,
      row.relevance,
      row.brand_fit,
      row.channel,
      row.content_type,
      row.status,
      row.notes,
      row.created_at
    );
  }
}
