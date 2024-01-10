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


type User = {
  userId: number;
  usernameText: string;
  hashedPassword: string;
};

type Auth = {
  usernameText: string;
  password: string;
}

type Response = {
  username: string;
  hashedPassword: string;
  createdAt: string;
  userId: number;
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

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.post('/api/auth/create-account', async (req,res,next)=>{
  try {
    const {usernameText: usernameTextRaw, password} = req.body as Partial<Auth>;
    const usernameText = usernameTextRaw?.toLowerCase();

    if(!usernameText || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }

    const hashedPassword = await argon2.hash(password);

    const sql = `
      insert into "users" ("username","hashedPassword")
      values($1, $2)
      returning *
    `;

    const params = [usernameText, hashedPassword];
    const result = await db.query<Response>(sql,params);

    const [user] = result.rows;
    const {userId, username, createdAt} = user;
    const output = {userId, username, createdAt}

    res.status(201).json(output);

  } catch (err) {
    next(err);
  }
});


app.post ('/api/auth/sign-in', async (req, res, next)=>{
  try{
    const {usernameText: usernameTextRaw, password} = req.body as Partial<Auth>;
    const usernameText = usernameTextRaw?.toLowerCase();

    if(!usernameText || !password) {
      throw new ClientError(401, 'invalid login');
    }

    const sql = `
      select "userId",
             "hashedPassword"
      from "users"
      where "username" = $1
    `;

    const params = [usernameText];
    const result = await db.query<User>(sql,params);
    const [userData] = result.rows;

    if (!userData) {
      throw new ClientError(401, 'invalid login');
    }

    const isMatching = await argon2.verify(userData.hashedPassword, password);

    if (!isMatching) {
      throw new ClientError(401, 'invalid login');
    }

    const user = {
      userId: userData.userId,
      username: usernameText
    };

    const secretKey = process.env.TOKEN_SECRET;

    if (!secretKey) {
      throw new Error('TOKEN_SECRET is not found in .env');
    }

    const token = jwt.sign(user, secretKey);
    res.status(200).json({user,token});

  } catch (err) {
    next(err);
  }
} );

app.post('/api/level-and-theme',authMiddleware ,async(req,res,next)=>{
  try{
    const{level: levelRaw,cardTheme} = req.body;
    const level = Number(levelRaw);
    if (!level || !cardTheme) {
      throw new ClientError(400, 'level and theme are required');
    }

    const sql = `
      insert into "cards" ("userId","level", "cardTheme")
      values ($1, $2,$3)
      returning *;
    `;

    const params = [req.user?.userId, level, cardTheme];
    const result = await db.query(sql,params);
    const levelAndTheme = result.rows[0];
    res.status(201).json(levelAndTheme);
  }catch(err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
} );

app.post('/api/save-pokemon-data', async (req,res,next)=>{

  try {
    const {pokemonArr} = req.body;
    console.log("pokemonArr", pokemonArr);

    const values = pokemonArr.map(item => `('${item.id}', '${item.name}', '${item.type}', '${item.imageUrl}')`).join(',');

    const sql = `
      insert into "pokemonData" ("id","name","type","imageUrl")
      values ${values}
      returning *
    `;

    const result = await db.query(sql);
    const insertedRows = result.rows;
    console.log(insertedRows);

    res.status(201).json(insertedRows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

app.get('/api/pokemon', async (req, res, next) => {
  try{

    const sql = `
      SELECT * FROM "pokemonData"
      order by random()
      LIMIT 3
    `;

    const result = await db.query(sql);
    res.status(200).json(result.rows);
    console.log(result);

  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// This is the correct format
// http -v post :8080/api/save-img-url array:='[
//    {
//        "name": "bulbasaur",
//        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
//    },
//    {
//        "name": "ivysaur",
//        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
//    }
// ]'




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
