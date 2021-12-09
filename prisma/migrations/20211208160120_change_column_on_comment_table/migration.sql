/*
  Warnings:

  - You are about to drop the column `deleted` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `deletedBy` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeletedBy" AS ENUM ('commenter', 'author');

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "deleted",
ADD COLUMN     "deletedBy" "DeletedBy" NOT NULL;
