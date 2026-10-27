/* YOUR CONTENT SETTINGS — edit this first section. */
/* EDIT YOUR CONTENT HERE. Paths are relative to index.html.
   thumbnail: a .jpg, .png or .webp poster.
   video: a local .mp4 or a direct HTTPS MP4 URL; leave blank for poster-only work.
   watchUrl: a YouTube/Vimeo page URL for large videos; leave blank otherwise.
   sample: false when the project is your real work. */
window.PORTFOLIO = {
  // Put your photo in assets/images/, then change this image path.
  // fit: 'cover' fills the frame; 'contain' shows the entire photo/cutout.
  hero: { image: 'assets/images/shivam.png', alt: 'Shivam against purple and cyan studio lighting', fit: 'cover', position: '50% 50%' },
 
  socials: { Instagram: 'https://www.instagram.com/edithive.studio?psln=MTRtbGYzcmN0NWxrYg%3D%3D&utm_source=qr', LinkedIn: 'https://www.linkedin.com/in/shivam-vishwakarma-91b0b040a/' },
  projects: [
   {sample:true, year:'2026', video:'assets/videos/realestate.mp4', watchUrl:'', title:'Real Estate Reel', category:'video', label:'Animated Short / Edit',},
   {sample:true, year:'2026', video:'assets/videos/showreel.mp4', watchUrl:'', title:'Podcast Reel', category:'video', label:'Animated Short / Edit',},
    {sample:true, year:'2026', video:'assets/videos/APPLE.mp4', watchUrl:'', title:'Tech Style', category:'video', label:'Animated Short / Edit',},
    {sample:true, year:'2026', video:'assets/videos/sample1.mp4', watchUrl:'', title:'Motion Graphic', category:'video', label:'Animated Short / Edit',},
    {sample:true, year:'2026', video:'assets/videos/One8.mp4', watchUrl:'', title:'Documentary Style', category:'video', label:'Animated Short / Edit',},
};  
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  // Replace these sample studies with your real projects and assets.
  const config = window.PORTFOLIO || {};
  const projects = config.projects || [];
  const portrait = $('.hero-portrait');
  if(portrait) {
    const hero = config.hero || {};
    portrait.addEventListener('error', () => {
      portrait.src = 'assets/images/hero.webp';
      portrait.alt = 'Illustrated placeholder for Shivam’s portrait';
    }, {once:true});
    portrait.alt = hero.alt || 'Portrait of Shivam';
    portrait.style.objectFit = hero.fit === 'contain' ? 'contain' : 'cover';
    portrait.style.objectPosition = hero.position || '50% 50%';
    if(hero.image) portrait.src = hero.image;
  }

  const modal = $('#creative-modal');
  let previousFocus = null;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const artwork = p => p.thumbnail ? `<img src="${escape(p.thumbnail)}" width="540" height="960" loading="lazy" alt="${escape(p.title)} poster">` : `<div class="original-art art-${Number(p.art)}">${escape(p.words).replace(/&lt;br&gt;/g,'<br>')}</div>`;
  const projectMeta = p => `${p.sample ? 'Concept sample' : 'Personal project'} · ${escape(p.year || '')}`;
  const externalLink = value => { try { const url = new URL(value); return ['https:','http:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } };
  function mediaPreview(video, poster, className) {
    return `<video class="${className}" controls playsinline preload="metadata" ${poster ? `poster="${escape(poster)}"` : ''} src="${escape(video)}">Your browser does not support video playback.</video><p class="media-error" role="status" hidden>Could not load this video. Check the filename and try an MP4 encoded with H.264.</p>`;
  }

  const grid = $('#project-grid');
  projects.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project-card'; card.dataset.category = p.category;
    card.hidden = false;
    const url = externalLink(p.watchUrl);
    const media = p.video
      ? '<video class="project-inline-video" controls playsinline preload="metadata" aria-label="' + escape(p.title) + '" src="' + escape(p.video) + '"></video><button class="project-play" aria-label="Play ' + escape(p.title) + '"><span>▶</span><small>PLAY VIDEO</small></button><p class="project-status" role="status" hidden></p>'
      : artwork(p);
    card.innerHTML = '<div class="project-art">' + media + '</div><div class="project-info"><h3>' + escape(p.title) + '</h3><p>' + escape(p.label) + '</p><small>' + projectMeta(p) + '</small>' + (!p.video && url ? '<p><a class="text-link" href="' + escape(url) + '" target="_blank" rel="noopener noreferrer">Watch video ↗</a></p>' : '') + '</div>';
    grid.append(card);
    const video = card.querySelector('video');
    if (!video) return;
    const play = card.querySelector('.project-play');
    const status = card.querySelector('.project-status');
    video.addEventListener('loadedmetadata', () => {
      if (video.paused && video.currentTime === 0 && video.duration > .05) video.currentTime = .05;
    }, { once: true });
    play.addEventListener('click', () => {
      if (video.ended) video.currentTime = 0;
      const started = video.play();
      if (started) started.catch(() => {
        status.textContent = 'Could not start this video. Check the file or use the play control.';
        status.hidden = false;
      });
    });
    video.addEventListener('playing', () => { play.hidden = true; status.hidden = true; });
    video.addEventListener('ended', () => { play.hidden = false; });
    video.addEventListener('error', () => {
      status.textContent = 'Video unavailable. Check its filename and upload.';
      status.hidden = false;
    });
  });
  // Keep only one project video playing at a time.
  document.addEventListener('play', event => {
    if (event.target.tagName === 'VIDEO') {
      $$('video').forEach(video => { if (video !== event.target) video.pause(); });
    }
  }, true);
  function openModal(content) {
    previousFocus = document.activeElement;
    $('#modal-content').innerHTML = content;
    modal.classList.toggle('reel-dialog', Boolean($('.demo-stage, .reel-video', modal)));
    const video = $('video', modal);
    video?.addEventListener('error', () => { $('.media-error', modal).hidden = false; });
    modal.showModal(); document.body.classList.add('modal-open');
    modal.scrollTop = 0; $('.modal-close').focus();
  }
  function closeModal() { modal.close(); }
  modal.addEventListener('close', () => {
    $('video', modal)?.pause(); $('#modal-content').innerHTML = '';
    document.body.classList.remove('modal-open'); previousFocus?.focus();
  });
  $('.modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    const r = modal.getBoundingClientRect();
    if(e.target === modal && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) closeModal();
  });

  const header = $('.header'), menu = $('.menu');
  function setMenu(open) { header.classList.toggle('menu-open',open); menu.setAttribute('aria-expanded',String(open)); menu.setAttribute('aria-label',open ? 'Close menu' : 'Open menu'); }
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  $$('nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); } });
  document.addEventListener('click', e => { if(!header.contains(e.target)) setMenu(false); });
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if('IntersectionObserver' in window) {
    if(!motion.matches) document.documentElement.classList.add('js-motion');
    const reveal = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); reveal.unobserve(e.target); } }), {threshold:.08});
    $$('.reveal').forEach(s => reveal.observe(s));
    const active = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) $$('nav a').forEach(a => a.classList.toggle('active',a.hash === `#${e.target.id}`)); }), {rootMargin:'-15% 0px -60% 0px'});
    $$('main section[id]').filter(s => $(`nav a[href="#${s.id}"]`)).forEach(s => { if (!header.classList.contains('timeline-header')) active.observe(s); });
  }
  let scheduled = false;
  const updateScroll = () => { header.classList.toggle('scrolled',scrollY > 20); $('.back-top').classList.toggle('visible',scrollY > 500); scheduled = false; };
  addEventListener('scroll', () => { if(!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } },{passive:true}); updateScroll();
  $('.back-top').addEventListener('click', () => scrollTo({top:0,behavior:motion.matches ? 'instant' : 'smooth'}));
  $('#year').textContent = new Date().getFullYear();
  $$('[data-social]').forEach(button => {
    const platform = button.dataset.social;
    const url = externalLink(config.socials?.[platform]);
    if(url) {
      const link = document.createElement('a');
      link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.innerHTML = button.innerHTML; button.replaceWith(link);
    } else button.addEventListener('click', () => openModal(`<h2 id="modal-title">${escape(platform)}</h2><p>This profile is not connected yet. Add your ${escape(platform)} profile URL in the top of script.js.</p>`));
  });
  // A small, keyboard-accessible creative experiment. No continuous animation.
  const stages = [
    ['The idea','One message. One feeling. Start with the story.'],
    ['The structure','Find the hierarchy. Give every element a purpose.'],
    ['The personality','Add color, contrast and a little unexpected energy.'],
    ['The final frame','Refine the details until the whole composition clicks.']
  ];
  const scrubber = $('#creative-scrubber');
  function setStage(value) {
    const index = Number(value); const [title, description] = stages[index];
    $('#creative-preview').dataset.stage = String(index);
    $('#stage-title').textContent = title; $('#stage-description').textContent = description;
    $('#stage-count').textContent = `0${index + 1} / 04`;
    scrubber.value = String(index); scrubber.setAttribute('aria-valuetext',title);
    $$('[data-stage-button]').forEach((b,i) => { b.setAttribute('aria-pressed',String(i === index)); });
  }
  scrubber?.addEventListener('input', () => setStage(scrubber.value));
  $$('[data-stage-button]').forEach(b => b.addEventListener('click', () => setStage(b.dataset.stageButton)));
  if(scrubber) setStage(0);
  motion.addEventListener('change', () => {
    if(motion.matches) { document.documentElement.classList.remove('js-motion'); $$('.project-card').forEach(c => c.getAnimations().forEach(a => a.cancel())); }
  });
})();

/* Map section positions onto the editing ruler; update only when needed. */
(() => {
  const header = document.querySelector('.timeline-header');
  if (!header) return;
  const nav = header.querySelector('nav');
  const links = [...nav.querySelectorAll('a')];
  const sections = links.map(link => document.querySelector(link.hash));
  const playhead = nav.querySelector('.nav-playhead');
  const timecode = header.querySelector('.nav-timecode');
  let frame = 0;
  function renderTimeline() {
    frame = 0;
    const maximum = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    const y = Math.max(0, Math.min(scrollY, maximum));
    const stops = sections.map(section => Math.max(0, Math.min(maximum, section.getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0) - (parseFloat(getComputedStyle(section).scrollMarginTop) || 0) - 2)));
    let index = 0;
    while (index < stops.length - 1 && y >= stops[index + 1]) index++;
    const next = Math.min(index + 1, stops.length - 1);
    const span = stops[next] - stops[index];
    const fraction = span > 0 ? Math.max(0, Math.min(1, (y - stops[index]) / span)) : 0;
    const progress = (index + fraction) / (links.length - 1);
    const center = link => link.offsetLeft + link.offsetWidth / 2;
    playhead.style.transform = `translateX(${center(links[index]) + (center(links[next]) - center(links[index])) * fraction}px)`;
    header.style.setProperty('--timeline-progress', progress);
    const totalFrames = Math.round(progress * 180 * 30);
    const seconds = Math.floor(totalFrames / 30);
    timecode.textContent = [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60, totalFrames % 30].map(n => String(n).padStart(2, '0')).join(':');
    links.forEach((link, i) => {
      link.classList.toggle('active', i === index);
      if (i === index) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(renderTimeline); }
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule);
  addEventListener('load', schedule);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.body);
  document.fonts?.ready.then(schedule);
  schedule();
})();
