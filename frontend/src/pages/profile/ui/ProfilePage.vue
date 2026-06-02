<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuth, useClerk } from '@clerk/vue'
import { createUserApi } from '@/shared/api/user'
import { BaseButton } from '@/shared/ui'

const { getToken } = useAuth()
const clerk = useClerk()
const handleSignOut = () => clerk.value?.signOut()
const api = createUserApi(() => getToken.value())

const email = ref('')
const emailNotifications = ref(true)
const isLoading = ref(true)
const isSaving = ref(false)

onMounted(async () => {
  try {
    const me = await api.getMe()
    email.value = me.email
    emailNotifications.value = me.emailNotifications
  } finally {
    isLoading.value = false
  }
})

const toggleNotifications = async () => {
  isSaving.value = true
  try {
    const updated = await api.updateMe({ emailNotifications: !emailNotifications.value })
    emailNotifications.value = updated.emailNotifications
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="profile-page">
    <h2 class="page-title">Профиль</h2>

    <div v-if="isLoading" class="muted">Загрузка...</div>

    <template v-else>
      <div class="section">
        <p class="label">Email для напоминаний</p>
        <p class="value">{{ email }}</p>
      </div>

      <div class="section">
        <div class="row">
          <div>
            <p class="label">Напоминания по email</p>
            <p class="sub">За день до дедлайна события</p>
          </div>
          <button
            class="toggle"
            :class="{ 'toggle--on': emailNotifications }"
            :disabled="isSaving"
            @click="toggleNotifications"
          />
        </div>
      </div>

      <div class="section section--bottom">
        <BaseButton variant="danger" @click="handleSignOut">Выйти из аккаунта</BaseButton>
      </div>
    </template>
  </div>
</template>

<style scoped lang="sass">
.profile-page
  max-width: 480px
  margin: 0 auto
  display: flex
  flex-direction: column
  gap: 4px

.page-title
  font-size: 16px
  font-weight: 600
  color: #111827
  margin: 0 0 16px

.section
  padding: 16px 0
  border-bottom: 1px solid #e5e7eb

  &--bottom
    border-bottom: none
    padding-top: 20px

.row
  display: flex
  align-items: center
  justify-content: space-between
  gap: 16px

.label
  font-size: 13px
  font-weight: 500
  color: #111827
  margin: 0 0 2px

.value
  font-size: 13px
  color: #6b7280
  margin: 0

.sub
  font-size: 12px
  color: #9ca3af
  margin: 0

// Toggle switch
.toggle
  width: 40px
  height: 24px
  border-radius: 12px
  background: #d1d5db
  border: none
  cursor: pointer
  position: relative
  flex-shrink: 0
  transition: background 0.2s

  &::after
    content: ''
    position: absolute
    top: 3px
    left: 3px
    width: 18px
    height: 18px
    border-radius: 50%
    background: #fff
    transition: transform 0.2s

  &--on
    background: #111827

    &::after
      transform: translateX(16px)

  &:disabled
    opacity: 0.5
    cursor: default

.muted
  color: #9ca3af
  font-size: 13px
</style>
