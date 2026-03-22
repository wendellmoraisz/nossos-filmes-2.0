import { describe, it, expect } from "vitest";
import Loading from "../../src/components/Loading";

describe("Loading", () => {
  it("should render without crashing", () => {
    const result = Loading();
    expect(result).toBeDefined();
  });
});
