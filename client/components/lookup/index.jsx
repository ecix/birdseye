
import React from 'react'
import {connect} from 'react-redux'

import SearchInput
  from 'components/search-input'

import LoadingIndicator
	from 'components/loading-indicator/small'

import {setQueryValue}
	from './actions'

class LookupView extends React.Component {

	setQuery(q) {
		this.props.dispatch(
			setQueryValue(q)
		);
	}

	render() {
		return (
			<div className="routes-lookup">
				<div className="card lookup-header">
					<SearchInput placeholder="Search for routes by entering a network address" 
											 onChange={(e) => this.setQuery(e.target.value)} 
											 value={this.props.query} />	
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
			results: state.lookup.results,
			isSearching: state.lookup.isSearching,
			query: state.lookup.query,
		}
	}
)(LookupView);

