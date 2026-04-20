import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { useParams } from "react-router-dom";
import MovieDescription from "@/pages/descricao-filme/MovieDescription";
import useMovieDetailsData from "@/hooks/useMovieDetailsData";
import { createMovieFixture } from "../../fixtures/movie.fixture";
import { MOVIE_POSTER_BASE_URL } from "@/data/constants/theMoviesDb";
import { getYearFromReleaseDate } from "@/utils/getYearFromReleaseDate";
import { convertMinutesToHours } from "@/utils/convertMinutesToHours";
import { abbreviateNumber } from "@/utils/abbreviateNumber";

vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
}));

vi.mock("@/hooks/useMovieDetailsData");

vi.mock("@/components/Loading", () => ({
  default: () => <div data-testid="loading">LoadingComponent</div>,
}));

describe("MovieDescription", () => {
  const mockMovie = createMovieFixture({
    id: 1,
    title: "Inception",
    tagline: "Your mind is the scene of the crime.",
    overview:
      "A thief who steals corporate secrets through dream-sharing technology is given an inverse task.",
    poster_path: "/poster.jpg",
    backdrop_path: "/backdrop.jpg",
    release_date: "2010-07-16",
    runtime: 148,
    budget: 160000000,
    revenue: 839000000,
    genres: [
      { id: 1, name: "Sci-Fi" },
      { id: 2, name: "Action" },
    ],
    watch_providers: [
      {
        provider_id: 8,
        provider_name: "Netflix",
        logo_path: "/netflix-logo.jpg",
      },
    ],
    credits: {
      cast: [],
      crew: [
        {
          id: 1,
          name: "Christopher Nolan",
          job: "Director",
          department: "Directing",
          profile_path: null,
        },
        {
          id: 2,
          name: "Wally Pfister",
          job: "Director of Photography",
          department: "Camera",
          profile_path: null,
        },
      ],
    },
  });

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useParams).mockReturnValue({ movieId: "1" });
  });

  it("shows a loading state while movie details are being fetched", async () => {
    vi.mocked(useMovieDetailsData).mockReturnValue({
      data: undefined,
      isLoading: true,
    } as never);

    render(<MovieDescription />);

    await expect.element(page.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders all movie data present on the page", async () => {
    vi.mocked(useMovieDetailsData).mockReturnValue({
      data: mockMovie,
      isLoading: false,
    } as never);

    render(<MovieDescription />);

    await expect.element(page.getByText(mockMovie.title)).toBeInTheDocument();
    await expect
      .element(page.getByText(mockMovie.tagline as string))
      .toBeInTheDocument();
    await expect
      .element(page.getByAltText(mockMovie.title))
      .toHaveAttribute(
        "src",
        `${MOVIE_POSTER_BASE_URL}${mockMovie.poster_path}`,
      );

    await expect
      .element(
        page.getByText(
          getYearFromReleaseDate(mockMovie.release_date).toString(),
        ),
      )
      .toBeInTheDocument();
    await expect
      .element(page.getByText(convertMinutesToHours(mockMovie.runtime || 0)))
      .toBeInTheDocument();
    await expect
      .element(
        page.getByText(abbreviateNumber(mockMovie.budget || 0).toString()),
      )
      .toBeInTheDocument();
    await expect
      .element(
        page.getByText(abbreviateNumber(mockMovie.revenue || 0).toString()),
      )
      .toBeInTheDocument();

    await expect.element(page.getByText("Gêneros")).toBeInTheDocument();
    await expect.element(page.getByText("Sci-Fi")).toBeInTheDocument();
    await expect.element(page.getByText("Action")).toBeInTheDocument();

    await expect.element(page.getByText("Direção")).toBeInTheDocument();
    await expect
      .element(page.getByText("Christopher Nolan"))
      .toBeInTheDocument();
    await expect
      .element(page.getByText("Wally Pfister"))
      .not.toBeInTheDocument();

    await expect.element(page.getByText("Onde assistir")).toBeInTheDocument();
    await expect
      .element(page.getByRole("link"))
      .toHaveAttribute("href", "https://themoviedb.org/movie/1/watch");
    await expect
      .element(page.getByAltText("Netflix"))
      .toHaveAttribute(
        "src",
        `${MOVIE_POSTER_BASE_URL}${mockMovie.watch_providers?.[0].logo_path}`,
      );

    await expect.element(page.getByText("Sinopse")).toBeInTheDocument();
    await expect
      .element(page.getByText(mockMovie.overview))
      .toBeInTheDocument();
  });
});
