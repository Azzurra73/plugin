// Lightweight in-memory store for the prototype backend.
// Replace with a real database (Supabase, Postgres, Firestore) before production.
// Data does not survive cold starts, so use it only for demo and testing.

const subscribers = new Map(); // email -> subscriber record
const verifications = new Map(); // email -> { emailCode, smsCode, expiresAt, verified }
const subscriptions = []; // subscription attempt log

function upsertSubscriber(record) {
  const existing = subscribers.get(record.email) || {};
  const merged = {
    ...existing,
    ...record,
    updatedAt: new Date().toISOString(),
    createdAt: existing.createdAt || new Date().toISOString(),
  };
  subscribers.set(record.email, merged);
  return merged;
}

function getSubscriber(email) {
  return subscribers.get(email) || null;
}

function listSubscribers() {
  return Array.from(subscribers.values());
}

function setVerification(email, data) {
  verifications.set(email, { ...verifications.get(email), ...data });
  return verifications.get(email);
}

function getVerification(email) {
  return verifications.get(email) || null;
}

function logSubscription(entry) {
  const record = { ...entry, id: subscriptions.length + 1, createdAt: new Date().toISOString() };
  subscriptions.push(record);
  return record;
}

function listSubscriptions() {
  return subscriptions;
}

module.exports = {
  upsertSubscriber,
  getSubscriber,
  listSubscribers,
  setVerification,
  getVerification,
  logSubscription,
  listSubscriptions,
};
