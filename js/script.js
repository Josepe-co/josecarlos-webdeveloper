/* ================================================================
   JOSE CARLOS – WEB DEVELOPER PORTFOLIO
   Main Script – Animations, Interactions & Effects
================================================================ */

'use strict';

/* ───────────────────────────────────────────────────────────────
   1. LOADER
   ─────────────────────────────────────────────────────────────── */
(function initLoader() {

  const loader      = document.getElementById('loader');
  const log         = document.getElementById('loaderLog');
  const bar         = document.getElementById('loaderBar');
  const pct         = document.getElementById('loaderPercent');

  const logLines = [
    'Iniciando JOSE_CARLOS.EXE...',
    'Cargando módulos HTML5 ........... OK',
    'Cargando módulos CSS3 ............. OK',
    'Inyectando JavaScript .............. OK',
    'Verificando creatividad ........... OK',
    'Optimizando responsive design .... OK',
    'Conectando con GitHub Pages ....... OK',
    'Calibrando experiencia de usuario . OK',
    '>> TODOS LOS SISTEMAS LISTOS <<',
  ];

  let lineIdx = 0;
  let progress = 0;
  let interval;

  function printNextLine() {
    if (lineIdx >= logLines.length) {
      clearInterval(interval);
      return;
    }
    const span = document.createElement('span');
    span.classList.add('log-line');
    span.textContent = '> ' + logLines[lineIdx++];
    log.appendChild(span);
    log.scrollTop = log.scrollHeight;
  }

  function updateBar(value) {
    bar.style.width = value + '%';
    pct.textContent = Math.round(value) + '%';
  }

  // Animate bar and lines
  const step = 100 / logLines.length;
  interval = setInterval(() => {
    printNextLine();
    progress = Math.min(progress + step + (Math.random() * step * .4), 100);
    updateBar(progress);

    if (lineIdx >= logLines.length) {
      clearInterval(interval);
      updateBar(100);
      setTimeout(() => hideLoader(), 700);
    }
  }, 320);

  function hideLoader() {
    loader.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    startInitialAnimations();
  }

  document.body.classList.add('no-scroll');
})();


/* ───────────────────────────────────────────────────────────────
   2. TYPEWRITER – Hero description
   ─────────────────────────────────────────────────────────────── */
function startInitialAnimations() {
  typewriterEffect(
    document.getElementById('heroDesc'),
    'Desarrollador Web Frontend. Combinando mis estudios en el CETIS con mi pasión autodidacta por crear experiencias digitales de alto nivel.',
    38
  );
  animateCounters();
}

function typewriterEffect(el, text, speed = 50) {
  if (!el) return;
  let i = 0;
  el.textContent = '';
  const timer = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) clearInterval(timer);
  }, speed);
}


/* ───────────────────────────────────────────────────────────────
   3. COUNTER ANIMATIONS – Hero stats
   ─────────────────────────────────────────────────────────────── */
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const inc = Math.ceil(target / 50);
    const timer = setInterval(() => {
      current = Math.min(current + inc, target);
      el.textContent = current + (el.textContent.includes('+') ? '+' : '');
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}


/* ───────────────────────────────────────────────────────────────
   4. NAV – Scroll & Mobile toggle
   ─────────────────────────────────────────────────────────────── */
const nav        = document.getElementById('nav');
const navToggle  = document.getElementById('navToggle');
const navLinks   = document.getElementById('navLinks');
const navItems   = navLinks ? navLinks.querySelectorAll('a') : [];

// Sticky style
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

// Mobile toggle
navToggle && navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close on link click (mobile)
navItems.forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav link on scroll
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = '#' + section.id;
    }
  });
  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === current);
  });
}


/* ───────────────────────────────────────────────────────────────
   5. AOS – Custom scroll reveal
   ─────────────────────────────────────────────────────────────── */
(function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');

  function checkVisibility() {
    elements.forEach(el => {
      const rect  = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight - 60;
      if (inView) el.classList.add('aos-animate');
    });
  }

  // Apply delays
  document.querySelectorAll('[data-aos-delay]').forEach(el => {
    const delay = parseInt(el.dataset.aosDelay, 10);
    el.style.transitionDelay = delay + 'ms';
  });

  window.addEventListener('scroll', checkVisibility, { passive: true });
  checkVisibility(); // initial check
})();


/* ───────────────────────────────────────────────────────────────
   6. SKILL BARS – Animate on scroll
   ─────────────────────────────────────────────────────────────── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-bar__fill');
  let animated = false;

  function animateBars() {
    if (animated) return;
    const section = document.getElementById('skills');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      animated = true;
      fills.forEach(fill => {
        const width = fill.dataset.width;
        fill.style.width = width + '%';
      });
    }
  }

  window.addEventListener('scroll', animateBars, { passive: true });
  animateBars();
})();


/* ───────────────────────────────────────────────────────────────
   7. CONTACT FORM – Coin drop effect
   ─────────────────────────────────────────────────────────────── */
const contactForm  = document.getElementById('contactForm');
const submitBtn    = document.getElementById('submitBtn');
const submitText   = document.getElementById('submitText');
const formSuccess  = document.getElementById('formSuccess');

contactForm && contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Coin animation
  submitBtn.disabled = true;
  submitText.textContent = '🪙 INSERTANDO MONEDA...';

  let dots = 0;
  const typing = setInterval(() => {
    dots = (dots + 1) % 4;
    submitText.textContent = '🪙 INSERTANDO MONEDA' + '.'.repeat(dots);
  }, 300);

  setTimeout(() => {
    clearInterval(typing);
    submitText.textContent = '✅ ¡ABRIENDO WHATSAPP!';

    coinDropEffect();

    // Construir mensaje para WhatsApp
    const waText = encodeURIComponent(
      `¡Hola Jose Carlos! 👾\n\nSoy *${name}* (${email})\n\n${message}`
    );
    const waUrl = `https://wa.me/529631337896?text=${waText}`;

    contactForm.style.opacity = '.4';
    setTimeout(() => {
      contactForm.style.opacity = '1';
      contactForm.reset();
      formSuccess.style.display = 'block';
      submitBtn.disabled = false;
      submitText.textContent = '🪙 INSERTAR MONEDA';
      window.open(waUrl, '_blank');
    }, 700);
  }, 1800);
});

function coinDropEffect() {
  const coin = document.createElement('div');
  coin.textContent = '🪙';
  coin.style.cssText = `
    position:fixed; top:40%; left:50%; transform:translateX(-50%);
    font-size:3rem; z-index:9999; pointer-events:none;
    animation: coinFall .8s ease-in forwards;
  `;
  document.body.appendChild(coin);

  if (!document.getElementById('coinFallStyle')) {
    const style = document.createElement('style');
    style.id = 'coinFallStyle';
    style.textContent = `
      @keyframes coinFall {
        0%   { opacity:1; transform:translateX(-50%) translateY(0) scale(1) rotateY(0deg); }
        100% { opacity:0; transform:translateX(-50%) translateY(200px) scale(.4) rotateY(720deg); }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => coin.remove(), 900);
}


/* ───────────────────────────────────────────────────────────────
   8. PROJECT CARD – Link handlers
   ─────────────────────────────────────────────────────────────── */
document.querySelectorAll('[data-project-url]').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const url = this.dataset.projectUrl;
    if (url && url !== 'TU_LINK_AQUI') window.open(url, '_blank');
    else alert('🔗 Demo próximamente disponible.');
  });
});

document.querySelectorAll('[data-github-url]').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const url = this.dataset.githubUrl;
    if (url && url !== 'TU_REPO_AQUI') window.open(url, '_blank');
    else alert('🐙 Repositorio disponible próximamente.');
  });
});


/* ───────────────────────────────────────────────────────────────
   9. CURSOR GLOW EFFECT (desktop)
   ─────────────────────────────────────────────────────────────── */
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,.06) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
    transform: translate(-50%,-50%);
    transition: left .12s ease, top .12s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
})();


/* ───────────────────────────────────────────────────────────────
   10. SECTION – Smooth background transitions
   ─────────────────────────────────────────────────────────────── */
(function initGlitchRandom() {
  // Random hero title glitch bursts
  const heroTitle = document.querySelector('.hero__title');
  if (!heroTitle) return;

  setInterval(() => {
    if (Math.random() > .85) {
      heroTitle.style.animation = 'none';
      heroTitle.classList.add('glitch-burst');
      setTimeout(() => {
        heroTitle.classList.remove('glitch-burst');
      }, 300);
    }
  }, 3000);

  // Add burst style
  const s = document.createElement('style');
  s.textContent = `
    .glitch-burst {
      text-shadow: 3px 0 var(--pink), -3px 0 var(--blue);
      transform: skewX(-.5deg);
      transition: none !important;
    }
  `;
  document.head.appendChild(s);
})();


/* ───────────────────────────────────────────────────────────────
   11. KONAMI CODE EASTER EGG
   ─────────────────────────────────────────────────────────────── */
(function initKonami() {
  const konami = [38,38,40,40,37,39,37,39,66,65];
  let idx = 0;

  document.addEventListener('keydown', e => {
    if (e.keyCode === konami[idx]) {
      idx++;
      if (idx === konami.length) {
        idx = 0;
        triggerKonami();
      }
    } else { idx = 0; }
  });

  function triggerKonami() {
    const msg = document.createElement('div');
    msg.style.cssText = `
      position:fixed; inset:0; z-index:9998; background:rgba(0,0,0,.9);
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      gap:1rem; cursor:pointer;
    `;
    msg.innerHTML = `
      <p style="font-family:'Press Start 2P',monospace;font-size:clamp(.8rem,3vw,1.4rem);color:#00d4ff;text-shadow:0 0 20px #00d4ff;text-align:center">
        ★ CÓDIGO KONAMI ACTIVADO ★
      </p>
      <p style="font-family:'Press Start 2P',monospace;font-size:clamp(.5rem,2vw,.75rem);color:#ff00ff;text-shadow:0 0 15px #ff00ff;text-align:center">
        +30 VIDAS EXTRA<br/>DESBLOQUEADAS
      </p>
      <p style="font-family:'Share Tech Mono',monospace;color:#5a5a7a;font-size:.9rem">Haz clic para continuar</p>
    `;
    document.body.appendChild(msg);
    msg.addEventListener('click', () => msg.remove());
  }
})();


/* ───────────────────────────────────────────────────────────────
   12. SMOOTH SCROLL for internal links
   ─────────────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ───────────────────────────────────────────────────────────────
   13. INIT on DOM ready
   ─────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Trigger initial AOS check after short delay (loader might hide elements)
  setTimeout(() => {
    document.querySelectorAll('[data-aos]').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) el.classList.add('aos-animate');
    });
  }, 100);
});

console.log(
  '%c JOSE CARLOS – WEB DEVELOPER ',
  'background:#00d4ff;color:#000;font-family:"Press Start 2P",monospace;padding:8px 16px;font-size:12px;'
);
console.log(
  '%c Gracias por inspeccionar el código 👾 - github.com/josepe-co ',
  'background:#ff00ff;color:#fff;font-family:monospace;padding:4px 12px;'
);
