

import { combineReducers } from 'redux'

import bgpAttributesModalReducer
  from 'components/routeservers/routes/bgp-attributes-modal-reducer'

import routesTimeseriesModalReducer
	from 'components/routeservers/routes/routes-timeseries-modal-reducer'

export default combineReducers({
	bgpAttributes: bgpAttributesModalReducer,
	routesTimeseries: routesTimeseriesModalReducer
});


