-- CreateTable
CREATE TABLE "DriveStatus" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "riderIds" TEXT NOT NULL,

    CONSTRAINT "DriveStatus_pkey" PRIMARY KEY ("id")
);
