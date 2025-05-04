<template>
  <header
    class="w-full flex items-center justify-between px-8 py-4 bg-[#0d1117] border-b border-gray-700 shadow-lg"
  >
    <NuxtLink to="/" class="text-2xl font-bold hover:text-blue-400 transition">
      CryptoPulse by Oleksii
    </NuxtLink>

    <div class="flex items-center gap-4">
      <LanguageSwitcher />
      <button @click="showAuthModal = true" class="text-sm text-white hover:text-blue-400 transition">
        Login / Sign Up
      </button>
    </div>
  </header>

  <div v-if="showAuthModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div class="bg-[#161b22] text-white p-6 rounded-lg shadow-lg w-80">
      <h2 class="text-lg font-bold mb-4 text-center">Login or Sign Up with Google</h2>
      <button
        @click="handleGoogleLogin"
        class="w-full text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
      >
        Continue with Google
      </button>
      <button
        @click="showAuthModal = false"
        class="mt-4 text-sm text-gray-400 hover:text-white w-full text-center"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showAuthModal = ref(false)

const handleGoogleLogin = () => {
  alert("Google login not implemented yet.")
}
</script>
