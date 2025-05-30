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
export interface LessonVideo {
    youtubeId?: string;
    src?: string;
    poster?: string;
}

export interface LessonContent {
    title: string;
    description: string;
    image: string;
    benefitsTitle: string;
    benefits: string[];
    resourcesTitle: string;
    resources: { url: string; label: string }[];
    video: LessonVideo;
}
export interface CoinDetails {
    id: string;
    symbol: string;
    name: string;
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    market_cap_rank: number;
    market_data: {
        current_price: {
            usd: number;
        };
        market_cap: {
            usd: number;
        };
    };
    description: {
        en: string;
    };
    links: {
        homepage: string[];
    };
}