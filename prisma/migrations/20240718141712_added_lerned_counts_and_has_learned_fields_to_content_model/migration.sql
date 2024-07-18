-- AlterTable
ALTER TABLE "content" ADD COLUMN     "has_learned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "learned_counts" INTEGER NOT NULL DEFAULT 0;
