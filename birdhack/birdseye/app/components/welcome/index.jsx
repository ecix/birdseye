
import React from 'react'

import PageHeader from 'components/page-header'

export default class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome-page">
       <PageHeader></PageHeader>

       <div className="jumbotron">
         <h1>Welcome to Birdseye!</h1>
         <p>Your friendly neighbourhood bird app</p>
       </div>
      </div>
    )
  }
}


