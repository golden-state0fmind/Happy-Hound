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

interface DogSiiterListState {
    dogSitterList: DataProps[];
}

const initialState: DogSiiterListState = {
    dogSitterList: [],
};

const dogSitterSlice = createSlice({
    name: "setDogSitterList",
    initialState,
    reducers: {
        setDogSitterList: (state, action: PayloadAction<DataProps>) => {
            const dogSitterFromAPI = action.payload
            state.dogSitterList.push(dogSitterFromAPI);
        },
    },
});

export const { setDogSitterList } = dogSitterSlice.actions;
export default dogSitterSlice.reducer;