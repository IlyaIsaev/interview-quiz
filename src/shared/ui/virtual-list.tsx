import { type Range, useVirtualizer } from "@tanstack/react-virtual";
import { motion, MotionConfig, useReducedMotion } from "motion/react";
import { type ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  type ExitingItem,
  LIST_ANIMATION_MS,
  mergeExitingItems,
  nextExitingItems,
} from "./virtual-list-presence";

const MAX_RENDERED_ITEMS = 30;
const ESTIMATED_ROW_SIZE = 121;
const INITIAL_RECT = { width: 1024, height: 800 } as const;
const LIST_ANIMATION_SECONDS = LIST_ANIMATION_MS / 1000;
const TWEEN_EASE = "easeOut" as const;

type VirtualListProps<TItem> = {
  items: readonly TItem[];
  getItemKey: (item: TItem) => string | number;
  empty?: ReactNode;
  children: (item: TItem, index: number) => ReactNode;
};

function estimateRowSizePx(): number {
  return ESTIMATED_ROW_SIZE;
}

function extractCappedRange(range: Range): number[] {
  const { startIndex, endIndex, count } = range;

  if (count === 0) return [];

  const budget = Math.min(count, MAX_RENDERED_ITEMS);
  const visibleStart = Math.max(0, startIndex);
  const visibleEnd = Math.min(count - 1, Math.max(startIndex, endIndex));
  const visibleCount = visibleEnd - visibleStart + 1;
  const extra = Math.max(0, budget - Math.min(visibleCount, budget));
  const before = Math.min(visibleStart, Math.floor(extra / 2));
  const uncappedStart = visibleStart - before;
  const uncappedEnd = uncappedStart + budget - 1;
  const isOverflowing = uncappedEnd > count - 1;
  const end = isOverflowing ? count - 1 : uncappedEnd;
  const start = isOverflowing ? Math.max(0, end - budget + 1) : uncappedStart;
  const length = end - start + 1;

  return Array.from({ length }, (_, offset) => start + offset);
}

function itemsKeysSignature<TItem>(
  items: readonly TItem[],
  getItemKey: (item: TItem) => string | number,
): string {
  return items.map((item) => String(getItemKey(item))).join("\0");
}

function hasSameExitingKeys<TItem>(
  left: readonly ExitingItem<TItem>[],
  right: readonly ExitingItem<TItem>[],
): boolean {
  if (left.length !== right.length) return false;

  return left.every(
    (entry, index) => entry.key === right[index]?.key && entry.index === right[index]?.index,
  );
}

export function VirtualList<TItem>({
  items,
  getItemKey,
  empty,
  children,
}: VirtualListProps<TItem>): ReactNode {
  "use no memo";

  const parentRef = useRef<HTMLDivElement>(null);
  const displayedRef = useRef<readonly TItem[]>([]);
  const exitingRef = useRef<readonly ExitingItem<TItem>[]>([]);
  const itemsKeysRef = useRef(itemsKeysSignature(items, getItemKey));
  const prefersReducedMotion = useReducedMotion() === true;
  const [exiting, setExiting] = useState<ExitingItem<TItem>[]>([]);
  const itemsKeys = itemsKeysSignature(items, getItemKey);
  const displayedItems = mergeExitingItems({
    items,
    exiting: prefersReducedMotion ? [] : exiting,
    getItemKey,
  });

  const getScrollElement = useCallback(() => parentRef.current, []);

  const getVirtualItemKey = useCallback(
    (index: number) => {
      const item = displayedItems[index];

      return item === undefined ? index : getItemKey(item);
    },
    [getItemKey, displayedItems],
  );

  // TanStack Virtual mutates its instance; this list is opted out of the compiler.
  // oxlint-disable-next-line react/incompatible-library
  const virtualizer = useVirtualizer({
    count: displayedItems.length,
    estimateSize: estimateRowSizePx,
    getItemKey: getVirtualItemKey,
    getScrollElement,
    initialRect: INITIAL_RECT,
    overscan: 0,
    rangeExtractor: extractCappedRange,
    useFlushSync: false,
  });

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      itemsKeysRef.current = itemsKeys;
      displayedRef.current = items;
      exitingRef.current = [];
      setExiting((current) => (current.length === 0 ? current : []));
      return;
    }

    if (itemsKeysRef.current !== itemsKeys) {
      const next = nextExitingItems({
        previousDisplayed: displayedRef.current,
        nextItems: items,
        previousExiting: exitingRef.current,
        getItemKey,
        prefersReducedMotion: false,
      });

      itemsKeysRef.current = itemsKeys;
      displayedRef.current = mergeExitingItems({ items, exiting: next, getItemKey });
      exitingRef.current = next;
      setExiting((current) => (hasSameExitingKeys(next, current) ? current : next));
      return;
    }

    displayedRef.current = displayedItems;
    exitingRef.current = exiting;
  }, [displayedItems, exiting, getItemKey, items, itemsKeys, prefersReducedMotion]);

  useEffect(() => {
    if (exiting.length === 0) return;

    const timeoutId = window.setTimeout(() => {
      setExiting([]);
    }, LIST_ANIMATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [exiting]);

  const exitingKeySet = new Set(exiting.map((entry) => entry.key));
  const tweenDuration = prefersReducedMotion ? 0 : LIST_ANIMATION_SECONDS;
  const virtualItems = virtualizer.getVirtualItems();
  const offset = virtualItems[0]?.start ?? 0;

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={parentRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {displayedItems.length === 0 ? (
          empty
        ) : (
          <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
            <div
              className="absolute top-0 left-0 w-full"
              style={{ transform: `translateY(${String(offset)}px)` }}
            >
              {virtualItems.map((virtualItem) => {
                const item = displayedItems[virtualItem.index];

                if (item === undefined) return null;

                const isExiting = exitingKeySet.has(getItemKey(item));

                return (
                  <motion.div
                    key={virtualItem.key}
                    ref={virtualizer.measureElement}
                    data-index={virtualItem.index}
                    initial={false}
                    animate={isExiting ? { opacity: 0, height: 0 } : { opacity: 1 }}
                    transition={{
                      opacity: { type: "tween", duration: tweenDuration, ease: TWEEN_EASE },
                      height: { type: "tween", duration: tweenDuration, ease: TWEEN_EASE },
                    }}
                    style={{ overflow: isExiting ? "hidden" : undefined }}
                  >
                    {children(item, virtualItem.index)}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
