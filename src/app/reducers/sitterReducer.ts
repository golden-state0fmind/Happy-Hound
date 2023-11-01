import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DataProps = {
    selectedId: number,
    name: string,
    description: string,
    location: string,
    rating: number,
    services: string[],
    profileImage: string,
}

const initialState: DataProps = {
    selectedId: 0,
    name: '',
    description: '',
    location: '',
    rating: 0,
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