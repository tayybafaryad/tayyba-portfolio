// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Open menu');
}));

// Highlight the current section in the nav
const links = [...navLinks.querySelectorAll('a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => s && spy.observe(s));

// Rotating role text
const roles = ['IT Intern', 'BSIT Student', 'Front-End Developer', 'Laravel Learner'];
const typedEl = document.getElementById('typed');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce) {
  let r = 0, c = roles[0].length, deleting = true;
  (function tick() {
    const word = roles[r];
    typedEl.textContent = word.slice(0, c);
    let delay = deleting ? 45 : 85;
    if (!deleting && c === word.length) { deleting = true; delay = 1600; }
    else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 300; }
    else { c += deleting ? -1 : 1; }
    setTimeout(tick, delay);
  })();
}

// Project filters
const chips = document.querySelectorAll('.chip');
const projects = document.querySelectorAll('.project');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.setAttribute('aria-pressed', c === chip));
  const f = chip.dataset.filter;
  projects.forEach(p => {
    p.hidden = !(f === 'all' || p.dataset.cat.split(' ').includes(f));
  });
}));

// Contact form -> opens the visitor's email app
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if (!name || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    status.textContent = 'Please enter your name, a valid email and a message.';
    return;
  }
  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent(message + '\n\n' + name + '\n' + email);
  window.location.href = 'mailto:tayyba.faryad.pk@gmail.com?subject=' + subject + '&body=' + body;
  status.textContent = 'Opening your email app...';
});

document.getElementById('year').textContent = new Date().getFullYear();
