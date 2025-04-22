<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

const { language, setLanguage } = useLanguage()

const buttonClass = (lang: 'en' | 'ua') =>
  `px-3 py-2 text-sm rounded-full transition-all duration-200 ${
    language.value === lang
      ? 'bg-white text-black shadow'
      : 'bg-gray-700 text-white'
  }`
</script>

<template>
  <div class="flex gap-2">
    <button @click="setLanguage('en')" :class="buttonClass('en')">🇬🇧</button>
    <button @click="setLanguage('ua')" :class="buttonClass('ua')">🇺🇦</button>
  </div>
</template>