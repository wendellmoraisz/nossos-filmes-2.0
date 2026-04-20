/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useQuery } from "@tanstack/react-query";
import useMovieDetailsData from "@/hooks/useMovieDetailsData";
import {
  getMovieDetails,
  getMovieStreamingProviders,
} from "@/services/moviesService";
import { createMovieFixture } from "../../fixtures/movie.fixture";

vi.mock("@tanstack/react-query", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-query")>();
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

vi.mock("@/services/moviesService");

describe("useMovieDetailsData", () => {
  const movieId = 1;
  const mockMovie = createMovieFixture({ id: movieId });
  const mockProviders = {
    results: {
      BR: {
        flatrate: [
          {
            logo_path: "/path.jpg",
            provider_id: 1,
            provider_name: "Netflix",
            display_priority: 1,
          },
        ],
      },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call useQuery with correct parameters", () => {
    const mockQueryValue = { data: mockMovie, isLoading: false };
    vi.mocked(useQuery).mockReturnValue(mockQueryValue as any);

    const result = useMovieDetailsData(movieId);

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["movie", movieId],
        enabled: true,
      }),
    );
    expect(result).toBe(mockQueryValue);
  });

  it("should combine movie details and providers in queryFn", async () => {
    vi.mocked(useQuery).mockReturnValue({} as any);
    vi.mocked(getMovieDetails).mockResolvedValue(mockMovie);
    vi.mocked(getMovieStreamingProviders).mockResolvedValue(mockProviders);

    useMovieDetailsData(movieId);

    const queryOptions = vi.mocked(useQuery).mock.calls[0][0] as any;
    const result = await queryOptions.queryFn();

    expect(getMovieDetails).toHaveBeenCalledWith(movieId);
    expect(getMovieStreamingProviders).toHaveBeenCalledWith(movieId);
    expect(result).toEqual({
      ...mockMovie,
      watch_providers: mockProviders.results.BR.flatrate,
    });
  });

  it("should return empty watch_providers if no flatrate in BR", async () => {
    vi.mocked(useQuery).mockReturnValue({} as any);
    vi.mocked(getMovieDetails).mockResolvedValue(mockMovie);
    vi.mocked(getMovieStreamingProviders).mockResolvedValue({ results: {} });

    useMovieDetailsData(movieId);

    const queryOptions = vi.mocked(useQuery).mock.calls[0][0] as any;
    const result = await queryOptions.queryFn();

    expect(result.watch_providers).toEqual([]);
  });
});
