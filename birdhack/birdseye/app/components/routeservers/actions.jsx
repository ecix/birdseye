
/**
 * Routeservers Actions
 */

import axios from 'axios'

export const LOAD_ROUTESERVERS_REQUEST = '@birdseye/LOAD_ROUTESERVERS_REQUEST';
export const LOAD_ROUTESERVERS_SUCCESS = '@birdseye/LOAD_ROUTESERVERS_SUCCESS';
export const LOAD_ROUTESERVERS_ERROR   = '@birdseye/LOAD_ROUTESERVERS_ERROR';

export const LOAD_ROUTESERVER_STATUS_REQUEST = '@birdseye/LOAD_ROUTESERVER_STATUS_REQUEST';
export const LOAD_ROUTESERVER_STATUS_SUCCESS = '@birdseye/LOAD_ROUTESERVER_STATUS_SUCCESS';
export const LOAD_ROUTESERVER_STATUS_ERROR   = '@birdseye/LOAD_ROUTESERVER_STATUS_ERROR';

export const LOAD_ROUTESERVER_PROTOCOL_REQUEST = '@birdseye/LOAD_ROUTESERVER_PROTOCOL_REQUEST';
export const LOAD_ROUTESERVER_PROTOCOL_SUCCESS = '@birdseye/LOAD_ROUTESERVER_PROTOCOL_SUCCESS';
export const LOAD_ROUTESERVER_PROTOCOL_ERROR   = '@birdseye/LOAD_ROUTESERVER_PROTOCOL_ERROR';

export const LOAD_ROUTESERVER_ROUTES_REQUEST = '@birdseye/LOAD_ROUTESERVER_ROUTES_REQUEST';
export const LOAD_ROUTESERVER_ROUTES_SUCCESS = '@birdseye/LOAD_ROUTESERVER_ROUTES_SUCCESS';
export const LOAD_ROUTESERVER_ROUTES_ERROR   = '@birdseye/LOAD_ROUTESERVER_ROUTES_ERROR';


// Action Creators
export function loadRouteserversRequest() {
  return {
    type: LOAD_ROUTESERVERS_REQUEST
  }
}

export function loadRouteserversSuccess(routeservers) {
  return {
    type: LOAD_ROUTESERVERS_SUCCESS,
    payload: {
      routeservers: routeservers
    }
  }
}

export function loadRouteserversError(error) {
  return {
    type: LOAD_ROUTESERVERS_ERROR,
    payload: {
      error: error
    }
  }
}

export function loadRouteservers() {
  return (dispatch) => {
    dispatch(loadRouteserversRequest())

    axios.get('/birdseye/api/routeserver/')
      .then((result) => {
        dispatch(loadRouteserversSuccess(result.data));
      })
      .catch((error) => {
        dispatch(loadRouteserversError(error.data));
      });
  }
}



export function loadRouteserverStatusRequest(routeserverId) {
  return {
    type: LOAD_ROUTESERVER_STATUS_REQUEST,
    payload: {
      routeserverId: routeserverId
    }
  }
}

export function loadRouteserverStatusSuccess(routeserverId, status) {
  return {
    type: LOAD_ROUTESERVER_STATUS_SUCCESS,
    payload: {
      status: status,
      routeserverId: routeserverId
    }
  }
}

export function loadRouteserverStatusError(routeserverId, error) {
  return {
    type: LOAD_ROUTESERVER_STATUS_ERROR,
    payload: {
      error: error,
      routeserverId: routeserverId
    }
  }
}

export function loadRouteserverStatus(routeserverId) {
  return (dispatch) => {
    dispatch(loadRouteserverStatusRequest(routeserverId));
    axios.get(`/birdseye/api/routeserver/${routeserverId}/status/`)
      .then((result) => {
        dispatch(loadRouteserverStatusSuccess(routeserverId, result.data));
      })
      .catch((error) => {
        dispatch(loadRouteserverStatusError(routeserverId, error.data));
      });
  }
}


export function loadRouteserverProtocolRequest(routeserverId) {
  return {
    type: LOAD_ROUTESERVER_PROTOCOL_REQUEST,
    payload: {
      routeserverId: routeserverId,
    }
  }
}

export function loadRouteserverProtocolSuccess(routeserverId, protocol) {
  return {
    type: LOAD_ROUTESERVER_PROTOCOL_SUCCESS,
    payload: {
      routeserverId: routeserverId,
      protocol: protocol
    }
  }
}

export function loadRouteserverProtocol(routeserverId) {
  return (dispatch) => {
    dispatch(loadRouteserverProtocolRequest(routeserverId));
    axios.get(`/birdseye/api/routeserver/${routeserverId}/protocol/`)
      .then((result) => {
        dispatch(loadRouteserverProtocolSuccess(routeserverId, result.data));
      });
  }
}


export function loadRouteserverRoutesRequest(routeserverId, protocolId) {
  return {
    type: LOAD_ROUTESERVER_ROUTES_REQUEST,
    payload: {
      routeserverId: routeserverId,
      protocolId: protocolId,
    }
  }
}

export function loadRouteserverRoutesSuccess(routeserverId, protocolId, routes) {
  return {
    type: LOAD_ROUTESERVER_ROUTES_SUCCESS,
    payload: {
      routeserverId: routeserverId,
      protocolId: protocolId,
      routes: routes
    }
  }
}


export function loadRouteserverRoutes(routeserverId, protocolId) {
  return (dispatch) => {
    dispatch(loadRouteserverRoutesRequest(routeserverId, protocolId))

    axios.get(`/birdseye/api/routeserver/${routeserverId}/routes/?protocol=${protocolId}`)
      .then((result) => {
        dispatch(
          loadRouteserverRoutesSuccess(routeserverId, protocolId, result.data)
        );
      });
  }
}

