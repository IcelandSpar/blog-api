-- DropForeignKey
ALTER TABLE "UsersLikedBlogs" DROP CONSTRAINT "UsersLikedBlogs_blogId_fkey";

-- DropForeignKey
ALTER TABLE "UsersLikedBlogs" DROP CONSTRAINT "UsersLikedBlogs_userId_fkey";

-- AddForeignKey
ALTER TABLE "UsersLikedBlogs" ADD CONSTRAINT "UsersLikedBlogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersLikedBlogs" ADD CONSTRAINT "UsersLikedBlogs_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
