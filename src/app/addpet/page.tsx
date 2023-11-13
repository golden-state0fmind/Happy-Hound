"use client"
import ReduxProvider from "../components/WithReduxProvider"
import PetForm from "../components/addpetform"

export default function AddPet() {
    return (
        <ReduxProvider>
            <PetForm />
        </ReduxProvider>
    )
}