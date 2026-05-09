// frontend/src/shared/api/base.ts
import { authStore } from '../store/auth'; // Проверь правильность пути к файлу auth.ts

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Достаем токен из стора (он там реактивный благодаря computed)
  const token = authStore.token.value; 

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (options?.headers) {
    Object.assign(headers, options.headers);
  }

  console.log(`[apiRequest] To: ${endpoint}`, 'Headers:', headers);

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    // Если сервер вернул 401, значит токен протух — разлогиниваем
    if (response.status === 401 && !endpoint.includes('/auth/')) {
      authStore.logout();
    }
    
    throw new Error(errorData.error || `Ошибка сервера: ${response.status}`);
  }
  
  return response.json();
}