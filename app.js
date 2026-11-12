// KI-Magazin – lädt data/articles.json und zeigt die Meldungen an.
// Die Datei wird jeden Morgen von der Claude-Code-Routine aktualisiert (siehe ROUTINE.md).

const RUBRIKEN = ["Alle", "Modelle", "Tools & Produkte", "Forschung", "Business", "Recht & Politik", "Gesellschaft"];

const state = { articles: [], rubric: "Alle", query: "" };

const $ = (id) => document.getElementById(id);

function formatDate(iso, withWeekday = false) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("de-DE", withWeekday
    ? { weekday: "long", day: "numeric", month: "long", year: "numeric" }
    : { day: "numeric", month: "short" });
}

function escapeHtml(s = "") {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function card(a) {
  const el = document.createElement("article");
  el.className = "card";
  el.innerHTML = `
    <div class="meta">
      <span class="rubric">${escapeHtml(a.rubrik)}</span>
      <span>${formatDate(a.datum)}</span>
      ${a.neu ? '<span class="badge">Neu</span>' : ""}
    </div>
    <h3>${escapeHtml(a.titel)}</h3>
    <p>${escapeHtml(a.zusammenfassung)}</p>
    ${a.warum_wichtig ? `<p class="why"><strong>Warum wichtig:</strong> ${escapeHtml(a.warum_wichtig)}</p>` : ""}
    <div class="source">Quelle: <a href="${escapeHtml(a.quelle_url)}" target="_blank" rel="noopener">${escapeHtml(a.quelle)} ↗</a></div>
  `;
  return el;
}

function renderRubrics() {
  const nav = $("rubrics");
  nav.innerHTML = "";
  for (const r of RUBRIKEN) {
    const b = document.createElement("button");
    b.textContent = r;
    b.setAttribute("aria-pressed", String(state.rubric === r));
    b.onclick = () => { state.rubric = r; renderRubrics(); renderList(); };
    nav.appendChild(b);
  }
}

function filtered() {
  const q = state.query.trim().toLowerCase();
  return state.articles.filter((a) =>
    (state.rubric === "Alle" || a.rubrik === state.rubric) &&
    (!q || [a.titel, a.zusammenfassung, a.quelle].join(" ").toLowerCase().includes(q))
  );
}

function renderList() {
  const items = filtered();
  const list = $("list");
  list.innerHTML = "";
  items.forEach((a) => list.appendChild(card(a)));
  $("empty").hidden = items.length > 0;
}

function renderTop(data) {
  const top = $("top");
  top.innerHTML = "";
  const tops = state.articles.filter((a) => a.top).slice(0, 3);
  tops.forEach((a) => top.appendChild(card(a)));
  top.hidden = tops.length === 0;

  if (data.briefing) {
    $("briefing-text").textContent = data.briefing;
    $("briefing").hidden = false;
  }
}

async function init() {
  renderRubrics();
  try {
    const res = await fetch("data/articles.json", { cache: "no-store" });
    const data = await res.json();
    if (data.name) { $("site-name").textContent = data.name; document.title = `${data.name} – Nachrichten aus der KI-Welt`; }
    if (data.untertitel) $("site-tagline").textContent = data.untertitel;
    state.articles = (data.artikel || []).sort((a, b) => (b.datum || "").localeCompare(a.datum || ""));
    $("edition-date").textContent = data.ausgabe ? `Ausgabe vom ${formatDate(data.ausgabe, true)}` : "";
    $("edition-count").textContent = `${state.articles.length} Meldungen`;
    renderTop(data);
    renderList();
  } catch (e) {
    $("list").innerHTML = '<p class="empty">Die Meldungen konnten nicht geladen werden. Läuft die Vorschau über einen lokalen Server? (siehe README)</p>';
    console.error(e);
  }
}

$("search").addEventListener("input", (e) => { state.query = e.target.value; renderList(); });
init();
