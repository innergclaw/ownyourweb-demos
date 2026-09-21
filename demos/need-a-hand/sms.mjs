export const OWNER_PHONE = '+12674730397';

const singleLine = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();

export function normalizePhone(value) {
  const digits = String(value ?? '').replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return null;
}

export function requestText(details) {
  const firstName = singleLine(details.firstName);
  const phone = normalizePhone(details.phone);
  const area = singleLine(details.area);
  const service = singleLine(details.service);
  const dayTime = new Date(details.dayTime);
  if (!firstName || !phone || !area || !service || Number.isNaN(dayTime.getTime())) throw new Error('Complete every required field.');
  if (!['Indoor', 'Outside'].includes(details.location) || !['Yes', 'No'].includes(details.tools)) throw new Error('Choose the job location and whether tools are available.');
  const schedule = dayTime.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  return [
    'NEED A HAND | SERVICE REQUEST',
    `First name: ${firstName}`,
    `Phone: ${phone}`,
    `Area of Philadelphia: ${area}`,
    `Service request: ${service}`,
    `Preferred day & time: ${schedule}`,
    `Job location: ${details.location}`,
    `Tools available: ${details.tools}`,
    '',
    'Please reply to confirm the job and time.'
  ].join('\n');
}

export function smsLink(body) {
  return `sms:${OWNER_PHONE}?body=${encodeURIComponent(body)}`;
}
