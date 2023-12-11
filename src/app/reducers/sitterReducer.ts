import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DataProps = {
    id: number
    selectedId: number,
    name: string,
    description: string,
    city: string,
    state: string,
    zipCode: number | string,
    rating: number,
    chargeRate: number | string,
    services: string[],
    profileImage: string,
}

const initialState: DataProps = {
    id: 0,
    selectedId: 0,
    name: '',
    description: '',
    city: '',
    state: '',
    zipCode: '',
    rating: 0,
    chargeRate: 0,
    services: [],
    profileImage: '',
};

// Async thunk for fetching data
export const fetchDistanceSitterToOwner = async (zipCode: string | number, openCageKey: string) => {
    const openCageURL = `https://api.opencagedata.com/geocode/v1/json?q=${zipCode}&key=${openCageKey}&language=en&pretty=1`;
    try {
        const response = await fetch(openCageURL);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error so that it can be handled elsewhere
    }
};

const dogsitterSlice = createSlice({
    name: 'dogsitter',
    initialState,
    reducers: {
        selectDogSitter: (state, action) => {
            const id = action.payload;
            state.selectedId = id;
        },
    },
});

export const { selectDogSitter } = dogsitterSlice.actions;
export default dogsitterSlice.reducer;