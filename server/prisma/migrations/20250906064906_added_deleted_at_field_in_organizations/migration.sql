-- AlterTable
ALTER TABLE "Bugs" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Organizations" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "deletedAt" TIMESTAMP(3);
