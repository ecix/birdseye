
import React from 'react'
import {connect} from 'react-redux'

import {Link} from 'react-router'

import Details    from '../details'
import Status     from '../status'
import PageHeader from 'components/page-header'

import Routes     from './routes'

import SearchInput from 'components/search-input'

import BgpAttributesModal
  from './bgp-attributes-modal'

import {setRoutesFilterValue} from '../actions'

import {loadRouteserverProtocol}
  from 'components/routeservers/actions'

import RoutesTimeseriesView
	from 'components/charts/routes-timeseries/view'

class RoutesPage extends React.Component {

  setFilter(value) {
    this.props.dispatch(
      setRoutesFilterValue(value)
    );
  }

	componentDidMount() {
		// Assert that the protocols are loaded
		this.props.dispatch(
			loadRouteserverProtocol(this.props.routeserverId)
		);
	}

  render() {
    return(
      <div className="routeservers-page">
        <PageHeader>
          <Link to={`/routeservers/${this.props.params.routeserverId}`}>
            <Details routeserverId={this.props.params.routeserverId} />
          </Link>
        </PageHeader>

        <BgpAttributesModal />

        <div className="row details-main">
          <div className="col-md-8">

            <div className="card">
              <SearchInput
                value={this.props.routesFilterValue}
                placeholder="Filter by Network, Gateway or Interface"
                onChange={(e) => this.setFilter(e.target.value)}  />
            </div>

            <Routes routeserverId={this.props.params.routeserverId}
                    protocolId={this.props.params.protocolId} />
          </div>
          <div className="col-md-4">
            <div className="card">
              <Status routeserverId={this.props.params.routeserverId} />
            </div>
						{this.props.graphsEnabled &&
						<div className="card">
							{ this.props.protocol.neighbor_as &&	
								<RoutesTimeseriesView routeserverId={this.props.routeserverId}
																			asn={this.props.protocol.neighbor_as}
																			neighbourAddress={this.props.protocol.neighbor_address} />
							}
						</div>}
          </div>
        </div>
      </div>
    );
  }

}


export default connect(
  (state, ownProps) => {
		let routeserverId = parseInt(ownProps.params.routeserverId);

		// Get protocol
		let rs = state.routeservers.protocols[routeserverId];
		let protocol = {};
		if (rs) {
			protocol = rs[ownProps.params.protocolId];
		}

    return {
			routeserverId: routeserverId,
      routesFilterValue: state.routeservers.routesFilterValue,
			protocol: protocol,
			graphsEnabled: state.config.routes_graphs_enabled
    }
  }
)(RoutesPage);

