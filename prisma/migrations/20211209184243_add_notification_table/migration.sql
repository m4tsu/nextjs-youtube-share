-- CreateEnum
CREATE TYPE "NoticficationType" AS ENUM ('followed', 'commented', 'favorited');

-- CreateTable
CREATE TABLE "Noticfication" (
    "id" SERIAL NOT NULL,
    "notifierId" UUID NOT NULL,
    "recieverId" UUID NOT NULL,
    "type" "NoticficationType" NOT NULL,
    "targetId" TEXT NOT NULL,
    "targetName" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Noticfication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Noticfication" ADD CONSTRAINT "Noticfication_notifierId_fkey" FOREIGN KEY ("notifierId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noticfication" ADD CONSTRAINT "Noticfication_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
