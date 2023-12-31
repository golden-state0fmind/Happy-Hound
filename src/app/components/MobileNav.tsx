"use client"
import Link from "next/link";
import { useState } from "react";
import SignOut from "./sign-out";
import { Session } from "next-auth";

type SessionProps = {
    session: Session | null
}

export default function MobileNav({ session }: SessionProps) {
    const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

    const toggleMobileNav = () => {
        setIsMobileOpen(!isMobileOpen);
    }

    return (
        <div className="lg:hidden">
            <button aria-label="toggle-nav" className="absolute transform -translate-y-1/2 right-5" onClick={toggleMobileNav} >
                <div className="relative">
                    <div className={isMobileOpen ? `h-1 w-8 bg-blue-800 transform origin-center transition-transform ease-in-out duration-300 rotate-45 translate-y-2` : `h-1 w-8 bg-blue-800`}></div>
                    <div className={isMobileOpen ? `opacity-0` : `h-1 w-8 my-1 bg-blue-800`}></div>
                    <div className={isMobileOpen ? `h-1 w-8 bg-blue-800 transform origin-center transition-transform ease-in-out duration-300 -rotate-45 translate-y-1` : `h-1 w-8 bg-blue-800`}></div>
                </div>
            </button>
            <div className={isMobileOpen ? "relative block text-left mt-4" : "hidden"}>
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 ">
                    <div className="block px-4 py-2">
                        {
                            session
                                ?
                                <>
                                    <Link
                                        href="/profile"
                                        prefetch={false}
                                        className="underline hover:text-blue-600 transition-all block px-4 py-2"
                                    >
                                        <div className="h-8 w-8 flex items-center justify-center bg-gray-100 rounded-full">
                                            <span className="text-white text-xs md:text-sm lg:text-base font-bold">👤</span>
                                        </div>
                                    </Link>
                                    <div className='block px-4 py-2'>
                                        <SignOut />
                                    </div>
                                </>
                                :
                                <>
                                    <Link
                                        href="/register"
                                        prefetch={false}
                                        className="underline hover:text-blue-600 transition-all block px-4 py-2"
                                    >
                                        Create Account
                                    </Link>
                                    <Link
                                        href="/login"
                                        prefetch={false}
                                        className="underline hover:text-blue-600 transition-all block px-4 py-2"
                                    >
                                        Sign In
                                    </Link>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}