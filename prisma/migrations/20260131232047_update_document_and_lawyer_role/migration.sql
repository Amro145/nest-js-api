-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'LAWYER';

-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "assignedLawyerId" INTEGER;

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "firmId" TEXT;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_assignedLawyerId_fkey" FOREIGN KEY ("assignedLawyerId") REFERENCES "Auth"("id") ON DELETE SET NULL ON UPDATE CASCADE;
