/*
  Warnings:

  - A unique constraint covering the columns `[ra_student]` on the table `Documentation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Documentation_semesterYear_key` ON `documentation`;

-- CreateIndex
CREATE UNIQUE INDEX `Documentation_ra_student_key` ON `Documentation`(`ra_student`);
