
# Datastructure
from lwts.store import Store
from lwts.collection import Collection

# Interpolators
from lwts.interpolators import interpolate_none,\
                               interpolate_step


# Convinience functions
def open(*args, **kwargs):
    """Open a collection"""
    return Collection(*args, **kwargs)

