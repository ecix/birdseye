
import React from 'react'
import {connect} from 'react-redux'

class NoExportReason extends React.Component {
  render() {
    const route = this.props.route;

    if (!this.props.noexport_reasons || !route || !route.bgp ||
        !route.bgp.large_communities) {
        return null;
    }

    console.log("DISPROPS:", this.props);
    console.log("ROUTE LC:", route.bgp.large_communities);
    const reason = route.bgp.large_communities.filter(elem =>
      elem[0] == this.props.asn && elem[1] == this.props.reject_id
    );
    console.log("THERE SCHOULD BE A REASON:", reason);
    if (!reason.length) {
      return null;
    }

    return <p className="noexport-reason">{this.props.noexport_reasons[reason[0][2]]}</p>;
  }
}

export default connect(
  state => {
    return {
      noexport_reasons: state.routeservers.noexport_reasons,
      asn:              state.routeservers.noexport_asn,
      reject_id:        state.routeservers.noexport_reject_id,
    }
  }
)(NoExportReason);


