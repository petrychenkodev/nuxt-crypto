export const getCachedData = <T = any>(key: string, maxAgeSeconds: number): T | null => {
  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    const { timestamp, data } = JSON.parse(item);
    const now = Date.now();
    if (now - timestamp > maxAgeSeconds * 1000) {
      return null;
    }
    return data as T;
  } catch {
    return null;
  }
};

export function setCachedData(key: string, data: any): void {
  localStorage.setItem(key, JSON.stringify({
    timestamp: Date.now(),
    data
  }));
}