<template>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApi } from '@/composables/useApi';

interface TrendingCoin {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  market_cap_rank: number;
}

const trendingCoins = ref<TrendingCoin[]>([]);

const { fetchData } = useApi();

const fetchTrendingCoins = async () => {
  const { data, error, success } = await fetchData<{ coins: { item: any }[] }>(
    "https://api.coingecko.com/api/v3/search/trending"
  );

  if (!success || !data) {
    console.error("Error fetching trending coins:", error);
    return;
  }

  trendingCoins.value = data.coins.map(
    (coin): TrendingCoin => ({
      id: coin.item.id,
      name: coin.item.name,
      symbol: coin.item.symbol,
      thumb: coin.item.thumb,
      market_cap_rank: coin.item.market_cap_rank,
    })
  );
};

onMounted(() => {
  fetchTrendingCoins();
});
</script>
