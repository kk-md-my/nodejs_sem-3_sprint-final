-- Table: public.user_search

-- DROP TABLE IF EXISTS public.user_search;

CREATE TABLE IF NOT EXISTS public.user_search
(
    id uuid NOT NULL,
    user_id integer NOT NULL,
    keywords character varying COLLATE pg_catalog."default" NOT NULL,
    "timestamp" date NOT NULL,
    CONSTRAINT user_search_pkey PRIMARY KEY (id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_search
    OWNER to postgres;