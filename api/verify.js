// POST /api/verify
// Confirms the email and SMS codes and marks the subscriber as verified.
const { send, readJson, isValidEmail } = require('./_lib/http');
const { getVerification, setVerification, upsertSubscriber, getSubscriber } = require('./_lib/store');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });

  let body;
  try {
    body = await readJson(req);
  } catch {
    return send(res, 400, { error: 'Invalid JSON' });
  }

  const { email, emailCode, smsCode } = body;
  if (!isValidEmail(email)) return send(res, 400, { error: 'Invalid email' });

  const record = getVerification(email);
  if (!record) return send(res, 404, { error: 'No pending verification' });
  if (Date.now() > record.expiresAt) return send(res, 410, { error: 'Codes expired' });
  if (String(emailCode) !== record.emailCode || String(smsCode) !== record.smsCode) {
    return send(res, 401, { error: 'Invalid codes' });
  }

  setVerification(email, { verified: true });
  upsertSubscriber({ ...getSubscriber(email), email, verified: true });

  return send(res, 200, { ok: true, verified: true });
};
