
// Routeserver Reducer

import {LOAD_ROUTESERVERS_REQUEST,
        LOAD_ROUTESERVERS_SUCCESS,
        LOAD_ROUTESERVER_STATUS_SUCCESS,
        LOAD_ROUTESERVER_PROTOCOL_SUCCESS,
        LOAD_ROUTESERVER_ROUTES_SUCCESS}
  from './actions'

const initialState = {
  all: [],
  details: {},
  protocols: {},
  routes: {},
  isLoading: false,
};


export default function reducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_ROUTESERVERS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case LOAD_ROUTESERVERS_SUCCESS:
      return Object.assign({}, state, {
        all: action.payload.routeservers
      });

    case LOAD_ROUTESERVER_PROTOCOL_SUCCESS:
      var protocols = Object.assign({}, state.protocols, {
        [action.payload.routeserverId]: action.payload.protocol
      });
      return Object.assign({}, state, {
        protocols: protocols
      });

    case LOAD_ROUTESERVER_ROUTES_SUCCESS:
      var routes = Object.assign({}, state.routes, {
        [action.payload.protocolId]: action.payload.routes
      });
      return Object.assign({}, state, {
        routes: routes
      });


    case LOAD_ROUTESERVER_STATUS_SUCCESS:
      var details = Object.assign({}, state.details, {
        [action.payload.routeserverId]: action.payload.status
      });
      return Object.assign({}, state, {
        details: details
      });

  }
  return state;
}



