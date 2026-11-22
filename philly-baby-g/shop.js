const products = [
  ['Orange Crush','Classic','orange','Orange strap, teal bezel and a black dial.'],
  ['Steel Oak · Rainbow','Steel Mod','rainbow','A brushed steel bezel frames a pale dial with rainbow markers.'],
  ['Steel Oak · Midnight','Steel Mod','midnight','A steel bezel and black strap frame a dark dial.'],
  ['Steel Oak · Navy','Steel Mod','navy','Deep navy with rose-tone markers and a blue strap.'],
  ['Jelly · Cherry','Jelly','cherry','Translucent cherry red with multicolor markers.'],
  ['Jelly · Tangerine','Jelly','tangerine','A translucent orange case with rainbow markers.']
];
const select = selector => document.querySelector(selector);
const path = key => 'assets/' + key + '.webp';
const feature = select('.feature');
let active = 0;
products.forEach(([name,,key],index) => {
  const img = new Image();
  img.src = path(key);
  img.alt = name;
  img.style.left = index * 100 + '%';
  select('.track').append(img);
});
function slide(by) {
  active = (active + by + products.length) % products.length;
  select('.track').style.transform = 'translateX(-' + active * 100 + '%)';
  select('#featureName').textContent = products[active][0];
  select('#count').textContent = (active + 1) + ' / ' + products.length;
  [...select('.track').children].forEach((img,i) => img.setAttribute('aria-hidden',i !== active));
}
slide(0);
select('#prev').onclick = () => slide(-1);
select('#next').onclick = () => slide(1);
feature.onkeydown = event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    slide(event.key === 'ArrowRight' ? 1 : -1);
  }
};
let startX;
feature.onpointerdown = e => {startX = e.clientX;};
feature.onpointercancel = () => {startX = undefined;};
feature.onpointerup = e => {
  const delta = e.clientX - startX;
  if (Math.abs(delta) > 40) slide(delta < 0 ? 1 : -1);
  startX = undefined;
};
const clock = new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',hour:'2-digit',minute:'2-digit',hour12:true});
function updateTime(){select('time').textContent = clock.format(new Date());}
updateTime();
setInterval(updateTime,15000);
const dialog = select('dialog');
function showPanel(title,label,description,message,key) {
  select('#panelTitle').textContent = title;
  select('#panelLabel').textContent = label;
  select('#panelDesc').textContent = description;
  select('#message').value = message;
  select('#status').textContent = '';
  const img = select('#panelImg');
  img.hidden = !key;
  if(key) {img.src = path(key);img.alt = title;}
  dialog.showModal();
}
select('.close').onclick = () => dialog.close();
dialog.onclick = e => {
  if(e.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if(e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) dialog.close();
};
select('#copy').onclick = async () => {
  const message = select('#message');
  try {
    await navigator.clipboard.writeText(message.value);
    select('#status').textContent = 'Copied. Paste your message in Instagram.';
  } catch {
    message.focus();message.select();
    select('#status').textContent = 'Select Copy, then paste your message in Instagram.';
  }
};
function filter(category) {
  const grid = select('.grid');
  grid.replaceChildren();
  for(const button of select('.filters').children) button.setAttribute('aria-pressed',button.textContent === category);
  products.filter(p => category === 'All' || p[1] === category).forEach(([name,family,key,description]) => {
    const card = document.createElement('button');
    card.className = 'card';
    card.innerHTML = '<figure><img loading="lazy" alt=""></figure><small></small><h3></h3><span class="price">DM for price</span>';
    card.querySelector('img').src = path(key);
    card.querySelector('small').textContent = family.toUpperCase();
    card.querySelector('h3').textContent = name;
    card.onclick = () => showPanel(name,family.toUpperCase(),description + ' Copy your inquiry and send it on Instagram.', 'Hey Philly Baby G, is ' + name + ' available? What’s the price?',key);
    grid.append(card);
  });
}
for(const category of ['All','Steel Mod','Jelly','Classic']) {
  const button = document.createElement('button');
  button.textContent = category;
  button.onclick = () => filter(category);
  select('.filters').append(button);
}
filter('All');
select('#signup').onsubmit = e => {
  e.preventDefault();
  const data = new FormData(e.target);
  showPanel('Drop alerts','PHILLY BABY G','Copy your request and send it to @phillybabyyg to join the alert list.',
    'Hey Philly Baby G, add me to the drop alerts. My name is ' + data.get('first') + ' and you can reach me at ' + data.get('contact') + '.');
};
