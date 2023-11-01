"use client"
import ReduxProvider from '../components/WithReduxProvider';
import { DogSitterList } from '../components/dogsitter-list';

export default function DogSitters() {
    return (
        <ReduxProvider>
            <div className="flex h-screen bg-gray-50">
                <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
                    <div className='bg-gray-100 p-6 rounded-lg shadow-md'>
                        <DogSitterList />
                    </div>
                </div>
            </div>
        </ReduxProvider>
    );
}