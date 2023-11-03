"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "../components/loading-dots"
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Form({ type }: { type: "login" | "register" }) {
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState(""); 
    // Event handler to update the selected role
    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(e.target.value);
    };
    const router = useRouter();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                if (type === "login") {
                    signIn("credentials", {
                        redirect: false,
                        email: e.currentTarget.email.value,
                        password: e.currentTarget.password.value,
                        // @ts-ignore
                    }).then(({ error }) => {
                        if (error) {
                            setLoading(false);
                            toast.error(error);
                        } else {
                            router.refresh();
                            router.push("/profile");
                        }
                    });
                } else {
                    fetch("/api/auth/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: e.currentTarget.username.value,
                            email: e.currentTarget.email.value,
                            password: e.currentTarget.password.value,
                            role: selectedRole
                        }),
                    }).then(async (res) => {
                        setLoading(false);
                        if (res.status === 200) {
                            toast.success("Account created! Redirecting to login...");
                            setTimeout(() => {
                                router.push("/login");
                            }, 2000);
                        } else {
                            const { error } = await res.json();
                            toast.error(error);
                        }
                    });
                }
            }}
            className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
        >
            {/* STARTS USERNAME */}
            <div>
                {
                    type === "register"
                        ? <>
                            <label
                                htmlFor="username"
                                className="block text-xs text-gray-600 uppercase"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="MarioThePitbull"
                                autoComplete="username"
                                required
                                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                            />
                        </>
                        : <></>
                }
            </div>
            {/* END USERNAME */}
            {/* START EMAIL ADDRESS */}
            <div>
                <label
                    htmlFor="email"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Email Address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="wroof@thedogpark.com"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
            </div>
            {/* END EMAIL ADDRESS */}
            {/* START PASSWORD */}
            <div>
                <label
                    htmlFor="password"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
            </div>
            {/* END PASSWORD */}
            {/* START ROLE */}
            <div>
                {
                    type === "register"
                        ?
                        <>
                            <label
                                htmlFor="role"
                                className="block text-xs text-gray-600 uppercase"
                            >
                                Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                                value={selectedRole}
                                onChange={handleRoleChange}
                            >
                                <option value="DOG_OWNER">DOG OWNER</option>
                                <option value="DOG_SITTER">DOG SITTER</option>
                            </select>
                        </>
                        : <></>
                }
            </div>
            {/* END ROLE */}
            <button
                aria-label={type === "login" ? "Sign In" : "Sign Up"}
                disabled={loading}
                className={`${loading
                    ? "cursor-not-allowed border-blue-200 bg-blue-600"
                    : "border-blue-200 bg-blue-300 text-black hover:bg-blue-800 hover:text-white"
                    } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
            >
                {loading ? (
                    <LoadingDots color="#FFFFFF" />
                ) : (
                    <p>{type === "login" ? "Sign In" : "Sign Up"}</p>
                )}
            </button>
            {type === "login" ? (
                <p className="text-center text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="font-semibold text-blue-800">
                        Sign up
                    </Link>{" "}
                    for free.
                </p>
            ) : (
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-blue-800">
                        Sign in
                    </Link>{" "}
                    instead.
                </p>
            )}
        </form>
    );
}
