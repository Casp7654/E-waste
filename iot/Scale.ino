#include <HX711.h>

// Initialize the HX711 library
HX711 scale;

#define calibration_factor -7050.0  //This value is obtained using the SparkFun_HX711_Calibration sketch


// Define the pins for the HX711 module
const int LOADCELL_DOUT_PIN = 3;
const int LOADCELL_SCK_PIN = 2;
String READ;  // Read input


const String READ_COMMAND = "Read";

// Define a variable to store the previous weight reading
long previousWeight = 0;

void setup() {
  Serial.begin(9600);                                // Start serial communication
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);  // Initialize the HX711 module
  scale.set_scale(calibration_factor);               //This value is obtained by using the SparkFun_HX711_Calibration sketch
  scale.tare();

}


void waitforweight() {
  scale.tare();
  while (true) {

    Serial.println(scale.get_units());
    if (scale.get_units() > 0.2) {
      Serial.println("OK");
      return;
    }
  }
}


void loop() {

  if (Serial.available()) {                     // Check if there is data available on serial port
    String data = Serial.readStringUntil('\n');
    Serial.println(data);

    if(data == "wait"){
      waitforweight();
    }

    if(data == "read"){
      Serial.println(scale.get_units(), 1);
    }
  }
}
