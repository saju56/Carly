CREATE SCHEMA IF NOT EXISTS pw_2020 AUTHORIZATION postgres;

DROP TABLE IF EXISTS company;
CREATE TABLE company (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  start_date TIMESTAMP NOT NULL,
  board_members INT DEFAULT NULL
);

DROP TABLE IF EXISTS company_logo;
CREATE TABLE company_logo (
    id VARCHAR(250) PRIMARY KEY,
    file_name VARCHAR(250),
    file_type VARCHAR(250),
    company_id INT,
    data BYTEA;
    CONSTRAINT id_companyId PRIMARY KEY(id, company_id)
);