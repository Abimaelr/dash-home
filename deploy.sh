docker run --name meu_postgres -e POSTGRES_PASSWORD=mypassword -e POSTGRES_USER=myuser -p 5432:5432 -d postgres

docker exec -it meu_postgres psql -U myuser

CREATE DATABASE IOT;

CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE installation (
    id SERIAL PRIMARY KEY,
    address VARCHAR(255) NOT NULL
);

CREATE TABLE sensor (
    id SERIAL PRIMARY KEY,
    alias VARCHAR(255) NOT NULL
);

CREATE TABLE sensor_data (
    id SERIAL PRIMARY KEY,
    sensor_id INT NOT NULL,
    date_time TIMESTAMP NOT NULL,
    temperature FLOAT NOT NULL,
    FOREIGN KEY (sensor_id) REFERENCES sensor(id)
);

CREATE TABLE user_installation (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    installation_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(id),
    FOREIGN KEY (installation_id) REFERENCES installation(id)
);

CREATE TABLE installation_sensor (
    id SERIAL PRIMARY KEY,
    installation_id INT NOT NULL,
    sensor_id INT NOT NULL,
    threshold FLOAT NOT NULL,
    FOREIGN KEY (installation_id) REFERENCES installation(id),
    FOREIGN KEY (sensor_id) REFERENCES sensor(id)
);

CREATE TABLE alert (
    id SERIAL PRIMARY KEY,
    sensor_id INT NOT NULL,
    date_time TIMESTAMP NOT NULL,
    description VARCHAR(255) NOT NULL,
    FOREIGN KEY (sensor_id) REFERENCES sensor(id)
);
