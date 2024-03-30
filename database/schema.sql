set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE public.users (
    "userId" serial,
    "username" text NOT NULL,
    "hashedPassword" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL,
    primary key ("userId"),
    unique("username")
);


CREATE TABLE public."UserGameProgress" (
    "setOfCardsId" serial,
    "userId" integer NOT NULL,
    "level" integer NOT NULL,
    "cardTheme" text NOT NULL,
    "star" integer,
    "score" double precision,
    "completedTime" double precision,
    "totalClicked" integer,
    "sound" boolean,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL,
    primary key ("setOfCardsId")
);
