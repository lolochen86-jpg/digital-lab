const categories = { all: '全部作品', game: '遊戲', ai: 'AI 應用', sports: '運動數據', education: '教育', '3d': '3D 創作' };
const stageLabels = { prototype: '開發原型', active: '持續開發', concept: '概念實驗' };
const iconNames = { all: '◈', game: '✚', ai: '✳', sports: '▥', education: '▤', '3d': '⬡' };
const main = document.querySelector('main');
const state = { category: 'all', query: '', projects: [], updatedAt: '' };
const escape = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const art = (project, className = '') => `<div class="project-art art-${escape(project.visual)} ${className}"><img src="./assets/${escape(project.visual)}.svg" alt="${escape(project.title)} 概念視覺，非實際畫面" loading="lazy"><span class="art-caption">CONCEPT VISUAL</span></div>`;
function hasVerifiedLink(project) {
  try { const u = new URL(project.url); return u.protocol === 'https:' && !u.username && !u.password && project.linkVerification?.status === 'verified' && project.linkVerification.url === project.url; } catch { return false; }
}
function card(project, featured = false) {
  return `<article class="project-card ${featured ? 'featured-card' : ''}"><a class="card-link" href="#/project/${encodeURIComponent(project.id)}" aria-label="查看 ${escape(project.title)} 作品介紹">${art(project)}<div class="card-content"><div class="card-meta"><span>${escape(categories[project.category])}</span><span class="stage"><i></i>${escape(stageLabels[project.stage])}</span></div><h3>${escape(project.title)}<span class="card-arrow" aria-hidden="true">↗</span></h3><p>${escape(project.summary)}</p><div class="card-tags">${project.tags.slice(0, 3).map(tag => `<span>${escape(tag)}</span>`).join('')}<span class="link-state">${hasVerifiedLink(project) ? '網站已驗證' : '上線資訊待確認'}</span></div></div></a></article>`;
}
function home() {
  document.title = 'Digital Lab — 讓想像開始運行';
  const featured = state.projects.filter(p => p.featured).slice(0, 2);
  main.innerHTML = `<section class="hero" aria-labelledby="hero-title"><div class="hero-copy"><div class="eyebrow"><span class="live-dot"></span> A SPACE FOR DIGITAL POSSIBILITIES</div><h1 id="hero-title">讓想像<br><span>開始運行</span><span class="title-period">.</span></h1><p>從一個想法，到可以探索的作品。<br>在遊戲、AI 與數位體驗之間，持續實驗、創作與連結。</p><div class="hero-actions"><a class="button primary" href="#works">探索所有作品 <span aria-hidden="true">↗</span></a><a class="quiet-link" href="#about">認識 Digital Lab <span aria-hidden="true">→</span></a></div><div class="hero-footnote"><span>IDEAS → EXPERIMENTS → EXPERIENCES</span><span>01 / ∞</span></div></div><div class="hero-art"><img src="./assets/lab-orbit.svg" alt="紫色環形裝置與粒子軌道構成的數位實驗室概念藝術" fetchpriority="high"><div class="art-label top"><i></i> CREATIVE SYSTEM / ONLINE</div><div class="art-label bottom"><span>EXPERIMENT NO. 001</span><span>IMAGINATION IN MOTION ↗</span></div></div></section>
  <div class="discipline-strip" aria-label="創作領域"><span>PLAY.</span><span>THINK.</span><span>EXPLORE.</span><span>CREATE.</span><span class="strip-note">不同領域，同一份好奇心 <i>✳</i></span></div>
  ${featured.length ? `<section class="section featured" id="featured"><div class="section-heading"><div><div class="eyebrow subdued">01 / SELECTED EXPERIMENTS</div><h2>精選網站<span class="tiny-mark">↗</span></h2></div><p>從這裡，看看我們正在探索什麼。</p></div><div class="featured-grid">${featured.map(p => card(p, true)).join('')}</div></section>` : ''}
  <section class="section works" id="works" aria-labelledby="works-title"><div class="section-heading"><div><div class="eyebrow subdued">02 / PROJECT ARCHIVE</div><h2 id="works-title">探索作品<span class="count">${String(state.projects.length).padStart(2,'0')}</span></h2></div><p>每一次嘗試，都是下一個可能。</p></div><div class="filter-bar"><div class="categories" role="group" aria-label="作品分類">${Object.entries(categories).map(([key,label]) => `<button class="category ${state.category === key ? 'active' : ''}" data-category="${key}" aria-pressed="${state.category === key}"><span aria-hidden="true">${iconNames[key]}</span>${label}</button>`).join('')}</div><label class="search-box"><span aria-hidden="true">⌕</span><input type="search" id="project-search" placeholder="搜尋作品、關鍵字…" aria-label="搜尋作品、關鍵字" value="${escape(state.query)}" autocomplete="off"><span class="search-shortcut" aria-hidden="true">/</span></label></div><div class="result-bar"><p id="result-count" aria-live="polite"></p><button class="text-button" id="clear-filters" hidden>重設篩選 ×</button></div><div class="project-grid" id="project-grid"></div></section>
  <section class="about section" id="about"><div class="about-mark" aria-hidden="true">✳</div><div class="about-copy"><div class="eyebrow subdued">03 / THE LAB MINDSET</div><h2>好奇心是起點，<br><span>創作沒有邊界。</span></h2><p>Digital Lab 是一個獨立數位創作品牌，將遊戲、人工智慧、運動數據、教育與 3D 創作放在同一張工作桌上。</p><p>我們記錄進行中的探索，也分享逐漸成形的作品。每個項目都從真實的興趣出發，在嘗試與調整中向前一步。</p><div class="about-principles"><span><i>01</i> 從好奇出發</span><span><i>02</i> 在實作中學習</span><span><i>03</i> 讓作品說話</span></div></div></section>
  <section class="collaboration section" id="collaborate"><div><div class="eyebrow subdued">OPEN TO WHAT'S NEXT</div><h2>下一個可能，<br>也許來自一起創作。</h2><p>開發者作品連結、完整展示頁與品牌合作，是實驗室的下一步。</p></div><div class="collaboration-status"><span class="outline-symbol" aria-hidden="true">↗</span><span><i class="live-dot"></i> 合作計畫籌備中</span><p>正式開放時，將在這裡公布合作方式。</p></div></section>`;
  document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => {
    state.category = button.dataset.category;
    document.querySelectorAll('[data-category]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    renderResults();
  }));
  document.querySelector('#project-search').addEventListener('input', e => { state.query = e.target.value; renderResults(); });
  document.querySelector('#clear-filters').addEventListener('click', () => { state.query = ''; state.category = 'all'; home(); document.querySelector('#project-search').focus(); });
  renderResults();
}
function renderResults() {
  const query = state.query.trim().toLocaleLowerCase();
  const result = state.projects.filter(p => (state.category === 'all' || p.category === state.category) && [p.title, p.summary, p.description, ...p.tags, categories[p.category]].join(' ').toLocaleLowerCase().includes(query));
  document.querySelector('#result-count').textContent = `${categories[state.category]} · ${result.length} 件作品`;
  document.querySelector('#clear-filters').hidden = !query && state.category === 'all';
  document.querySelector('#project-grid').innerHTML = result.length ? result.map(p => card(p)).join('') : `<div class="empty-state"><span aria-hidden="true">◌</span><h3>${query ? '還沒有找到這個關鍵字' : '這個領域，下一個實驗正在等待開始。'}</h3><p>${query ? '試試其他作品名稱或關鍵字，或重設篩選。' : `${escape(categories[state.category])}目前沒有公開作品，歡迎先探索其他分類。`}</p></div>`;
}
function detail(id) {
  const project = state.projects.find(p => p.id === id);
  if (!project) {
    document.title = '找不到作品 — Digital Lab';
    main.innerHTML = `<section class="section not-found"><div class="eyebrow">404 / EXPERIMENT NOT FOUND</div><h1>這件作品目前無法瀏覽。</h1><p>作品可能尚未公開，或連結已變更。</p><a href="#works" class="button primary">回到作品列表 →</a></section>`;
    return;
  }
  document.title = `${project.title} — Digital Lab`;
  const verified = hasVerifiedLink(project);
  const related = state.projects.filter(p => p.id !== id).slice(0, 3);
  main.innerHTML = `<section class="detail-intro section"><a href="#works" class="quiet-link back-link">← 回到所有作品</a><div class="eyebrow subdued">${escape(categories[project.category])} / PROJECT NOTES</div><div class="detail-heading"><h1>${escape(project.title)}</h1><span class="stage"><i></i>${escape(stageLabels[project.stage])}</span></div><p class="detail-lede">${escape(project.summary)}</p><div class="detail-tags">${project.tags.map(t => `<span>${escape(t)}</span>`).join('')}</div>${art(project, 'detail-art')}</section><section class="detail-body section"><div><div class="eyebrow subdued">ABOUT THE EXPERIMENT</div><h2>關於這件作品</h2><div class="description">${project.description.split('\n').filter(Boolean).map(p => `<p>${escape(p)}</p>`).join('')}</div><div class="project-note"><span>資料狀態</span><p>${verified ? '已確認公開網站可開啟；功能與資料更新以原網站標示為準。' : '依現有專案整理，作品介紹與公開版本仍待確認。'}上方為概念視覺，並非實際產品截圖。</p></div>${project.category === 'sports' ? '<p class="sports-note">運動數據僅供研究與學習，不代表即時、完整或已校準的預測，亦不構成投注建議。</p>' : ''}</div><aside class="project-access"><div class="eyebrow subdued">PROJECT ACCESS</div><h3>${verified ? '前往實際網站' : '作品入口準備中'}</h3><p>${verified ? '此網址已完成可用性檢查。作品的最新狀態，請以實際網站為準。' : '目前尚無通過驗證的公開網址。確認網站可用後，這裡會提供正式入口。'}</p>${verified ? `<a class="button primary" href="${escape(project.url)}" target="_blank" rel="noopener noreferrer">開啟作品網站 ↗</a><small>連結檢查：${escape(project.linkVerification.checkedAt.slice(0,10))}</small>` : '<span class="pending-label"><i></i> 上線資訊待確認</span>'}<dl><div><dt>創作領域</dt><dd>${escape(categories[project.category])}</dd></div><div><dt>目前階段</dt><dd>${escape(stageLabels[project.stage])}</dd></div><div><dt>資料更新</dt><dd>${escape(state.updatedAt)}</dd></div></dl></aside></section><section class="section related"><div class="section-heading"><h2>繼續探索</h2><a class="quiet-link" href="#works">所有作品 ↗</a></div><div class="project-grid">${related.map(p => card(p)).join('')}</div></section>`;
}
function route() {
  const hash = location.hash;
  if (hash.startsWith('#/project/')) {
    try { detail(decodeURIComponent(hash.slice(10))); } catch { detail(''); }
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  } else {
    if (!document.querySelector('.hero')) home();
    if (['#works', '#about', '#collaborate', '#featured'].includes(hash)) document.querySelector(hash)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    else window.scrollTo(0, 0);
  }
}
document.querySelector('#disclaimer-button').addEventListener('click', () => { const note = document.querySelector('#disclaimer'); note.classList.toggle('emphasized'); note.scrollIntoView({ block: 'nearest' }); });
document.addEventListener('keydown', e => { if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && document.querySelector('#project-search')) { e.preventDefault(); document.querySelector('#project-search').focus(); } });
try {
  const response = await fetch('./data/catalog.json');
  if (!response.ok) throw new Error('資料暫時無法讀取');
  const data = await response.json();
  if (data.schemaVersion !== 1 || !Array.isArray(data.projects)) throw new Error('資料格式不符');
  state.projects = data.projects.filter(p => !p.hidden).sort((a, b) => a.order - b.order);
  state.updatedAt = data.updatedAt;
  document.querySelector('#updated-date').textContent = `資料更新 ${data.updatedAt}`;
  route();
  window.addEventListener('hashchange', route);
} catch {
  main.innerHTML = '<section class="section not-found"><h1>實驗室暫時無法載入</h1><p>作品資料讀取失敗，請稍後重新整理。</p><button class="button primary" id="retry">重新載入 ↻</button></section>';
  document.querySelector('#retry').addEventListener('click', () => location.reload());
}
