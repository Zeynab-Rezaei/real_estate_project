const BASE = '/api';

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch {
    throw new Error('We could not reach our office. Please check your connection and try again.');
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong. Please try again.');
  }
  return data;
}

export function submitInquiry(payload) {
  return request('/inquiries', { method: 'POST', body: JSON.stringify(payload) });
}

export function subscribeNewsletter(email) {
  return request('/newsletter', { method: 'POST', body: JSON.stringify({ email }) });
}
