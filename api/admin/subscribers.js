// GET /api/admin/subscribers
// Returns subscribers and subscription log for the admin panel.
// Protected by a simple bearer token; replace with real auth before production.
const { send } = require('../_lib/http');
const { listSubscribers, listSubscriptions } = require('../_lib/store');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  if (req.method !== 'GET') return send(res, 405, { error: 'Method not allowed' });

  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return send(res, 401, { error: 'Unauthorized' });
  }

  return send(res, 200, {
    subscribers: listSubscribers(),
    subscriptions: listSubscriptions(),
  });
};
