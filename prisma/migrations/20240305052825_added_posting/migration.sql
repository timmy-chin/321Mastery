/*
  Warnings:

  - You are about to drop the column `arriveTime` on the `Ride` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Ride` table. All the data in the column will be lost.
  - Added the required column `date` to the `Ride` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Ride` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seats` to the `Ride` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Ride` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ride" DROP COLUMN "arriveTime",
DROP COLUMN "startTime",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "seats" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL,
ALTER COLUMN "stops" DROP NOT NULL,
ALTER COLUMN "request" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Posting" (
    "id" SERIAL NOT NULL,
    "startLoc" TEXT NOT NULL,
    "endLoc" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "driverId" INTEGER NOT NULL,
    "seats" TEXT NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "Posting_pkey" PRIMARY KEY ("id")
);
