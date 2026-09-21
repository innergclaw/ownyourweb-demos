import { normalizePhone, requestText, smsLink } from './sms.mjs';

const form = document.querySelector('#help-form');
const review = document.querySelector('#review');
const error = document.querySelector('#form-error');
const preview = document.querySelector('#message-preview');
const link = document.querySelector('#sms-link');
const copyButton = document.querySelector('#copy-button');
const copyStatus = document.querySelector('#copy-status');
const editButton = document.querySelector('#edit-button');
const dayTimeInput = document.querySelector('#day-time');

function localNow() {
  const date = new Date();
  const pad = (part) => String(part).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

dayTimeInput.min = localNow();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  error.hidden = true;
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  if (!normalizePhone(data.phone)) {
    error.textContent = 'Enter a 10-digit US phone number so I can reply.';
    error.hidden = false;
    document.querySelector('#phone').focus();
    return;
  }
  if (new Date(data.dayTime).getTime() < Date.now()) {
    error.textContent = 'Choose a future day and time.';
    error.hidden = false;
    dayTimeInput.focus();
    return;
  }
  try {
    const message = requestText(data);
    preview.value = message;
    link.href = smsLink(message);
    form.hidden = true;
    review.hidden = false;
    review.querySelector('h3').focus();
  } catch (failure) {
    error.textContent = failure.message;
    error.hidden = false;
  }
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(preview.value);
    copyStatus.textContent = 'Request copied. Paste it into Messages, then tap Send.';
  } catch {
    preview.focus();
    preview.select();
    copyStatus.textContent = 'Copy the selected text, then paste it into Messages.';
  }
});

editButton.addEventListener('click', () => {
  review.hidden = true;
  form.hidden = false;
  document.querySelector('#first-name').focus();
});
