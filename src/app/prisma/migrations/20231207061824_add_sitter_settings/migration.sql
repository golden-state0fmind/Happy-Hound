-- CreateTable
CREATE TABLE "SitterSettings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "selectedId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "services" TEXT[],
    "randomNum" INTEGER NOT NULL,
    "chargeRate" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL,

    CONSTRAINT "SitterSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SitterSettings_userId_key" ON "SitterSettings"("userId");

-- AddForeignKey
ALTER TABLE "SitterSettings" ADD CONSTRAINT "SitterSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
