

import { Router } from "express";
import {InstallationSensor, Sensor, UserInstallation } from "../../models/tables.js";
import { isAuthenticated } from "../../middlewares/isAuth.middleware.js";

const SensorController = Router();

export const isSensorOwner = async (req, res, next) => {
    try {
    
        const sensorId = req.params.id;
         const user = req.user;

        const userInstallations = await UserInstallation.query().where('user_id', user.id);

        const installationSensors = await InstallationSensor.query()
            .whereIn('installation_id', userInstallations)
            .andWhere('sensor_id', sensorId);

        if (installationSensors.length === 0) {
            return res.status(403).json({ error: "Você não tem permissão para acessar este sensor" });
        }
 next();
    } catch (error) {
        console.error("Erro ao verificar propriedade do sensor:", error);
        res.status(500).json({ error: "Erro ao verificar propriedade do sensor" });
    }
};



SensorController.get("/", isAuthenticated, async (req, res) => {
    try {
        const user = req.user;
    
        const userInstallations = await (await UserInstallation.query().where('user_id', user.id)).map(installation => installation.installation_id)

         const installationSensor = (await InstallationSensor.query()
        .whereIn('installation_id', userInstallations)).map(installation => installation.sensor_id);

        const sensors = await Sensor.query().whereIn('id', installationSensor);

         res.status(200).json(sensors);
    } catch (error) {
        console.error("Erro ao buscar sensores do usuário:", error);
        res.status(500).json({ error: "Erro ao buscar sensores do usuário" });
    }
});

SensorController.post("/", isAuthenticated, isSensorOwner, async (req, res) => {
    try {

        const sensor = await Sensor.query().insert(req.body);

        res.status(201).json(sensor);
    } catch (error) {
        console.error("Erro ao criar um novo sensor:", error);
        res.status(500).json({ error: "Erro ao criar um novo sensor" });
    }
});

SensorController.put("/:id", isAuthenticated, isSensorOwner, async (req, res) => {
    try {

        const sensorId = req.params.id;

        await Sensor.query().findById(sensorId).patch(req.body);

        res.status(200).json({ message: "Sensor atualizado com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar o sensor:", error);
        res.status(500).json({ error: "Erro ao atualizar o sensor" });
    }
});

SensorController.get("/:id", isAuthenticated, isSensorOwner, async (req, res) => {
    try {

        const sensorId = req.params.id;

        const sensor = await Sensor.query().findById(sensorId);

        if (!sensor) {
            return res.status(404).json({ error: "Sensor não encontrado" });
        }

        res.status(200).json(sensor);
    } catch (error) {
        console.error("Erro ao buscar o sensor:", error);
        res.status(500).json({ error: "Erro ao buscar o sensor" });
    }
});





export default SensorController;
