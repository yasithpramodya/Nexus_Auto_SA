/**
 * Nexus Auto SA – website form mailer
 *
 * Receives Contact Us / Request a Car submissions from the website and emails
 * them to the sales inbox from the Workspace account this script runs as.
 *
 * Setup (signed in as sales@nexusautosa.com.au):
 *   1. https://script.google.com → New project → paste this file into Code.gs → Save
 *   2. Run `testSendEmail` once and approve the permissions
 *   3. Deploy → New deployment → Web app
 *        Execute as: Me (sales@nexusautosa.com.au)
 *        Who has access: Anyone
 *   4. Copy the Web app URL into the website's .env as VITE_FORM_MAILER_URL
 *
 * After editing this script: Deploy → Manage deployments → Edit → Version: New version → Deploy
 * (the URL stays the same).
 */

const SALES_EMAIL = 'sales@nexusautosa.com.au';
const SENDER_NAME = 'Nexus Auto SA Website';

// Only these forms are accepted; anything else is rejected
const ALLOWED_FORMS = ['Contact Us Form', 'Request a Car Form'];

// Basic abuse limits
const MAX_FIELDS = 25;
const MAX_FIELD_LENGTH = 5000;
const MAX_EMAILS_PER_10_MIN = 30;     // across all visitors
const MAX_EMAILS_PER_SENDER_HOUR = 5; // per customer email address

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Honeypot field: real visitors never fill it, bots usually do
    if (data.botcheck) return jsonResponse({ success: true });

    const formName = String(data.formName || '');
    if (ALLOWED_FORMS.indexOf(formName) === -1) {
      return jsonResponse({ success: false, message: 'Unknown form' });
    }

    const replyTo = String(data.replyTo || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo)) {
      return jsonResponse({ success: false, message: 'Invalid email address' });
    }

    const fields = data.fields && typeof data.fields === 'object' ? data.fields : {};
    const entries = Object.keys(fields).slice(0, MAX_FIELDS).map(function (label) {
      return [String(label).slice(0, 100), String(fields[label] == null ? '' : fields[label]).slice(0, MAX_FIELD_LENGTH)];
    });

    if (!withinRateLimit(replyTo)) {
      return jsonResponse({ success: false, message: 'Too many submissions, please try again later' });
    }

    const summary = String(data.summary || '').replace(/[\r\n]+/g, ' ').slice(0, 150);
    const subject = '[' + formName + '] ' + summary;

    MailApp.sendEmail({
      to: SALES_EMAIL,
      subject: subject,
      replyTo: replyTo,
      name: SENDER_NAME,
      body: buildTextBody(formName, entries),
      htmlBody: buildHtmlBody(formName, entries, replyTo),
    });

    return jsonResponse({ success: true });
  } catch (err) {
    console.error(err);
    return jsonResponse({ success: false, message: 'Server error' });
  }
}

// Lets you open the Web app URL in a browser to check it is live
function doGet() {
  return jsonResponse({ success: true, message: 'Nexus Auto SA form mailer is running' });
}

function withinRateLimit(senderEmail) {
  const cache = CacheService.getScriptCache();
  const globalKey = 'global';
  const senderKey = 'sender:' + senderEmail;

  const globalCount = Number(cache.get(globalKey) || 0);
  const senderCount = Number(cache.get(senderKey) || 0);
  if (globalCount >= MAX_EMAILS_PER_10_MIN || senderCount >= MAX_EMAILS_PER_SENDER_HOUR) return false;

  cache.put(globalKey, String(globalCount + 1), 10 * 60);
  cache.put(senderKey, String(senderCount + 1), 60 * 60);
  return true;
}

function buildTextBody(formName, entries) {
  const lines = entries.map(function (entry) { return entry[0] + ': ' + entry[1]; });
  return 'New submission from the ' + formName + ' on the Nexus Auto SA website.\n\n' +
    lines.join('\n') +
    '\n\nSubmitted: ' + Utilities.formatDate(new Date(), 'Australia/Adelaide', 'dd MMM yyyy, h:mm a') +
    '\nReply to this email to respond to the customer directly.';
}

// Brand colours (match the website)
const BRAND = {
  red: '#e8192c',
  gold: '#f5c640',
  dark: '#0e0e16',
  ink: '#1f2430',
  muted: '#6b7280',
  line: '#ececf1',
  soft: '#f6f6f9',
};

// Fields that get their own highlighted row at the top instead of the details table
const MESSAGE_LABELS = ['Message', 'Additional Requirements'];
const PHONE_LABELS = ['Phone', 'Phone Number'];
const NAME_LABELS = ['Name', 'Full Name'];

function findField(entries, labels) {
  for (var i = 0; i < entries.length; i++) {
    if (labels.indexOf(entries[i][0]) !== -1) return entries[i][1];
  }
  return '';
}

// Inline styles and tables only: Gmail and Outlook ignore most <style> CSS
function buildHtmlBody(formName, entries, replyTo) {
  const submittedAt = Utilities.formatDate(new Date(), 'Australia/Adelaide', 'EEE dd MMM yyyy · h:mm a');
  const customerName = findField(entries, NAME_LABELS) || 'Website visitor';
  const phone = findField(entries, PHONE_LABELS);
  const message = findField(entries, MESSAGE_LABELS);
  const isCarRequest = formName === 'Request a Car Form';

  const detailRows = entries
    .filter(function (entry) { return MESSAGE_LABELS.indexOf(entry[0]) === -1; })
    .map(function (entry, i) {
      const bg = i % 2 === 0 ? '#ffffff' : BRAND.soft;
      return '<tr>' +
        '<td style="padding:11px 16px;background:' + bg + ';border-bottom:1px solid ' + BRAND.line + ';width:38%;font-size:12px;font-weight:bold;letter-spacing:.04em;text-transform:uppercase;color:' + BRAND.muted + ';vertical-align:top;">' + escapeHtml(entry[0]) + '</td>' +
        '<td style="padding:11px 16px;background:' + bg + ';border-bottom:1px solid ' + BRAND.line + ';font-size:14px;color:' + BRAND.ink + ';vertical-align:top;">' + escapeHtml(entry[1]) + '</td>' +
        '</tr>';
    }).join('');

  const messageBlock = message
    ? '<tr><td style="padding:0 32px 24px;">' +
        '<div style="font-size:12px;font-weight:bold;letter-spacing:.08em;text-transform:uppercase;color:' + BRAND.muted + ';margin-bottom:8px;">' +
          (isCarRequest ? 'Additional Requirements' : 'Message') + '</div>' +
        '<div style="background:' + BRAND.soft + ';border-left:4px solid ' + BRAND.gold + ';border-radius:6px;padding:16px 18px;font-size:15px;line-height:1.6;color:' + BRAND.ink + ';white-space:pre-wrap;">' + escapeHtml(message) + '</div>' +
      '</td></tr>'
    : '';

  const button = function (href, label, bg, color) {
    return '<a href="' + escapeHtml(href) + '" style="display:inline-block;margin:0 8px 8px 0;padding:12px 22px;background:' + bg + ';color:' + color + ';text-decoration:none;font-size:14px;font-weight:bold;border-radius:6px;">' + label + '</a>';
  };
  const actions =
    button('mailto:' + replyTo + '?subject=' + encodeURIComponent('Re: Your ' + (isCarRequest ? 'vehicle request' : 'enquiry') + ' with Nexus Auto SA'), '✉ Reply to ' + escapeHtml(customerName.split(' ')[0]), BRAND.red, '#ffffff') +
    (phone ? button('tel:' + phone.replace(/[^\d+]/g, ''), '☎ Call ' + escapeHtml(phone), BRAND.dark, BRAND.gold) : '');

  return '' +
    '<div style="margin:0;padding:24px 12px;background:#eef0f4;font-family:Segoe UI,Helvetica,Arial,sans-serif;">' +
    '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border-collapse:separate;box-shadow:0 4px 18px rgba(0,0,0,.06);">' +

      // Header
      '<tr><td style="background:' + BRAND.dark + ';padding:22px 32px;border-bottom:3px solid ' + BRAND.red + ';">' +
        '<div style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-.01em;">Nexus Auto <span style="color:' + BRAND.red + ';">SA</span></div>' +
        '<div style="font-size:12px;color:' + BRAND.gold + ';letter-spacing:.12em;text-transform:uppercase;margin-top:4px;">Japanese Imports · Australia &amp; Sri Lanka</div>' +
      '</td></tr>' +

      // Title
      '<tr><td style="padding:28px 32px 8px;">' +
        '<span style="display:inline-block;padding:5px 12px;border-radius:999px;background:' + (isCarRequest ? '#fff6dc' : '#fde8ea') + ';color:' + (isCarRequest ? '#9a6b00' : BRAND.red) + ';font-size:12px;font-weight:bold;letter-spacing:.06em;text-transform:uppercase;">' + escapeHtml(formName) + '</span>' +
        '<h1 style="margin:14px 0 4px;font-size:22px;line-height:1.3;color:' + BRAND.ink + ';">' +
          (isCarRequest ? 'New car request' : 'New enquiry') + ' from ' + escapeHtml(customerName) + '</h1>' +
        '<div style="font-size:13px;color:' + BRAND.muted + ';">' + submittedAt + ' (Adelaide time)</div>' +
      '</td></tr>' +

      // Quick actions
      '<tr><td style="padding:16px 32px 16px;">' + actions + '</td></tr>' +

      messageBlock +

      // Details
      '<tr><td style="padding:0 32px 28px;">' +
        '<div style="font-size:12px;font-weight:bold;letter-spacing:.08em;text-transform:uppercase;color:' + BRAND.muted + ';margin-bottom:8px;">Customer Details</div>' +
        '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid ' + BRAND.line + ';border-radius:8px;border-collapse:separate;overflow:hidden;">' + detailRows + '</table>' +
      '</td></tr>' +

      // Footer
      '<tr><td style="background:' + BRAND.soft + ';padding:16px 32px;font-size:12px;line-height:1.6;color:' + BRAND.muted + ';border-top:1px solid ' + BRAND.line + ';">' +
        'Sent automatically from the <strong>' + escapeHtml(formName) + '</strong> on the Nexus Auto SA website.<br>' +
        'Replying to this email goes straight to the customer at ' + escapeHtml(replyTo) + '.' +
      '</td></tr>' +

    '</table>' +
    '</div>';
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Run this once from the editor to grant permissions and check the email arrives
function testSendEmail() {
  const result = doPost({
    postData: {
      contents: JSON.stringify({
        formName: 'Contact Us Form',
        summary: 'Test enquiry from Apps Script editor',
        replyTo: SALES_EMAIL,
        fields: { Name: 'Test Customer', Email: SALES_EMAIL, Phone: '+61 400 000 000', 'Enquiry Type': 'General Enquiry', Message: 'This is a test email from the form mailer.' },
      }),
    },
  });
  console.log(result.getContent());
}
