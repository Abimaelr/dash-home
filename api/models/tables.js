
import bookshelf from 'bookshelf';
import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: {
    host: '64.23.174.41',
    port: 5432,
    user: 'myuser',
    password: 'mypassword',
    database: 'iot'
  },
});

const BS = bookshelf(knex)

export const User = BS.model('User', {
  tableName: 'user'
});

export const Installation = BS.model('Installation', {
  tableName: 'installation'
});

export const Sensor = BS.model('Sensor', {
  tableName: 'sensor'
});

export const SensorData = BS.model('SensorData', {
  tableName: 'sensor_data',
  sensor: function() {
    return this.belongsTo(Sensor, 'sensor_id');
  }
});

export const UserInstallation = BS.model('UserInstallation', {
  tableName: 'user_installation',
  user: function() {
    return this.belongsTo(User, 'user_id');
  },
  installation: function() {
    return this.belongsTo(Installation, 'installation_id');
  }
});

export const InstallationSensor = BS.model('InstallationSensor', {
  tableName: 'installation_sensor',
  installation: function() {
    return this.belongsTo(Installation, 'installation_id');
  },
  sensor: function() {
    return this.belongsTo(Sensor, 'sensor_id');
  }
});

export const Alert = BS.model('Alert', {
  tableName: 'alert',
  sensor: function() {
    return this.belongsTo(Sensor, 'sensor_id');
  }
});
