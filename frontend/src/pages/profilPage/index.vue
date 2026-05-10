<script setup lang="ts">
import { ref, onMounted } from 'vue'; // Добавили onMounted
import { authStore } from '../../shared/store/auth';
import { useRouter } from 'vue-router';
import { getProfileStats } from './api/get-count-books'; // Импортируем твой новый метод

const router = useRouter();
const passwordConfirm = ref('');
const showDeleteConfirm = ref(false);

// Теперь это не заглушка, а реактивное число
const booksCount = ref(0);
const isLoading = ref(true);

const getInitials = (name: string) => {
  return name ? name.charAt(0).toUpperCase() : 'U';
};

const goBack = () => {
  router.back();
};

const logout = () => {
  authStore.logout();
};

const confirmDelete = () => {
  if (passwordConfirm.value.length < 1) return;
  console.log('Удаление...');
};

// Получаем реальные данные при загрузке компонента
onMounted(async () => {
  try {
    const data = await getProfileStats();
    booksCount.value = data.booksCount;
  } catch (error) {
    console.error('Ошибка при получении статистики:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="profile-page">
    <div class="profile-card">
      <div class="user-block">
        <div class="avatar">
          {{ getInitials(authStore.user.value?.username) }}
        </div>
        <div class="meta">
          <h1>{{ authStore.user.value?.username }}</h1>
          <p>
            Книг на полке: 
            <strong v-if="!isLoading">{{ booksCount }}</strong>
            <span v-else>...</span>
          </p>
        </div>
        <button @click="goBack" class="back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Назад
        </button>
      </div>

      <div class="actions-row" v-if="!showDeleteConfirm">
        <button @click="logout" class="btn btn--gray">Выйти</button>
        <button @click="showDeleteConfirm = true" class="btn btn--light">
          Удалить аккаунт
        </button>
      </div>

      <div v-else class="delete-box">
        <input
          v-model="passwordConfirm"
          type="password"
          placeholder="Введите пароль для подтверждения"
          class="minimal-input"
        />
        <div class="actions-row">
          <button @click="confirmDelete" class="btn btn--black">
            Удалить навсегда
          </button>
          <button @click="showDeleteConfirm = false" class="btn btn--gray">
            Отмена
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.profile-page
  display: flex
  justify-content: center
  padding-top: 40px

.profile-card
  width: 100%
  max-width: 360px
  display: flex
  flex-direction: column
  gap: 24px

.back-btn
  display: flex
  align-items: center
  gap: 8px
  background: none
  border: none
  color: #999
  font-size: 14px
  cursor: pointer
  padding: 0
  width: fit-content
  transition: color 0.2s
  &:hover
    color: #333

.user-block
  display: flex
  align-items: center
  justify-content: space-between;
  gap: 16px
  .avatar
    width: 56px
    height: 56px
    background: #f5f5f5
    border-radius: 12px
    display: flex
    align-items: center
    justify-content: center
    font-size: 20px
    font-weight: 500
  h1
    font-size: 18px
    margin: 0
  p
    font-size: 13px
    color: #888
    margin: 4px 0 0
    strong
      color: #333

.actions-row
  display: flex
  gap: 10px
  .btn
    flex: 1
    border: none
    border-radius: 10px
    padding: 12px
    font-size: 13px
    font-weight: 500
    cursor: pointer
    transition: all 0.2s

.btn
  &--gray
    background: #f5f5f5
    color: #666
    &:hover
      background: #eeeeee

  &--light
    background: white
    border: 1px solid #f0f0f0 !important
    color: #bbb
    &:hover
      color: #ff4d4f
      border-color: #ffe3e3 !important

  &--black
    background: #000
    color: #fff
    &:hover
      background: #333

.minimal-input
  width: 100%
  padding: 12px
  border: 1px solid #f0f0f0
  border-radius: 10px
  background: #fafafa
  margin-bottom: 8px
  outline: none
  font-size: 13px
  &:focus
    border-color: #ddd
</style>
