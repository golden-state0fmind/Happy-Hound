import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50 text-black">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="text-center max-w-screen-sm mb-10">
          <h1 className="font-bold text-2xl">
            Happy Hound Care 🐶
          </h1>
          <div className="flex justify-between">
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
              className="underline hover:text-stone-400 transition-all"
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
      </div>
    </div>
  );
}
