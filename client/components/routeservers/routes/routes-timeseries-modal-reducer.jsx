
import {SHOW_ROUTES_TIMESERIES_MODAL,
			  HIDE_ROUTES_TIMESERIES_MODAL}
  from './routes-timeseries-modal-actions'


const initialState = {
	rsId: 0,
	asn: null,
	neighbourAddress: null,

	show: false,
	title: "",
};


export default function reducer(state=initialState, action) {
	switch(action.type) {
		case SHOW_ROUTES_TIMESERIES_MODAL:
			return Object.assign({}, state, action.payload, {
				show: true
			});
		case HIDE_ROUTES_TIMESERIES_MODAL:
			return Object.assign({}, state, {
				show: false
			});
	}
	return state;
}

