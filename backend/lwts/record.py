
"""
A record represents a tuple of
time and values.
"""

import calendar
from datetime import datetime

import os


class Record(object):

    def __init__(self, *args, **kwargs):
        """Initialize record"""
        time = kwargs.get('time', None)
        if time == None:
            time = datetime.utcnow()

        self.time = time
        self.values = args


    def __getitem__(self, i):
        return self.values[i]


    @staticmethod
    def _encode_timestamp(dt):
        """Get timestamp from datetime"""
        return calendar.timegm(dt.utctimetuple())


    def encode(self):
        """Serialize record"""
        ts = Record._encode_timestamp(self.time)
        packed = str(ts) + ' '
        packed += " ".join(str(v) for v in self.values)
        packed += "\n"
        return packed


    @staticmethod
    def _decode_value(token):
        """Determin type, return value"""
        if "." in token:
            return float(token)
        return int(token)


    @staticmethod
    def decode(msg):
        """Unserialize record"""
        tokens = msg.split(' ')
        ts = datetime.utcfromtimestamp(float(tokens[0]))
        values = [Record._decode_value(t) for t in tokens[1:]]
        return Record(*values, time=ts)

