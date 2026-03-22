import { describe, it, expect } from "vitest";
import { convertMinutesToHours } from "../../src/utils/convertMinutesToHours";

describe("convertMinutesToHours", () => {
  describe("less than 60 minutes", () => {
    it("should return minutes with 'min' suffix", () => {
      expect(convertMinutesToHours(0)).toBe("0min");
      expect(convertMinutesToHours(30)).toBe("30min");
      expect(convertMinutesToHours(59)).toBe("59min");
    });
  });

  describe("exact hours (no remaining minutes)", () => {
    it("should return hours with 'h' suffix and no minutes", () => {
      expect(convertMinutesToHours(60)).toBe("1h");
      expect(convertMinutesToHours(120)).toBe("2h");
      expect(convertMinutesToHours(180)).toBe("3h");
    });
  });

  describe("hours and remaining minutes", () => {
    it("should return combined hours and minutes format", () => {
      expect(convertMinutesToHours(90)).toBe("1h 30min");
      expect(convertMinutesToHours(125)).toBe("2h 5min");
      expect(convertMinutesToHours(150)).toBe("2h 30min");
    });
  });
});
