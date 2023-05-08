import unittest
from Classes.API import API

class test_api(unittest.TestCase):
    def test_start(self):
        api = API("127.0.0.1:80")
        result = api.create_component("Inductor", "5")
        self.assertIsNotNone(result)