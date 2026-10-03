import { type Range, useVirtualizer } from "@tanstack/react-virtual";
import { type ReactNode, useCallback, useRef } from "react";

const MAX_RENDERED_ITEMS = 30;
const ESTIMATED_ROW_SIZE = 160;
const INITIAL_RECT = { width: 1024, height: 800 } as const;

type VirtualListProps<TItem> = {
  items: readonly TItem[];
  getItemKey: (item: TItem) => string | number;
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

export function VirtualList<TItem>({
  items,
  getItemKey,
  children,
}: VirtualListProps<TItem>): ReactNode {
  const parentRef = useRef<HTMLDivElement>(null);

  const getScrollElement = useCallback(() => parentRef.current, []);

  const getVirtualItemKey = useCallback(
    (index: number) => {
      const item = items[index];

      return item === undefined ? index : getItemKey(item);
    },
    [getItemKey, items],
  );

  const virtualizer = useVirtualizer({
    count: items.length,
    estimateSize: estimateRowSizePx,
    getItemKey: getVirtualItemKey,
    getScrollElement,
    initialRect: INITIAL_RECT,
    overscan: 0,
    rangeExtractor: extractCappedRange,
    useFlushSync: false,
  });

  return (
    <div
      ref={parentRef}
      className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const item = items[virtualItem.index];

          if (item === undefined) return null;

          return (
            <div
              key={virtualItem.key}
              ref={virtualizer.measureElement}
              data-index={virtualItem.index}
              className="absolute top-0 left-0 w-full"
              style={{
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {children(item, virtualItem.index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
