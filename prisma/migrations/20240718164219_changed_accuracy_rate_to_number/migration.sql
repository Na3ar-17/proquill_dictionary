/*
  Warnings:

  - You are about to alter the column `accuracy_rate` on the `learning_progres` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "learning_progres" ALTER COLUMN "accuracy_rate" SET DEFAULT 0,
ALTER COLUMN "accuracy_rate" SET DATA TYPE INTEGER;
