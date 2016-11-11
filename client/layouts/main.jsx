
import React   from 'react'
import Sidebar from 'components/sidebar'

export default class LayoutMain extends React.Component {
  render() {
    return (
      <div className="page">
        <Sidebar />
        <div className="page-body">
          <main className="page-content">
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}

