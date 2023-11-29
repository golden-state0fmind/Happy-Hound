import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";

export async function GET(req: Request) {
    const { pathname } = new URL(req.url)
    const lastSlashIndex = pathname.lastIndexOf("/");
    const sessionUser = await getServerSession();
    const email = sessionUser?.user?.email;

    if (email && lastSlashIndex !== -1) {

        const currentUserId = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        const profileId = pathname.slice(lastSlashIndex + 1);

        if (currentUserId) {

            const getUserProfile = await prisma.profile.findUnique({
                where: {
                    userId: Number(profileId),
                },
            });

            return NextResponse.json({ data: getUserProfile, status: 200 });
        } else {
            return NextResponse.json({ error: 'Profile not found', status: 404 });
        }
    } else {
        return NextResponse.json({ error: 'Profile not found', status: 400 });
    }
}