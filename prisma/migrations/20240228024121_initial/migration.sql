/*
  Warnings:

  - Added the required column `cpVerified` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dlVerified` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cpVerified" INTEGER NOT NULL,
ADD COLUMN     "dlVerified" INTEGER NOT NULL;
