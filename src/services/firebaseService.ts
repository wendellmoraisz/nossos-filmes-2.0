import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export async function login(email: string, password: string) {
    const auth = getAuth();
    return await signInWithEmailAndPassword(auth, email, password);
}