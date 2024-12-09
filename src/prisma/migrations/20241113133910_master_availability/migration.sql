/*
  Warnings:

  - You are about to drop the `brands` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `city` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `configure_subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contact_us` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customer_enquiries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `district` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `email_setting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `email_templates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `faq` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `features` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `key_achievements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mail_templates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `our_team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `package_plans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `push_notification_setting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `push_notification_templates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `questionanswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `section_content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sent_emails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sent_push_notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sent_sms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sent_voice_call` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sent_whats_app` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sms_setting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sms_templates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `state` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscribers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscription_list` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `system_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `testimonial_reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_token` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `voice_call_setting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `voice_call_templates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `whats_app_setting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `whats_app_templates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `brands`;

-- DropTable
DROP TABLE `categories`;

-- DropTable
DROP TABLE `city`;

-- DropTable
DROP TABLE `configure_subscription`;

-- DropTable
DROP TABLE `contact_us`;

-- DropTable
DROP TABLE `contents`;

-- DropTable
DROP TABLE `country`;

-- DropTable
DROP TABLE `customer_enquiries`;

-- DropTable
DROP TABLE `district`;

-- DropTable
DROP TABLE `email_setting`;

-- DropTable
DROP TABLE `email_templates`;

-- DropTable
DROP TABLE `faq`;

-- DropTable
DROP TABLE `features`;

-- DropTable
DROP TABLE `key_achievements`;

-- DropTable
DROP TABLE `mail_templates`;

-- DropTable
DROP TABLE `menus`;

-- DropTable
DROP TABLE `our_team`;

-- DropTable
DROP TABLE `package_plans`;

-- DropTable
DROP TABLE `push_notification_setting`;

-- DropTable
DROP TABLE `push_notification_templates`;

-- DropTable
DROP TABLE `questionanswer`;

-- DropTable
DROP TABLE `role`;

-- DropTable
DROP TABLE `section_content`;

-- DropTable
DROP TABLE `sent_emails`;

-- DropTable
DROP TABLE `sent_push_notification`;

-- DropTable
DROP TABLE `sent_sms`;

-- DropTable
DROP TABLE `sent_voice_call`;

-- DropTable
DROP TABLE `sent_whats_app`;

-- DropTable
DROP TABLE `sms_setting`;

-- DropTable
DROP TABLE `sms_templates`;

-- DropTable
DROP TABLE `state`;

-- DropTable
DROP TABLE `subscribers`;

-- DropTable
DROP TABLE `subscription_list`;

-- DropTable
DROP TABLE `system_settings`;

-- DropTable
DROP TABLE `testimonial_reviews`;

-- DropTable
DROP TABLE `user`;

-- DropTable
DROP TABLE `verification_token`;

-- DropTable
DROP TABLE `voice_call_setting`;

-- DropTable
DROP TABLE `voice_call_templates`;

-- DropTable
DROP TABLE `whats_app_setting`;

-- DropTable
DROP TABLE `whats_app_templates`;

-- CreateTable
CREATE TABLE `master_availability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NULL,
    `slug` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
