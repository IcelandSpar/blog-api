/*
  Warnings:

  - You are about to drop the column `dislikes` on the `Blogs` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Blogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blogs" DROP COLUMN "dislikes",
DROP COLUMN "likes";
