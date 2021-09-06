BEGIN TRANSACTION;
/*
\set DBC_ID 1
INSERT INTO DbChange (id, description)
VALUES (:"DBC_ID", '#27 - add msduser1@somesponsor.com');
*/



COPY public.sponsor (id, name, logo) FROM stdin;
5ed4bb5d-c446-4ce2-871e-f07de8323ce3	AstraZeneca	/assets/mah/az/logo_h165px.png
\.

COPY public.appuser (id, firstname, lastname, username, passhash, type, clinicalsite, sponsor) FROM stdin;
93210f63-7b82-4fe9-8b34-ce2e93e281d8	MSDUser1	Admin1	msduser1@somesponsor.com	123456	SponsorUser	\N	4b019cd7-951f-4cc7-88cd-b838dfc40334
8caa0325-710d-4e3b-b72d-e3ca00c172e4	AZUser1	Admin1	azuser1@somesponsor.com	123456	SponsorUser	\N	5ed4bb5d-c446-4ce2-871e-f07de8323ce3
\.


/*
UPDATE DbChange SET execution=CLOCK_TIMESTAMP() WHERE id=:"DBC_ID";
\unset DBC_ID
*/
COMMIT;
