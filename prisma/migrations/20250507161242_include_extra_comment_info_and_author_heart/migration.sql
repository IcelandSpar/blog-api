-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "authorHeart" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "UserLikedComments" (
    "id" TEXT NOT NULL,
    "like" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "UserLikedComments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authorHeartedComments" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "authorHeartedComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserLikedComments" ADD CONSTRAINT "UserLikedComments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLikedComments" ADD CONSTRAINT "UserLikedComments_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorHeartedComments" ADD CONSTRAINT "authorHeartedComments_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorHeartedComments" ADD CONSTRAINT "authorHeartedComments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
