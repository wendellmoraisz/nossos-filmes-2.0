export function getYearFromReleaseDate(releaseDate: string) {
    return new Date(releaseDate).getFullYear();
}