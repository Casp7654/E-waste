/* Epic Arduino Statemachine */

enum State { READING,
             SENDING,
             WAITING };
State state;  // current State

float VAL;  // Read value
float A;    // Amps
float V;    // Volts

String READ;  // Read input

void setup() {
  Serial.begin(9600);
  pinMode(A0, INPUT);
  pinMode(A1, INPUT);
  Serial.print("Program is Executing\n");
}

void loop() {
  switch (state) {
    case READING:
      if (readSensors()) {
        setState(SENDING);
      }
      break;
    case SENDING:
      sendData();
      setState(WAITING);
      break;
    case WAITING:
      if (getData()) {
        setState(READING);
      }
      break;
  }
}

bool readSensors() {
  float VAL;
  // Set Volts
  VAL = analogRead(A1);
  V = VAL / 31.32;  // Voltage Calibration = Volts / Amps
  // Read Amps
  // VAL = analogRead(A0);
  // A = VAL / V ; // Amps Calibration = Amps / Volts
  if (V < 10) {  // is Obstructed?
    return true;
  }
  return false;
}

void sendData() {
  Serial.print("!\n");
}

bool getData() {
  while (Serial.available() <= 0)  // Wait for any input
  {}

  READ = Serial.readString();
  READ.trim();

  if (READ.compareTo("OK")) {
    return true;
  } else {
    Serial.print("ERR: ");
    Serial.print("got [");
    Serial.print(READ);
    Serial.print("]\n");
  }

  return false;
}

void setState(State newState) {
  printState();  // Print current State
  Serial.print(" => ");
  state = newState;
  printState();  // Print new State
  Serial.print("\n");
}

void printState() {
  switch (state) {
    case READING:
      Serial.print("READING");
      break;
    case SENDING:
      Serial.print("SENDING");
      break;
    case WAITING:
      Serial.print("WAITING");
      break;
  }
}
