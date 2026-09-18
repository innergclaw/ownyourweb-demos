const workEntries = [
  ['Corridor cleanups', 'Cleanup photographs'],
  ['Block parties and community events', 'Event photographs'],
  ['Water ice and community gatherings', 'Community photographs'],
  ['Neighborhood conversations and door knocking', 'Neighborhood photographs'],
  ['Senior home repair and painting', 'Project photographs'],
  ['Small business engagement', 'Business photographs'],
  ['Zoning and RCO work', 'Meeting photographs'],
  ['Neighborhood services', 'Service photographs'],
  ['Philadelphia City Council experience', 'Professional photographs']
];
const grid = document.querySelector('#work-grid');
workEntries.forEach(([title, photo], i) => {
  const article = document.createElement('article'); article.className = 'work-card reveal';
  const figure = document.createElement('div'); figure.className = 'photo-slot';
  const index = document.createElement('span'); index.className = 'photo-index'; index.textContent = `${String(i + 5).padStart(2, '0')} / Archive image pending`;
  const center = document.createElement('div'); center.className = 'photo-center';
  const photoLabel = document.createElement('p'); photoLabel.textContent = photo;
  center.append(photoLabel); figure.append(index, center);
  const heading = document.createElement('h3'); heading.textContent = title;
  const state = document.createElement('span'); state.className = 'entry-state'; state.textContent = 'Brief entry / Details pending';
  const description = document.createElement('p'); description.textContent = 'Date, location, role, and supporting details to be supplied before publication as completed work.';
  article.append(figure, state, heading, description); grid.append(article);
});
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
navigation.dataset.enhanced = 'true'; menu.hidden = false;
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); menu.textContent = 'Menu'; }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open); menu.textContent = open ? 'Close' : 'Menu'; });
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menu.focus(); } });
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { if (!reduceMotion.matches) entry.target.classList.add('animate'); observer.unobserve(entry.target); } }); }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
const signup = document.querySelector('#signup-form');
const help = document.querySelector('#volunteer-options');
signup.addEventListener('change', () => { const updates = signup.elements.interest.value === 'Stay updated'; help.hidden = updates; help.disabled = updates; signup.querySelector('.form-status').textContent = ''; });
// Prevent any network form submission, including when opened as a static preview.
document.querySelectorAll('.demo-form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const status = form.querySelector('.form-status');
    if (!form.elements.name.value.trim() || (form.elements.message && !form.elements.message.value.trim()) || (form.elements.neighborhood && !form.elements.neighborhood.value.trim())) { status.textContent = 'Enter sample text in each required field.'; return; }
    status.textContent = form === signup ? 'Preview complete. No signup was created, and nothing was sent or saved. The live campaign signup is not connected.' : 'Preview complete. This message was not sent or saved. Campaign contact routing is pending.';
  });
  form.querySelector(':scope > fieldset').disabled = false;
});
