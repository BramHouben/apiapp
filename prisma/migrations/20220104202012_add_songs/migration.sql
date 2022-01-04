-- CreateTable
CREATE TABLE "UserSongs" (
    "id" TEXT NOT NULL,
    "songId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemBought" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSongs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSongs_songId_key" ON "UserSongs"("songId");

-- AddForeignKey
ALTER TABLE "UserSongs" ADD CONSTRAINT "UserSongs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
