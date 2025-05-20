-- DropForeignKey
ALTER TABLE "UserLikedComments" DROP CONSTRAINT "UserLikedComments_commentId_fkey";

-- DropForeignKey
ALTER TABLE "authorHeartedComments" DROP CONSTRAINT "authorHeartedComments_commentId_fkey";

-- AddForeignKey
ALTER TABLE "UserLikedComments" ADD CONSTRAINT "UserLikedComments_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorHeartedComments" ADD CONSTRAINT "authorHeartedComments_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
