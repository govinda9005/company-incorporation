/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Shareholder` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Shareholder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "Shareholder" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
