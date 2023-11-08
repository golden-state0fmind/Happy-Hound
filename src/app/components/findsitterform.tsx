import { ChangeEvent, FormEvent, useState } from 'react';
import { RootState } from '../reducers';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import LoadingDots from './loading-dots';

const FindSitterForm = () => {
    const [zipCode, setZipCode] = useState<number | string>('');
    const [loading, setLoading] = useState(false);
    const [numberOfDogs, setNumberOfDogs] = useState<number | string>(1);
    const serviceState = useSelector((state: RootState) => state.service);
    const { dropInVisits, dogWalking, houseSitting } = serviceState;

    // Adding all selected services into an array then placing the elements as values into the input field as read only
    // User can click link in label to select more services
    const servicesArray = [];
    if (dropInVisits) servicesArray.push('Drop-in Visits');
    if (dogWalking) servicesArray.push('Dog Walking');
    if (houseSitting) servicesArray.push('House Sitting');
    const servicesText = servicesArray.join(', ');

    const handleDogNumber = (e: ChangeEvent<HTMLInputElement>) => {
        const dogNumber = Number(e.target.value)
        if (isNaN(dogNumber)) {
            setNumberOfDogs(1)
        }
        else if (dogNumber > 10) {
            setNumberOfDogs(10);
        } else {
            setNumberOfDogs(e.target.value)
        }
    };

    const isValidZipCode = (value: number | string) => {
        const zipCodePattern = /^\d{5}(-\d{4})?$/;
        const convertValue = value.toString();
        const isValid = zipCodePattern.test(convertValue);
        if (!isValid) {
            setLoading(false);
            alert('Please enter a valid ZIP code');
        }
    }

    // TODO: Format the zipcode to match 12345-4321 -> this format can be used to be more precise as areaCode-address 
    // Currently only matches format 12345 -> areaCode
    function formatZipCode(areaCode: string) {
        // Remove non-numeric characters and hyphens
        const cleanZip = areaCode.replace(/[^\d-]/g, '');
        // Format ZIP code
        if (cleanZip.length <= 5) {
            return cleanZip.replace(/^(\d{5}).*/, '$1');
        } else {
            return cleanZip.replace(/^(\d{5})(\d{0,4}).*/, '$1-$2');
        }
    }

    const handleZipCodeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const formattedZip = formatZipCode(value)
        setZipCode(formattedZip)
    }

    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0'); // Get the day (1-31) and pad with zero if needed
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Get the month (0-11); +1 to make it 1-12 and pad with zero if needed
    const year = today.getFullYear(); // Get the year (e.g., 2023)

    // Provided date in MM/DD/YYYY format
    const providedDate = `${month}/${day}/${year}`;

    // Convert to YYYY-MM-DD format
    const parts = providedDate.split('/');
    const formattedDate = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        isValidZipCode(zipCode);
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
                    type="text"
                    required
                    pattern="\d*"
                    inputMode="numeric"
                    maxLength={2}
                    value={numberOfDogs}
                    onChange={handleDogNumber}
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-green-800 shadow-sm sm:text-sm"
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
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-green-950 sm:text-green-800 shadow-sm sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="location" className="block text-xs text-gray-600 uppercase">
                    Sitters near
                </label>
                <input
                    id="location"
                    name="location"
                    type="text"
                    pattern="\d*"
                    inputMode="numeric"
                    required
                    value={zipCode}
                    maxLength={5}
                    onChange={handleZipCodeInput}
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-green-800 shadow-sm sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="startDate" className="block text-xs text-gray-600 uppercase">
                    For what days?
                    <span className="ps-2 text-xs text-blue-700">Add dates to see available sitters</span>
                </label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                    <input
                        aria-label="startDate"
                        id="startDate"
                        name="startDate"
                        type="date"
                        required
                        defaultValue={formattedDate}
                        className="appearance-none rounded-md border border-gray-300 px-3 py-2 text-green-800 shadow-sm sm:text-sm"
                    />
                    <input
                        aria-label="endDate"
                        id="endDate"
                        name="endDate"
                        type="date"
                        required
                        defaultValue={formattedDate}
                        className="appearance-none rounded-md border border-gray-300 px-3 py-2 text-green-800 shadow-sm sm:text-sm"
                    />
                </div>
            </div>

            <button
                aria-label="Fetch Dog Sitters"
                disabled={loading}
                className={`${loading
                    ? "cursor-not-allowed border-blue-200 bg-blue-600"
                    : "border-blue-200 bg-blue-300 text-black hover:bg-blue-800 hover:text-white"
                    } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
            >
                {loading ? (
                    <LoadingDots color="#FFFFFF" />
                ) : (
                    <p>Fetch Dog Sitters</p>
                )}
            </button>
        </form>
    );
};

export default FindSitterForm;
