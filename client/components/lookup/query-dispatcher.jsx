
import React from 'react'
import {connect} from 'react-redux'

import {QUERY_TYPE_PREFIX}
  from './query'


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
    isQueryReady(query) {
        if (_isNetwork(query)) {
            return true;
        }
        return false;
    }


    executeQuery() {
        for (let rs of this.props.routeservers) {
            console.log("DISPATCHING SEARCH FOR RS:", rs);
        }
    }
    

    /*
     * Handle Query Input, dispatches queryies to
     * all routeservers.
     */
    render() {
        if (this.props.isRunning) {
            return null; // Do nothing while a query is being
                         // processed.
        }

        // Set input type 
        if (this.isNetwork(this.props.input) &&
            this.props.queryType != QUERY_TYPE_PREFIX) {
                this.props.dispatch(
                    setQueryType(QUERY_TYPE_PREFIX)
                );
        }

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

