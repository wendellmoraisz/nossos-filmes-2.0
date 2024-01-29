import { query, collection, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import Movie from "../@types/Movie";

export async function getMoviesByWatcherIdAndListCategory(watcherId: string, listCategory: string): Promise<Movie[]> {
    const q = query(collection(db, "movies"),
        where("watcher", "==", watcherId),
        where("listCategory", "==", listCategory),
        orderBy("title")
    );
    const response = await getDocs(q);
    return response.docs.map((doc) => doc.data()) as Movie[];
}