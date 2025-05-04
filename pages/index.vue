<template>
  <section class="min-h-screen bg-[#0d1117] text-white px-6 py-16">
    <HeroSection @open-signature="showSignatureModal = true" />
    <NftGallerySection />
    <TopCoinsSection :coins="coins" />
    <MarketOverviewSection :trending-coins="trendingCoins" />

    <transition name="fade">
      <HireModal v-if="showModal" @close="handleModalClose" />
    </transition>
    <transition name="fade">
      <HumanCheckModal
        v-if="showHumanCheck"
        @success="handleHumanCheckSuccess"
      />
    </transition>
    <transition name="fade">
      <SignatureModal
        v-if="showSignatureModal"
        @signed="goToCourses"
        @close="showSignatureModal = false"
      />
    </transition>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { navigateTo } from "nuxt/app";
import { useLanguage } from "@/composables/useLanguage";
import { Coin, TrendingCoin } from "@/types/crypto";
import HeroSection from "@/components/MainScreen/HeroSection.vue";
import NftGallerySection from "@/components/MainScreen/NftGallerySection.vue";
import TopCoinsSection from "@/components/MainScreen/TopCoinsSection.vue";
import MarketOverviewSection from "@/components/MainScreen/MarketOverviewSection.vue";
import { useCryptoData } from "@/composables/useCryptoData";
import { heroTranslations } from "@/data/translations/hero";

const { language } = useLanguage();

const showModal = ref(false);
const showHumanCheck = ref(false);
const showSignatureModal = ref(false);

const { fetchTopCoins, fetchTrendingCoins, coins, trendingCoins } =
  useCryptoData();

const handleModalClose = () => {
  showModal.value = false;
};

const handleHumanCheckSuccess = () => {
  showHumanCheck.value = false;
  localStorage.setItem("humanCheckPassed", "true");
};

const goToCourses = () => {
  showSignatureModal.value = false;
  navigateTo("/course");
};

const handleInitialModals = () => {
  if (process.client) {
    const hireModalShown = localStorage.getItem("hireModalShown");
    const humanCheckPassed = localStorage.getItem("humanCheckPassed");

    if (hireModalShown !== "true") {
      setTimeout(() => {
        showModal.value = true;
        localStorage.setItem("hireModalShown", "true");
      }, 3000);
    }
    if (humanCheckPassed !== "true") {
      showHumanCheck.value = true;
    }
  }
};

const fetchAllCryptoData = () => {
  fetchTopCoins();
  fetchTrendingCoins();
};

onMounted(() => {
  handleInitialModals();
  fetchAllCryptoData();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
