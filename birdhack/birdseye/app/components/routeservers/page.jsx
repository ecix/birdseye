
import React from 'react'
import {connect} from 'react-redux'

import PageHeader from 'components/page-header'
import Details from './details'
import Status from './status'

import Protocols from './protocols'

class RouteserversPage extends React.Component {
  render() {
    return(
      <div className="routeservers-page">
        <PageHeader>
          <Details routeserverId={this.props.params.routeserverId} />
        </PageHeader>

        <div className="row details-main">
          <div className="col-md-8">
            <div className="card">
              <Protocols protocol="bgp" routeserverId={this.props.params.routeserverId} />
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
    return {
    };
  }
)(RouteserversPage);


