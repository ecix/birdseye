import axios from 'axios';
import {apiError} from 'components/errors/actions'
import {loadRejectReasonsSuccess} from 'components/routeservers/actions';

export const LOAD_CONFIG_SUCCESS = "@birdseye/LOAD_CONFIG_SUCCESS";

function loadConfigSuccess(config) {
  return {
    type: LOAD_CONFIG_SUCCESS,
		payload: {
			routes_columns: config.routes_columns,
			routes_graphs_enabled: config.routes_graphs_enabled
		}
  }
}

export function loadConfig() {
  return (dispatch) => {
    axios.get(`/birdseye/api/config/`)
      .then(({data}) => {
        dispatch(
          loadRejectReasonsSuccess(data.config.rejection.asn,
                                   data.config.rejection.reject_id,
                                   data.config.reject_reasons)
        );
        dispatch(loadConfigSuccess(data.config));
      })
      .catch(error => dispatch(apiError(error)));
  }
}
