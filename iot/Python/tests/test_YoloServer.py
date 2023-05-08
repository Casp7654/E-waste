import unittest
from Classes.YoloServer import YoloServer

class test_yoloserver(unittest.TestCase):
    def test_analyse_image(self):
        yoloserver = YoloServer("http://34.90.55.55/upload")
        result = yoloserver.analyse_image("img.jpg")

        self.assertEqual(result, '"Inductor"')