import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth/next";

export async function GET(req: Request) {
    const sessionUser = await getServerSession();
    const email = sessionUser?.user?.email;

    if (email) {
        const currentUserId = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (currentUserId) {
            const search4UserDog = await prisma.dog.findMany({
                where: {
                    userId: currentUserId.id,
                },
            });

            return NextResponse.json({ data: search4UserDog, status: 200 });
        } else {
            return NextResponse.json({ error: 'Dog not found', status: 404 });
        }
    } else {
        return NextResponse.json({ error: 'Dog not found', status: 400 });
    }
}