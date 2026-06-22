// POST /api/register
// Registers a subscriber and dispatches email + SMS verification codes.
const { send, readJson, isValidEmail, isValidPhone } = require('./_lib/http');
const { upsertSubscriber, setVerification } = require('./_lib/store');
const { generateCode, sendEmail, sendSms } = require('./_lib/notify');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });

  let body;
  try {
    body = await readJson(req);
  } catch {
    return send(res, 400, { error: 'Invalid JSON' });
  }

  const { firstName, lastName, email, phone, investorCategory, gdprConsent } = body;

  if (!firstName || !lastName) return send(res, 400, { error: 'Name is required' });
  if (!isValidEmail(email)) return send(res, 400, { error: 'Invalid email' });
  if (!isValidPhone(phone)) return send(res, 400, { error: 'Invalid phone' });
  if (!['Retail', 'Professional', 'Institutional'].includes(investorCategory)) {
    return send(res, 400, { error: 'Invalid investor category' });
  }
  if (!gdprConsent) return send(res, 400, { error: 'GDPR consent required' });

  upsertSubscriber({ firstName, lastName, email, phone, investorCategory, gdprConsent, source: 'web', verified: false });

  const emailCode = generateCode();
  const smsCode = generateCode();
  setVerification(email, {
    emailCode,
    smsCode,
    verified: false,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });

  try {
    await Promise.all([sendEmail({ to: email, code: emailCode }), sendSms({ to: phone, code: smsCode })]);
  } catch (err) {
    return send(res, 502, { error: 'Failed to send verification codes', detail: err.message });
  }

  return send(res, 200, { ok: true, message: 'Verification codes sent' });
};
