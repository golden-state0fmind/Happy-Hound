import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ServicesState = {
    dropInVisits: boolean;
    dogWalking: boolean;
    houseSitting: boolean;
}

const initialState: ServicesState = {
    dropInVisits: false,
    dogWalking: false,
    houseSitting: false,
};

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        toggleService: (state, action: PayloadAction<keyof ServicesState>) => {
            const service = action.payload;
            return {
                ...state,
                [service]: !state[service],
            };
        },
    },
});

export const { toggleService } = serviceSlice.actions;
export default serviceSlice.reducer;