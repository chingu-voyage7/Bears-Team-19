--
-- PostgreSQL database dump
--

-- Dumped from database version 11.1 (Debian 11.1-1.pgdg90+1)
-- Dumped by pg_dump version 11.1 (Debian 11.1-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE chingudb;
--
-- Name: chingudb; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE chingudb WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


\connect chingudb

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: api; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA api;


--
-- Name: add_expense(); Type: FUNCTION; Schema: api; Owner: -
--

CREATE FUNCTION api.add_expense() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	UPDATE api.budgets
	SET available_amount = available_amount - NEW.amount
	WHERE id = NEW.budget_id;
	RETURN NEW;
END
$$;


--
-- Name: add_income(); Type: FUNCTION; Schema: api; Owner: -
--

CREATE FUNCTION api.add_income() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	UPDATE api.budgets
	SET available_amount = available_amount + NEW.amount
	WHERE id = NEW.budget_id;
	RETURN NEW;
END
$$;


--
-- Name: valid_email(text); Type: FUNCTION; Schema: api; Owner: -
--

CREATE FUNCTION api.valid_email(text) RETURNS boolean
    LANGUAGE plperlu IMMUTABLE STRICT LEAKPROOF
    AS $_$
  use Email::Valid;
  my $email = shift;
  Email::Valid->address($email) or die "Invalid email address: $email\n";
  return 'true';
$_$;


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: budgets; Type: TABLE; Schema: api; Owner: -
--

CREATE TABLE api.budgets (
    id integer NOT NULL,
    user_id integer,
    title text NOT NULL,
    original_amount money NOT NULL,
    available_amount money NOT NULL
);


--
-- Name: budgets_id_seq; Type: SEQUENCE; Schema: api; Owner: -
--

CREATE SEQUENCE api.budgets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: budgets_id_seq; Type: SEQUENCE OWNED BY; Schema: api; Owner: -
--

ALTER SEQUENCE api.budgets_id_seq OWNED BY api.budgets.id;


--
-- Name: categories; Type: TABLE; Schema: api; Owner: -
--

CREATE TABLE api.categories (
    id integer NOT NULL,
    label text NOT NULL,
    description text
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: api; Owner: -
--

CREATE SEQUENCE api.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: api; Owner: -
--

ALTER SEQUENCE api.categories_id_seq OWNED BY api.categories.id;


--
-- Name: expenses; Type: TABLE; Schema: api; Owner: -
--

CREATE TABLE api.expenses (
    id integer NOT NULL,
    budget_id integer,
    description text NOT NULL,
    amount money NOT NULL,
    category_id integer
);


--
-- Name: expenses_id_seq; Type: SEQUENCE; Schema: api; Owner: -
--

CREATE SEQUENCE api.expenses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: expenses_id_seq; Type: SEQUENCE OWNED BY; Schema: api; Owner: -
--

ALTER SEQUENCE api.expenses_id_seq OWNED BY api.expenses.id;


--
-- Name: incomes; Type: TABLE; Schema: api; Owner: -
--

CREATE TABLE api.incomes (
    id integer NOT NULL,
    budget_id integer,
    description text NOT NULL,
    amount money NOT NULL
);


--
-- Name: incomes_id_seq; Type: SEQUENCE; Schema: api; Owner: -
--

CREATE SEQUENCE api.incomes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: incomes_id_seq; Type: SEQUENCE OWNED BY; Schema: api; Owner: -
--

ALTER SEQUENCE api.incomes_id_seq OWNED BY api.incomes.id;


--
-- Name: users; Type: TABLE; Schema: api; Owner: -
--

CREATE TABLE api.users (
    id integer NOT NULL,
    username public.citext,
    email public.validemail
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: api; Owner: -
--

CREATE SEQUENCE api.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: api; Owner: -
--

ALTER SEQUENCE api.users_id_seq OWNED BY api.users.id;


--
-- Name: budgets id; Type: DEFAULT; Schema: api; Owner: -
--

ALTER TABLE ONLY api.budgets ALTER COLUMN id SET DEFAULT nextval('api.budgets_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: api; Owner: -
--

ALTER TABLE ONLY api.categories ALTER COLUMN id SET DEFAULT nextval('api.categories_id_seq'::regclass);


--
-- Name: expenses id; Type: DEFAULT; Schema: api; Owner: -
--

ALTER TABLE ONLY api.expenses ALTER COLUMN id SET DEFAULT nextval('api.expenses_id_seq'::regclass);


--
-- Name: incomes id; Type: DEFAULT; Schema: api; Owner: -
--

ALTER TABLE ONLY api.incomes ALTER COLUMN id SET DEFAULT nextval('api.incomes_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: api; Owner: -
--

ALTER TABLE ONLY api.users ALTER COLUMN id SET DEFAULT nextval('api.users_id_seq'::regclass);


--
-- Name: budgets budgets_pkey; Type: CONSTRAINT; Schema: api; Owner: -
--

ALTER TABLE ONLY api.budgets
    ADD CONSTRAINT budgets_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: api; Owner: -
--

ALTER TABLE ONLY api.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: expenses expenses_pkey; Type: CONSTRAINT; Schema: api; Owner: -
--

ALTER TABLE ONLY api.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (id);


--
-- Name: incomes incomes_pkey; Type: CONSTRAINT; Schema: api; Owner: -
--

ALTER TABLE ONLY api.incomes
    ADD CONSTRAINT incomes_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: api; Owner: -
--

ALTER TABLE ONLY api.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: api; Owner: -
--

ALTER TABLE ONLY api.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: api; Owner: -
--

ALTER TABLE ONLY api.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: expenses update_budget; Type: TRIGGER; Schema: api; Owner: -
--

CREATE TRIGGER update_budget AFTER INSERT OR UPDATE OF amount ON api.expenses FOR EACH ROW EXECUTE PROCEDURE api.add_expense();


--
-- Name: incomes update_budget; Type: TRIGGER; Schema: api; Owner: -
--

CREATE TRIGGER update_budget AFTER INSERT OR UPDATE OF amount ON api.incomes FOR EACH ROW EXECUTE PROCEDURE api.add_income();


--
-- Name: expenses budget; Type: FK CONSTRAINT; Schema: api; Owner: -
--

ALTER TABLE ONLY api.expenses
    ADD CONSTRAINT budget FOREIGN KEY (budget_id) REFERENCES api.budgets(id);


--
-- Name: incomes budget; Type: FK CONSTRAINT; Schema: api; Owner: -
--

ALTER TABLE ONLY api.incomes
    ADD CONSTRAINT budget FOREIGN KEY (budget_id) REFERENCES api.budgets(id);


--
-- Name: expenses category; Type: FK CONSTRAINT; Schema: api; Owner: -
--

ALTER TABLE ONLY api.expenses
    ADD CONSTRAINT category FOREIGN KEY (category_id) REFERENCES api.categories(id);


--
-- Name: budgets user; Type: FK CONSTRAINT; Schema: api; Owner: -
--

ALTER TABLE ONLY api.budgets
    ADD CONSTRAINT "user" FOREIGN KEY (user_id) REFERENCES api.users(id);


--
-- PostgreSQL database dump complete
--

