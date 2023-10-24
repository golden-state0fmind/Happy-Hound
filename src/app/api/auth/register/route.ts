import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { username, email, password, role } = await req.json();
    const exists = await prisma.user.findUnique({
        where: {
            email, //emails are more unique than usernames and roles
        },
    });
    if (exists) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
    } else {
        // need to pass the form params here to send
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: await hash(password, 10),
                role
            },
        });
        return NextResponse.json(user);
    }
}

/**
 * For the User model:
findMany: Retrieve multiple users based on specified filters.
findUnique: Retrieve a single user by a unique identifier (e.g., ID or email).
create: Create a new user.
update: Update an existing user.
delete: Delete a user.

* For the DogOwner and DogSitter models:
findMany: Retrieve multiple owners or sitters based on filters.
findUnique: Retrieve a single owner or sitter by a unique identifier.
create: Create a new owner or sitter.
update: Update an existing owner or sitter.
delete: Delete an owner or sitter.

* For the Dog model:
findMany: Retrieve multiple dogs based on filters.
findUnique: Retrieve a single dog by a unique identifier.
create: Create a new dog.
update: Update an existing dog.
delete: Delete a dog.

* For the Post model:
findMany: Retrieve multiple posts based on filters.
findUnique: Retrieve a single post by a unique identifier.
create: Create a new post.
update: Update an existing post.
delete: Delete a post.

* For the DogUpdate model:
findMany: Retrieve multiple dog updates based on filters.
findUnique: Retrieve a single dog update by a unique identifier.
create: Create a new dog update.
update: Update an existing dog update.
delete: Delete a dog update.

* For the DogNote model:
findMany: Retrieve multiple dog notes based on filters.
findUnique: Retrieve a single dog note by a unique identifier.
create: Create a new dog note.
update: Update an existing dog note.
delete: Delete a dog note.
 */