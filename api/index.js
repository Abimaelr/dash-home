
import express from 'express'
import cors from 'cors'
import LoginRouter from './modules/login/index.js';

import ReportRouter from './modules/report/index.js';
import InstallationRouter from './modules/installation/index.js';
import SensorRouter from './modules/sensor/index.js';

import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita cada IP a 100 requisições por janela (aqui, 15 minutos)
  message: 'Muitas requisições criadas a partir deste IP, por favor, tente novamente após algum tempo.'
});



const app = express()
app.use(limiter)
app.use(express.json())
app.use(cors())

const JWT_SECRET = 'sua_chave_secreta';

app.use('/login',LoginRouter)
app.use('/report', ReportRouter)
app.use('/installation', InstallationRouter)
app.use('/sensors', SensorRouter)

app.get('/', (req, res) => {
});


app.listen(3000, () => {
  console.log('API Listening in 3000')
})
