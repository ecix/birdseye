
def interpolate_none():
    """Make non interpolator"""

    def interpolate(r0, r1, t):
        """Do not interpolate"""
        if r0.time == t:
            return r0.values
        if r1.time == t:
            return r1.values

        return None

    return interpolate


def interpolate_step():
    """Use r0 values as long as possible"""
    def interpolate(r0, r1, t):
        if r1.time >= t:
            return r0.values
        else:
            return r1.values

    return interpolate
