* {
  box-sizing: border-box;
}

:root {
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.5;
  color: #eaf2ff;
  background: #08111d;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  min-width: 100%;
  background: linear-gradient(180deg, #08111d 0%, #101e2e 100%);
}

body {
  min-height: 100vh;
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #4d8cff, #45b6ff);
  color: white;
  cursor: pointer;
  padding: 0.8rem 1rem;
  font-weight: 600;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(69, 182, 255, 0.2);
}

button.secondary {
  background: #13263f;
  border: 1px solid #2d4d73;
}

button.danger {
  background: #341724;
  color: #ffbfd3;
  border: 1px solid rgba(255, 135, 165, 0.3);
}

input,
select,
textarea {
  width: 100%;
  border-radius: 10px;
  border: 1px solid #2a4462;
  background: rgba(13, 22, 33, 0.9);
  color: #edf5ff;
  padding: 0.75rem 0.8rem;
}

textarea {
  resize: vertical;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  font-size: 0.88rem;
  color: #bfd7f8;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

.app-shell {
  width: min(1440px, calc(100% - 30px));
  margin: 0 auto;
  padding: 2rem 0 3rem;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.eyebrow {
  margin-bottom: 0.35rem;
  font-size: 0.76rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8ec8ff;
}

h1 {
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  margin-bottom: 0;
}

h2 {
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
}

h3 {
  font-size: 1rem;
  margin-bottom: 0.7rem;
}

.actions {
  display: flex;
  gap: 0.8rem;
}

.panel,
.stat-card {
  background: rgba(14, 24, 36, 0.9);
  border: 1px solid #233958;
  border-radius: 18px;
  box-shadow: 0 18px 32px rgba(0, 0, 0, 0.18);
}

.project-strip {
  padding: 1rem 1.1rem;
  margin-bottom: 1.2rem;
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.8rem;
}

.project-header p {
  margin-bottom: 0;
  color: #9bb9dc;
}

.project-form {
  display: grid;
  grid-template-columns: 1.2fr 1.2fr 1.2fr auto;
  gap: 0.8rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.stat-card {
  padding: 1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.stat-card span {
  color: #a7c0dd;
  font-size: 0.8rem;
}

.stat-card strong {
  font-size: 1.8rem;
}

.panel-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.panel {
  padding: 1rem 1.1rem;
}

.keyword-form,
.filters,
.import-box {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.button-row {
  display: flex;
  gap: 0.8rem;
}

.mini-summary {
  margin-top: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.channel-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(20, 35, 52, 0.9);
  border: 1px solid #2c4967;
  border-radius: 10px;
  padding: 0.7rem 0.8rem;
}

.import-box {
  margin-top: 1.4rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1.5fr 0.8fr;
  gap: 1rem;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 950px;
}

th,
td {
  padding: 0.8rem 0.7rem;
  border-bottom: 1px solid #223a57;
  text-align: left;
  vertical-align: top;
}

th {
  color: #a8c0de;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.keyword-cell {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.keyword-cell small,
td small {
  color: #9bb4d6;
  display: block;
}

.selected-row {
  background: rgba(31, 63, 92, 0.3);
}

.pill {
  display: inline-flex;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  border: 1px solid rgba(98, 153, 255, 0.5);
  background: rgba(94, 142, 255, 0.12);
  color: #d0e7ff;
}

.pill.high-priority {
  background: rgba(84, 255, 167, 0.12);
  border-color: rgba(84, 255, 167, 0.3);
  color: #b5ffd7;
}

.pill.medium {
  background: rgba(255, 191, 92, 0.15);
  border-color: rgba(255, 191, 92, 0.35);
  color: #ffdca7;
}

.pill.low {
  background: rgba(255, 119, 119, 0.12);
  border-color: rgba(255, 119, 119, 0.3);
  color: #ffc1c1;
}

.brief-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.brief-block {
  background: rgba(16, 31, 45, 0.85);
  border: 1px solid #2c4967;
  border-radius: 12px;
  padding: 0.85rem 0.9rem;
}

.label {
  display: inline-block;
  margin-bottom: 0.55rem;
  color: #88c1ff;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.brief-block ul,
.brief-block ol {
  margin: 0;
  padding-left: 1.2rem;
  color: #dfeafc;
}

.brief-block li + li {
  margin-top: 0.35rem;
}

.brief-block p {
  margin-bottom: 0;
  color: #dfeafc;
}

@media (max-width: 980px) {
  .project-form,
  .stats-grid,
  .panel-grid,
  .field-row,
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .topbar,
  .project-header,
  .actions,
  .button-row {
    flex-direction: column;
    align-items: stretch;
  }
}
