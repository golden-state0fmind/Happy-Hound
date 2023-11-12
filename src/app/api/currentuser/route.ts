import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';
import { prisma } from '../../lib/prisma';

export async function GET(req: any, res: any) {
    const sessionUser = await getServerSession();
    const email = sessionUser?.user?.email;

    if (email) {
        const searchUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (searchUser) {
            const currentUser = {
                id: searchUser.id,
                firstName: searchUser.firstName,
                lastName: searchUser.lastName,
                email: searchUser.email,
                role: searchUser.role,
            };

            return NextResponse.json({ data: currentUser, status: 200 });
        } else {
            return NextResponse.json({ error: 'User not found', status: 404 });
        }
    } else {
        return NextResponse.json({ error: 'Email not found', status: 400 });
    }
}