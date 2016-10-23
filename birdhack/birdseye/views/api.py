"""
Birdseye API
"""

from rest_framework import routers, status, views, viewsets
from rest_framework.decorators import detail_route

from rest_framework.response import Response

from django.conf import settings

from birdseye.bird import client


# 
# Viewsets
#


class RouteserverViewSet(viewsets.ViewSet):
    """Routeservers endpoint"""

    def _bird_api_base(self, rs_id):
        """Get the bird api base by id"""
        bird_servers = settings.BIRDSEYE_SERVERS
        return bird_servers[int(rs_id)][1]


    def list(self, request):
        """List all routeservers"""
        bird_servers = settings.BIRDSEYE_SERVERS

        result = [{
            'id': i,
            'name': server[0]
        } for i, server in enumerate(bird_servers)]


        return Response(result)

    @detail_route()
    def status(self, request, pk=None):
        """Get status"""
        bird_api = self._bird_api_base(pk)
        bird = client.Bird(bird_api)
        return Response(bird.status())


    @detail_route()
    def symbols(self, request, pk=None):
        """Get symbols"""
        bird_api = self._bird_api_base(pk)
        bird = client.Bird(bird_api)
        return Response(bird.symbols())


    @detail_route()
    def tables(self, request, pk=None):
        """Get tables"""
        bird_api = self._bird_api_base(pk)
        bird = client.Bird(bird_api)
        return Response(bird.tables())


    @detail_route()
    def protocol(self, request, pk=None):
        """Get protocols: default protocol=bgp"""
        protocol = request.query_params.get('protocol', 'bgp')
        bird_api = self._bird_api_base(pk)
        bird = client.Bird(bird_api)
        return Response(bird.protocols(protocol))


    @detail_route()
    def routes(self, request, pk=None):
        """Get routes for routeserver id with protocol"""
        protocol_id = request.query_params.get('protocol', None)
        if not protocol_id:
            return Response({ 'details': 'no protocol given' }, status=404)

        bird_api = self._bird_api_base(pk)
        bird = client.Bird(bird_api)
        return Response(bird.routes(protocol_id))

# Create router
router = routers.DefaultRouter()
router.register('routeserver', RouteserverViewSet, base_name='api-routeservers')
