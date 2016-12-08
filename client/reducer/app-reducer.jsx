
import { combineReducers } from 'redux'


// Library Reducers
import { routerReducer } from 'react-router-redux'

// Application Reducers
import routeserversReducer
  from 'components/routeservers/reducer'

import bgpAttributesModalReducer
  from 'components/routeservers/routes/bgp-attributes-modal-reducer'

import errorsReducer
  from 'components/errors/reducer'


export default combineReducers({
  routeservers:       routeserversReducer,
  bgpAttributesModal: bgpAttributesModalReducer,
  routing:            routerReducer,
  errors:             errorsReducer
});

