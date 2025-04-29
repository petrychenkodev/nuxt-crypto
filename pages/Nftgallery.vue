<template>
    <section class="min-h-screen bg-[#0d1117] text-white px-6 py-16">
      <div class="max-w-5xl mx-auto text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">🐶 Doggo Gallery</h1>
        <p class="text-lg text-gray-400">
          Enjoy some random cute dogs fetched directly from Dog CEO API!
        </p>
      </div>
  
      <div v-if="loading" class="text-center text-gray-400">Loading doggos...</div>
  
      <div
        v-else
        class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        <div
          v-for="(img, index) in dogImages"
          :key="index"
          class="bg-[#161b22] rounded-xl overflow-hidden shadow-lg transition transform hover:scale-105 hover:shadow-blue-500/50"
        >
          <img :src="img" alt="Dog Image" class="w-full h-60 object-cover" />
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-1">Random Dog</h2>
            <p class="text-sm text-gray-300">
              Here's a new furry friend from the Dog API!
            </p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const dogImages = ref<string[]>([]);
  const loading = ref(true);
  
  const fetchDogImages = async () => {
    try {
      const res = await axios.get('https://dog.ceo/api/breeds/image/random/6');
      dogImages.value = res.data.message;
    } catch (err) {
      console.error('Too many requests. Please wait a moment and try again. This is a free API and has a request limit.');
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchDogImages);
  </script>
  
  <style scoped>
  img {
    transition: opacity 0.3s ease;
  }
  </style>
  