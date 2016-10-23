
import { combineReducers } from 'redux'


// Library Reducers
import { routerReducer } from 'react-router-redux'

// Application Reducers
import routeserversReducer
  from 'components/routeservers/reducer'


export default combineReducers({
  routeservers: routeserversReducer,
  routing:      routerReducer
});

