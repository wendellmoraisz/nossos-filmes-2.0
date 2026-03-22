import { describe, it, expect, vi } from "vitest";
import MovieCard from "../../src/components/MovieCard";
import { createMovieFixture } from "../fixtures/movie.fixture";
import { getEvaluationDescription } from "../../src/utils/evaluationUtils";

vi.mock("../../src/utils/evaluationUtils", () => ({
  getEvaluationDescription: vi.fn((val) => `Description for ${val}`),
}));

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

vi.mock("@mui/material", () => ({
  Tooltip: vi.fn(({ children, title }) => ({
    type: "Tooltip",
    props: { children, title },
  })),
}));

vi.mock("@mui/icons-material/InfoOutlined", () => ({
  default: () => "InfoIcon",
}));

vi.mock("./Loading", () => ({
  default: () => "LoadingComponent",
}));

describe("MovieCard", () => {
  const mockMovie = createMovieFixture({
    id: 1,
    title: "Inception",
    poster_path: "/path.jpg",
    evaluation: 5,
  });

  it("should render movie info correctly", () => {
    MovieCard({ movie: mockMovie });
    expect(getEvaluationDescription).toHaveBeenCalledWith(5);
  });

  it("should render extra buttons when provided", () => {
    const mockButtons = [
      { content: "Btn1", onClickAction: vi.fn(), tooltipTitle: "Tooltip 1" },
    ];

    const result = MovieCard({ movie: mockMovie, buttons: mockButtons }) as any;

    expect(result).toBeDefined();
  });
});
