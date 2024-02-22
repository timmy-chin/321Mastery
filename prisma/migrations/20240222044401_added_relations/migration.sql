/*
  Warnings:

  - You are about to drop the column `riderId` on the `Ride` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderId]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rideId]` on the table `Request` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rideId` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "rideId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ride" DROP COLUMN "riderId";

-- CreateIndex
CREATE UNIQUE INDEX "Message_senderId_key" ON "Message"("senderId");

-- CreateIndex
CREATE UNIQUE INDEX "Request_rideId_key" ON "Request"("rideId");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
