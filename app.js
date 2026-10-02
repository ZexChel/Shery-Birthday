const content = {
  recipientName: 'Shery Devi Cahayadi',
  senderName: '-Chel',
  title: "Happy Birthday, My Favorite Person",
  heroSubtitle:
    'For every laugh, every conversation, and every beautiful memory we have made — this night is for you.',
  secretCode: 'pink',
  navLinks: [
    { label: 'Home', href: '#home' },
    { label: 'Our Memories', href: '#memories' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'The Letter', href: '#letter' },
    { label: 'Wishes', href: '#wishes' }
  ],
  timeline: [
    {
      title: 'The First Glimpse',
      date: 'May 2026',
      story:
        'I still remember the first time I saw you, and somehow, from that moment, there was just something about you that made me want to know you more.',
      photo: 'images/chapter-1.jpg'
    },
    {
      title: 'The First Message',
      date: 'September 2026',
      story:
        'I didnt know where that first message would take us but Im glad I decided to send it.',
      photo: 'images/chapter-2.jpg'
    },
    {
      title: 'A Little Closer',
      date: 'September 23, 2026',
      story:
        'Somehow, a simple ride home turned into one of those moments where I wished the conversation didnt have to end.',
      photo: 'images/chapter-3.jpg'
    },
    {
      title: 'A Quiet Night Together',
      date: 'September 24, 2026',
      story:
        'Maybe it was just another night for some people, but for me, sharing that quiet moment with you meant a little more..',
      photo: 'images/chapter-4.jpg'
    }
  ],
  gallery: [
    { title: 'Sweet Serenity', caption: 'A little sparkle in the dusk', image: 'images/gallery-1.jpg' },
    { title: 'Prettier Bloom', caption: 'When everything felt still', image: 'images/gallery-2.jpg' },
    { title: 'Beautiful Just the Way U Are', caption: 'A memory wrapped in warmth', image: 'images/gallery-3.webp' },
    { title: 'Our Shadow', caption: 'The kind of glow you never forget', image: 'images/gallery-4.jpg' },
    { title: 'Softly Yours', caption: 'The comfort of being known', image: 'images/gallery-5.jpeg' },
    { title: 'Midnight Glow', caption: 'A little romance in motion', image: 'images/gallery-6.jpeg' }
  ],
  letterParagraphs: [
    'Dear Shery,',
    'I wanted to make you something soft, beautiful, and unforgettable — a little world made only for your birthday. A place where the light is warm, the stars feel close, and every memory feels like it was written just for you.',
    'You have this way of turning the simplest moments into something that stays with me long after the day is over. The laughter, the calm, the tenderness, the quiet magic — all of it feels like a gift I never want to lose.',
    'So tonight, I hope you feel the love waiting for you in every corner of this page. May your day feel as lovely as your heart, and may the year ahead be full of gentle surprises, quiet joy, and beautiful moments that remain in your memory forever.',
    'With all my heart, your favorite person.'
  ],
  closingHeadline: 'Happy Birthday, Truly.',
  closingText:
    'May this new chapter of your life bring you a lot of happiness, good memories, and little moments tha make you genuinely smile. I hope everything youre working towards slowly finds its way to you, and that you always have enough courage to keep going, even when things get difficult. I hope you meet more people who appreciate you, understand you, and make you feel comfortable being yourself. and most importantly, i hope you never forget how much youre worth. You desserve good things, cewyy. not just for today, but everyday after this. Im really glad i got to know you, and i hope this year gives us a lot more memories to look back on someday. Happy birthday once again. i hope 17 treats you kindly 🤍',
  finalLine: 'Thank you for being part of my unexpected story.',
  finalSubline: "Here's to more memories."
};

const state = {
  musicPlaying: false,
  unlockTriggered: false,
  currentAudioVolume: 0,
  typingActive: false
};

const loadingScreen = document.getElementById('loadingScreen');
const secretScreen = document.getElementById('secretScreen');
const secretInput = document.getElementById('secretCode');
const unlockButton = document.getElementById('unlockButton');
const pageShell = document.getElementById('pageShell');
const heroHeading = document.getElementById('heroHeading');
const heroSubtitle = document.getElementById('heroSubtitle');
const navLinks = document.getElementById('navLinks');
const timeline = document.getElementById('timeline');
const galleryGrid = document.getElementById('galleryGrid');
const letterText = document.getElementById('letterText');
const letterSender = document.getElementById('letterSender');
const closingHeadline = document.getElementById('closingHeadline');
const closingText = document.getElementById('closingText');
const finalLine = document.getElementById('finalLine');
const finalSubline = document.getElementById('finalSubline');
const musicButton = document.getElementById('musicToggle');
const audio = document.getElementById('backgroundMusic');
const cursorGlow = document.getElementById('cursorGlow');
const navToggle = document.getElementById('navToggle');
const replayButton = document.getElementById('replayButton');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

function init() {
  renderContent();
  createParticles();
  bindEvents();
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    secretScreen.classList.add('active');
  }, 1800);
  observeReveals();
  updateTimelineProgress();
  setHeroText();
  document.body.classList.add('unlocked');
}

function renderContent() {
  heroHeading.textContent = content.title;
  heroSubtitle.textContent = content.heroSubtitle;
  closingHeadline.textContent = content.closingHeadline;
  closingText.textContent = content.closingText;
  finalLine.textContent = content.finalLine;
  finalSubline.textContent = content.finalSubline;
  letterSender.textContent = content.senderName;

  navLinks.innerHTML = content.navLinks
    .map((link) => `<a href="${link.href}">${link.label}</a>`)
    .join('');

  timeline.innerHTML = content.timeline
    .map(
      (item, index) => `
        <article class="timeline-item reveal">
          <div class="timeline-card">
            <img src="${item.photo}" alt="${item.title}" />
            <p class="timeline-date">${item.date}</p>
            <h3>${item.title}</h3>
            <p>${item.story}</p>
          </div>
        </article>
      `
    )
    .join('');

  galleryGrid.innerHTML = content.gallery
    .map(
      (item) => `
        <figure class="gallery-card reveal" data-image="${item.image}" data-caption="${item.caption}">
          <img src="${item.image}" alt="${item.title}" />
          <figcaption class="gallery-caption">${item.title}</figcaption>
        </figure>
      `
    )
    .join('');
}

function setHeroText() {
  heroHeading.textContent = content.title;
  heroSubtitle.textContent = content.heroSubtitle;
}

function bindEvents() {
  unlockButton.addEventListener('click', handleUnlock);
  secretInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') handleUnlock();
  });

  musicButton.addEventListener('click', toggleMusic);
  replayButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });

  document.addEventListener('mousemove', updateCursorGlow);
  document.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
  document.addEventListener('mouseenter', () => cursorGlow.classList.add('active'));

  document.querySelectorAll('.gallery-card').forEach((card) => {
    card.addEventListener('click', openLightbox);
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', closeLightbox);
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', () => {
    updateTimelineProgress();
    if (window.innerWidth > 760) navLinks.classList.remove('active');
  });

  if (window.matchMedia('(hover: hover)').matches) {
    document.body.classList.remove('mobile');
  } else {
    document.body.classList.add('mobile');
  }
}

function handleUnlock() {
  if (state.unlockTriggered) return;

  if (secretInput.value.trim() === content.secretCode) {
    state.unlockTriggered = true;
    secretScreen.classList.add('unlocking');
    unlockButton.disabled = true;
    startMusic();
    setTimeout(() => {
      secretScreen.classList.remove('active');
      pageShell.classList.add('visible');
      pageShell.style.opacity = '1';
      pageShell.style.visibility = 'visible';
      secretScreen.style.display = 'none';
    }, 900);
  } else {
    secretInput.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-6px)' },
        { transform: 'translateX(6px)' },
        { transform: 'translateX(0)' }
      ],
      { duration: 240, iterations: 1 }
    );
  }
}

function startMusic() {
  audio.src = 'music/background-music.mp3';
  audio.load();
  audio.volume = 0;
  const playPromise = audio.play();
  if (playPromise) {
    playPromise
      .then(() => {
        state.musicPlaying = true;
        state.currentAudioVolume = 0.25;
        fadeMusicIn();
        updateMusicButton();
      })
      .catch(() => {
        state.musicPlaying = false;
        updateMusicButton();
      });
  }
}

function fadeMusicIn() {
  const duration = 2000;
  const start = performance.now();
  const target = 0.25;
  const step = () => {
    const elapsed = performance.now() - start;
    const progress = Math.min(1, elapsed / duration);
    audio.volume = target * progress;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function toggleMusic() {
  if (!state.unlockTriggered) return;
  if (state.musicPlaying) {
    audio.pause();
    state.musicPlaying = false;
  } else {
    audio.play().then(() => {
      state.musicPlaying = true;
      audio.volume = state.currentAudioVolume || 0.25;
    });
  }
  updateMusicButton();
}

function updateMusicButton() {
  musicButton.innerHTML = state.musicPlaying ? '<span>⏸</span>' : '<span>♫</span>';
  musicButton.setAttribute('aria-label', state.musicPlaying ? 'Pause music' : 'Play music');
}

function createParticles() {
  const heroContainer = document.getElementById('heroParticles');
  const wishesContainer = document.getElementById('wishesParticles');
  for (let i = 0; i < 28; i += 1) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    heroContainer.appendChild(star);
  }

  for (let i = 0; i < 18; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 3}s`;
    wishesContainer.appendChild(particle);
  }
}

function observeReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.id === 'letter') {
            typeLetter();
          }
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
}

function typeLetter() {
  if (state.typingActive) return;
  state.typingActive = true;
  const paragraphs = content.letterParagraphs;
  letterText.innerHTML = '';
  const fragment = document.createDocumentFragment();
  paragraphs.forEach((paragraph, index) => {
    const el = document.createElement('p');
    el.className = 'typing-paragraph';
    fragment.appendChild(el);
    if (index === 0) el.textContent = paragraph;
  });
  letterText.appendChild(fragment);

  const lines = letterText.querySelectorAll('.typing-paragraph');
  let lineIndex = 0;
  let charIndex = 0;
  const currentLine = lines[0];

  function tick() {
    const line = lines[lineIndex];
    if (!line) return;
    const text = paragraphs[lineIndex];
    line.textContent = text.slice(0, charIndex + 1);
    charIndex += 1;
    if (charIndex >= text.length) {
      charIndex = 0;
      lineIndex += 1;
      if (lineIndex >= lines.length) return;
    }
    setTimeout(tick, 28);
  }
  tick();
}

function handleScroll() {
  updateTimelineProgress();
  const scrollY = window.scrollY;
  document.documentElement.style.setProperty('--parallax', `${scrollY * 0.08}px`);
  if (scrollY > 120) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
}

function updateTimelineProgress() {
  const timelineSection = document.querySelector('.memories-section');
  if (!timelineSection) return;
  const rect = timelineSection.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const maxDistance = timelineSection.offsetHeight + viewportHeight;
  const progress = Math.min(1, Math.max(0, (viewportHeight - rect.top) / maxDistance));
  document.documentElement.style.setProperty('--timeline-progress', progress.toFixed(3));
}

function updateCursorGlow(event) {
  cursorGlow.classList.add('active');
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
}

function openLightbox(event) {
  const card = event.currentTarget;
  const image = card.getAttribute('data-image');
  const caption = card.getAttribute('data-caption');
  lightboxImage.src = image;
  lightboxImage.alt = caption;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
}

init();
