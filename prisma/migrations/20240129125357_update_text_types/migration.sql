-- AlterTable
ALTER TABLE `acounts` MODIFY `refresh_token` TEXT NULL,
    MODIFY `access_token` TEXT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `bio` TEXT NULL;
