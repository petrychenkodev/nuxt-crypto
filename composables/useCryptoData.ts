import { ref } from 'vue';
import { setCachedData } from '@/utils/cache';
import { Coin, TrendingCoin } from '@/types/crypto';

const getCachedData = <T>(key: string, maxAgeSeconds: number): T | null => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { timestamp, data } = JSON.parse(cached);
  const age = (Date.now() - timestamp) / 1000;
  if (age > maxAgeSeconds) return null;

  return data;
};


export const useCryptoData = () => {
  const coins = ref<Coin[]>([]);
  const trendingCoins = ref<TrendingCoin[]>([]);

  const fetchTopCoins = async () => {
    const cacheKey = 'topCoins';
    const cached = getCachedData<Coin[]>(cacheKey, 300);
    if (cached) {
      coins.value = cached;
      return;
    }

    try {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,dogecoin&order=market_cap_desc&per_page=4&page=1&sparkline=false');
      const data = await res.json();
      coins.value = data;
      setCachedData(cacheKey, data);
    } catch (e) {
      console.error('Error fetching top coins:', e);
    }
  };

  const fetchTrendingCoins = async () => {
    const cacheKey = 'trendingCoins';
    const cached = getCachedData<TrendingCoin[]>(cacheKey, 300);
    if (cached) {
      trendingCoins.value = cached;
      return;
    }

    try {
      const res = await fetch('https://api.coingecko.com/api/v3/search/trending');
      const data = await res.json();
      trendingCoins.value = data.coins.map((coin: any): TrendingCoin => ({
        id: coin.item.id,
        name: coin.item.name,
        symbol: coin.item.symbol,
        thumb: coin.item.thumb,
        market_cap_rank: coin.item.market_cap_rank,
      }));
      setCachedData(cacheKey, trendingCoins.value);
    } catch (e) {
      console.error('Error fetching trending coins:', e);
    }
  };

  return {
    coins,
    trendingCoins,
    fetchTopCoins,
    fetchTrendingCoins,
  };
};
