
import React from 'react'
import {connect} from 'react-redux'

import SearchInput
  from 'components/search-input'

import LoadingIndicator
	from 'components/loading-indicator/small'


class LookupView extends React.Component {

	render() {
		return (
			<div className="routes-lookup">
				<div className="card lookup-header">
					<SearchInput placeholder="Search for routes by entering a network address" />	
				</div>
				<LoadingIndicator show={this.props.isSearching} />	
				<div className="lookup-results">

				</div>
			</div>
		);
	}
}

export default connect(
	(state) => {
		return {
			results: [],
			isSearching: false,
		}
	}
)(LookupView);

