<template>
  <section class="min-h-screen bg-[#0d1117] text-white px-6 py-16">
    <div class="max-w-3xl mx-auto text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">
        {{ t.title }}
      </h1>
      <p class="text-lg text-gray-400">{{ t.subtitle }}</p>
    </div>

    <div
      class="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12"
    >
      <div
        v-for="coin in coins"
        :key="coin.id"
        class="bg-[#161b22] p-4 rounded-xl shadow-md flex flex-col items-center"
      >
        <img :src="coin.image" :alt="coin.name" class="w-12 h-12 mb-2" />
        <h3 class="text-lg font-semibold">{{ coin.name }}</h3>
        <p class="text-gray-400 text-sm">
          ${{ coin.current_price.toFixed(2) }}
        </p>
        <p
          :class="
            coin.price_change_percentage_24h >= 0
              ? 'text-green-400'
              : 'text-red-400'
          "
        >
          {{ coin.price_change_percentage_24h.toFixed(2) }}%
        </p>
      </div>
    </div>

    <div class="text-center mt-8">
      <NuxtLink to="/course" class="inline-block group">
        <div
          class="relative w-[200px] h-[200px] mx-auto rounded-xl overflow-hidden shadow-lg transform transition duration-300 group-hover:scale-105 group-hover:shadow-blue-500/50"
        >
          <img
            src="https://assets.finbold.com/uploads/2024/05/Crypto-trader-turns-800-into-657000-in-5-hours.jpg"
            alt="Go to courses"
            class="w-full h-full object-cover group-hover:opacity-90 transition duration-300"
          />
        </div>
        <p
          class="mt-3 text-lg font-semibold group-hover:text-blue-400 transition duration-300"
        >
          {{ t.button }}
        </p>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLanguage } from "@/composables/useLanguage";
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const { language } = useLanguage();

const translations = {
  en: {
    title: "Explore the World of Cryptocurrency",
    subtitle: "Live prices, trends, and our best blockchain courses.",
    button: "Go to Courses",
  },
  ua: {
    title: "Досліджуй світ криптовалюти",
    subtitle: "Актуальні ціни, тренди та наші найкращі курси по блокчейну.",
    button: "Перейти до курсів",
  },
};

const t = computed(() => translations[language.value]);

type Coin = {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

const coins = ref<Coin[]>([]);

const fetchTopCoins = async () => {
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          ids: "bitcoin,ethereum,solana,dogecoin",
          order: "market_cap_desc",
          per_page: 4,
          page: 1,
          sparkline: false,
        },
      }
    );
    coins.value = res.data;
  } catch (e) {
    console.error("Failed to fetch CoinGecko data", e);
  }
};

onMounted(fetchTopCoins);
</script>
