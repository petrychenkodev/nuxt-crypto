<template>
  <div
    class="w-full overflow-hidden whitespace-nowrap bg-[#1a1f2e] text-white py-2 px-4 text-sm z-50 relative"
  >
    <div
      class="inline-block animate-marquee"
      :style="{ animationDuration: '30s' }"
    >
      <span v-for="coin in coins" :key="coin.id" class="mr-8 inline-block">
        {{ coin.name }}:
        <span
          :class="
            coin.price_change_percentage_24h >= 0
              ? 'text-green-400'
              : 'text-red-400'
          "
        >
          ${{ coin.current_price.toFixed(2) }} ({{
            coin.price_change_percentage_24h.toFixed(1)
          }}%)
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Coin } from "@/types/crypto";
import { getCachedData, setCachedData } from "@/utils/cache";
import { useApi } from "@/composables/useApi";

const coins = ref<Coin[]>([]);
const { fetchData } = useApi();
const CACHE_KEY = "tickerCoins";
const CACHE_DURATION_MS = 5 * 60 * 1000;

const fetchCryptoPrices = async () => {
  const cached = getCachedData<Coin[]>(CACHE_KEY, CACHE_DURATION_MS);
  if (cached) {
    coins.value = cached;
    return;
  }

  const { data, error, success } = await fetchData<Coin[]>(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,cardano,dogecoin,polkadot,tron,chainlink,uniswap,polygon&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  );

  if (!success || !data) {
    console.error("❌ Too many requests. Please wait and try again later.", error);
    return;
  }

  coins.value = data;
  await setCachedData(CACHE_KEY, data);
};

onMounted(() => {
  fetchCryptoPrices();
  setInterval(fetchCryptoPrices, 60_000);
});
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
.animate-marquee {
  display: inline-block;
  white-space: nowrap;
  animation: marquee linear infinite;
}
</style>
