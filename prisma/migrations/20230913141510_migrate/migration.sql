/*
  Warnings:

  - You are about to alter the column `estatus` on the `appointment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.
  - You are about to alter the column `estatus` on the `course_teacher` table. The data in that column could be lost. The data in that column will be cast from `Char(1)` to `TinyInt`.
  - You are about to alter the column `estatus` on the `documentation` table. The data in that column could be lost. The data in that column will be cast from `Char(1)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `appointment` MODIFY `estatus` BOOLEAN NULL DEFAULT true;

-- AlterTable
ALTER TABLE `course_teacher` MODIFY `estatus` BOOLEAN NULL DEFAULT true;

-- AlterTable
ALTER TABLE `documentation` MODIFY `estatus` BOOLEAN NULL DEFAULT true;
