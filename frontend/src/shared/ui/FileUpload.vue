<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@clerk/vue'
import { genUploader } from 'uploadthing/client'

const { getToken } = useAuth()

const apiBase = import.meta.env.VITE_API_URL ?? 'http://localhost:16000/api'
const { uploadFiles } = genUploader({ url: `${apiBase}/uploadthing` })

const ALLOWED = ['fb2', 'docx', 'txt']

defineProps<{ modelValue: string | null }>()

const emit = defineEmits<{
  'update:modelValue': [url: string]
  'update:fileType': [type: string]
}>()

const isUploading = ref(false)
const error = ref<string | null>(null)
const uploadedName = ref<string | null>(null)

const handleFile = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  if (!ALLOWED.includes(ext)) {
    error.value = `Поддерживаются форматы: ${ALLOWED.join(', ')}`
    return
  }

  isUploading.value = true
  error.value = null

  try {
    const token = await getToken.value()
    const [result] = await uploadFiles('bookUploader' as any, {
      files: [file],
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    emit('update:modelValue', result.ufsUrl)
    emit('update:fileType', ext)
    uploadedName.value = file.name
  } catch {
    error.value = 'Не удалось загрузить файл'
  } finally {
    isUploading.value = false
  }
}
</script>

<template>
  <div class="file-upload">
    <label class="upload-label" :class="{ uploading: isUploading, done: !!modelValue }">
      <input
        type="file"
        class="hidden-input"
        :accept="'.' + ALLOWED.join(',.')"
        :disabled="isUploading"
        @change="handleFile"
      />
      <span v-if="isUploading">Загрузка...</span>
      <span v-else-if="uploadedName" class="filename">{{ uploadedName }}</span>
      <span v-else>Прикрепить файл</span>
    </label>
    <p v-if="error" class="upload-error">{{ error }}</p>
  </div>
</template>

<style scoped lang="sass">
.file-upload
  display: flex
  flex-direction: column
  gap: 4px

.upload-label
  display: flex
  align-items: center
  justify-content: center
  padding: 5px 12px
  border-radius: 6px
  border: 1px dashed #e5e7eb
  font-size: 13px
  font-weight: 400
  color: #9ca3af
  cursor: pointer
  white-space: nowrap

  &.uploading
    opacity: 0.5
    cursor: not-allowed

  &.done
    border-style: solid
    color: #111827

.filename
  max-width: 120px
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.hidden-input
  display: none

.upload-error
  font-size: 12px
  color: #ef4444
  margin: 0
</style>
