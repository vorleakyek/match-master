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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: UserGameProgress; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public."UserGameProgress" (
    "setOfCardsId" integer NOT NULL,
    "userId" integer NOT NULL,
    level integer NOT NULL,
    "cardTheme" text NOT NULL,
    star integer,
    score double precision,
    "completedTime" double precision,
    "totalClicked" integer,
    sound boolean,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."UserGameProgress" OWNER TO dev;

--
-- Name: UserGameProgress_setOfCardsId_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public."UserGameProgress_setOfCardsId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserGameProgress_setOfCardsId_seq" OWNER TO dev;

--
-- Name: UserGameProgress_setOfCardsId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public."UserGameProgress_setOfCardsId_seq" OWNED BY public."UserGameProgress"."setOfCardsId";


--
-- Name: pokemonData; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public."pokemonData" (
    id integer,
    name text,
    type text,
    "imageUrl" text
);


ALTER TABLE public."pokemonData" OWNER TO dev;

--
-- Name: users; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    username text NOT NULL,
    "hashedPassword" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO dev;

--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."users_userId_seq" OWNER TO dev;

--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: UserGameProgress setOfCardsId; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public."UserGameProgress" ALTER COLUMN "setOfCardsId" SET DEFAULT nextval('public."UserGameProgress_setOfCardsId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: UserGameProgress; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public."UserGameProgress" ("setOfCardsId", "userId", level, "cardTheme", star, score, "completedTime", "totalClicked", sound, "createdAt") FROM stdin;
1	1	1	pokeball	4	74.15333333333334	30.032	8	t	2024-02-04 20:43:22.919192+00
2	2	1	island	4	79.15833333333333	10.02	10	t	2024-02-04 20:48:19.603648+00
3	3	1	AshAndPika	5	83.74166666666667	7.02	8	t	2024-02-04 20:48:51.409451+00
4	1	2	pokeball	4	76.86875	23.03	22	t	2024-02-04 22:10:07.479492+00
5	1	3	pokeball	3	62.218333333333334	96.028	44	t	2024-02-04 22:11:49.035316+00
6	2	2	island	4	78.951875	21.031	20	t	2024-02-04 22:12:57.842091+00
7	2	3	island	4	74.30361111111111	33.014	38	t	2024-02-04 22:13:34.101144+00
8	1	1	pokeball	5	84.16291666666666	6.009	8	t	2024-02-04 22:23:24.445409+00
9	4	2	AshAndPika	\N	\N	\N	\N	\N	2024-02-04 23:00:29.73618+00
10	4	2	AshAndPika	4	77.91041666666666	18.03	22	t	2024-02-04 23:00:48.704657+00
11	4	3	AshAndPika	4	70.55236111111111	48.023	41	t	2024-02-04 23:01:42.283279+00
12	1	2	island	4	77.49604166666666	20.019	22	t	2024-02-04 23:02:48.827424+00
13	1	3	island	4	79.02666666666667	31.008	30	t	2024-02-04 23:04:12.972022+00
14	1	2	pokeball	4	77.909375	18.035	22	t	2024-02-05 00:04:39.512037+00
15	1	2	pokeball	4	73.748125	22.009	26	t	2024-02-05 00:05:46.995965+00
16	1	2	pokeball	5	81.03541666666666	19.03	18	t	2024-02-05 00:10:41.582179+00
17	4	1	pokeball	5	80.40958333333333	7.017	10	t	2024-02-05 00:14:14.347044+00
18	5	1	AshAndPika	4	71.23875	13.027	14	t	2024-02-05 00:26:56.539928+00
19	6	1	island	4	71.24166666666667	13.02	14	t	2024-02-05 00:27:41.88743+00
20	6	2	pokeball	4	75.20375	31.022	22	t	2024-02-05 00:32:43.459414+00
21	6	1	pokeball	5	83.31958333333333	8.033	8	t	2024-02-05 00:45:48.346759+00
22	1	1	pokeball	\N	\N	\N	\N	\N	2024-02-05 05:19:27.179977+00
23	7	1	island	4	79.15541666666667	10.027	10	t	2024-02-09 00:51:15.142485+00
24	7	2	island	\N	\N	\N	\N	\N	2024-02-09 00:51:18.802177+00
25	7	1	AshAndPika	5	83.31833333333333	8.036	8	t	2024-02-09 00:54:57.978544+00
26	7	1	pokeball	5	83.73791666666668	7.029	8	t	2024-02-09 06:01:53.332864+00
27	7	1	pokeball	\N	\N	\N	\N	\N	2024-02-09 06:28:11.098081+00
28	7	1	pokeball	4	71.24541666666667	21.011	12	t	2024-02-09 06:38:56.194611+00
29	1	1	island	\N	\N	\N	\N	\N	2024-02-09 06:57:17.229194+00
30	1	1	island	4	74.15708333333333	14.023	12	t	2024-02-09 07:05:56.400744+00
31	1	3	island	\N	\N	\N	\N	\N	2024-02-09 07:07:02.06846+00
32	1	1	pokeball	5	87.08041666666666	7.007	6	t	2024-02-09 07:07:25.155113+00
\.


--
-- Data for Name: pokemonData; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public."pokemonData" (id, name, type, "imageUrl") FROM stdin;
1	bulbasaur	grass, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
2	ivysaur	grass, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png
3	venusaur	grass, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png
4	charmander	fire	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png
5	charmeleon	fire	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png
6	charizard	fire, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png
7	squirtle	water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png
8	wartortle	water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png
9	blastoise	water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png
10	caterpie	bug	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png
11	metapod	bug	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png
12	butterfree	bug, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png
13	weedle	bug, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png
14	kakuna	bug, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png
15	beedrill	bug, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png
16	pidgey	normal, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png
17	pidgeotto	normal, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png
18	pidgeot	normal, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png
19	rattata	normal	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png
20	raticate	normal	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png
21	spearow	normal, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png
22	fearow	normal, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png
23	ekans	poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png
24	arbok	poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png
25	pikachu	electric	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png
26	raichu	electric	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png
27	sandshrew	ground	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/27.png
28	sandslash	ground	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/28.png
29	nidoran-f	poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png
30	nidorina	poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/30.png
31	nidoqueen	poison, ground	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png
32	nidoran-m	poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/32.png
33	nidorino	poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/33.png
34	nidoking	poison, ground	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/34.png
35	clefairy	fairy	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png
36	clefable	fairy	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/36.png
37	vulpix	fire	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png
38	ninetales	fire	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png
39	jigglypuff	normal, fairy	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png
40	wigglytuff	normal, fairy	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/40.png
41	zubat	poison, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/41.png
42	golbat	poison, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/42.png
43	oddish	grass, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/43.png
44	gloom	grass, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/44.png
45	vileplume	grass, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/45.png
46	paras	bug, grass	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/46.png
47	parasect	bug, grass	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/47.png
48	venonat	bug, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/48.png
49	venomoth	bug, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/49.png
50	diglett	ground	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png
51	dugtrio	ground	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/51.png
52	meowth	normal	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png
53	persian	normal	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/53.png
54	psyduck	water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png
55	golduck	water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/55.png
56	mankey	fighting	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/56.png
57	primeape	fighting	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png
58	growlithe	fire	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png
59	arcanine	fire	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png
60	poliwag	water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png
61	poliwhirl	water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png
62	poliwrath	water, fighting	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png
63	abra	psychic	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png
64	kadabra	psychic	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/64.png
65	alakazam	psychic	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png
66	machop	fighting	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png
67	machoke	fighting	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/67.png
68	machamp	fighting	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png
69	bellsprout	grass, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/69.png
70	weepinbell	grass, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/70.png
71	victreebel	grass, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/71.png
72	tentacool	water, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/72.png
73	tentacruel	water, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/73.png
74	geodude	rock, ground	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png
75	graveler	rock, ground	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/75.png
76	golem	rock, ground	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/76.png
77	ponyta	fire	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png
78	rapidash	fire	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png
79	slowpoke	water, psychic	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/79.png
80	slowbro	water, psychic	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/80.png
81	magnemite	electric, steel	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/81.png
82	magneton	electric, steel	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/82.png
83	farfetchd	normal, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/83.png
84	doduo	normal, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/84.png
85	dodrio	normal, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/85.png
86	seel	water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/86.png
87	dewgong	water, ice	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/87.png
88	grimer	poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/88.png
89	muk	poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/89.png
90	shellder	water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/90.png
91	cloyster	water, ice	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/91.png
92	gastly	ghost, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png
93	haunter	ghost, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png
94	gengar	ghost, poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png
95	onix	rock, ground	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png
96	drowzee	psychic	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/96.png
97	hypno	psychic	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/97.png
98	krabby	water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/98.png
99	kingler	water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/99.png
100	voltorb	electric	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png
101	electrode	electric	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/101.png
102	exeggcute	grass, psychic	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/102.png
103	exeggutor	grass, psychic	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/103.png
104	cubone	ground	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/104.png
105	marowak	ground	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/105.png
106	hitmonlee	fighting	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/106.png
107	hitmonchan	fighting	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/107.png
108	lickitung	normal	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/108.png
109	koffing	poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/109.png
110	weezing	poison	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/110.png
111	rhyhorn	ground, rock	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/111.png
112	rhydon	ground, rock	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png
113	chansey	normal	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/113.png
114	tangela	grass	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/114.png
115	kangaskhan	normal	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/115.png
116	horsea	water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/116.png
117	seadra	water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/117.png
118	goldeen	water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/118.png
119	seaking	water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/119.png
120	staryu	water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/120.png
121	starmie	water, psychic	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/121.png
122	mr-mime	psychic, fairy	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png
123	scyther	bug, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/123.png
124	jynx	ice, psychic	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/124.png
125	electabuzz	electric	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/125.png
126	magmar	fire	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/126.png
127	pinsir	bug	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/127.png
128	tauros	normal	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/128.png
129	magikarp	water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png
130	gyarados	water, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png
131	lapras	water, ice	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png
132	ditto	normal	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png
133	eevee	normal	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png
134	vaporeon	water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/134.png
135	jolteon	electric	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png
136	flareon	fire	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png
137	porygon	normal	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/137.png
138	omanyte	rock, water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/138.png
139	omastar	rock, water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png
140	kabuto	rock, water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/140.png
141	kabutops	rock, water	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/141.png
142	aerodactyl	rock, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/142.png
143	snorlax	normal	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png
144	articuno	ice, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png
145	zapdos	electric, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png
146	moltres	fire, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png
147	dratini	dragon	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png
148	dragonair	dragon	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png
149	dragonite	dragon, flying	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png
150	mewtwo	psychic	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.users ("userId", username, "hashedPassword", "createdAt") FROM stdin;
1	Vorleak	$argon2id$v=19$m=4096,t=3,p=1$xpHVr3yV8v3ita5XnmxvMA$rY/1pws2YZB2UP50y4VjZNgFT72AbhAb2d9bsOUNccQ	2024-02-04 20:40:46.671726+00
2	user1	$argon2id$v=19$m=4096,t=3,p=1$33rfnoXss2P/FhTXSWMFLQ$76sPM52ueY0WivY5yR/wBImJvc7E6BC8yyn/1ylHSuo	2024-02-04 20:47:52.941277+00
3	user2	$argon2id$v=19$m=4096,t=3,p=1$IKVxBLNypxJmBZZN60fTng$y7UYBkQXhaKxfBdwa+7fjgwVGC7AuQoVUFFTCMiSYYo	2024-02-04 20:48:34.100509+00
4	player5	$argon2id$v=19$m=4096,t=3,p=1$kDwVC2UMDx6hmeh6WYlBLw$ySiuPxaDUMcZc+l0XWaU4Y9X6o1ESxNenQXguofGEn4	2024-02-04 23:00:13.193969+00
5	player6	$argon2id$v=19$m=4096,t=3,p=1$Dk1IkwCG2WM4eQL7cg66Xg$9y4ciU1h9NZ6ktSiZoftg2DcjjYVOx4+aCS3sGexXrY	2024-02-05 00:26:30.292599+00
6	player7	$argon2id$v=19$m=4096,t=3,p=1$+MA7NfbMKSPAb6syg7aczg$JMMhgDF+g6Xsg32GrvT7iaRGuLqQaXOX8inGkV6AyRc	2024-02-05 00:27:18.179957+00
7	player8	$argon2id$v=19$m=4096,t=3,p=1$jAJtK5/xBETzHFxSIlSSXA$YteGhGrTUIXiphBq27VxYvkV/8JXBdzLUe1gDHnQtPI	2024-02-09 00:50:49.203802+00
\.


--
-- Name: UserGameProgress_setOfCardsId_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public."UserGameProgress_setOfCardsId_seq"', 32, true);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public."users_userId_seq"', 7, true);


--
-- Name: UserGameProgress UserGameProgress_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public."UserGameProgress"
    ADD CONSTRAINT "UserGameProgress_pkey" PRIMARY KEY ("setOfCardsId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("userId");


--
-- PostgreSQL database dump complete
--
