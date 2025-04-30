<template>
  <div class="relative min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center text-center px-6 overflow-hidden">

    <div class="absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

    <div class="z-10 max-w-md">
      <h1 class="text-7xl font-extrabold text-yellow-400 mb-4">404</h1>
      <p class="text-2xl font-bold mb-2">🔍 Oops! Crypto not found.</p>
      <p class="text-gray-400 mb-6">This coin might be hidden in the blockchain... or maybe the page doesn't exist 🤖</p>
      <NuxtLink
        to="/"
        class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
      >
        🔙 Go back to Dashboard
      </NuxtLink>
    </div>

  </div>
</template>