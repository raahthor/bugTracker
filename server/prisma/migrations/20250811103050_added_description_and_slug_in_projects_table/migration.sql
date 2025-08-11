/*
  Warnings:

  - A unique constraint covering the columns `[slug,orgId]` on the table `Projects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Projects_slug_orgId_key" ON "Projects"("slug", "orgId");
