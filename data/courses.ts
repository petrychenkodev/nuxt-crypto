export type LanguageCode = "en" | "ua";

export type Course = {
  id: number;
  chapterSlug: string;
  lessonSlug: string;
  title_en: string;
  title_ua: string;
  description_en: string;
  description_ua: string;
  image: string;
};

export const courses: Course[] = [
  {
    id: 1,
    chapterSlug: "intro",
    lessonSlug: "introduction-to-blockchain",
    title_en: "Introduction to Blockchain",
    title_ua: "Вступ до блокчейну",
    description_en: "Learn the fundamentals of blockchain technology.",
    description_ua: "Дізнайтеся основи блокчейн-технологій.",
    image:
      "https://media.istockphoto.com/id/1297465792/photo/bitcoin-network-concept-on-digital-screen.jpg?s=612x612&w=0&k=20&c=hoFmLlo9ZQ9fNWQvow8ikDpWeqhEa2A9R7SIh3Pg3BE=",
  },
  {
    id: 2,
    chapterSlug: "ethereum",
    lessonSlug: "ethereum-smart-contracts",
    title_en: "Ethereum Smart Contracts",
    title_ua: "Смарт-контракти Ethereum",
    description_en: "Build and deploy your own smart contracts on Ethereum.",
    description_ua:
      "Створюйте та розгортайте свої смарт-контракти на Ethereum.",
    image:
      "https://www.coindesk.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fs3y3vcno%2Fproduction%2Ff52b78d5926cac055cfba2137a3075ef7192103b-1833x1375.jpg%3Fauto%3Dformat&w=3840&q=75",
  },
  {
    id: 3,
    chapterSlug: "defi",
    lessonSlug: "defi-essentials",
    title_en: "DeFi Essentials",
    title_ua: "Основи DeFi",
    description_en: "Understand decentralized finance and its core principles.",
    description_ua:
      "Зрозумійте децентралізовані фінанси та їх основні принципи.",
    image:
      "https://media.istockphoto.com/id/1326770854/photo/cryptocurrency-on-binance-trading-app-bitcoin-btc-with-altcoin-digital-coin-crypto-currency.jpg?s=612x612&w=0&k=20&c=zDTdAkqrP7Er1MM2r25GNrTN7jygE-NzSgsVwWsnLKM=",
  },
];