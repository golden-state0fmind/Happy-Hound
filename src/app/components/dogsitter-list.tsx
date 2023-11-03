"use client"
import { useEffect, useState } from 'react';
import { RootState } from '../reducers';
import { useDispatch, useSelector } from 'react-redux';
import { DataProps } from '../reducers/sitterReducer';
import { selectDogSitter } from '../reducers/sitterReducer';

export const DogSitterList = () => {
    const dispatch = useDispatch();
    const [randomNum, setRandomNum] = useState(2)
    const dogsitterState = useSelector((state: RootState) => state.dogsitter);
    const { selectedId } = dogsitterState;

    const data = [
        {
            id: 1,
            name: 'Mike M.',
            description: 'Experienced in dog walking and pet sitting.',
            city: 'Glendale',
            state: 'AZ',
            zipCode: 85306,
            rating: 4.9,
            chargeRate: 35,
            services: ['Dog Walking', 'Pet Sitting'],
            profileImage: 'sitter1.jpg',
        },
        {
            id: 2,
            name: 'Jerry R.',
            description: 'Loves spending time with dogs and providing quality care.',
            city: 'Glendale',
            state: 'AZ',
            zipCode: 85306,
            rating: 4.7,
            chargeRate: 27,
            services: ['Dog Walking', 'House Sitting'],
            profileImage: 'sitter2.jpg',
        },
        {
            id: 3,
            name: 'Sara S.',
            description: 'Loves dogs.',
            city: 'Glendale',
            state: 'AZ',
            zipCode: 85306,
            rating: 4.8,
            chargeRate: 30,
            services: ['Dog Walking', 'House Sitting'],
            profileImage: 'sitter2.jpg',
        },
    ];

    // Sorting the data array based on 'rating' in descending order
    data.sort((a, b) => b.rating - a.rating);
    
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
                {data.map((sitter, index) => (
                    <div key={index} className='bg-gray-100 p-6 rounded-lg shadow-md'>
                        <DogSitterCard
                            selectedId={0}
                            index={index}
                            name={sitter.name}
                            description={sitter.description}
                            city={sitter.city}
                            state={sitter.state}
                            zipCode={sitter.zipCode}
                            rating={sitter.rating}
                            chargeRate={sitter.chargeRate}
                            services={sitter.services}
                            profileImage={sitter.profileImage}
                            checked={selectedId === sitter.id}
                            randomNum={randomNum + index}
                            handleSelectDogSitter={() => handleSelectDogSitter(sitter.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export type SitterCardProps = DataProps & {
    name: string;
    checked: boolean;
    randomNum: number;
    index: number;
    handleSelectDogSitter: () => void
}
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
