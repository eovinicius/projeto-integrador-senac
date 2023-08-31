-- CreateTable
CREATE TABLE `courses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `estatus` ENUM('active', 'inactive') NULL DEFAULT 'active',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `courses_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teachers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `user` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `teachers_user_key`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course_teacher` (
    `id_course` INTEGER NOT NULL,
    `id_teacher` INTEGER NOT NULL,
    `estatus` CHAR(1) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `courseId` VARCHAR(191) NULL,

    PRIMARY KEY (`id_course`, `id_teacher`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `ra` VARCHAR(191) NOT NULL,
    `id_course` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `estatus` CHAR(1) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Documentation` (
    `semesterYear` INTEGER NOT NULL,
    `ra_student` VARCHAR(191) NOT NULL,
    `tcer` INTEGER NOT NULL,
    `tcernr` INTEGER NOT NULL,
    `activityDescription` INTEGER NOT NULL,
    `internshipValidationDate` INTEGER NOT NULL,
    `activityReport` INTEGER NOT NULL,
    `termination` INTEGER NOT NULL,
    `equivalenceReport` INTEGER NOT NULL,
    `observations` VARCHAR(191) NOT NULL,
    `estatus` CHAR(1) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`semesterYear`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appointment` (
    `cod_appointment` INTEGER NOT NULL,
    `ra_student` VARCHAR(191) NOT NULL,
    `id_teacher` VARCHAR(191) NOT NULL,
    `appointment_date` DATETIME(3) NOT NULL,
    `appointment_time` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `estatus` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`cod_appointment`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `course_teacher` ADD CONSTRAINT `course_teacher_id_course_fkey` FOREIGN KEY (`id_course`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_teacher` ADD CONSTRAINT `course_teacher_id_teacher_fkey` FOREIGN KEY (`id_teacher`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_id_course_fkey` FOREIGN KEY (`id_course`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
