
import express from 'express'
import * as jwt from 'jsonwebtoken';

const app = express()

const JWT_SECRET = 'sua_chave_secreta';

app.get('/', (req, res) => {
});

app.post('/login', (req, res) => {
      const { username, password } = req.body;

      if(username === 'admin' && password === 'admin'){
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
        return;
      }
      res.status(401).json({ error: 'Usuário ou senha inválidos' });
    });


