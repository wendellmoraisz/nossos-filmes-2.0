import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  getMoviesByWatcherIdAndListCategory,
  addMovieToWatchList,
  searchMoviesByTitle,
  updateMovie,
  deleteMovie,
  getUnwatchedMovies,
  getMovieDetails,
  getMovieStreamingProviders,
} from "@/services/moviesService";
import { createMovieFixture } from "../../fixtures/movie.fixture";

// Mock Firebase Firestore
vi.mock("firebase/firestore", async (importOriginal) => {
  const actual = await importOriginal<typeof import("firebase/firestore")>();
  return {
    ...actual,
    query: vi.fn((...args) => ({ _type: "query", args })),
    collection: vi.fn((...args) => ({ _type: "collection", args })),
    where: vi.fn((...args) => ({ _type: "where", args })),
    getDocs: vi.fn(),
    orderBy: vi.fn((...args) => ({ _type: "orderBy", args })),
    addDoc: vi.fn(),
    updateDoc: vi.fn(),
    doc: vi.fn((...args) => ({ _type: "doc", args })),
    deleteDoc: vi.fn(),
  };
});

describe("moviesService", () => {
  const mockMovie = createMovieFixture();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", vi.fn());
    // Mock import.meta.env for TMDB token
    vi.stubGlobal("import.meta", {
      env: { VITE_TMDB_API_BEARER_TOKEN: "mock-token" },
    });
  });

  describe("Firestore Operations", () => {
    it("should fetch movies by watcher and category", async () => {
      const mockSnapshot = {
        docs: [
          {
            data: vi.fn().mockReturnValue(mockMovie),
          },
        ],
      };
      vi.mocked(getDocs).mockResolvedValue(mockSnapshot as any);

      const result = await getMoviesByWatcherIdAndListCategory(
        "user1",
        "watchlist",
      );

      expect(getDocs).toHaveBeenCalled();
      expect(result).toEqual([mockMovie]);
    });

    it("should add a movie to watchlist", async () => {
      await addMovieToWatchList(mockMovie);
      expect(addDoc).toHaveBeenCalledWith(expect.anything(), mockMovie);
    });

    it("should update a movie", async () => {
      const mockSnapshot = {
        docs: [{ id: "doc-id" }],
      };
      vi.mocked(getDocs).mockResolvedValue(mockSnapshot as any);
      vi.mocked(doc).mockReturnValue("doc-ref" as any);

      await updateMovie(mockMovie);

      expect(getDocs).toHaveBeenCalled();
      expect(updateDoc).toHaveBeenCalledWith(
        "doc-ref",
        expect.objectContaining(mockMovie),
      );
    });

    it("should delete a movie", async () => {
      const mockSnapshot = {
        docs: [{ id: "doc-id" }],
      };
      vi.mocked(getDocs).mockResolvedValue(mockSnapshot as any);
      vi.mocked(doc).mockReturnValue("doc-ref" as any);

      await deleteMovie(mockMovie);

      expect(deleteDoc).toHaveBeenCalledWith("doc-ref");
    });

    it("should get unwatched movies", async () => {
      const mockSnapshot = {
        docs: [{ data: () => mockMovie }],
      };
      vi.mocked(getDocs).mockResolvedValue(mockSnapshot as any);

      const result = await getUnwatchedMovies("user1", "watchlist");

      expect(where).toHaveBeenCalledWith("watched", "==", false);
      expect(result).toEqual([mockMovie]);
    });
  });

  describe("TMDB API Operations", () => {
    it("should search movies by title", async () => {
      const mockResponse = {
        results: [mockMovie],
      };
      vi.mocked(fetch).mockResolvedValue({
        json: async () => mockResponse,
      } as any);

      const result = await searchMoviesByTitle("Inception");

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("search/movie"),
        expect.any(Object),
      );
      expect(result).toEqual([mockMovie]);
    });

    it("should fetch movie details", async () => {
      vi.mocked(fetch).mockResolvedValue({
        json: async () => mockMovie,
      } as any);

      const result = await getMovieDetails(1);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("movie/1"),
        expect.any(Object),
      );
      expect(result).toEqual(mockMovie);
    });

    it("should fetch streaming providers", async () => {
      const mockProviders = { results: { BR: { flatrate: [] } } };
      vi.mocked(fetch).mockResolvedValue({
        json: async () => mockProviders,
      } as any);

      const result = await getMovieStreamingProviders(1);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("watch/providers"),
        expect.any(Object),
      );
      expect(result).toEqual(mockProviders);
    });
  });
});
