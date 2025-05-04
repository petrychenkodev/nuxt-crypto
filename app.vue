<template>
  <div class="bg-[#0d1117] text-white min-h-screen">
    <ScreenGuard v-if="tooSmall" />
    <template v-else>
      <SiteHeader />
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
