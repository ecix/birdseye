
import {LOAD_ROUTES_TIMESERIES_REQUEST,
			  LOAD_ROUTES_TIMESERIES_SUCCESS,
				LOAD_ROUTES_TIMESERIES_ERROR}
	from './actions'


const initialState = {
	series: {},
	seriesLoading: {},
	seriesError: {},
};


// Helper
function _keyFromPayload(payload) {
	let key = `${payload.rsId}_${payload.asn}_${payload.neighbourAddress}`;
	return key
}


export default function reducer(state=initialState, action) {
	let key = null;

	switch(action.type) {
		case LOAD_ROUTES_TIMESERIES_REQUEST:
			key = _keyFromPayload(action.payload);
			return Object.assign({}, state, {
				seriesLoading: Object.assign({}, state.seriesLoading, {
					[key]: true,
				})});
		case LOAD_ROUTES_TIMESERIES_SUCCESS:
			key = _keyFromPayload(action.payload);
			return Object.assign({}, state, {
				seriesLoading: Object.assign({}, state.seriesLoading, {
					[key]: false,
				}),
				series: Object.assign({}, state.series, {
					[key]: action.payload.timeseries
				})
			});
		case LOAD_ROUTES_TIMESERIES_ERROR:
			key = _keyFromPayload(action.payload);
			return Object.assign({}, state, {
				seriesLoading: Object.assign({}, state.seriesLoading, {
					[key]: false,
				}),
				seriesError: Object.assign({}, state.seriesError, {
					[key]: action.payload.error
				})
			});
	}

	return state
}

