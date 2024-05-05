import { connection } from "..";
import * as bs from 'bookshelf';

const bookshelf = bs(connection)

export const User = bookshelf.model('User', {
  tableName: 'user'
});

export const Installation = bookshelf.model('Installation', {
  tableName: 'installation'
});

export const Sensor = bookshelf.model('Sensor', {
  tableName: 'sensor'
});

export const SensorData = bookshelf.model('SensorData', {
  tableName: 'sensor_data',
  sensor: function() {
    return this.belongsTo(Sensor, 'sensor_id');
  }
});

export const UserInstallation = bookshelf.model('UserInstallation', {
  tableName: 'user_installation',
  user: function() {
    return this.belongsTo(User, 'user_id');
  },
  installation: function() {
    return this.belongsTo(Installation, 'installation_id');
  }
});

export const InstallationSensor = bookshelf.model('InstallationSensor', {
  tableName: 'installation_sensor',
  installation: function() {
    return this.belongsTo(Installation, 'installation_id');
  },
  sensor: function() {
    return this.belongsTo(Sensor, 'sensor_id');
  }
});

export const Alert = bookshelf.model('Alert', {
  tableName: 'alert',
  sensor: function() {
    return this.belongsTo(Sensor, 'sensor_id');
  }
});
