"use client"
import Link from "next/link"
import { useState } from "react";

export const NavBar = () => {
    const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)

    const toggleMobileNav = () => { 
        setIsMobileOpen(!isMobileOpen)
    }

    return (
        <div className="flex justify-between items-center p-5">
            <Link
                href="/"
                prefetch={false}
            >
                <h1 className="font-bold text-2xl">
                    Happy Hound Care 🐶
                </h1>
            </Link>
            <div className="hidden lg:block">
                {/* <Link
                href="/protected"
                prefetch={false}
                className="underline hover:text-stone-400 transition-all"
                >
                Protected Routes
                </Link> */}
                <Link
                    href="/register"
                    prefetch={false}
                    className="underline hover:text-stone-400 transition-all pe-5"
                >
                    Create Account
                </Link>
                <Link
                    href="/login"
                    prefetch={false}
                    className="underline hover:text-stone-400 transition-all"
                >
                    Sign In
                </Link>
            </div>
            {/* START MOBILE NAV */}
            <div className="lg:hidden">
                <button className="absolute transform -translate-y-1/2 right-5" onClick={toggleMobileNav} >
                    <div className="relative">
                        <div className={isMobileOpen ? `h-1 w-8 bg-gray-700 transform origin-center transition-transform ease-in-out duration-300 rotate-45 translate-y-2` : `h-1 w-8 bg-gray-700`}></div>
                        <div className={isMobileOpen ? `opacity-0` : `h-1 w-8 my-1 bg-gray-700`}></div> 
                        <div className={isMobileOpen ? `h-1 w-8 bg-gray-700 transform origin-center transition-transform ease-in-out duration-300 -rotate-45 translate-y-1` : `h-1 w-8 bg-gray-700`}></div> 
                    </div>
                </button>
                <div className={isMobileOpen ? "relative block text-left mt-4" : "hidden"}>
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 ">
                        <div className="block px-4 py-2">
                            <Link
                                href="/register"
                                prefetch={false}
                                className="underline hover:text-stone-400 transition-all block px-4 py-2"
                            >
                                Create Account
                            </Link>
                            <Link
                                href="/login"
                                prefetch={false}
                                className="underline hover:text-stone-400 transition-all block px-4 py-2"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* END MOBILE NAV */}
        </div>
    );
}