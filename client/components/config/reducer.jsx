import {LOAD_CONFIG_SUCCESS} from './actions'

const initialState = {
  routes_columns: {
    Gateway: "gateway",
    Interface: "interface",
    Metric: "metric",
  }
};


export default function reducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_CONFIG_SUCCESS:
      return {
				routes_columns: action.payload.routes_columns,
				routes_graphs_enabled: action.payload.routes_graphs_enabled,
			};
  }
  return state;
}



