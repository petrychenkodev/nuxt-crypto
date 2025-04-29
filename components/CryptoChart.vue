<template>
  <div class="chart-container">
    <h2 class="text-xl font-bold mb-4">{{ title }}</h2>

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-400 animate-pulse">Loading chart data...</p>
    </div>

    <div v-else-if="prices.length > 0">
      <svg :width="width" :height="height" class="chart-svg">
        <rect
          x="0"
          y="0"
          :width="width"
          :height="height"
          fill="none"
          stroke="#374151"
          stroke-width="2"
        />

        <g>
          <line
            v-for="tick in yTicks"
            :key="tick"
            :y1="getY(tick)"
            :y2="getY(tick)"
            x1="0"
            :x2="width"
            stroke="#4b5563"
            stroke-dasharray="4"
          />
        </g>

        <g>
          <text
            v-for="tick in yTicks"
            :key="tick + '-text'"
            :y="getY(tick) - 5"
            x="5"
            fill="#9ca3af"
            font-size="12"
          >
            ${{ tick }}
          </text>
        </g>

        <polyline
          :points="points"
          fill="none"
          stroke="#3b82f6"
          stroke-width="2"
        />
      </svg>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-red-400">Failed to load chart data. Too many requests. Please wait a moment and try again. This is a free API and has a request limit.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

const props = defineProps<{
  coinId: string;
  title: string;
}>();

const prices = ref<number[]>([]);
const loading = ref(true);
const width = 600;
const height = 300;
const yTicksCount = 6;

const maxPrice = computed(() => (prices.value.length ? Math.max(...prices.value) : 0));
const minPrice = computed(() => (prices.value.length ? Math.min(...prices.value) : 0));

const yTicks = computed(() => {
  if (prices.value.length === 0) return [];
  const step = (maxPrice.value - minPrice.value) / (yTicksCount - 1);
  return Array.from({ length: yTicksCount }, (_, i) => Math.round((minPrice.value + step * i) * 100) / 100).reverse();
});

const points = computed(() => {
  if (prices.value.length === 0) return "";
  const range = maxPrice.value - minPrice.value || 1;
  const stepX = width / (prices.value.length - 1);

  return prices.value
    .map((price, index) => {
      const x = index * stepX;
      const y = height - ((price - minPrice.value) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");
});

const getY = (value: number) => {
  const range = maxPrice.value - minPrice.value || 1;
  return height - ((value - minPrice.value) / range) * height;
};

const fetchPrices = async () => {
  loading.value = true;
  prices.value = [];
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${props.coinId}/market_chart?vs_currency=usd&days=30`);
    const data = await res.json();
    prices.value = data.prices.map((p: [number, number]) => p[1]).filter(p => typeof p === 'number' && !isNaN(p));
  } catch (e) {
    console.error("Error loading prices:", e);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPrices);

watch(() => props.coinId, fetchPrices);
</script>

<style scoped>
.chart-container {
  background: #1f2937;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  max-width: 640px;
  margin: auto;
}

.chart-svg {
  display: block;
  margin: auto;
}
</style>