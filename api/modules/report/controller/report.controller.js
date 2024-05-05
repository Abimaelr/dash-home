import { Router } from "express";
import { isAuthenticated, validSensor } from "../../../middlewares/isAuth.middleware.js";
import { Sensor } from "../../../models/tables.js";

const ReportController = Router();


ReportController.post("/", validSensor, async(req, res) => {
    const deviceId = req.headers.deviceid;

    console.log({deviceId, temperature, humidity})
const {temperature, humidity} = req.body
    Sensor.forge({
  sensor_id: 1,
  temperature,
  humidity,
  date_time: new Date()
}).save().then(savedInfo => {
  console.log('Dado salvo:', savedInfo.toJSON());
}).catch(err => {
  console.error('Erro', err);
});

    const {} = req.body;
});

ReportController.get("/", isAuthenticated, async(req, res) => {
    const {} = req.body;
   
});

export default ReportController;
