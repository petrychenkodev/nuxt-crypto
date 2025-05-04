export const getCachedData = <T = unknown>(key: string, maxAgeSeconds: number): T | null => {
  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    const parsed = JSON.parse(item) as { timestamp: number; data: T };
    const now = Date.now();
    if (now - parsed.timestamp > maxAgeSeconds * 1000) {
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
};

export function setCachedData<T = any>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify({
    timestamp: Date.now(),
    data
  }));
}