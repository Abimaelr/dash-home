import express from 'express';
import InstallationController from './installation.controller.js';
import mqtt from 'mqtt';
import { Sensor, SensorData } from '../../models/tables.js';

const brokerUrl = 'mqtt://broker.hivemq.com:1883'; // Altere para o endereço do seu broker MQTT
const client = mqtt.connect(brokerUrl);

const InstallationRouter = express.Router();

// Use o InstallationController para manipulação de rotas
InstallationRouter.use(InstallationController);

client.on('connect', async () => {
  try {
    const sensors = await Sensor.query();
    console.log(sensors);

    sensors.forEach(sensor => {
      client.subscribe(sensor.code, (err) => {
        if (!err) {
          console.log(`Subscribed to ${sensor.code} - ${sensor.alias}`);
        } else {
          console.error('Error subscribing to topic:', err);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching sensors:', error);
  }
});

client.on('message', async (topic, message) => {
  try {
    const sensor = await Sensor.query().findOne({ code: topic });

    if (sensor) {
      await SensorData.query().insert({
        sensor_id: sensor.id,
        value: message.toString(),
        date_time: new Date()
      });

      console.log('Data saved successfully for sensor:', sensor.alias);
    } else {
      console.error('Sensor not found for topic:', topic);
    }
  } catch (error) {
    console.error('Error saving sensor data:', error);
  }
});

export default InstallationRouter;
