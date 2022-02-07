BEGIN TRANSACTION;
/*
\set DBC_ID 2
INSERT INTO DbChange (id, description)
VALUES (:"DBC_ID", '#94 - add takedauser1@somesponsor.com');
*/



COPY public.sponsor (id, name, logo) FROM stdin;
51a25155-57f9-4d77-8558-1db2ddabd92b	Takeda	/assets/mah/takeda/logo_h165px.png
\.

COPY public.appuser (id, firstname, lastname, username, passhash, type, clinicalsite, sponsor) FROM stdin;
5fdd0477-aee9-405b-90d6-8c4462602d7d	TakedaUser1	Admin1	takedauser1@somesponsor.com	123456	SponsorUser	\N	51a25155-57f9-4d77-8558-1db2ddabd92b
\.


/*
UPDATE DbChange SET execution=CLOCK_TIMESTAMP() WHERE id=:"DBC_ID";
\unset DBC_ID
*/
COMMIT;
