export function pickRandomItem<T>(items: readonly T[], random = Math.random): T | undefined {
  if (items.length === 0) return undefined;

  return items[Math.floor(random() * items.length)];
}
