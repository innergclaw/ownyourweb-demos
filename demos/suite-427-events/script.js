const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const intro = document.querySelector('#intro');

if (!reducedMotion && !sessionStorage.getItem('suite427-intro-seen')) {
  document.body.classList.add('intro-active');
  window.setTimeout(() => {
    intro.classList.add('is-done');
    document.body.classList.remove('intro-active');
    document.body.classList.add('page-ready');
    sessionStorage.setItem('suite427-intro-seen', 'true');
  }, 2100);
} else {
  intro.classList.add('is-done');
  document.body.classList.add('page-ready');
}

document.documentElement.classList.add('motion-ready');
const reveals = document.querySelectorAll('.reveal');

if (reducedMotion) {
  reveals.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.17, rootMargin: '0px 0px -8% 0px' });
  reveals.forEach((item) => observer.observe(item));
}

const bookingForm = document.querySelector('#booking-form');
bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;

  const data = new FormData(bookingForm);
  const message = [
    'Hi Suite 427 Events,',
    '',
    `My name is ${data.get('name')}.`,
    `I am planning a ${data.get('eventType')} for ${data.get('date')} with about ${data.get('guests')} guests.`,
    data.get('note') ? `Details: ${data.get('note')}` : '',
    '',
    'Is this date available?'
  ].filter(Boolean).join('\n');
  const separator = /iPhone|iPad|iPod/i.test(navigator.userAgent) ? '&' : '?';
  window.location.href = `sms:+14455440971${separator}body=${encodeURIComponent(message)}`;
});

if (!reducedMotion) {
  const canvas = document.querySelector('#fireworks');
  const context = canvas.getContext('2d');
  const particles = [];
  let lastBurst = 0;

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function burst(x, y, count = 28) {
    for (let index = 0; index < count; index += 1) {
      const angle = (Math.PI * 2 * index) / count + Math.random() * .16;
      const speed = 1.4 + Math.random() * 3.2;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        size: Math.random() * 1.8 + .7,
        color: Math.random() > .48 ? '#f7d77a' : '#b77b1e'
      });
    }
  }

  function draw(timestamp) {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (timestamp - lastBurst > 2100 && window.scrollY < window.innerHeight * 1.2) {
      burst(window.innerWidth * (.18 + Math.random() * .64), window.innerHeight * (.14 + Math.random() * .36));
      lastBurst = timestamp;
    }
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += .018;
      particle.life -= .014;
      context.globalAlpha = Math.max(particle.life, 0);
      context.fillStyle = particle.color;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fill();
    });
    for (let index = particles.length - 1; index >= 0; index -= 1) {
      if (particles[index].life <= 0) particles.splice(index, 1);
    }
    context.globalAlpha = 1;
    window.requestAnimationFrame(draw);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.requestAnimationFrame(draw);
}
