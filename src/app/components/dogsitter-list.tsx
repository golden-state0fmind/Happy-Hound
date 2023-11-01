"use client"
import { RootState } from '../reducers';
import { useDispatch, useSelector } from 'react-redux';
import { DataProps } from '../reducers/sitterReducer';
import { selectDogSitter } from '../reducers/sitterReducer';

export const DogSitterList = () => {
    const dispatch = useDispatch();
    const dogsitterState = useSelector((state: RootState) => state.dogsitter);
    const serviceState = useSelector((state: RootState) => state.service);
    const { dropInVisits, dogWalking, houseSitting } = serviceState;
    const { selectedId } = dogsitterState;

    const data = [
        {
            id: 1,
            name: 'Sitter 1',
            description: 'Experienced in dog walking and pet sitting.',
            location: 'City A',
            rating: 4.7,
            services: ['Dog Walking', 'Pet Sitting'],
            profileImage: 'sitter1.jpg',
        },
        {
            id: 2,
            name: 'Sitter 2',
            description: 'Loves spending time with dogs and providing quality care.',
            location: 'City B',
            rating: 4.9,
            services: ['Dog Walking', 'House Sitting'],
            profileImage: 'sitter2.jpg',
        },
    ];
    
    const handleSelectDogSitter = (id: number) => {
        dispatch(selectDogSitter(id))
    };

    return (
        <div className="text-base md:text-3xl lg:text-4xl font-semibold">
            <p className="text-blue-800">
                Your Selected Services:
            </p>
                <ul className="list-none text-green-800">
                    <li>
                        {dropInVisits ? 'Drop-in Visits' : ''}
                    </li>
                    <li>
                        {dogWalking ? 'Dog Walking' : ''}
                    </li>
                    <li>
                        {houseSitting ? 'House Sitting' : ''}
                    </li>
                </ul>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {data.map((sitter, index) => (
                    <DogSitterCard
                        key={index}
                        selectedId={0}
                        name={sitter.name}
                        description={sitter.description}
                        location={sitter.location}
                        rating={sitter.rating}
                        services={sitter.services}
                        profileImage={sitter.profileImage}
                        checked={selectedId === sitter.id}
                        handleSelectDogSitter={() => handleSelectDogSitter(sitter.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export type SitterCardProps = DataProps & {
    name: string;
    checked: boolean;
    handleSelectDogSitter: () => void
}

const DogSitterCard = ({ name, checked, handleSelectDogSitter }: SitterCardProps) => {
    return (
        <div
            className={`border p-4 rounded-lg cursor-pointer flex items-center ${checked ? 'border-green-600' : 'border-gray-400'}`}
            onClick={handleSelectDogSitter}
        >
            <div className={`w-6 h-6 mr-2 border-2 ${checked ? 'border-green-700' : 'border-blue-800'} rounded-full flex items-center justify-center`}>
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
            <h2 className={`text-base md:text-lg lg:text-xl font-semibold ${checked ? 'text-green-800' : 'text-blue-800'}`}>{name}</h2>
        </div>
    );
};
