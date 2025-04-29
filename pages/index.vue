<template>
  <section class="min-h-screen bg-[#0d1117] text-white px-6 py-16">
    <!-- Кнопки нагорі -->
    <div class="text-center mb-16">
      <button
        @click="showSignatureModal = true"
        class="inline-block group mr-2"
      >
        <div
          class="relative w-full max-w-[500px] aspect-video mx-auto rounded-xl overflow-hidden shadow-lg transform transition group-hover:scale-105 group-hover:shadow-blue-500/50 animate-pulse-ring"
        >
          <img
            src="https://assets.finbold.com/uploads/2024/05/Crypto-trader-turns-800-into-657000-in-5-hours.jpg"
            alt="Go to courses"
            class="w-full h-full object-cover group-hover:opacity-90 transition"
          />
          <div
            class="absolute inset-0 border-4 border-blue-400/70 rounded-xl animate-glow pointer-events-none"
          ></div>
        </div>
        <p class="mt-3 text-2xl font-extrabold text-blue-400 animate-bounce">
          {{ t.button }}
        </p>
      </button>

      <NuxtLink to="/cryptomap" class="inline-block group">
        <div
          class="relative w-[500px] aspect-video mx-auto mt-8 rounded-xl overflow-hidden shadow-lg transform transition group-hover:scale-105 group-hover:shadow-green-500/50 animate-pulse-ring"
        >
          <img
            src="https://www.chainalysis.com/wp-content/uploads/2021/11/611c545f846ca6503248f2cd-chainalysis-map-copy-min-3.png"
            alt="Crypto Map"
            class="w-full h-full object-cover group-hover:opacity-90 transition"
          />
          <div
            class="absolute inset-0 border-4 border-green-400/70 rounded-xl animate-glow pointer-events-none"
          ></div>
        </div>
        <p class="mt-3 text-2xl font-extrabold text-green-400 animate-bounce">
          Explore Crypto Map
        </p>
      </NuxtLink>
    </div>

    <!-- NFT секція -->
    <div class="text-center mb-16">
      <NuxtLink to="/nftgallery" class="inline-block group">
        <div
          class="relative w-full max-w-[500px] aspect-video mx-auto rounded-xl overflow-hidden shadow-lg transform transition group-hover:scale-105 group-hover:shadow-purple-500/50 animate-pulse-ring"
        >
          <img
            src="https://dan-it.com.ua/wp-content/uploads/2024/10/nft.jpg"
            alt="Go to NFT Gallery"
            class="w-full h-full object-cover group-hover:opacity-90 transition"
          />
          <div
            class="absolute inset-0 border-4 border-purple-400/70 rounded-xl animate-glow pointer-events-none"
          ></div>
        </div>
        <p class="mt-3 text-2xl font-extrabold text-purple-400 animate-bounce">
          Explore NFT Gallery
        </p>
      </NuxtLink>
    </div>

    <!-- Заголовок -->
    <div class="max-w-3xl mx-auto text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t.title }}</h1>
      <p class="text-lg text-gray-400">{{ t.subtitle }}</p>
    </div>

    <!-- Топ-коіни -->
    <div
      class="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16"
    >
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

    <!-- CryptoChart -->
    <CryptoChart
      :coin-id="'bitcoin'"
      title="Bitcoin 30 Days Chart"
      class="mb-16"
    />

    <!-- Trending монети -->
    <div v-if="trendingCoins.length" class="max-w-4xl mx-auto mb-16 mt-16">
      <h2 class="text-2xl font-bold mb-4 text-center">🔥 Trending Now</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <NuxtLink
          v-for="trend in trendingCoins"
          :key="trend.id"
          :to="`/coin/${trend.id}`"
          class="bg-[#161b22] rounded-xl p-3 flex flex-col items-center text-center transform transition hover:scale-105 hover:ring-2 hover:ring-blue-500 cursor-pointer"
        >
          <img :src="trend.thumb" :alt="trend.name" class="w-10 h-10 mb-2" />
          <p class="text-sm font-semibold">{{ trend.name }}</p>
          <p class="text-xs text-gray-400">#{{ trend.market_cap_rank }}</p>
        </NuxtLink>
      </div>
    </div>

    <!-- Модальні вікна -->
    <HireModal v-if="showModal" @close="handleModalClose" />
    <HumanCheckModal v-if="showHumanCheck" @success="handleHumanCheckSuccess" />
    <SignatureModal
      v-if="showSignatureModal"
      @signed="goToCourses"
      @close="showSignatureModal = false"
    />
  </section>
</template>

<script setup lang="ts">
import { useLanguage } from "@/composables/useLanguage";
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { navigateTo } from "nuxt/app";
import { Coin, TrendingCoin } from "@/types/crypto";
import CryptoChart from "@/components/CryptoChart.vue";

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

const coins = ref<Coin[]>([]);
const trendingCoins = ref<TrendingCoin[]>([]);
const showModal = ref(false);
const showHumanCheck = ref(false);
const showSignatureModal = ref(false);

const fetchTopCoins = async () => {
  try {
    const res = await axios.get<Coin[]>(
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
    console.error(
      "Too many requests. Please wait a moment and try again. This is a free API and has a request limit."
    );
  }
};

const fetchTrendingCoins = async () => {
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/search/trending"
    );
    trendingCoins.value = res.data.coins.map(
      (coin: any): TrendingCoin => ({
        id: coin.item.id,
        name: coin.item.name,
        symbol: coin.item.symbol,
        thumb: coin.item.thumb,
        market_cap_rank: coin.item.market_cap_rank,
      })
    );
  } catch (e) {
    console.error(
      "Too many requests. Please wait a moment and try again. This is a free API and has a request limit."
    );
  }
};

const handleModalClose = () => {
  showModal.value = false;
  localStorage.setItem("hireModalShown", "true");
};

const handleHumanCheckSuccess = () => {
  showHumanCheck.value = false;
  localStorage.setItem("humanCheckPassed", "true");
};

const goToCourses = () => {
  showSignatureModal.value = false;
  navigateTo("/course");
};

onMounted(() => {
  const hireModalShown = localStorage.getItem("hireModalShown");
  const humanCheckPassed = localStorage.getItem("humanCheckPassed");

  if (hireModalShown !== "true") {
    setTimeout(() => {
      showModal.value = true;
    }, 3000);
  } else if (humanCheckPassed !== "true") {
    showHumanCheck.value = true;
  }

  fetchTopCoins();
  fetchTrendingCoins();
});
</script>

<style scoped>
@keyframes glow {
  0% {
    border-color: rgba(59, 130, 246, 0.4);
  }
  50% {
    border-color: rgba(59, 130, 246, 0.9);
  }
  100% {
    border-color: rgba(59, 130, 246, 0.4);
  }
}
@keyframes borderColorWave {
  0% {
    border-color: #facc15;
  }
  25% {
    border-color: #4ade80;
  }
  50% {
    border-color: #3b82f6;
  }
  75% {
    border-color: #8b5cf6;
  }
  100% {
    border-color: #facc15;
  }
}

.group-hover\:animate-border-color-wave {
  animation: borderColorWave 2s linear infinite;
}
.animate-glow {
  animation: glow 1.5s infinite;
}
</style>
