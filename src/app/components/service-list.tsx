"use client"
import { ServicesState, toggleService } from '../reducers/serviceReducer'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../reducers';
import { useEffect, useState } from 'react';
import LoadingDots from './loading-dots';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { fetchDogSitterList, setDogSitterList } from '../reducers/dogSitterListReducer';
import { DataProps } from '../reducers/sitterReducer';


const ServicesList = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const serviceState = useSelector((state: RootState) => state.service);
    const { dropInVisits, dogWalking, houseSitting } = serviceState;
    const baseButtonStyles = "flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none";

    const getButtonStyles = () => {
        if (dropInVisits || dogWalking || houseSitting) {
            return "bg-green-600 text-white border-green-200";
        } else {
            return "cursor-not-allowed bg-green-200 text-black border-gray-300";
        }
    };

    const handleServiceToggle = (service: keyof ServicesState) => {
        dispatch(toggleService(service));
    };

    const handleFindDogSitter = (e: React.FormEvent<HTMLButtonElement>) => {
        if (dropInVisits || dogWalking || houseSitting) {
            e.preventDefault();
            setLoading(true);
            // Fetching dog sitters list to store in redux then push to next page
            fetchDogSitterList()
                .then((res) => {
                    if (res.status === 200) {
                        const dogSittersArray = res.data;
                        dogSittersArray.forEach((dogSitter: DataProps) => {
                            dispatch(setDogSitterList(dogSitter));
                        });
                        router.refresh();
                        router.push("/dogsitter");
                    } else {
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    toast.error(error);
                    console.error('Error:', error);
                });
        } else {
            return;
        }
    }

    return (
        <div className="text-base md:text-3xl lg:text-4xl font-semibold">
            <p className="text-blue-800">Our Services:</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <ServiceCard
                    title="Drop-in Visits"
                    checked={dropInVisits}
                    onChange={() => handleServiceToggle('dropInVisits')}
                />
                <ServiceCard
                    title="Dog Walking"
                    checked={dogWalking}
                    onChange={() => handleServiceToggle('dogWalking')}
                />
                <ServiceCard
                    title="House Sitting"
                    checked={houseSitting}
                    onChange={() => handleServiceToggle('houseSitting')}
                />
                <button
                    aria-label="Find Dog Sitters"
                    disabled={loading}
                    className={`${baseButtonStyles} ${getButtonStyles()}`}
                    onClick={handleFindDogSitter}
                >
                    {loading ? (
                        <LoadingDots color="#FFFFFF" />
                    ) : (
                        <>{'Find Dog Sitters'}</>
                    )}
                </button>
            </div>
        </div>
    );
};

type ServiceCardProps = {
    title: string;
    checked: boolean;
    onChange: () => void;
}

const ServiceCard = ({ title, checked, onChange }: ServiceCardProps) => {
    return (
        <div
            className={`border p-4 rounded-lg cursor-pointer flex items-center ${checked ? 'border-green-600' : 'border-gray-400'
                }`}
            onClick={onChange}
        >
            <div className={`w-6 h-6 mr-2 border-2 ${checked ? 'border-green-600' : 'border-blue-800'} rounded-full flex items-center justify-center`}>
                {checked && (
                    <div className='text-base md:text-lg lg:text-xl text-green-600'> &#x2713; </div>
                )}
            </div>
            <h2 className={`text-base md:text-lg lg:text-xl font-semibold ${checked ? 'text-green-800' : ''}`}>{title}</h2>
        </div>
    );
};

export default ServicesList;
