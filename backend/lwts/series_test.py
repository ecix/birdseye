import pytest
import lwts
from datetime import datetime

from series import Series

def test_empty_series__iter__():
    """Test iterator with empty series"""
    store = lwts.Collection('/tmp').store('gwb9eubd')
    series = store.raw()
    res = list(series)
    store.destroy()
    assert res == []


def test_series__iter__():
    """Test timeseries generator"""
    store = lwts.Collection('/tmp').store('gwb9eubd')
    store.add(23, 42, time=datetime.utcfromtimestamp(10))
    store.add(23, 43, time=datetime.utcfromtimestamp(20))
    store.add(24, 44, time=datetime.utcfromtimestamp(30))
    store.add(24, 40, time=datetime.utcfromtimestamp(40))

    ts = store.series().sample(seconds=1)\
                       .after(datetime.utcfromtimestamp(0))\
                       .until(datetime.utcfromtimestamp(25))

    store.destroy()
    assert len(list(ts)) == 2


def test_series__iter__():
    """Test timeseries generator"""
    store = lwts.Collection('/tmp').store('gwb9eubd')
    store.add(23, 42, time=datetime.utcfromtimestamp(10))
    store.add(23, 43, time=datetime.utcfromtimestamp(20))
    store.add(24, 44, time=datetime.utcfromtimestamp(30))
    store.add(24, 40, time=datetime.utcfromtimestamp(40))

    ts = store.series().sample(seconds=1)\
                       .after(datetime.utcfromtimestamp(0))\
                       .until(datetime.utcfromtimestamp(25))

    row = ts[1]
    store.destroy()
    assert row[0] == datetime.utcfromtimestamp(20)



def test_raw_limiting():
    """Test limiting"""
    store = lwts.Collection('/tmp').store('gwb9eubd')
    store.add(23, 42, time=datetime.utcfromtimestamp(10))
    store.add(23, 43, time=datetime.utcfromtimestamp(20))
    store.add(24, 44, time=datetime.utcfromtimestamp(30))
    store.add(24, 40, time=datetime.utcfromtimestamp(40))

    ts = store.raw().after(datetime.utcfromtimestamp(0))\
                    .until(datetime.utcfromtimestamp(35))\
                    .limit(2)


    res = list(ts)
    store.destroy()

    assert res == [
        (datetime.utcfromtimestamp(20), 23, 43),
        (datetime.utcfromtimestamp(30), 24, 44),
    ]


