

import _ from 'underscore'

import React from 'react'
import {connect} from 'react-redux'

import {loadRouteserverProtocol}
  from 'components/routeservers/actions'

import {Link} from 'react-router'

import RelativeTime
	from 'components/relativetime'

import LoadingIndicator
	from 'components/loading-indicator/small'

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


class RoutesLink extends React.Component {
  render() {
    let url = `/routeservers/${this.props.routeserverId}/protocols/${this.props.protocol}/routes`;
    if (this.props.state != 'up') {
      return (<span>{this.props.children}</span>);
    }
    return (
      <Link to={url}>
        {this.props.children}
      </Link>
    )
  }
}

class NeighboursTable extends React.Component {

  render() {
    let neighbours = this.props.neighbours.map( (n) => {
      return (
        <tr key={n.protocol}>
          <td>
            <RoutesLink routeserverId={this.props.routeserverId}
                        protocol={n.protocol}
                        state={n.state}>
             {n.neighbor_address}
            </RoutesLink>
           </td>
          <td>{n.neighbor_as}</td>
          <td>{n.state}</td>
          <td className="date-since">
            <RelativeTime value={n.state_changed} suffix={true} />
          </td>
          <td>
            <RoutesLink routeserverId={this.props.routeserverId}
                        protocol={n.protocol}
                        state={n.state}>
              {n.description}
              {n.state != "up" && n.last_error &&
                <span className="protocol-state-error">
                    {n.last_error}
                </span>}
            </RoutesLink>
          </td>
          <td>
            <RoutesLink routeserverId={this.props.routeserverId}
                        protocol={n.protocol}
                        state={n.state}>
              {n.routes.imported}
            </RoutesLink>
          </td>
        <td>
            <RoutesLink routeserverId={this.props.routeserverId}
                        protocol={n.protocol}
                        state={n.state}>
              {n.routes.filtered}
            </RoutesLink>
          </td>
        </tr>
      );
    });

    let uptimeTitle;
    switch(this.props.state) {
      case 'up':
        uptimeTitle = 'Uptime'; break;
      case 'down':
        uptimeTitle = 'Downtime'; break;
      case 'start':
        uptimeTitle = 'Since'; break;
    }

    return (
      <div className="card">
        <table className="table table-striped table-protocols">
          <thead>
            <tr>
              <th>Neighbour</th>
              <th>ASN</th>
              <th>State</th>
              <th>{uptimeTitle}</th>
              <th>Description</th>
              <th>Routes Recv.</th>
              <th>Routes Filtered</th>
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


class Protocols extends React.Component {
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
        <div className="card">
					<LoadingIndicator />
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
        <div className="card">
          <p className="help-block">
            No neighbours could be found.
          </p>
        </div>
      );
    }

    // Filter neighbours
    let neighboursUp = [];
    let neighboursDown = [];
    let neighboursIdle = [];

    for (let id in protocol) {
      let n = protocol[id];
      switch(n.state) {
        case 'up':
          neighboursUp.push(n);
          break;
        case 'down':
          neighboursDown.push(n);
          break;
        case 'start':
          neighboursIdle.push(n);
          break;
        default:
          neighboursUp.push(n);
          console.error("Couldn't classify neighbour by state:", n);
      }
    }


    // Render tables
    let tables = [];
    if (neighboursUp.length) {
      tables.push(<NeighboursTable key="up" state="up"
                                   neighbours={neighboursUp}
                                   routeserverId={this.props.routeserverId} />);
    }
    if (neighboursDown.length) {
      tables.push(<NeighboursTable key="down" state="down"
                                   neighbours={neighboursDown}
                                   routeserverId={this.props.routeserverId} />);
    }
    if (neighboursIdle.length) {
      tables.push(<NeighboursTable key="start" state="start"
                                   neighbours={neighboursIdle}
                                   routeserverId={this.props.routeserverId} />);
    }

    return (
      <div>{tables}</div>
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
)(Protocols);

