import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export async function login(email: string, password: string) {
    const auth = getAuth();
    return await signInWithEmailAndPassword(auth, email, password);
}

export async function getUserById(id: string) {
    const q = query(collection(db, "users"), where("id", "==", id));
    const response = await getDocs(q);
    return response.docs[0].data();
}