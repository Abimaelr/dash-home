import { Router } from "express";
import { LoginService } from "../service/login.service.js";
import { isAuthenticated } from "../../../middlewares/isAuth.middleware.js";

const LoginController = Router();


LoginController.post("/", async(req, res) => {
    const {email, password} = req.body;
    const result = await LoginService.login(email, password);
   
    if (result) {
        res.status(200).json({ message: "Login bem-sucedido", token: result});
    } else {
        res.status(401).json({ message: "Credenciais inválidas" });
    }
});

LoginController.get('/me', isAuthenticated, async(req,res) => {
    return res.status(200).json(req.user)
})

export default LoginController;
