

import _ from 'underscore'

import React from 'react'
import {connect} from 'react-redux'

import {loadRouteserverProtocol}
  from 'components/routeservers/actions'

import {Link} from 'react-router'

import Spinner from 'react-spinkit'


function _filteredProtocols(protocols, filter) {
  let filtered = [];
  if(filter == "") {
    return protocols; // nothing to do here
  }

  filter = filter.toLowerCase();

  // Filter protocols
  filtered = _.filter(protocols, (p) => {
    return (p.neighbor_address.toLowerCase().indexOf(filter) != -1 ||
            p.description.toLowerCase().indexOf(filter) != -1);
  });

  return filtered;
}

class ProtocolTable extends React.Component {

  componentDidMount() {
    this.props.dispatch(
      loadRouteserverProtocol(parseInt(this.props.routeserverId))
    );
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.routeserverId != nextProps.routeserverId) {
      this.props.dispatch(
        loadRouteserverProtocol(parseInt(nextProps.routeserverId))
      );
    }
  }

  render() {
    if(this.props.isLoading) {
      return (
        <div className="loading-indicator">
          <Spinner spinnerName="circle" />
        </div>
      );
    }


    let protocol = this.props.protocols[parseInt(this.props.routeserverId)];
    if(!protocol) {
      return null;
    }

    protocol = _filteredProtocols(protocol, this.props.filter);
    if(!protocol || protocol.length == 0) {
      return (
        <p className="help-block">
          No protocols could be found.
        </p>
      );
    }


    let neighbours = [];
    for (let id in protocol) {
      let n = protocol[id];

      let routesLink = `/routeservers/${this.props.routeserverId}/protocols/${n.protocol}/routes`;
      neighbours.push(
        <tr key={id}>
          <td>
            <Link to={routesLink}>
             {n.neighbor_address}
            </Link>
           </td>
          <td>{n.neighbor_as}</td>
          <td>{n.state}</td>
          <td></td>
          <td>
            <Link to={routesLink}>
              {n.description}
            </Link>
          </td>
          <td>
            <Link to={routesLink}>
              {n.routes.imported}
            </Link>
          </td>
        </tr>
      );
    }

    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Neighbour</th>
              <th>ASN</th>
              <th>State</th>
              <th>Uptime</th>
              <th>Description</th>
              <th>Routes Recv.</th>
            </tr>
          </thead>
          <tbody>
            {neighbours}
          </tbody>
        </table>
      </div>
    );
  }
}




export default connect(
  (state) => {
    return {
      isLoading: state.routeservers.protocolsAreLoading,
      protocols: state.routeservers.protocols,
      filter: state.routeservers.protocolsFilterValue
    }
  }
)(ProtocolTable);

