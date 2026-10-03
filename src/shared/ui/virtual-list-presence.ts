export const LIST_ANIMATION_MS = 150;
export const MAX_MUTATION_EXITS = 2;

export type ExitingItem<TItem> = {
  key: string | number;
  item: TItem;
  index: number;
};

export function mergeExitingItems<TItem>({
  items,
  exiting,
  getItemKey,
}: {
  items: readonly TItem[];
  exiting: readonly ExitingItem<TItem>[];
  getItemKey: (item: TItem) => string | number;
}): TItem[] {
  const merged = [...items];
  const liveKeys = new Set(items.map(getItemKey));
  const sortedExiting = [...exiting].sort((left, right) => left.index - right.index);

  for (const entry of sortedExiting) {
    if (liveKeys.has(entry.key)) continue;

    merged.splice(Math.min(entry.index, merged.length), 0, entry.item);
  }

  return merged;
}

export function nextExitingItems<TItem>({
  previousDisplayed,
  nextItems,
  previousExiting,
  getItemKey,
  prefersReducedMotion,
}: {
  previousDisplayed: readonly TItem[];
  nextItems: readonly TItem[];
  previousExiting: readonly ExitingItem<TItem>[];
  getItemKey: (item: TItem) => string | number;
  prefersReducedMotion: boolean;
}): ExitingItem<TItem>[] {
  if (prefersReducedMotion) return [];

  const nextKeys = new Set(nextItems.map(getItemKey));
  const previousExitingKeys = new Set(previousExiting.map((entry) => entry.key));
  const stillExiting = previousExiting.filter((entry) => !nextKeys.has(entry.key));
  const removed: ExitingItem<TItem>[] = [];
  let disappearedCount = 0;

  previousDisplayed.forEach((item, index) => {
    const key = getItemKey(item);

    if (nextKeys.has(key)) return;

    disappearedCount += 1;

    if (previousExitingKeys.has(key)) return;

    removed.push({ key, item, index });
  });

  if (disappearedCount > MAX_MUTATION_EXITS) return [];

  return [...stillExiting, ...removed].sort((left, right) => left.index - right.index);
}
