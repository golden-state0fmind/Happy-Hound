import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const prisma = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV === "development") global.prisma = prisma;

// export default prisma;

const prisma = new PrismaClient();

async function getUsersHandler(req: NextApiRequest, res: NextApiResponse) {
    const users = await prisma.user.findMany();
    res.json(users);
}

export { prisma, getUsersHandler }