
import React from 'react'
import {connect} from 'react-redux'

import {Link} from 'react-router'

import Details    from '../details'
import Status     from '../status'
import PageHeader from 'components/page-header'

import Routes     from './routes'

class RoutesPage extends React.Component {
  render() {
    return(
      <div className="routeservers-page">
        <PageHeader>
          <Link to={`/routeservers/${this.props.params.routeserverId}`}>
            <Details routeserverId={this.props.params.routeserverId} />
          </Link>
        </PageHeader>

        <div className="row details-main">
          <div className="col-md-8">
            <div className="card">
              <Routes routeserverId={this.props.params.routeserverId}
                      protocolId={this.props.params.protocolId} />
            </div>
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
    return {}
  }
)(RoutesPage);

