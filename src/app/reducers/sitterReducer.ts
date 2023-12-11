import { createSlice } from '@reduxjs/toolkit';

export type DataProps = {
    index: number
    id: number
    selectedId: number,
    name: string,
    description: string,
    city: string,
    state: string,
    zipCode: number | string,
    rating: number,
    randomNum: number,
    chargeRate: number | string,
    services: string[],
    profileImage: string,
    checked: boolean
    handleSelectDogSitter: () => void
}

const initialState: DataProps = {
    index: 0,
    id: 1,
    selectedId: 1,
    name: 'Mike M.',
    city: 'Glendale',
    state: 'AZ',
    rating: 4.9,
    zipCode: 85306,
    services: ['Drop-In Visits', 'House Sitting'],
    randomNum: 0,
    chargeRate: 35,
    description: 'Experienced in dog walking and pet sitting.',
    profileImage: 'sitter1.jpg',
    checked: false,
    handleSelectDogSitter: function () { },
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