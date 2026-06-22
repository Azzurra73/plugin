const BASE = '/api'

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const register = (data) => request('/register', { method: 'POST', body: data })
export const verify = (data) => request('/verify', { method: 'POST', body: data })
export const subscribe = (data) => request('/subscribe', { method: 'POST', body: data })
export const getAdminData = (token) =>
  request('/admin/subscribers', { headers: { Authorization: `Bearer ${token}` } })
