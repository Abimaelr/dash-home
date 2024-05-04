
import express from 'express'
import * as jwt from 'jsonwebtoken';
import LoginRouter from './modules/login/index.js';

const app = express()

app.use(express.json())

const JWT_SECRET = 'sua_chave_secreta';

app.use('/login',LoginRouter)

app.get('/', (req, res) => {
});

// app.post('/login', (req, res) => {
//       const { username, password } = req.body;

//       if(username === 'admin' && password === 'admin'){
//         const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token });
//         return;
//       }
//       res.status(401).json({ error: 'Usuário ou senha inválidos' });
//     });

app.listen(3000, () => {

  console.log('API Listening in 3000')
})
    


