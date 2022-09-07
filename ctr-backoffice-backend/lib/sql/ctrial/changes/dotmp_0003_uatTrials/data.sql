BEGIN TRANSACTION;
/*
\set DBC_ID 3
INSERT INTO DbChange (id, description)
VALUES (:"DBC_ID", '#100 - UAT new trials');
*/


UPDATE ClinicalTrial SET status='DEL' WHERE NOT (name ILIKE 'Psoriatic Arthritis%');


/*
UPDATE DbChange SET execution=CLOCK_TIMESTAMP() WHERE id=:"DBC_ID";
\unset DBC_ID
*/
COMMIT;
