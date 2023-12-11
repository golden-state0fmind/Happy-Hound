import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../lib/prisma"; // Will need to query lib

const data = [
    {
        index: 0,
        id: 1,
        selectedId: 1,
        name: 'Mike M.',
        city: 'Glendale',
        state: 'AZ',
        rating: 4.9,
        zipCode: 85306,
        services: ['Drop-In Visits', 'House Sitting'],
        randomNum: 0,
        chargeRate: 35,
        description: 'Experienced in dog walking and pet sitting.',
        profileImage: 'sitter1.jpg',
        checked: false,
        handleSelectDogSitter: function () { },
    },
    {
        index: 0,
        id: 2,
        selectedId: 2,
        name: 'Jerry R.',
        city: 'Glendale',
        state: 'AZ',
        rating: 4.7,
        services: ['Dog Walking', 'House Sitting'],
        zipCode: 85306,
        randomNum: 0,
        chargeRate: 27,
        description: 'Loves spending time with dogs and providing quality care.',
        profileImage: 'sitter2.jpg',
        checked: false,
        handleSelectDogSitter: function () { },
    },
    {
        index: 0,
        id: 3,
        selectedId: 3,
        name: 'Sara S.',
        city: 'Glendale',
        state: 'AZ',
        rating: 4.8,
        zipCode: 85306,
        services: ['Dog Walking', 'House Sitting'],
        randomNum: 0,
        chargeRate: 30,
        description: 'Loves dogs.',
        profileImage: 'sitter3.jpg',
        checked: false,
        handleSelectDogSitter: function () { },
    },
];

export async function GET(req: Request) {

    const delayedResponse = new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 1000);
    });

    const result = await delayedResponse;

    return NextResponse.json({ data: result, status: 200 });
}