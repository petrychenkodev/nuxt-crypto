<template>
  <section class="mb-16">
    <div class="max-w-6xl mx-auto text-center mb-12">
      <h2 class="text-3xl font-bold mb-4">{{ t.title }}</h2>
      <p class="text-gray-400">{{ t.subtitle }}</p>
    </div>

    <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
      <NuxtLink
        v-for="coin in coins"
        :key="coin.id"
        :to="`/coin/${coin.id}`"
        class="group bg-[#161b22] p-4 rounded-xl shadow-md flex flex-col items-center transform transition hover:scale-105 relative overflow-hidden ring-2 ring-transparent hover:ring-4 hover:ring-yellow-400 animate-border-glow"
      >
        <div
          class="absolute inset-0 border-2 rounded-xl border-transparent group-hover:animate-border-color-wave pointer-events-none"
        ></div>
        <img :src="coin.image" :alt="coin.name" class="w-12 h-12 mb-2 z-10" />
        <h3 class="text-lg font-semibold z-10">{{ coin.name }}</h3>
        <p class="text-gray-400 text-sm z-10">
          ${{ coin.current_price.toFixed(2) }}
        </p>
        <p
          :class="[
            coin.price_change_percentage_24h >= 0
              ? 'text-green-400'
              : 'text-red-400',
            'z-10',
          ]"
        >
          {{ coin.price_change_percentage_24h.toFixed(2) }}%
        </p>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useLanguage } from "@/composables/useLanguage";

interface Coin {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const coins = ref<Coin[]>([]);

const fetchTopCoins = async () => {
  try {
    const res = await $fetch<Coin[]>(
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
    coins.value = res;
  } catch (e) {
    console.error("Failed to fetch top coins", e);
  }
};

onMounted(fetchTopCoins);

const { language } = useLanguage();

const translations = {
  en: {
    title: "Top Coins",
    subtitle: "Real-time prices of the most popular cryptocurrencies.",
  },
  ua: {
    title: "Топ монети",
    subtitle: "Актуальні ціни найпопулярніших криптовалют.",
  },
};

const t = computed(() => translations[language.value]);
</script>
