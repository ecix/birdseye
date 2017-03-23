
// Routes timeseries actions

import axios from 'axios'

import {apiError} from 'components/errors/actions'

export const LOAD_ROUTES_TIMESERIES_REQUEST = '@charts/LOAD_ROUTES_TIMESERIES_REQUEST';
export const LOAD_ROUTES_TIMESERIES_SUCCESS = '@charts/LOAD_ROUTES_TIMESERIES_SUCCESS';
export const LOAD_ROUTES_TIMESERIES_ERROR   = '@charts/LOAD_ROUTES_TIMESERIES_ERROR';


export function loadRoutesTimeseriesRequest(rsId, asn, neighbourAddress) {
	return {
		type: LOAD_ROUTES_TIMESERIES_REQUEST,
		payload: {
			rsId: rsId,
			asn: asn,
			neighbourAddress: neighbourAddress
		}
	};
}


export function loadRoutesTimeseriesSuccess(rsId, asn, neighbourAddress, timeseries) {
	return {
		type: LOAD_ROUTES_TIMESERIES_SUCCESS,
		payload: {
			timeseries: timeseries,
			rsId: rsId,
			asn: asn,
			neighbourAddress: neighbourAddress
		}
	};
}


export function loadRoutesTimeseriesError(rsId, asn, neighbourAddress, error) {
	return {
		type: LOAD_ROUTES_TIMESERIES_ERROR,
		payload: {
			error: error,
			rsId: rsId,
			asn: asn,
			neighbourAddress: neighbourAddress
		}
	}
}


export function loadRoutesTimeseries(rsId, asn, neighbourAddress) {
	return (dispatch) => {
		dispatch(loadRoutesTimeseriesRequest(rsId, asn, neighbourAddress));
		let timeseriesUrl = `/birdseye/api/routeserver/${rsId}/timeseries/routes/${asn}/${neighbourAddress}`;
		axios.get(timeseriesUrl)
			.then(({data}) => {
				dispatch(loadRoutesTimeseriesSuccess(
					rsId, asn, neighbourAddress, data['timeseries']
				));
			})
			.catch((error) => {
        dispatch(apiError(error));
				dispatch(loadRoutesTimeseriesError(rsId, asn, neighbourAddress, error.data));
			});
	}
}

