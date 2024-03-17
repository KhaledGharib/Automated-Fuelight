-- CreateTable
CREATE TABLE "price" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "price_pkey" PRIMARY KEY ("id")
);
