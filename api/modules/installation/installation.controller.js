

import { Router } from "express";
import { Alert, Installation, InstallationSensor, Sensor, SensorData, UserInstallation } from "../../models/tables.js";
import { isAuthenticated } from "../../middlewares/isAuth.middleware.js";

const InstallationController = Router();


InstallationController.get("/", isAuthenticated, async (req, res) => {
    try {
        const user = req.user;
    
        const userInstallations = await UserInstallation.query().where('user_id', user.id);

        const installationIds = userInstallations.map(installation => installation.installation_id);

        const installations = await Installation.query().whereIn('id', installationIds);

        res.status(200).json(installations);
    } catch (error) {
        console.error("Erro ao buscar instalações do usuário:", error);
        res.status(500).json({ error: "Erro ao buscar instalações do usuário" });
    }
});

InstallationController.get('/:id', isAuthenticated, async(req, res) => {
    try{
        const { user } = req;
        const userInstallations = await UserInstallation.query().where('user_id', user.id);
        if(!userInstallations.find(installation => installation.id === parseInt(req.params.id))){
            return res.status(401).json({error: "Acesso negado"})
        }
        const installation = await Installation.query().findById(req.params.id);
        res.status(200).json(installation);
    } catch (err ) {
        res.status(500).json({error: err.message})
    }
})

InstallationController.get("/:id/sensors", isAuthenticated, async (req, res) => {
    try {
        const { user } = req;
        const { startDate, endDate } = req.query
      
        const userInstallations = await UserInstallation.query().where('user_id', user.id);

        const installationIds = userInstallations.map(installation => installation.id);

        const installationSensor = await InstallationSensor.query().whereIn('installation_id', installationIds);

        const sensorsIds = installationSensor.map(installation => installation.sensor_id);

        const sensors = await Promise.all(
            sensorsIds.map(async sensorId => {
                const sensor = await Sensor.query().findById(sensorId);
                const sensorData = await SensorData.query()
                    .where('sensor_id', sensorId)
                    .andWhere('date_time', '>=', startDate)
                    .andWhere('date_time', '<=', endDate)
           

                return { ...sensor, data: sensorData };
            })
        );
        res.status(200).json(sensors);
    } catch (error) {
        console.error("Erro ao buscar instalações do usuário:", error);
        res.status(500).json({ error: "Erro ao buscar instalações do usuário" });
    }
});

InstallationController.get("/:id/alerts", isAuthenticated, async (req, res) => {
    try {
        const { user } = req;

        const { startDate, endDate } = req.query
      
        const userInstallations = await UserInstallation.query().where('user_id', user.id);

        const installationIds = userInstallations.map(installation => installation.id);

        const installationSensor = await InstallationSensor.query().whereIn('installation_id', installationIds);

        const sensorsIds = installationSensor.map(installation => installation.sensor_id);

      const alerts = await Alert.query()
        .select('*') 
        .join('sensor', 'alert.sensor_id', '=', 'sensor.id')
        .whereIn('alert.sensor_id', sensorsIds)
        .andWhere('date_time', '>=', startDate)
        .andWhere('date_time', '<=', endDate)
        res.status(200).json(alerts);
    } catch (error) {
        console.error("Erro ao buscar instalações do usuário:", error);
        res.status(500).json({ error: "Erro ao buscar instalações do usuário" });
    }
});


export default InstallationController;
