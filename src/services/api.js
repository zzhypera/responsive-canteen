const API_URL = import.meta.env.VITE_API_URL || ''

export async function api(path, options = {}) {
  const token = localStorage.getItem('canteen_token')
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  }

  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  })

  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await response.json() : null

  if (!response.ok) {
    throw new Error(data?.message || `Request failed with status ${response.status}`)
  }

  return data
}