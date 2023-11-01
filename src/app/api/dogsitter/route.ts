import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../lib/prisma"; // Will need to query lib

const data = [
    {
        id: 1,
        name: 'Sitter 1',
        description: 'Experienced in dog walking and pet sitting.',
        location: 'City A',
        rating: 4.7,
        services: ['Dog Walking', 'Pet Sitting'],
        profileImage: 'sitter1.jpg',
    },
    {
        id: 2,
        name: 'Sitter 2',
        description: 'Loves spending time with dogs and providing quality care.',
        location: 'City B',
        rating: 4.9,
        services: ['Dog Walking', 'House Sitting'],
        profileImage: 'sitter2.jpg',
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