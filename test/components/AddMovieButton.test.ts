import { describe, it, expect, vi } from "vitest";
import AddMovieButton from "../../src/components/AddMovieButton";

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

vi.mock("@mui/icons-material/Add", () => ({
  default: () => "AddIcon",
}));

describe("AddMovieButton", () => {
  it("should render correctly with redirect params", () => {
    const redirectParams = { watcherId: "user1", listCategory: "watchlist" };
    const result = AddMovieButton({ redirectParams }) as any;

    expect(result.props.to).toBe(
      `/adicionar-filme/${redirectParams.watcherId}/${redirectParams.listCategory}`,
    );
  });
});
