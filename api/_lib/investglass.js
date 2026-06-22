// InvestGlass onboarding integration.
// Creates or retrieves an onboarding session for a subscriber who wants to
// subscribe to a Framont product, and returns the onboarding URL the front end
// redirects the client to. When credentials are absent it returns a mock URL so
// the end-to-end flow stays testable in the prototype.

async function createOnboardingSession({ subscriber, product }) {
  const { INVESTGLASS_API_URL, INVESTGLASS_API_KEY } = process.env;

  if (!INVESTGLASS_API_URL || !INVESTGLASS_API_KEY) {
    return {
      onboardingUrl: `https://onboarding.investglass.com/mock?product=${encodeURIComponent(product.id)}`,
      sessionRef: `mock-${Date.now()}`,
      dev: true,
    };
  }

  // Adjust the endpoint path and payload shape to match your InvestGlass tenant.
  const response = await fetch(`${INVESTGLASS_API_URL.replace(/\/$/, '')}/contacts/onboarding`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${INVESTGLASS_API_KEY}`,
    },
    body: JSON.stringify({
      first_name: subscriber.firstName,
      last_name: subscriber.lastName,
      email: subscriber.email,
      phone: subscriber.phone,
      investor_category: subscriber.investorCategory,
      product: {
        id: product.id,
        isin: product.isin || null,
        name: product.name,
        category: product.category,
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`InvestGlass error ${response.status}: ${text}`);
  }

  const data = await response.json();
  return {
    onboardingUrl: data.onboarding_url || data.url,
    sessionRef: data.session_id || data.id,
    dev: false,
  };
}

module.exports = { createOnboardingSession };
