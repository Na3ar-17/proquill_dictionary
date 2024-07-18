/*
  Warnings:

  - The primary key for the `learning_progres` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `learning_progres` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "learning_progres" DROP CONSTRAINT "learning_progres_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "learning_progres_pkey" PRIMARY KEY ("theme_id");
