--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)

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
-- Name: cube; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS cube WITH SCHEMA public;


--
-- Name: EXTENSION cube; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION cube IS 'data type for multidimensional cubes';


--
-- Name: earthdistance; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS earthdistance WITH SCHEMA public;


--
-- Name: EXTENSION earthdistance; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION earthdistance IS 'calculate great-circle distances on the surface of the Earth';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: address; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.address (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    street text NOT NULL,
    postalcode text,
    postalcodedesc text,
    country character(2) NOT NULL,
    location uuid
);


ALTER TABLE public.address OWNER TO ctrial;

--
-- Name: TABLE address; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.address IS 'Adr - Location addresses';


--
-- Name: COLUMN address.id; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.address.id IS 'id - primary key';


--
-- Name: COLUMN address.street; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.address.street IS 'street - street name, uncluding door number and floor';


--
-- Name: COLUMN address.postalcode; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.address.postalcode IS 'postalCode - zip code without city - format depends on country.';


--
-- Name: COLUMN address.postalcodedesc; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.address.postalcodedesc IS 'postalCodeDesc - postal code description. It is typically a city or a region name.';


--
-- Name: COLUMN address.country; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.address.country IS 'country - country code';


--
-- Name: COLUMN address.location; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.address.location IS 'location - FK to location.id';


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
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    firstname character varying(100) NOT NULL,
    lastname character varying(100) NOT NULL,
    username character varying(100) NOT NULL,
    passhash character varying(100) NOT NULL,
    type character varying NOT NULL,
    clinicalsite uuid,
    sponsor uuid
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
-- Name: COLUMN appuser.firstname; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.appuser.firstname IS 'firstName - first name';


--
-- Name: COLUMN appuser.lastname; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.appuser.lastname IS 'lastname - last name';


--
-- Name: COLUMN appuser.username; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.appuser.username IS 'username - unique string identifier';


--
-- Name: COLUMN appuser.passhash; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.appuser.passhash IS 'passHash - password hash';


--
-- Name: COLUMN appuser.type; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.appuser.type IS 'type - appuser subclass name - can be one of SponsorUser, ClinicalSiteUser, PhysicianUser';


--
-- Name: COLUMN appuser.clinicalsite; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.appuser.clinicalsite IS 'clinicalSite - id of the Clinical Site when this user belongs to that site';


--
-- Name: COLUMN appuser.sponsor; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.appuser.sponsor IS 'sponsor - id of the Sponsor when this user belongs to that Sponsor';


--
-- Name: clinicaltrial; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.clinicaltrial (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    status character(3) NOT NULL,
    keyssi character varying(255),
    dsudata jsonb,
    questionpool integer,
    clinicalsite uuid NOT NULL,
    sponsor uuid NOT NULL
);


ALTER TABLE public.clinicaltrial OWNER TO ctrial;

--
-- Name: TABLE clinicaltrial; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.clinicaltrial IS 'Ct - Clinical trial';


--
-- Name: COLUMN clinicaltrial.id; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrial.id IS 'id - Clinical Trial id';


--
-- Name: COLUMN clinicaltrial.keyssi; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrial.keyssi IS 'keySsi - KeySSI to the clinical Trial DSU. NULL until it is published to the blockchain.';


--
-- Name: COLUMN clinicaltrial.dsudata; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrial.dsudata IS 'dsuData - Mock data to represente the dsu (only while not in prod)';


--
-- Name: COLUMN clinicaltrial.questionpool; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrial.questionpool IS 'questionPool - the id of the question pool. NULL until the  questionpool is selectec';


--
-- Name: COLUMN clinicaltrial.clinicalsite; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrial.clinicalsite IS 'clinicalSite - site where this trial is being performed.';


--
-- Name: COLUMN clinicaltrial.sponsor; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrial.sponsor IS 'sponsor - sponsor of this ClinicalTrial';


--
-- Name: COLUMN clinicaltrial.name; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrial.name IS 'name - name of the trial';


--
-- Name: COLUMN clinicaltrial.description; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrial.description IS 'description - textual description of the trial';


--
-- Name: COLUMN clinicaltrial.status; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrial.status IS 'status - main lifecycle status';


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

ALTER SEQUENCE public.clinical_trial_questionpool_seq OWNED BY public.clinicaltrial.questionpool;


--
-- Name: clinicalsite; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.clinicalsite (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    address uuid
);


ALTER TABLE public.clinicalsite OWNER TO ctrial;

--
-- Name: TABLE clinicalsite; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.clinicalsite IS 'Cs - Clinical Site';


--
-- Name: COLUMN clinicalsite.id; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicalsite.id IS 'id - primary key';


--
-- Name: COLUMN clinicalsite.name; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicalsite.name IS 'name - name of the Clinical Site';


--
-- Name: COLUMN clinicalsite.address; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicalsite.address IS 'address - address of the clinical site';


--
-- Name: clinicaltrialstatus; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.clinicaltrialstatus (
    code character(3) NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.clinicaltrialstatus OWNER TO ctrial;

--
-- Name: TABLE clinicaltrialstatus; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.clinicaltrialstatus IS 'ClinicalTrialStatus(Ctrs) - Main lifecycle status for a ClinicalTrial';


--
-- Name: COLUMN clinicaltrialstatus.code; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrialstatus.code IS 'code - primary key code';


--
-- Name: COLUMN clinicaltrialstatus.description; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrialstatus.description IS 'description - status description.';


--
-- Name: country; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.country (
    code character(2) NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.country OWNER TO ctrial;

--
-- Name: TABLE country; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.country IS 'Ctr - 2 letter ISO country code';


--
-- Name: COLUMN country.code; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.country.code IS 'code - primary key. https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2';


--
-- Name: COLUMN country.name; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.country.name IS 'name - country name';


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
-- Name: location; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.location (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    description text NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    center boolean
);


ALTER TABLE public.location OWNER TO ctrial;

--
-- Name: TABLE location; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.location IS 'Location(Loc) - Location point';


--
-- Name: COLUMN location.id; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.location.id IS 'id - primary key UUIDv4';


--
-- Name: COLUMN location.description; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.location.description IS 'description - Textual description. Usually "City, Country"';


--
-- Name: COLUMN location.latitude; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.location.latitude IS 'latitude - GPS latitude in decimal format';


--
-- Name: COLUMN location.longitude; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.location.longitude IS 'longitude - GPS longitude in decimal format';


--
-- Name: matchrequest; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.matchrequest (
    keyssi text NOT NULL,
    dsudata jsonb NOT NULL,
    matchresult text,
    healthinfo text
);


ALTER TABLE public.matchrequest OWNER TO ctrial;

--
-- Name: TABLE matchrequest; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.matchrequest IS 'Mr - stores the match requests and the relation to their match results';


--
-- Name: COLUMN matchrequest.keyssi; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.matchrequest.keyssi IS 'keySsi - KeySSI for the match request';


--
-- Name: COLUMN matchrequest.dsudata; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.matchrequest.dsudata IS 'dd - DSUData mock data that should in production be found in the DSU';


--
-- Name: COLUMN matchrequest.matchresult; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.matchrequest.matchresult IS 'Mt - Result KeySSI (foreign key)';


--
-- Name: COLUMN matchrequest.healthinfo; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.matchrequest.healthinfo IS 'hi - health info KeySSI for this match request (foreign key)';


--
-- Name: matchresult; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.matchresult (
    keyssi text NOT NULL,
    dsudata jsonb NOT NULL,
    clinicaltrial integer NOT NULL
);


ALTER TABLE public.matchresult OWNER TO ctrial;

--
-- Name: TABLE matchresult; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.matchresult IS 'Mt - Stores the reference for the match result';


--
-- Name: COLUMN matchresult.keyssi; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.matchresult.keyssi IS 'keySsi - KeySSI for the match result DSU';


--
-- Name: COLUMN matchresult.dsudata; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.matchresult.dsudata IS 'dd - Json representation of the dsu data (in production should come from dsu)';


--
-- Name: COLUMN matchresult.clinicaltrial; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.matchresult.clinicaltrial IS 'ct - clinical trial id (foreign key)';


--
-- Name: matchresult_clinicaltrial_seq; Type: SEQUENCE; Schema: public; Owner: ctrial
--

CREATE SEQUENCE public.matchresult_clinicaltrial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.matchresult_clinicaltrial_seq OWNER TO ctrial;

--
-- Name: matchresult_clinicaltrial_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ctrial
--

ALTER SEQUENCE public.matchresult_clinicaltrial_seq OWNED BY public.matchresult.clinicaltrial;


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
-- Name: sponsor; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.sponsor (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    logo character varying(256)
);


ALTER TABLE public.sponsor OWNER TO ctrial;

--
-- Name: TABLE sponsor; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.sponsor IS 'Sp - Sponsor';


--
-- Name: COLUMN sponsor.id; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.sponsor.id IS 'id - primary key';


--
-- Name: COLUMN sponsor.name; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.sponsor.name IS 'name - name of the sponsor';


--
-- Name: COLUMN sponsor.logo; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.sponsor.logo IS 'logo - URI path of the logo image';


--
-- Name: appresource id; Type: DEFAULT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.appresource ALTER COLUMN id SET DEFAULT nextval('public.appresource_id_seq'::regclass);


--
-- Name: matchresult clinicaltrial; Type: DEFAULT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.matchresult ALTER COLUMN clinicaltrial SET DEFAULT nextval('public.matchresult_clinicaltrial_seq'::regclass);


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
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.address (id, street, postalcode, postalcodedesc, country, location) FROM stdin;
5d624620-a239-4613-945e-c786d49158ff	Alameda Santo António dos Capuchos	1169-050	Lisbon	PT	6e186617-accc-425e-9551-1912f8cf2db9
d2536458-c62d-4ca5-a548-624fb918cdce	Calle de Universidad	28015	Madrid	ES	70d1c3f8-8d4c-4798-b6f5-c41e5335f171
06708aa7-da3e-43f6-a739-d0e605022c6b	Calle de Hospital	20192	Madrid	ES	0f9db45c-99ae-4914-9f92-13c2c81963ec
eb29c313-3c82-4727-b76d-ae1094b762a9	Calle de Clínica	30131	Madrid	ES	c45477d1-746d-439b-995c-7b992df23b7e
\.


--
-- Data for Name: appresource; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.appresource (id, key, locale, value, help) FROM stdin;
1	ctrial.version	\N	0.0.15	Schema version
\.


--
-- Data for Name: appuser; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.appuser (id, firstname, lastname, username, passhash, type, clinicalsite, sponsor) FROM stdin;
5c6d5a11-9144-49ed-a4ad-7233804ed1a4	João	Luís	joao.luis@pdmfc.com	123456	ClinicalSiteUser	ae9a529f-f070-4cce-8d8a-50fa1a4ade56	\N
706a903e-b29e-46c3-9d50-0fa66d3b9ee2	Miguel	Coelho	miguel.coelho@pdmfc.com	123456	SponsorUser	\N	8f0759f0-357f-499f-86f1-db6486f72759
a5bcfe2c-acc9-4c3d-8f5f-afb7c9b0dee9	Tiago	Venceslau	tiago.venceslau@pdmfc.com	123456	SponsorUser	\N	4b019cd7-951f-4cc7-88cd-b838dfc40334
7a297492-4045-424c-a1c2-b7c766b41175	Prateek	Jain	prateek.jain@pfizer.com	123456	SponsorUser	\N	8f0759f0-357f-499f-86f1-db6486f72759
\.


--
-- Data for Name: clinicalsite; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.clinicalsite (id, name, address) FROM stdin;
35be0fb7-fb5b-45e3-80f0-705401183848	Centro Hospitalar Universitário de Lisboa Central	5d624620-a239-4613-945e-c786d49158ff
ae9a529f-f070-4cce-8d8a-50fa1a4ade56	University of Madrid Hospital	d2536458-c62d-4ca5-a548-624fb918cdce
951a89d9-261c-44aa-8275-383c1e5efbb8	Madrid General Hospital	06708aa7-da3e-43f6-a739-d0e605022c6b
485a1939-b5cc-476b-b055-3e481ace315e	Clinic of Madrid	eb29c313-3c82-4727-b76d-ae1094b762a9
\.


--
-- Data for Name: clinicaltrial; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.clinicaltrial (id, keyssi, dsudata, questionpool, clinicalsite, sponsor, name, description, status) FROM stdin;
4b8ed865-cf36-4fc2-914f-ba5ba28b05a8	BBudGH6ySHG6GUHN8ogNrTWbNNtWnfCDQHZWiBdN6kPY7NMSynmd8MDkw99pmHPYE8GbaYWjrdEdpjtqwabiFvwbV	{"extraProperty": "Extra data for trial 1"}	\N	35be0fb7-fb5b-45e3-80f0-705401183848	8f0759f0-357f-499f-86f1-db6486f72759	Trial 1	Description 1	REC
acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7	{"extraProperty": "Extra data for trial 2"}	\N	485a1939-b5cc-476b-b055-3e481ace315e	8f0759f0-357f-499f-86f1-db6486f72759	Trial 2	Description 2	REC
be550efe-99e0-4024-a26e-19012feee569	BBudGH6ySHG6GUHN8ogNrTWc7Ep4xbJCWvYMF7rbmdafbN1XaDc26y8dBnuE8TUdR4UGCgTbFkyetoSF1eoeVUjmy	{"extraProperty": "Extra data for trial 3"}	\N	951a89d9-261c-44aa-8275-383c1e5efbb8	8f0759f0-357f-499f-86f1-db6486f72759	Trial 3	Description 3	PUB
1721b2b0-0739-454c-8b99-9f29ee974233	3JstiXPCRm1hcgG352y3gkci2KFWas4mrANySspwy9XDgAZwAq5Xdhz8188AxRtCWJFVtKkv76MNK2uXS68EfAzb	{"extraProperty": "Extra data for trial 4"}	\N	ae9a529f-f070-4cce-8d8a-50fa1a4ade56	4b019cd7-951f-4cc7-88cd-b838dfc40334	Trial 4	Description 4	DRA
d8b76a43-2b72-4ea0-9dfe-1e5111de554e	2ZJYQfVfYBpCw3DZZ5E4wYwiXbVhK8KuDfggzFyzdGhWThQz7Hxrn5XQqruj3E3Qd4VhCoufrPzC9jBKt21u	{"extraProperty": "Extra data for trial 5"}	\N	ae9a529f-f070-4cce-8d8a-50fa1a4ade56	8f0759f0-357f-499f-86f1-db6486f72759	Trial 5	Description 5	PUB
\.


--
-- Data for Name: clinicaltrialstatus; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.clinicaltrialstatus (code, description) FROM stdin;
DRA	Draft
DEL	Deleted
CAN	Canceled
PUB	Published
REC	Recruitment
CLD	Closed
\.


--
-- Data for Name: country; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.country (code, name) FROM stdin;
HK	Hong Kong
IE	Ireland
SG	Singapore
AO	Angola
GR	Greece
NG	Nigeria
PT	Portugal
IT	Italy
MZ	Mozambique
US	U.S.A.
BR	Brasil
ES	Spain
FR	France
DE	Germany
NL	The Netherlands
FI	Finland
AU	Australia
ST	S. Tomé e Príncipe
CA	Canada
CV	Cabo Verde
SW	Switzerland
GB	United Kingdom
BE	Belgium
RU	Russian Federation
IN	India
JP	Japan
NO	Norway
SE	Sverige
NZ	New Zealand
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
pt	pt
pt_BR	pt_BR
pt_PT	pt_PT
en_GB	en_GBx
\.


--
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.location (id, description, latitude, longitude, center) FROM stdin;
a927026d-03c8-4117-8fda-bd6a81ac202b	Center of Madrid, Spain	40.41919953227523	-3.7140509653915212	t
0b164f7a-9938-42ed-8d5b-f24c9ba96884	Center of Lisbon, Portugal	38.72700165761961	-9.141322880824788	t
f3fb1cd7-7c89-4f0c-b5f5-8f4aa840ab35	Center of Berlin, Germany	52.52001784481716	13.376083060429975	t
70d1c3f8-8d4c-4798-b6f5-c41e5335f171	Facultad de Ciencias Biológicas, Madrid, Spain	40.449037404991415	-3.7267666668236923	f
0f9db45c-99ae-4914-9f92-13c2c81963ec	HM Hospital Universitario Madrid, Spain	40.43492500775357	-3.7069217709132576	f
c45477d1-746d-439b-995c-7b992df23b7e	Universidad Complutense de Madrid: Clínica Universitaria De Podologia, Madrid, Spain	40.445888890823426	-3.725804555613209	f
6e186617-accc-425e-9551-1912f8cf2db9	Centro Hospitalar Universitário de Lisboa Central, Lisbon, Portugal	38.72259950051003	-9.141586215843667	f
\.


--
-- Data for Name: matchrequest; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.matchrequest (keyssi, dsudata, matchresult, healthinfo) FROM stdin;
\.


--
-- Data for Name: matchresult; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.matchresult (keyssi, dsudata, clinicaltrial) FROM stdin;
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
-- Data for Name: sponsor; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.sponsor (id, name, logo) FROM stdin;
8f0759f0-357f-499f-86f1-db6486f72759	Pfizer	/assets/mah/pfizer/logo_h165px.png
4b019cd7-951f-4cc7-88cd-b838dfc40334	MSD	/assets/mah/msd/logo_h165px.png
d9c81fc0-f054-4401-994a-e7a9a1f76500	Novartis	/assets/mah/novartis/logo_h165px.png
\.


--
-- Name: appresource_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ctrial
--

SELECT pg_catalog.setval('public.appresource_id_seq', 1, true);


--
-- Name: clinical_trial_questionpool_seq; Type: SEQUENCE SET; Schema: public; Owner: ctrial
--

SELECT pg_catalog.setval('public.clinical_trial_questionpool_seq', 1, false);


--
-- Name: matchresult_clinicaltrial_seq; Type: SEQUENCE SET; Schema: public; Owner: ctrial
--

SELECT pg_catalog.setval('public.matchresult_clinicaltrial_seq', 1, false);


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
-- Name: clinicalsite pk_clinicalsite_id; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinicalsite
    ADD CONSTRAINT pk_clinicalsite_id PRIMARY KEY (id);


--
-- Name: clinicaltrial pk_clinicaltrial_id; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinicaltrial
    ADD CONSTRAINT pk_clinicaltrial_id PRIMARY KEY (id);


--
-- Name: clinicaltrialstatus pk_clinicaltrialstatus_code; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinicaltrialstatus
    ADD CONSTRAINT pk_clinicaltrialstatus_code PRIMARY KEY (code);


--
-- Name: country pk_country_code; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT pk_country_code PRIMARY KEY (code);


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
-- Name: matchrequest pk_matchrequest_keyssi; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.matchrequest
    ADD CONSTRAINT pk_matchrequest_keyssi PRIMARY KEY (keyssi);


--
-- Name: matchresult pk_matchresult_keyssi; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.matchresult
    ADD CONSTRAINT pk_matchresult_keyssi PRIMARY KEY (keyssi);


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
-- Name: sponsor pk_sponsor_id; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.sponsor
    ADD CONSTRAINT pk_sponsor_id PRIMARY KEY (id);


--
-- Name: address pk_tbl_id; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT pk_tbl_id PRIMARY KEY (id);


--
-- Name: location pk_tbl_id_0; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT pk_tbl_id_0 PRIMARY KEY (id);


--
-- Name: clinicaltrial unq_clinical_trial_questionpool; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinicaltrial
    ADD CONSTRAINT unq_clinical_trial_questionpool UNIQUE (questionpool);


--
-- Name: matchrequest unq_matchrequest_healthinfo; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.matchrequest
    ADD CONSTRAINT unq_matchrequest_healthinfo UNIQUE (healthinfo);


--
-- Name: matchrequest unq_matchrequest_matchresult; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.matchrequest
    ADD CONSTRAINT unq_matchrequest_matchresult UNIQUE (matchresult);


--
-- Name: matchresult unq_matchresult_clinicaltrial; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.matchresult
    ADD CONSTRAINT unq_matchresult_clinicaltrial UNIQUE (clinicaltrial);


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
-- Name: address fk_address_country; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT fk_address_country FOREIGN KEY (country) REFERENCES public.country(code);


--
-- Name: address fk_address_location; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT fk_address_location FOREIGN KEY (location) REFERENCES public.location(id);


--
-- Name: appresource fk_appresource_locale; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.appresource
    ADD CONSTRAINT fk_appresource_locale FOREIGN KEY (locale) REFERENCES public.locale(code);


--
-- Name: appuser fk_appuser_clinicalsite; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.appuser
    ADD CONSTRAINT fk_appuser_clinicalsite FOREIGN KEY (clinicalsite) REFERENCES public.clinicalsite(id);


--
-- Name: appuser fk_appuser_sponsor; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.appuser
    ADD CONSTRAINT fk_appuser_sponsor FOREIGN KEY (sponsor) REFERENCES public.sponsor(id);


--
-- Name: clinicalsite fk_clinicalsite_address; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinicalsite
    ADD CONSTRAINT fk_clinicalsite_address FOREIGN KEY (address) REFERENCES public.address(id);


--
-- Name: clinicaltrial fk_clinicaltrial; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinicaltrial
    ADD CONSTRAINT fk_clinicaltrial FOREIGN KEY (status) REFERENCES public.clinicaltrialstatus(code);


--
-- Name: clinicaltrial fk_clinicaltrial_clinicalsite; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinicaltrial
    ADD CONSTRAINT fk_clinicaltrial_clinicalsite FOREIGN KEY (clinicalsite) REFERENCES public.clinicalsite(id);


--
-- Name: clinicaltrial fk_clinicaltrial_sponsor; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinicaltrial
    ADD CONSTRAINT fk_clinicaltrial_sponsor FOREIGN KEY (sponsor) REFERENCES public.sponsor(id);


--
-- Name: question_pool fk_ct_question_pool; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.question_pool
    ADD CONSTRAINT fk_ct_question_pool FOREIGN KEY (id) REFERENCES public.clinicaltrial(questionpool);


--
-- Name: health_info fk_heathinfo_matchrequest; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.health_info
    ADD CONSTRAINT fk_heathinfo_matchrequest FOREIGN KEY (keyssi) REFERENCES public.matchrequest(healthinfo);


--
-- Name: matchresult fk_matchresult_matchrequest; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.matchresult
    ADD CONSTRAINT fk_matchresult_matchrequest FOREIGN KEY (keyssi) REFERENCES public.matchrequest(matchresult);


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

