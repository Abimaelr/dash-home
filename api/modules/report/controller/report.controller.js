import { Router } from "express";
import { isAuthenticated, validSensor } from "../../../middlewares/isAuth.middleware.js";
import { Sensor } from "../../../models/tables.js";

const ReportController = Router();


ReportController.post("/", validSensor, async(req, res) => {
    const deviceId = req.headers.deviceid;

    console.log({deviceId})

    const {} = req.body;
});

ReportController.get("/", isAuthenticated, async(req, res) => {
    const {} = req.body;
   
});

export default ReportController;
