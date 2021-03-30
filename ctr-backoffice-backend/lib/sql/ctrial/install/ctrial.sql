--
-- PostgreSQL database dump
--

-- Dumped from database version 10.15 (Ubuntu 10.15-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.15 (Ubuntu 10.15-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: appresource; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.appresource (
    id bigint NOT NULL,
    key character varying(256) NOT NULL,
    locale character varying(5),
    value text NOT NULL,
    help text
);


ALTER TABLE public.appresource OWNER TO ctrial;

--
-- Name: TABLE appresource; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.appresource IS 'Arc - operational parameters or messages/resources that may need translation';


--
-- Name: COLUMN appresource.id; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.appresource.id IS 'id - PK';


--
-- Name: COLUMN appresource.key; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.appresource.key IS 'key - resource key';


--
-- Name: COLUMN appresource.locale; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.appresource.locale IS 'locale - if NULL then this resource is not translateable, and should be considered a configuration parameter.';


--
-- Name: COLUMN appresource.value; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.appresource.value IS 'value - value of the resource. Set to "?" to represent absence.';


--
-- Name: COLUMN appresource.help; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.appresource.help IS 'help - help message describing the parameter or resource';


--
-- Name: appresource_id_seq; Type: SEQUENCE; Schema: public; Owner: ctrial
--

CREATE SEQUENCE public.appresource_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appresource_id_seq OWNER TO ctrial;

--
-- Name: appresource_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctrial
--

ALTER SEQUENCE public.appresource_id_seq OWNED BY public.appresource.id;


--
-- Name: appuser; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.appuser (
    id bigint NOT NULL,
    username character varying(100) NOT NULL,
    passhash character varying(100) NOT NULL
);


ALTER TABLE public.appuser OWNER TO ctrial;

--
-- Name: TABLE appuser; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.appuser IS 'Au - AppUser - a username+credential to login';


--
-- Name: COLUMN appuser.id; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.appuser.id IS 'id - primary key';


--
-- Name: COLUMN appuser.username; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.appuser.username IS 'username - unique string identifier';


--
-- Name: COLUMN appuser.passhash; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.appuser.passhash IS 'passHash - password hash';


--
-- Name: appuser_id_seq; Type: SEQUENCE; Schema: public; Owner: ctrial
--

CREATE SEQUENCE public.appuser_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appuser_id_seq OWNER TO ctrial;

--
-- Name: appuser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctrial
--

ALTER SEQUENCE public.appuser_id_seq OWNED BY public.appuser.id;


--
-- Name: clinical_trial; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.clinical_trial (
    id integer NOT NULL,
    keyssi integer NOT NULL,
    dsudata jsonb,
    questionpool integer NOT NULL
);


ALTER TABLE public.clinical_trial OWNER TO ctrial;

--
-- Name: TABLE clinical_trial; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.clinical_trial IS 'ct - Clinical trial';


--
-- Name: COLUMN clinical_trial.id; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinical_trial.id IS 'id - Clinical Trial id';


--
-- Name: COLUMN clinical_trial.keyssi; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinical_trial.keyssi IS 'keySsi - KeySSI to the clinical Trial DSU';


--
-- Name: COLUMN clinical_trial.dsudata; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinical_trial.dsudata IS 'dsuData - Mock data to represente the dsu (only while not in prod)';


--
-- Name: COLUMN clinical_trial.questionpool; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinical_trial.questionpool IS 'qp - the id of the question pool';


--
-- Name: clinical_trial_questionpool_seq; Type: SEQUENCE; Schema: public; Owner: ctrial
--

CREATE SEQUENCE public.clinical_trial_questionpool_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clinical_trial_questionpool_seq OWNER TO ctrial;

--
-- Name: clinical_trial_questionpool_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctrial
--

ALTER SEQUENCE public.clinical_trial_questionpool_seq OWNED BY public.clinical_trial.questionpool;


--
-- Name: clinicaltrial_id_seq; Type: SEQUENCE; Schema: public; Owner: ctrial
--

CREATE SEQUENCE public.clinicaltrial_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clinicaltrial_id_seq OWNER TO ctrial;

--
-- Name: clinicaltrial_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctrial
--

ALTER SEQUENCE public.clinicaltrial_id_seq OWNED BY public.clinical_trial.id;


--
-- Name: clinicaltrial_keyssi_seq; Type: SEQUENCE; Schema: public; Owner: ctrial
--

CREATE SEQUENCE public.clinicaltrial_keyssi_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clinicaltrial_keyssi_seq OWNER TO ctrial;

--
-- Name: clinicaltrial_keyssi_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctrial
--

ALTER SEQUENCE public.clinicaltrial_keyssi_seq OWNED BY public.clinical_trial.keyssi;


--
-- Name: health_info; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.health_info (
    keyssi text NOT NULL,
    dsudata jsonb NOT NULL
);


ALTER TABLE public.health_info OWNER TO ctrial;

--
-- Name: TABLE health_info; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.health_info IS 'hi - health info (THIS IS A MOCK TABLE; ALL THIS DATA MUST COME FROM DSUS)';


--
-- Name: COLUMN health_info.keyssi; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.health_info.keyssi IS 'keySsi - KeySSI for the health info DSU';


--
-- Name: COLUMN health_info.dsudata; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.health_info.dsudata IS 'dsuData - Mock data (should come from DSU)';


--
-- Name: locale; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.locale (
    code character varying(5) NOT NULL,
    description character varying(200)
);


ALTER TABLE public.locale OWNER TO ctrial;

--
-- Name: TABLE locale; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.locale IS 'Loc - Locales. Does not include encoding.';


--
-- Name: COLUMN locale.code; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.locale.code IS 'code - locale code. Ex: "en", "en_US"';


--
-- Name: COLUMN locale.description; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.locale.description IS 'description - a desription of the locale';


--
-- Name: match_request; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.match_request (
    keyssi text NOT NULL,
    dsudata jsonb NOT NULL,
    matchresult text,
    healthinfo text
);


ALTER TABLE public.match_request OWNER TO ctrial;

--
-- Name: TABLE match_request; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.match_request IS 'Mr - stores the match requests and the relation to their match results';


--
-- Name: COLUMN match_request.keyssi; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.match_request.keyssi IS 'keySsi - KeySSI for the match request';


--
-- Name: COLUMN match_request.dsudata; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.match_request.dsudata IS 'dd - DSUData mock data that should in production be found in the DSU';


--
-- Name: COLUMN match_request.matchresult; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.match_request.matchresult IS 'Mt - Result KeySSI (foreign key)';


--
-- Name: COLUMN match_request.healthinfo; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.match_request.healthinfo IS 'hi - health info KeySSI for this match request (foreign key)';


--
-- Name: match_result; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.match_result (
    keyssi text NOT NULL,
    dsudata jsonb NOT NULL,
    clinicaltrial integer NOT NULL
);


ALTER TABLE public.match_result OWNER TO ctrial;

--
-- Name: TABLE match_result; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.match_result IS 'Mt - Stores the reference for the match result';


--
-- Name: COLUMN match_result.keyssi; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.match_result.keyssi IS 'keySsi - KeySSI for the match result DSU';


--
-- Name: COLUMN match_result.dsudata; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.match_result.dsudata IS 'dd - Json representation of the dsu data (in production should come from dsu)';


--
-- Name: COLUMN match_result.clinicaltrial; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.match_result.clinicaltrial IS 'ct - clinical trial id (foreign key)';


--
-- Name: match_result_clinicaltrial_seq; Type: SEQUENCE; Schema: public; Owner: ctrial
--

CREATE SEQUENCE public.match_result_clinicaltrial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.match_result_clinicaltrial_seq OWNER TO ctrial;

--
-- Name: match_result_clinicaltrial_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctrial
--

ALTER SEQUENCE public.match_result_clinicaltrial_seq OWNED BY public.match_result.clinicaltrial;


--
-- Name: question; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.question (
    id integer NOT NULL,
    questiontext character varying(250) NOT NULL,
    locale character varying(5)
);


ALTER TABLE public.question OWNER TO ctrial;

--
-- Name: TABLE question; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.question IS 'qtn - questions';


--
-- Name: COLUMN question.id; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.question.id IS 'id - id for each question';


--
-- Name: COLUMN question.questiontext; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.question.questiontext IS 'qt - the text of the question';


--
-- Name: COLUMN question.locale; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.question.locale IS 'locale - question locale';


--
-- Name: question_criteria; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.question_criteria (
    id integer NOT NULL,
    code character varying(10) NOT NULL,
    comparison character varying(100) NOT NULL,
    question integer NOT NULL
);


ALTER TABLE public.question_criteria OWNER TO ctrial;

--
-- Name: TABLE question_criteria; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.question_criteria IS 'qc - the criteria for the question';


--
-- Name: COLUMN question_criteria.id; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.question_criteria.id IS 'id - criteria id';


--
-- Name: COLUMN question_criteria.code; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.question_criteria.code IS 'code - the code for the criteria, eg: true, false, equal, over, under, between, etc';


--
-- Name: COLUMN question_criteria.comparison; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.question_criteria.comparison IS 'comparison - the value to compare the criteria with';


--
-- Name: COLUMN question_criteria.question; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.question_criteria.question IS 'question - the id of the question it refers to';


--
-- Name: question_criteria_id_seq; Type: SEQUENCE; Schema: public; Owner: ctrial
--

CREATE SEQUENCE public.question_criteria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.question_criteria_id_seq OWNER TO ctrial;

--
-- Name: question_criteria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctrial
--

ALTER SEQUENCE public.question_criteria_id_seq OWNED BY public.question_criteria.id;


--
-- Name: question_criteria_question_seq; Type: SEQUENCE; Schema: public; Owner: ctrial
--

CREATE SEQUENCE public.question_criteria_question_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.question_criteria_question_seq OWNER TO ctrial;

--
-- Name: question_criteria_question_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctrial
--

ALTER SEQUENCE public.question_criteria_question_seq OWNED BY public.question_criteria.question;


--
-- Name: question_id_seq; Type: SEQUENCE; Schema: public; Owner: ctrial
--

CREATE SEQUENCE public.question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.question_id_seq OWNER TO ctrial;

--
-- Name: question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctrial
--

ALTER SEQUENCE public.question_id_seq OWNED BY public.question.id;


--
-- Name: question_pool; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.question_pool (
    id integer NOT NULL
);


ALTER TABLE public.question_pool OWNER TO ctrial;

--
-- Name: TABLE question_pool; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.question_pool IS 'qPool - groups the pool of questions to be used in clinical trials questionnaires';


--
-- Name: COLUMN question_pool.id; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.question_pool.id IS 'id - the question pool id';


--
-- Name: question_pool_question_join_table; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.question_pool_question_join_table (
    questionpool integer NOT NULL,
    question integer NOT NULL
);


ALTER TABLE public.question_pool_question_join_table OWNER TO ctrial;

--
-- Name: TABLE question_pool_question_join_table; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.question_pool_question_join_table IS 'join table for question and question_pool';


--
-- Name: COLUMN question_pool_question_join_table.questionpool; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.question_pool_question_join_table.questionpool IS 'question pool id';


--
-- Name: COLUMN question_pool_question_join_table.question; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.question_pool_question_join_table.question IS 'question id';


--
-- Name: question_pool_question_join_table_question_seq; Type: SEQUENCE; Schema: public; Owner: ctrial
--

CREATE SEQUENCE public.question_pool_question_join_table_question_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.question_pool_question_join_table_question_seq OWNER TO ctrial;

--
-- Name: question_pool_question_join_table_question_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctrial
--

ALTER SEQUENCE public.question_pool_question_join_table_question_seq OWNED BY public.question_pool_question_join_table.question;


--
-- Name: question_pool_question_join_table_questionpool_seq; Type: SEQUENCE; Schema: public; Owner: ctrial
--

CREATE SEQUENCE public.question_pool_question_join_table_questionpool_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.question_pool_question_join_table_questionpool_seq OWNER TO ctrial;

--
-- Name: question_pool_question_join_table_questionpool_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctrial
--

ALTER SEQUENCE public.question_pool_question_join_table_questionpool_seq OWNED BY public.question_pool_question_join_table.questionpool;


--
-- Name: question_type; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.question_type (
    id integer NOT NULL,
    code character varying(5)
);


ALTER TABLE public.question_type OWNER TO ctrial;

--
-- Name: COLUMN question_type.code; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.question_type.code IS 'code - the code for the question type';


--
-- Name: question_type_id_seq; Type: SEQUENCE; Schema: public; Owner: ctrial
--

CREATE SEQUENCE public.question_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.question_type_id_seq OWNER TO ctrial;

--
-- Name: question_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctrial
--

ALTER SEQUENCE public.question_type_id_seq OWNED BY public.question_type.id;


--
-- Name: appresource id; Type: DEFAULT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.appresource ALTER COLUMN id SET DEFAULT nextval('public.appresource_id_seq'::regclass);


--
-- Name: appuser id; Type: DEFAULT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.appuser ALTER COLUMN id SET DEFAULT nextval('public.appuser_id_seq'::regclass);


--
-- Name: clinical_trial id; Type: DEFAULT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinical_trial ALTER COLUMN id SET DEFAULT nextval('public.clinicaltrial_id_seq'::regclass);


--
-- Name: clinical_trial keyssi; Type: DEFAULT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinical_trial ALTER COLUMN keyssi SET DEFAULT nextval('public.clinicaltrial_keyssi_seq'::regclass);


--
-- Name: clinical_trial questionpool; Type: DEFAULT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinical_trial ALTER COLUMN questionpool SET DEFAULT nextval('public.clinical_trial_questionpool_seq'::regclass);


--
-- Name: match_result clinicaltrial; Type: DEFAULT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.match_result ALTER COLUMN clinicaltrial SET DEFAULT nextval('public.match_result_clinicaltrial_seq'::regclass);


--
-- Name: question id; Type: DEFAULT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question ALTER COLUMN id SET DEFAULT nextval('public.question_id_seq'::regclass);


--
-- Name: question_criteria id; Type: DEFAULT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question_criteria ALTER COLUMN id SET DEFAULT nextval('public.question_criteria_id_seq'::regclass);


--
-- Name: question_criteria question; Type: DEFAULT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question_criteria ALTER COLUMN question SET DEFAULT nextval('public.question_criteria_question_seq'::regclass);


--
-- Name: question_pool_question_join_table questionpool; Type: DEFAULT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question_pool_question_join_table ALTER COLUMN questionpool SET DEFAULT nextval('public.question_pool_question_join_table_questionpool_seq'::regclass);


--
-- Name: question_pool_question_join_table question; Type: DEFAULT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question_pool_question_join_table ALTER COLUMN question SET DEFAULT nextval('public.question_pool_question_join_table_question_seq'::regclass);


--
-- Name: question_type id; Type: DEFAULT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question_type ALTER COLUMN id SET DEFAULT nextval('public.question_type_id_seq'::regclass);


--
-- Data for Name: appresource; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.appresource (id, key, locale, value, help) FROM stdin;
1	ctrial.version	\N	0.0.1	Schema version
\.


--
-- Data for Name: appuser; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.appuser (id, username, passhash) FROM stdin;
1	joao.luis@pdmfc.com	123456
2	miguel.coelho@pdmfc.com	123456
3	tiago.venceslau@pdmfc.com	123456
\.


--
-- Data for Name: clinical_trial; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.clinical_trial (id, keyssi, dsudata, questionpool) FROM stdin;
\.


--
-- Data for Name: health_info; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.health_info (keyssi, dsudata) FROM stdin;
\.


--
-- Data for Name: locale; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.locale (code, description) FROM stdin;
en	en
en_US	en_US
en_GB	en_GB
pt	pt
pt_BR	pt_BR
pt_PT	pt_PT
\.


--
-- Data for Name: match_request; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.match_request (keyssi, dsudata, matchresult, healthinfo) FROM stdin;
\.


--
-- Data for Name: match_result; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.match_result (keyssi, dsudata, clinicaltrial) FROM stdin;
\.


--
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.question (id, questiontext, locale) FROM stdin;
\.


--
-- Data for Name: question_criteria; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.question_criteria (id, code, comparison, question) FROM stdin;
\.


--
-- Data for Name: question_pool; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.question_pool (id) FROM stdin;
\.


--
-- Data for Name: question_pool_question_join_table; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.question_pool_question_join_table (questionpool, question) FROM stdin;
\.


--
-- Data for Name: question_type; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.question_type (id, code) FROM stdin;
\.


--
-- Name: appresource_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ctrial
--

SELECT pg_catalog.setval('public.appresource_id_seq', 1, true);


--
-- Name: appuser_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ctrial
--

SELECT pg_catalog.setval('public.appuser_id_seq', 3, true);


--
-- Name: clinical_trial_questionpool_seq; Type: SEQUENCE SET; Schema: public; Owner: ctrial
--

SELECT pg_catalog.setval('public.clinical_trial_questionpool_seq', 1, false);


--
-- Name: clinicaltrial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ctrial
--

SELECT pg_catalog.setval('public.clinicaltrial_id_seq', 1, false);


--
-- Name: clinicaltrial_keyssi_seq; Type: SEQUENCE SET; Schema: public; Owner: ctrial
--

SELECT pg_catalog.setval('public.clinicaltrial_keyssi_seq', 1, false);


--
-- Name: match_result_clinicaltrial_seq; Type: SEQUENCE SET; Schema: public; Owner: ctrial
--

SELECT pg_catalog.setval('public.match_result_clinicaltrial_seq', 1, false);


--
-- Name: question_criteria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ctrial
--

SELECT pg_catalog.setval('public.question_criteria_id_seq', 1, false);


--
-- Name: question_criteria_question_seq; Type: SEQUENCE SET; Schema: public; Owner: ctrial
--

SELECT pg_catalog.setval('public.question_criteria_question_seq', 1, false);


--
-- Name: question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ctrial
--

SELECT pg_catalog.setval('public.question_id_seq', 1, false);


--
-- Name: question_pool_question_join_table_question_seq; Type: SEQUENCE SET; Schema: public; Owner: ctrial
--

SELECT pg_catalog.setval('public.question_pool_question_join_table_question_seq', 1, false);


--
-- Name: question_pool_question_join_table_questionpool_seq; Type: SEQUENCE SET; Schema: public; Owner: ctrial
--

SELECT pg_catalog.setval('public.question_pool_question_join_table_questionpool_seq', 1, false);


--
-- Name: question_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ctrial
--

SELECT pg_catalog.setval('public.question_type_id_seq', 1, false);


--
-- Name: appresource pk_appresource_id; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.appresource
    ADD CONSTRAINT pk_appresource_id PRIMARY KEY (id);


--
-- Name: appuser pk_appuser_id; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.appuser
    ADD CONSTRAINT pk_appuser_id PRIMARY KEY (id);


--
-- Name: clinical_trial pk_clinicaltrial_id; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinical_trial
    ADD CONSTRAINT pk_clinicaltrial_id PRIMARY KEY (id);


--
-- Name: health_info pk_heathinfo_keyssi; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.health_info
    ADD CONSTRAINT pk_heathinfo_keyssi PRIMARY KEY (keyssi);


--
-- Name: locale pk_locale_code; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.locale
    ADD CONSTRAINT pk_locale_code PRIMARY KEY (code);


--
-- Name: match_request pk_match_request_keyssi; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.match_request
    ADD CONSTRAINT pk_match_request_keyssi PRIMARY KEY (keyssi);


--
-- Name: match_result pk_match_result_keyssi; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.match_result
    ADD CONSTRAINT pk_match_result_keyssi PRIMARY KEY (keyssi);


--
-- Name: question_criteria pk_question_criteria_id; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question_criteria
    ADD CONSTRAINT pk_question_criteria_id PRIMARY KEY (id);


--
-- Name: question pk_question_id; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT pk_question_id PRIMARY KEY (id);


--
-- Name: question_pool pk_question_pool_id; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question_pool
    ADD CONSTRAINT pk_question_pool_id PRIMARY KEY (id);


--
-- Name: question_pool_question_join_table pk_question_pool_question_join_table; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question_pool_question_join_table
    ADD CONSTRAINT pk_question_pool_question_join_table PRIMARY KEY (questionpool, question);


--
-- Name: question_type pk_question_type_id; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question_type
    ADD CONSTRAINT pk_question_type_id PRIMARY KEY (id);


--
-- Name: clinical_trial unq_clinical_trial_questionpool; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinical_trial
    ADD CONSTRAINT unq_clinical_trial_questionpool UNIQUE (questionpool);


--
-- Name: match_request unq_match_request_healthinfo; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.match_request
    ADD CONSTRAINT unq_match_request_healthinfo UNIQUE (healthinfo);


--
-- Name: match_request unq_match_request_matchresult; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.match_request
    ADD CONSTRAINT unq_match_request_matchresult UNIQUE (matchresult);


--
-- Name: match_result unq_match_result_clinicaltrial; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.match_result
    ADD CONSTRAINT unq_match_result_clinicaltrial UNIQUE (clinicaltrial);


--
-- Name: question_criteria unq_question_criteria_question; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question_criteria
    ADD CONSTRAINT unq_question_criteria_question UNIQUE (question);


--
-- Name: question unq_question_locale; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT unq_question_locale UNIQUE (locale);


--
-- Name: question_pool_question_join_table unq_question_pool_question_join_table_question; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question_pool_question_join_table
    ADD CONSTRAINT unq_question_pool_question_join_table_question UNIQUE (question);


--
-- Name: question_pool_question_join_table unq_question_pool_question_join_table_questionpool; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question_pool_question_join_table
    ADD CONSTRAINT unq_question_pool_question_join_table_questionpool UNIQUE (questionpool);


--
-- Name: appresource fk_appresource_locale; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.appresource
    ADD CONSTRAINT fk_appresource_locale FOREIGN KEY (locale) REFERENCES public.locale(code);


--
-- Name: clinical_trial fk_clinicaltrial_match_result; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinical_trial
    ADD CONSTRAINT fk_clinicaltrial_match_result FOREIGN KEY (id) REFERENCES public.match_result(clinicaltrial);


--
-- Name: question_pool fk_ct_question_pool; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question_pool
    ADD CONSTRAINT fk_ct_question_pool FOREIGN KEY (id) REFERENCES public.clinical_trial(questionpool);


--
-- Name: health_info fk_heathinfo_match_request; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.health_info
    ADD CONSTRAINT fk_heathinfo_match_request FOREIGN KEY (keyssi) REFERENCES public.match_request(healthinfo);


--
-- Name: match_result fk_match_result_match_request; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.match_result
    ADD CONSTRAINT fk_match_result_match_request FOREIGN KEY (keyssi) REFERENCES public.match_request(matchresult);


--
-- Name: question fk_question_locale; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT fk_question_locale FOREIGN KEY (locale) REFERENCES public.locale(code);


--
-- Name: question_pool_question_join_table fk_question_pool_question_join_table; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question_pool_question_join_table
    ADD CONSTRAINT fk_question_pool_question_join_table FOREIGN KEY (questionpool) REFERENCES public.question_pool(id);


--
-- Name: question fk_question_question_criteria; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT fk_question_question_criteria FOREIGN KEY (id) REFERENCES public.question_criteria(question);


--
-- Name: question_pool_question_join_table fk_question_question_pool_join_table; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question_pool_question_join_table
    ADD CONSTRAINT fk_question_question_pool_join_table FOREIGN KEY (question) REFERENCES public.question(id);


--
-- PostgreSQL database dump complete
--

