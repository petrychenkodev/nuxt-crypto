<template>
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
        {{ t }}
      </p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLanguage } from "@/composables/useLanguage";

const { language } = useLanguage();

const texts = {
  en: "Explore NFT Gallery",
  ua: "Переглянути NFT-галерею",
};

const t = computed(() => texts[language.value]);
</script>
