
import pytest
import os

import lwts

from datetime import datetime
from lwts.record import Record

def _make_store():
    """Create and populate test store"""
    # we will remove it later
    name = 'fndmorf4223.foo'

    store = lwts.Collection('/tmp').store(name)
    store.add(23, 42, 42.5, time=datetime.utcfromtimestamp(10))
    store.add(23, 43, 45.5, time=datetime.utcfromtimestamp(20))
    return store


def test_add():
    """Append data to the store"""
    store = _make_store()
    assert len(store.fetch_all()) == 2
    res = store.add(23, 42, 43.0)
    assert res == True
    assert len(store.fetch_all()) == 3
    res = store.add(23, 42, 43.0)
    assert res == False
    assert len(store.fetch_all()) == 3
    res = store.add(42, 42, 23)
    assert res == True
    assert len(store.fetch_all()) == 4

    # Keep things clean
    store.destroy()


def test_add_dense():
    """Append data regardless of change"""
    store = _make_store()
    assert len(store.fetch_all()) == 2
    res = store.add(23, 42, 43.0, sparse=False)
    assert res == True
    assert len(store.fetch_all()) == 3
    res = store.add(23, 42, 43.0, sparse=False)
    assert res == True
    assert len(store.fetch_all()) == 4
    store.destroy()


def test_fetch_all():
    store = _make_store()
    rows = store.fetch_all()
    assert len(rows) == 2
    assert type(rows[0]) == Record
    store.destroy()


def test_fetch_range():
    store = _make_store()
    store.add(23, 23, 23.0, time=datetime.utcfromtimestamp(30))
    records = store.fetch_after(datetime.utcfromtimestamp(10))
    assert len(records) == 2

    records = store.fetch_range(datetime.utcfromtimestamp(10),
                                datetime.utcfromtimestamp(20))
    assert len(records) == 1
    store.destroy()


def test_truncate():
    store = _make_store()
    store.add(29, 30, 23.0, time=datetime.utcnow())
    assert len(store.fetch_all()) == 3
    store.truncate(days=1)
    assert len(store.fetch_all()) == 1
    store.destroy()


def test_fetch_closest():
    store = _make_store()
    r = store.fetch_closest(datetime.utcfromtimestamp(5))
    assert r.time == datetime.utcfromtimestamp(10)
    r = store.fetch_closest(datetime.utcfromtimestamp(12))
    assert r.time == datetime.utcfromtimestamp(10)
    r = store.fetch_closest(datetime.utcfromtimestamp(20))
    assert r.time == datetime.utcfromtimestamp(20)
    store.destroy()


def test_fetch_next():
    """Fetch next record"""
    store = _make_store()
    r = store.fetch_closest(datetime.utcfromtimestamp(5))
    assert r.time == datetime.utcfromtimestamp(10)
    r_next = store.fetch_next(r)
    assert r_next.time == datetime.utcfromtimestamp(20)
    # Test capping
    r_next = store.fetch_next(r)
    assert r_next.time == datetime.utcfromtimestamp(20)
    store.destroy()
