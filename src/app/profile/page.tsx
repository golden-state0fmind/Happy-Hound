import { getServerSession } from "next-auth/next";

export default async function Home() {
    const session = await getServerSession();

    return (
        <div className="flex h-screen bg-white">
            <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
                Welcome {session?.user?.email}
                
            </div>
        </div>
    );
}