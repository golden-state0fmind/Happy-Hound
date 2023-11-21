"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
    const handleSignOut = () => {
        signOut()
        sessionStorage.clear();
    }
    return (
        <button
            aria-label="Sign out"
            className="text-red-700 hover:text-red-500 transition-all"
            onClick={handleSignOut}
        >
            Sign out
        </button>
    );
}