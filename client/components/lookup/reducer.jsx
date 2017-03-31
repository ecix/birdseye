
import {SET_QUERY_TYPE,
        SET_QUERY_VALUE,
        SET_QUERY_INPUT_VALUE,
        ROUTES_SEARCH_STARTED,
        ROUTES_SEARCH_COMPLETED}
  from './actions'

import {QUERY_TYPE_UNKNOWN} from './query'

const initialState = {
	routes: {},

    routeserversQueue: [],

	queryInput: "",

	query: "",
    queryType: QUERY_TYPE_UNKNOWN,

    queryRunning: false,
    queryFinished: false
};


// Reducer
export default function reducer(state=initialState, action) {
	switch(action.type) {
        case SET_QUERY_TYPE:
		case SET_QUERY_VALUE:
        case SET_QUERY_INPUT_VALUE:
			return Object.assign({}, state, action.payload);
	}
	return state;
}

