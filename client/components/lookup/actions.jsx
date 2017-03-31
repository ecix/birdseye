
import axios from 'axios'

export const SET_QUERY_INPUT_VALUE = "@lookup/SET_QUERY_INPUT_VALUE";
export const SET_QUERY_VALUE       = "@lookup/SET_QUERY_VALUE";
export const SET_QUERY_TYPE        = "@lookup/SET_QUERY_TYPE";

export const RESET = "@lookup/RESET";

export const ROUTES_SEARCH_STARTED = "@lookup/ROUTES_SEARCH_STARTED";
export const ROUTES_SEARCH_COMPLETED = "@lookup/ROUTES_SEARCH_COMPLETED";



/*
 * Action Creators
 */

export function setQueryInputValue(q) {
	return {
		type: SET_QUERY_INPUT_VALUE,
		payload: {
			queryInput: q
		}
	}
}

export function setQueryValue(q) {
	return {
		type: SET_QUERY_VALUE,
		payload: {
			query: q
		}
	}
}

export function setQueryType(type) {
    return {
        type: SET_QUERY_TYPE,
        payload: {
            queryType: type
        }
    }
}

export function reset() {
    return {
        type: RESET
    }
}


export function routesSearchStarted(routeserverId, q) {
    return {
        type: ROUTES_SEARCH_STARTED,
        payload: {
            routeserverId: routeserverId,
            search: q
        }
    }
}


export function routesSearchCompleted(routeserverId, q, result) {
    return {
        type: ROUTES_SEARCH_COMPLETED,
        payload: {
            routeserverId: routeserverId,
            search: q,
            result: result
        }
    }
}


export function routesSearch(routeserverId, q) {
    return (dispatch) => {
        dispatch(routesSearchStarted(routeserverId, q));
        axios.get(`/birdseye/api/routeserver/${routeserverId}/routes/lookup?q=${q}`)
            .then((result) => {
                let routes = result.data.result.routes;
                dispatch(routesSearchCompleted(
                    routeserverId,
                    q,
                    routes
                ));
            })
            .catch((error) => {
                dispatch(routesSearchCompleted(
                    routeserverId,
                    q,
                    []
                ));
            });
    }
}

