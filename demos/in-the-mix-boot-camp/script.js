const form = document.querySelector('#signup-form');
const status = document.querySelector('#form-status');
const submitButton = form?.querySelector('.submit-button');

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

function setFieldError(field, message) {
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  const error = field.closest('label')?.querySelector('.field-error');
  if (error) error.textContent = message;
}

function validateForm() {
  let valid = true;
  const requiredTextFields = form.querySelectorAll('input[required]:not([type="checkbox"])');

  requiredTextFields.forEach((field) => {
    let message = '';
    if (!field.value.trim()) message = 'Complete this field.';
    if (field.type === 'email' && field.value && !field.validity.valid) message = 'Enter a valid email address.';
    setFieldError(field, message);
    if (message) valid = false;
  });

  const acknowledgement = form.elements.acknowledgement;
  const consentError = form.querySelector('.consent-error');
  if (!acknowledgement.checked) {
    consentError.textContent = 'Confirm that you understand this is a demo signup.';
    valid = false;
  } else {
    consentError.textContent = '';
  }

  return valid;
}

form?.addEventListener('input', (event) => {
  if (event.target.matches('input[required]:not([type="checkbox"])')) setFieldError(event.target, '');
  if (event.target.name === 'acknowledgement') form.querySelector('.consent-error').textContent = '';
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  status.classList.remove('is-visible');

  if (!validateForm()) {
    const firstInvalid = form.querySelector('[aria-invalid="true"], input[type="checkbox"]:invalid');
    firstInvalid?.focus();
    return;
  }

  submitButton.disabled = true;
  submitButton.classList.add('is-loading');
  submitButton.querySelector('span:first-child').textContent = 'Preparing Confirmation';

  window.setTimeout(() => {
    const firstName = form.elements.firstName.value.trim();
    submitButton.disabled = false;
    submitButton.classList.remove('is-loading');
    submitButton.querySelector('span:first-child').textContent = 'Complete Demo Signup';
    status.innerHTML = `<strong>${firstName}, your demo signup is complete.</strong><br>This preview did not send or save your information. The organizer can connect the final form when the signup destination is approved.`;
    status.classList.add('is-visible');
    status.focus?.();
  }, 650);
});

