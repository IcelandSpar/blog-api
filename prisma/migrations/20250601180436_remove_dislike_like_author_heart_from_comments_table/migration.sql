/*
  Warnings:

  - You are about to drop the column `authorHeart` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `dislikes` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "authorHeart",
DROP COLUMN "dislikes",
DROP COLUMN "likes";
