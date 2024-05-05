import { Router } from "express";
import { isAuthenticated, validSensor } from "../../../middlewares/isAuth.middleware.js";

const ReportController = Router();


ReportController.post("/", validSensor, async(req, res) => {
    const {} = req.body;
});

ReportController.get("/", isAuthenticated, async(req, res) => {
    const {} = req.body;
   
});

export default ReportController;
