
"""
A series works on a store,
configures sampling and querying.

Fetches records from the store and
returns a generator for iterating the series.
"""

from datetime import datetime, timedelta

from lwts.interpolators import interpolate_none

class RawSeries(object):
    """
    Simple Series, with sampler and interpolation method.
    Is iterable, and supports getitem.
    """
    def __init__(self, store):
        """Initialize series with store"""
        self.store = store

        # Query timerange
        self.query_t0 = datetime.utcfromtimestamp(0)
        self.query_t1 = None


    def after(self, t0):
        """Set t0 of query range"""
        self.query_t0 = t0
        return self


    def until(self, t1):
        self.query_t1 = t1
        return self


    def __iter__(self):
        """Make timeseries generator"""
        t0 = self.query_t0
        t1 = self.query_t1
        if t1 == None:
            t1 = datetime.utcnow()

        records = self.store.fetch_range(t0, t1)
        num_recods = len(records)
        if not records:
            return iter([])

        return ((r.time,) + tuple(r.values) for r in records)


    def __getitem__(self, index):
        """Naive getitem implementation"""
        result = list(self)
        return result[index]


class Series(object):
    """
    Simple Series, with sampler and interpolation method.
    Is iterable, and supports getitem.

    CAVEAT: This is slow and kindof unhandy.
            I abandon this approach for now, since
            the RawSeries is sufficient for my usecase.
    """
    def __init__(self, store):
        """Initialize series with store"""
        self.store = store

        # Configure timeseries generator
        self.sample(minutes=5)
        self.interpolate(interpolate_none())

        # We do not expect records from the age
        # of the spanish inquisition.
        self.query_t0 = datetime.utcfromtimestamp(0)
        # Nobody expects the spanish inquisition, and
        # if t1 is None, the current utcnow() will be used
        self.query_t1 = None


    def sample(self, *args, **kwargs):
        """
        Configure sampler; arguments are passed
        through to make a new timedelta.
        """
        td = timedelta(*args, **kwargs)
        self.sampling_td = td
        return self


    def interpolate(self, interpolator):
        """Configure interpolator"""
        self.interpolator = interpolator
        return self


    def after(self, t0):
        """Set t0 of query range"""
        self.query_t0 = t0
        return self


    def until(self, t1):
        self.query_t1 = t1
        return self


    def __iter__(self):
        """Make timeseries generator"""
        t0 = self.query_t0
        t1 = self.query_t1
        if t1 == None:
            t1 = datetime.utcnow()

        records = self.store.fetch_range(t0, t1)
        num_recods = len(records)
        if not records:
            return

        i = 0
        t = t0 + self.sampling_td

        while t <= t1:
            i_next = i+1
            if i_next >= num_recods:
                i_next = num_recods - 1 # Cap at upper bound

            r = records[i]
            r_next = records[i_next]
            # Caclulate (interpolated) values
            values = self.interpolator(r, r_next, t)

            # Advance in time
            t_next = t + self.sampling_td

            if values == None:
                t = t_next
                continue

            yield (t,) + tuple(values)

            # Increment index when t >= record.t
            t = t_next
            if t >= r_next.time:
                # Advance in series
                i += 1 # This only applies when sampling td <= recorded samples
                if i >= num_recods:
                    i = num_recods - 1 # Cap at upper bound


    def __getitem__(self, index):
        """Naive getitem implementation"""
        result = list(self)
        return result[index]


