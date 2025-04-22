<template>
  <div>
    <CryptoTicker />

    <header class="absolute top-12 right-4 z-50 flex items-center gap-3">
      <NuxtLink
        to="/"
        class="px-3 py-2 text-sm bg-[#161b22] hover:bg-[#1f2733] text-white rounded-full shadow transition"
      >
        🏠 {{ language === 'en' ? 'Home' : 'Додому' }}
      </NuxtLink>

      <LanguageSwitcher />
    </header>

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

const { language } = useLanguage()
</script>