"""
Birdseye configuration
"""

import sys

from configparser import ConfigParser

config = ConfigParser()
res = config.read([
    'etc/birdseye/birdseye.conf',
    'etc/birdseye/birdseye.local.conf',
    '/etc/birdseye/birdseye.conf',
])

if not res:
    print("")
    print("-------------[Configure Me]-------------")
    print("It looks like you are setting up your")
    print("birdseye installation.")
    print("")
    print("Please find an example configuration in")
    print("    etc/birdseye/birdseye.example.conf")
    print("")
    sys.exit(-1)

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
NOEXPORT_REASONS = dict(config.items('noexport_reasons'))

ROUTES_COLUMNS = dict(config.items('routes_columns'))
FRONTEND_CONFIG = {
    "routes_columns": ROUTES_COLUMNS,
    "reject_reasons": REJECT_REASONS,
    "rejection": REJECTION,
}
