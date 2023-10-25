import Link from "next/link"
import { getServerSession } from "next-auth/next";
import MobileNav from "./MobileNav";
import SignOut from "./sign-out";

export const NavBar = async () => {
    const session = await getServerSession();

    return (
        <div className="flex justify-between items-center p-6">
            <Link
                href="/"
                prefetch={false}
            >
                <h1 className="font-bold text-2xl">
                    Happy Hound Care 🐶
                </h1>
            </Link>
            <div className="hidden lg:block">
                {session
                    ?
                    <SignOut />
                    :
                    <>
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
                    </>
                }
                
            </div>
            <MobileNav session={session} />
        </div>
    );
}