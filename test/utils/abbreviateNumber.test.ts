import { describe, it, expect } from "vitest";
import { abbreviateNumber } from "../../src/utils/abbreviateNumber";

describe("abbreviateNumber", () => {
  describe("values below 1000", () => {
    it("should return the number unchanged for 0", () => {
      expect(abbreviateNumber(0)).toBe(0);
    });

    it("should return the number unchanged for values below 1000", () => {
      expect(abbreviateNumber(999)).toBe(999);
      expect(abbreviateNumber(500)).toBe(500);
      expect(abbreviateNumber(1)).toBe(1);
    });
  });

  describe("thousands (K)", () => {
    it("should abbreviate exact thousands with no decimal", () => {
      expect(abbreviateNumber(1000)).toBe("1K");
      expect(abbreviateNumber(2000)).toBe("2K");
    });

    it("should abbreviate values with one decimal place", () => {
      expect(abbreviateNumber(1500)).toBe("1.5K");
      expect(abbreviateNumber(999999)).toBe("1000K");
    });
  });

  describe("millions (M)", () => {
    it("should abbreviate exact millions with no decimal", () => {
      expect(abbreviateNumber(1000000)).toBe("1M");
      expect(abbreviateNumber(5000000)).toBe("5M");
    });

    it("should abbreviate values with one decimal place", () => {
      expect(abbreviateNumber(1500000)).toBe("1.5M");
    });
  });

  describe("billions (B)", () => {
    it("should abbreviate exact billions with no decimal", () => {
      expect(abbreviateNumber(1000000000)).toBe("1B");
    });

    it("should abbreviate values with one decimal place", () => {
      expect(abbreviateNumber(1500000000)).toBe("1.5B");
    });
  });
});
