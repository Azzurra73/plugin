// POST /api/subscribe
// Starts the InvestGlass onboarding for a verified subscriber and a chosen
// product, logs the attempt, and returns the onboarding redirect URL.
const { send, readJson, isValidEmail } = require('./_lib/http');
const { getSubscriber, logSubscription } = require('./_lib/store');
const { createOnboardingSession } = require('./_lib/investglass');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });

  let body;
  try {
    body = await readJson(req);
  } catch {
    return send(res, 400, { error: 'Invalid JSON' });
  }

  const { email, product } = body;
  if (!isValidEmail(email)) return send(res, 400, { error: 'Invalid email' });
  if (!product || !product.id || !product.name) return send(res, 400, { error: 'Product is required' });

  const subscriber = getSubscriber(email);
  if (!subscriber) return send(res, 404, { error: 'Subscriber not found' });
  if (!subscriber.verified) return send(res, 403, { error: 'Subscriber not verified' });

  let session;
  try {
    session = await createOnboardingSession({ subscriber, product });
  } catch (err) {
    return send(res, 502, { error: 'InvestGlass onboarding failed', detail: err.message });
  }

  logSubscription({
    email,
    productId: product.id,
    productName: product.name,
    sessionRef: session.sessionRef,
    status: 'submitted',
  });

  return send(res, 200, { ok: true, onboardingUrl: session.onboardingUrl, sessionRef: session.sessionRef });
};
