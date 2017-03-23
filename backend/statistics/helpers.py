
from datetime import datetime
import calendar


def _datetime_to_timestamp(date):
    """Convert datetime to (js) timestamp"""
    return int(calendar.timegm(date.timetuple()) * 1000)

def json_timeseries(series):
    """Transform series into a json serializable series"""
    result = [(_datetime_to_timestamp(r[0]), ) + r[1:]
              for r in series]

    return result

