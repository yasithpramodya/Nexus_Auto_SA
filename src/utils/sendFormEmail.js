// Emails form submissions to sales@nexusautosa.com.au through our Google Apps Script web app
// (source: google-apps-script/FormMailer.gs). The web app URL is set in the .env file.
const FORM_MAILER_URL = import.meta.env.VITE_FORM_MAILER_URL || '';

export const isEmailConfigured = () => FORM_MAILER_URL.startsWith('https://script.google.com/');

/**
 * @param {string} formName  Shown in the subject, e.g. "Contact Us Form"
 * @param {string} summary   Short description after the form name, e.g. "John Smith"
 * @param {string} replyTo   Customer email, so "Reply" in Gmail goes straight to them
 * @param {Object} fields    Label → value pairs listed in the email body
 */
export async function sendFormEmail({ formName, summary, replyTo, fields }) {
  if (!isEmailConfigured()) throw new Error('VITE_FORM_MAILER_URL not set');

  // text/plain avoids a CORS preflight, which Apps Script web apps don't support
  const res = await fetch(FORM_MAILER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ formName, summary, replyTo, fields }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new Error(data.message || `Email failed (${res.status})`);
}
