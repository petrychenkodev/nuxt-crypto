const responses: Record<string, string> = {
    bitcoin: "Bitcoin is a decentralized digital currency created in 2009. It allows peer-to-peer transactions without intermediaries.",
    ethereum: "Ethereum is a blockchain platform that supports smart contracts and decentralized applications.",
    defi: "DeFi stands for Decentralized Finance — a system of financial tools and services built on blockchain without centralized authorities.",
    hello: "Hey there! I'm your AI assistant. Ask me anything about crypto.",
    hi: "Hi! How can I help you explore the world of cryptocurrencies today?",
    nft: "NFTs (Non-Fungible Tokens) are unique digital assets that represent ownership of art, collectibles, and more on the blockchain.",
    staking: "Staking is a way to earn rewards by locking your crypto assets to support a blockchain network.",
    mining: "Mining is the process of validating transactions and securing blockchain networks using computational power.",
    wallet: "A crypto wallet lets you store, send, and receive cryptocurrencies. It can be software-based or hardware-based.",
    default: "I'm not sure how to answer that yet, but I'm learning fast! Try asking something about Bitcoin, Ethereum, or DeFi.",
  };
  
  export default defineEventHandler(async (event) => {
    const body = await readBody<{ message: string }>(event);
    const input = body.message?.toLowerCase() || "";
  
    const match = Object.keys(responses).find((key) => input.includes(key));
  
    return {
      message: responses[match || "default"],
    };
  });