# match-master

A full stack TypeScript application for kids who want to play a matching cards game.

## why I Built This

I want to build a fun game application for kids to play and get them to interest in learning about web development.

## Technologies Used

- React
- CSS3
- TypeScript
- Node.js
- Express
- PostgreSQL
- Amazon Web Service (AWS)
- API from https://pokeapi.co

## Live Demo

Try the application live at [http://match-master-dev.us-west-1.elasticbeanstalk.com/sign-up](http://match-master-dev.us-west-1.elasticbeanstalk.com/sign-up)

## Features

- Users can sign up and log in to play the matching cards game
- Users can play the matching cards game with three different levels and card themes
- Users can view the leadership board for top players of each level

## Preview

![Match-Master](client/src/assets/Match-Master.gif)

## Development

- Allow users to play as a guess instead of having to sign up
- Implement multiple players option for live users to play as a group
- User can logout and resume player without having to start over

### System Requirements

- Node.js 18 or higher
- NPM 8 or higher
- PostgreSQL

### Getting Started

1. Clone the repository

   ```shell
   git clone https://github.com/vorleakyek/match-master.git
   ```

2. Install all dependencies with NPM

   ```shell
   npm install
   ```

3. Start PostgreSQL

   ```shell
   sudo service postgresql start
   ```

4. Start all the development servers with the `"dev"` script:

   ```shell
   npm run dev
   ```

5. Run this command to view the data on the database

   ```shell
   pgweb --db matchMaster
   ```
