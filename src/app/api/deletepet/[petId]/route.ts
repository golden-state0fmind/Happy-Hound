import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";

export async function GET(req: any) {
    const { petId } = req.params; // Access the petId from the route parameters

    const sessionUser = await getServerSession();
    const email = sessionUser?.user?.email;

    if (email) {
        const currentUserId = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (currentUserId) {
            const deletePet = await prisma.dog.delete({
                where: {
                    id: parseInt(petId, 10), // Convert petId to a number
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