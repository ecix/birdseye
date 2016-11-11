
"""
Bird api consumer
"""

import requests

class Bird(object):
    """Bird client"""

    def __init__(self, bird_api_base):
        """Initialize bird api consumer"""
        self.bird_api_base = bird_api_base


    def _api_get(self, endpoint):
        """Make API request and return parsed json"""
        url = "{}{}".format(self.bird_api_base, endpoint)
        res = requests.get(url)
        response = res.json()
        return response

    def status(self):
        """Get bird API status"""
        # Make API request
        endpoint = '/status'
        result = self._api_get(endpoint)

        return result.get('status')


    def protocols(self, protocol="bgp"):
        """Get bird API protocols"""
        endpoint = '/protocols/{}'.format(protocol)
        result = self._api_get(endpoint)

        return result.get('protocols')


    def symbols(self):
        """Get bird symbols"""
        endpoint = '/symbols'
        result = self._api_get(endpoint)

        return result.get('symbols')


    def routes(self, protocol):
        """Get routes for neighbour"""
        endpoint = '/routes/protocol/{}'.format(protocol)
        result = self._api_get(endpoint)

        return result.get('routes')


    def tables(self):
        """Get tables"""

        endpoint = "/symbols/tables"
        endpoint = self._api_get(endpoint)
        return endpoint.get('tables')
