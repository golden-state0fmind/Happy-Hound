"use client"
import ReduxProvider from "@/app/components/WithReduxProvider";
import { EditPetForm } from "@/app/components/editpetform";

export default function EditPet() {
    return (
        <ReduxProvider>
            <EditPetForm />
        </ReduxProvider>
    );
};