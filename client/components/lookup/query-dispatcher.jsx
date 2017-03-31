
import React from 'react'
import {connect} from 'react-redux'

import {QUERY_TYPE_UNKNOWN,
        QUERY_TYPE_PREFIX}
  from './query'

import {setQueryType,
        routesSearch}
  from './actions'


class QueryDispatcher extends React.Component {
    /*
     * Check if given query is a valid network address
     * with a lame regex if format resembles a network address.
     */
    isNetwork(query) {
        // IPv4:
        if (query.match(/(\d+\.)(\d+\.)(\d+\.)(\d+)\/(\d+)/)) {
            return true;
        }

        // IPv6:
        if (query.match(/([0-9a-fA-F]+:+)+\/\d+/)) {
            return true;
        }
        return false;
    }

    /*
     * Check if our query is ready
     */
    isQueryReady() {
        console.log("Checking state:", this.props);
        if (this.props.isRunning ||
            this.props.queryType == QUERY_TYPE_UNKNOWN) {
            return false;
        }
        return true;
    }


    executeQuery() {
        // Check if we should dispatch this query now
        if (!this.isQueryReady()){
            return;
        }

        for (let rs of this.props.routeservers) {
            // Debug: limit to rs20
            if (rs.id != 20) { continue; }
            console.log("DISPATCHING SEARCH FOR RS:", rs);
        }
    }


    /*
     * Handle Query Input, dispatches queryies to
     * all routeservers.
     */
    render() {
        if (this.props.isRunning) {
            return null; // Do nothing while a query is being processed
        }

        // Determine query type
        let queryType = QUERY_TYPE_UNKNOWN;
        if (this.isNetwork(this.props.input)) {
            queryType = QUERY_TYPE_PREFIX;
        }

        this.props.dispatch(setQueryType(queryType));

        // For now render a big button to start the query
        return (
            <button onClick={() => this.executeQuery()}>Lookup</button>
        );

    }
}


export default connect(
    (state) => {
        return {
            input: state.lookup.queryInput,

            queryType: state.lookup.queryType,

            isRunning: state.lookup.queryRunning,
            isFinished: state.lookup.queryFinished,

            routeserversQueue: state.lookup.routeserversQueue,
            routeservers: state.routeservers.all
        };
    }
)(QueryDispatcher);

