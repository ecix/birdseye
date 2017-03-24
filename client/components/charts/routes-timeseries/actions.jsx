
// Routes timeseries actions

import axios from 'axios'

import {apiError} from 'components/errors/actions'

export const LOAD_ROUTES_TIMESERIES_REQUEST = '@charts/LOAD_ROUTES_TIMESERIES_REQUEST';
export const LOAD_ROUTES_TIMESERIES_SUCCESS = '@charts/LOAD_ROUTES_TIMESERIES_SUCCESS';
export const LOAD_ROUTES_TIMESERIES_ERROR   = '@charts/LOAD_ROUTES_TIMESERIES_ERROR';


export function loadRoutesTimeseriesRequest(
	routeserverId, asn, neighbourAddress
) {
	return {
		type: LOAD_ROUTES_TIMESERIES_REQUEST,
		payload: {
			routeserverId: routeserverId,
			asn: asn,
			neighbourAddress: neighbourAddress
		}
	};
}


export function loadRoutesTimeseriesSuccess(
	routeserverId, asn, neighbourAddress, timeseries
) {
	return {
		type: LOAD_ROUTES_TIMESERIES_SUCCESS,
		payload: {
			timeseries: timeseries,
			routeserverId: routeserverId,
			asn: asn,
			neighbourAddress: neighbourAddress
		}
	};
}


export function loadRoutesTimeseriesError(
	routeserverId, asn, neighbourAddress, error
) {
	return {
		type: LOAD_ROUTES_TIMESERIES_ERROR,
		payload: {
			error: error,
			routeserverId: routeserverId,
			asn: asn,
			neighbourAddress: neighbourAddress
		}
	}
}


export function loadRoutesTimeseries(routeserverId, asn, neighbourAddress) {
	return (dispatch) => {
		dispatch(loadRoutesTimeseriesRequest(routeserverId, asn, neighbourAddress));
		let timeseriesUrl = `/birdseye/api/routeserver/${routeserverId}/timeseries/routes/${asn}/${neighbourAddress}`;
		axios.get(timeseriesUrl)
			.then(({data}) => {
				dispatch(loadRoutesTimeseriesSuccess(
					routeserverId, asn, neighbourAddress, data['timeseries']
				));
			})
			.catch((error) => {
        dispatch(apiError(error));
				dispatch(loadRoutesTimeseriesError(routeserverId, asn, neighbourAddress, error.data));
			});
	}
}

