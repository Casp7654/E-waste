import time
import serial

class PhotoSensor:
    def __init__(self, port) -> None:
        self.serialConnection = serial.Serial(port, 9600)

    def wait(self):
        self.serialConnection.write(b"OK\n")

        while True:
            if self.serialConnection.in_waiting > 0:
                line = self.serialConnection.readline().decode('utf-8').rstrip()
                if(line =="!"):
                    return()