import unittest
from Classes.Webcam import Webcam

class test_webcam(unittest.TestCase):
    def test_capture_photo(self):
        webcam = Webcam(0)
        webcam.capture_photo("test.jpg")