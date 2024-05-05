
import express from 'express'
import * as jwt from 'jsonwebtoken';
import LoginRouter from './modules/login/index.js';
import knex from 'knex';

const app = express()

export const connection = knex({
  client: 'pg',
  connection: {
    host: '64.23.174.41',
    port: 5432,
    user: 'myuser',
    password: 'mypassword',
    database: 'iot'
  },
});

app.use(express.json())

const JWT_SECRET = 'sua_chave_secreta';

app.use('/login',LoginRouter)

app.get('/', (req, res) => {
});


app.listen(3000, () => {
  console.log('API Listening in 3000')
})