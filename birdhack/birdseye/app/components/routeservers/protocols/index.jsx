

import React from 'react'
import {connect} from 'react-redux'

import {loadRouteserverProtocol}
  from 'components/routeservers/actions'

import {Link} from 'react-router'

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
    let protocol = this.props.protocols[parseInt(this.props.routeserverId)];
    if(!protocol) {
      return null;
    }

    let neighbours = [];
    for (let id in protocol) {
      let n = protocol[id];

      let routesLink = `/routeservers/${this.props.routeserverId}/protocols/${id}/routes`;
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
              <th>Neighbor</th>
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
      protocols: state.routeservers.protocols
    }
  }
)(ProtocolTable);

