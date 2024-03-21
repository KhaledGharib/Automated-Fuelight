/*
  Warnings:

  - Added the required column `lat` to the `display` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `display` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "display" ADD COLUMN     "lat" VARCHAR(45) NOT NULL,
ADD COLUMN     "lng" VARCHAR(45) NOT NULL;
