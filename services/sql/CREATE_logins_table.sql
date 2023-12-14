-- Table: public.Logins

-- DROP TABLE IF EXISTS public."Logins";

CREATE TABLE IF NOT EXISTS public."Logins"
(
    id integer NOT NULL DEFAULT nextval('"Logins_id_seq"'::regclass),
    username character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Logins_pkey" PRIMARY KEY (id),
    CONSTRAINT uq_username UNIQUE (username)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Logins"
    OWNER to postgres;