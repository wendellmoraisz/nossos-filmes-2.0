import { describe, it, expect, vi } from "vitest";
import HomeButton from "@/components/HomeButton";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    Link: vi.fn(({ children, to }) => ({
      type: "Link",
      props: { children, to },
    })),
  };
});

vi.mock("@mui/icons-material/Home", () => ({
  default: () => "HomeIcon",
}));

describe("HomeButton", () => {
  it("should render correctly", () => {
    const result = HomeButton() as any;
    expect(result.props.to).toBe("/home");
  });
});
