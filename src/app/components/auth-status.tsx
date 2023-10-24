import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";

export default async function AuthStatus() {
    const session = await getServerSession();
    return (
        <div className="absolute top-5 w-full flex justify-center items-center">
            {session && (
                <p className="text-black text-sm">
                    Signed in as {session.user?.email}
                </p>
            )}
        </div>
    );
}

export function useIsUserSignedIn() {
    const { data: session } = useSession();

    return session !== null;
}