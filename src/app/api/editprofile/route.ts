import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';
import { prisma } from '../../lib/prisma';

export async function PUT(req: any, res: any) {
    const sessionUser = await getServerSession();
    const email = sessionUser?.user?.email;
    const {
        id,
        userId,
        address,
        city,
        state,
        postcode,
        country,
        photo,
        age,
        phone,
        eContactName,
        eContactPhone,
    } = await req.json();

    if (email) {
        const findProfile = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (findProfile) {
            const currentUser = {
                address,
                city,
                state,
                postcode,
                country,
                photo,
                age,
                phone,
                eContactName,
                eContactPhone,
            };
            await prisma.profile.update({
                where: { id },
                data: currentUser
            });

            return NextResponse.json({ data: currentUser, status: 200 });
        } else {
            const newProfile = {
                id,
                userId,
                address,
                city,
                state,
                postcode,
                country,
                photo,
                age,
                phone,
                eContactName,
                eContactPhone,
            };
            await prisma.profile.create({ data: newProfile });

            return NextResponse.json({ data: newProfile, status: 200 });
        }
    } else {
        return NextResponse.json({ error: 'Email not found', status: 400 });
    }
}