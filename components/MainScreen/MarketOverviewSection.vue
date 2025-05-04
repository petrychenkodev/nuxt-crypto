<template>
  <section class="mb-16">
    <CryptoChart
      :coin-id="'bitcoin'"
      title="Bitcoin 30 Days Chart"
      class="mb-16"
    />

    <div v-if="props.trendingCoins.length" class="max-w-4xl mx-auto mt-16">
      <h2 class="text-2xl font-bold mb-4 text-center">🔥 Trending Now</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <NuxtLink
          v-for="trend in props.trendingCoins"
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
  </section>
</template>

<script setup lang="ts">
import CryptoChart from "@/components/CryptoChart.vue";

const props = defineProps<{
  trendingCoins: {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
    market_cap_rank: number;
  }[];
}>();
</script>
