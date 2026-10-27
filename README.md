* {
  box-sizing: border-box;
}

:root {
  --bg: #09131d;
  --bg-soft: #0d1f2d;
  --panel: rgba(12, 21, 31, 0.95);
  --panel-strong: rgba(18, 29, 42, 0.98);
  --line: rgba(148, 169, 197, 0.12);
  --text: #edf5ff;
  --text-soft: #b4c9e8;
  --primary: #4a8dff;
  --primary-2: #59d0ff;
  --success: #60e0a8;
  --warning: #ffd166;
  --danger: #ff6b7a;
  --purple: #9a7cff;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  min-width: 100%;
  background:
    radial-gradient(circle at top left, rgba(74, 141, 255, 0.18), transparent 25%),
    linear-gradient(180deg, #071018 0%, #0a1624 100%);
  color: var(--text);
  font-family: Inter, 'Segoe UI', sans-serif;
}

body {
  min-height: 100vh;
}

button,
input,
select {
  font: inherit;
}

button {
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  color: white;
  cursor: pointer;
  padding: 0.8rem 1rem;
  font-weight: 700;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

button:hover {
  transform: translateY(-1px);
}

input,
select {
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: rgba(18, 29, 42, 0.8);
  color: var(--text);
  padding: 0.8rem 0.85rem;
}

input::placeholder {
  color: rgba(195, 213, 238, 0.65);
}

.saas-shell {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.sidebar {
  width: 260px;
  background: rgba(10, 17, 25, 0.96);
  border-right: 1px solid var(--line);
  padding: 1.5rem 1rem;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 2rem;
}

.brand-mark {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary), var(--purple));
  display: grid;
  place-items: center;
  font-weight: 800;
}

.label {
  display: block;
  margin: 0 0 0.35rem;
  color: var(--text-soft);
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.brand-block h2,
.sidebar-card h3,
.panel-header h3,
.topbar h1,
.stat-card strong,
.opportunity-row strong,
.keyword-cell strong,
.brief-card h4 {
  margin: 0;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.nav-item {
  width: 100%;
  text-align: left;
  padding: 0.8rem 0.9rem;
  border-radius: 12px;
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-soft);
  font-weight: 600;
}

.nav-item.active {
  background: rgba(74, 141, 255, 0.12);
  border-color: rgba(74, 141, 255, 0.2);
  color: var(--text);
}

.sidebar-card {
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 18px;
  background: rgba(18, 29, 42, 0.8);
  border: 1px solid var(--line);
}

.sidebar-card p {
  margin: 0.4rem 0 0;
  color: var(--text-soft);
}

.status-badge {
  display: inline-flex;
  margin-top: 0.85rem;
  padding: 0.38rem 0.7rem;
  background: rgba(96, 224, 168, 0.12);
  border: 1px solid rgba(96, 224, 168, 0.35);
  color: var(--success);
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 700;
}

.main-panel {
  flex: 1;
  padding: 1.5rem;
}

.topbar {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.2rem;
}

.topbar h1 {
  font-size: clamp(2rem, 3vw, 2.8rem);
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  min-width: min(100%, 520px);
}

.search-box {
  flex: 1;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.stat-card {
  background: rgba(15, 24, 36, 0.9);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.stat-card.accent {
  background: linear-gradient(135deg, rgba(74, 141, 255, 0.2), rgba(89, 208, 255, 0.08));
}

.stat-card span,
.stat-card small {
  color: var(--text-soft);
}

.stat-card strong {
  font-size: 2rem;
  line-height: 1.1;
}

.insight-grid,
.workspace-grid,
.bottom-grid {
  display: grid;
  gap: 1rem;
}

.insight-grid {
  grid-template-columns: 1.2fr 0.8fr;
  margin-bottom: 1rem;
}

.panel {
  background: rgba(13, 22, 33, 0.95);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1rem 1.1rem;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.panel-header h3 {
  font-size: 1.1rem;
}

.split-header {
  margin-bottom: 0.9rem;
}

.bar-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bar-row {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.bar-meta {
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
  font-size: 0.9rem;
  color: var(--text-soft);
}

.bar-track {
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--primary), var(--primary-2));
}

.opportunity-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.opportunity-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 0.8rem 0.75rem;
  border-radius: 12px;
  background: rgba(18, 29, 42, 0.8);
  border: 1px solid var(--line);
}

.opportunity-row small {
  display: block;
  margin-top: 0.28rem;
  color: var(--text-soft);
}

.pill {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.35rem 0.55rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
}

.pill.high {
  background: rgba(96, 224, 168, 0.12);
  color: var(--success);
  border: 1px solid rgba(96, 224, 168, 0.25);
}

.pill.medium {
  background: rgba(255, 209, 102, 0.14);
  color: var(--warning);
  border: 1px solid rgba(255, 209, 102, 0.2);
}

.pill.low {
  background: rgba(255, 107, 122, 0.1);
  color: var(--danger);
  border: 1px solid rgba(255, 107, 122, 0.2);
}

.workspace-grid {
  grid-template-columns: 1.5fr 0.8fr;
  margin-bottom: 1rem;
}

.project-form {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.2fr auto;
  gap: 0.7rem;
  margin-bottom: 0.9rem;
}

.table-header-row {
  margin: 0.7rem 0 0.5rem;
}

.table-controls {
  display: grid;
  grid-template-columns: 1.2fr 0.7fr 0.9fr;
  gap: 0.7rem;
}

.keyword-table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 860px;
  border-collapse: collapse;
}

th, td {
  border-bottom: 1px solid var(--line);
  padding: 0.8rem 0.7rem;
  text-align: left;
  vertical-align: top;
}

th {
  color: var(--text-soft);
  font-size: 0.74rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.keyword-cell {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.keyword-cell small,
td small {
  color: var(--text-soft);
}

.selected-row {
  background: rgba(74, 141, 255, 0.08);
}

.danger-button {
  background: rgba(255, 107, 122, 0.12);
  border: 1px solid rgba(255, 107, 122, 0.18);
  color: var(--danger);
}

.side-panel {
  min-height: 100%;
}

.brief-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.brief-card {
  background: rgba(18, 29, 42, 0.8);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 0.85rem 0.9rem;
}

.brief-card h4 {
  font-size: 1.05rem;
}

.brief-card p,
.brief-card li {
  color: var(--text-soft);
  margin: 0;
}

.brief-card ol {
  margin: 0.2rem 0 0 1.2rem;
  padding: 0;
}

.muted-text {
  color: var(--text-soft);
  margin: 0;
}

.bottom-grid {
  grid-template-columns: 1.2fr 0.8fr;
}

.entry-form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.field-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}

.channel-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}

.channel-pill {
  background: rgba(18, 29, 42, 0.8);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 0.8rem 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
}

.channel-pill span {
  color: var(--text-soft);
}

.secondary-button {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--line);
  color: var(--text);
}

@media (max-width: 1100px) {
  .saas-shell {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--line);
  }

  .workspace-grid,
  .insight-grid,
  .bottom-grid,
  .stats-grid,
  .project-form,
  .field-row,
  .table-controls {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-direction: column;
    align-items: stretch;
  }

  .topbar-actions {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
  }
}
