import { Router } from "express";
import { LoginService } from "../service/login.service.js";

const LoginController = Router();


LoginController.post("/", async(req, res) => {
    const {username, password} = req.body;
    const result = await LoginService.login(username, password);
   
    if (result) {
        res.status(200).json({ message: "Login bem-sucedido", token: result});
    } else {
        res.status(401).json({ message: "Credenciais inválidas" });
    }
});

export default LoginController;
