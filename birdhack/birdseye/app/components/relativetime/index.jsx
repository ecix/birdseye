

import moment from 'moment'

import React from 'react'


export default class RelativeTime extends React.Component {

  render() {
    let time = moment(this.props.value);

    return (
      <span>{time.fromNow(this.props.suffix)}</span>
    )
  }
}



