import unittest
from Classes.Printer import Printer

class test_printer(unittest.TestCase):
    def test_set_axis(self):
        printer = Printer('/dev/ttyUSB2')
        printer.setAxis(5)