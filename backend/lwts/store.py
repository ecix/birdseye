"""
Lightweight Timeseries Store
"""

import os
import re
import fcntl

from datetime import datetime, timedelta

from lwts.record import Record
from lwts.series import Series, RawSeries

class Store(object):
    """Simple store using flat csv files"""
    def __init__(self, path, *args):
        """
        Initialize store with path;
        derive csv filename from args.

        Provide factory methods for reader
        and convinience method for adding datapoints
        """
        # Derive series filename
        filename = "_".join(str(a) for a in args)

        # Sanitize filename to prevent security issues
        filename = re.sub(r'\W', '-', filename)

        # Initialize datafile
        self.datafile = os.path.join(path, filename)
        open(self.datafile, 'a').close()

        # We will cache fetch_all and operate on the cache
        self._recordcache = None


    def _read_last_record(self):
        """Get last line from file and read record"""
        record = None
        with open(self.datafile, 'r') as f:
            fcntl.lockf(f, fcntl.LOCK_SH)
            try:
                f.seek(-200, 2) # This is kind of hacky.
            except IOError:
                pass # the file is not that long

            content = f.readlines()
            fcntl.lockf(f, fcntl.LOCK_UN)

            if len(content) == 0:
                return None

            last = content[-1]
            record = Record.decode(last)

        return record


    def _read_record(self, handle):
        """Read one line from file, decode as record"""
        data = handle.readline()
        if not data:
            return None
        record = Record.decode(data)
        return record


    def fetch_all(self):
        """Read all records from file"""
        if self._recordcache:
            return self._recordcache

        records = []
        with open(self.datafile, 'r') as f:
            fcntl.lockf(f, fcntl.LOCK_SH)
            data = f.readlines()
            fcntl.lockf(f, fcntl.LOCK_UN)
            records = [Record.decode(l) for l in data]

        self._recordcache = records
        return records


    def fetch_range(self, t0, t1):
        """Return all records t0 < t <= t1"""
        records = self.fetch_all() # *shrug*
        result = [r for r in records
                  if r.time > t0 and r.time <= t1]
        return result


    def fetch_after(self, t0):
        """Return all records after t0"""
        t1 = datetime.utcnow()
        return self.fetch_range(t0, t1)


    def fetch_closest(self, t):
        """Return the record closest to t"""
        records = self.fetch_all()
        if len(records) == 0:
            return None

        record_min = records[0]
        t_diff = record_min.time - t
        t_min = abs(t_diff.total_seconds())
        for record in records:
            t_diff = record.time - t
            t_delta = abs(t_diff.total_seconds())
            if t_delta < t_min:
                t_min = t_delta
                record_min = record

        return record_min


    def fetch_next(self, record):
        """Fetch next in series, relative to record"""
        records = self.fetch_all()
        num_records = len(records)
        try:
            index = records.index(record)
        except ValueError:
            return None # Record not in series

        # Get next record
        index_next = index + 1
        if index_next >= num_records:
            index_next = index # Cap at upper bound

        return records[index_next]


    def truncate(self, *args, **kwargs):
        """
        Destroy all records with t < now - delta
        All arguments are passed thru to a new timedelta.

        Example:
            truncate(days=30)

        would keep the last 30 days.
        """
        t1 = datetime.utcnow()
        t0 = t1 - timedelta(*args, **kwargs)

        records = self.fetch_range(t0, t1)

        # Save records
        return self._store_records(records)


    def _store_records(self, records):
        with open(self.datafile, 'w+') as f:
            fcntl.lockf(f, fcntl.LOCK_EX)
            for record in records:
                f.write(record.encode())
            fcntl.lockf(f, fcntl.LOCK_UN)
        self._recordcache = None # reload data


    def _append_record(self, record):
        """Append record to datafile"""
        with open(self.datafile, 'a') as f:
            fcntl.lockf(f, fcntl.LOCK_EX)
            f.write(record.encode())
            fcntl.lockf(f, fcntl.LOCK_UN)
        self._recordcache = None # reload data


    def add(self, *args, **kwargs):
        """
        Append record to datafile
        When this file is sparse, just store the
        record if there was a change.
        """

        sparse = kwargs.get('sparse', True)

        # When we are in sparse mode:
        # append only if last record was different
        last = self._read_last_record()
        if sparse and last and last.values == args:
            return False

        record = Record(*args, time=kwargs.get('time'))
        self._append_record(record)
        return True


    def destroy(self):
        """Remove datafile"""
        if not os.path.exists(self.datafile):
            return
        os.unlink(self.datafile)
        self._recordcache = None


    def series(self):
        """Series factory"""
        return Series(store=self)

    def raw(self):
        """Raw series factory"""
        return RawSeries(store=self)
