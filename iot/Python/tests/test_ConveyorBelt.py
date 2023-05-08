import unittest
from Classes.ConveyorBelt import ConveyorBelt
from Classes.Scale import Scale

class test_conveyerbelt(unittest.TestCase):
    def test_start(self):
        conveyorbelt = ConveyorBelt(3)
        conveyorbelt.start()
        
    def test_start(self):
        conveyorbelt = ConveyorBelt(3)
        conveyorbelt.stop()