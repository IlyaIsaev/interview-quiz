import { describe, expect, it } from "vite-plus/test";
import { pickRandomItem } from "./pick-random-item";

describe("pickRandomItem", () => {
  it("should return undefined when items is empty", () => {
    expect(pickRandomItem([])).toBeUndefined();
  });

  it("should return the only item when the list has one element", () => {
    expect(pickRandomItem(["only"])).toBe("only");
  });

  it("should pick the item at the floored random index when the list has several items", () => {
    expect(pickRandomItem(["a", "b", "c"], () => 0)).toBe("a");
    expect(pickRandomItem(["a", "b", "c"], () => 0.5)).toBe("b");
    expect(pickRandomItem(["a", "b", "c"], () => 0.99)).toBe("c");
  });
});
