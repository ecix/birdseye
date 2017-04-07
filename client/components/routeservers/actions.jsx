
/**
 * Routeservers Actions
 */

import axios from 'axios'

import {apiError} from 'components/errors/actions'

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
export const LOAD_ROUTESERVER_ROUTES_FILTERED_REQUEST = '@birdseye/LOAD_ROUTESERVER_ROUTES_FILTERED_REQUEST';
export const LOAD_ROUTESERVER_ROUTES_FILTERED_SUCCESS = '@birdseye/LOAD_ROUTESERVER_ROUTES_FILTERED_SUCCESS';

export const LOAD_ROUTESERVER_ROUTES_NOEXPORT_REQUEST = '@birdseye/LOAD_ROUTESERVER_ROUTES_NOEXPORT_REQUEST';
export const LOAD_ROUTESERVER_ROUTES_NOEXPORT_SUCCESS = '@birdseye/LOAD_ROUTESERVER_ROUTES_NOEXPORT_SUCCESS';

export const SET_PROTOCOLS_FILTER_VALUE = '@birdseye/SET_PROTOCOLS_FILTER_VALUE';
export const SET_ROUTES_FILTER_VALUE = '@birdseye/SET_ROUTES_FILTER_VALUE';



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
      .then(({data}) => {
        dispatch(loadRouteserversSuccess(data["routeservers"]));
      })
      .catch((error) => {
        dispatch(apiError(error));
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
      .then(({data}) => {
        dispatch(loadRouteserverStatusSuccess(routeserverId, data.status));
      })
      .catch((error) => {
        dispatch(apiError(error));
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
      .then(({data}) => {
        dispatch(setProtocolsFilterValue(""));
        dispatch(loadRouteserverProtocolSuccess(routeserverId, data.protocols));
      })
      .catch(error => dispatch(apiError(error)));
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
      .then(({data}) => {
        dispatch(
          loadRouteserverRoutesSuccess(routeserverId, protocolId, data.routes)
        );
        dispatch(setRoutesFilterValue(""));
      })
      .catch(error => dispatch(apiError(error)));
  }
}

export function loadRouteserverRoutesNoExportRequest(routeserverId, protocolId) {
  return {
    type: LOAD_ROUTESERVER_ROUTES_NOEXPORT_REQUEST,
    payload: {
      routeserverId: routeserverId,
      protocolId: protocolId,
    }
  }
}

export function loadRouteserverRoutesNoExportSuccess(routeserverId, protocolId, routes) {
  return {
    type: LOAD_ROUTESERVER_ROUTES_NOEXPORT_SUCCESS,
    payload: {
      routeserverId: routeserverId,
      protocolId: protocolId,
      routes: routes
    }
  }
}

export function loadRouteserverRoutesNoExport(routeserverId, protocolId) {
  return (dispatch) => {
    dispatch(loadRouteserverRoutesNoExportRequest(
        routeserverId, protocolId
    ));

    axios.get(`/birdseye/api/routeserver/${routeserverId}/routes/noexport/?protocol=${protocolId}`)
      .then(({data}) => {
        dispatch(
          loadRouteserverRoutesNoExportSuccess(routeserverId, protocolId, data.routes)
        );
      })
      .catch(error => dispatch(apiError(error)));
  }
}


export function loadRouteserverRoutesFilteredRequest(routeserverId, protocolId) {
  return {
    type: LOAD_ROUTESERVER_ROUTES_FILTERED_REQUEST,
    payload: {
      routeserverId: routeserverId,
      protocolId: protocolId,
    }
  }
}

export function loadRouteserverRoutesFilteredSuccess(routeserverId, protocolId, routes) {
  return {
    type: LOAD_ROUTESERVER_ROUTES_FILTERED_SUCCESS,
    payload: {
      routeserverId: routeserverId,
      protocolId: protocolId,
      routes: routes
    }
  }
}


export function loadRouteserverRoutesFiltered(routeserverId, protocolId) {
  return (dispatch) => {
    dispatch(loadRouteserverRoutesFilteredRequest(routeserverId, protocolId))

    axios.get(`/birdseye/api/routeserver/${routeserverId}/routes/filtered/?protocol=${protocolId}`)
      .then(({data}) => {
        dispatch(
          loadRouteserverRoutesFilteredSuccess(routeserverId, protocolId, data.routes)
        );
        dispatch(setRoutesFilterValue(""));
      })
      .catch(error => dispatch(apiError(error)));
  }
}


export function setProtocolsFilterValue(value) {
  return {
    type: SET_PROTOCOLS_FILTER_VALUE,
    payload: {
      protocolsFilterValue: value
    }
  }
}


export function setRoutesFilterValue(value) {
  return {
    type: SET_ROUTES_FILTER_VALUE,
    payload: {
      routesFilterValue: value
    }
  }
}

