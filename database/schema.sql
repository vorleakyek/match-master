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

CREATE TABLE "UserGameProgress" (
  "setOfCardsId" serial PRIMARY KEY,
  "userId" integer not null,
  "level" integer not null,
  "cardTheme" text not null,
  "star" integer,
  "score" decimal,
  "completedTime" decimal,
  "totalClicked" integer,
  "sound" boolean,
  "createdAt" timestamptz(6) not null default now()
);

CREATE TABLE "pokemonData" (
  "id" integer,
  "name" text,
  "type" text,
  "imageUrl" text
);


-- ALTER TABLE "cards" ADD FOREIGN KEY ("setOfCardsId") REFERENCES "users" ("userId");
