/* YOUR CONTENT SETTINGS — edit this first section. */
/* EDIT YOUR CONTENT HERE. Paths are relative to index.html.
   thumbnail: a .jpg, .png or .webp poster.
   video: a local .mp4 or a direct HTTPS MP4 URL; leave blank for poster-only work.
   watchUrl: a YouTube/Vimeo page URL for large videos; leave blank otherwise.
   sample: false when the project is your real work. */
window.PORTFOLIO = {
  // Put your photo in assets/images/, then change this image path.
  // fit: 'cover' fills the frame; 'contain' shows the entire photo/cutout.
  hero: { image: 'assets/images/shivam-studio.png', original: 'assets/images/shivam-original.jpeg', alt: 'Shivam with cinematic purple and cyan studio lighting', fit: 'contain', position: '50% 50%' },
  showreel: {
  video: 'assets/videos/showreel.mp4',
  watchUrl: '',
  poster: 'assets/images/showreel.webp'
},
  socials: { Instagram: 'https://www.instagram.com/shivamvs_227?psln=MW5uaG01aW9iNDlwOQ%3D%3D&utm_source=qr', Behance: '', YouTube: '', LinkedIn: 'https://www.linkedin.com/in/shivam-vishwakarma-7a90ab264?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  projects: [
    {sample:true, year:'2026', video:'assets/videos/sample1.mp4', watchUrl:'', title:'RUN!', category:'motion', label:'2D Animation', thumbnail:'assets/thumbnails/project-01.webp', tools:'After Effects', objective:'Build a fast, playful movement study.', direction:'Bold yellow, graphic silhouettes and exaggerated poses.', approach:'Plan the action in a short storyboard, block key poses and refine timing.', challenge:'Keeping movement readable while the pace increases.', outcome:'A proposed animation study focused on rhythm and silhouette.'},
    {sample:true, year:'2026', video:'', watchUrl:'', title:'DAYDREAMS', category:'design', label:'Poster Design', thumbnail:'assets/thumbnails/project-02.webp', tools:'Photoshop · Illustrator', objective:'Explore nostalgia through a character poster.', direction:'Warm orange and a retro television character.', approach:'Establish a strong focal point, build a limited palette and balance supporting shapes.', challenge:'Balancing texture with a clean hierarchy.', outcome:'A sample poster direction for a personal design exploration.'},
    {sample:true, year:'2026', video:'assets/videos/APPLE.mp4', watchUrl:'', title:'LOST SIGNAL', category:'video', label:'Animated Short / Edit', thumbnail:'assets/thumbnails/project-03.webp', tools:'Premiere Pro · After Effects', objective:'Explore a cinematic story through a short edit.', direction:'Neon lighting, tense atmosphere and purposeful cuts.', approach:'Start with the story beats, build an assembly and refine pacing around sound.', challenge:'Making the sequence clear without relying on dialogue.', outcome:'A concept editing brief for a short narrative experiment.'},
 
    {sample:true, year:'2026', video:'', watchUrl:'', title:'GROOVY TUNES', category:'motion', label:'Music Visualizer', thumbnail:'assets/thumbnails/project-04.webp', tools:'After Effects', objective:'Turn a musical mood into a playful motion concept.', direction:'Bright green, rounded shapes and a friendly character.', approach:'Map accents to a beat grid and explore scale, bounce and repeatable loops.', challenge:'Maintaining rhythm without visual overload.', outcome:'A sample concept for a short music visualizer.'},
    {sample:true, year:'2026', video:'assets/videos/sample1.mp4', watchUrl:'', title:'MIDNIGHT MIX', category:'design', label:'Music Poster', art:5, words:'MIDNIGHT<br>MIX', tools:'Illustrator · Photoshop', objective:'Create an expressive fictional music-event poster.', direction:'Oversized type, orange paper and offbeat composition.', approach:'Sketch typographic arrangements and test the reading order at thumbnail size.', challenge:'Preserving legibility in a deliberately energetic layout.', outcome:'An original CSS poster sample, ready to replace with finished artwork.'},
    {sample:true, year:'2026', video:'', watchUrl:'', title:'FRESH DROP', category:'social', label:'Social Campaign', art:7, words:'FRESH<br>DROP ✳', tools:'Photoshop · Illustrator', objective:'Build a cohesive fictional launch campaign.', direction:'Lime color, bold typography and simple graphic motifs.', approach:'Define a reusable layout and adapt it for square and vertical formats.', challenge:'Making variations feel consistent without repetition.', outcome:'An original social design sample with adaptable hierarchy.'},
    {sample:true, year:'2026', video:'assets/videos/One8.mp4', watchUrl:'', title:'BLUE HOUR', category:'video', label:'Travel Edit Concept', art:8, words:'BLUE<br>HOUR /', tools:'Premiere Pro', objective:'Shape a quiet travel story around the feeling of dusk.', direction:'Cool tones, patient pacing and natural sound.', approach:'Select establishing shots, connect details through match cuts and keep the grade restrained.', challenge:'Creating emotional progression from small moments.', outcome:'A practice editing brief; footage can be added when available.'}
  ]
};


/* WEBSITE BEHAVIOR — normally no edits needed below this line. */
/* Standalone portfolio: no build step, network dependency or framework. */    
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
    card.hidden = p.category !== 'video';
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
  // Keep only one video playing, including the showreel.
  document.addEventListener('play', event => {
    if (event.target.tagName === 'VIDEO') {
      $$('video').forEach(video => { if (video !== event.target) video.pause(); });
    }
  }, true);
  $('#filter-status').textContent = projects.filter(p => p.category === 'video').length + ' projects shown';
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
  const reel = config.showreel || {};
  const oldFrame = $('.reel-frame');
  const reelFrame = document.createElement('div');
  reelFrame.className = 'reel-frame inline-reel';
  reelFrame.innerHTML = '<video id="inline-showreel" controls playsinline preload="metadata" aria-label="Shivam showreel"></video><button class="inline-play" data-reel aria-label="Play showreel"><span>▶</span><small>PLAY SHOWREEL</small></button><p class="inline-reel-status" role="status" hidden></p>';
  oldFrame.replaceWith(reelFrame);
  const reelVideo = $('#inline-showreel');
  const reelOverlay = $('.inline-play');
  const reelStatus = $('.inline-reel-status');
  if(reel.video) reelVideo.src = reel.video;
  else { reelVideo.hidden = true; reelStatus.hidden = false; reelStatus.textContent = externalLink(reel.watchUrl) ? 'Open the hosted showreel.' : 'Add your showreel video in script.js.'; }
  // Show the actual first video frame, without a separate cover image or modal.
  reelVideo.addEventListener('loadedmetadata', () => {
    if(reelVideo.paused && reelVideo.currentTime === 0 && reelVideo.duration > .05) reelVideo.currentTime = .05;
  }, {once:true});
  reelVideo.addEventListener('playing', () => { reelOverlay.hidden = true; reelStatus.hidden = true; });
  reelVideo.addEventListener('ended', () => { reelOverlay.hidden = false; });
  reelVideo.addEventListener('error', () => { reelStatus.hidden = false; reelStatus.textContent = 'The video could not load. Check the showreel filename in script.js.'; });
  function startShowreel() {
    if(!reel.video) {
      const url = externalLink(reel.watchUrl);
      if(url) window.open(url, '_blank', 'noopener,noreferrer');
      else { reelStatus.hidden = false; reelStatus.textContent = 'Add your showreel video in script.js.'; }
      return;
    }
    if(reelVideo.ended) reelVideo.currentTime = 0;
    // Invoke play synchronously from the click so browsers allow sound.
    const started = reelVideo.play();
    reelVideo.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',block:'center'});
    if(started) started.catch(() => { reelOverlay.hidden = false; reelStatus.hidden = false; reelStatus.textContent = 'Press play on the video controls to start.'; });
  }
  $$('[data-reel]').forEach(button => button.addEventListener('click', startShowreel));

  $$('[data-filter]').forEach(button => button.addEventListener('click', () => {
    $$('[data-filter]').forEach(b => { const selected = b === button; b.classList.toggle('selected',selected); b.setAttribute('aria-pressed',String(selected)); });
    let count = 0;
    $$('.project-card').forEach(c => { c.hidden = c.dataset.category !== button.dataset.filter; if(!c.hidden) count++; else c.querySelector('video')?.pause(); });
    $('#filter-status').textContent = `${count} projects shown`;
    if(!motion.matches) $$('.project-card').filter(c => !c.hidden).forEach((card,i) => {
      card.getAnimations().forEach(a => a.cancel());
      card.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:320,delay:Math.min(i*35,175),easing:'cubic-bezier(.22,1,.36,1)'});
    });
  }));
  const header = $('.header'), menu = $('.menu');
  function setMenu(open) { header.classList.toggle('menu-open',open); menu.setAttribute('aria-expanded',String(open)); menu.setAttribute('aria-label',open ? 'Close menu' : 'Open menu'); }
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  $$('nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); } });
  document.addEventListener('click', e => { if(!header.contains(e.target)) setMenu(false); });
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  // An explicit, user-controlled motion study; no audio or autoplay.
  const seek = $('#portrait-seek'), play = $('#portrait-play'), grade = $('#portrait-grade');
  let previewFrame = 0, playing = false, previousTick = 0;
  function renderPortraitTime(value) {
    const seconds = Math.max(0,Math.min(8,Number(value)));
    seek.value = String(seconds);
    $('#portrait-time').textContent = `00:${String(Math.floor(seconds)).padStart(2,'0')}:${String(Math.floor((seconds % 1)*24)).padStart(2,'0')}`;
    $('.editor-playhead').style.left = `${seconds / 8 * 100}%`;
    portrait.style.transform = motion.matches ? 'none' : `scale(${1 + seconds / 8 * .07})`;
  }
  function stopPortrait() {
    playing = false; cancelAnimationFrame(previewFrame);
    play.textContent = '▶'; play.setAttribute('aria-pressed','false'); play.setAttribute('aria-label','Play portrait motion preview');
  }
  function tickPortrait(now) {
    if(!playing) return;
    const next = Number(seek.value) + (now - previousTick) / 1000;
    previousTick = now; renderPortraitTime(next);
    if(next >= 8) stopPortrait(); else previewFrame = requestAnimationFrame(tickPortrait);
  }
  if(seek && portrait) {
    play.addEventListener('click', () => {
      if(playing) { stopPortrait(); return; }
      if(Number(seek.value) >= 8) renderPortraitTime(0);
      playing = true; previousTick = performance.now();
      play.textContent = 'Ⅱ'; play.setAttribute('aria-pressed','true'); play.setAttribute('aria-label','Pause portrait motion preview');
      previewFrame = requestAnimationFrame(tickPortrait);
    });
    seek.addEventListener('input', () => { stopPortrait(); renderPortraitTime(seek.value); });
    $('#portrait-reset').addEventListener('click', () => { stopPortrait(); renderPortraitTime(0); });
    grade.addEventListener('click', () => {
      const enabled = grade.getAttribute('aria-pressed') !== 'true';
      portrait.src = enabled ? config.hero.image : config.hero.original || config.hero.image;
      portrait.alt = enabled ? config.hero.alt : 'Original portrait of Shivam before the studio edit';
      grade.setAttribute('aria-pressed',String(enabled)); grade.textContent = enabled ? '✦ Color on' : '◇ Original';
      $('.clip-color').classList.toggle('bypassed',!enabled);
    });
    if(!config.hero?.original) grade.hidden = true;
    document.addEventListener('visibilitychange', () => { if(document.hidden) stopPortrait(); });
    if('IntersectionObserver' in window) new IntersectionObserver(entries => { if(!entries[0].isIntersecting) stopPortrait(); }).observe($('.editor-shell'));
    motion.addEventListener('change', () => { stopPortrait(); renderPortraitTime(seek.value); });
  }
  if('IntersectionObserver' in window) {
    if(!motion.matches) document.documentElement.classList.add('js-motion');
    const reveal = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); reveal.unobserve(e.target); } }), {threshold:.08});
    $$('.reveal').forEach(s => reveal.observe(s));
    const active = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) $$('nav a').forEach(a => a.classList.toggle('active',a.hash === `#${e.target.id}`)); }), {rootMargin:'-15% 0px -60% 0px'});
    $$('main section[id]').filter(s => $(`nav a[href="#${s.id}"]`)).forEach(s => active.observe(s));
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
