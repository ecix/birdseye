

import _ from 'underscore'

import React from 'react'
import {connect} from 'react-redux'


import {loadRouteserverRoutes} from '../actions'
import {showBgpAttributes} from './bgp-attributes-modal-actions'

import Spinner from 'react-spinkit'

function _filteredRoutes(routes, filter) {
  let filtered = [];
  if(filter == "") {
    return routes; // nothing to do here
  }

  filter = filter.toLowerCase();

  // Filter protocols
  filtered = _.filter(routes, (r) => {
    return (r.network.toLowerCase().indexOf(filter) != -1 ||
            r.gateway.toLowerCase().indexOf(filter) != -1 ||
            r.interface.toLowerCase().indexOf(filter) != -1);
  });

  return filtered;
}

class RoutesTable extends React.Component {
  componentDidMount() {
    this.props.dispatch(
      loadRouteserverRoutes(this.props.routeserverId, this.props.protocolId)
    );
  }

  showAttributesModal(route) {
    this.props.dispatch(
      showBgpAttributes(route)
    );
  }

  render() {
    if(this.props.isLoading) {
      return (
        <div className="loading-indicator">
          <Spinner spinnerName="circle" />
        </div>
      );
    }

    let routes = this.props.routes[this.props.protocolId];
    if (!routes) {
      return null;
    }

    routes = _filteredRoutes(routes, this.props.filter);

    if(!routes || routes.length == 0) {
      return(
        <p className="help-block">
          No routes matched your filter.
        </p>
      );
    }

    let routesView = routes.map((r) =>
      <tr key={r.network} onClick={() => this.showAttributesModal(r)}>
        <td>{r.network}</td>
        <td>{r.gateway}</td>
        <td>{r.interface}</td>
        <td>{r.metric}</td>
      </tr>
    );

    return (
      <table className="table table-striped table-routes">
        <thead>
          <tr>
            <th>Network</th>
            <th>Gateway</th>
            <th>Interface</th>
            <th>Metric</th>
          </tr>
        </thead>
        <tbody>
          {routesView}
        </tbody>
      </table>
    );
  }
}


export default connect(
  (state) => {
    return {
      isLoading: state.routeservers.routesAreLoading,
      filter:    state.routeservers.routesFilterValue,
      routes:    state.routeservers.routes
    }
  }
)(RoutesTable);

