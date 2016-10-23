
import React from 'react'
import {connect} from 'react-redux'


import {loadRouteserverRoutes} from '../actions'

class RoutesTable extends React.Component {
  componentDidMount() {
    this.props.dispatch(
      loadRouteserverRoutes(this.props.routeserverId, this.props.protocolId)
    );
  }

  render() {
    let routes = this.props.routes[this.props.protocolId];
    if (!routes) {
      return null;
    }

    let routesView = routes.map((r) =>
      <tr key={r.network}>
        <td>{r.network}</td>
        <td>{r.gateway}</td>
        <td>{r.interface}</td>
      </tr>
    );

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Network</th>
            <th>Gateway</th>
            <th>Interface</th>
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
      routes: state.routeservers.routes
    }
  }
)(RoutesTable);

