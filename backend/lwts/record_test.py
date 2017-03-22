
import pytest
from datetime import datetime

from lwts.record import Record

def test_serialize():
    record = Record(23, 42, time=datetime(1970, 1, 1, 0, 1))
    assert record.encode() == "60 23 42\n"


def test_deserialize():
    msg = '60 23 42.5'
    record = Record.decode(msg)
    assert record.time == datetime(1970, 1, 1, 0, 1)
    assert record.values == (23, 42.5)


def test___getitem__():
    record = Record(23, 42)
    assert record[0] == 23
    assert record[1] == 42

