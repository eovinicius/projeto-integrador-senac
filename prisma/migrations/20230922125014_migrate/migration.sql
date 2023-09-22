/*
  Warnings:

  - You are about to alter the column `id_teacher` on the `appointment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `appointment` MODIFY `id_teacher` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Documentation` ADD CONSTRAINT `Documentation_ra_student_fkey` FOREIGN KEY (`ra_student`) REFERENCES `Student`(`ra`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_ra_student_fkey` FOREIGN KEY (`ra_student`) REFERENCES `Student`(`ra`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_id_teacher_fkey` FOREIGN KEY (`id_teacher`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
