/*
  Warnings:

  - You are about to drop the `AuthorHeartedComments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuthorHeartedComments" DROP CONSTRAINT "AuthorHeartedComments_authorId_fkey";

-- DropForeignKey
ALTER TABLE "AuthorHeartedComments" DROP CONSTRAINT "AuthorHeartedComments_commentId_fkey";

-- DropTable
DROP TABLE "AuthorHeartedComments";

-- CreateTable
CREATE TABLE "authorHeartedComments" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "authorHeartedComments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authorHeartedComments_commentId_key" ON "authorHeartedComments"("commentId");

-- AddForeignKey
ALTER TABLE "authorHeartedComments" ADD CONSTRAINT "authorHeartedComments_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorHeartedComments" ADD CONSTRAINT "authorHeartedComments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
