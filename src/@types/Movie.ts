import WatchProvider from "./WatchProvider";

export default interface Movie {
  id: number;
  title: string;
  overview: string;
  tagline?: string;
  poster_path?: string;
  backdrop_path?: string;
  release_date: string;
  runtime?: number;
  genres?: Genre[];
  budget?: number;
  revenue?: number;
  watch_providers?: WatchProvider[];
  credits?: Credits;
  watched: boolean;
  evaluation?: number;
  listCategory: string;
  watcher: string;
}

interface Genre {
  id: number;
  name: string;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}
