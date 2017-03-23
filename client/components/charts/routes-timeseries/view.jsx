
import React from 'react'
import {connect} from 'react-redux'


import {loadRoutesTimeseries} from './actions'

class TimeseriesView extends React.Component {

	componentDidMount() {
		this.props.dispatch(
			loadRoutesTimeseries(
				this.props.rsId,
				this.props.asn,
				this.props.neighbourAddress
			)
		);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.rsId != nextProps.rsId &&
				this.props.asn != nextProps.asn &&
				this.props.neighbourAddress != nextProps.neighbourAddress ) {

				this.props.dispatch(
					loadRoutesTimeseries(
						nextProps.rsId,
						nextProps.asn,
						nextProps.neighbourAddress
					)
				);
		}
	}

	render() {
		return(
			<div>
				Timeseries View... chart...
			</div>
		);
	}

}


export default connect(
	(state, ownProps) => {
		console.log(ownProps);
		let key = `${ownProps.rsId}_${ownProps.asn}_${ownProps.neighbourAddress}`;
		return {
			timeseries: state.charts.routes.series[key],
			isLoading:  state.charts.routes.seriesLoading[key],
			error:      state.charts.routes.seriesError[key],
		}
	},
)(TimeseriesView);

