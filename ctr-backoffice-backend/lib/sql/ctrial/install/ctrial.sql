--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)

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

COMMENT ON COLUMN public.appuser.clinicalsite IS 'clinicalSite - id of the Clinical Site when this user belongs to that site. Must be filled for type=''ClinicalSiteUser''. Optional for type=''PhysicianUser''. NULL for other types.';


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
    sponsor uuid NOT NULL,
    nctnumber text,
    purpose text,
    phase text,
    timecommitment text,
    physicalcommitment text,
    travelstipends text,
    eligibilitycriteria text
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
-- Name: COLUMN clinicaltrial.nctnumber; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrial.nctnumber IS 'nctNumber - Identifier in clinicaltrials.gov. May be NULL.';


--
-- Name: COLUMN clinicaltrial.purpose; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrial.purpose IS 'purpose - textual purpose';


--
-- Name: COLUMN clinicaltrial.phase; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrial.phase IS 'phase - textual description of the Phase';


--
-- Name: COLUMN clinicaltrial.timecommitment; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrial.timecommitment IS 'timeCommitement - text describing the time commitment details to display to the patient';


--
-- Name: COLUMN clinicaltrial.physicalcommitment; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrial.physicalcommitment IS 'physicalCommitment - text describing the phisical commitment to display to the patient';


--
-- Name: COLUMN clinicaltrial.travelstipends; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrial.travelstipends IS 'travelStipends - text describing travel stipends provided to the patient';


--
-- Name: COLUMN clinicaltrial.eligibilitycriteria; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrial.eligibilitycriteria IS 'eligibilityCriteria - text with HTML source to display the eligibility criteria to the patient';


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
-- Name: clinicaltrialmedicalcondition; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.clinicaltrialmedicalcondition (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    ordering integer NOT NULL,
    clinicaltrial uuid NOT NULL,
    medicalcondition bigint NOT NULL
);


ALTER TABLE public.clinicaltrialmedicalcondition OWNER TO ctrial;

--
-- Name: TABLE clinicaltrialmedicalcondition; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.clinicaltrialmedicalcondition IS 'Ctmc - Clinical Trial many-to-many ordered association with Medical Condition';


--
-- Name: COLUMN clinicaltrialmedicalcondition.id; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrialmedicalcondition.id IS 'id - mandatory UUID key';


--
-- Name: COLUMN clinicaltrialmedicalcondition.ordering; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrialmedicalcondition.ordering IS 'ordering - order number within the clinical trial. Lower number appears first.';


--
-- Name: COLUMN clinicaltrialmedicalcondition.clinicaltrial; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrialmedicalcondition.clinicaltrial IS 'clinicalTruial - uuid of the ClinicalTrial';


--
-- Name: COLUMN clinicaltrialmedicalcondition.medicalcondition; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrialmedicalcondition.medicalcondition IS 'medicalCondition - code of the medical condition';


--
-- Name: clinicaltrialquestiontype; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.clinicaltrialquestiontype (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    clinicaltrial uuid NOT NULL,
    questiontype character varying(127) NOT NULL,
    stage integer NOT NULL,
    ordering integer NOT NULL,
    criteria text,
    criterialabel text
);


ALTER TABLE public.clinicaltrialquestiontype OWNER TO ctrial;

--
-- Name: TABLE clinicaltrialquestiontype; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.clinicaltrialquestiontype IS 'Cqt - join table for ClinicalTrial and QuestionType with order of appearance';


--
-- Name: COLUMN clinicaltrialquestiontype.id; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrialquestiontype.id IS 'id - typeORM does not seem to work well without an id';


--
-- Name: COLUMN clinicaltrialquestiontype.clinicaltrial; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrialquestiontype.clinicaltrial IS 'clinicalTrial - id of the Clinical Trial';


--
-- Name: COLUMN clinicaltrialquestiontype.questiontype; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrialquestiontype.questiontype IS 'questionType - code of the QuestionType';


--
-- Name: COLUMN clinicaltrialquestiontype.stage; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrialquestiontype.stage IS 'stage - stage of the questions. Stage 10 is for "General Health Information" questions, and is only needed to specify criteria. Stage 30 is "Condition Specific Questions", and stage 40 is "Trial Specific Questions"';


--
-- Name: COLUMN clinicaltrialquestiontype.ordering; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrialquestiontype.ordering IS 'ordering - within the same stage, lower number questions come first';


--
-- Name: COLUMN clinicaltrialquestiontype.criteria; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrialquestiontype.criteria IS 'criteria - if NOT NULL, overrides the associated QuestionType.criteria. See column comments on QuestionType.criteria for more details.';


--
-- Name: COLUMN clinicaltrialquestiontype.criterialabel; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.clinicaltrialquestiontype.criterialabel IS 'criteriaLabel - when the eligibility criteria is defined, it is described to the user using this text. Should only be specified if criteria is specified (but criteria might be specified without a criteriaLabel).';


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
-- Name: generalhealthinformationquestiontype; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.generalhealthinformationquestiontype (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    ordering integer NOT NULL,
    questiontype character varying NOT NULL
);


ALTER TABLE public.generalhealthinformationquestiontype OWNER TO ctrial;

--
-- Name: TABLE generalhealthinformationquestiontype; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.generalhealthinformationquestiontype IS 'GhiQt - Ordered list of QuestionType that make up the General Health Information (stage=10) currently.';


--
-- Name: COLUMN generalhealthinformationquestiontype.id; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.generalhealthinformationquestiontype.id IS 'id - PK';


--
-- Name: COLUMN generalhealthinformationquestiontype.ordering; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.generalhealthinformationquestiontype.ordering IS 'ordering - lower number questions come first';


--
-- Name: COLUMN generalhealthinformationquestiontype.questiontype; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.generalhealthinformationquestiontype.questiontype IS 'questionType - FK';


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
    createdon timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.matchrequest OWNER TO ctrial;

--
-- Name: TABLE matchrequest; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.matchrequest IS 'MatchRequest(Mr) - stores the match requests and the relation to their match results';


--
-- Name: COLUMN matchrequest.keyssi; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.matchrequest.keyssi IS 'keySsi - KeySSI for the match request. All MatchRequests received on the backoffice have been anchored to the blockchain by the patient-ssapp, so this attribute is mandatory.';


--
-- Name: COLUMN matchrequest.dsudata; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.matchrequest.dsudata IS 'dsuData - non-structured data part of the MatchRequest found in the DSU at the time of submission.';


--
-- Name: COLUMN matchrequest.matchresult; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.matchrequest.matchresult IS 'matchResult - References MatchResult.keyssi';


--
-- Name: COLUMN matchrequest.createdon; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.matchrequest.createdon IS 'createdOn - timestamp when the record was created on the database (probably when it was submitted)';


--
-- Name: matchresult; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.matchresult (
    keyssi text NOT NULL,
    dsudata jsonb NOT NULL
);


ALTER TABLE public.matchresult OWNER TO ctrial;

--
-- Name: TABLE matchresult; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.matchresult IS 'MatchResul(Mt) - Stores the match result data.';


--
-- Name: COLUMN matchresult.keyssi; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.matchresult.keyssi IS 'keySsi - KeySSI for the match result DSU. Also the PK for this table.';


--
-- Name: COLUMN matchresult.dsudata; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.matchresult.dsudata IS 'dsuData - Json representation of the dsu data';


--
-- Name: medicalcondition; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.medicalcondition (
    code bigint NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.medicalcondition OWNER TO ctrial;

--
-- Name: TABLE medicalcondition; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.medicalcondition IS 'Mc - List of medical conditions based on https://clinicaltables.nlm.nih.gov/api/conditions/v3/search\ncode 2417';


--
-- Name: COLUMN medicalcondition.code; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.medicalcondition.code IS 'code - PK code';


--
-- Name: COLUMN medicalcondition.name; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.medicalcondition.name IS 'name - textual description';


--
-- Name: medicalconditionquestiontype; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.medicalconditionquestiontype (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    ordering integer NOT NULL,
    questiontype character varying NOT NULL,
    medicalcondition bigint NOT NULL
);


ALTER TABLE public.medicalconditionquestiontype OWNER TO ctrial;

--
-- Name: TABLE medicalconditionquestiontype; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.medicalconditionquestiontype IS 'McQt - Ordered list of QuestionType that make up the Condition questions (stage=30) for a particular MedicalCondition';


--
-- Name: COLUMN medicalconditionquestiontype.id; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.medicalconditionquestiontype.id IS 'id - PK';


--
-- Name: COLUMN medicalconditionquestiontype.ordering; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.medicalconditionquestiontype.ordering IS 'ordering - lower number questions come first';


--
-- Name: COLUMN medicalconditionquestiontype.questiontype; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.medicalconditionquestiontype.questiontype IS 'questionType - FK';


--
-- Name: COLUMN medicalconditionquestiontype.medicalcondition; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.medicalconditionquestiontype.medicalcondition IS 'medicalCondition';


--
-- Name: questiondatatype; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.questiondatatype (
    code character varying(5) NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.questiondatatype OWNER TO ctrial;

--
-- Name: TABLE questiondatatype; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.questiondatatype IS 'Qdt - Question data type - using the same codes as LForms 29.0.x, plus YN';


--
-- Name: COLUMN questiondatatype.code; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.questiondatatype.code IS 'code - data type code, as used by LForms.';


--
-- Name: COLUMN questiondatatype.description; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.questiondatatype.description IS 'description - data type description';


--
-- Name: questiontype; Type: TABLE; Schema: public; Owner: ctrial
--

CREATE TABLE public.questiontype (
    localquestioncode character varying(127) NOT NULL,
    question text NOT NULL,
    codinginstructions text,
    datatype character varying(5) NOT NULL,
    answercardinalitymin integer NOT NULL,
    answercardinalitymax character varying(126) NOT NULL,
    answers jsonb,
    externallydefined text,
    units text,
    restrictions jsonb,
    criteria text,
    skiplogic jsonb
);


ALTER TABLE public.questiontype OWNER TO ctrial;

--
-- Name: TABLE questiontype; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON TABLE public.questiontype IS 'Qt - Question type.';


--
-- Name: COLUMN questiontype.localquestioncode; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.questiontype.localquestioncode IS 'localQuestionCode - the code for the question type. For the same question, there should be only one code.';


--
-- Name: COLUMN questiontype.question; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.questiontype.question IS 'question - question text, including the question mark.';


--
-- Name: COLUMN questiontype.codinginstructions; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.questiontype.codinginstructions IS 'codingInstructions - optional HTML help text to display to the patient';


--
-- Name: COLUMN questiontype.datatype; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.questiontype.datatype IS 'dataType - question data type';


--
-- Name: COLUMN questiontype.answercardinalitymin; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.questiontype.answercardinalitymin IS 'answerCardinalityMin - Default minimum number of answers required. Set to 0 for optional question. Set to 1 for mandatory answer question. Set to 0 for TITLE.';


--
-- Name: COLUMN questiontype.answercardinalitymax; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.questiontype.answercardinalitymax IS 'answerCardinalityMax - ''0'' no answer allowed. ''1'' at most one answer allowed. ''*'' unlimited answers allowed. NULL is assumed to be ''1''.';


--
-- Name: COLUMN questiontype.answers; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.questiontype.answers IS 'answers - for CNE and CWE, JSON array of available answers. Set to null when using externallyDefinedAnswers.\nExample:\n                 [\n                    {\n                        "text": "Male",\n                        "code": "M",\n                        "system": null,\n                        "label": null,\n                        "score": null\n                    },\n                    {\n                        "text": "Female",\n                        "code": "F",\n                        "system": null,\n                        "label": null,\n                        "score": null\n                    }\n                ]';


--
-- Name: COLUMN questiontype.externallydefined; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.questiontype.externallydefined IS 'externallyDefined - URL for CNE or CWE autocompletion. If defined, overrides answers.';


--
-- Name: COLUMN questiontype.units; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.questiontype.units IS 'units - LForms units definition text. Define only for data types that support units.\nExample:\n                [\n                    {\n                        "name": "cm"\n                    },\n                    {\n                        "name": "[in_i]"\n                    }\n                ]';


--
-- Name: COLUMN questiontype.restrictions; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.questiontype.restrictions IS 'restrictions - LForm restrictions expression. Example:\n               {\n                    "minInclusive": "0",\n                    "maxInclusive": "200"\n                }';


--
-- Name: COLUMN questiontype.criteria; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.questiontype.criteria IS 'criteria - expression to evaluate the acceptance of the answer, and translates to a boolean.  If false, the candidate is excluded.\nLeave null for an informative question.\nOnly evaluated for questions that have an answer.\nThe string ''value'' is replaced by the current question answer text (within double quotes, for a text question, or numeric for quantity).\nThe string ''code'' is repaced by the current question code text, within double-quotes.\nThe string ''age'' is replaced by the age in years (decimal), just for the case where the dataType=''DT''';


--
-- Name: COLUMN questiontype.skiplogic; Type: COMMENT; Schema: public; Owner: ctrial
--

COMMENT ON COLUMN public.questiontype.skiplogic IS 'skipLogic - JSON expression for LHC-Forms skip logic. If filled, will probably have references to other QuestionType.localQuestionCode\nExample:\n{\n        "action": "show",\n        "logic": "ALL",\n        "conditions": [\n          {\n            "source": "haveAxSpa",\n            "trigger": {\n              "value": {\n                "code": "yesAxSpA"\n              }\n            }\n          }\n        ]\n      }';


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
1	ctrial.version	\N	0.7.2	Schema version
\.


--
-- Data for Name: appuser; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.appuser (id, firstname, lastname, username, passhash, type, clinicalsite, sponsor) FROM stdin;
62767fe4-b6e6-4342-8419-0736b1b21e36	Physician	One	physician1@someorganization.org	123456	PhysicianUser	35be0fb7-fb5b-45e3-80f0-705401183848	\N
19cb8399-2d16-4e37-8453-f44cbf76b5e0	Site	Clerk1	siteclerck1@someclinicalsite1.org	123456	ClinicalSiteUser	ae9a529f-f070-4cce-8d8a-50fa1a4ade56	\N
3d6b1cdb-6007-461b-86f1-442955055713	Site	Admin1	siteadmin1@someclinicalsite1.org	123456	ClinicalSiteUser	ae9a529f-f070-4cce-8d8a-50fa1a4ade56	\N
4b58696e-fe9f-4b8c-af01-c9d4c78b57f6	ClincalSite	User	clinicalsiteuser11@mailinator.com	Test@123	ClinicalSiteUser	951a89d9-261c-44aa-8275-383c1e5efbb8	\N
813aff75-8b92-4993-85b9-d8b91b347009	AbbvieUser1	Admin1	abbvieuser1@somesponsor.com	123456	SponsorUser	\N	214a7e0b-ced3-475c-945c-94981a92fef0
2dee18ed-3ca0-4a25-86ba-817901b66b4e	NovartisUser1	Admin1	novartisuser1@somesponsor.com	123456	SponsorUser	\N	d9c81fc0-f054-4401-994a-e7a9a1f76500
f7385ee1-65fa-4408-967a-f6e91d253857	PfizerUser1	Admin1	pfizeruser1@somesponsor.com	123456	SponsorUser	\N	8f0759f0-357f-499f-86f1-db6486f72759
89f725af-4630-4b75-8a0f-11465d31e54a	UCBUser1	Admin1	ucbuser1@somesponsor.com	123456	SponsorUser	\N	c1a9e128-e490-4c2f-b95d-dc69c6fd9a47
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

COPY public.clinicaltrial (id, name, description, status, keyssi, dsudata, questionpool, clinicalsite, sponsor, nctnumber, purpose, phase, timecommitment, physicalcommitment, travelstipends, eligibilitycriteria) FROM stdin;
4b8ed865-cf36-4fc2-914f-ba5ba28b05a8	Safety and Efficacy of Pf-06650833 In Subjects With Rheumatoid Arthritis, With An Inadequate Response to Methotrexate	Safety and Efficacy of Pf-06650833 In Subjects With Rheumatoid Arthritis, With An Inadequate Response to Methotrexate	DRA	BBudGH6ySHG6GUHN8ogNrTWbNNtWnfCDQHZWiBdN6kPY7NMSynmd8MDkw99pmHPYE8GbaYWjrdEdpjtqwabiFvwbV	{"extraProperty": "Extra data for trial 1"}	\N	35be0fb7-fb5b-45e3-80f0-705401183848	8f0759f0-357f-499f-86f1-db6486f72759	NCT0480TEST	To assess the efficacy and safety of PF 0665083 at Week 12 in subjects with moderate to severe, active, rheumathoid arthritis	Phase II Clinical Trial	Up to 2 hours per week	Weekly check in to the site	Up to $3500 in travel expenses are reimbursed	<ul class="eligibilitycriteria-group"><li><span class="neutral-img"></span>No HIV</li><li><span class="neutral-img"></span>Rheumathoid Arthritis diagnostic</li><li><span class="neutral-img"></span>Taking methotrexate</li><li><span class="neutral-img"></span>No history of kidney or liver disease</li><li><span class="neutral-img"></span>No history of immunodeficiency disorders</li></ul>
1721b2b0-0739-454c-8b99-9f29ee974233	Atrial Fibrillation with NOAC	Atrial fibrillation with NOAC	REC	3JstiXPCRm1hcgG352y3gkci2KFWas4mrANySspwy9XDgAZwAq5Xdhz8188AxRtCWJFVtKkv76MNK2uXS68EfAzb	{"extraProperty": "Extra data for trial AF NOAC"}	\N	ae9a529f-f070-4cce-8d8a-50fa1a4ade56	0043f60b-2a8f-4b55-ae08-0411bac445bb	NCT0491TEST	\N	\N	\N	\N	\N	Over 45 years old!
d8b76a43-2b72-4ea0-9dfe-1e5111de554e	Asthma	Asthma	REC	2ZJYQfVfYBpCw3DZZ5E4wYwiXbVhK8KuDfggzFyzdGhWThQz7Hxrn5XQqruj3E3Qd4VhCoufrPzC9jBKt21u	{"extraProperty": "Extra data for trial 5"}	\N	ae9a529f-f070-4cce-8d8a-50fa1a4ade56	d9c81fc0-f054-4401-994a-e7a9a1f76500	\N	\N	\N	\N	\N	\N	<ul class="eligibilitycriteria-group"><li><span class="neutral-img"></span>Must be between 18 and 75 years old</li><li><span class="neutral-img"></span>Must not be pregnant or nursing</li><li><span class="neutral-img"></span>Asthma diagnosis at least one year ago</li><li><span class="neutral-img"></span>Treatment using inhaler</li><li><span class="neutral-img"></span>One or more crisis per year</li><li><span class="neutral-img"></span>Do not smoke or vape</li><li><span class="neutral-img"></span>No Tuberculosis</li><li><span class="neutral-img"></span>No Chronic obstructive pulmonary disease (COPD) or Emphysema</li></ul>
be550efe-99e0-4024-a26e-19012feee569	Psoriatic Arthritis	Psoriatic Arthritis	DRA	BBudGH6ySHG6GUHN8ogNrTWc7Ep4xbJCWvYMF7rbmdafbN1XaDc26y8dBnuE8TUdR4UGCgTbFkyetoSF1eoeVUjmy	{"extraProperty": "Extra data for Psoriatic Arthitis"}	\N	951a89d9-261c-44aa-8275-383c1e5efbb8	c1a9e128-e490-4c2f-b95d-dc69c6fd9a47	NCT0490TEST	\N	\N	\N	\N	\N	\nMust have:\n<ul>\n    <li>18 years or older.</li>\n    <li>A medical professional diagnostic of Psoriatic Arthritis.</li>\n    <li>Had Psoriatic Arthritis for at least 6 months.</li>\n    <li>At least 1 Psoriatic lesion and/or a history of Psoriasis.</li>\n</ul>\n
acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	CAIN457P12301 / Axial Spondyloarthritis	CAIN457P12301 / Axial Spondyloarthritis	REC	BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7	{"extraProperty": "Extra data for Axial Spondyloarthritis"}	\N	485a1939-b5cc-476b-b055-3e481ace315e	d9c81fc0-f054-4401-994a-e7a9a1f76500	NCT0485TEST	\N	\N	\N	\N	\N	<ul class="eligibilitycriteria-group"><li><span class="neutral-img"></span>Must be 18 or older</li><li><span class="neutral-img"></span>Axial Spondyloarthritis diagnostic</li><li><span class="neutral-img"></span>X-Ray to support diagnostic (when applicable)</li></ul>
04c744a1-8254-4037-8b5a-5760b2fb0daa	C1061011 / Non-Alcohol Fatty Liver Disease (NAFLD)	C1061011 / Non-Alcohol Fatty Liver Disease (NAFLD) + Type 2 diabetes	REC	BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7	{"extraProperty": "Extra data for C1061011 / Non-Alcohol Fatty Liver Disease (NAFLD)"}	\N	485a1939-b5cc-476b-b055-3e481ace315e	8f0759f0-357f-499f-86f1-db6486f72759	NCT0901TEST	\N	\N	\N	\N	\N	<ul class="eligibilitycriteria-group"><li><span class="neutral-img"></span>Must be between 18 and 70 years old</li><li><span class="neutral-img"></span>Not pregnant and not nursing</li><li><span class="neutral-img"></span>Must not be trying to have a child</li><li><span class="neutral-img"></span>Diagnostic of type 2 diabetes</li><li><span class="neutral-img"></span>Taking 500 mg or more of metformin daily</li></ul>
562a7d01-a517-4b3c-8300-79294fa7d920	C1071003 / Multiple Myeloma	C1071003 / Multiple Myeloma	REC	BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7	{"extraProperty": "Extra data for Multiple Meyloma"}	\N	485a1939-b5cc-476b-b055-3e481ace315e	8f0759f0-357f-499f-86f1-db6486f72759	NCT0632TEST	\N	\N	\N	\N	\N	<ul class="eligibilitycriteria-group"><li><span class="neutral-img"></span>Must be 18 or older</li><li><span class="neutral-img"></span>A diagnostic of multiple myeloma</li><li><span class="neutral-img"></span>Tried at least 1 immunomodulatory drug (IMiD)</li><li><span class="neutral-img"></span>Tried at least 1 proteasome inhibitor (PI)</li><li><span class="neutral-img"></span>Tried at least 1 monoclonal antibody (CD38 mAB)</li><li><span class="neutral-img"></span>Tried at least one B-cell maturation antigen (BCMA)-directed therapy</li></ul>
7f7e92ab-51a2-4e8b-bcaa-362d04bd00ad	Psoriatic Arthritis1	Psoriatic Arthritis	REC	BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7	{"extraProperty": "Extra data for Psoriatic Arthritis Novartis Trial 1"}	\N	485a1939-b5cc-476b-b055-3e481ace315e	d9c81fc0-f054-4401-994a-e7a9a1f76500	NCT04632927	To assess the efficacy and safety of drug XXXX in subjects with Psoriatic Arthritis	Phase II Clinical Trial	Up to 2 hours per week	Weekly check in to the site	Up to $3500 in travel expenses are reimbursed	<ul class="eligibilitycriteria-group"><li><span class="neutral-img"></span>Must be 18 or older</li><li><span class="neutral-img"></span>Must not be pregnant or nursing</li><li><span class="neutral-img"></span>Must not participate on other ongoing trials</li><li><span class="neutral-img"></span>Must have been diagnosed with Psoriatic Arthritis</li><li><span class="neutral-img"></span>Must have had Psoriatic Arthritis for at least 6 months</li><li><span class="neutral-img"></span>Have not taken any disease modifying anti-rheumatic drugs</li><li><span class="neutral-img"></span>No history of taking biologics</li><li><span class="neutral-img"></span>No history of chronic alcohol or drug abuse</li></ul>
90646dda-d562-4c5c-b992-b5732d44943f	Psoriatic Arthritis2	Psoriatic Arthritis	REC	BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7	{"extraProperty": "Extra data for Psoriatic Arthritis Novartis Trial 2"}	\N	ae9a529f-f070-4cce-8d8a-50fa1a4ade56	d9c81fc0-f054-4401-994a-e7a9a1f76500	NCT04209205	To assess the efficacy and safety of drug XXXX in subjects with Psoriatic Arthritis	Phase II Clinical Trial	Up to 2 hours per week	Weekly check in to the site	Up to $3500 in travel expenses are reimbursed	<ul class="eligibilitycriteria-group"><li><span class="neutral-img"></span>Must be 18 or older</li><li><span class="neutral-img"></span>Must have been diagnosed with Psoriatic Arthritis</li><li><span class="neutral-img"></span>Must have Active or Previous history of Psoriasis</li><li><span class="neutral-img"></span>No other autoimmune disorder besides PsA</li><li><span class="neutral-img"></span>No history of taking biologics</li><li><span class="neutral-img"></span>Must not have been treated with more than 3 different TNF inhibitors</li></ul>
1ca49499-df7e-42d5-a13e-6a05ebee96be	Psoriatic Arthritis3	Psoriatic Arthritis	REC	BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7	{"extraProperty": "Extra data for Psoriatic Arthritis Novartis Trial 3"}	\N	35be0fb7-fb5b-45e3-80f0-705401183848	c1a9e128-e490-4c2f-b95d-dc69c6fd9a47	NCT03896581	To assess the efficacy and safety of drug XXXX in subjects with Psoriatic Arthritis	Phase II Clinical Trial	Up to 2 hours per week	Weekly check in to the site	Up to $3500 in travel expenses are reimbursed	<ul class="eligibilitycriteria-group"><li><span class="neutral-img"></span>Must be 18 or older</li><li><span class="neutral-img"></span>Must not be pregnant or nursing</li><li><span class="neutral-img"></span>Must have been diagnosed with Psoriatic Arthritis</li><li><span class="neutral-img"></span>Must not have Active or Previous history of Psoriasis</li><li><span class="neutral-img"></span>No other inflammatory conditions</li><li><span class="neutral-img"></span>No cancer history</li><li><span class="neutral-img"></span>No history of taking biologics</li><li><span class="neutral-img"></span>No history of chronic alcohol or drug abuse</li><li><span class="neutral-img"></span>No major depression diagnosis</li></ul>
01f1c1b4-be85-4d10-bb07-7741faae59eb	Psoriatic Arthritis4	Psoriatic Arthritis	REC	BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7	{"extraProperty": "Extra data for Psoriatic Arthritis Novartis Trial 4"}	\N	ae9a529f-f070-4cce-8d8a-50fa1a4ade56	c1a9e128-e490-4c2f-b95d-dc69c6fd9a47	NCT03895203	To assess the efficacy and safety of drug XXXX in subjects with Psoriatic Arthritis	Phase II Clinical Trial	Up to 2 hours per week	Weekly check in to the site	Up to $3500 in travel expenses are reimbursed	<ul class="eligibilitycriteria-group"><li><span class="neutral-img"></span>Must be 18 or older</li><li><span class="neutral-img"></span>Must not be pregnant or nursing</li><li><span class="neutral-img"></span>Must have been diagnosed with Psoriatic Arthritis</li><li><span class="neutral-img"></span>No other autoimmune or inflammatory disorder besides PsA</li><li><span class="neutral-img"></span>No cancer history</li><li><span class="neutral-img"></span>Have not taken any disease modifying anti-rheumatic drugs</li><li><span class="neutral-img"></span>No history of taking biologics</li><li><span class="neutral-img"></span>No active tuberculosis (TB) infection</li></ul>
f6792fa1-c2a4-4f93-be06-2558ad4a00b7	Psoriatic Arthritis5	Psoriatic Arthritis	REC	BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7	{"extraProperty": "Extra data for Psoriatic Arthritis Novartis Trial 5"}	\N	951a89d9-261c-44aa-8275-383c1e5efbb8	8f0759f0-357f-499f-86f1-db6486f72759	NCT03486457	To assess the efficacy and safety of drug XXXX in subjects with Psoriatic Arthritis	Phase II Clinical Trial	Up to 2 hours per week	Weekly check in to the site	Up to $3500 in travel expenses are reimbursed	<ul class="eligibilitycriteria-group"><li><span class="neutral-img"></span>Must be 18 or older</li><li><span class="neutral-img"></span>Must have been diagnosed with Psoriatic Arthritis</li><li><span class="neutral-img"></span>Must not have Active or Previous history of Psoriasis</li><li><span class="neutral-img"></span>No other autoimmune or inflammatory disorder besides PsA</li><li><span class="neutral-img"></span>Have not taken any disease modifying anti-rheumatic drugs</li><li><span class="neutral-img"></span>Chinese patient</li></ul>
9ea9bd15-8062-4e53-a90b-5ee927b849c0	Psoriatic Arthritis6	Psoriatic Arthritis	REC	BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7	{"extraProperty": "Extra data for Psoriatic Arthritis Novartis Trial 6"}	\N	485a1939-b5cc-476b-b055-3e481ace315e	214a7e0b-ced3-475c-945c-94981a92fef0	NCT03675308	To assess the efficacy and safety of drug XXXX in subjects with Psoriatic Arthritis	Phase II Clinical Trial	Up to 2 hours per week	Weekly check in to the site	Up to $3500 in travel expenses are reimbursed	<ul class="eligibilitycriteria-group"><li><span class="neutral-img"></span>Must be 18 or older</li><li><span class="neutral-img"></span>Must have been diagnosed with Psoriatic Arthritis</li><li><span class="neutral-img"></span>Active diagnosis within 6 months</li><li><span class="neutral-img"></span>No other autoimmune or inflammatory disorder besides PsA</li><li><span class="neutral-img"></span>No cancer history</li><li><span class="neutral-img"></span>Have not taken any disease modifying anti-rheumatic drugs</li><li><span class="neutral-img"></span>No history of taking biologics</li></ul>
05ca265b-6b41-4f7b-b00d-c63c4b9ebcc5	Psoriatic Arthritis7	Psoriatic Arthritis	REC	BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7	{"extraProperty": "Extra data for Psoriatic Arthritis Novartis Trial 7"}	\N	485a1939-b5cc-476b-b055-3e481ace315e	214a7e0b-ced3-475c-945c-94981a92fef0	NCT03104374	To assess the efficacy and safety of drug XXXX in subjects with Psoriatic Arthritis	Phase II Clinical Trial	Up to 2 hours per week	Weekly check in to the site	Up to $3500 in travel expenses are reimbursed	<ul class="eligibilitycriteria-group"><li><span class="neutral-img"></span>Must be 18 or older</li><li><span class="neutral-img"></span>Must have been diagnosed with Psoriatic Arthritis</li><li><span class="neutral-img"></span>Have not taken any disease modifying anti-rheumatic drugs</li><li><span class="neutral-img"></span>Must have other autoimmune or inflammatory disorder besides PsA</li><li><span class="neutral-img"></span>No cancer history</li><li><span class="neutral-img"></span>No prior exposure to any Janus Kinase inhbitor</li><li><span class="neutral-img"></span>No fibromyalgia diagnosis</li></ul>
62293111-a28f-4663-826b-88581640a18d	Psoriatic Arthritis8	Psoriatic Arthritis	REC	BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7	{"extraProperty": "Extra data for Psoriatic Arthritis Novartis Trial 8"}	\N	951a89d9-261c-44aa-8275-383c1e5efbb8	214a7e0b-ced3-475c-945c-94981a92fef0	NCT03104400	To assess the efficacy and safety of drug XXXX in subjects with Psoriatic Arthritis	Phase II Clinical Trial	Up to 2 hours per week	Weekly check in to the site	Up to $3500 in travel expenses are reimbursed	<ul class="eligibilitycriteria-group"><li><span class="neutral-img"></span>Must be 18 or older</li><li><span class="neutral-img"></span>Must have been diagnosed with Psoriatic Arthritis</li><li><span class="neutral-img"></span>Must have PsA symptoms for at least 6 months</li><li><span class="neutral-img"></span>Have not taken any disease modifying anti-rheumatic drugs</li><li><span class="neutral-img"></span>No other autoimmune or inflammatory disorder besides PsA</li><li><span class="neutral-img"></span>No cancer history</li><li><span class="neutral-img"></span>No prior exposure to any Janus Kinase inhbitor</li><li><span class="neutral-img"></span>No fibromyalgia diagnosis</li></ul>
d4228287-2707-46a7-9a7c-5f874d375921	Psoriatic Arthritis9	Psoriatic Arthritis	REC	BBudGH6ySHG6GUHN8ogNrTWc9GRZRq4QFSiUdW78PSxqrBvfPiVm7XVP1nLJzCFZoweRKKLL5FVva747C4jEkkrk7	{"extraProperty": "Extra data for Psoriatic Arthritis Novartis Trial 9"}	\N	35be0fb7-fb5b-45e3-80f0-705401183848	214a7e0b-ced3-475c-945c-94981a92fef0	NCT03671148	To assess the efficacy and safety of drug XXXX in subjects with Psoriatic Arthritis	Phase II Clinical Trial	Up to 2 hours per week	Weekly check in to the site	Up to $3500 in travel expenses are reimbursed	<ul class="eligibilitycriteria-group"><li><span class="neutral-img"></span>Must be 18 or older</li><li><span class="neutral-img"></span>Must have been diagnosed with Psoriatic Arthritis</li><li><span class="neutral-img"></span>Have not taken any disease modifying anti-rheumatic drugs</li><li><span class="neutral-img"></span>Must have other autoimmune or inflammatory disorder besides PsA</li><li><span class="neutral-img"></span>No cancer history</li></ul>
fc5f14c1-13fd-40c2-8210-8e8bb1c054ae	Ulcerative Colitis4	Ulcerative Colitis4	REC	\N	\N	\N	35be0fb7-fb5b-45e3-80f0-705401183848	8f0759f0-357f-499f-86f1-db6486f72759	NCT04090411	To assess the efficacy and safety of drug XXXX in subjects with U.C.	Phase II	Up to 2 hours per week	Weekly check in to the site	Up to $3500 in travel expenses are reimbursed	<ul class="eligibilitycriteria-group"><li><span class="neutral-img"></span>Between 18 years old and 75 years old</li><li><span class="neutral-img"></span>Not pregnant or nursing</li><li><span class="neutral-img"></span>Confirmed diagnosis of Ulcerative Colitis</li><li><span class="neutral-img"></span>Diagnosis of Ulcerative Colitis for at least 3 months</li><li><span class="neutral-img"></span>No current diagnosis of Crohn's disease (CD), inflammatory bowel disease. No history of other type of colitis.</li><li><span class="neutral-img"></span>No history of cancer</li></ul>
\.


--
-- Data for Name: clinicaltrialmedicalcondition; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.clinicaltrialmedicalcondition (id, ordering, clinicaltrial, medicalcondition) FROM stdin;
5fb9e662-01fa-47b4-b362-7b4afbe906f1	1000	4b8ed865-cf36-4fc2-914f-ba5ba28b05a8	2311
4ee5fa5d-71fd-47d9-86d7-f5c3630bb12f	1000	acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	100100
0ab33665-ce0e-4092-91d3-e6d69fc56235	2000	acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	100110
12d6aba9-6531-4cd1-b4f4-3b2b95a487ef	1000	be550efe-99e0-4024-a26e-19012feee569	101000
ee3445e2-8aff-43d1-9b9b-86aeb5bacfd6	1000	1721b2b0-0739-454c-8b99-9f29ee974233	102000
e31d62c4-0ad4-4f13-a04b-e931b8fb95a4	1000	d8b76a43-2b72-4ea0-9dfe-1e5111de554e	366
789ea873-7447-4536-8e9a-9b4a6ed939a4	1000	562a7d01-a517-4b3c-8300-79294fa7d920	103000
8a7739cb-1db9-4cb2-9eb2-0c415640db1c	1000	04c744a1-8254-4037-8b5a-5760b2fb0daa	104000
fbeefeb5-12e0-4981-93a2-67c7d671e403	2000	04c744a1-8254-4037-8b5a-5760b2fb0daa	10180
fe0a47ad-bd5b-4f36-a525-28209ad55522	1000	7f7e92ab-51a2-4e8b-bcaa-362d04bd00ad	101000
374f1ab9-dfd2-4e43-81e2-20a295c88190	1000	90646dda-d562-4c5c-b992-b5732d44943f	101000
7633c017-e936-4bb0-a4fc-b304cbc73ab5	1000	1ca49499-df7e-42d5-a13e-6a05ebee96be	101000
8fd3e2d4-b978-4969-9a32-dc1e9609b512	1000	01f1c1b4-be85-4d10-bb07-7741faae59eb	101000
523a27cd-b38a-4948-a8c6-bf2877bcc4c3	1000	f6792fa1-c2a4-4f93-be06-2558ad4a00b7	101000
8de1bbd5-3d7d-49a4-8b07-bda27ddf3a9a	1000	9ea9bd15-8062-4e53-a90b-5ee927b849c0	101000
d441593b-3687-477e-a446-5d7b165bb45e	1000	05ca265b-6b41-4f7b-b00d-c63c4b9ebcc5	101000
e11f9665-dd22-408d-b309-1c514f5a4811	1000	62293111-a28f-4663-826b-88581640a18d	101000
a8348d85-32bb-47b1-9d34-eec2834d2e1b	1000	d4228287-2707-46a7-9a7c-5f874d375921	101000
9563a622-8b3e-40a6-b570-58a6e9fa67ae	10100	fc5f14c1-13fd-40c2-8210-8e8bb1c054ae	105000
\.


--
-- Data for Name: clinicaltrialquestiontype; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.clinicaltrialquestiontype (id, clinicaltrial, questiontype, stage, ordering, criteria, criterialabel) FROM stdin;
9e38f7a8-8742-4719-9521-066ce986246a	4b8ed865-cf36-4fc2-914f-ba5ba28b05a8	haveHIV	10	10900	YNNS_YNS	No HIV
e7d8f068-32fd-4e21-ae19-403db05c8500	4b8ed865-cf36-4fc2-914f-ba5ba28b05a8	haveRheumatoidArthritis	30	10100	YNNS_YNS	Rheumathoid Arthritis diagnostic
2c420af1-29de-45f2-b027-453f5efdc34e	4b8ed865-cf36-4fc2-914f-ba5ba28b05a8	takeMethotrexate	30	10200	YNNS_YNS	Taking methotrexate
ffb5692e-601c-4669-a498-d668cdd86865	4b8ed865-cf36-4fc2-914f-ba5ba28b05a8	takeDmards	30	10300	\N	\N
e8e8dbb9-f209-4886-81ef-d38f89ecb760	4b8ed865-cf36-4fc2-914f-ba5ba28b05a8	haveLiverDisease	30	10400	YNNS_NNS	No history of kidney or liver disease
6d122f74-f06b-4713-960e-b4a41690a726	4b8ed865-cf36-4fc2-914f-ba5ba28b05a8	haveTuberculosis	30	10500	YNNS_NNS	\N
1111c475-01f4-427f-a583-3bc72fc98908	4b8ed865-cf36-4fc2-914f-ba5ba28b05a8	takenOralAntibioctics	30	10600	YNNS_NNS	\N
482d0b10-be52-43f5-85ff-88f88160c13c	4b8ed865-cf36-4fc2-914f-ba5ba28b05a8	haveAutoimmuneBesidesRheuArth	30	10700	YNNS_NNS	No history of immunodeficiency disorders
c79fab54-681f-4245-8676-349189757970	4b8ed865-cf36-4fc2-914f-ba5ba28b05a8	haveNeurologicalDiseases	30	10800	YNNS_NNS	\N
a4835a8f-d81d-4f20-9ba4-ab8e70126d68	4b8ed865-cf36-4fc2-914f-ba5ba28b05a8	titlePf06650833	40	10050	\N	\N
4ca1dc49-d245-4318-805f-6968dd20b0e9	4b8ed865-cf36-4fc2-914f-ba5ba28b05a8	smokeCigarettes	40	10100	YNNS_NNS	\N
0d011b5e-77b5-4b9d-a85a-7aef0925d63b	4b8ed865-cf36-4fc2-914f-ba5ba28b05a8	claustrophobic	40	10200	YNNS_NNS	\N
5377a2cd-7169-42b1-8dfe-984b125947d1	4b8ed865-cf36-4fc2-914f-ba5ba28b05a8	sessivityToAdalimuamab	40	10400	YNNS_NNS	\N
8d2554e5-49d6-48e6-9931-98b3e7cebae7	4b8ed865-cf36-4fc2-914f-ba5ba28b05a8	remissionRheumatoidArthritis	40	10500	YNNS_NNS	\N
cb901a62-28dd-4da0-ad42-44fb848c26ee	acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	birthDate	10	10100	age>=18	Must be 18 or older
d69d8e39-6b52-4f4e-ac81-6ea06cfa2209	acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	haveHepatitisB	10	10700	YNNS_NNS	\N
5f46ffb9-4b6b-4754-9e09-bf45f168cd0e	acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	haveHepatitisC	10	10800	YNNS_NNS	\N
fd2041bf-6026-42ab-be74-844435113d47	acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	haveHIV	10	10900	YNNS_NNS	\N
d666a5a5-07c3-4536-90d0-de8843ba07e7	acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	haveAxSpa	30	10100	code!="noNotSure"&&code!="yesUnspec"	Axial Spondyloarthritis diagnostic
e838919e-28f1-45f5-bf8e-0b50ad6bad5c	acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	haveAxSpaXRay	30	10200	YNNS_YNS	X-Ray to support diagnostic (when applicable)
a403f2c0-693e-4564-9b1e-1efcb7374cfe	acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	backPainAge	30	10300	code=="3-4"||code=="5+"	\N
8d006f24-3b40-4c7f-9f14-4ba5024dc1e7	acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	haveAxSpABefore45	30	10500	code=="yes"||code=="notSure"	\N
8163caa6-091d-4391-853b-50425ef91708	acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	usingNSAIDS	40	10700	\N	\N
1260f568-13a7-4a3a-8f77-474dac6f3b38	acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	responseNSAIDS	40	10900	code!="CR"	\N
f32384f6-c1dd-4713-9824-d956ffd62599	acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	takeMethHydrOrMorph	40	11000	YNNS_NNS	\N
402b9ed5-4fd3-495b-8a94-5acf51017df1	acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	haveMalignantCancer5	40	11100	\N	\N
f7d35616-9db0-4f08-99b9-6d72ee7a5722	acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	malignantCancerType	40	11200	\N	\N
da466bf8-4128-41be-9595-790bac108ff5	acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	haveIBD	40	11300	\N	\N
d72721bb-5374-4a46-bbaa-9d798fe65f77	acf087d5-35c0-4f8e-a2ea-23aa464ae7ca	takeAxSpAMeds	40	11400	\N	\N
183b9bb7-195c-45eb-920b-7baccea01240	be550efe-99e0-4024-a26e-19012feee569	birthDate	10	10100	age>=18	\N
e8139fea-5f6f-4309-b533-ed3360febbea	be550efe-99e0-4024-a26e-19012feee569	havePsoriaticArthritis	30	10100	YN_Y	Must have been diagnosed with Psoriatic Arthritis
92be4d7f-3a38-4932-99bd-5341cad3c6c5	be550efe-99e0-4024-a26e-19012feee569	havePsoriaticArthritisFor6Months	30	10200	YNNS_YNS	\N
545ae66b-e1f9-43c9-ae91-9f3cc2bf3a56	be550efe-99e0-4024-a26e-19012feee569	havePsoriaticArthritisLesion	40	10100	YNNS_YNS	\N
a2791997-f969-4850-bdd3-36829ebedc42	1721b2b0-0739-454c-8b99-9f29ee974233	birthDate	10	10100	age>=45	\N
64f5c3ff-7be2-497f-a8d9-660624cfd5d0	1721b2b0-0739-454c-8b99-9f29ee974233	haveAtrialFibrilation	30	10100	YNNS_YNS	\N
1a9d0878-e946-48bf-b7fa-b9e3b784005b	1721b2b0-0739-454c-8b99-9f29ee974233	haveCHA2DS2_VAScGe2	30	10200	YNNS_YNS	\N
215f2f9e-1795-425c-92ae-154ce4e845f9	1721b2b0-0739-454c-8b99-9f29ee974233	haveCHA2DS2_VAScGe3	30	10200	YNNS_YNS	\N
96526dbe-7861-4ef0-a859-0d3ada87e27a	1721b2b0-0739-454c-8b99-9f29ee974233	takeOralAnticoagulant	40	10100	YNNS_NNS	\N
0c9e2043-f76d-4bc4-988a-abb4b385de4e	1721b2b0-0739-454c-8b99-9f29ee974233	haveNOACBleedingRisk	40	10200	value.length==0	\N
25cc9e13-1034-4bd2-9674-eece4bf07eb9	1721b2b0-0739-454c-8b99-9f29ee974233	takeVitaminK30DaysBefore	40	10300	YNNS_NNS	\N
4b970ec0-b696-45c7-95c8-85641d003803	1721b2b0-0739-454c-8b99-9f29ee974233	haveAtrialFibExclusions	40	10400	value.length==0	\N
1b5cbd8f-dafa-43ee-9255-ebadea42e80c	1721b2b0-0739-454c-8b99-9f29ee974233	haveAtrialFibExclReq2	40	10500	value.length==0	\N
150ca558-67cb-43a4-ad1b-7a53131e4efd	1721b2b0-0739-454c-8b99-9f29ee974233	takeNSAIDsAF	40	10600	YNNS_NNS	\N
f151bab8-c5c8-4879-9b46-7f8a8172bf70	1721b2b0-0739-454c-8b99-9f29ee974233	haveHadStroke30Days	40	10700	YNNS_NNS	\N
52651807-3bc3-414e-956c-e353209b6bc9	1721b2b0-0739-454c-8b99-9f29ee974233	haveHadSurgery30Days	40	10800	YNNS_NNS	\N
2cd65975-25d0-496a-8d2a-7139677051f4	1721b2b0-0739-454c-8b99-9f29ee974233	takeHeartInterventionNextMonths	40	10900	YNNS_NNS	\N
8fbe1f05-a7dc-4066-98a9-e49ae52ced10	d8b76a43-2b72-4ea0-9dfe-1e5111de554e	birthDate	10	10100	age>=18&&age<=75	Must be between 18 and 75 years old
feead3ff-6a78-42ee-aea8-c1648561a67c	d8b76a43-2b72-4ea0-9dfe-1e5111de554e	pregnant	10	10300	YN_N	Must not be pregnant or nursing
0f1483e4-4da3-4190-b77c-217aeac847b3	d8b76a43-2b72-4ea0-9dfe-1e5111de554e	haveHepatitisC	10	10800	YNNS_NNS	\N
cce24b43-8b35-4d9a-878c-a6a2cd51f508	d8b76a43-2b72-4ea0-9dfe-1e5111de554e	haveHIV	10	10900	YNNS_NNS	\N
562a7d01-a517-4b3c-8300-79294fa7d920	562a7d01-a517-4b3c-8300-79294fa7d920	birthDate	10	10100	age>=18	Must be 18 or older
14fdcd56-1836-4ce7-a697-4e55568e4d5a	562a7d01-a517-4b3c-8300-79294fa7d920	haveMultipleMyeloma	30	10000	YNNS_YNS	A diagnostic of multiple myeloma
728a5de1-f321-49f2-b5fe-b3604bb31818	562a7d01-a517-4b3c-8300-79294fa7d920	tryedIMiD	40	10000	YNNS_YNS	Tried at least 1 immunomodulatory drug (IMiD)
e9a56235-42ae-48e5-b542-971f7a9d32ee	562a7d01-a517-4b3c-8300-79294fa7d920	tryedPI	40	10100	YNNS_YNS	Tried at least 1 proteasome inhibitor (PI)
a29b860d-21cf-491b-b110-bde7ca7b12ea	562a7d01-a517-4b3c-8300-79294fa7d920	tryedCD32mAB	40	10200	YNNS_YNS	Tried at least 1 monoclonal antibody (CD38 mAB)
ba719cfa-4879-4cf0-b423-433f1b8b914c	562a7d01-a517-4b3c-8300-79294fa7d920	tryedBCMA	40	10300	YNNS_YNS	Tried at least one B-cell maturation antigen (BCMA)-directed therapy
bca88766-0dd5-43cc-a160-d916c4c1f417	d8b76a43-2b72-4ea0-9dfe-1e5111de554e	haveAsthma	30	10000	YNNS_YNS	
0141b9ff-e600-44d3-bcfd-e368afe59e6e	d8b76a43-2b72-4ea0-9dfe-1e5111de554e	haveAsthmaGe1Year	30	10100	YNNS_YNS	Asthma diagnosis at least one year ago
bcf8b33e-2f88-4fff-a2e1-68e8525e2c1d	d8b76a43-2b72-4ea0-9dfe-1e5111de554e	takeAsthmaInhaler	30	10200	YNNS_YNS	Treatment using inhaler
015173d5-3d55-41df-9d77-9b8ece178c08	d8b76a43-2b72-4ea0-9dfe-1e5111de554e	countAsthmaAttacksPast1Year	30	10300	qty>=1	One or more crisis per year
927ff378-9604-469b-b24a-8869411fd082	d8b76a43-2b72-4ea0-9dfe-1e5111de554e	smokeOrVape	30	10400	YNNS_NNS	Do not smoke or vape
4115f119-c04d-4c5a-b1b5-555f411915db	d8b76a43-2b72-4ea0-9dfe-1e5111de554e	smokeOrVapeInPast	30	10500	\N	\N
624772e3-3b1b-46f3-b4b2-f75fc827a4b2	d8b76a43-2b72-4ea0-9dfe-1e5111de554e	haveTuberculosis2	40	10000	YNNS_NNS	No Tuberculosis
ad6f6b83-f026-498f-88cf-51a4deef5aa3	d8b76a43-2b72-4ea0-9dfe-1e5111de554e	haveCOPD	40	10100	YNNS_NNS	No Chronic obstructive pulmonary disease (COPD) or Emphysema
b0ba14d5-435b-4174-a702-de05c521b28d	04c744a1-8254-4037-8b5a-5760b2fb0daa	birthDate	10	10000	age>=18&&age<=70	Must be between 18 and 70 years old
3fdb8f59-f6c2-4382-95f3-47e2c394cac2	04c744a1-8254-4037-8b5a-5760b2fb0daa	pregnant	10	10200	YN_N	Not pregnant and not nursing
263847cd-18ff-4838-91e7-6bb149aaf52a	04c744a1-8254-4037-8b5a-5760b2fb0daa	tryingHaveChild	10	10300	YN_N	Must not be trying to have a child
14e25716-ca67-4fd6-9bf5-fcc7c87a996b	04c744a1-8254-4037-8b5a-5760b2fb0daa	haveType2Diabetes	30	10000	YNNS_YNS	Diagnostic of type 2 diabetes
bd29062b-98b3-4bb1-8d01-4a759ebcf8bf	04c744a1-8254-4037-8b5a-5760b2fb0daa	takeMetforminPlus500mgDaily	30	10100	YNNS_YNS	Taking 500 mg or more of metformin daily
a8a686c7-bd52-4964-ad94-4c17d9b40780	04c744a1-8254-4037-8b5a-5760b2fb0daa	takeDiabetesMeds	30	10200	\N	\N
40f64a63-2bf0-403a-9c48-21b4467aa64e	04c744a1-8254-4037-8b5a-5760b2fb0daa	haveNFAD	30	10300	\N	\N
0ebb3fdd-1442-4592-a1ab-0602f85761a9	04c744a1-8254-4037-8b5a-5760b2fb0daa	takeMRINot	40	10000	YNNS_NNS	
d33ef098-63f7-4055-8437-7c7d733f77b3	04c744a1-8254-4037-8b5a-5760b2fb0daa	takeIllegalDrugs	40	10100	YNNS_NNS	
19b3d358-56f5-4d02-9722-5659fa334766	04c744a1-8254-4037-8b5a-5760b2fb0daa	haveFertilityImpediment	40	10200	value.length==0	
e3068fca-f6ce-4ec1-81fb-f869ae347ca4	04c744a1-8254-4037-8b5a-5760b2fb0daa	haveStomachRemoved	40	10300	YNNS_NNS	
6e596a77-b446-4bad-a87c-36dd52b0c88b	04c744a1-8254-4037-8b5a-5760b2fb0daa	haveNFADImpediments1	40	10400	value.length==0	
445d1233-0be6-4ca7-a012-bf6f94509a9d	04c744a1-8254-4037-8b5a-5760b2fb0daa	haveNFADImpediments2	40	10500	YNNS_NNS	
0ac4f5ce-58dc-49d4-83a1-6a6e8c574b92	04c744a1-8254-4037-8b5a-5760b2fb0daa	haveNFADImpediments3	40	10600	YNNS_NNS	
f6fd6738-7369-4d9b-a7c0-10d768d73290	04c744a1-8254-4037-8b5a-5760b2fb0daa	haveNFADImpediments4	40	10700	YNNS_NNS	
5f478f9b-a592-4889-936b-33c33031a778	7f7e92ab-51a2-4e8b-bcaa-362d04bd00ad	birthDate	10	10100	age>=18	Must be 18 or older
98b20e2e-90c8-469b-bcfd-d408903298eb	7f7e92ab-51a2-4e8b-bcaa-362d04bd00ad	pregnant	10	10250	YN_N	Must not be pregnant or nursing
e1f06405-1c85-44a0-ad76-4b74d1c18d87	7f7e92ab-51a2-4e8b-bcaa-362d04bd00ad	ongoingTrials	10	10600	YN_N	Must not participate on other ongoing trials
111e837e-f806-4701-b03e-35ec9773efe9	7f7e92ab-51a2-4e8b-bcaa-362d04bd00ad	havePsoriaticArthritis	30	10100	YN_Y	Must have been diagnosed with Psoriatic Arthritis
af6196b0-d34d-4e30-927a-d05e14df6bc1	7f7e92ab-51a2-4e8b-bcaa-362d04bd00ad	havePsoriaticArthritisFor6Months	30	10200	YNNS_YNS	Must have had Psoriatic Arthritis for at least 6 months
0c0c8bf0-b68c-4d44-bb85-e49f6b8db6b7	7f7e92ab-51a2-4e8b-bcaa-362d04bd00ad	takeDmards2	30	10800	YNNS_NNS	Have not taken any disease modifying anti-rheumatic drugs
41b53198-f7d6-4373-98c4-3c2efa5f4188	7f7e92ab-51a2-4e8b-bcaa-362d04bd00ad	takeBiologics	30	11300	YNNS_NNS	No history of taking biologics
c7274876-c4ef-4019-a809-a5e7b3f8b416	7f7e92ab-51a2-4e8b-bcaa-362d04bd00ad	haveDrugOrAlcoholHistory	40	10000	YNNS_NNS	No history of chronic alcohol or drug abuse
44490a2e-999e-442c-9160-45eb802c16af	90646dda-d562-4c5c-b992-b5732d44943f	birthDate	10	10100	age>=18	Must be 18 or older
6296fad2-e390-4044-adae-3ddb29143bce	90646dda-d562-4c5c-b992-b5732d44943f	havePsoriaticArthritis	30	10100	YN_Y	Must have been diagnosed with Psoriatic Arthritis
c9e0adca-e318-46df-8e40-38bcaffebb25	90646dda-d562-4c5c-b992-b5732d44943f	havePsoriaticArthritisFor6Months	30	10200	YNNS_YNS	\N
780f73a9-6ed5-4b2c-ab6d-0138e3a24467	90646dda-d562-4c5c-b992-b5732d44943f	havePsoriasis	30	10300	YN_Y	Must have Active or Previous history of Psoriasis
86f83f8e-da31-400b-8970-2a8d5d23e1b0	90646dda-d562-4c5c-b992-b5732d44943f	haveInflaOrAutoImmuneConditionBesidesPsA	30	10500	YNNS_YNS	No other autoimmune disorder besides PsA
bbfc5f0f-1899-45c2-9735-36159b198ebd	90646dda-d562-4c5c-b992-b5732d44943f	takeBiologics	30	11300	YNNS_NNS	No history of taking biologics
7de29aab-7f78-4379-96d5-4eb73c90525e	90646dda-d562-4c5c-b992-b5732d44943f	haveGt3nfInhibitors	40	10000	YNNS_NNS	Must not have been treated with more than 3 different TNF inhibitors
75a748ca-080e-488e-b3fb-2d8179441fae	1ca49499-df7e-42d5-a13e-6a05ebee96be	birthDate	10	10100	age>=18	Must be 18 or older
cc2f3f8c-1079-4553-b1af-642554f2c12b	1ca49499-df7e-42d5-a13e-6a05ebee96be	pregnant	10	10250	YN_N	Must not be pregnant or nursing
bd06b365-4ced-4e7f-b978-6c10669dbe37	1ca49499-df7e-42d5-a13e-6a05ebee96be	havePsoriaticArthritis	30	10100	YN_Y	Must have been diagnosed with Psoriatic Arthritis
1b3cfcf9-3086-49ad-aae4-4cf6dd1d6709	1ca49499-df7e-42d5-a13e-6a05ebee96be	havePsoriasis	30	10300	YN_N	Must not have Active or Previous history of Psoriasis
8e0259a4-9687-4a01-8d6c-d183e5d31745	1ca49499-df7e-42d5-a13e-6a05ebee96be	haveInflaOrAutoImmuneConditionBesidesPsA	30	10500	YNNS_NNS	No other inflammatory conditions
7942be35-633c-40ee-a9d5-06305e787626	1ca49499-df7e-42d5-a13e-6a05ebee96be	haveCancerHistory	30	10700	YNNS_NNS	No cancer history
1f6481b5-18ab-4420-afb1-ee7959a6c6fc	1ca49499-df7e-42d5-a13e-6a05ebee96be	takeBiologics	30	11300	YNNS_NNS	No history of taking biologics
94274dd4-6cb2-4e9d-9c12-c4adf2b43559	1ca49499-df7e-42d5-a13e-6a05ebee96be	haveDrugOrAlcoholHistory	40	10000	YNNS_NNS	No history of chronic alcohol or drug abuse
deaf4f75-9322-48f4-8883-2e7002d25d23	1ca49499-df7e-42d5-a13e-6a05ebee96be	haveDepression	40	10100	YNNS_NNS	No major depression diagnosis
2a324b38-335b-4e27-ab3c-c741485638a6	01f1c1b4-be85-4d10-bb07-7741faae59eb	birthDate	10	10100	age>=18	Must be 18 or older
0dae59c4-fa54-4dbc-ba03-6ec45c997fb7	01f1c1b4-be85-4d10-bb07-7741faae59eb	pregnant	10	10250	YN_N	Must not be pregnant or nursing
ccb3115b-a753-4c43-b880-7b72fe90b717	01f1c1b4-be85-4d10-bb07-7741faae59eb	havePsoriaticArthritis	30	10100	YN_Y	Must have been diagnosed with Psoriatic Arthritis
ed9d87e0-16e7-48ef-93fc-2edcf6d53a12	01f1c1b4-be85-4d10-bb07-7741faae59eb	haveInflaOrAutoImmuneConditionBesidesPsA	30	10500	YNNS_NNS	No other autoimmune or inflammatory disorder besides PsA
f34150ec-d7bb-4087-b3f4-ab1740f06ab1	01f1c1b4-be85-4d10-bb07-7741faae59eb	haveCancerHistory	30	10700	YNNS_NNS	No cancer history
384ecaa0-9576-4c2b-8fb7-d2f74c40f647	01f1c1b4-be85-4d10-bb07-7741faae59eb	takeDmards2	30	10800	YNNS_NNS	Have not taken any disease modifying anti-rheumatic drugs
6c52b96d-737e-4fcc-8a65-656abb64650d	01f1c1b4-be85-4d10-bb07-7741faae59eb	takeBiologics	30	11300	YNNS_NNS	No history of taking biologics
bb8bcc9c-963c-4458-8403-ea6899c2b590	01f1c1b4-be85-4d10-bb07-7741faae59eb	haveTuberculosis3	40	10000	YNNS_NNS	No active tuberculosis (TB) infection
16029e51-d6bc-45f7-99d5-a3dc26ceabd4	f6792fa1-c2a4-4f93-be06-2558ad4a00b7	birthDate	10	10100	age>=18	Must be 18 or older
cdabf68a-d22c-40d4-b461-b41d811cb53c	f6792fa1-c2a4-4f93-be06-2558ad4a00b7	havePsoriaticArthritis	30	10100	YN_Y	Must have been diagnosed with Psoriatic Arthritis
c7cc6540-918d-4003-b302-395a365ef9d8	f6792fa1-c2a4-4f93-be06-2558ad4a00b7	havePsoriasis	30	10300	YN_N	Must not have Active or Previous history of Psoriasis
406bcfe6-b2e6-489f-81a6-829cf062df0e	f6792fa1-c2a4-4f93-be06-2558ad4a00b7	haveInflaOrAutoImmuneConditionBesidesPsA	30	10500	YNNS_NNS	No other autoimmune or inflammatory disorder besides PsA
944f022f-695d-4b21-80fd-28ca11279b1c	f6792fa1-c2a4-4f93-be06-2558ad4a00b7	takeDmards2	30	10800	YNNS_NNS	Have not taken any disease modifying anti-rheumatic drugs
127091b4-351e-4c52-95cd-c08c825e813e	f6792fa1-c2a4-4f93-be06-2558ad4a00b7	areYouChinese	40	10000	YNNS_YNS	Chinese patient
ede4226a-d765-40d9-a596-829c6fe2f71e	9ea9bd15-8062-4e53-a90b-5ee927b849c0	birthDate	10	10000	age>=18	Must be 18 or older
d8354ce3-4b90-4307-8b9d-c61587234159	9ea9bd15-8062-4e53-a90b-5ee927b849c0	havePsoriaticArthritis	30	10100	YN_Y	Must have been diagnosed with Psoriatic Arthritis
def069a9-ba90-4801-853b-f863820a33ef	9ea9bd15-8062-4e53-a90b-5ee927b849c0	havePsoriaticArthritisFor6Months	30	10200	YNNS_YNS	Active diagnosis within 6 months
e1f78374-bbfc-49ae-b7a6-5bcf3355c1fe	9ea9bd15-8062-4e53-a90b-5ee927b849c0	haveInflaOrAutoImmuneConditionBesidesPsA	30	10500	YNNS_NNS	No other autoimmune or inflammatory disorder besides PsA
1ebc7cd1-e5d1-42d9-9204-86b5652290f0	9ea9bd15-8062-4e53-a90b-5ee927b849c0	haveCancerHistory	30	10700	YNNS_NNS	No cancer history
cf724660-3710-4d53-a720-1f8549ee9c88	9ea9bd15-8062-4e53-a90b-5ee927b849c0	takeDmards2	30	10800	YNNS_NNS	Have not taken any disease modifying anti-rheumatic drugs
fe3f5eb0-1471-443d-b6e8-039a51223f61	9ea9bd15-8062-4e53-a90b-5ee927b849c0	takeBiologics	30	11300	YNNS_NNS	No history of taking biologics
e6407b6f-0aae-4ee3-a423-e2caa2c50029	05ca265b-6b41-4f7b-b00d-c63c4b9ebcc5	birthDate	10	10100	age>=18	Must be 18 or older
8a8ff894-4067-4066-a346-a2ec0b98732a	05ca265b-6b41-4f7b-b00d-c63c4b9ebcc5	haveJAKExposure	40	10100	YNNS_NNS	No prior exposure to any Janus Kinase inhbitor
47d53bef-a67d-4d00-8516-e70ff4866f29	05ca265b-6b41-4f7b-b00d-c63c4b9ebcc5	haveFibromyalgia	40	10200	YNNS_NNS	No fibromyalgia diagnosis
552280bc-2445-4915-994a-d769464f0dde	05ca265b-6b41-4f7b-b00d-c63c4b9ebcc5	havePsoriaticArthritis	30	10000	YN_Y	Must have been diagnosed with Psoriatic Arthritis
b34fb706-7691-43ed-8299-707157029b6b	05ca265b-6b41-4f7b-b00d-c63c4b9ebcc5	havePsoriaticArthritisFor6Months	30	10100	\N	\N
fb088012-705a-4db4-bbc0-d8bb7a97818c	05ca265b-6b41-4f7b-b00d-c63c4b9ebcc5	havePsoriasis	30	10200	\N	\N
2d8a1ffa-b6bf-4d27-8b93-29333d4fe633	05ca265b-6b41-4f7b-b00d-c63c4b9ebcc5	takeDmards2	30	10300	YNNS_NNS	Have not taken any disease modifying anti-rheumatic drugs
48b59778-7cbb-4880-9770-54bf795ff362	05ca265b-6b41-4f7b-b00d-c63c4b9ebcc5	haveInflaOrAutoImmuneConditionBesidesPsA	30	10400	YNNS_YNS	Must have other autoimmune or inflammatory disorder besides PsA
29ab22ab-b487-4862-bb41-43900426c301	05ca265b-6b41-4f7b-b00d-c63c4b9ebcc5	haveCancerHistory	30	10500	YNNS_NNS	No cancer history
1f1c9066-13cc-463d-b6ef-af0a6618020c	05ca265b-6b41-4f7b-b00d-c63c4b9ebcc5	takeBiologics	30	10600	\N	\N
f19d1baa-a5ef-4f05-bc5b-bfd35d5ae311	62293111-a28f-4663-826b-88581640a18d	birthDate	10	10100	age>=18	Must be 18 or older
da24ff59-354f-4ee1-82dd-86a14394da2d	62293111-a28f-4663-826b-88581640a18d	havePsoriaticArthritis	30	10000	YN_Y	Must have been diagnosed with Psoriatic Arthritis
658e695d-7db2-4f82-b5aa-766d637447d1	62293111-a28f-4663-826b-88581640a18d	havePsoriaticArthritisFor6Months	30	10100	YNNS_YNS	Must have PsA symptoms for at least 6 months
d63f3138-7512-4f79-b94a-aeecd3c30cd9	62293111-a28f-4663-826b-88581640a18d	havePsoriasis	30	10200	\N	\N
66cc34e0-5083-4baa-96c2-b56a0f3a2e3d	62293111-a28f-4663-826b-88581640a18d	takeDmards2	30	10300	YNNS_NNS	Have not taken any disease modifying anti-rheumatic drugs
115980ac-a1a4-4f66-bd5a-33dd5ef886fc	62293111-a28f-4663-826b-88581640a18d	haveInflaOrAutoImmuneConditionBesidesPsA	30	10400	YNNS_NNS	No other autoimmune or inflammatory disorder besides PsA
6d2b59f9-f52e-4a3d-bc73-4563c2e5005f	62293111-a28f-4663-826b-88581640a18d	haveCancerHistory	30	10500	YNNS_NNS	No cancer history
d78d4c6a-092e-4799-880d-bd39abccb130	62293111-a28f-4663-826b-88581640a18d	takeBiologics	30	10600	\N	\N
23b1a2df-192d-4768-b616-8499c547da3c	62293111-a28f-4663-826b-88581640a18d	haveJAKExposure	40	10100	YNNS_NNS	No prior exposure to any Janus Kinase inhbitor
35d8ea7a-80cb-4005-aafb-b7b7b7db123f	62293111-a28f-4663-826b-88581640a18d	haveFibromyalgia	40	10200	YNNS_NNS	No fibromyalgia diagnosis
c2100ea4-ef0c-49f5-9b8c-e4b1a00fe377	d4228287-2707-46a7-9a7c-5f874d375921	birthDate	10	10100	age>=18	Must be 18 or older
67e0718e-fe9d-4e93-b7d5-958544c909d9	d4228287-2707-46a7-9a7c-5f874d375921	havePsoriaticArthritis	30	10000	YN_Y	Must have been diagnosed with Psoriatic Arthritis
2a279d5c-cc80-48c0-a43c-1146f1c66ae3	d4228287-2707-46a7-9a7c-5f874d375921	havePsoriaticArthritisFor6Months	30	10100	\N	\N
62a33d29-f81d-4594-ae5b-c7a7a733830a	d4228287-2707-46a7-9a7c-5f874d375921	havePsoriasis	30	10200	\N	\N
c178e767-e8a5-40c1-9841-10f0639fda9e	d4228287-2707-46a7-9a7c-5f874d375921	takeDmards2	30	10300	YNNS_NNS	Have not taken any disease modifying anti-rheumatic drugs
f6728530-bb92-4d63-832e-563f9e3db603	d4228287-2707-46a7-9a7c-5f874d375921	haveInflaOrAutoImmuneConditionBesidesPsA	30	10400	YNNS_YNS	Must have other autoimmune or inflammatory disorder besides PsA
fd84268a-7b1b-49ba-80a3-3188255d87c4	d4228287-2707-46a7-9a7c-5f874d375921	haveCancerHistory	30	10500	YNNS_NNS	No cancer history
4acb2d3c-3f1b-4af8-acea-b79887599170	d4228287-2707-46a7-9a7c-5f874d375921	takeBiologics	30	10600	\N	\N
7ec18a27-473c-49fb-bb5b-03d3f5755f6f	fc5f14c1-13fd-40c2-8210-8e8bb1c054ae	birthDate	10	10000	age>=18&&age<=75	Between 18 years old and 75 years old
25b6eca2-049c-42fa-86b0-2f0f2f0519e2	fc5f14c1-13fd-40c2-8210-8e8bb1c054ae	pregnant	10	10200	YN_N	Not pregnant or nursing
fc0449c1-34d8-45d6-be72-ffe9e5966531	fc5f14c1-13fd-40c2-8210-8e8bb1c054ae	haveUc	30	10000	YN_Y	Confirmed diagnosis of Ulcerative Colitis
e43329c3-04d2-4eea-8126-698ecd849bb1	fc5f14c1-13fd-40c2-8210-8e8bb1c054ae	haveUcGt3M	30	10100	YN_Y	Diagnosis of Ulcerative Colitis for at least 3 months
c481fb6a-e7d0-4d91-bd7d-97e4a46348a1	fc5f14c1-13fd-40c2-8210-8e8bb1c054ae	haveCd	30	10200	YNNS_NNS	No current diagnosis of Crohn's disease (CD), inflammatory bowel disease. No history of other type of colitis.
5f1b33a7-0cc3-4926-8084-0b060c7b6718	fc5f14c1-13fd-40c2-8210-8e8bb1c054ae	haveCancerHistory	30	10300	YNNS_NNS	No history of cancer
2ceeb220-d92d-4e06-9bd1-8d08e56fd84c	fc5f14c1-13fd-40c2-8210-8e8bb1c054ae	haveTuberculosis4	40	10400	YNNS_NNS	No active tuberculosis (TB) infection
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
-- Data for Name: generalhealthinformationquestiontype; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.generalhealthinformationquestiontype (id, ordering, questiontype) FROM stdin;
61aba9a5-3347-4d82-9ab2-688a07728e57	10100	birthDate
e077594f-53af-4fd9-880b-54d655f5b382	10200	gender
157d66f4-56fb-4b17-bc12-3474a4e05b51	10300	pregnant
c0ef25f2-6a37-47cc-b799-6eed327ac493	10400	tryingHaveChild
1fc20c46-5f80-4ce0-ab69-836d2e7ea80a	10500	height
f91f669b-02fa-4768-9141-5f34c54003c4	10600	weight
78471a58-41b4-4956-857c-970dbb1472ae	10700	ongoingTrials
a40a48ec-a23e-4a94-9115-1470ff47d159	10800	haveHepatitisB
891827b5-d913-432d-b3cb-d44fc811870a	10900	haveHepatitisC
69c68491-2dba-4e25-bd0c-e6484b285e47	11100	haveHIV
07df575f-21ad-4d34-bcde-108b80559b86	11200	haveCardiac
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

COPY public.matchrequest (keyssi, dsudata, matchresult, createdon) FROM stdin;
\.


--
-- Data for Name: matchresult; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.matchresult (keyssi, dsudata) FROM stdin;
\.


--
-- Data for Name: medicalcondition; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.medicalcondition (code, name) FROM stdin;
2315	Back pain
3982	Abdominal pain
374	High blood pressure (hypertension (HTN))
2208	Chest pain
2143	Diabetes mellitus (DM)
2281	Urinary tract infection (UTI)
2179	Headache
3850	Hypertension - essential
2289	Pregnant
11192	Lower back pain
4591	Cut (laceration)
2166	Depression
9808	Knee pain
2231	Upper respiratory infection (URI)
9590	Toothache
2236	Cough
366	Asthma
2235	Shortness of breath (dyspnea)
18963	Bronchitis - acute
2876	Sore throat (pharyngitis)
22012	Sinusitis - acute
2225	Cellulitis
2202	Ear infection (otitis media)
2296	Abscess
9689	Shoulder pain
4362	Esophageal reflux (GERD)
21955	Motor vehicle accident (MVA)
5117	Neck pain
3951	Bronchitis
2898	Anxiety
2304	Rash
10180	Diabetes - type 2 (adult, non-insulin-independent)
11185	Hypertension - benign essential
2864	Leg pain
18252	Vaginosis - bacterial
368	Pneumonia
2234	Hay fever (allergic rhinitis)
2167	Abuse - alcohol
2212	Coronary artery disease (CAD)
364	Chronic obstructive pulmonary disease (COPD)
4366	Dizziness
2365	Sinus infection (sinusitis)
2256	Diarrhea
8192	Viral infection
4458	Gastroenteritis
2261	Vomiting
2142	Hypothyroidism
23373	Ankle/foot pain
8762	Hip pain
365	Congestive heart failure (CHF)
2327	Fever
2147	Lipids - high (hyperlipidemia)
1981	Osteoarthritis
11229	Chest discomfort
2176	Migraine
2122	Vulvovaginitis - candidal
2329	Fatigue
2257	Constipation
8324	Cholesterol - high
9921	Ankle sprain
8271	Blood sugar - high
9691	Pelvic pain
2187	Conjunctivitis
2180	Fainting (syncope)
4606	Burn
30030	Suicidal ideation
11896	COPD exacerbation
9853	Uterine bleeding - abnormal
2175	Seizure disorder
23454	Foot pain
10202	Bruise (contusion)
2118	Strep throat (Streptococcal pharyngits)
10181	Diabetes - type 1 (juvenile, insulin-dependent)
2201	Ear pain
2490	Foot or leg swelling (edema)
4237	Vaginal bleeding
9991	Ear infection - short-term (otitis media - acute)
371	Dermatitis
9706	Tooth abscess
6536	False labor
2958	Arm pain
3919	Dermatitis - contact
14673	Hepatitis C
2484	Viral flu syndrome
2948	Vaginal discharge
9411	Muscle strain
15780	Mental state - altered
9772	Sore throat
2241	Dental cavities
4245	Flank pain
8594	Hypertension - uncontrolled
2302	Acne
29957	Lower leg injury
2203	Swimmer's ear (otitis externa)
372	Urethritis
26600	Hand pain
3226	Head injury
2204	Vertigo
4502	Sciatica
2895	Palpitations
11459	Kidney failure (long-term renal failure)
4316	Epigastric pain
2929	Renal stone
22009	Tonsillitis - acute
9130	HIV positive
26599	Wrist pain
2944	Vaginitis
2189	Eye pain
2287	Heavy menstrual bleeding (menorrhagia)
2319	Joint pain (arthralgia)
2254	Hemorrhoids
2144	Obesity
4950	Folliculitis
8055	AIDS
23534	Carpal tunnel syndrome
29955	Hand injury
13006	Miscarriage
2318	Swelling (edema)
3842	Nausea
29959	Shoulder or upper arm injury
2901	Insomnia
902	Painful urination (dysuria)
22823	Atopic dermatitis
2285	Cervicitis
7286	Prematurity
9830	Pap smear - abnormal
2303	Hives (urticaria)
2177	Stroke
2299	Eczema
2937	Urinary incontinence
2325	Weight loss
10698	Onychomycosis
2270	Pancreatitis - acute
2278	Kidney infection (pyelonephritis)
3227	Blood in urine (hematuria)
8236	Fibromyalgia
4138	Paresthesia
11188	Hand fracture
9985	Conjunctivitis - acute
4945	Psychosis
4232	Tendonitis
4131	Gunshot wound (GSW)
10040	Radiculopathy
2284	Pelvic inflammatory disease (PID)
2879	Nosebleed (epistaxis)
9734	Epilepsy
9886	Plantar fasciitis
2305	Itching (pruritus)
2939	Gastrointestinal bleeding
4373	Cigarette smoker
6709	Scabies
10038	Hernia - inguinal
4894	Boil (furuncle)
8224	Breast pain
2151	Anemia - iron deficiency
9891	Ankle fracture
2313	Gout
2488	Menstrual cramps (dysmenorrhea)
2342	Breast cancer
4393	Blood sugar - low
9438	Loss of feeling (numbness)
4127	Liver (hepatic) function tests abnormal
9561	Back strain
3981	Kidney (renal) insufficiency - long-term
2300	Shingles (herpes zoster)
6713	Behavior problem - child
2164	Schizophrenia
4270	Tuberculosis skin test (PPD) reactive
9417	Rectal bleeding
4323	Breast mass
4046	Muscle aches (myalgia)
6686	Dog bite
4236	Costochondritis
11458	Kidney failure (short-term renal failure)
2286	Absence of menstrual periods (amenorrhea)
8600	Sleep apnea
9926	Muscle spasm
7344	Cerumen impaction
11897	Angina - unstable
11456	Pyelonephritis - acute
9696	Corneal abrasions
21808	Skin neoplasm - uncertain behavior
2946	Dysfunctional uterine bleeding (DUB)
2311	Rheumatoid arthritis (RA)
2181	Neuropathy
9937	Athlete's foot (tinea pedis)
26601	Toe pain
2903	Drug abuse - mixed
13033	Hematochezia
2298	Psoriasis
4958	Toxicity - alcohol
21776	Toenail infection (paronychia)
23052	Morbid obesity
23374	Elbow pain
23194	Sinusitis - chronic
9895	Finger fracture
10249	Stab wound
2280	Urinary frequency
2141	Hyperthyroidism
8572	Reactive airway disease (RAD)
17501	Alcohol abuse - continuous
21806	Wound infection - postoperative
9939	Ringworm (tinea corporis)
2223	Deep vein thrombosis (DVT)
2881	Difficulty swallowing (dysphagia)
9839	Menstrual cycle - irregular
2314	Bursitis
9366	Pharyngeal exudates
8800	Chlamydia infect
9727	Hordeolum
2267	Liver cirrhosis
4648	Drug overdose
2161	Lymph node enlargement (lymphadenopathy)
6699	Bronchiolitis
5629	Nail infection (paronychia)
4229	Peripheral vascular disease
9703	Poison ivy
7162	Animal bite
2217	Angina pectoris
8515	Nose stuffy
8575	Epididymitis
2078	Gallstones (cholelithiasis)
9441	Jaw pain
17204	Major depression - recurrent
4925	Diabetic ketoacidosis (DKA)
5466	Appendicitis
2283	Benign prostatic hypertrophy (BPH)
10022	Onychogryphosis
4318	Hearing loss
4238	Dementia
21780	Dermatitis - seborrheic
19942	Foot ulcer - diabetic
10692	Wart - common (verruca vulgaris)
26607	Knee sprain
4363	Potassium - high (hyperkalemia)
10633	Ingrown nail
13348	Cocaine abuse
4230	Cardiomyopathy
2963	Tremor
30572	Asthma - mild persistent
6694	Croup
9881	Nevus
9878	Keratosis - seborrheic
18016	Peripheral neuropathy
2899	Schizophrenia - paranoid
9410	Headache - tension
30573	Asthma - moderate persistent
17196	Schizoaffective disorder
2251	Colon diverticulitis
30571	Asthma - mild intermittent
10190	Skin lesion
9994	Conjunctivitis - allergic
6705	Thrush (oral candidiasis)
22353	Difficulty walking
2238	Pleuritic pain
10852	Genital herpes
12928	Panic attack
4848	Urinary tract infection recurrent
9705	Neuropathy - diabetic
2129	Lung cancer
8586	Wheezing
17209	Bipolar disorder - mixed
3968	Hair loss (alopecia)
9427	Radius fracture
5585	Impetigo
4933	Hypotension
9861	Cervical dysplasia
26598	Finger pain
2904	Bells palsy
10037	Hernia - ventral
17207	Bipolar disorder - manic phase
9419	Jaw fracture
2272	Gallbladder inflammation (cholecystitis)
9894	Foot fracture
22007	Cervical sprain
18051	Metatarsal bone - plantar flexed
21792	Skin tag
7397	Pain - neuropathic
9936	Ringworm - scalp (tinea capitis)
17488	Generalized anxiety disorder (GAD)
2178	Transient ischemic attack
11189	Wrist fracture
9577	Rectal pain
19394	Biliary colic
9606	Concussion
3918	Lipoma
4952	Oxygen - low (hypoxia)
2233	Pulmonary embolism
9799	Ethanol withdrawal
8576	Testicular pain
11211	Irritable bowel syndrome
9893	Humerus fracture
4697	Basal cell cancer
2237	Pulmonary mass
2317	Osteoporosis
2260	Crohns disease
375	Bone infection (osteomyelitis)
11145	Alzheimer's disease
4231	Indigestion (dyspepsia)
8544	Sputum production
9877	Keratosis - actinic
9920	Wrist sprain
9425	Fibula fracture
4364	Fluid in the ear (otitis media - serous)
7936	Hallucinations
7402	Callus
3742	Heart rate - rapid (tachycardia)
8347	Pancreatitis - chronic
3232	Leg cramps
2191	Vision disorder
4234	Genital warts
2134	Colorectal cancer
2239	Coughing up blood
9892	Toe fracture
2933	Urine retention
2878	Hoarse
9421	Facial bone fracture
5539	Sepsis
7400	Bunion
9938	Tinea versicolor
2487	Ovaries - cystic
2227	Foot ulcer
9896	Clavicle fracture
4386	Hematemesis
9432	Jock itch (tinea cruris)
4949	Scar - keloid
9837	Bartholin's gland cyst
9412	Cystitis
29952	Eye injury
9946	Nasal fracture
2182	Multiple sclerosis (MS)
8199	Flu (Influenza)
9897	Spinal stenosis
4457	Neck mass
9375	Maculopapular rash
27204	Heel pain
17208	Bipolar disorder - depressed phase
19932	Shoulder dislocation
29984	Vaginal itch
4019	Penile discharge
2120	Gonorrhea
2934	Renal colic
4588	Ganglion cyst
9941	Conjunctivitis - bacterial
16365	Vision - blurred
11148	Common cold
6142	Suicide attempt
12871	Restless legs
3954	Potassium - low (hypokalemia)
10691	Plantar wart (verruca plantaris)
6211	Chest trauma
10642	Systemic lupus erythematosus (SLE)
3367	Small bowel obstruction
21809	Soft tissue neoplasm - uncertain behavior
6436	Hidradenitis
8223	Visible blood in urine (gross hematuria)
9613	Rash - papular
9424	Tibia fracture
29971	Eye foreign body
7934	Pregnancy - ectopic
9840	Ovaries - polycystic
8150	Triglycerides - high
16553	Rib fracture
2932	Prostatitis
5399	Eardrum - ruptured (perforated tympanic membrane)
9899	Tennis elbow (epicondylitis)
2949	Pityriasis rosea
14273	Head & neck cancer
9858	Severe vomiting during pregnancy (hyperemesis)
1969	Sarcoidosis
10195	Erectile dysfunction (ED)
10183	Pleurisy
5098	Diaper rash
3857	Hypertension - malignant essential
9907	Hammer toe
2672	Pelvic mass
9948	Epidermal inclusion cyst
9362	Conjunctiva - red
9917	Shoulder strain
2470	Lupus erythematosus
15759	Conjunctival hemorrhage
17654	Attention deficit hyperactivity disorder (ADHD/ADD)
3970	Hepatitis
10579	Rosacea
10893	Eustachian tube dysfunction
2870	Thyroid gland - enlarged (goiter)
8874	Respiratory failure
21812	Subcutaneous nodules
2200	Ears - ringing (tinnitus)
13800	Thrombophlebitis - superficial
9935	Venous stasis ulcer
3628	Heart rate - slow (bradycardia)
9724	Leg ulcer
3442	Intervertebral disc degeneration
4934	Sexual assault
9399	Hernia - umbilical
4610	Angioedema
3238	Proteinuria
3335	Ascites
9085	Lymph node inflammation (lymphadenitis)
9914	Cervical spondylosis
8238	Muscle cramps
4506	Perirectal abscess
4660	Sodium - low (hyponatremia)
9947	Lichen simplex chronicus
9409	Decubitus ulcer
2224	Claudication
4378	Intervertebral disc - herniated
9906	Elbow fracture
29956	Hip or thigh injury
9505	Obstructive sleep apnea (OSA)
9423	Femur fracture
22725	Eczema - dyshidrotic
2222	Varices
9844	Urinary stress incontinence - female
9365	Pharyngeal erythema
9429	Gingivitis
5630	Failure to thrive
9733	Rotator cuff tear
8286	Ear foreign body
3320	Neoplasm - benign
2482	Canker sore
6716	Balanitis
8177	Confusion
14674	Hepatitis B
26947	Overweight
2248	Peptic ulcer
3978	Heart murmur
8340	Tonsillar abscess
8536	Colitis
8193	Laryngitis
9416	Orbital blowout fracture
18010	Ulnar neuropathy
6690	Torticollis
8231	Intertrigo
6665	Bacteremia
11195	Radius/ulna fracture
3398	Foreign body
9099	Molluscum contagiosum
2485	Dyspareunia
10679	Dermatitis - stasis
2140	Thyroid nodule
10021	Hip fracture
8810	Vaginitis - atrophic
10042	Postconcussion syndrome
6836	Vaginal delivery - spontaneous
1963	Collapsed lung (pneumothorax)
2297	Seborrhea
2232	Pleural effusion
10653	Eczema - nummular
19523	Cervical vertebra fracture
10206	Goiter - multinodular
8512	Bruise - large (ecchymosis)
2938	Impotence
9422	Tooth fracture
26608	Finger sprain
2464	Platelets - low (thrombocytopenia)
9418	Rhinitis - chronic
7364	Mastitis
11604	Gastroparesis
9604	Vision - diminished
2935	Polyuria
5291	Abortion
9186	Temporomandibular joint syndrome (TMJ)
4247	Thyroid abnormality other
2905	Ataxia
2961	Nerve entrapment syndrome
30574	Asthma - severe persistent
9918	Shoulder sprain
2062	Esophagitis
8591	Excessive sleepiness (somnolence)
21778	Feeding problem
2885	Aortic stenosis
3846	Osteopenia
2252	Colitis - ulcerative
9819	Seizures - complex partial
11217	Tibia/fibula fracture
2193	Iritis
2919	Prostate cancer
2145	Calcium - high
13534	Sexually transmitted disease (STD)
9615	Macular rash
2908	Subdural hematoma
9021	Emphysema
9586	Blister
2717	Pulmonary edema
9855	Hypertension with pregnancy
2943	Endometriosis
6706	Bilirubin - high
15456	Hernia - incisional
2192	Chalazion
9933	Head lice (pediculosis capitis)
10622	Hyperpigmentation
19214	Heartburn
2174	Parkinsons
5116	Herpes gingivostomatitis
3230	Nearsightedness (myopia)
4693	Runny nose (rhinorrhea)
6680	Scarlet fever
389	Colon diverticulosis
100100	Ankylosing spondylitis
100110	non-radiographic axial spondyloarthritis
101000	Psoriatic arthritis
102000	Atrial fibrillation
103000	Multiple myeloma
104000	Non-alcohol fatty liver disease (NAFLD)
105000	Ulcerative Colitis
\.


--
-- Data for Name: medicalconditionquestiontype; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.medicalconditionquestiontype (id, ordering, questiontype, medicalcondition) FROM stdin;
509ab13f-dcc4-40cf-80f9-568e2b4dc817	10100	havePsoriaticArthritis	101000
487999a2-c977-4a4e-9410-ff34e73ef9d1	10200	havePsoriaticArthritisFor6Months	101000
ad4540f6-6308-43eb-ad2f-e8254d2988cc	10300	havePsoriasis	101000
215b06a8-13e5-4fda-af6e-1d8889e3ba0e	10400	takeDmards2	101000
0a766a7c-ddd3-414c-ad9a-67950b79fccb	10500	haveInflaOrAutoImmuneConditionBesidesPsA	101000
a14a0640-a7ff-4fbf-a311-a01534ac860f	10700	haveCancerHistory	101000
8371ee36-76a4-4960-817c-b5a9c7deb39d	11300	takeBiologics	101000
a6bdd411-2eed-4319-89e3-ab39f490af3a	10100	haveAxSpa	100100
181c380a-0257-401e-9d25-3837420267f6	10200	haveAxSpaXRay	100100
b6f9fad8-52ab-48b0-be9b-fd5d0da0e1d4	10300	backPainAge	100100
b96fda87-a2e1-4c84-b5e5-e72db7cfe9ef	10500	haveAxSpABefore45	100100
49787b62-efe3-468e-8a40-9d7bd3428a49	10100	haveAsthma	366
96d95b4b-5dd6-4251-9287-8784e086b6c0	10200	haveAsthmaGe1Year	366
6c69bb10-4882-4e88-8c07-0e52e6e584c6	10300	takeAsthmaInhaler	366
0e4fc068-9bc5-4e28-a2b9-801b6d1cc278	10400	countAsthmaAttacksPast1Year	366
596f44e7-e09d-472c-bae3-53ce791bf627	10500	smokeOrVape	366
e503687c-3e48-438d-b5e6-ed8a1a4a73a6	10600	smokeOrVapeInPast	366
101b6ccb-a6a3-4df5-bac9-bfdd9f39f43a	10100	haveAtrialFibrilation	102000
09aa497f-0cbd-4256-9952-4650dfa36b44	10200	haveCHA2DS2_VAScGe2	102000
e7ecee20-9638-40cd-bad4-f97b1036a0bb	10300	haveCHA2DS2_VAScGe3	102000
0d6e1801-98c4-485d-894f-6106b6fdeb90	10100	haveMultipleMyeloma	103000
17a0eb41-9b50-4d0a-9325-03817711843a	10100	haveType2Diabetes	104000
7ef7b560-f2b4-4638-9c85-8b18c485bda8	10200	takeMetforminPlus500mgDaily	104000
433f7fee-f6ea-47df-b026-4fe576deebc2	10300	takeDiabetesMeds	104000
67b4f240-19bd-43f1-93b4-4b145415af3b	10400	haveNFAD	104000
b50e5dd6-16f3-40a5-b90c-03f640a785dc	10100	haveUc	105000
06264e88-ee81-4667-b075-cd14cfa91a28	10200	haveUcGt3M	105000
08f5175e-d5ab-4a3a-b97a-bd31a3030369	10300	haveCd	105000
7307435a-d2ad-435b-9523-be51a36f8894	10400	haveCancerHistory	105000
\.


--
-- Data for Name: questiondatatype; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.questiondatatype (code, description) FROM stdin;
DT	Date
CNE	Choice list with No Exceptions
QTY	Quantity
REAL	Decimal number
ST	String (one line of text)
TITLE	Display informative text (from the question text)
TX	String (multiple lines of text)
YN	Choice list with No Exceptions Yes / No
YNNS	Choice list with No Exceptions Yes / No / Not sure or prefer not to answer
\.


--
-- Data for Name: questiontype; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.questiontype (localquestioncode, question, codinginstructions, datatype, answercardinalitymin, answercardinalitymax, answers, externallydefined, units, restrictions, criteria, skiplogic) FROM stdin;
birthDate	What is your birth date?	\N	DT	1	1	\N	\N	\N	\N	\N	\N
gender	What is your gender?	\N	CNE	1	1	[{"code": "M", "text": "Male", "label": null, "score": null, "system": null}, {"code": "F", "text": "Female", "label": null, "score": null, "system": null}]	\N	\N	\N	\N	\N
pregnant	If female, are you pregnant or nursing, or may become pregnant?	\N	YN	1	1	\N	\N	\N	\N	\N	{"logic": "ALL", "action": "show", "conditions": [{"source": "gender", "trigger": {"value": {"code": "F"}}}]}
height	What is your height?	\N	REAL	1	1	\N	\N	[{"name": "cm"},{"name": "[in_i]"}]	\N	\N	\N
weight	What is your weight?	\N	REAL	1	1	\N	\N	[{"name": "kg"},{"name": "[lb_av]"}]	\N	\N	\N
ongoingTrials	Are you participating on any ongoing trials?	\N	YN	1	1	\N	\N	\N	\N	\N	\N
tryingHaveChild	If male, are you and a partner currently trying to become pregnant?	\N	YN	1	1	\N	\N	\N	\N	\N	{"logic": "ALL", "action": "show", "conditions": [{"source": "gender", "trigger": {"value": {"code": "M"}}}]}
haveHepatitisB	Do you have hepatitis B?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveHepatitisC	Do you have hepatitis C?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveHIV	Do you have HIV?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveCardiac	Have you experienced acute heart failure or do you have any severe cardiac conditions?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveRheumatoidArthritis	Have you being diagnosed with rheumathoid arthritis?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
takeMethotrexate	Are you taking methotrexate or have you taken it in the last 12 months?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
takeDmards	Have you taken any disease modifying anti-rheumatic drugs (DMARDs)?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveTuberculosis	Have you active or latent tuberculosis?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
takenOralAntibioctics	Have you taken oral antibioctics?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
smokeCigarettes	Do you smoke cigarettes?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveLiverDisease	Do you have a history of kidney or liver disease?	\N	CNE	1	1	[{"code": "yesBoth", "text": "Yes, both", "label": null, "score": null, "system": null}, {"code": "noNeither", "text": "No, neither", "label": null, "score": null, "system": null}, {"code": "onlyLiverDesease", "text": "Only Liver disease", "label": null, "score": null, "system": null}, {"code": "onlyKidneyDesease", "text": "Only Kidney disease", "label": null, "score": null, "system": null}]	\N	\N	\N	\N	\N
haveAutoimmuneBesidesRheuArth	Have you being diagnosed with any autoimmune diseases besides rheumathoid arthritis?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveNeurologicalDiseases	Have you being diagnosed with any neurological diseases?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
claustrophobic	Are you claustrophobic?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
titlePf06650833	Clinical Trial: Safety and Efficacy of Pf-06650833 In Subjects With Rheumatoid Arthritis, With An Inadequate Response to Methotrexate	\N	TITLE	0	1	\N	\N	\N	\N	\N	\N
sessivityToAdalimuamab	Do you have a sensitivity to adalimuamab?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
remissionRheumatoidArthritis	Has your rheumatoid arthritis gone into remission in the last 6 months?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveAxSpa	Have you being diagnosed with Axial Spondyloarthritis?	\N	CNE	1	1	[{"code": "yesAxSpA", "text": "Yes, I have Ankylosing Spondylitis (AS)", "label": null, "score": null, "system": null}, {"code": "yesNrAxSpA", "text": "Yes, I have non-radiographic Axial Spondyloarthritis (nr-axSpA)", "label": null, "score": null, "system": null}, {"code": "yesUnspec", "text": "Yes, I have total ankylosis of the spine", "label": null, "score": null, "system": null}, {"code": "noNotSure", "text": "No, or I am not sure.", "label": null, "score": null, "system": null}]	\N	\N	\N	code!="noNotSure"&&code!="yesUnspec"	\N
haveAxSpaXRay	Did your doctor perform an x-ray to confirm your diagnosis of Ankylosing Spondylitis (AS)?	\N	YNNS	1	1	\N	\N	\N	\N	code=="yes"	{"logic": "ALL", "action": "show", "conditions": [{"source": "haveAxSpa", "trigger": {"value": {"code": "yesAxSpA"}}}]}
backPainAge	Can you please confirm how long you have had back pain?	\N	CNE	1	1	[{"code": "0-2", "text": "0-2 months", "label": null, "score": null, "system": null}, {"code": "3-4", "text": "3-4 months", "label": null, "score": null, "system": null}, {"code": "5+", "text": "5 months or more", "label": null, "score": null, "system": null}, {"code": "noBackPain", "text": "I don't have back pain.", "label": null, "score": null, "system": null}]	\N	\N	\N	code=="3-4"||code=="5+"	\N
haveAxSpABefore45	Did your axSpA begin before the age of 45?	\N	CNE	1	1	[{"code": "yes", "text": "Yes", "label": null, "score": null, "system": null}, {"code": "no", "text": "No", "label": null, "score": null, "system": null}, {"code": "NA", "text": "Not applicable", "label": null, "score": null, "system": null}, {"code": "notSure", "text": "Not sure", "label": null, "score": null, "system": null}]	\N	\N	\N	code=="yes"	\N
usingNSAIDS	Can you please confirm if you have tried using NSAIDS to relieve your pain and inflammation? NSAIDS are non-steroidal anti-inflammatory drugs, the mostcommon being Advil (ibuprofen).	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
responseNSAIDS	How would you describe your response to the NSAID therapy?	\N	CNE	1	1	[{"code": "CR", "text": "I experienced complete relief", "label": null, "score": null, "system": null}, {"code": "SR", "text": "I experienced some relief", "label": null, "score": null, "system": null}, {"code": "NR", "text": "I didn’t experience any relief", "label": null, "score": null, "system": null}, {"code": "PW", "text": "My pain worsened", "label": null, "score": null, "system": null}, {"code": "AL", "text": "I had to stop taking the NSAIDS due to a reaction/allergy", "label": null, "score": null, "system": null}]	\N	\N	\N	code!="CR"	{"logic": "ALL", "action": "show", "conditions": [{"source": "usingNSAIDS", "trigger": {"value": {"code": "yes"}}}]}
takeMethHydrOrMorph	Are you currently taking methadone, hydromorphone or morphine?	\N	YNNS	1	1	\N	\N	\N	\N	code=="no"	\N
haveMalignantCancer5	Can you please confirm if you have had any malignant cancer in the past 5 years?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
malignantCancerType	Which type of cancer did you (or do you) have?	\N	CNE	1	1	[{"code": "SBD", "text": "Skin Bowen’s disease", "label": null, "score": null, "system": null}, {"code": "BCC", "text": "Basal cell carcinoma", "label": null, "score": null, "system": null}, {"code": "CSC", "text": "Carcinoma in situ of the cervix", "label": null, "score": null, "system": null}, {"code": "NIMCPR", "text": "Non-invasive malignant colon polyps that have been removed", "label": null, "score": null, "system": null}, {"code": "OTH", "text": "Other", "label": null, "score": null, "system": null}, {"code": "INS", "text": "I am not sure", "label": null, "score": null, "system": null}]	\N	\N	\N	\N	{"logic": "ALL", "action": "show", "conditions": [{"source": "haveMalignantCancer5", "trigger": {"value": {"code": "yes"}}}]}
haveIBD	Can you please confirm if you have any inflammatory bowel diseases (IBD), such as Ulcerative Colitis (UC) or Crohn’s Disease?	\N	YNNS	1	1	\N	\N	\N	\N	code=="no"	\N
takeAxSpAMeds	Are you currently taking any of the following medications for the treatment of your axSpA? (Check all that apply, or none)	\N	CNE	0	*	[{"code": "etanercept", "text": "Enbrel ® (etanercept)", "label": null, "score": null, "system": null}, {"code": "infliximab", "text": "REMICADE ® (infliximab)", "label": null, "score": null, "system": null}, {"code": "adalimumab", "text": "HUMIRA ® (adalimumab)", "label": null, "score": null, "system": null}, {"code": "golimumab", "text": "SIMPONI ® (golimumab)", "label": null, "score": null, "system": null}, {"code": "certolizumab_pegol", "text": "CIMZIA ® (certolizumab pegol)", "label": null, "score": null, "system": null}]	\N	\N	\N	\N	\N
havePsoriaticArthritis	Have you been diagnosed with Psoriatic Arthritis?	\N	YN	1	1	\N	\N	\N	\N	YN_Y	\N
havePsoriaticArthritisFor6Months	Have you had Psoriatic Arthritis for at least 6 months?	\N	YNNS	1	1	\N	\N	\N	\N	\N	{"logic": "ANY", "action": "show", "conditions": [{"source": "havePsoriaticArthritis", "trigger": {"value": {"code": "yes"}}}, {"source": "havePsoriaticArthritis", "trigger": {"value": {"code": "notSure"}}}]}
havePsoriaticArthritisLesion	Do you have at least 1 Psoriatic lesion and/or a history of Psoriasis?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
havePsoriasis	Have you been diagnosed with Psoriasis?	\N	YN	1	1	\N	\N	\N	\N	\N	\N
haveInflaOrAutoImmuneConditionBesidesPsA	Do you have inflammatory conditions or autoimmune diseases other than Psoriasis or Psoriatic Arthritis?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveCancerHistory	Do you have a history of cancer?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
takeDmards2	Have you taken any disease modifying anti-rheumatic drugs (DMARDs)? e.g. adalimumab, cyclosporine, leflunomide, hydroxychloroquine, or sulfasalazine.?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
takeBiologics	Have you been on or previously taken any biologics? (e.g. secukinumab, ustekinumab)?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveGt3nfInhibitors	Have you been treated with more than 3 TNF inhibitors?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveDepression	Have you been diagnosed with major depression or have active suicidal ideation?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveTuberculosis3	Do you have an active tuberculosis (TB) infection or at high risk for acquiring TB?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
areYouChinese	Are you Chinese?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveJAKExposure	Any prior exposure to any Janus Kinase (JAK) inhibitor (including but not limited to ruxolitinib, tofacitinib, baricitinib, and filgotinib)?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveFibromyalgia	Have you been diagnosed with fibromyalgia?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveAtrialFibrilation	Have you been diagnosed with atrial fibrillation by a medical professional?	\N	YNNS	1	1	\N	\N	\N	\N	YNNS_YNS	\N
haveCHA2DS2_VAScGe2	Do you have a CHA2DS2-VASc score ≥ 2?	\N	YNNS	1	1	\N	\N	\N	\N	code=="yes"	\N
haveCHA2DS2_VAScGe3	Do you have a CHA2DS2-VASc score ≥ 3?	\N	YNNS	1	1	\N	\N	\N	\N	code=="yes"	\N
takeOralAnticoagulant	Are you currently being treated with an oral anticoagulant?	\N	YNNS	1	1	\N	\N	\N	\N	YNNS_NNS	\N
haveNOACBleedingRisk	Participant on a NOAC in case of at least one bleeding risk feature. Check all that apply.	\N	CNE	0	*	[{"code": "bleedLast12m", "text": "History of a prior bleed within the last 12 months requiring medical attention", "label": null, "score": null, "system": null}, {"code": "renDisfeGFR30_50mlMin", "text": "Moderate renal dysfunction with eGFR 30-50 ml/min", "label": null, "score": null, "system": null}, {"code": "acetylsalicylicLe100mg", "text": "Current clinically indicated antiplatelet therapy with Acetylsalicylic acid(ASA) ≤ 100 mg", "label": null, "score": null, "system": null}]	\N	\N	\N	value.length==0	{"logic": "ALL", "action": "show", "conditions": [{"source": "takeOralAnticoagulant", "trigger": {"value": {"code": "yes"}}}]}
takeVitaminK30DaysBefore	Were you treated with a Vitamin K antagonist in the 30 days prior to screening?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveAtrialFibExclusions	Do you have any of the following conditions? Check all that apply.	\N	CNE	0	*	[{"code": "heartMechValve", "text": "Mechanical heart valve prosthesis", "label": null, "score": null, "system": null}, {"code": "rheuMitralStenosis", "text": "Any degree of rheumatic mitral stenosis or moderate-to-severe, non-rheumatic mitral stenosis", "label": null, "score": null, "system": null}, {"code": "abalation", "text": "Atrial fibrillation due to a reversible cause, participants in sinus rhythm after successful ablation, or plan for cardioversion or ablation during study conduct", "label": null, "score": null, "system": null}]	\N	\N	\N	value.length==0	\N
haveAtrialFibExclReq2	Do you have a requirement for any of the following? Check all that apply.	\N	CNE	0	*	[{"code": "chronicAntiCoag", "text": "Chronic anticoagulation (for a different indication than atrial fibrilation)", "label": null, "score": null, "system": null}, {"code": "antiplatelet", "text": "Antiplatelet therapy (up to 100 mg ASA is allowed)", "label": null, "score": null, "system": null}]	\N	\N	\N	value.length==0	\N
takeNSAIDsAF	Do you have a anticipated need for chronic therapy with Nonsteroidal anti-inflammatory drugs (NSAIDs).	\N	YNNS	1	1	\N	\N	\N	\N	code=="no"||code=="notSure"	\N
haveHadStroke30Days	Have you had a stroke within the last 30 days?	\N	YNNS	1	1	\N	\N	\N	\N	code=="no"	\N
haveHadSurgery30Days	Have you had a major surgery during the last 30 days?	\N	YNNS	1	1	\N	\N	\N	\N	code=="no"	\N
takeHeartInterventionNextMonths	Do you plan to have a intervention within the next months? (e.g. carotid endarterectomy, coronary artery bypass grafting, major surgery)	\N	YNNS	1	1	\N	\N	\N	\N	YNNS_NNS	\N
haveAsthma	Have you been diagnosed with asthma by a medical professional?	\N	YNNS	1	1	\N	\N	\N	\N	YNNS_YNS	\N
haveAsthmaGe1Year	Were you diagnosed with asthma at least one year ago?	\N	YNNS	1	1	\N	\N	\N	\N	YNNS_YNS	{"logic": "ANY", "action": "show", "conditions": [{"source": "haveAsthma", "trigger": {"value": {"code": "yes"}}}, {"source": "haveAsthma", "trigger": {"value": {"code": "notSure"}}}]}
takeAsthmaInhaler	Are you currently using an inhaler to treat your asthma?	\N	YNNS	1	1	\N	\N	\N	\N	YNNS_YNS	\N
countAsthmaAttacksPast1Year	How many asthma attacks have you had in the past year? An asthma attack is a flare-up of symptoms that requires an emergency room visit, hospitalization, or treatment with steroids. If you haven't had any, please enter 0. 	\N	QTY	1	1	\N	\N	\N	{"maxInclusive": "10000", "minInclusive": "0"}	qty>=1	\N
smokeOrVape	Do you currently smoke or vape? This includes cigarettes, pipes, cigars, vape pens or e-cigarettes.	\N	YNNS	1	1	\N	\N	\N	\N	YNNS_NNS	\N
smokeOrVapeInPast	Have you smoked in the past? This only includes cigarettes, pipes, and cigars.	\N	YNNS	1	1	\N	\N	\N	\N	\N	{"logic": "ANY", "action": "show", "conditions": [{"source": "smokeOrVape", "trigger": {"value": {"code": "no"}}}, {"source": "smokeOrVape", "trigger": {"value": {"code": "notSure"}}}]}
haveTuberculosis2	Do you have Tuberculosis (currently or in the past)?	\N	YNNS	1	1	\N	\N	\N	\N	YNNS_NNS	\N
haveCOPD	Do you have Chronic obstructive pulmonary disease (COPD) or Emphysema?	\N	YNNS	1	1	\N	\N	\N	\N	YNNS_NNS	\N
haveMultipleMyeloma	Have you been diagnosed with multiple myeloma?	\N	YNNS	1	1	\N	\N	\N	\N	code=="yes"	\N
tryedIMiD	Have you tried at least 1 immunomodulatory drug (IMiD) but your multiple myeloma progressed?	\N	YNNS	1	1	\N	\N	\N	\N	code=="yes"||code="notSure"	\N
tryedPI	Have you tried at least 1 proteasome inhibitor (PI) but your multiple myeloma progressed?	\N	YNNS	1	1	\N	\N	\N	\N	code=="yes"||code="notSure"	\N
tryedCD32mAB	Have you tried at least 1 monoclonal antibody (CD38 mAB) but your multiple myeloma progressed?	\N	YNNS	1	1	\N	\N	\N	\N	code=="yes"||code="notSure"	\N
tryedBCMA	Have you tried at least one B-cell maturation antigen (BCMA)-directed therapy, but your multiple myeloma progressed?	\N	YNNS	1	1	\N	\N	\N	\N	code=="yes"||code="notSure"	\N
haveType2Diabetes	Have you been diagnosed with type 2 diabetes?	\N	YNNS	1	1	\N	\N	\N	\N	YNNS_YNS	\N
takeMetforminPlus500mgDaily	Are you currently taking 500 mg or more of metformin daily?	\N	YNNS	1	1	\N	\N	\N	\N	YNNS_YNS	\N
takeDiabetesMeds	Are you taking any other prescription medications to control your diabetes?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveNFAD	Have you been diagnosed with non-alcoholic fatty liver disease?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
takeMRINot	Is there any reason you are unable to have an MRI (i.e.claustrophobia, metal implants)?	\N	YNNS	1	1	\N	\N	\N	\N	YNNS_NNS	\N
takeIllegalDrugs	Do you use illegal drugs or medical marijuana?	\N	YNNS	1	1	\N	\N	\N	\N	YNNS_NNS	\N
haveFertilityImpediment	For female gender only, please indicate fertility impediments. Please check all that apply:	\N	CNE	0	*	[{"code": "ovariesRemoved", "text": "Ovaries have been removed ", "label": null, "score": null, "system": null}, {"code": "fallopianDisfunctiona", "text": "Fallopian tubes were tied or removed", "label": null, "score": null, "system": null}, {"code": "menopaus", "text": "Are post-menopause", "label": null, "score": null, "system": null}]	\N	\N	\N	value.length==0	\N
haveStomachRemoved	Have you had any stomach surgeries or a bowel resection  (i.e.: bariatric surgery or gastric bypass, all or part of your stomach removed)?	\N	YNNS	1	1	\N	\N	\N	\N	YNNS_NNS	\N
haveNFADImpediments1	Within the past 6 months, have you been diagnosed with any of the following: (Please check all apply)	\N	CNE	0	*	[{"code": "thyroid", "text": "Thyroid or adrenal gland disease", "label": null, "score": null, "system": null}, {"code": "lung", "text": "Lung problems (COPD, asthma, chronic bronchitis)", "label": null, "score": null, "system": null}, {"code": "heart", "text": "Heart problems (heart attack, congestive heart failure, stroke)", "label": null, "score": null, "system": null}]	\N	\N	\N	value.length==0	\N
haveNFADImpediments2	Within the past 6 months, have you been diagnosed with any of the following: blood disease (severe anemia) or a cancer diagnosis (other than basil or squamous cell carcinoma of the skin)	\N	YNNS	1	1	\N	\N	\N	\N	YNNS_NNS	\N
haveNFADImpediments3	Within the past 6 months, have you been diagnosed with any of the following: severe anxiety or depression, bipolar disorder, schizophrenia, dementia, Alzheimer's, multiple sclerosis (MS), Parkinson's disease or epilepsy	\N	YNNS	1	1	\N	\N	\N	\N	YNNS_NNS	\N
haveNFADImpediments4	Have you been diagnosed with any of the following (Please select "Yes" if any apply): Severe Liver Disease (Cirrhosis, Hepatitis A or C, Liver Cancer)	\N	YNNS	1	1	\N	\N	\N	\N	YNNS_NNS	\N
haveDrugOrAlcoholHistory	History of chronic alcohol or drug abuse within 6 months?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveUc	Have you been diagnosed with Ulcerative Colitis?	\N	YN	1	1	\N	\N	\N	\N	\N	\N
haveUcGt3M	Have you been diagnosed with Ulcerative Colitis for at least 3 months?	\N	YN	1	1	\N	\N	\N	\N	\N	{"logic": "ALL", "action": "show", "conditions": [{"source": "haveUc", "trigger": {"value": {"code": "yes"}}}]}
haveCd	Are you currently diagnosed with Crohn's disease (CD), inflammatory bowel disease, or any type colitis other than Ulcerative Colitis?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
haveTuberculosis4	Do you have an active tuberculosis (TB) infection ?	\N	YNNS	1	1	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: sponsor; Type: TABLE DATA; Schema: public; Owner: ctrial
--

COPY public.sponsor (id, name, logo) FROM stdin;
8f0759f0-357f-499f-86f1-db6486f72759	Pfizer	/assets/mah/pfizer/logo_h165px.png
4b019cd7-951f-4cc7-88cd-b838dfc40334	MSD	/assets/mah/msd/logo_h165px.png
d9c81fc0-f054-4401-994a-e7a9a1f76500	Novartis	/assets/mah/novartis/logo_h165px.png
c1a9e128-e490-4c2f-b95d-dc69c6fd9a47	UCB	/assets/mah/ucb/logo_h165px.png
0043f60b-2a8f-4b55-ae08-0411bac445bb	Bayer	/assets/mah/bayer/logo_h165px.png
214a7e0b-ced3-475c-945c-94981a92fef0	Abbvie	/assets/mah/abbvie/logo_h165px.png
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
-- Name: matchrequest matchrequest_pkey; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.matchrequest
    ADD CONSTRAINT matchrequest_pkey PRIMARY KEY (keyssi);


--
-- Name: address pk_address_id; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT pk_address_id PRIMARY KEY (id);


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
-- Name: clinicaltrialmedicalcondition pk_clinicaltrialmedicalcondition_id; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinicaltrialmedicalcondition
    ADD CONSTRAINT pk_clinicaltrialmedicalcondition_id PRIMARY KEY (id);


--
-- Name: clinicaltrialquestiontype pk_clinicaltrialquestion_id; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinicaltrialquestiontype
    ADD CONSTRAINT pk_clinicaltrialquestion_id PRIMARY KEY (id);


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
-- Name: generalhealthinformationquestiontype pk_generalhealthinformationquestiontype_id; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.generalhealthinformationquestiontype
    ADD CONSTRAINT pk_generalhealthinformationquestiontype_id PRIMARY KEY (id);


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
-- Name: location pk_location_id; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT pk_location_id PRIMARY KEY (id);


--
-- Name: matchresult pk_matchresult_keyssi; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.matchresult
    ADD CONSTRAINT pk_matchresult_keyssi PRIMARY KEY (keyssi);


--
-- Name: medicalconditionquestiontype pk_medicalconditionquestiontype_id; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.medicalconditionquestiontype
    ADD CONSTRAINT pk_medicalconditionquestiontype_id PRIMARY KEY (id);


--
-- Name: questiondatatype pk_questiondatatype_code; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.questiondatatype
    ADD CONSTRAINT pk_questiondatatype_code PRIMARY KEY (code);


--
-- Name: questiontype pk_questiontype_code; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.questiontype
    ADD CONSTRAINT pk_questiontype_code PRIMARY KEY (localquestioncode);


--
-- Name: sponsor pk_sponsor_id; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.sponsor
    ADD CONSTRAINT pk_sponsor_id PRIMARY KEY (id);


--
-- Name: clinicaltrialquestiontype unq_clinicaltrialquestion_ctr_qt; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinicaltrialquestiontype
    ADD CONSTRAINT unq_clinicaltrialquestion_ctr_qt UNIQUE (clinicaltrial, questiontype);


--
-- Name: matchrequest unq_matchrequest_matchresult; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.matchrequest
    ADD CONSTRAINT unq_matchrequest_matchresult UNIQUE (matchresult);


--
-- Name: medicalcondition unq_medicalcondition_code; Type: CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.medicalcondition
    ADD CONSTRAINT unq_medicalcondition_code UNIQUE (code);


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
-- Name: clinicaltrialquestiontype fk_clinicaltrialquestiontype_ctr; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinicaltrialquestiontype
    ADD CONSTRAINT fk_clinicaltrialquestiontype_ctr FOREIGN KEY (clinicaltrial) REFERENCES public.clinicaltrial(id);


--
-- Name: clinicaltrialquestiontype fk_clinicaltrialquestiontype_qt; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinicaltrialquestiontype
    ADD CONSTRAINT fk_clinicaltrialquestiontype_qt FOREIGN KEY (questiontype) REFERENCES public.questiontype(localquestioncode);


--
-- Name: clinicaltrialmedicalcondition fk_ctmc_clinicaltrial; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinicaltrialmedicalcondition
    ADD CONSTRAINT fk_ctmc_clinicaltrial FOREIGN KEY (clinicaltrial) REFERENCES public.clinicaltrial(id);


--
-- Name: clinicaltrialmedicalcondition fk_ctmc_medicalcondition; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.clinicaltrialmedicalcondition
    ADD CONSTRAINT fk_ctmc_medicalcondition FOREIGN KEY (medicalcondition) REFERENCES public.medicalcondition(code);


--
-- Name: generalhealthinformationquestiontype fk_generalhealthinformationquestiontype; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.generalhealthinformationquestiontype
    ADD CONSTRAINT fk_generalhealthinformationquestiontype FOREIGN KEY (questiontype) REFERENCES public.questiontype(localquestioncode);


--
-- Name: matchrequest fk_matchrequest_matchresult; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.matchrequest
    ADD CONSTRAINT fk_matchrequest_matchresult FOREIGN KEY (matchresult) REFERENCES public.matchresult(keyssi);


--
-- Name: medicalconditionquestiontype fk_medicalconditionquestiontype_mc; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.medicalconditionquestiontype
    ADD CONSTRAINT fk_medicalconditionquestiontype_mc FOREIGN KEY (medicalcondition) REFERENCES public.medicalcondition(code);


--
-- Name: medicalconditionquestiontype fk_medicalconditionquestiontype_qt; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.medicalconditionquestiontype
    ADD CONSTRAINT fk_medicalconditionquestiontype_qt FOREIGN KEY (questiontype) REFERENCES public.questiontype(localquestioncode);


--
-- Name: questiontype fk_questiontype_datatype; Type: FK CONSTRAINT; Schema: public; Owner: ctrial
--

ALTER TABLE ONLY public.questiontype
    ADD CONSTRAINT fk_questiontype_datatype FOREIGN KEY (datatype) REFERENCES public.questiondatatype(code);


--
-- PostgreSQL database dump complete
--

