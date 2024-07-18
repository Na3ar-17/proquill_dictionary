/*
  Warnings:

  - A unique constraint covering the columns `[theme_id]` on the table `learning_progres` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "learning_progres_theme_id_key" ON "learning_progres"("theme_id");
