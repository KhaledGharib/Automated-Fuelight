/*
  Warnings:

  - You are about to drop the `price` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "price";

-- CreateTable
CREATE TABLE "display" (
    "id" TEXT NOT NULL,
    "ipAddress" VARCHAR(45) NOT NULL DEFAULT '',
    "data" JSONB,
    "ownerId" TEXT NOT NULL DEFAULT '',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "display_pkey" PRIMARY KEY ("id")
);
