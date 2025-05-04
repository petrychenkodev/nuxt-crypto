<template>
  <div class="text-center mb-16">
    <button @click="$emit('open-signature')" class="inline-block group mr-2">
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
</template>

<script setup lang="ts">
import { useLanguage } from "@/composables/useLanguage";
import { computed } from "vue";

const { language } = useLanguage();

const translations = {
  en: {
    button: "Go to Courses",
  },
  ua: {
    button: "Перейти до курсів",
  },
};

const t = computed(() => translations[language.value]);
</script>
