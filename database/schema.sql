set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "username" text not null,
  "hashedPassword" text not null,
  "createdAt" timestamptz(6) not null default now()
);

CREATE TABLE "cards" (
  "setOfCardsId" serial PRIMARY KEY,
  "userId" integer,
  "level" integer not null,
  "cardTheme" text not null,
  "numCardsFlipped" integer,
  "sound" boolean ,
  "createdAt" timestamptz(6) not null default now()
);

-- ALTER TABLE "cards" ADD FOREIGN KEY ("setOfCardsId") REFERENCES "users" ("userId");
