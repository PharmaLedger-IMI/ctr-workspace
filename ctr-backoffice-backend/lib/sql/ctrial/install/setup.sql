-- run as postgres
create user ctrial password 'ctrial' valid until 'infinity';
create database ctrial owner = ctrial;
\connect ctrial
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 


