"use client"
import ReduxProvider from '../components/WithReduxProvider';
import { DogSitterList } from '../components/dogsitter-list';
import FindSitterForm from '../components/findsitterform';

export default function DogSitters() {
    return (
        <ReduxProvider>
            <div className="flex h-max bg-gray-50 overflow-y-auto">
                <div className="w-screen h-max flex flex-col space-y-5 items-center mb-6">
                    <FindSitterForm />
                    <DogSitterList />
                </div>
            </div>
        </ReduxProvider>
    );
}