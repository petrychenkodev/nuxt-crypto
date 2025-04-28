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
import axios from "axios";
import { Coin } from "@/types/crypto";

const coins = ref<Coin[]>([]);

const fetchCryptoPrices = async () => {
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          ids: "bitcoin,ethereum,solana,cardano,dogecoin,polkadot,tron,chainlink,uniswap,polygon",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: false,
        },
      }
    );
    coins.value = res.data;
  } catch (error) {
    console.error("Failed to fetch crypto prices:", error);
  }
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
