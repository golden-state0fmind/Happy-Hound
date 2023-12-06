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

            const deleteProfile = await Promise.all([
                prisma.user.delete({
                    where: {
                        id: Number(profileId),
                    },
                }),
                prisma.profile.delete({
                    where: {
                        id: Number(profileId),
                    },
                }),
            ]);

            return NextResponse.json({ data: deleteProfile, status: 200 });
        } else {
            return NextResponse.json({ error: 'Dog not found', status: 404 });
        }
    } else {
        return NextResponse.json({ error: 'Dog not found', status: 400 });
    }
}