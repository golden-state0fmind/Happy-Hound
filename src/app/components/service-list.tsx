"use client"
import { useState } from 'react';

type ServicesState = {
    dropInVisits: boolean;
    dogWalking: boolean;
    houseSitting: boolean;
}

const ServicesList = () => {
    const [selectedServices, setSelectedServices] = useState<ServicesState>({
        dropInVisits: false,
        dogWalking: false,
        houseSitting: false,
    });

    const handleServiceToggle = (service: keyof ServicesState) => {
        setSelectedServices({
            ...selectedServices,
            [service]: !selectedServices[service],
        });
    };

    return (
        <div className="text-base md:text-3xl lg:text-4xl font-semibold">
            <p className="text-gray-600">Our Services:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ServiceCard
                    title="Drop-in Visits"
                    checked={selectedServices.dropInVisits}
                    onChange={() => handleServiceToggle('dropInVisits')}
                />
                <ServiceCard
                    title="Dog Walking"
                    checked={selectedServices.dogWalking}
                    onChange={() => handleServiceToggle('dogWalking')}
                />
                <ServiceCard
                    title="House Sitting"
                    checked={selectedServices.houseSitting}
                    onChange={() => handleServiceToggle('houseSitting')}
                />
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
            className={`border p-4 rounded-lg cursor-pointer flex items-center ${checked ? 'border-green-500' : 'border-gray-300'
                }`}
            onClick={onChange}
        >
            <div className="w-6 h-6 mr-2 border-2 border-green-500 rounded-full flex items-center justify-center">
                {checked && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="green"
                        className="checkmark"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                )}
            </div>
            <h2 className={`text-base md:text-lg lg:text-xl font-semibold ${checked ? 'text-green-500' : ''}`}>{title}</h2>
        </div>
    );
};

export default ServicesList;
