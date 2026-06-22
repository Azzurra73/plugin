# Framont Access — Backend (prototype)

Serverless functions that complete the Framont Access front end: subscriber
registration with email + SMS verification, and product subscription via the
InvestGlass onboarding API. Written for the common Node request/response
signature used by Vercel and Netlify functions; each file in `api/` is one
endpoint.

## Endpoints

| Method | Path                      | Purpose                                              |
|--------|---------------------------|------------------------------------------------------|
| POST   | `/api/register`           | Register a subscriber, send email + SMS codes.       |
| POST   | `/api/verify`             | Confirm both codes, mark subscriber verified.        |
| POST   | `/api/subscribe`          | Start InvestGlass onboarding for a chosen product.   |
| GET    | `/api/admin/subscribers`  | Admin list of subscribers + subscription log.        |

## Prototype behaviour

The store in `_lib/store.js` is in memory, so data is lost on cold start.
Replace it with a real database before production. When SMTP, Twilio, or
InvestGlass credentials are absent, the helpers log codes to the console and
return a mock onboarding URL, so the full flow is testable without providers.

## Configuration

Copy `.env.example` to `.env` (or set the variables in your hosting dashboard)
and fill in the InvestGlass, SMTP, Twilio, and admin values.

## Example flow

```bash
curl -X POST /api/register -d '{"firstName":"Anna","lastName":"Rossi","email":"a@b.com","phone":"+391234567","investorCategory":"Professional","gdprConsent":true}'
# read codes from logs in dev
curl -X POST /api/verify -d '{"email":"a@b.com","emailCode":"123456","smsCode":"654321"}'
curl -X POST /api/subscribe -d '{"email":"a@b.com","product":{"id":"eti-001","name":"Framont Global ETI","category":"ETI","isin":"XS0000000001"}}'
```

## Wiring InvestGlass

Adjust the endpoint path and payload in `_lib/investglass.js` to match your
InvestGlass tenant. The function returns `{ onboardingUrl, sessionRef }`; the
front end redirects the client to `onboardingUrl` in a new tab.
