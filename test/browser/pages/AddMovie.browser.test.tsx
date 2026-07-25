import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";
import AddMovie from "@/pages/adicionar-filme/AddMovie";
import { MemoryRouter } from "react-router-dom";
import { searchMoviesByTitle } from "@/services/moviesService";
import useMoviesMutate from "@/hooks/useMoviesMutate";
import { createMovieFixture } from "../../fixtures/movie.fixture";

vi.mock("@/services/moviesService", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/services/moviesService")>();
  return {
    ...actual,
    searchMoviesByTitle: vi.fn(),
  };
});

vi.mock("@/hooks/useMoviesMutate");

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()),
    useParams: vi.fn(() => ({ watcherId: "123", listCategory: "watchlist" })),
  };
});

vi.mock("@/components/MovieCard", () => ({
  default: ({ movie, buttons }: any) => (
    <div data-testid={`movie-card-${movie.id}`}>
      <img alt={movie.title} />
      {buttons?.map((b: any, i: number) => (
        <button key={i} onClick={b.onClickAction} aria-label={b.tooltipTitle}>
          {b.tooltipTitle}
        </button>
      ))}
    </div>
  ),
}));

describe("AddMovie", () => {
  const mockMutateAsync = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useMoviesMutate).mockReturnValue({
      addMovie: { mutateAsync: mockMutateAsync, isSuccess: false },
    } as any);
  });

  it("should allow searching for a movie and display results", async () => {
    const mockMovies = [
      createMovieFixture({ id: 1, title: "Test Movie 1" }),
      createMovieFixture({ id: 2, title: "Test Movie 2" }),
    ];
    vi.mocked(searchMoviesByTitle).mockResolvedValue(mockMovies);

    render(<MemoryRouter><AddMovie /></MemoryRouter>);

    await userEvent.fill(page.getByLabelText("Pesquisar"), "Test Movie");
    await userEvent.click(page.getByRole("button"));

    await vi.waitFor(() => {
      expect(searchMoviesByTitle).toHaveBeenCalledWith("Test Movie");
    });

    await expect.element(page.getByAltText("Test Movie 1")).toBeInTheDocument();
    await expect.element(page.getByAltText("Test Movie 2")).toBeInTheDocument();
  });

  it("should allow adding a movie to a list", async () => {
    const mockMovie = createMovieFixture({ id: 1, title: "Test Movie 1" });
    vi.mocked(searchMoviesByTitle).mockResolvedValue([mockMovie]);

    render(<MemoryRouter><AddMovie /></MemoryRouter>);

    await userEvent.fill(page.getByLabelText("Pesquisar"), "Test Movie 1");
    await userEvent.click(page.getByRole("button"));

    await expect.element(page.getByAltText("Test Movie 1")).toBeInTheDocument();

    // The add button is an icon button inside the movie card. 
    // It should have tooltipTitle: "Adicionar à lista"
    await userEvent.click(page.getByRole("button", { name: "Adicionar à lista" }));

    // Dialog should open
    await expect.element(page.getByText("Adicionar Test Movie 1?")).toBeInTheDocument();

    // Confirm
    await userEvent.click(page.getByRole("button", { name: "Sim" }));

    expect(mockMutateAsync).toHaveBeenCalledWith(expect.objectContaining({ id: 1, title: "Test Movie 1", watcher: "123", listCategory: "watchlist", watched: false }));
  });
});
