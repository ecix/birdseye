
"""
Bird api consumer
"""

import requests
from werkzeug.exceptions import abort

class Bird(object):
    """Bird client"""

    def __init__(self, bird_api_base):
        """Initialize bird api consumer"""
        self.bird_api_base = bird_api_base

    def _api_get(self, endpoint):
        """Make API request and return parsed json"""
        url = "{}{}".format(self.bird_api_base, endpoint)
        res = requests.get(url)
        if res.status_code != 200:
            abort(res.status_code)
        response = res.json()
        return response

    def status(self):
        """Get bird API status"""
        # Make API request
        return self._api_get("/status")

    def protocols(self, protocol="bgp"):
        """Get bird API protocols"""
        return self._api_get("/protocols/{}".format(protocol))

    def symbols(self):
        """Get bird symbols"""
        return self._api_get("/symbols")

    def routes(self, protocol):
        """Get routes for neighbour"""
        return self._api_get("/routes/protocol/{}".format(protocol))

    def routes_filtered(self, protocol):
        """Get routes for neighbour"""
        return self._api_get("/routes/filtered/{}".format(protocol))

    def routes_noexport(self, protocol):
        """Get not exported routes for neighbour by protocol"""
        return self._api_get("/routes/noexport/{}".format(protocol))

    def tables(self):
        """Get tables"""
        return self._api_get("/symbols/tables")
