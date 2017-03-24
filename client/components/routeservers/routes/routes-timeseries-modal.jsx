
/**
 * Routes Timeseries Modal
 * Show the development of routes over time
 *
 * @author Matthias Hannig <mha@ecix.net>
 */

import React from 'react'
import {connect} from 'react-redux'

import {hideRoutesTimeseriesModal}
  from './routes-timeseries-modal-actions'

import Modal, {Header, Body, Footer} from 'components/modals/modal'

import RoutesTimeseriesView
	from 'components/charts/routes-timeseries/view'


class RoutesTimeseriesModal extends React.Component {
  closeModal() {
    this.props.dispatch(
      hideRoutesTimeseriesModal()
    );
  }

	render() {
		return (
			<Modal className="routes-timeseries-modal"
						 show={this.props.show}
						 onClickBackdrop={() => this.closeModal()}>
				<Header onClickClose={() => this.closeModal()}>
					<p>Routes over time for:</p>	
					<h4>{this.props.title}</h4>
				</Header>
				<Body>
				 <RoutesTimeseriesView rsId={this.props.rsId}
															 asn={this.props.asn}
															 neighbourAddress={this.props.neighbourAddress} />
				</Body>	
			</Modal>
		);
	}
}

export default connect(
	(state) => {
		return {
			show: state.modals.routesTimeseries.show,
			rsId: state.modals.routesTimeseries.rsId,
			asn:  state.modals.routesTimeseries.asn,
			neighbourAddress: state.modals.routesTimeseries.neighbourAddress,
		}
	}
)(RoutesTimeseriesModal);

