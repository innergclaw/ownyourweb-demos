const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');
document.documentElement.classList.add('motion-ready');
if (reducedMotion) reveals.forEach((item) => item.classList.add('is-visible'));
else {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  }), { threshold: 0.16 });
  reveals.forEach((item) => observer.observe(item));
}

const dialog = document.querySelector('#contact-dialog');
const form = document.querySelector('#contact-form');
const closeButton = document.querySelector('.dialog-close');
const businessInput = document.querySelector('#business');
const selectedBusiness = document.querySelector('#selected-business');
const firstNameInput = document.querySelector('#first-name');

document.querySelectorAll('.text-button').forEach((button) => {
  button.addEventListener('click', () => {
    const business = button.dataset.business;
    businessInput.value = business;
    selectedBusiness.textContent = business;
    dialog.showModal();
    requestAnimationFrame(() => dialog.classList.add('is-open'));
    window.setTimeout(() => firstNameInput.focus(), reducedMotion ? 0 : 450);
  });
});

function closeDialog() {
  dialog.classList.remove('is-open');
  window.setTimeout(() => dialog.close(), reducedMotion ? 0 : 280);
}

closeButton.addEventListener('click', closeDialog);
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) closeDialog();
});
dialog.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeDialog();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const body = [
    'Hi Raven,',
    '',
    `I am reaching out about ${data.get('business')}.`,
    `Name: ${data.get('firstName')} ${data.get('lastName')}`,
    `Email: ${data.get('email')}`,
    `Message: ${data.get('message')}`
  ].join('\n');
  const separator = /iPhone|iPad|iPod/i.test(navigator.userAgent) ? '&' : '?';
  window.location.href = `sms:+12679751661${separator}body=${encodeURIComponent(body)}`;
});
