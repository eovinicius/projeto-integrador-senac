/*
  Warnings:

  - You are about to alter the column `estatus` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `courses` MODIFY `estatus` BOOLEAN NULL DEFAULT true;
