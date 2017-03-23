
import React from 'react'
import {connect} from 'react-redux'

import Chart from 'chart.js'

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

	drawChart() {
		var myChart = new Chart(this.ctx, {
				type: 'bar',
				data: {
						labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
						datasets: [{
								label: '# of Votes',
								data: [12, 19, 3, 5, 2, 3],
								backgroundColor: [
										'rgba(255, 99, 132, 0.2)',
										'rgba(54, 162, 235, 0.2)',
										'rgba(255, 206, 86, 0.2)',
										'rgba(75, 192, 192, 0.2)',
										'rgba(153, 102, 255, 0.2)',
										'rgba(255, 159, 64, 0.2)'
								],
								borderColor: [
										'rgba(255,99,132,1)',
										'rgba(54, 162, 235, 1)',
										'rgba(255, 206, 86, 1)',
										'rgba(75, 192, 192, 1)',
										'rgba(153, 102, 255, 1)',
										'rgba(255, 159, 64, 1)'
								],
								borderWidth: 1
						}]
				},
				options: {
						scales: {
								yAxes: [{
										ticks: {
												beginAtZero:true
										}
								}]
						}
				}
		});
	}

	render() {
		if (this.ctx) {
			this.drawChart();
		}

		return(
			<div className="routes-timeseries-chart">
				Timeseries View... chart...
				<canvas className="chart-view" ref={(el) => this.ctx = el}></canvas>
			</div>
		);
	}

}


export default connect(
	(state, ownProps) => {
		let key = `${ownProps.rsId}_${ownProps.asn}_${ownProps.neighbourAddress}`;
		return {
			timeseries: state.charts.routes.series[key],
			isLoading:  state.charts.routes.seriesLoading[key],
			error:      state.charts.routes.seriesError[key],
		}
	},
)(TimeseriesView);

