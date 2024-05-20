import express from 'express';
import InstallationController from './sensor.controller.js';

const SensorRouter = express.Router();

SensorRouter.use(InstallationController);

export default SensorRouter;
