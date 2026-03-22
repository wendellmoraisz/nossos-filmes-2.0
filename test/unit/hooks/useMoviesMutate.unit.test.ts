import { describe, it, expect, vi } from "vitest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useMoviesMutate from "@/hooks/useMoviesMutate";

vi.mock("@tanstack/react-query", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-query")>();
  return {
    ...actual,
    useMutation: vi.fn(),
    useQueryClient: vi.fn(),
  };
});

import { createMovieFixture } from "../../fixtures/movie.fixture";

describe("useMoviesMutate", () => {
  const mockMovie = createMovieFixture({
    id: 1,
    watcher: "user1",
    listCategory: "watchlist",
    title: "Inception",
  });

  it("should initialize mutations and return them", () => {
    const mockQueryClient = { invalidateQueries: vi.fn() };
    vi.mocked(useQueryClient).mockReturnValue(mockQueryClient as any);

    const mockAddMutation = { mutate: vi.fn() };
    const mockUpdateMutation = { mutate: vi.fn() };
    const mockDeleteMutation = { mutate: vi.fn() };

    vi.mocked(useMutation)
      .mockReturnValueOnce(mockAddMutation as any)
      .mockReturnValueOnce(mockUpdateMutation as any)
      .mockReturnValueOnce(mockDeleteMutation as any);

    const result = useMoviesMutate(mockMovie);

    expect(useMutation).toHaveBeenCalledTimes(3);
    expect(result.addMovie).toBe(mockAddMutation);
    expect(result.updateMovieData).toBe(mockUpdateMutation);
    expect(result.deleteMovieData).toBe(mockDeleteMutation);
  });

  it("should invalidate queries on success", () => {
    const mockQueryClient = { invalidateQueries: vi.fn() };
    vi.mocked(useQueryClient).mockReturnValue(mockQueryClient as any);

    // Capture onSuccess callbacks
    const onSuccessCallbacks: (() => void)[] = [];
    vi.mocked(useMutation).mockImplementation((options: any) => {
      onSuccessCallbacks.push(options.onSuccess);
      return {} as any;
    });

    useMoviesMutate(mockMovie);

    // Trigger each onSuccess
    onSuccessCallbacks.forEach((callback) => callback());

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledTimes(3);
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["movies", mockMovie.watcher, mockMovie.listCategory],
    });
  });
});
