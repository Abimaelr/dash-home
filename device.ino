#include <DHT.h>
#include <ESP8266WiFi.h>
#include <Wire.h>
#include <LCDI2C_Multilingual.h>
#include <ESP8266HTTPClient.h>
#include <PubSubClient.h>

#define DHTPIN 2
#define DHTTYPE DHT11

#define I2C_ADDR 0x27
#define LCD_COLUMNS 16
#define LCD_ROWS 2

LCDI2C_Latin_Symbols lcd(I2C_ADDR, LCD_COLUMNS, LCD_ROWS);
DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "LIB-6976230"; 
const char* password = "CF8mfm36wt2w";

const char* idtemp = "a3b50fa9-cc24-4442-8959-ea6a2a8a83c0";
const char* idhum = "7eb56624-1b10-4699-be7f-c846b772a244";

const char* serverUrl = "https://64.23.174.41:3000/report";

const char* mqtt_server = "broker.hivemq.com";
const int mqtt_port = 1883;
const char* mqtt_user = "26gisu6660";
const char* mqtt_password = "Espclient123";

WiFiClient espClient;
PubSubClient client(espClient);

void sensor(){
  delay(10000);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Umidade: ");
  lcd.setCursor(0, 1);
  lcd.print("Temp: ");
  
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Erro ao ler o sensor DHT!");
    lcd.setCursor(9, 0);
    lcd.print("Erro");
    lcd.setCursor(6, 1);
    lcd.print("Erro");
    return;
  }

  Serial.print("Umidade: ");
  Serial.print(humidity);
  Serial.print("%\t");
  Serial.print("Temperatura: ");
  Serial.print(temperature);
  Serial.println("°C");

  char temperature_str[20];
  char humidity_str[20];

  dtostrf(temperature, 10, 2, temperature_str);
  dtostrf(humidity, 10, 2, humidity_str);

  lcd.setCursor(9, 0);
  lcd.print(humidity);
  lcd.print("%");
  lcd.setCursor(6, 1);
  lcd.print(temperature);
  lcd.print("C");
  client.publish(idtemp, temperature_str); 
  client.publish(idhum, humidity_str);
};

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("ESP8266Client-a"
    // ,  mqtt_user, mqtt_password
    )) {
      Serial.println("connected");
      client.subscribe("esp/test");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}


void setup() {
  Serial.begin(9600);
  lcd.backlight();
  lcd.init();
  dht.begin();
  delay(1000);

  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    lcd.setCursor(0, 0);
    lcd.print("Conectando à rede Wi-Fi...");
  }
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.println("Conectado à rede Wi-Fi!");
  client.setServer(mqtt_server, mqtt_port);


}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  sensor();
}
