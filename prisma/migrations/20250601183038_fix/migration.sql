/*
  Warnings:

  - You are about to drop the `authorHeartedComments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "authorHeartedComments" DROP CONSTRAINT "authorHeartedComments_authorId_fkey";

-- DropForeignKey
ALTER TABLE "authorHeartedComments" DROP CONSTRAINT "authorHeartedComments_commentId_fkey";

-- DropTable
DROP TABLE "authorHeartedComments";

-- CreateTable
CREATE TABLE "AuthorHeartedComments" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "AuthorHeartedComments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthorHeartedComments_commentId_key" ON "AuthorHeartedComments"("commentId");

-- AddForeignKey
ALTER TABLE "AuthorHeartedComments" ADD CONSTRAINT "AuthorHeartedComments_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorHeartedComments" ADD CONSTRAINT "AuthorHeartedComments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
