<template>
  <div class="bg-[#0d1117] text-white min-h-screen">
    <ScreenGuard v-if="tooSmall" />
    <template v-else>
      <header
        class="w-full flex items-center justify-between px-8 py-4 bg-[#0d1117] border-b border-gray-700 shadow-lg"
      >
        <NuxtLink
          to="/"
          class="text-2xl font-bold hover:text-blue-400 transition"
        >
          CryptoPulse by Oleksii
        </NuxtLink>
        <div class="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </header>

      <CryptoTicker />
      <NuxtPage />
      <ChatBot />
      <Footer />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useScreenSize } from "@/composables/useScreenSize";

const { tooSmall } = useScreenSize();
</script>
