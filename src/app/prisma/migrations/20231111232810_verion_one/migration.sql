-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('DOG_OWNER', 'DOG_SITTER');

-- CreateEnum
CREATE TYPE "DogSex" AS ENUM ('female', 'male');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dog" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "photo" TEXT,
    "weight" TEXT NOT NULL,
    "birthMonth" TEXT NOT NULL,
    "birthYear" TEXT NOT NULL,
    "sex" "DogSex" NOT NULL,
    "breed" TEXT NOT NULL,
    "microchipped" BOOLEAN NOT NULL,
    "spayed" BOOLEAN NOT NULL,
    "houseTrained" BOOLEAN NOT NULL,
    "childFriendly" BOOLEAN NOT NULL,
    "dogFriendly" BOOLEAN NOT NULL,
    "catFriendly" BOOLEAN NOT NULL,
    "adoptionDate" TEXT NOT NULL,
    "aboutPet" TEXT NOT NULL,
    "pottyBreakSchedule" TEXT NOT NULL,
    "energyLevel" INTEGER NOT NULL,
    "feedingSchedule" TEXT NOT NULL,
    "aloneTime" TEXT NOT NULL,
    "medication" TEXT NOT NULL,
    "additionalInfo" TEXT,
    "healthInfo" TEXT,
    "vetName" TEXT,
    "vetPhone" INTEGER,
    "vetAddress" TEXT,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DogHistory" (
    "id" SERIAL NOT NULL,
    "sitterId" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "dogId" INTEGER,

    CONSTRAINT "DogHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postcode" INTEGER,
    "country" TEXT,
    "photo" TEXT,
    "age" TEXT,
    "phone" INTEGER,
    "eContactName" TEXT,
    "eContactPhone" INTEGER,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "noc" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "expMonth" INTEGER NOT NULL,
    "expYear" INTEGER NOT NULL,
    "cvc" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "apt" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postcode" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Dog_userId_key" ON "Dog"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Dog" ADD CONSTRAINT "Dog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DogHistory" ADD CONSTRAINT "DogHistory_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "Dog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
