import Form from "../components/form";
import Link from "next/link";

export default function Login() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <Link className='text-2xl' href="/">
                        🏠
                    </Link>
                    <h1 className="text-xl font-semibold text-blue-800">Sign In</h1>
                    <p className="text-sm text-gray-500">
                        Use your email and password to sign in
                    </p>
                </div>
                <Form type="login" />
            </div>
        </div>
    );
}
