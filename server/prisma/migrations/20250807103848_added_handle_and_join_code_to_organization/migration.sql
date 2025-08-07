/*
  Warnings:

  - A unique constraint covering the columns `[handle]` on the table `Organizations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[joinCode]` on the table `Organizations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `handle` to the `Organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joinCode` to the `Organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organizations" ADD COLUMN     "handle" TEXT NOT NULL,
ADD COLUMN     "joinCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Organizations_handle_key" ON "Organizations"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Organizations_joinCode_key" ON "Organizations"("joinCode");
