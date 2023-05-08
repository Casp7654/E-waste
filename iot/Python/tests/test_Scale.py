import unittest
from Classes.Scale import Scale

class test_scale(unittest.TestCase):
    def test_wait(self):
        scale = Scale('/dev/ttyUSB3')
        scale.wait()

        # Place somtething on the weight
        
    def test_read(self):
        scale = Scale('/dev/ttyUSB3')
        weight = scale.read()

        # Place a known weight on the scale
        self.assertGreater(weight > 0)