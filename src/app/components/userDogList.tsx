import { useEffect } from "react";
import { RootState } from "../reducers";
import { DogState, fetchDog } from "../reducers/dogReducer";
import { useDispatch, useSelector } from 'react-redux';
import { addDogToList } from "../reducers/dogListReducer";

export default function UserDogList() {
    const dispatch = useDispatch();
    const dogList = useSelector((state: RootState) => state.dogList.dogList);

    useEffect(() => {
        fetchDog()
            .then((res: { data: DogState[] }) => {
                const userDogs = res.data;
                dispatch(addDogToList(userDogs))
            })
            .catch((error: MessageEvent) => {
                // Handle error if needed
                console.error("Error:", error);
            });
    }, []);
    
    return (
        <ul>
            {dogList && Array.isArray(dogList[0]) ? (
                dogList[0].map((dog, index) => (
                    <li key={index}>{((dog as DogState).name)}</li>
                ))
            ) : (
                <li>No dogs available</li>
            )}
        </ul>
    );
};