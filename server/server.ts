import 'dotenv/config';
import argon2 from 'argon2';
import express from 'express';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import {
  authMiddleware,
  ClientError,
  defaultMiddleware,
  errorMiddleware,
} from './lib/index.js';
import type {LevelAndTheme, PokemonData} from '../client/src/lib/data'


type User = {
  userId: number;
  username: string;
  hashedPassword: string;
};

type Auth = {
  username: string;
  password: string;
};

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;

  const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username", "createdAt"
    `;
    const params = [username, hashedPassword];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
      select "userId",
            "hashedPassword"
        from "users"
        where "username" = $1
      `;
    const params = [username];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    const isMatching = await argon2.verify(hashedPassword, password);
    if (!isMatching) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, hashKey);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

app.post('/api/level-and-theme', authMiddleware, async (req, res, next) => {
  try {
    const { level: levelRaw, cardTheme } = req.body as Partial<LevelAndTheme>;
    const level = Number(levelRaw);
    if (!level || !cardTheme) {
      throw new ClientError(400, 'level and theme are required');
    }

    const sql = `
      insert into "cards" ("userId","level", "cardTheme")
      values ($1, $2,$3)
      returning "level","cardTheme";
    `;

    const params = [req.user?.userId, level, cardTheme];
    const result = await db.query<LevelAndTheme>(sql, params);
    const levelAndTheme = result.rows[0];
    res.status(201).json(levelAndTheme);
  } catch (err) {
    next(err);
  }
});

app.put('/api/update-level', authMiddleware, async(req,res,next)=>{
  try{
    const { level: levelRaw } = req.body as Partial<LevelAndTheme>;
    const level = Number(levelRaw);
    if (!level) {
      throw new ClientError(400, 'level is required');
    }

    const sql = `
    update "cards"
    set "level" = $2
    where "userId" = $1
    returning "level","cardTheme"
  `;

    const params = [req.user?.userId, level];
    const result = await db.query<LevelAndTheme>(sql, params);
    const updatedLevel = result.rows[0];
    res.status(201).json(updatedLevel);
  } catch (err) {
    next(err);
  }

})

app.get('/api/level-and-theme', authMiddleware, async(req, res, next)=>{
  try{

    const sql = `
      select "level", "cardTheme"
      from "cards"
      where "userId" = $1
      order by "createdAt" desc
    `;

    const result = await db.query<LevelAndTheme>(sql,[req.user?.userId]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err)
  }
})

app.get('/api/pokemon',authMiddleware, async (req, res, next) => {
  try {
    const sql = `
      SELECT "imageUrl", "name" FROM "pokemonData"
      order by random()
      LIMIT 9
    `;

    const result = await db.query<PokemonData[]>(sql);
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
});

/********** THIS ROUTE IS ONLY USED TO SAVE THE POKEMON DATA IN THE DATABASE ************/
// app.post('/api/save-pokemon-data', async (req, res, next) => {
//   try {
//     const { pokemonArr } = req.body;
//     const values = pokemonArr
//       .map(
//         (item) =>
//           `('${item.id}', '${item.name}', '${item.type}', '${item.imageUrl}')`
//       )
//       .join(',');

//     const sql = `
//       insert into "pokemonData" ("id","name","type","imageUrl")
//       values ${values}
//       returning *
//     `;

//     const result = await db.query(sql);
//     const insertedRows = result.rows;

//     res.status(201).json(insertedRows);
//   } catch (err) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

/*********************************************************************************************/

/*
 * Middleware that handles paths that aren't handled by static middleware
 * or API route handlers.
 * This must be the _last_ non-error middleware installed, after all the
 * get/post/put/etc. route handlers and just before errorMiddleware.
 */
app.use(defaultMiddleware(reactStaticDir));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
