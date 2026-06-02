const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:16000/api'

interface RequestOptions extends RequestInit {
  body?: any
}

export const apiRequest = async <T>(
  endpoint: string,
  getToken: () => Promise<string | null>,
  options: RequestOptions = {}
): Promise<T> => {
  const token = await getToken()

  const headers = new Headers(options.headers)

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const config: RequestInit = {
    ...options,
    headers,
  }

  if (options.body && typeof options.body !== 'string') {
    config.body = JSON.stringify(options.body)
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || `Ошибка запроса: ${response.status}`)
  }

  return response.json() as Promise<T>
}
