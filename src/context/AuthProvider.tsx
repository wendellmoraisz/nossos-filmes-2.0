import { useState, createContext, useEffect, ReactNode } from "react";
import User from "../interfaces/User";
import AuthUser from "../interfaces/AuthUser";
import * as firebase from "../services/firebaseService";

interface AuthContext {
    user?: User;
    setUser: (user: User) => void;
    logout: () => void;
    login: (user: AuthUser) => Promise<void>;
}

export const AuthContext = createContext<AuthContext>({
    setUser: () => { },
    logout: () => { },
    login: async () => { },
});

export default function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<User>();

    useEffect(() => {
        verifyLocalUser();
    }, []);
    
    const verifyLocalUser = () => {
        const localUser = JSON.parse(window.localStorage.getItem(import.meta.env.VITE_AUTH_STORAGE as string) as string);
        if (localUser) setUser(localUser);
    }

    const login = async (user: AuthUser) => {
        const loginResponse = await firebase.login(user.email, user.password);
        const firebaseUser = await firebase.getUserById(loginResponse.user.uid);
        console.log(loginResponse)
        saveUserLocally(firebaseUser as User);
    }

    const saveUserLocally = (user: User) => {
        setUser(user);
        window.localStorage.setItem(import.meta.env.VITE_AUTH_STORAGE as string, JSON.stringify(user));
    }

    const logout = () => window.localStorage.removeItem(import.meta.env.VITE_AUTH_STORAGE as string);

    const contextValues = {
        user,
        setUser: saveUserLocally,
        logout: logout,
        login: login,
    };

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
}