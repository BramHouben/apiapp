/*
  Warnings:

  - You are about to drop the column `artist` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `year_released` on the `Song` table. All the data in the column will be lost.
  - Added the required column `artist` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year_released` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `length` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "artist" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "year_released" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "artist",
DROP COLUMN "image",
DROP COLUMN "year_released",
ADD COLUMN     "length" INTEGER NOT NULL;
