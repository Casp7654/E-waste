import json
import requests

class API():
    def __init__(self, url) -> None:
        self.url = url

    def create_component(self, component, weight):
        data = {'component': component, 'weight': weight}

        response = requests.post(self.url, data=json.dumps(data))
        return response.text