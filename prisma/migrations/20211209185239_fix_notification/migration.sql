/*
  Warnings:

  - You are about to drop the `Noticfication` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('followed', 'commented', 'favorited');

-- DropForeignKey
ALTER TABLE "Noticfication" DROP CONSTRAINT "Noticfication_notifierId_fkey";

-- DropForeignKey
ALTER TABLE "Noticfication" DROP CONSTRAINT "Noticfication_recieverId_fkey";

-- DropTable
DROP TABLE "Noticfication";

-- DropEnum
DROP TYPE "NoticficationType";

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "notifierId" UUID NOT NULL,
    "recieverId" UUID NOT NULL,
    "type" "NotificationType" NOT NULL,
    "targetId" TEXT NOT NULL,
    "targetName" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_notifierId_fkey" FOREIGN KEY ("notifierId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
