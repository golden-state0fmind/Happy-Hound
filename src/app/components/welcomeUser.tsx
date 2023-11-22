"use client"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '../reducers';
import { fetchUser, setCurrentUser } from '../reducers/userReducer';
import LoadingDots from './loading-dots';


export default function WelcomeUser() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchUser()
            .then((res) => {
                let userData = res.data;
                let currentUser = {
                    id: userData.id,
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    role: userData.role
                }
                dispatch(setCurrentUser(currentUser));
            })
            .catch((error) => {
                // Handle error if needed
                console.error("Error:", error);
            });
    }, []);

    return (
        <div className="bg-gray-100 rounded-lg shadow-md px-4 py-8 mb-4">
            {/* Placeholder content */}
            <h2 className='text-base md:text-lg lg:text-xl font-semibold text-blue-800' >
                <span className='pe-2'>
                    Welcome
                </span>
                {
                    user.firstName !== null
                        ? user.firstName
                        : <LoadingDots color="blue" />
                }
            </h2>
            <Link className="underline text-base md:text-lg lg:text-xl hover:text-blue-600 transition-all block py-2" href="/editprofile">
                Edit Profile
            </Link>
        </div>
    );
}