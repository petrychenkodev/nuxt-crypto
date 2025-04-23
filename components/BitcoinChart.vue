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
          :key="tick"
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

<script>
export default {
  data() {
    return {
      prices: [],
      width: 600,
      height: 300,
      yTicksCount: 6,
    };
  },
  computed: {
    maxPrice() {
      return Math.max(...this.prices);
    },
    minPrice() {
      return Math.min(...this.prices);
    },
    yTicks() {
      const step = (this.maxPrice - this.minPrice) / (this.yTicksCount - 1);
      return Array.from(
        { length: this.yTicksCount },
        (_, i) => Math.round((this.minPrice + step * i) * 100) / 100
      ).reverse();
    },
    points() {
      const range = this.maxPrice - this.minPrice;
      const stepX = this.width / (this.prices.length - 1);
      return this.prices
        .map((price, index) => {
          const x = index * stepX;
          const y =
            this.height - ((price - this.minPrice) / range) * this.height;
          return `${x},${y}`;
        })
        .join(" ");
    },
  },
  methods: {
    getY(value) {
      const range = this.maxPrice - this.minPrice;
      return this.height - ((value - this.minPrice) / range) * this.height;
    },
  },
  mounted() {
    fetch(
      "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=30"
    )
      .then((res) => res.json())
      .then((data) => {
        this.prices = data.Data.Data.map((entry) => entry.close);
      })
      .catch((e) => console.error("Fetch error:", e));
  },
};
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
