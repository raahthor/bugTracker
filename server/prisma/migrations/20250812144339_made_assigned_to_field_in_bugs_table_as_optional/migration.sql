-- DropForeignKey
ALTER TABLE "Bugs" DROP CONSTRAINT "Bugs_assignedTo_fkey";

-- AlterTable
ALTER TABLE "Bugs" ALTER COLUMN "assignedTo" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Bugs" ADD CONSTRAINT "Bugs_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
