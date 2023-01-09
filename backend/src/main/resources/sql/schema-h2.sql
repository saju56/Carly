CREATE TABLE `company` (
                           `id` bigint NOT NULL,
                           `name` varchar(255) DEFAULT NULL,
                           `start_date` datetime(6) DEFAULT NULL,
                           `board_members` int DEFAULT NULL,
                           PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `company_logo`;
CREATE TABLE `company_logo` (
                                `id` varchar(255) NOT NULL,
                                `company_id` bigint NOT NULL,
                                `data` longblob,
                                `file_name` varchar(255) DEFAULT NULL,
                                `file_type` varchar(255) DEFAULT NULL,
                                PRIMARY KEY (`id`)
);

