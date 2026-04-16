import { useState, useEffect } from "react";

const AUTH_KEY = "tech_hub_auth_v1";
const ADMIN_PASSWORD = "123"; // Senha simplificada

export function login(password: string): boolean {
    if (password === ADMIN_PASSWORD) {
        localStorage.setItem(AUTH_KEY, "true");
        return true;
    }
    return false;
}

export function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.dispatchEvent(new Event("auth-change"));
}

export function isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(AUTH_KEY) === "true";
}

export function useAuth() {
    const [authed, setAuthed] = useState<boolean>(isAuthenticated());

    useEffect(() => {
        const handleAuthChange = () => setAuthed(isAuthenticated());
        window.addEventListener("auth-change", handleAuthChange);
        // Observe storage alterations in other tabs
        window.addEventListener("storage", handleAuthChange);

        return () => {
            window.removeEventListener("auth-change", handleAuthChange);
            window.removeEventListener("storage", handleAuthChange);
        };
    }, []);

    return { authed, logout };
}
