/*
  Warnings:

  - The primary key for the `documentation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[semesterYear]` on the table `Documentation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `documentation` DROP PRIMARY KEY;

-- CreateIndex
CREATE UNIQUE INDEX `Documentation_semesterYear_key` ON `Documentation`(`semesterYear`);
