-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT,
    "cpVerified" INTEGER,
    "dlVerified" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "request" BOOLEAN NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "senderId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversations" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "request" BOOLEAN NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "rideId" INTEGER NOT NULL,
    "requesterId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "accepted" BOOLEAN NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ride" (
    "id" SERIAL NOT NULL,
    "startLoc" TEXT NOT NULL,
    "endLoc" TEXT NOT NULL,
    "stops" TEXT,
    "request" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "numStops" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    "seats" TEXT NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);

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
    "driverName" TEXT NOT NULL,

    CONSTRAINT "Posting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiderRequest" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "riderId" INTEGER NOT NULL,

    CONSTRAINT "RiderRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accepted" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "riderId" INTEGER NOT NULL,

    CONSTRAINT "Accepted_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Declined" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "riderId" INTEGER NOT NULL,

    CONSTRAINT "Declined_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ConversationParticipants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Request_rideId_key" ON "Request"("rideId");

-- CreateIndex
CREATE UNIQUE INDEX "_ConversationParticipants_AB_unique" ON "_ConversationParticipants"("A", "B");

-- CreateIndex
CREATE INDEX "_ConversationParticipants_B_index" ON "_ConversationParticipants"("B");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationParticipants" ADD CONSTRAINT "_ConversationParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationParticipants" ADD CONSTRAINT "_ConversationParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
