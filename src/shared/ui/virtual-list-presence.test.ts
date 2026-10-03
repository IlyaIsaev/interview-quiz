import { describe, expect, it } from "vite-plus/test";
import { mergeExitingItems, nextExitingItems } from "./virtual-list-presence";

type Item = {
  id: number;
  label: string;
};

function itemKey(item: Item): number {
  return item.id;
}

const itemA = { id: 1, label: "a" };
const itemB = { id: 2, label: "b" };
const itemC = { id: 3, label: "c" };
const itemD = { id: 4, label: "d" };
const itemE = { id: 5, label: "e" };

describe("mergeExitingItems", () => {
  it("should return items unchanged when exiting is empty", () => {
    const items = [itemA, itemB, itemC];

    expect(mergeExitingItems({ items, exiting: [], getItemKey: itemKey })).toEqual(items);
  });

  it("should splice an exiting item at its previous index when it was removed", () => {
    const merged = mergeExitingItems({
      items: [itemA, itemC],
      exiting: [{ key: itemB.id, item: itemB, index: 1 }],
      getItemKey: itemKey,
    });

    expect(merged).toEqual([itemA, itemB, itemC]);
  });

  it("should splice multiple exiting items in index order when they were removed", () => {
    const merged = mergeExitingItems({
      items: [itemA],
      exiting: [
        { key: itemC.id, item: itemC, index: 2 },
        { key: itemB.id, item: itemB, index: 1 },
      ],
      getItemKey: itemKey,
    });

    expect(merged).toEqual([itemA, itemB, itemC]);
  });

  it("should skip an exiting item when it is still in items", () => {
    const merged = mergeExitingItems({
      items: [itemA, itemB, itemC],
      exiting: [{ key: itemB.id, item: itemB, index: 1 }],
      getItemKey: itemKey,
    });

    expect(merged).toEqual([itemA, itemB, itemC]);
  });

  it("should clamp the splice index when it is past the end of items", () => {
    const merged = mergeExitingItems({
      items: [itemA],
      exiting: [{ key: itemC.id, item: itemC, index: 5 }],
      getItemKey: itemKey,
    });

    expect(merged).toEqual([itemA, itemC]);
  });
});

describe("nextExitingItems", () => {
  it("should return a single exiting item when one key is removed", () => {
    const exiting = nextExitingItems({
      previousDisplayed: [itemA, itemB, itemC],
      nextItems: [itemA, itemC],
      previousExiting: [],
      getItemKey: itemKey,
      prefersReducedMotion: false,
    });

    expect(exiting).toEqual([{ key: itemB.id, item: itemB, index: 1 }]);
  });

  it("should return two exiting items when two keys are removed", () => {
    const exiting = nextExitingItems({
      previousDisplayed: [itemA, itemB, itemC],
      nextItems: [itemA],
      previousExiting: [],
      getItemKey: itemKey,
      prefersReducedMotion: false,
    });

    expect(exiting).toEqual([
      { key: itemB.id, item: itemB, index: 1 },
      { key: itemC.id, item: itemC, index: 2 },
    ]);
  });

  it("should keep an in-flight exit and add a new one when another key is removed", () => {
    const exiting = nextExitingItems({
      previousDisplayed: [itemA, itemB, itemC],
      nextItems: [itemA],
      previousExiting: [{ key: itemB.id, item: itemB, index: 1 }],
      getItemKey: itemKey,
      prefersReducedMotion: false,
    });

    expect(exiting).toEqual([
      { key: itemB.id, item: itemB, index: 1 },
      { key: itemC.id, item: itemC, index: 2 },
    ]);
  });

  it("should return no exits when more than two keys disappear", () => {
    const exiting = nextExitingItems({
      previousDisplayed: [itemA, itemB, itemC, itemD],
      nextItems: [itemE],
      previousExiting: [],
      getItemKey: itemKey,
      prefersReducedMotion: false,
    });

    expect(exiting).toEqual([]);
  });

  it("should return no exits when more than two keys disappear including an in-flight exit", () => {
    const exiting = nextExitingItems({
      previousDisplayed: [itemA, itemB, itemC, itemD],
      nextItems: [],
      previousExiting: [{ key: itemA.id, item: itemA, index: 0 }],
      getItemKey: itemKey,
      prefersReducedMotion: false,
    });

    expect(exiting).toEqual([]);
  });

  it("should drop an exiting item when its key reappears", () => {
    const exiting = nextExitingItems({
      previousDisplayed: [itemA, itemB, itemC],
      nextItems: [itemA, itemB, itemC],
      previousExiting: [{ key: itemB.id, item: itemB, index: 1 }],
      getItemKey: itemKey,
      prefersReducedMotion: false,
    });

    expect(exiting).toEqual([]);
  });

  it("should return no exits when reduced motion is preferred", () => {
    const exiting = nextExitingItems({
      previousDisplayed: [itemA, itemB, itemC],
      nextItems: [itemA, itemC],
      previousExiting: [],
      getItemKey: itemKey,
      prefersReducedMotion: true,
    });

    expect(exiting).toEqual([]);
  });

  it("should return no exits when nothing was removed", () => {
    const exiting = nextExitingItems({
      previousDisplayed: [itemA, itemB],
      nextItems: [itemA, itemB, itemC],
      previousExiting: [],
      getItemKey: itemKey,
      prefersReducedMotion: false,
    });

    expect(exiting).toEqual([]);
  });
});
