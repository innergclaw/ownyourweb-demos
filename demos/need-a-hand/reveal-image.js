const image = document.querySelector('.closing-image img');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (image && !reducedMotion.matches && 'IntersectionObserver' in window) {
  const startsBelowView = image.getBoundingClientRect().top > window.innerHeight * 0.78;

  if (startsBelowView) {
    image.classList.add('reveal-pending');

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      image.classList.add('is-visible');
      observer.unobserve(image);
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    observer.observe(image);
  }
}
