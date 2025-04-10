/*
  Warnings:

  - Added the required column `position` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "position" VARCHAR(100) NOT NULL DEFAULT 'software-engineer',
ADD COLUMN     "status" VARCHAR(50) NOT NULL DEFAULT 'new',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Update existing records to set updatedAt to the same value as createdAt
UPDATE "Candidate" SET "updatedAt" = "createdAt" WHERE "updatedAt" IS NULL;
