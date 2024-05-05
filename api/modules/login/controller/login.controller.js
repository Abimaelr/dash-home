import { Router } from "express";

const LoginController = Router();


LoginController.post("/", (req, res) => {
    const { username, password } = req.body;
    if (username === "usuário" && password === "senha") {
        res.status(200).json({ message: "Login bem-sucedido" });
    } else {
        res.status(401).json({ message: "Credenciais inválidas" });
    }
});

export default LoginController;
