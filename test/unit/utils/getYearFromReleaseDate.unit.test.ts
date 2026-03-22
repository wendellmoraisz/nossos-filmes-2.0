import { describe, it, expect } from "vitest";
import { getYearFromReleaseDate } from "@/utils/getYearFromReleaseDate";

describe("getYearFromReleaseDate", () => {
  it("should extract the year from a standard ISO date string", () => {
    expect(getYearFromReleaseDate("2023-07-15")).toBe(2023);
  });

  it("should extract the year from a date at the start of the year", () => {
    expect(getYearFromReleaseDate("2000-01-01")).toBe(2000);
  });

  it("should extract the year from a date at the end of the year", () => {
    expect(getYearFromReleaseDate("1999-12-31")).toBe(1999);
  });

  it("should handle different years correctly", () => {
    expect(getYearFromReleaseDate("1994-09-23")).toBe(1994);
    expect(getYearFromReleaseDate("2024-03-22")).toBe(2024);
  });
});
