
import { combineReducers } from 'redux'


// Library Reducers
import { routerReducer } from 'react-router-redux'

// Application Reducers
import routeserversReducer
  from 'components/routeservers/reducer'

import modalsReducer
  from 'components/modals/reducer'

import errorsReducer
  from 'components/errors/reducer'

import configReducer
  from 'components/config/reducer'

import chartsReducer
	from 'components/charts/reducer'


export default combineReducers({
  routeservers:  routeserversReducer,
  modals:        modalsReducer,
  routing:       routerReducer,
  errors:        errorsReducer,
  config:        configReducer,
	charts:				 chartsReducer
});

