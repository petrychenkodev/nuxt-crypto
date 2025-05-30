<template>
  <section class="min-h-screen bg-[#0d1117] text-white px-6 py-16">
    <div class="max-w-5xl mx-auto text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">🐶 Doggo Gallery</h1>
      <p class="text-lg text-gray-400">
        Enjoy some random cute dogs fetched directly from Dog CEO API!
      </p>
    </div>

    <div v-if="loading" class="text-center text-gray-400">
      Loading doggos...
    </div>

    <div
      v-else
      class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
    >
      <div
        v-for="(dog, index) in dogData"
        :key="index"
        class="bg-[#161b22] rounded-xl overflow-hidden shadow-lg transition transform hover:scale-105 hover:shadow-blue-500/50"
      >
        <img
          :src="dog.image"
          alt="Dog Image"
          class="w-full h-60 object-cover"
        />
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-1">{{ dog.name }}</h2>
          <p class="text-sm text-gray-300 mb-2">
            {{ dog.description }}
          </p>
          <p class="text-lg font-bold text-green-400">{{ dog.price }} ETH</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApi } from '@/composables/useApi';

const randomDescriptions = [
  "Playful Pup",
  "Sassy Doggo",
  "Chill Woof",
  "Explorer Doggo",
  "Sleepy Snout",
  "Adventurous Tail",
  "Loyal Companion",
  "Funny Sniffer",
];

const getRandomPrice = () => {
  return (Math.random() * 0.49 + 0.01).toFixed(2);
};

const getRandomDescription = () => {
  const randomIndex = Math.floor(Math.random() * randomDescriptions.length);
  return randomDescriptions[randomIndex];
};

import { getCachedData, setCachedData } from "@/utils/cache";

interface Dog {
  image: string;
  price: string;
  name: string;
  description: string;
}

const dogData = ref<Dog[]>([]);
const loading = ref(true);

const { fetchData } = useApi();

const fetchDogImages = async () => {
  const cached = getCachedData<Dog[]>("dogData", 300);

  if (cached) {
    dogData.value = cached;
    loading.value = false;
    return;
  }

  const { data, error, success } = await fetchData<{ message: string[] }>(
    "https://dog.ceo/api/breeds/image/random/6"
  );

  if (!success || !data) {
    console.error(
      "Too many requests. Please wait a moment and try again. This is a free API and has a request limit.",
      error
    );
    loading.value = false;
    return;
  }

  dogData.value = data.message.map((img: string) => ({
    image: img,
    price: getRandomPrice(),
    name: "Random Dog",
    description: getRandomDescription(),
  }));

  setCachedData("dogData", dogData.value);
  loading.value = false;
};

onMounted(fetchDogImages);
</script>

<style scoped>
img {
  transition: opacity 0.3s ease;
}
</style>
