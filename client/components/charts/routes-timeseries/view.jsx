
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
		if (!this.props.timeseries) {
			return;
		}

		// Transform series
		let receivedSeries = [];
		let filteredSeries = [];
		for (let item of this.props.timeseries) {
			receivedSeries.push({x: item[0], y: item[1]});
			filteredSeries.push({x: item[0], y: item[2]});
		}

		let data = {
        datasets: [{
            label: 'Received',
						data: receivedSeries,
						steppedLine: true,
						borderColor: "#337ab7",
					  backgroundColor: "rgba(51, 122, 183, 0.32)",
						fill: false,
						borderWidth: 1.5,
						yAxisID: "received"
				},
				{
            label: 'Filtered',
						data: filteredSeries,
						steppedLine: true,
						borderColor: "#ffa500",
						backgroundColor: "rgba(255, 165, 0, 0.32)",
						fill: false,
						borderWidth: 1.5,
						yAxisID: "filtered"
				}]
		};

		let options = {
			scales: {
            xAxes: [{
                type: 'time',
                position: 'bottom',
								time: {
									tooltipFormat: "MMMM Do YYYY, h:mm:ss a"
								}
            }],
						yAxes: [
							{ type: 'linear', id: "received",
								ticks: {	stepSize: 1 }
							},
							{ type: 'linear', id: "filtered", position: "right",
								ticks: {	stepSize: 1 }
							},
						]
        }
		};

		let myChart = new Chart(this.ctx, {
				type: 'line',
				data: data,
				options: options
		});
	}

	render() {
		if (this.ctx) {
			this.drawChart();
		}

		return(
			<div className="routes-timeseries-chart">
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

