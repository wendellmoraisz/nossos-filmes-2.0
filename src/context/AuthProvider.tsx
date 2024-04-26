import { useState, createContext, useEffect, ReactNode } from "react";
import User from "../@types/User";
import AuthUser from "../@types/AuthUser";
import * as userService from "../services/userService";

interface AuthContext {
    user?: User;
    logout: () => void;
    login: (user: AuthUser) => Promise<void>;
}

export const AuthContext = createContext<AuthContext>({
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
        const loginResponse = await userService.login(user.email, user.password);
        const firebaseUser = await userService.getUserById(loginResponse.user.uid);
        saveUserLocally(firebaseUser as User);
    }

    const saveUserLocally = (user: User) => {
        setUser(user);
        window.localStorage.setItem(import.meta.env.VITE_AUTH_STORAGE as string, JSON.stringify(user));
    }

    const logout = () => window.localStorage.removeItem(import.meta.env.VITE_AUTH_STORAGE as string);

    const contextValues = {
        user,
        logout: logout,
        login: login,
    };

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
}