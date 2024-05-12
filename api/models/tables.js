import { Model } from 'objection';
import Knex from 'knex';
import { configDotenv } from 'dotenv';
configDotenv()

const connection = Knex({
  client: 'pg',
  connection: {
    host:process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'iot'
  },
});

Model.knex(connection);

class User extends Model {
  static get tableName() {
    return 'user';
  }
}

class Installation extends Model {
  static get tableName() {
    return 'installation';
  }
}

class Sensor extends Model {
  static get tableName() {
    return 'sensor';
  }
}

class SensorData extends Model {
  static get tableName() {
    return 'sensor_data';
  }

  static get relationMappings() {
    return {
      sensor: {
        relation: Model.BelongsToOneRelation,
        modelClass: Sensor,
        join: {
          from: 'sensor_data.sensor_id',
          to: 'sensor.id'
        }
      }
    };
  }
}

class UserInstallation extends Model {
  static get tableName() {
    return 'user_installation';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_installation.user_id',
          to: 'user.id'
        }
      },
      installation: {
        relation: Model.BelongsToOneRelation,
        modelClass: Installation,
        join: {
          from: 'user_installation.installation_id',
          to: 'installation.id'
        }
      }
    };
  }
}

class InstallationSensor extends Model {
  static get tableName() {
    return 'installation_sensor';
  }

  static get relationMappings() {
    return {
      installation: {
        relation: Model.BelongsToOneRelation,
        modelClass: Installation,
        join: {
          from: 'installation_sensor.installation_id',
          to: 'installation.id'
        }
      },
      sensor: {
        relation: Model.BelongsToOneRelation,
        modelClass: Sensor,
        join: {
          from: 'installation_sensor.sensor_id',
          to: 'sensor.id'
        }
      }
    };
  }
}

class Alert extends Model {
  static get tableName() {
    return 'alert';
  }

  static get relationMappings() {
    return {
      sensor: {
        relation: Model.BelongsToOneRelation,
        modelClass: Sensor,
        join: {
          from: 'alert.sensor_id',
          to: 'sensor.id'
        }
      }
    };
  }
}

export { User, Installation, Sensor, SensorData, UserInstallation, InstallationSensor, Alert };
