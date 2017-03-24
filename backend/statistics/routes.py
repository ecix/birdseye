

"""
Stats tasks - Should be run via script / cron
"""

from datetime import datetime, timedelta

from bird import client
from config import settings

import lwts

def update_routeserver_routes(name, api_base):
    """Update all routes received and filtered from a RS"""
    bird = client.Bird(api_base)
    protocols = bird.protocols()


    # Storing p['routes'].get('exported', 0), results in
    # a lot of fluctuating data; unsuited for our timeseries store.

    stats = [((name, p['neighbor_as'], p['neighbor_address']),
              (p['routes'].get('imported', 0),
               p['routes'].get('filtered', 0)))
             for _, p in protocols['protocols'].iteritems()]

    for key, values in stats:
        # Insert values
        lwts.open(settings.TIMESERIES_ROUTES_PATH)\
            .store(*key)\
            .add(*values)



def update_routeservers_routes():
    """Fetch stats from all routeservers"""
    servers = settings.BIRD_SERVERS
    for name, api_base in servers:
        update_routeserver_routes(name, api_base)



def fetch_series(routeserver_id, asn, address):
    """Fetch series and return json serializeable list"""
    rs = settings.BIRD_SERVERS[routeserver_id]
    name = rs[0]
    key = (name, asn, address)

    t0 = datetime.utcnow() - timedelta(days=30)

    # Fetch timeseries
    try:
        series = lwts.open(settings.TIMESERIES_ROUTES_PATH)\
                     .store(*key, strict=True)\
                     .raw().after(t0)
    except:
        series = []

    return series
