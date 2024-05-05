
import express from 'express'
import LoginRouter from './modules/login/index.js';

import ReportRouter from './modules/report/index.js';




const app = express()

app.use(express.json())

const JWT_SECRET = 'sua_chave_secreta';

app.use('/login',LoginRouter)
app.use('/report', ReportRouter)

app.get('/', (req, res) => {
});


app.listen(3000, () => {
  console.log('API Listening in 3000')
})
