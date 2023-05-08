import time
import serial
import RPi.GPIO as GPIO

class Printer:
    def __init__(self, port) -> None:
        self.serialConnection = serial.Serial(port, 115200)
        
        # Since it takes a little time to connect to the printer,
        # we add a little bit of a delay to make sure the connection it up
        time.sleep(2)
        
        # Home the printer, so we know the start axis
        self.serialConnection.write(str.encode("G28\r\n"))

    def setAxis(self, position):
        self.serialConnection.write(str.encode("G0 Y"+position+" F18000 \r\n"))