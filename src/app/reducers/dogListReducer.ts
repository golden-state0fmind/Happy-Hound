import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { DogState } from './dogReducer';

interface DogListState {
    dogList: DogState[]; 
}

const initialState: DogListState = {
    dogList: [],
};

const dogListSlice: Slice<DogListState> = createSlice({
    name: 'setDogList',
    initialState,
    reducers: {
        addDogToList: (state, action: PayloadAction<DogState>) => {
            const newDog = action.payload;
            // // Check if the dog with the same id already exists in the list
            const existingDogIndex = state.dogList.findIndex(dog => dog.id === newDog.id);
            if (existingDogIndex === -1) {
                // Dog with the same id doesn't exist, add it to the list
                state.dogList.push(newDog);
            } else {
                // Dog with the same id already exists, you can update or handle it as needed
                // For example, you might want to replace the existing one or ignore the new one
                console.log(`Dog with id ${newDog.id} already exists in the list.`);
            }
        },
        removeDogById: (state, action: PayloadAction<number>) => {
            const dogIdToRemove = action.payload;
            // Use filter to create a new array without the dog with the specified ID
            state.dogList = state.dogList.filter(dog => dog.id !== dogIdToRemove);
        },
    },
});

export const { addDogToList, removeDogById } = dogListSlice.actions;
export default dogListSlice.reducer;