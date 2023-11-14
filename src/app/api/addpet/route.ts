import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {
        name,
        userId,
        photo,
        weight,
        birthMonth,
        birthYear,
        sex,
        breed,
        microchipped,
        spayed,
        houseTrained,
        childFriendly,
        dogFriendly,
        catFriendly,
        adoptionDate,
        aboutPet,
        pottyBreakSchedule,
        energyLevel,
        feedingSchedule,
        aloneTime,
        medication,
        additionalInfo,
        healthInfo,
        vetName,
        vetPhone,
        vetAddress
    } = await req.json();
    
    const dogAdded = await prisma.dog.create({
        data: {
            name,
            userId,
            photo,
            weight,
            birthMonth,
            birthYear,
            sex,
            breed,
            microchipped,
            spayed,
            houseTrained,
            childFriendly,
            dogFriendly,
            catFriendly,
            adoptionDate,
            aboutPet,
            pottyBreakSchedule,
            energyLevel,
            feedingSchedule,
            aloneTime,
            medication,
            additionalInfo,
            healthInfo,
            vetName,
            vetPhone,
            vetAddress
        },
    });
    return NextResponse.json(dogAdded);
}