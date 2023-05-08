import time
import RPi.GPIO as GPIO


class ConveyorBelt:
    def __init__(self, pin) -> None:
        self.pin = pin

        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(pin, GPIO.OUT)

    def start(self):
        GPIO.output(self.pin, False)
        GPIO.output(self.pin, True)

    def stop(self):
        GPIO.output(self.pin, False)
        GPIO.cleanup()