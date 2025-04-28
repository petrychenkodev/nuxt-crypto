<template>
  <div class="chart-container">
    <h2 class="text-xl font-bold mb-4">📈 Bitcoin 30 days SVG chart</h2>
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const prices = ref<number[]>([]);
const width = 600;
const height = 300;
const yTicksCount = 6;

const maxPrice = computed(() => Math.max(...prices.value));
const minPrice = computed(() => Math.min(...prices.value));

const yTicks = computed(() => {
  const step = (maxPrice.value - minPrice.value) / (yTicksCount - 1);
  return Array.from(
    { length: yTicksCount },
    (_, i) => Math.round((minPrice.value + step * i) * 100) / 100
  ).reverse();
});

const points = computed(() => {
  const range = maxPrice.value - minPrice.value;
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
  const range = maxPrice.value - minPrice.value;
  return height - ((value - minPrice.value) / range) * height;
};

onMounted(async () => {
  try {
    const res = await fetch(
      "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=30"
    );
    const data = await res.json();
    prices.value = data.Data.Data.map((entry: any) => entry.close);
  } catch (e) {
    console.error("Fetch error:", e);
  }
});
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
