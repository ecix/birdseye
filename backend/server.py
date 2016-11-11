"""
Lightweight Birdseye backend server
"""

from flask import Flask, jsonify
from config import settings


#
# Setup and initialization
#

app = Flask(__name__)


#
# Bird API proxy
#
@app.route('/api/')
def api_index():
    return 'Api endpoints'


@app.route('/api/routeserver/')
def api_routeserver_index():
    """List all bird servers"""
    result = [{
        'id': i,
        'name': server[0],
    } for i, server in enumerate(settings.BIRD_SERVERS)]

    return jsonify(result)

@app.route('/api/routeserver/<pk>/')
def api_routeserver_show(pk):
    return 'Routeserver {}'.format(pk)


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
