
import { combineReducers } from 'redux'

import routesTimeseriesReducer
  from 'components/charts/routes-timeseries/reducer'

export default combineReducers({
	routes: routesTimeseriesReducer
});

