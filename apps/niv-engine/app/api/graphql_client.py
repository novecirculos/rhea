import requests


class HygraphGraphQLClient:
    def __init__(self, url, headers):
        self.url = url
        self.headers = headers

    def run_query(self, query, variables=None):
        payload = {"query": query}
        if variables:
            payload["variables"] = variables
        response = requests.post(self.url, json=payload, headers=self.headers)
        return response.json()

    def run_mutation(self, mutation, variables=None):
        return self.run_query(mutation, variables)
