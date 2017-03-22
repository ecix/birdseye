
import pytest

import lwts

from datetime import datetime
from lwts.record import Record

def _make_store():
    """Create and populate test store"""
    store = lwts.Collection('/tmp').store('gwb9eubd')
    store.add(23, 42, time=datetime.utcfromtimestamp(10))
    store.add(23, 43, time=datetime.utcfromtimestamp(20))
    store.add(24, 44, time=datetime.utcfromtimestamp(30))
    store.add(24, 40, time=datetime.utcfromtimestamp(40))
    return store


def _make_sparse_store():
    store = lwts.Collection('/tmp').store('gwb9eubd')
    store.add(23, 42, time=datetime.utcfromtimestamp(10))
    store.add(23, 43, time=datetime.utcfromtimestamp(30))
    store.add(24, 44, time=datetime.utcfromtimestamp(40))
    store.add(24, 40, time=datetime.utcfromtimestamp(60))
    return store


def test_interpolate_none():
    store = _make_store()
    ts = store.series().sample(seconds=5)\
                       .interpolate(lwts.interpolate_none())\
                       .after(datetime.utcfromtimestamp(0))\
                       .until(datetime.utcfromtimestamp(40))
    res = list(ts)
    # No additional results should have been created
    assert len(res) == 4
    store.destroy()


def test_interpolate_step():
    store = _make_store()
    ts = store.series().sample(seconds=5)\
                       .interpolate(lwts.interpolate_step())\
                       .after(datetime.utcfromtimestamp(0))\
                       .until(datetime.utcfromtimestamp(40))

    res = list(ts)
    # Additional results should have been interpolated
    assert len(res) == 8

    expected = [
        (datetime(1970, 1, 1, 0, 0, 5),  23, 42),
        (datetime(1970, 1, 1, 0, 0, 10), 23, 42),
        (datetime(1970, 1, 1, 0, 0, 15), 23, 42),
        (datetime(1970, 1, 1, 0, 0, 20), 23, 43),
        (datetime(1970, 1, 1, 0, 0, 25), 23, 43),
        (datetime(1970, 1, 1, 0, 0, 30), 24, 44),
        (datetime(1970, 1, 1, 0, 0, 35), 24, 44),
        (datetime(1970, 1, 1, 0, 0, 40), 24, 40),
    ]
    assert res == expected

    store.destroy()


def test_interpolate_step_sparse():
    store = _make_sparse_store()
    ts = store.series().sample(seconds=10)\
                       .interpolate(lwts.interpolate_step())\
                       .after(datetime.utcfromtimestamp(0))\
                       .until(datetime.utcfromtimestamp(40))

    res = list(ts)
    # Additional results should have been interpolated

    expected = [
        (datetime(1970, 1, 1, 0, 0, 10), 23, 42),
        (datetime(1970, 1, 1, 0, 0, 20), 23, 42),
        (datetime(1970, 1, 1, 0, 0, 30), 23, 43),
        (datetime(1970, 1, 1, 0, 0, 40), 24, 44),
    ]

    assert res == expected

    store.destroy()

