import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";

export async function Patch(req: Request) {
    const { pathname } = new URL(req.url)
    const lastSlashIndex = pathname.lastIndexOf("/"); // Finds the index of the last occurence of "/"
    const sessionUser = await getServerSession();
    const email = sessionUser?.user?.email;
    const petId = pathname.slice(lastSlashIndex + 1); // slices off "/" to get pet id in pathname

    if (email && lastSlashIndex !== -1) {
        const updatePet = await prisma.dog.update({
            where: {
                id: Number(petId), // Convert petId to a number
            },
            data: {
                name: 'changed dog name',
            },
        })
        return NextResponse.json({ data: updatePet, status: 200 });
    } else {
        return NextResponse.json({ error: 'Dog not found', status: 400 });
    }
}