import WatchProvider from "./WatchProvider";

export default interface Movie {
    id: number
    title: string
    overview: string
    tagline?: string
    poster_path?: string
    backdrop_path?: string
    release_date: string
    runtime?: number
    genres?: Genre[]
    budget?: number
    revenue?: number
    watch_providers?: WatchProvider[]
    evaluation?: number
    listCategory: string
    watcher: string
}

interface Genre {
    id: number
    name: string
}