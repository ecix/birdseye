import os
from lwts.store import Store


class Collection(object):
    """
    Wrapper for nicer api:
    Db is basically a Store factory
    """
    def __init__(self, path=None):
        if path == None:
            path = '.'

        self.path = os.path.abspath(path)

        # Check if path exists
        if not os.path.exists(self.path):
            raise ValueError('{} does not exist'.format(self.path))

    def store(self, *args):
        """Store factorty"""
        return Store(self.path, *args)

