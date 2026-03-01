/* ═══════════════════════════════════════════
   Portfolio , Adrian D. Falk
═══════════════════════════════════════════ */

// ── Navigation: Hintergrund beim Scrollen ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobiles Menü ──
const toggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Typed-Text Effekt ──
const typedEl = document.querySelector('.typed-text');
const finalText = 'Wirtschaftsingenieurwesen Student';
let charIdx = 0;

function type() {
  if (charIdx < finalText.length) {
    typedEl.textContent = finalText.substring(0, charIdx + 1);
    charIdx++;
    setTimeout(type, 80);
  }
}
type();

// ── Scroll-Reveal ──
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
revealEls.forEach(el => observer.observe(el));

// ── Skill-Bars animieren ──
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar__fill').forEach(fill => {
          fill.style.width = fill.dataset.width + '%';
        });
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
document.querySelectorAll('.skill-bars').forEach(el => barObserver.observe(el));

// ── Kontaktformular → mailto ──
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const subject = encodeURIComponent(`Kontaktanfrage von ${name}`);
  const body    = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\n${message}`);
  window.location.href = `mailto:a.forlanski95@gmail.com?subject=${subject}&body=${body}`;
});

// ── Aktiven Nav-Link hervorheben ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--color-text)'
      : '';
  });
}, { passive: true });
