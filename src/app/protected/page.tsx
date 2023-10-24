import SignOut from "../components/sign-out";

export default function Home() {
    return (
        <div className="flex h-screen bg-white">
            <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
                Protected pages for account holders.
                <SignOut />
            </div>
        </div>
    );
}