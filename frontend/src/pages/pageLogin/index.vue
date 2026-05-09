<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { authApi } from './api/post-auth'; // Твой метод логина
import { register } from './api/post-reg';   // Твой метод регистрации

const router = useRouter();
const isLoading = ref(false);
const error = ref('');
const isLoginMode = ref(true); // Состояние: вход или регистрация

const form = reactive({
  username: '',
  email: '',
  password: '',
});

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value;
  error.value = '';
};

const handleSubmit = async () => {
  // Валидация
  if (!form.email || !form.password || (!isLoginMode.value && !form.username)) {
    error.value = 'Заполните все поля';
    return;
  }

  try {
    isLoading.value = true;
    error.value = '';

    if (isLoginMode.value) {
      // Используем твой метод из post-auth.ts
      await authApi.login({ email: form.email, password: form.password });
    } else {
      // Используем твой метод из post-reg.ts
      await register({ 
        username: form.username, 
        email: form.email, 
        password: form.password 
      });
    }

    router.push({ name: 'home' });
  } catch (err: any) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <h1>{{ isLoginMode ? 'Вход' : 'Регистрация' }}</h1>
        <p>{{ isLoginMode ? 'Рады видеть вас снова' : 'Создайте аккаунт для начала' }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <div v-if="!isLoginMode" class="form-group">
          <label>Имя пользователя</label>
          <input
            v-model="form.username"
            type="text"
            placeholder="Name"
            :disabled="isLoading"
          />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="example@mail.com"
            :disabled="isLoading"
          />
        </div>

        <div class="form-group">
          <label>Пароль</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            :disabled="isLoading"
          />
        </div>

        <p v-if="error" class="error-msg">{{ error }}</p>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          <span v-if="!isLoading">{{ isLoginMode ? 'Войти' : 'Создать аккаунт' }}</span>
          <span v-else class="loader"></span>
        </button>
      </form>

      <div class="auth-footer">
        <button @click="toggleMode" class="toggle-btn">
          {{ isLoginMode ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
$accent: #2196f3

$text: #2c3e50

.auth-page
  display: flex
  justify-content: center
  align-items: center
  min-height: 100vh

  padding: 20px

.auth-card
  background: white
  padding: 40px
  border-radius: 24px
  box-shadow: 0 10px 40px rgba(0,0,0,0.05)
  width: 100%
  max-width: 400px

.auth-header
  text-align: center
  margin-bottom: 32px
  h1
    font-size: 28px
    font-weight: 800
    color: $text
    margin-bottom: 8px
  p
    color: #888
    font-size: 14px

.auth-form
  display: flex
  flex-direction: column
  gap: 20px

.form-group
  display: flex
  flex-direction: column
  gap: 8px
  label
    font-size: 12px
    font-weight: 700
    text-transform: uppercase
    letter-spacing: 0.5px
    color: #aaa
  input
    padding: 14px 16px
    border-radius: 12px
    border: 1px solid #fafafa
    background: #fafafa
    font-size: 15px
    transition: all 0.2s
    &:focus
      outline: none
      border-color: $accent
      background: white
      box-shadow: 0 0 0 4px rgba($accent, 0.1)

.submit-btn
  margin-top: 10px
  padding: 16px
  border-radius: 12px
  border: none
  background: $text
  color: white
  font-weight: 700
  font-size: 16px
  cursor: pointer
  transition: transform 0.2s, background 0.2s
  display: flex
  justify-content: center
  align-items: center
  &:hover:not(:disabled)
    transform: translateY(-2px)
  &:active:not(:disabled)
    transform: translateY(0)
  &:disabled
    opacity: 0.6
    cursor: not-allowed

.auth-footer
  margin-top: 24px
  text-align: center
  .toggle-btn
    background: none
    border: none
    color: $accent
    font-weight: 600
    font-size: 14px
    cursor: pointer
    &:hover
      text-decoration: underline

.error-msg
  color: #ff4d4f
  font-size: 13px
  font-weight: 500
  text-align: center
  background: #fff1f0
  padding: 10px
  border-radius: 8px

.loader
  display: inline-block
  width: 20px
  height: 20px
  border: 3px solid rgba(255,255,255,.3)
  border-radius: 50%
  border-top-color: #fff
  animation: spin 1s ease-in-out infinite

// ВОТ ТУТ БЫЛА ОШИБКА. В SASS пишем без скобок:
@keyframes spin
  to 
    transform: rotate(360deg)
</style>