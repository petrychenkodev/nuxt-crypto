<template>
  <section class="bg-[#0d1117] min-h-screen py-16 text-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">
        {{ language === 'en' ? 'Crypto Courses' : 'Курси з криптовалюти' }}
      </h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="course in courses"
          :key="course.id"
          class="bg-[#161b22] rounded-2xl shadow-lg overflow-hidden"
        >
          <img
            :src="course.image"
            :alt="getLocalizedValue(course, 'title', language)"
            class="w-full h-40 object-cover"
          />
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">
              {{ getLocalizedValue(course, 'title', language) }}
            </h3>
            <p class="text-sm text-gray-400">
              {{ getLocalizedValue(course, 'description', language) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

type LanguageCode = 'en' | 'ua'

type Course = {
  id: number
  title_en: string
  title_ua: string
  description_en: string
  description_ua: string
  image: string
}

const { language } = useLanguage()

const courses: Course[] = [
  {
    id: 1,
    title_en: 'Introduction to Blockchain',
    title_ua: 'Вступ до блокчейну',
    description_en: 'Learn the fundamentals of blockchain technology.',
    description_ua: 'Дізнайтеся основи блокчейн-технологій.',
    image: 'https://media.istockphoto.com/id/1297465792/photo/bitcoin-network-concept-on-digital-screen.jpg?s=612x612&w=0&k=20&c=hoFmLlo9ZQ9fNWQvow8ikDpWeqhEa2A9R7SIh3Pg3BE='
  },
  {
    id: 2,
    title_en: 'Ethereum Smart Contracts',
    title_ua: 'Смарт-контракти Ethereum',
    description_en: 'Build and deploy your own smart contracts on Ethereum.',
    description_ua: 'Створюйте та розгортайте свої смарт-контракти на Ethereum.',
    image: 'https://www.coindesk.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fs3y3vcno%2Fproduction%2Ff52b78d5926cac055cfba2137a3075ef7192103b-1833x1375.jpg%3Fauto%3Dformat&w=3840&q=75'
  },
  {
    id: 3,
    title_en: 'DeFi Essentials',
    title_ua: 'Основи DeFi',
    description_en: 'Understand decentralized finance and its core principles.',
    description_ua: 'Зрозумійте децентралізовані фінанси та їх основні принципи.',
    image: 'https://media.istockphoto.com/id/1326770854/photo/cryptocurrency-on-binance-trading-app-bitcoin-btc-with-altcoin-digital-coin-crypto-currency.jpg?s=612x612&w=0&k=20&c=zDTdAkqrP7Er1MM2r25GNrTN7jygE-NzSgsVwWsnLKM='
  }
]

function getLocalizedValue(
  course: Course,
  field: 'title' | 'description',
  lang: LanguageCode
): string {
  const key = `${field}_${lang}` as keyof Course
  return course[key] ?? ''
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>