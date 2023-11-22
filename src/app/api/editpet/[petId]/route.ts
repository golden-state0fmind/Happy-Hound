import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";

export async function PUT(req: Request) {
    const { pathname } = new URL(req.url)
    const lastSlashIndex = pathname.lastIndexOf("/"); // Finds the index of the last occurence of "/"
    const sessionUser = await getServerSession();
    const email = sessionUser?.user?.email;
    const petId = pathname.slice(lastSlashIndex + 1); // slices off "/" to get pet id in pathname
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

    if (email && lastSlashIndex !== -1) {
        const updatePet = await prisma.dog.update({
            where: {
                id: Number(petId), // Convert petId to a number
            },
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
                vetAddress,
            },
        })
        return NextResponse.json({ data: updatePet, status: 200 });
    } else {
        return NextResponse.json({ error: 'Dog not found', status: 400 });
    }
}