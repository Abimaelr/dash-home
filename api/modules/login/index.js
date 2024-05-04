import express from 'express';
import LoginController from './controller/login.controller.js';


const LoginRouter = express.Router();

LoginRouter.use(LoginController)

export default LoginRouter;