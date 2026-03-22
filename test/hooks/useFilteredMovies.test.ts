import { describe, it, expect, vi, beforeEach } from "vitest";
import { useState, useMemo } from "react";
import useFilteredMovies from "../../src/hooks/useFilteredMovies";
import Movie from "../../src/@types/Movie";
import { createMoviesFixture } from "../fixtures/movie.fixture";

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useState: vi.fn(),
    useMemo: vi.fn(),
  };
});

describe("useFilteredMovies", () => {
  const mockMovies: Movie[] = createMoviesFixture(2);
  mockMovies[0].title = "Watched Movie";
  mockMovies[0].watched = true;
  mockMovies[1].title = "Unwatched Movie";
  mockMovies[1].watched = false;

  const storageKey = "test-storage-key";

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock localStorage
    const store: Record<string, string> = {};
    vi.stubGlobal("localStorage", {
      getItem: vi.fn((key) => store[key] || null),
      setItem: vi.fn((key, value) => {
        store[key] = value;
      }),
    });
  });

  it("should initialize state from localStorage", () => {
    localStorage.setItem(storageKey, "true");

    // Capture the lazy initializer of useState
    let initializer: () => boolean = () => false;
    (useState as any).mockImplementation((init: any) => {
      if (typeof init === "function") {
        initializer = init as () => boolean;
      }
      return [true, vi.fn()] as any;
    });

    useFilteredMovies(mockMovies, storageKey);

    expect(initializer()).toBe(true);
  });

  it("should filter movies based on showUnwatchedOnly", () => {
    // Mock useState to return showUnwatchedOnly = true
    vi.mocked(useState).mockReturnValue([true, vi.fn()]);

    // Mock useMemo to just execute the factory
    vi.mocked(useMemo).mockImplementation((factory) => factory());

    const { filteredMovies } = useFilteredMovies(mockMovies, storageKey);

    expect(filteredMovies).toHaveLength(1);
    expect(filteredMovies[0].id).toBe(2);
  });

  it("should return all movies when showUnwatchedOnly is false", () => {
    vi.mocked(useState).mockReturnValue([false, vi.fn()]);
    vi.mocked(useMemo).mockImplementation((factory) => factory());

    const { filteredMovies } = useFilteredMovies(mockMovies, storageKey);

    expect(filteredMovies).toHaveLength(2);
  });

  it("should toggle filter and update localStorage", () => {
    const setShowUnwatchedOnly = vi.fn();
    vi.mocked(useState).mockReturnValue([false, setShowUnwatchedOnly]);

    const { toggleFilter } = useFilteredMovies(mockMovies, storageKey);

    toggleFilter();

    // Check if setter was called with a function (functional update)
    expect(setShowUnwatchedOnly).toHaveBeenCalledWith(expect.any(Function));

    // Test the functional update logic
    const updateFn = setShowUnwatchedOnly.mock.calls[0][0];
    const result = updateFn(false);
    expect(result).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith(storageKey, "true");
  });
});
