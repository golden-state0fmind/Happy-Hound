import { useEffect, useState } from "react";
import { RootState } from "../reducers";
import { DogState, fetchDog } from "../reducers/dogReducer";
import { useDispatch, useSelector } from 'react-redux';
import { addDogToList, removeDogById } from "../reducers/dogListReducer";
import Link from "next/link";
import toast from "react-hot-toast";
import LoadingDots from "./loading-dots";

export default function UserDogList() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const dogList = useSelector((state: RootState) => state.dogList.dogList);
    // USED FOR GETTING PET DATA TO DISPLAY
    useEffect(() => {
        fetchDog()
            .then((res: { data: DogState[] }) => {
                const userDogs = res.data;
                userDogs.forEach((dog) => {
                    dispatch(addDogToList(dog));
                })
            })
            .catch((error: MessageEvent) => {
                // Handle error if needed
                console.error("Error:", error);
                setLoading(true);
            });
    }, []);
    // LOADING STATE WHILE DOGLIST IS 0
    useEffect(() => {
        if (dogList.length > 0) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [dogList])
    // HANDLES DELETE A PET BY ID NUMBER
    const handleDeletePet = (id: number, name: string | null) => {
        fetch(`/api/deletepet/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(removeDogById(id));
                    toast.success(`${name} is removed!`);
                }
            })
            .catch((error: MessageEvent) => {
                // Handle error if needed
                console.error("Error:", error);
            });
    }

    return (
        <ul>
            {loading
                ?
                (
                    <li>
                        <LoadingDots color="blue" />
                    </li>
                )
                :
                (
                    dogList.map((dog: { id: number; name: string | null; userId?: number | null; aboutPet?: string | null; additionalInfo?: string | null; adoptionDate?: string | null; aloneTime?: string | null; birthMonth?: string | null; birthYear?: string | null; breed?: string | null; catFriendly?: boolean | null; childFriendly?: boolean | null; dogFriendly?: boolean | null; energyLevel?: boolean | null; feedingSchedule?: string | null; healthInfo?: string | null; houseTrained?: boolean | null; medication?: string | null; microchipped?: boolean | null; photo?: string | null; pottyBreakSchedule?: string | null; sex?: string | null; spayed?: boolean | null; vetAddress?: string | null; vetName?: string | null; vetPhone?: number | null; weight?: string | null; }, index: number) => (
                        <li key={index}>
                            <div className='flex justify-between underline text-base md:text-lg lg:text-xl transition-all'>
                                <Link className='hover:text-blue-600' href={""}>
                                    {(dog.name)}
                                </Link>
                                <div className='underline text-base md:text-lg lg:text-xl transition-all'>
                                    <Link className='hover:text-green-700 pe-5' href={`/editpetdetails/${dog.id}`}>
                                        Edit
                                    </Link>
                                    <span onClick={() => handleDeletePet(dog.id, dog.name)} className='underline text-base md:text-lg lg:text-xl transition-all hover:text-red-700 cursor-pointer' >
                                        Delete
                                    </span>
                                </div>
                            </div>
                        </li>
                    )))
            }
        </ul>
    );
};