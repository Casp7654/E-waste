import unittest
from Classes.PhotoSensor import PhotoSensor

class test_photosensor(unittest.TestCase):
    def test_wait(self):
        photosensor = PhotoSensor('/dev/ttyUSB1')
        photosensor.wait()

        #Obstruct the photosensor