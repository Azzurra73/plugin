// Email (SMTP) and SMS (Twilio) helpers for verification codes.
// In the prototype these log the code to the console when credentials are
// absent, so the flow is testable without real providers. Wire up the real
// providers by setting the environment variables described in .env.example.

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000)); // 6 digits
}

async function sendEmail({ to, code }) {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log(`[DEV] Email verification code for ${to}: ${code}`);
    return { delivered: false, dev: true };
  }
  // Lazy require so the dependency is optional in the prototype.
  const nodemailer = require('nodemailer');
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  await transport.sendMail({
    from: SMTP_FROM || SMTP_USER,
    to,
    subject: 'Your Framont Access verification code',
    text: `Your Framont Access verification code is ${code}. It expires in 10 minutes.`,
  });
  return { delivered: true };
}

async function sendSms({ to, code }) {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM) {
    console.log(`[DEV] SMS verification code for ${to}: ${code}`);
    return { delivered: false, dev: true };
  }
  const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  await twilio.messages.create({
    from: TWILIO_FROM,
    to,
    body: `Your Framont Access verification code is ${code}.`,
  });
  return { delivered: true };
}

module.exports = { generateCode, sendEmail, sendSms };
