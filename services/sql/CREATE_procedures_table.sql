-- Table: public.procedures

-- DROP TABLE IF EXISTS public.procedures;

CREATE TABLE IF NOT EXISTS public.procedures
(
    id integer NOT NULL DEFAULT nextval('procedures_id_seq'::regclass),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    billing_number character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT procedures_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.procedures
    OWNER to postgres;