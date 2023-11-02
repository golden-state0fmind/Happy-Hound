"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
    return (
        <button
            aria-label="Sign out"
            className="text-red-600 hover:text-stone-500 transition-all"
            onClick={() => signOut()}
        >
            Sign out 🦴
        </button>
    );
}