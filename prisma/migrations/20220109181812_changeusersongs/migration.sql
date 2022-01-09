/*
  Warnings:

  - You are about to drop the column `songId` on the `UserSongs` table. All the data in the column will be lost.
  - Added the required column `albumId` to the `UserSongs` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserSongs_songId_key";

-- AlterTable
ALTER TABLE "UserSongs" DROP COLUMN "songId",
ADD COLUMN     "albumId" TEXT NOT NULL;
