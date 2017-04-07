
import React from 'react'
import {connect} from 'react-redux'


class FilterReason extends React.Component {
  render() {
    const route = this.props.route;

    if (!this.props.reject_reasons || !route || !route.bgp ||
        !route.bgp.large_communities) {
        return null;
    }

    const reason = route.bgp.large_communities.filter(elem =>
      elem[0] == this.props.asn && elem[1] == this.props.reject_id
    );
    if (!reason.length) {
      return null;
    }

    return <p className="reject-reason">{this.props.reject_reasons[reason[0][2]]}</p>;
  }
}

export default connect(
  state => {
    return {
      reject_reasons: state.routeservers.reject_reasons,
      asn:            state.routeservers.reject_asn,
      reject_id:      state.routeservers.reject_id,
    }
  }
)(FilterReason);


