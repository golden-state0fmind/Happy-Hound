"use client"
import Link from "next/link";
import ReduxProvider from "../components/WithReduxProvider";
import { EditUserForm } from "../components/edituserform";

export default function EditProfile() {
    return (
        <ReduxProvider>
            <div className="flex items-center justify-center bg-gray-50">
                <div className="w-full md:w-4/5 lg:w-2/4 md:mx-auto bg-gray-50 px-4 py-8 sm:px-16 space-y-4 mt-3 md:mt-8 mb-8 rounded-2xl border border-gray-100 shadow-xl">
                    <div className="flex flex-col items-center justify-center space-y-3 rounded-2xl border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                        <Link className='text-2xl' href="/profile">
                            👤
                        </Link>
                        <h1 className="text-xl font-semibold text-blue-800">Edit Profile</h1>
                        <p className="text-sm text-gray-500">
                            Change the desired fields then submit with Update Profile button
                        </p>
                    </div>
                    <EditUserForm />
                </div>
            </div>
        </ReduxProvider>
    );
};