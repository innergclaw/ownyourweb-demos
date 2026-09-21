const hero = document.querySelector('.hero');
const targets = [...hero.querySelectorAll('[data-text-fill]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function splitIntoCharacters(target) {
  const accessibleText = target.textContent.replace(/\s+/g, ' ').trim();
  const visual = document.createElement('span');
  visual.className = 'text-fill-visual';
  visual.setAttribute('aria-hidden', 'true');

  while (target.firstChild) visual.append(target.firstChild);

  const textNodes = [];
  const walker = document.createTreeWalker(visual, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  const characters = [];
  for (const textNode of textNodes) {
    const fragment = document.createDocumentFragment();
    const parts = textNode.textContent.match(/\S+|\s+/g) ?? [];

    for (const part of parts) {
      if (/^\s+$/.test(part)) {
        fragment.append(document.createTextNode(part));
        continue;
      }

      const word = document.createElement('span');
      word.className = 'text-fill-word';
      for (const character of part) {
        const span = document.createElement('span');
        span.className = 'text-fill-character';
        span.textContent = character;
        word.append(span);
        characters.push(span);
      }
      fragment.append(word);
    }
    textNode.replaceWith(fragment);
  }

  const screenReaderText = document.createElement('span');
  screenReaderText.className = 'sr-only';
  screenReaderText.textContent = accessibleText;
  target.append(visual, screenReaderText);
  return characters;
}

const characters = targets.flatMap(splitIntoCharacters);
hero.classList.add('text-fill-active');

let filledCount = 0;
let framePending = false;

function updateFill() {
  framePending = false;
  if (reduceMotion.matches) return;

  const distance = Math.min(440, Math.max(300, hero.offsetHeight * 0.75));
  const progress = Math.min(1, Math.max(0, window.scrollY / distance));
  const nextCount = Math.round(progress * characters.length);
  if (nextCount === filledCount) return;

  const first = Math.min(filledCount, nextCount);
  const last = Math.max(filledCount, nextCount);
  for (let index = first; index < last; index += 1) {
    characters[index].classList.toggle('is-filled', index < nextCount);
  }
  filledCount = nextCount;
}

function scheduleFill() {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(updateFill);
}

const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    window.addEventListener('scroll', scheduleFill, { passive: true });
    scheduleFill();
  } else {
    window.removeEventListener('scroll', scheduleFill);
    scheduleFill();
  }
});

observer.observe(hero);
window.addEventListener('resize', scheduleFill, { passive: true });
reduceMotion.addEventListener('change', scheduleFill);
scheduleFill();
