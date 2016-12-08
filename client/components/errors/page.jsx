import React from 'react'
import {connect} from 'react-redux'

import {resetApiError} from './actions'

class ErrorsPage extends React.Component {

  resetApiError() {
    this.props.dispatch(resetApiError());
  }

  render() {
    if (this.props.error == null) {
      return null;
    }
    return(
      <div className="error-notify">
        <div className="error-icon">
          <i className="fa fa-times-circle" aria-hidden="true"></i>
        </div>
        <div className="error-message">
          <p>Birdseye has trouble connecting to the API.</p>
          <p>If this problem persist, we suggest you try again later.</p>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
      error: state.errors.error
  })
)(ErrorsPage);
