<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@clerk/vue'
import mammoth from 'mammoth'
import { createBooksApi } from '@/shared/api/books'
import type { Book } from '@/entities/book'

const route = useRoute()
const router = useRouter()
const { getToken } = useAuth()
const api = createBooksApi(() => getToken.value())

const book = ref<Book | null>(null)
const html = ref('')
const status = ref<'loading' | 'ready' | 'error'>('loading')
const errorMsg = ref('')
const progress = ref(0)

const isTextFormat = computed(() => {
  const t = book.value?.fileType?.toLowerCase()
  return t === 'fb2' || t === 'docx'
})

const storageKey = () => `reading-progress-${route.params.bookId}`

function saveProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  if (scrollable <= 0) return
  const pct = Math.round((window.scrollY / scrollable) * 100)
  progress.value = pct
  localStorage.setItem(storageKey(), String(pct))
}

function restoreProgress() {
  const saved = localStorage.getItem(storageKey())
  if (!saved) return
  const pct = Number(saved)
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  window.scrollTo({ top: (pct / 100) * scrollable, behavior: 'instant' })
  progress.value = pct
}

onMounted(async () => {
  window.addEventListener('scroll', saveProgress, { passive: true })

  try {
    const res = await api.getById(route.params.bookId as string)
    book.value = res.data

    const fileUrl = res.data.fileUrl
    const fileType = res.data.fileType?.toLowerCase()

    if (!fileUrl) {
      status.value = 'error'
      errorMsg.value = 'Файл не прикреплён'
      return
    }

    if (fileType === 'pdf') {
      html.value = fileUrl
      status.value = 'ready'
      return
    }

    if (fileType === 'fb2') {
      const text = await fetchFile(fileUrl)
      html.value = parseFb2(text)
      status.value = 'ready'
      await nextTick()
      requestAnimationFrame(() => requestAnimationFrame(restoreProgress))
      return
    }

    if (fileType === 'docx') {
      const buf = await fetchArrayBuffer(fileUrl)
      const result = await mammoth.convertToHtml({ arrayBuffer: buf })
      html.value = result.value
      status.value = 'ready'
      await nextTick()
      requestAnimationFrame(() => requestAnimationFrame(restoreProgress))
      return
    }

    status.value = 'error'
    errorMsg.value = `Формат «${fileType}» не поддерживается для просмотра`
  } catch (e) {
    status.value = 'error'
    errorMsg.value = 'Не удалось загрузить книгу'
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', saveProgress)
})

async function fetchFile(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error('fetch failed')
  return res.text()
}

async function fetchArrayBuffer(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url)
  if (!res.ok) throw new Error('fetch failed')
  return res.arrayBuffer()
}

function parseFb2(source: string): string {
  const parser = new DOMParser()
  const xml = parser.parseFromString(source, 'application/xml')

  if (xml.querySelector('parsererror')) {
    throw new Error('Invalid FB2 XML')
  }

  function convertNode(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || ''
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return ''

    const el = node as Element
    const localName = el.localName.toLowerCase()
    const kids = Array.from(el.childNodes).map(convertNode).join('')

    switch (localName) {
      case 'body':    return kids
      case 'section': return `<div class="fb-section">${kids}</div>`
      case 'title':   return `<h2 class="fb-title">${kids}</h2>`
      case 'subtitle':return `<h3 class="fb-subtitle">${kids}</h3>`
      case 'p':       return `<p class="fb-p">${kids}</p>`
      case 'emphasis':return `<em>${kids}</em>`
      case 'strong':  return `<strong>${kids}</strong>`
      case 'epigraph':return `<blockquote class="fb-epigraph">${kids}</blockquote>`
      case 'poem':    return `<div class="fb-poem">${kids}</div>`
      case 'stanza':  return `<div class="fb-stanza">${kids}</div>`
      case 'v':       return `<p class="fb-v">${kids}</p>`
      case 'cite':    return `<blockquote class="fb-cite">${kids}</blockquote>`
      case 'empty-line': return '<div class="fb-empty"></div>'
      case 'image':   return ''
      default:        return kids
    }
  }

  const body = xml.querySelector('body')
  if (!body) throw new Error('No body in FB2')
  return convertNode(body)
}
</script>

<template>
  <div class="reader-page">
    <header class="reader-header">
      <button class="back-btn" @click="router.back()">← Назад</button>
      <div v-if="book" class="book-info">
        <span class="book-title">{{ book.title ?? 'Без названия' }}</span>
        <span v-if="book.author" class="book-author">{{ book.author }}</span>
      </div>
      <span v-if="status === 'ready' && isTextFormat" class="progress-label">
        {{ progress }}%
      </span>
    </header>
    <div v-if="status === 'ready' && isTextFormat" class="progress-bar progress-bar--fixed">
      <div class="progress-fill" :style="{ width: progress + '%' }" />
    </div>

    <div v-if="status === 'loading'" class="state-msg">Загрузка...</div>

    <div v-else-if="status === 'error'" class="state-msg state-msg--error">
      {{ errorMsg }}
    </div>

    <template v-else-if="status === 'ready'">
      <!-- PDF -->
      <iframe
        v-if="book?.fileType?.toLowerCase() === 'pdf'"
        :src="html"
        class="pdf-frame"
      />

      <!-- FB2 / DOCX -->
      <article
        v-else
        class="fb2-content"
        v-html="html"
      />
    </template>
  </div>
</template>

<style scoped lang="sass">
.reader-page
  display: flex
  flex-direction: column
  min-height: 100%

.reader-header
  position: sticky
  top: 0
  z-index: 99
  background: #fff
  display: flex
  align-items: center
  gap: 16px
  padding: 12px 0
  border-bottom: 1px solid #e5e7eb
  margin-bottom: 24px
  max-width: 680px
  margin-left: auto
  margin-right: auto
  width: 100%

.back-btn
  font-size: 13px
  font-weight: 500
  color: #6b7280
  background: none
  border: none
  cursor: pointer
  padding: 0
  white-space: nowrap
  flex-shrink: 0
  &:hover
    color: #111827

.book-info
  display: flex
  flex-direction: column
  gap: 1px
  min-width: 0

.book-title
  font-size: 14px
  font-weight: 600
  color: #111827
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.book-author
  font-size: 12px
  color: #9ca3af

.progress-label
  font-size: 12px
  color: #9ca3af
  flex-shrink: 0
  margin-left: auto

.progress-bar
  height: 2px
  background: #f3f4f6
  border-radius: 1px

  &--fixed
    position: fixed
    top: 0
    left: 0
    right: 0
    z-index: 100
    background: transparent

.progress-fill
  height: 100%
  background: #111827
  border-radius: 1px
  transition: width 0.3s ease

.state-msg
  font-size: 14px
  color: #9ca3af
  padding: 40px 0
  text-align: center

  &--error
    color: #ef4444

// PDF
.pdf-frame
  width: 100%
  flex: 1
  min-height: 80vh
  border: none
  border-radius: 4px

// FB2 content styles (unscoped via :deep)
.fb2-content
  max-width: 100%
  margin: 0 auto
  font-size: 16px
  line-height: 1.8
  color: #111827
  overflow-wrap: break-word
  word-break: break-word

  :deep(.fb-section)
    margin-bottom: 2em

  :deep(.fb-title)
    font-size: 1.4em
    font-weight: 700
    margin: 1.5em 0 0.5em
    color: #111827
    line-height: 1.3

  :deep(.fb-subtitle)
    font-size: 1.1em
    font-weight: 600
    margin: 1em 0 0.4em
    color: #374151

  :deep(.fb-p)
    margin: 0
    text-indent: 1.5em

    & + .fb-p
      margin-top: 0

  :deep(.fb-epigraph)
    margin: 1em 2em
    padding-left: 1em
    border-left: 3px solid #e5e7eb
    color: #6b7280
    font-style: italic

  :deep(.fb-poem)
    margin: 1em 0

  :deep(.fb-stanza)
    margin-bottom: 0.8em

  :deep(.fb-v)
    margin: 0
    text-indent: 0

  :deep(.fb-cite)
    margin: 1em 2em
    padding-left: 1em
    border-left: 3px solid #e5e7eb
    color: #6b7280

  :deep(.fb-empty)
    height: 0.8em
</style>
