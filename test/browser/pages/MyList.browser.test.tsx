import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import MyList from "@/pages/minha-lista/MyList";
import { MemoryRouter } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import useMoviesData from "@/hooks/useMoviesData";
import useFilteredMovies from "@/hooks/useFilteredMovies";
import useMoviesMutate from "@/hooks/useMoviesMutate";
import { createMovieFixture } from "../../fixtures/movie.fixture";

vi.mock("@/hooks/useAuth");
vi.mock("@/hooks/useMoviesData");
vi.mock("@/hooks/useFilteredMovies");
vi.mock("@/hooks/useMoviesMutate");

vi.mock("@/components/Loading", () => ({
  default: () => <div data-testid="loading">LoadingComponent</div>,
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("MyList", () => {
  const mockMovies = [
    createMovieFixture({ id: 1, title: "Movie 1", watched: false }),
    createMovieFixture({ id: 2, title: "Movie 2", watched: true }),
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({ user: { id: "user1" } } as any);
    vi.mocked(useMoviesData).mockReturnValue({
      data: mockMovies,
      isLoading: false,
    } as any);
    vi.mocked(useFilteredMovies).mockReturnValue({
      filteredMovies: mockMovies,
      showUnwatchedOnly: false,
      toggleFilter: vi.fn(),
    });
    vi.mocked(useMoviesMutate).mockReturnValue({
      updateMovieData: { mutate: vi.fn() },
      deleteMovieData: { mutateAsync: vi.fn() },
    } as any);
  });

  it("should render loading state", async () => {
    vi.mocked(useMoviesData).mockReturnValue({ isLoading: true } as any);
    render(<MemoryRouter><MyList /></MemoryRouter>);
    await expect.element(page.getByTestId("loading")).toBeInTheDocument();
  });

  it("should render the list of movies", async () => {
    render(<MemoryRouter><MyList /></MemoryRouter>);
    await expect.element(page.getByAltText("Movie 1")).toBeInTheDocument();
    await expect.element(page.getByAltText("Movie 2")).toBeInTheDocument();
  });

  it("should render the filter button", async () => {
    render(<MemoryRouter><MyList /></MemoryRouter>);
    await expect.element(page.getByText(/assistidos/i)).toBeInTheDocument();
  });
});
