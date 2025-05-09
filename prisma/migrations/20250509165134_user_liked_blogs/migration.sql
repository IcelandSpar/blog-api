-- CreateTable
CREATE TABLE "UsersLikedBlogs" (
    "id" TEXT NOT NULL,
    "like" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,

    CONSTRAINT "UsersLikedBlogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsersLikedBlogs" ADD CONSTRAINT "UsersLikedBlogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersLikedBlogs" ADD CONSTRAINT "UsersLikedBlogs_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
