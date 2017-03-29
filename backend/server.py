"""
Lightweight Birdseye backend server
"""

from flask import Flask, jsonify, request

from bird import client
from config import settings


#
# Setup and initialization
#

app = Flask(__name__)

#
# Helpers
#
def _bird_api_base(pk):
    bird_servers = settings.BIRD_SERVERS
    return bird_servers[int(pk)][1]


#
# Bird API proxy
#
@app.route('/birdseye/api/')
def api_index():
    return 'Api endpoints'


@app.route('/birdseye/api/routeserver/')
def api_routeserver_index():
    """List all bird servers"""
    result = [{
        'id': i,
        'name': server[0],
    } for i, server in enumerate(settings.BIRD_SERVERS)]

    return jsonify({"routeservers": result})


@app.route('/birdseye/api/routeserver/<int:pk>/lookup')
def api_routeserver_lookup(pk=None):
    """
    Generalized lookup endpoint:
    For now we support a network address as query,
    however, future features like ASN lookups should
    be possible
    """
    query = request.args.get('q', None)
    if not query:
        return jsonify({
            "routeserverId": pk,
            "result": {},
        })

    bird = client.Bird(_bird_api_base(pk))

    # For now just pass it to the bird api
    result = bird.routes_lookup_prefix(query)
    return jsonify({
        "routeserverId": pk,
        "result": result,
    })



@app.route('/birdseye/api/routeserver/<int:pk>/status/')
def status(pk=None):
    """Get status"""
    bird_api = _bird_api_base(pk)
    bird = client.Bird(bird_api)
    status = bird.status()

    # Filter last reboot in case it is not public
    if not settings.UI['rs_show_last_reboot']:
        status['last_reboot'] = None

    return jsonify(status)


@app.route('/birdseye/api/routeserver/<int:pk>/symbols/')
def symbols(pk=None):
    """Get symbols"""
    bird_api = _bird_api_base(pk)
    bird = client.Bird(bird_api)
    return jsonify(bird.symbols())


@app.route('/birdseye/api/routeserver/<int:pk>/tables/')
def tables(pk=None):
    """Get tables"""
    bird_api = _bird_api_base(pk)
    bird = client.Bird(bird_api)
    return jsonify(bird.tables())


@app.route('/birdseye/api/routeserver/<int:pk>/protocol/')
@app.route('/birdseye/api/routeserver/<int:pk>/protocol/<string:protocol>')
def protocol(pk=None, protocol="bgp"):
    """Get protocols: default protocol=bgp"""
    bird_api = _bird_api_base(pk)
    bird = client.Bird(bird_api)
    return jsonify(bird.protocols(protocol))


@app.route('/birdseye/api/routeserver/<int:pk>/routes/filtered/')
def routes_filtered(pk=None):
    """Get filtered routes for routeserver id with protocol"""
    protocol_id = request.args.get('protocol', None)
    if not protocol_id:
        return jsonify({'details': 'no protocol given'}), 404

    bird_api = _bird_api_base(pk)
    bird = client.Bird(bird_api)
    return jsonify(bird.routes_filtered(protocol_id))


@app.route('/birdseye/api/routeserver/<int:pk>/routes/')
def routes(pk=None):
    """Get routes for routeserver id with protocol"""
    protocol_id = request.args.get('protocol', None)
    if not protocol_id:
        return jsonify({ 'details': 'no protocol given' }), 404

    bird_api = _bird_api_base(pk)
    bird = client.Bird(bird_api)
    return jsonify(bird.routes(protocol_id))


@app.route('/birdseye/api/config/')
def rejection_reasons():
    return jsonify({"config": settings.FRONTEND_CONFIG})


#
# Single Page React App
#
@app.route('/', defaults={'path': None})
@app.route('/<path:path>')
def index(path):
    with open('backend/static/app/index.html', 'r') as f:
        # Read page, fix links
        content = f.read()
        content = content.replace('js/', '/static/app/js/')
        content = content.replace('css/', '/static/app/css/')
        return content



if __name__ == '__main__':
    app.run()
