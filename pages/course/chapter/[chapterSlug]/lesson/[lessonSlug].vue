<template>
  <div class="p-6 text-white">
    <h1 class="text-4xl font-bold mb-4">{{ t.title }}</h1>

    <img
      :src="t.image"
      :alt="t.title"
      class="rounded-xl mb-6 w-full max-h-[400px] object-cover"
    />

    <p class="text-lg mb-4 leading-relaxed text-gray-300">
      {{ t.description }}
    </p>

    <h2 class="text-2xl font-semibold mb-2 mt-6">{{ t.benefitsTitle }}</h2>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li v-for="benefit in t.benefits" :key="benefit">{{ benefit }}</li>
    </ul>

    <h2 class="text-2xl font-semibold mb-2 mt-6">{{ t.resourcesTitle }}</h2>
    <ul class="list-disc list-inside text-blue-400 space-y-1 underline">
      <li v-for="link in t.resources" :key="link.url">
        <a :href="link.url" target="_blank">{{ link.label }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from "@/composables/useLanguage";
import { computed } from "vue";

const { language } = useLanguage();

const content = {
  en: {
    title: "Introduction to Blockchain",
    description:
      "Blockchain is a distributed ledger technology that allows data to be stored across a network of computers in a secure, transparent, and tamper-proof way. It underpins cryptocurrencies like Bitcoin and Ethereum, and is being explored for use in finance, supply chains, voting systems, and more.",
    benefitsTitle: "Key Advantages",
    benefits: [
      "Decentralization: no single point of control",
      "Transparency: public verification of data",
      "Security: cryptographic protection against tampering",
      "Immutability: once data is written, it cannot be altered",
    ],
    resourcesTitle: "Further Reading",
    resources: [
      {
        label: "IBM: What is Blockchain Technology?",
        url: "https://www.ibm.com/topics/what-is-blockchain",
      },
    ],
    image: "https://www.engineermaster.in/images/150979101762165.jpg",
  },
  ua: {
    title: "Вступ до блокчейну",
    description:
      "Блокчейн — це технологія розподіленого реєстру, яка дозволяє зберігати дані в мережі комп’ютерів безпечно, прозоро та незмінно. Вона лежить в основі криптовалют, таких як Bitcoin та Ethereum, і активно досліджується для використання у фінансах, логістиці, голосуваннях та інших сферах.",
    benefitsTitle: "Основні переваги",
    benefits: [
      "Децентралізація: відсутність єдиного центру контролю",
      "Прозорість: публічна перевірка даних",
      "Безпека: криптографічний захист від змін",
      "Незмінність: записані дані не можна змінити",
    ],
    resourcesTitle: "Корисні матеріали",
    resources: [
      {
        label: "IBM: Що таке блокчейн?",
        url: "https://www.ibm.com/topics/what-is-blockchain",
      },
    ],
    image:
      "https://bikotrading.pro/assets/img/WEBP/Shho-take-blokchejn/block%20chain.webp",
  },
};

const t = computed(() => content[language.value]);
</script>
