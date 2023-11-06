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
                    <div className='flex justify-between w-40'>
                        <div className="h-10 w-10 flex items-center justify-center bg-white rounded-full">
                            <Link
                                href="/profile"
                                prefetch={false}
                                className="text-white text-xs md:text-sm lg:text-base font-bold"
                            >
                                👤
                            </Link>
                        </div>
                        <SignOut />
                    </div>
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