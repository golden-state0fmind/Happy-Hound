import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    role: string | null;
}

const initialState: UserState = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    role: null,
};

// Async thunk for fetching user data
export const fetchUser = async () => {
    try {
        const response = await fetch("/api/currentuser");
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error so that it can be handled elsewhere
    }
};

export const fetchProfile = async (route: string) => {
    try {
        const response = await fetch(route);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const userSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<UserState>) => {
            // Update the state with the data from the action payload
            state.id = action.payload.id
            state.email = action.payload.email
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.role = action.payload.role
        },
    },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
