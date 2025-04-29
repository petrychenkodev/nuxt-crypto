<template>
  <div>
    <CryptoTicker />

    <header class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#0d1117] border-b border-gray-700 shadow-lg">
    <NuxtLink to="/" class="text-2xl font-bold text-white hover:text-blue-400 transition">
      CryptoPulse by Oleksii
    </NuxtLink>

    <div class="flex items-center gap-4">
      <LanguageSwitcher />
    </div>
  </header>

    <NuxtPage />
    <ChatBot />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from "@/composables/useLanguage";

const { language } = useLanguage();
</script>
