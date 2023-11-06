import Link from "next/link"
import { getServerSession } from "next-auth/next";
import MobileNav from "./MobileNav";
import SignOut from "./sign-out";

export const NavBar = async () => {
    const session = await getServerSession();

    return (
        <div className="flex justify-between items-center p-6 bg-gray-100">
            <Link
                href="/"
                prefetch={false}
            >
                <h1 className="font-bold text-2xl text-blue-800">
                    Happy Hound Care 🐶
                </h1>
            </Link>
            <div className="hidden lg:block">
                {session
                    ?
                    <>
                        <Link
                            href="/profile"
                            prefetch={false}
                            className="underline hover:text-blue-600 transition-all pe-5"
                        >
                            Profile
                        </Link>
                        <SignOut />
                    </>
                    :
                    <>
                        <Link
                            href="/register"
                            prefetch={false}
                            className="underline hover:text-blue-600 transition-all pe-5"
                        >
                            Create Account
                        </Link>
                        <Link
                            href="/login"
                            prefetch={false}
                            className="underline hover:text-blue-600 transition-all"
                        >
                            Sign In
                        </Link>
                    </>
                }
                
            </div>
            <MobileNav session={session} />
        </div>
    );
}