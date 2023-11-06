"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
    return (
        <button
            aria-label="Sign out"
            className="text-red-700 hover:text-red-500 transition-all"
            onClick={() => signOut()}
        >
            Sign out 
        </button>
    );
}