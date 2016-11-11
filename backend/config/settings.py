"""
Birdseye configuration
"""

from ConfigParser import ConfigParser

config = ConfigParser()
config.read([
    'etc/birdseye/birdseye.conf',
    'etc/birdseye/birdseye.local.conf',
    '/etc/birdseye/birdseye.conf',
])


# Load bird servers from config
BIRD_SERVERS = [
    (config.get(bird, 'name'), config.get(bird, 'api'))
    for bird in config.sections() if bird.startswith('bird')
]
