import pytest
import lwts


def test_collection_init():
    """Open a collection and check for errors"""

    # This should work
    c = lwts.Collection('/tmp')
    assert c.path == '/tmp'

    # This should work too
    c = lwts.Collection() # Path is .
    assert 'lwts' in c.path

    with pytest.raises(ValueError):
        # This should fail
        lwts.Collection('/foo/13y2tdjh/gazorpazorp')


def test_short_open():
    c = lwts.open('/tmp')
    assert c.path == '/tmp'


def test_store_factory():
    """Open a store"""
    store = lwts.Collection().store('foo.bar', 23)
    assert store.datafile.endswith('foo-bar_23')
    store.destroy()



