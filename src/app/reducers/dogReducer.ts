import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DogState = {
    id: number,
    userId: number | null,
    name: string | null,
    aboutPet: string | null,
    additionalInfo: string | null,
    adoptionDate: string | null,
    aloneTime: string | null,
    birthMonth: string | null,
    birthYear: string | null,
    breed: string | null,
    catFriendly: boolean | null,
    childFriendly: boolean | null,
    dogFriendly: boolean | null,
    energyLevel: boolean | null,
    feedingSchedule: string | null,
    healthInfo: string | null,
    houseTrained: boolean | null,
    medication: string | null,
    microchipped: boolean | null,
    photo: string | null,
    pottyBreakSchedule: string | null,
    sex: string | null,
    spayed: boolean | null,
    vetAddress: string | null,
    vetName: string | null,
    vetPhone: number | null,
    weight: string | null
}

const initialState: DogState = {
    id: 0,
    userId: null,
    name: null,
    aboutPet: null,
    additionalInfo: null,
    adoptionDate: null,
    aloneTime: null,
    birthMonth: null,
    birthYear: null,
    breed: null,
    catFriendly: null,
    childFriendly: null,
    dogFriendly: null,
    energyLevel: null,
    feedingSchedule: null,
    healthInfo: null,
    houseTrained: null,
    medication: null,
    microchipped: null,
    photo: null,
    pottyBreakSchedule: null,
    sex: null,
    spayed: null,
    vetAddress: null,
    vetName: null,
    vetPhone: null,
    weight: null,
};

export const fetchDog = async () => {
    try {
        const response = await fetch("/api/getpet");
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const dogSlice = createSlice({
    name: "setDog",
    initialState,
    reducers: {
        setDog: (state, action: PayloadAction<DogState>) => {
            state.id = action.payload.id
            state.userId = action.payload.userId
            state.name = action.payload.name
            state.aboutPet = action.payload.aboutPet
            state.additionalInfo = action.payload.additionalInfo
            state.adoptionDate = action.payload.adoptionDate
            state.aloneTime = action.payload.aloneTime
            state.birthMonth = action.payload.birthMonth
            state.birthYear = action.payload.birthYear
            state.breed = action.payload.breed
            state.catFriendly = action.payload.catFriendly
            state.childFriendly = action.payload.childFriendly
            state.dogFriendly = action.payload.dogFriendly
            state.energyLevel = action.payload.energyLevel
            state.feedingSchedule = action.payload.feedingSchedule
            state.healthInfo = action.payload.healthInfo
            state.houseTrained = action.payload.houseTrained
            state.medication = action.payload.medication
            state.microchipped = action.payload.microchipped
            state.photo = action.payload.photo
            state.pottyBreakSchedule = action.payload.pottyBreakSchedule
            state.sex = action.payload.sex
            state.spayed = action.payload.spayed
            state.vetAddress = action.payload.vetAddress
            state.vetPhone = action.payload.vetPhone
            state.weight = action.payload.weight
        },
    },
});

export const { setDog } = dogSlice.actions;
export default dogSlice.reducer;