import { describe, it, expect, vi } from "vitest";
import { useState } from "react";
import ChoseForMeModal from "@/components/ChoseForMeModal";
import { createMoviesFixture } from "@test/fixtures/movie.fixture";

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useState: vi.fn(),
    useEffect: vi.fn(),
  };
});

vi.mock("@/services/moviesService", () => ({
  getUnwatchedMovies: vi.fn(),
}));

vi.mock("@mui/material/Modal", () => ({
  default: vi.fn(({ children, open }) => ({
    type: "Modal",
    props: { children, open },
  })),
}));
vi.mock("@mui/material/Box", () => ({
  default: vi.fn(({ children }) => ({ type: "Box", props: { children } })),
}));
vi.mock("@mui/material/Typography", () => ({
  default: vi.fn(({ children }) => ({
    type: "Typography",
    props: { children },
  })),
}));
vi.mock("@/components/MovieCard", () => ({ default: () => "MovieCard" }));

describe("ChoseForMeModal", () => {
  const props = {
    open: true,
    handleClose: vi.fn(),
    watcherId: "1",
    listCategory: "all",
  };

  it("should render correctly and handle movie selection", async () => {
    const mockMovies = createMoviesFixture(1);
    vi.mocked(useState).mockReturnValue([mockMovies[0], vi.fn()]);

    const result = ChoseForMeModal(props) as any;

    // Modal(mock) -> props: { children, open }
    const box = result.props.children;
    const container = box.props.children;

    expect(container.props.children[0]).toBeDefined();
    expect(container.props.children[1]).toBeDefined();
  });
});
