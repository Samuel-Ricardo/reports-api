/*
  Warnings:

  - Added the required column `status` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Report` ADD COLUMN `status` ENUM('PENDING', 'PROCESSING', 'DONE', 'ERROR') NOT NULL;
