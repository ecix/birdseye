"""
Birdseye configuration
"""

from configparser import ConfigParser

config = ConfigParser()
config.read([
    'etc/birdseye/birdseye.conf',
    'etc/birdseye/birdseye.local.conf',
    '/etc/birdseye/birdseye.conf',
])


# Helper
def _parse_flags(value):
    """Parse (boolean) flags"""
    if value not in ['true', 'false']:
        return value
    return value == 'true'


# Load bird servers from config
BIRD_SERVERS = [
    (config.get(bird, 'name'), config.get(bird, 'api'))
    for bird in config.sections() if bird.startswith('bird')
]

# Load server configuration
SERVER = dict(config.items('server'))

# Load UI configuration
UI = {k: _parse_flags(v) for k, v in dict(config.items('ui')).items()}

REJECTION = dict(config.items('rejection'))
REJECT_REASONS = dict(config.items('rejection_reasons'))
ROUTES_COLUMNS = dict(config.items('routes_columns'))
FRONTEND_CONFIG = {
    "routes_columns": ROUTES_COLUMNS,
    "reject_reasons": REJECT_REASONS,
    "rejection": REJECTION,
}
