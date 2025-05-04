-- CreateTable
CREATE TABLE "Blogs" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id")
);
