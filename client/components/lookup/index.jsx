
import React from 'react'
import {connect} from 'react-redux'

import SearchInput
  from 'components/search-input'

import LoadingIndicator
	from 'components/loading-indicator/small'

import {setQueryInputValue,
        routesSearch}
	from './actions'


import QueryDispatcher
  from './query-dispatcher'


class LookupView extends React.Component {

	setQuery(q) {
		this.props.dispatch(
			setQueryInputValue(q)
		);
	}

	render() {
        console.log(this.props);
		return (
			<div className="routes-lookup">
                <QueryDispatcher />

				<div className="card lookup-header">
					<SearchInput placeholder="Search for routes by entering a network address" 
						    	 onChange={(e) => this.setQuery(e.target.value)} 
                                 disabled={this.props.isSearching}
								 value={this.props.queryInput} />	
				</div>
				<LoadingIndicator show={this.props.isRunning} />	
				<div className="lookup-results">

				</div>
			</div>
		);
	}
}

export default connect(
	(state) => {
		return {
			isRunning: state.lookup.queryRunning,

            queryInput: state.lookup.queryInput,

			results: state.lookup.results,
            search: state.lookup.search,
            isSearching: state.lookup.isSearching,
            isFinished: state.lookup.isFinished
		}
	}
)(LookupView);

