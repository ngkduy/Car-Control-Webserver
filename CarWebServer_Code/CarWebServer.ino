/*Server cung cấp:
  1) 4 yêu cầu get để đọc thông tin
  từ 3 loại cảm biến riêng lẻ, tương ứng với 3 URI:
  http://ip-address/data1: đọc nhiệt độ
  http://ip-address/data2: đọc độ ẩm
  http://ip-address/data3: đọc áp suất
  và đọc cả 3 thông tin:
  http://ip-address/data
  với ip-address là địa chỉ ip của kết nối wifi
  2)1 yêu cầu post để gửi 3 giá trị đên server, URI:
  http://ip-address/control
*/
#include <Arduino.h>
#include <WebServer.h>
#include <ArduinoJson.h>
// Thông tin kết nối Wifi
const char *SSID = "KhnhDuy";
const char *PWD = "00000000";


#define ENB   12          // Điều khiển tốc độ động cơ bên trái     GPIO5(D1)
#define ENA   33          // Điều khiển tốc độ động cơ bên phải    GPIO12(D6)
#define IN1  14          // L298N in1 Động cơ trái quay             GPIO4(D2)
#define IN2  27          // L298N in2 Động cơ trái quay ngược lại   GPIO0(D3)
#define IN3  26           // L298N in3 Động cơ phải quay            GPIO2(D4)
#define IN4  25           // L298N in4 Động cơ phải quay ngược lại GPIO14(D5)
int speed = 150;
int tien = 0;
int lui = 0;
int trai = 0;
int phai = 0;
String ipString;

IPAddress local_ip(192, 168, 131, 6);
IPAddress gateway(192, 168, 131, 1);
IPAddress subnet(255, 255, 255, 0);
IPAddress primaryDNS(8, 8, 8, 8); // optional
IPAddress secondaryDNS(8, 8, 4, 4); // optional

// Khai báo đối tượng webserver
WebServer server(80);
// Khai báo các
StaticJsonDocument<250> jsonDocument;
char buffer[250];
// Khai báo các biến chứa dữ liệu test
int ip;

const int LED_PIN = 4;
// Khai báo các tài nguyên trên Server
void setup_routing() {
  server.on("/ip", getIP);
  server.on("/control", HTTP_POST, handlePost);
  server.on("/user", user);
  server.begin();
}
//Hàm tạo đối tượng JSON, có thể hiệu chỉnh
//cho phù hợp với ứng dụng
void create_json(char *tag, String value) {
  jsonDocument.clear();
  jsonDocument["type"] = tag;
  jsonDocument["value"] = value;
  serializeJson(jsonDocument, buffer);
}

void create_json_user(char *username, String value1, char *password, String value2) {
  jsonDocument.clear();
  jsonDocument["type1"] = username;
  jsonDocument["value1"] = value1;
  jsonDocument["type2"] = password;
  jsonDocument["value2"] = value2;
  serializeJson(jsonDocument, buffer);
}

void updateIP(void * parameter) {
  for (;;) {
    IPAddress ip = WiFi.localIP();
    ipString = "";
    for (int i = 0; i < 4; i++) {
      ipString += String(ip[i]);
      if (i < 3) {
        ipString += ".";
      }
    }
    vTaskDelay(10000 / portTICK_PERIOD_MS); // Chờ 10 giây trước khi cập nhật lại
  }
}
// Tác vụ chớp tắt LED, chỉ báo trạng thái
void blinking_led(void * parameter) {
  int i;
  for (;;) {
    digitalWrite(2, 1);
    vTaskDelay(1000 / portTICK_PERIOD_MS);
    digitalWrite(2, 0);
    vTaskDelay(1000 / portTICK_PERIOD_MS);
  }
}
// Hàm đọc data1
void getIP() {
  Serial.println("Get IP");
  create_json("IP", ipString);
  server.send(200, "application/json", buffer);
}

void user() {
  Serial.println("Sign In");
  create_json_user("username", "nhom6", "password", "kc359");
  server.send(200, "application/json", buffer);
}

// Hàm handler của yêu cầu POST
void handlePost() {
  if (server.hasArg("plain") == false) {
  }
  // Đọc nội dung yêu cầu post
  String body = server.arg("plain");
  deserializeJson(jsonDocument, body);
  // In ra màn hình để kiểm tra
  Serial.println(server.arg(1));
  Serial.println(body);
  // Đọc các giá trị từ server
  uint8_t up = jsonDocument["UP"];
  uint8_t down = jsonDocument["DOWN"];
  uint8_t left = jsonDocument["LEFT"];
  uint8_t right = jsonDocument["RIGHT"];
  // In giá trị để kiểm tra
  Serial.println("UP = " + String(up)
                 + "DOWN = " + String(down)
                 + "LEFT = " + String(left)
                 + "RIGHT = " + String(right));
  // Phản hồi về OK về client
  server.send(200, "application/json", "{}");

  //Check dieu kien
  if (up == 1)
  {
    Tien(); tien = 1;
    Serial.println("Đang tiến");
  }
  else if (up == 0 && (lui == 0 && trai == 0 && phai == 0)) {
    stopCar(); tien = 0;
    Serial.println("Đang dừng");
  }
  if (down == 1)
  {
    Lui(); lui = 1;
    Serial.println("Đang lùi");
  }
  else if (down == 0 && (tien == 0 && trai == 0 && phai == 0)) {
    stopCar(); lui = 0;
    Serial.println("Đang dừng");
  }
  if (left == 1)
  {
    retrai(); trai = 1;
    Serial.println("Đang rẻ trái");
  }
  else if (left == 0 && (tien == 0 && lui == 0 && phai == 0)) {
    stopCar(); trai = 0;
    Serial.println("Đang dừng");
  }
  if (right == 1)
  {
    rephai(); phai = 1;
    Serial.println("Đang rẻ phải");
  }
  else if (right == 0 && (tien == 0 && lui == 0 && trai == 0)) {
    stopCar(); phai = 0;
    Serial.println("Đang dừng");
  }
}

void setup_task() {
  xTaskCreate(updateIP, "Update IP", 1000, NULL, 1, NULL );
  xTaskCreate( blinking_led, "Blinking led", 1000, NULL, 1, NULL );
}

/********************************************* Tiến tới *****************************************************/
void Tien()
{
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  analogWrite(ENA, speed - 20);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  analogWrite(ENB, speed + 10);
}
/********************************** Lùi lại ******************************************/
void Lui()
{
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, speed);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  analogWrite(ENB, speed);
}
/********************************** Dừng lại ******************************************/
void stopCar()
{
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  //analogWrite(ENA, 0);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
  analogWrite(ENB, 0);
}
/********************************** Rẽ trái ******************************************/
void retrai()
{
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, speed);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  analogWrite(ENB, speed);
}
/********************************** Rẽ phải ******************************************/
void rephai()
{
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  analogWrite(ENA, speed);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
  analogWrite(ENB, speed);
}
//.............................................
void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(ENA, OUTPUT);
  pinMode(ENB, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  // Chờ kết nối wifi
  Serial.print("Connecting to Wi - Fi");
  WiFi.begin(SSID, PWD);
  if (!WiFi.config(local_ip, gateway, subnet, primaryDNS, secondaryDNS)) {
    Serial.println("STA Failed to configure");
  }
  while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(LED_PIN, HIGH); // Bật đèn LED
    delay(250);
    digitalWrite(LED_PIN, LOW); // Tắt đèn LED
    delay(250);
    Serial.print(".");
  }
  Serial.print("Connected! IP Address: ");
  Serial.println(WiFi.localIP());
  // Tạo task và các tài nguyên trên webserver
  setup_task();
  setup_routing();
  pinMode(2, OUTPUT);
}

// Vòng lập chỉnh chờ yêu cầu từ client
void loop() {
  server.handleClient();
}
