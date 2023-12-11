"use client"
import { useEffect, useState } from 'react';
import { RootState } from '../reducers';
import { useDispatch, useSelector } from 'react-redux';
import { DataProps } from '../reducers/sitterReducer';
import { selectDogSitter } from '../reducers/sitterReducer';

export type SitterCardProps = DataProps & {
    name: string;
    index: number;
    checked: boolean;
    randomNum: number;
    handleSelectDogSitter: () => void
}

export const DogSitterList = () => {
    const dispatch = useDispatch();
    const [randomNum, setRandomNum] = useState(2)
    const serviceState = useSelector((state: RootState) => state.service);
    const dogsitterState = useSelector((state: RootState) => state.dogsitter);
    const { selectedId } = dogsitterState;
    const [sortedSitters, setSortedSitters] = useState<SitterCardProps[]>([]);

    // checked, randomNum, index, and handleSelectDogSitter
    const data = [
        {
            index: 0,
            id: 1,
            selectedId: 1,
            name: 'Mike M.',
            city: 'Glendale',
            state: 'AZ',
            rating: 4.9,
            zipCode: 85306,
            services: ['Drop-In Visits', 'House Sitting'],
            randomNum: 0,
            chargeRate: 35,
            description: 'Experienced in dog walking and pet sitting.',
            profileImage: 'sitter1.jpg',
            checked: false,
            handleSelectDogSitter: function () { },
        },
        {
            index: 0,
            id: 2,
            selectedId: 2,
            name: 'Jerry R.',
            city: 'Glendale',
            state: 'AZ',
            rating: 4.7,
            services: ['Dog Walking', 'House Sitting'],
            zipCode: 85306,
            randomNum: 0,
            chargeRate: 27,
            description: 'Loves spending time with dogs and providing quality care.',
            profileImage: 'sitter2.jpg',
            checked: false,
            handleSelectDogSitter: function () { },
        },
        {
            index: 0,
            id: 3,
            selectedId: 3,
            name: 'Sara S.',
            city: 'Glendale',
            state: 'AZ',
            rating: 4.8,
            zipCode: 85306,
            services: ['Dog Walking', 'House Sitting'],
            randomNum: 0,
            chargeRate: 30,
            description: 'Loves dogs.',
            profileImage: 'sitter3.jpg',
            checked: false,
            handleSelectDogSitter: function () { },
        },
    ];

    useEffect(() => {
        const { dropInVisits, dogWalking, houseSitting } = serviceState;

        const selectedServices: string[] = [];

        if (dogWalking) {
            selectedServices.push('Dog Walking');
        }
        if (dropInVisits) {
            selectedServices.push('Drop-In Visits');
        }
        if (houseSitting) {
            selectedServices.push('House Sitting');
        }

        if (selectedServices.length > 0) {
            const sittersOfferingServices = data.filter(sitter => {
                return selectedServices.some(service => sitter.services.includes(service));
            });

            if (sittersOfferingServices.length > 0) {
                const sortedSitters = sittersOfferingServices.sort((a, b) => b.rating - a.rating);
                setSortedSitters(sortedSitters);
            }
        }
    }, [serviceState]);

    const generateRandomNumberInRange = (min: number, max: number) => {
        const ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
        setRandomNum(ranNum);
    }

    useEffect(() => { generateRandomNumberInRange(1, 100) }, []);

    const handleSelectDogSitter = (id: number) => {
        dispatch(selectDogSitter(id));
    };

    return (
        <div className="text-base md:text-3xl lg:text-4xl font-semibold">
            <div className="grid grid-cols-1 gap-4">
                {sortedSitters.map((sitter, index) => (
                    <div key={index} className='bg-gray-100 p-6 rounded-lg shadow-md'>
                        <DogSitterCard
                            index={index}
                            id={sitter.id}
                            selectedId={0}
                            name={sitter.name}
                            city={sitter.city}
                            state={sitter.state}
                            rating={sitter.rating}
                            zipCode={sitter.zipCode}
                            services={sitter.services}
                            randomNum={randomNum + index}
                            chargeRate={sitter.chargeRate}
                            description={sitter.description}
                            profileImage={sitter.profileImage}
                            checked={selectedId === sitter.id}
                            handleSelectDogSitter={() => handleSelectDogSitter(sitter.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

// TODO: Have user either upload or take profile picture 
const DogSitterCard = ({
    name,
    description,
    city,
    state,
    zipCode,
    rating,
    chargeRate,
    services,
    profileImage,
    checked,
    randomNum,
    index,
    handleSelectDogSitter }: SitterCardProps) => {
    return (
        <div
            className={`border cursor-pointer  bg-gray-100 rounded-lg shadow-md space-y-4 px-4 py-8 sm:px-16 ${checked ? 'border-green-600' : 'border-gray-400'}`}
            onClick={handleSelectDogSitter}
        >
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                    <div className={`w-6 h-6 mr-2 border-2 ${checked ? 'border-green-600' : 'border-blue-800'} rounded-full flex items-center justify-center`}>
                        {checked && (
                            <div className='text-base md:text-lg lg:text-xl text-green-600'> &#x2713; </div>
                        )}
                    </div>
                    <h2 className={`text-base md:text-lg lg:text-xl font-semibold ${checked ? 'text-green-800' : 'text-blue-800'}`}>{index + 1}. {name}</h2>
                    <p className="text-sm text-blue-800">{description}</p>
                    <div className='flex'>
                        <p className="text-xs text-blue-700">{city},</p>
                        <p className="text-xs text-blue-700 ps-1">{state}</p>
                    </div>
                    <p className="text-xs text-blue-700">{zipCode}</p>
                    <div className='flex'>
                        <span className='text-xs text-yellow-500' > &#9733; </span>
                        <p className="text-xs text-blue-700">{rating}</p>
                        <span className='text-xs text-blue-800'> &#183; </span>
                        <span className='text-xs text-blue-700'>{randomNum} Reviews</span>
                    </div>
                    <p className="text-xs text-blue-700">Services: {services.join(', ')}</p>
                    {/* Include profileImage rendering logic */}
                </div>

                <p className='flex flex-col text-base md:text-lg lg:text-xl font-semibold text-blue-800'>from
                    <span className='text-green-800' >
                        ${chargeRate}
                    </span>
                    per
                </p>
            </div>
        </div>
    );
};
