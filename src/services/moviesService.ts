import { query, collection, where, getDocs, orderBy, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import Movie from "../@types/Movie";
import { BASE_URL } from "../data/constants/theMoviesDb";

export async function getMoviesByWatcherIdAndListCategory(watcherId: string, listCategory: string): Promise<Movie[]> {
    const q = query(collection(db, "movies"),
        where("watcher", "==", watcherId),
        where("listCategory", "==", listCategory),
        orderBy("title")
    );
    const response = await getDocs(q);
    return response.docs.map((doc) => doc.data()) as Movie[];
}

export async function addMovieToWatchList(movie: Movie): Promise<void> {
    await addDoc(collection(db, "movies"), movie);
}

export async function searchMoviesByTitle(title: string) {
    const searchMovieUrl = `${BASE_URL}/search/movie?language=pt-BR&query=${title}&page=1`
    const response = await fetch(searchMovieUrl, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_BEARER_TOKEN}`
        }
    });
    const data = await response.json();
    return data.results as Movie[];
}

export async function updateMovie(movie: Movie) {
    const q = query(collection(db, "movies"),
        where("id", "==", movie.id),
        where("watcher", "==", movie.watcher),
        where("listCategory", "==", movie.listCategory)
    );
    const res = await getDocs(q);
    const movieRef = res.docs[0].id;
    const docRef = doc(db, "movies", movieRef);
    await updateDoc(docRef, {
        ...movie
    });
}

export async function deleteMovie(movie: Movie) {
    const q = query(collection(db, "movies"),
        where("id", "==", movie.id),
        where("watcher", "==", movie.watcher),
        where("listCategory", "==", movie.listCategory)
    );
    const res = await getDocs(q);
    const movieRef = res.docs[0].id;
    return await deleteDoc(doc(db, "movies", movieRef));
}

export async function getUnwatchedMovies(watcherId: string, listCategory: string) {
    const q = query(collection(db, "movies"),
        where("watcher", "==", watcherId),
        where("listCategory", "==", listCategory),
        where("watched", "==", false)
    );
    const response = await getDocs(q);
    return response.docs.map((doc) => doc.data()) as Movie[];
}

export async function getMovieDetails(movieId: number): Promise<Movie> {
    const movieDetailsUrl = `${BASE_URL}/movie/${movieId}?language=pt-BR`
    const response = await fetch(movieDetailsUrl, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_BEARER_TOKEN}`
        }
    });
    return await response.json();
}

export async function getMovieStreamingProviders(movieId: number) {
    const movieWatchProvidersUrl = `${BASE_URL}/movie/${movieId}/watch/providers`
    const response = await fetch(movieWatchProvidersUrl, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_BEARER_TOKEN}`
        }
    });
    return await response.json();
}