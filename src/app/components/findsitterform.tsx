import { useState } from 'react';
import { RootState } from '../reducers';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import LoadingDots from './loading-dots';

const FindSitterForm = () => {
    const [loading, setLoading] = useState(false);
    const [numberOfDogs, setNumberOfDogs] = useState(1);
    const serviceState = useSelector((state: RootState) => state.service);
    const { dropInVisits, dogWalking, houseSitting } = serviceState;

    const servicesArray = [];
    if (dropInVisits) servicesArray.push('Drop-in Visits');
    if (dogWalking) servicesArray.push('Dog Walking');
    if (houseSitting) servicesArray.push('House Sitting');
    const servicesText = servicesArray.join(', ');

    const handleInputChange = (e: any) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1 && value <= 10) {
            setNumberOfDogs(value);
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);
        // Your form submission logic here
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col bg-gray-100 rounded-lg shadow-md mt-6 space-y-4 px-4 py-8 sm:px-16">
            <div>
                <label htmlFor="pets" className="block text-xs text-gray-600 uppercase">
                    How many dogs?
                    <span className="ps-2 text-red-700">*</span>
                    <span className="text-xs text-red-700">Max 10 dogs per sitter</span>
                </label>
                <input
                    id="pets"
                    name="pets"
                    type="number"
                    required
                    pattern="\d*"
                    inputMode="numeric"
                    value={numberOfDogs}
                    onChange={handleInputChange}
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="service" className="block text-xs text-gray-600 uppercase">
                    What service?
                    <Link className="ps-2 text-blue-800" href={'/'}>select more services</Link>
                </label>
                <input
                    id="service"
                    name="service"
                    type="text"
                    required
                    readOnly
                    disabled
                    value={servicesText}
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="location" className="block text-xs text-gray-600 uppercase">
                    Location near
                </label>
                <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="startDate" className="block text-xs text-gray-600 uppercase">
                    For what days?
                </label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                    <input
                        aria-label="startDate"
                        id="startDate"
                        name="startDate"
                        type="date"
                        required
                        className="appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                    />
                    <input
                        aria-label="endDate"
                        id="endDate"
                        name="endDate"
                        type="date"
                        required
                        className="appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                    />
                </div>
            </div>

            <button
                aria-label="Submit"
                disabled={loading}
                className={`${loading
                    ? "cursor-not-allowed border-blue-200 bg-blue-600"
                    : "border-blue-200 bg-blue-300 text-black hover:bg-blue-800 hover:text-white"
                    } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
            >
                {loading ? (
                    <LoadingDots color="#FFFFFF" />
                ) : (
                    <p>Submit</p>
                )}
            </button>
        </form>
    );
};

export default FindSitterForm;
