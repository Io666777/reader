import { reactive, computed } from 'vue';

// 1. Создаем приватное состояние (state)
// Сразу пытаемся достать токен из localStorage, чтобы сессия не обрывалась при F5
const state = reactive({
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user') || 'null')
});

// 2. Экспортируем объект с методами и геттерами
export const authStore = {
  // Геттеры (computed) — чтобы компоненты могли следить за изменениями
  token: computed(() => state.token),
  user: computed(() => state.user),
  isAuth: computed(() => !!state.token),

  // Действия (actions)
  setToken(newToken: string) {
    state.token = newToken;
    localStorage.setItem('token', newToken);
  },

  setUser(userData: any) {
    state.user = userData;
    localStorage.setItem('user', JSON.stringify(userData));
  },

  logout() {
    state.token = null;
    state.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // После выхода обычно полезно редиректнуть на логин
    window.location.href = '/login';
  }
};