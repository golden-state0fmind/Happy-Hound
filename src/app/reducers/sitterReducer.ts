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