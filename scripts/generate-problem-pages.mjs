// Generates one static, crawlable HTML page per problem, plus an index and a
// sitemap, into dist/ after the Vite build.
//
// Why: the app is a single JavaScript document, so Google sees one page and
// none of the 1000 problems. A student searching the text of a problem at 11pm
// cannot currently find this site at all. These pages exist to be found, and to
// hand the reader into the app to actually solve the thing.
//
// SAFETY: questions are read from the `public_questions` view, which
// deliberately excludes `answer` and `explanation` (a committed answer key was
// the top finding of the June audit). The pages therefore carry the problem and
// its choices and nothing else. assertNoAnswerKey below fails the build rather
// than emitting a page if that view ever starts returning those columns.

import { writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import katex from 'katex';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT = path.join(ROOT, 'dist');
const PROBLEM_DIR = path.join(OUT, 'problems');

const SUPABASE_URL = 'https://vhodgagwcxoooqnmfpbo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_SXqKKIMvbNZJFq9OzM0uHA_3FGZf84v';
// Trailing slash matters: canonical URLs and the sitemap are built from it.
const SITE = (process.env.SITE_URL || 'https://daniyalriz.github.io/UIL-General-Math-Practice/').replace(/\/?$/, '/');

const FIELDS = 'id,title,topic,difficulty,source,question,choices,tags,image,image_alt,date_added,original_test,original_question_number';

const escapeHtml = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

// Same splitting rule as MathText in js/src/hooks.jsx, so a problem reads the
// same here as it does in the app. A plain $ is money and is left alone.
function renderMath(text) {
  const parts = String(text ?? '').split(/(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g);
  return parts.map(part => {
    if (!part) return '';
    const display = part.startsWith('\\[') && part.endsWith('\\]');
    const inline = part.startsWith('\\(') && part.endsWith('\\)');
    if (display || inline) {
      const tex = part.slice(2, part.length - 2);
      try { return katex.renderToString(tex, { displayMode: display, throwOnError: false }); }
      catch (e) { return escapeHtml(tex); }
    }
    return escapeHtml(part);
  }).join('');
}

// Plain text for <title> and meta description: markup and TeX delimiters would
// be noise in a search result.
const plain = (s) => String(s ?? '')
  .replace(/\\\[([\s\S]*?)\\\]/g, '$1')
  .replace(/\\\(([\s\S]*?)\\\)/g, '$1')
  .replace(/\s+/g, ' ')
  .trim();

const slugify = (s) => plain(s).toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'problem';

const pageName = (q) => `${q.id}-${slugify(q.title)}.html`;

function assertNoAnswerKey(rows) {
  const leaked = ['answer', 'explanation', 'solution', 'correct_answer'];
  for (const row of rows) {
    for (const key of leaked) {
      if (key in row) {
        throw new Error(
          `Refusing to generate: public_questions returned "${key}". These pages are public files; ` +
          `publishing the answer key was the June audit's top finding. Fix the view before rebuilding.`);
      }
    }
  }
}

async function fetchQuestions() {
  const rows = [];
  const pageSize = 1000;
  for (let from = 0; ; from += pageSize) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/public_questions?select=${FIELDS}&order=id.asc`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Range: `${from}-${from + pageSize - 1}`,
      },
    });
    if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
    const batch = await res.json();
    rows.push(...batch);
    if (batch.length < pageSize) break;
  }
  return rows;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// Every stored choice carries its own "(A) " prefix. The app strips it and draws
// the letter as a badge (see ProblemView in js/src/problemView.jsx); without the
// same strip these pages render "A (A) $1800.00".
const stripChoiceLetter = (c) => String(c ?? '').replace(/^\([A-E]\)\s*/, '');

const SHELL = (0, ({ title, description, canonical, body, depth }) => {
  const up = '../'.repeat(depth);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}"/>
<link rel="canonical" href="${escapeHtml(canonical)}"/>
<link rel="icon" href="${up}assets/favicon.svg" type="image/svg+xml"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${up}problems/katex/katex.min.css">
<style>
  :root { color-scheme: light dark; --bg:#f8fafc; --card:#fff; --text:#0f172a; --muted:#64748b; --line:#e2e8f0; --accent:#2563eb; }
  @media (prefers-color-scheme: dark) {
    :root { --bg:#020617; --card:#0f172a; --text:#f1f5f9; --muted:#94a3b8; --line:#1e293b; --accent:#60a5fa; }
  }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--text); font-family:'Inter',system-ui,sans-serif; line-height:1.6; }
  .wrap { max-width:44rem; margin:0 auto; padding:2rem 1.25rem 4rem; }
  a { color:var(--accent); }
  .brand { display:inline-flex; align-items:center; gap:.5rem; font-family:'Fraunces',Georgia,serif; font-weight:900; color:var(--text); text-decoration:none; font-size:1.05rem; }
  h1 { font-family:'Fraunces',Georgia,serif; font-weight:900; font-size:1.9rem; line-height:1.2; margin:1.5rem 0 .75rem; }
  .meta { display:flex; flex-wrap:wrap; gap:.5rem; align-items:center; margin-bottom:1rem; font-size:.8rem; color:var(--muted); }
  .chip { border:1px solid var(--line); border-radius:.5rem; padding:.15rem .55rem; font-weight:600; }
  .card { background:var(--card); border:1px solid var(--line); border-radius:1rem; padding:1.25rem; }
  .q { font-size:1.05rem; margin:0 0 1rem; }
  ol.choices { list-style:none; margin:0; padding:0; display:grid; gap:.5rem; }
  ol.choices li { border:1px solid var(--line); border-radius:.6rem; padding:.6rem .85rem; display:flex; gap:.65rem; }
  ol.choices .k { font-weight:700; color:var(--muted); }
  .cta { display:inline-block; margin-top:1.25rem; background:var(--accent); color:#fff; text-decoration:none; font-weight:700; padding:.7rem 1.2rem; border-radius:.7rem; }
  .note { font-size:.85rem; color:var(--muted); margin-top:.75rem; }
  figure { margin:1rem 0; text-align:center; } figure img { max-width:100%; border-radius:.6rem; border:1px solid var(--line); }
  footer { margin-top:2.5rem; padding-top:1.25rem; border-top:1px solid var(--line); font-size:.85rem; color:var(--muted); }
  ul.list { list-style:none; padding:0; margin:1rem 0; display:grid; gap:.4rem; }
  ul.list a { display:block; padding:.6rem .8rem; border:1px solid var(--line); border-radius:.6rem; background:var(--card); text-decoration:none; }
  ul.list .sub { display:block; font-size:.78rem; color:var(--muted); }
  .overflow { overflow-x:auto; }
</style>
</head>
<body>
<div class="wrap">
  <a class="brand" href="${up}index.html"><img src="${up}assets/logo-icon.svg" alt="" width="26" height="26"/> UIL Math Practice</a>
  ${body}
  <footer>
    Practice UIL General Mathematics with real competition questions.
    <a href="${up}app.html">Open the practice app</a> &middot;
    <a href="${up}problems/">All problems</a> &middot;
    <a href="${up}privacy.html">Privacy</a> &middot;
    <a href="${up}terms.html">Terms</a>
  </footer>
</div>
</body>
</html>`;
});

function problemPage(q) {
  const title = plain(q.title) || `Problem #${q.id}`;
  const src = [q.source || q.original_test, q.original_question_number ? `Problem ${q.original_question_number}` : null]
    .filter(Boolean).join(' • ');
  const choices = Array.isArray(q.choices) ? q.choices : [];
  const appUrl = `../app.html?id=${q.id}`;

  // JSON-LD without an acceptedAnswer: this page states the question only.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Question',
    name: title,
    text: plain(q.question),
    ...(q.topic ? { about: q.topic } : {}),
  };

  const body = `
  <h1>${escapeHtml(title)}</h1>
  <div class="meta">
    ${q.topic ? `<span class="chip">${escapeHtml(q.topic)}</span>` : ''}
    ${q.difficulty ? `<span class="chip">${escapeHtml(q.difficulty)}</span>` : ''}
    ${src ? `<span class="chip">${escapeHtml(src)}</span>` : ''}
    ${q.date_added ? `<span>Added ${escapeHtml(new Date(q.date_added).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }))}</span>` : ''}
  </div>
  <div class="card">
    <p class="q overflow">${renderMath(q.question)}</p>
    ${q.image ? `<figure><img src="${escapeHtml(q.image)}" alt="${escapeHtml(q.image_alt || 'Figure for this problem')}" loading="lazy"/></figure>` : ''}
    <ol class="choices">
      ${choices.map((c, i) => `<li><span class="k">${LETTERS[i] || i + 1}</span><span class="overflow">${renderMath(stripChoiceLetter(c))}</span></li>`).join('\n      ')}
    </ol>
    <a class="cta" href="${appUrl}">Solve this problem</a>
    <p class="note">Answers and worked solutions are in the practice app, which also tracks your accuracy and timing.</p>
  </div>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;

  return SHELL({
    title: `${title}: UIL Math Practice`,
    description: plain(q.question).slice(0, 155),
    canonical: `${SITE}problems/${pageName(q)}`,
    body,
    depth: 1,
  });
}

function indexPage(questions) {
  const byTopic = new Map();
  questions.forEach(q => {
    const t = q.topic || 'Other';
    if (!byTopic.has(t)) byTopic.set(t, []);
    byTopic.get(t).push(q);
  });

  const body = `
  <h1>All problems</h1>
  <p class="note">${questions.length} UIL General Mathematics problems from invitational, district, regional, state, and TMSCA tests.</p>
  ${[...byTopic.entries()].map(([topic, list]) => `
  <h2 style="font-family:'Fraunces',Georgia,serif;font-size:1.25rem;margin-top:2rem;">${escapeHtml(topic)} <span style="color:var(--muted);font-weight:400;font-size:.9rem;">(${list.length})</span></h2>
  <ul class="list">
    ${list.map(q => `<li><a href="${pageName(q)}"><strong>${escapeHtml(plain(q.title) || 'Problem #' + q.id)}</strong><span class="sub">${escapeHtml(q.difficulty || '')}${q.source ? ' &middot; ' + escapeHtml(q.source) : ''}</span></a></li>`).join('\n    ')}
  </ul>`).join('')}`;

  return SHELL({
    title: 'All problems: UIL Math Practice',
    description: `Browse all ${questions.length} UIL General Mathematics practice problems by topic.`,
    canonical: `${SITE}problems/`,
    body,
    depth: 1,
  });
}

function sitemap(questions) {
  const urls = [
    SITE,
    `${SITE}app.html`,
    `${SITE}problems/`,
    ...questions.map(q => `${SITE}problems/${pageName(q)}`),
    `${SITE}privacy.html`,
    `${SITE}terms.html`,
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${escapeHtml(u)}</loc></url>`).join('\n')}
</urlset>
`;
}

async function main() {
  if (!existsSync(OUT)) throw new Error('dist/ not found. Run `vite build` first.');

  const questions = await fetchQuestions();
  if (questions.length === 0) throw new Error('public_questions returned no rows.');
  assertNoAnswerKey(questions);

  await rm(PROBLEM_DIR, { recursive: true, force: true });
  await mkdir(PROBLEM_DIR, { recursive: true });

  // KaTeX ships its own CSS and fonts. These pages are standalone documents, so
  // they cannot reuse the app's hashed bundle and need their own copy.
  await cp(path.join(ROOT, 'node_modules/katex/dist/katex.min.css'), path.join(PROBLEM_DIR, 'katex/katex.min.css'));
  await cp(path.join(ROOT, 'node_modules/katex/dist/fonts'), path.join(PROBLEM_DIR, 'katex/fonts'), { recursive: true });

  await Promise.all(questions.map(q => writeFile(path.join(PROBLEM_DIR, pageName(q)), problemPage(q))));
  await writeFile(path.join(PROBLEM_DIR, 'index.html'), indexPage(questions));
  await writeFile(path.join(OUT, 'sitemap.xml'), sitemap(questions));
  await writeFile(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}sitemap.xml\n`);

  console.log(`Generated ${questions.length} problem pages + index, sitemap.xml, robots.txt`);
}

main().catch(e => { console.error(e.message); process.exit(1); });
