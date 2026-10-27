import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createDatabase, seedDatabase } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3001);
const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const db = createDatabase();
seedDatabase(db);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/projects', (_req, res) => {
  const projects = db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all();
  res.json({ projects });
});

app.post('/api/projects', (req, res) => {
  const { name, niche, goal } = req.body || {};
  if (!name || !String(name).trim()) {
    return res.status(400).json({ message: 'Project name is required.' });
  }

  const project = {
    id: `project-${Date.now()}`,
    name: String(name).trim(),
    niche: String(niche || 'General marketing').trim(),
    goal: String(goal || 'Increase organic reach and leads').trim(),
    created_at: new Date().toISOString(),
  };

  db.prepare(
    `INSERT INTO projects (id, name, niche, goal, created_at) VALUES (?, ?, ?, ?, ?)`
  ).run(project.id, project.name, project.niche, project.goal, project.created_at);

  res.status(201).json({ project });
});

app.get('/api/projects/:projectId/keywords', (req, res) => {
  const { projectId } = req.params;
  const keywords = db.prepare(
    `SELECT * FROM keywords WHERE project_id = ? ORDER BY created_at DESC`
  ).all(projectId);

  res.json({ keywords });
});

app.post('/api/projects/:projectId/keywords', (req, res) => {
  const { projectId } = req.params;
  const { keyword, intent, volume, difficulty, relevance, brandFit, channel, contentType, status, notes } = req.body || {};

  if (!keyword || !String(keyword).trim()) {
    return res.status(400).json({ message: 'Keyword is required.' });
  }

  const projectExists = db.prepare('SELECT 1 FROM projects WHERE id = ?').get(projectId);
  if (!projectExists) {
    return res.status(404).json({ message: 'Project not found.' });
  }

  const item = {
    id: `kw-${Date.now()}`,
    project_id: projectId,
    keyword: String(keyword).trim(),
    intent: String(intent || 'Informational').trim(),
    volume: Number(volume || 0),
    difficulty: Number(difficulty || 0),
    relevance: Number(relevance || 0),
    brand_fit: Number(brandFit || 0),
    channel: String(channel || 'SEO blog').trim(),
    content_type: String(contentType || 'Content idea').trim(),
    status: String(status || 'Ready').trim(),
    notes: String(notes || '').trim(),
    created_at: new Date().toISOString(),
  };

  db.prepare(
    `INSERT INTO keywords (id, project_id, keyword, intent, volume, difficulty, relevance, brand_fit, channel, content_type, status, notes, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    item.id,
    item.project_id,
    item.keyword,
    item.intent,
    item.volume,
    item.difficulty,
    item.relevance,
    item.brand_fit,
    item.channel,
    item.content_type,
    item.status,
    item.notes,
    item.created_at
  );

  res.status(201).json({ keyword: item });
});

app.post('/api/projects/:projectId/import', (req, res) => {
  const { projectId } = req.params;
  const { keywords } = req.body || {};
  const rows = Array.isArray(keywords) ? keywords : [];

  const projectExists = db.prepare('SELECT 1 FROM projects WHERE id = ?').get(projectId);
  if (!projectExists) {
    return res.status(404).json({ message: 'Project not found.' });
  }

  const created = [];
  const now = new Date().toISOString();

  rows.forEach((raw, index) => {
    const term = String(raw || '').trim();
    if (!term) return;

    const item = {
      id: `kw-import-${Date.now()}-${index}`,
      project_id: projectId,
      keyword: term,
      intent: index % 2 === 0 ? 'Informational' : 'Commercial',
      volume: 600 + index * 180,
      difficulty: 20 + index * 7,
      relevance: 70 + index * 6,
      brand_fit: 70 + index * 5,
      channel: ['SEO blog', 'Website landing page', 'Instagram carousel'][index % 3],
      content_type: 'Imported topic',
      status: 'Imported',
      notes: 'Imported from pasted list',
      created_at: now,
    };

    db.prepare(
      `INSERT INTO keywords (id, project_id, keyword, intent, volume, difficulty, relevance, brand_fit, channel, content_type, status, notes, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      item.id,
      item.project_id,
      item.keyword,
      item.intent,
      item.volume,
      item.difficulty,
      item.relevance,
      item.brand_fit,
      item.channel,
      item.content_type,
      item.status,
      item.notes,
      item.created_at
    );

    created.push(item);
  });

  res.status(201).json({ keywords: created });
});

app.delete('/api/keywords/:id', (req, res) => {
  const { id } = req.params;
  const result = db.prepare('DELETE FROM keywords WHERE id = ?').run(id);

  if (result.changes === 0) {
    return res.status(404).json({ message: 'Keyword not found.' });
  }

  res.status(204).send();
});

const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Keyword planner API running on http://localhost:${PORT}`);
});
