import Link from "next/link"

export const NavBar = () => {

    return (
        <div className="flex justify-between p-5">
            <Link
                href="/"
                prefetch={false}
            >
                <h1 className="font-bold text-2xl">
                    Happy Hound Care 🐶
                </h1>
            </Link>
            <div>
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
        </div>
    );
}