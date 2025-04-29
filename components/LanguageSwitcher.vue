<script setup lang="ts">
import { useLanguage } from "@/composables/useLanguage";
import { ref, watch } from "vue";

const { language, setLanguage } = useLanguage();
const showTooltip = ref(false);

const buttonClass = (lang: "en" | "ua") =>
  `relative px-3 py-2 text-sm rounded-full transition-all duration-200 ${
    language.value === lang
      ? "bg-white text-black shadow"
      : "bg-gray-700 text-white"
  }`;

watch(language, (newLang) => {
  if (newLang === "ua") {
    showTooltip.value = true;
    setTimeout(() => {
      showTooltip.value = false;
    }, 4000);
  }
});
</script>

<template>
  <div class="flex gap-2 relative">
    <transition name="fade">
      <div
        v-if="showTooltip"
        class="absolute top-12 right-0 bg-gray-800 text-white text-xs px-4 py-2 rounded shadow-md z-50 max-w-[calc(100vw-2rem)] w-64 text-center"
      >
        Деякі тексти ще можуть бути без перекладу.<br />
        Some texts may not be fully translated yet.
      </div>
    </transition>
    <button @click="setLanguage('en')" :class="buttonClass('en')">🇬🇧</button>
    <button @click="setLanguage('ua')" :class="buttonClass('ua')">🇺🇦</button>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
