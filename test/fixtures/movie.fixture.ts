import Movie from "../../src/@types/Movie";

export function createMovieFixture(overrides?: Partial<Movie>): Movie {
  return {
    id: 1,
    title: "Default Movie Title",
    overview: "Default overview content...",
    poster_path: "/path/to/poster.jpg",
    backdrop_path: "/path/to/backdrop.jpg",
    release_date: "2023-01-01",
    vote_average: 8.5,
    listCategory: "watchlist",
    watcher: "user1",
    watched: false,
    runtime: 120,
    ...overrides,
  } as unknown as Movie;
}

export function createMoviesFixture(count: number, overrides?: Partial<Movie>): Movie[] {
  return Array.from({ length: count }, (_, i) => 
    createMovieFixture({ id: i + 1, ...overrides })
  );
}
