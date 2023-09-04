/*
  Warnings:

  - You are about to alter the column `estatus` on the `student` table. The data in that column could be lost. The data in that column will be cast from `Char(1)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `student` MODIFY `estatus` BOOLEAN NULL DEFAULT true;
