import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataProps } from '../reducers/sitterReducer';

export const fetchDogSitterList = async () => {
    try {
        const response = await fetch("/api/dogsitter");
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

type DogSitterListState = {
    dogSitterList: DataProps[];
}

const initialState: DogSitterListState = {
    dogSitterList: [],
};

const dogSitterSlice = createSlice({
    name: "setDogSitterList",
    initialState,
    reducers: {
        setDogSitterList: (state, action: PayloadAction<DataProps>) => {
            const addSitter = action.payload;
            // Prevents duplicates in array if the user revisits the home page
            const existingDogSitterIndex = state.dogSitterList.findIndex(sitter => sitter.id === addSitter.id);
            if (existingDogSitterIndex === -1) {
                // Dog Sitter with the same id doesn't exist, add it to the list
                state.dogSitterList.push(addSitter);
            } else {
                return
            }
        },
    },
});

export const { setDogSitterList } = dogSitterSlice.actions;
export default dogSitterSlice.reducer;