// types/crypto.ts

export interface Coin {
    id: string;
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
}

export interface TrendingCoin {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
    market_cap_rank: number;
}

export interface Country {
    cca2: string;
    name: {
        common: string;
    };
    flags: {
        png: string;
    };
}