<template>
  <section class="min-h-screen bg-[#0d1117] text-white px-6 py-12">
    <div v-if="pending" class="text-center py-20">
      <p class="text-lg animate-pulse">Loading coin data...</p>
    </div>

    <div v-else-if="error" class="text-center py-20">
      <p class="text-red-400 text-lg">
        Too many requests. Please wait a moment and try again. This is a free
        API and has a request limit.
      </p>
    </div>

    <div v-else-if="coin" class="max-w-4xl mx-auto">
      <div class="flex items-center gap-4 mb-8">
        <img :src="coin.image?.large" :alt="coin.name" class="w-16 h-16" />
        <div>
          <h1 class="text-4xl font-bold">
            {{ coin.name }} ({{ coin.symbol.toUpperCase() }})
          </h1>
          <p class="text-gray-400">Rank #{{ coin.market_cap_rank }}</p>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-2">Current Price</h2>
        <p class="text-3xl font-bold text-green-400">
          ${{ coin.market_data?.current_price?.usd?.toLocaleString() }}
        </p>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-2">Market Cap</h2>
        <p class="text-lg text-gray-300">
          ${{ coin.market_data?.market_cap?.usd?.toLocaleString() }}
        </p>
      </div>

      <div v-if="coin.description?.en" class="mb-8">
        <h2 class="text-2xl font-bold mb-2">About {{ coin.name }}</h2>
        <p
          class="text-gray-300 leading-relaxed"
          v-html="formattedDescription"
        ></p>
      </div>

      <div v-if="coin.links?.homepage?.[0]" class="mt-8">
        <h2 class="text-2xl font-bold mb-2">Official Website</h2>
        <a
          :href="coin.links.homepage[0]"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-400 underline"
        >
          {{ coin.links.homepage[0] }}
        </a>
      </div>

      <CryptoChart
        v-if="id && coin"
        :coinId="id"
        :title="`${coin.name} Price (30 Days)`"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";
import type { CoinDetails } from "@/types/crypto";

const getCachedData = <T = any>(
  key: string,
  maxAgeSeconds: number
): T | null => {
  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    const { timestamp, data } = JSON.parse(item);
    const now = Date.now();
    if (now - timestamp > maxAgeSeconds * 1000) {
      return null;
    }
    return data as T;
  } catch {
    return null;
  }
};

const setCachedData = (key: string, data: unknown) => {
  localStorage.setItem(
    key,
    JSON.stringify({
      timestamp: Date.now(),
      data,
    })
  );
};

const route = useRoute();
const id = route.params.id as string;

const coin = ref<CoinDetails | null>(null);
const pending = ref(true);
const error = ref(false);

const formattedDescription = computed(() => {
  if (!coin.value?.description?.en) return "";
  return coin.value.description.en.replace(/<\/?[^>]+(>|$)/g, "");
});

const fetchCoinDetails = async () => {
  pending.value = true;
  error.value = false;

  const cacheKey = `coin_${id}`;
  const cached = getCachedData<CoinDetails>(cacheKey, 300);

  if (cached) {
    coin.value = cached;
    pending.value = false;
    return;
  }

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    coin.value = data;
    setCachedData(cacheKey, data);
  } catch (e) {
    console.error("Failed to fetch coin details:", e);
    error.value = true;
  } finally {
    pending.value = false;
  }
};

onMounted(fetchCoinDetails);
</script>
