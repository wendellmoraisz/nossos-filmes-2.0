import { describe, it, expect, vi } from "vitest";
import { useQuery } from "@tanstack/react-query";
import useMoviesData from "../../src/hooks/useMoviesData";
import { getMoviesByWatcherIdAndListCategory } from "../../src/services/moviesService";

import { createMovieFixture } from "../fixtures/movie.fixture";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

vi.mock("../../src/services/moviesService", () => ({
  getMoviesByWatcherIdAndListCategory: vi.fn(),
}));

describe("useMoviesData", () => {
  const watcherId = "user1";
  const listCategory = "watchlist";
  const mockMovie = createMovieFixture({ watcher: watcherId, listCategory });
  const mockQueryValue = { data: [mockMovie], isLoading: false };

  it("should call useQuery with correct parameters", () => {
    vi.mocked(useQuery).mockReturnValue(mockQueryValue as any);

    const result = useMoviesData(watcherId, listCategory);

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["movies", watcherId, listCategory],
      }),
    );

    // Verify queryFn calls the service correctly
    const queryOptions = vi.mocked(useQuery).mock.calls[0][0] as any;
    queryOptions.queryFn();
    expect(getMoviesByWatcherIdAndListCategory).toHaveBeenCalledWith(
      watcherId,
      listCategory,
    );

    expect(result).toBe(mockQueryValue);
  });
});
