
import {SET_QUERY_VALUE}
  from './actions'

const initialState = {
	routes: {},
	query: "",
	isSearching: false,
};

export default function reducer(state=initialState, action) {
	switch(action.type) {
		case SET_QUERY_VALUE:
			return Object.assign({}, state, {
				query: action.payload.value
			});
	}
	return state;
}

