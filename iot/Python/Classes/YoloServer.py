import requests

class YoloServer():
    def __init__(self, url) -> None:
        self.url = url

    def analyse_image(self, filename):
        files = {"file": open(filename, "rb")}
        response = requests.post(self.url, files=files)
        return response.text