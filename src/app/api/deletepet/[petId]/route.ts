import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";

export async function GET(req: Request) {
    const { pathname } = new URL(req.url)
    const lastSlashIndex = pathname.lastIndexOf("/"); // Finds the index of the last occurence of "/"
    const sessionUser = await getServerSession();
    const email = sessionUser?.user?.email;

    if (email && lastSlashIndex !== -1) {
        const currentUserId = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        
        const petId = pathname.slice(lastSlashIndex + 1); // slices off "/" to get pet id in pathname
        if (currentUserId) {
            const deletePet = await prisma.dog.delete({
                where: {
                    id: Number(petId), // Convert petId to a number
                },
            });
            return NextResponse.json({ data: deletePet, status: 200 });
        } else {
            return NextResponse.json({ error: 'Dog not found', status: 404 });
        }
    } else {
        return NextResponse.json({ error: 'Dog not found', status: 400 });
    }
}