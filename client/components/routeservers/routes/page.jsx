
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

class RoutesPage extends React.Component {

  setFilter(value) {
    this.props.dispatch(
      setRoutesFilterValue(value)
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
          </div>
        </div>
      </div>
    );
  }

}


export default connect(
  (state) => {
    return {
      routesFilterValue: state.routeservers.routesFilterValue
    }
  }
)(RoutesPage);

