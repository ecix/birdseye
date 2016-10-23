
/**
 * Show BGP attributes as a modal dialog
 *
 * @author Matthias Hannig <mha@ecix.net>
 */

import React from 'react'
import {connect} from 'react-redux'

import Modal, {Header, Body, Footer} from 'components/modal'

import {hideBgpAttributesModal}
  from './bgp-attributes-modal-actions'



class BgpAttributesModal extends React.Component {

  closeModal() {
    this.props.dispatch(
      hideBgpAttributesModal()
    );
  }

  render() {
    let attrs = this.props.bgpAttributes;
    if (!attrs.bgp) {
      return null;
    }

    let communities = attrs.bgp.communities.map((c) => {
      return('(' + c.join(', ') + ') ')
     });

    return (
      <Modal className="bgp-attributes-modal"
             show={this.props.show}
             onClickBackdrop={() => this.closeModal()}>

        <Header onClickClose={() => this.closeModal()}>
          <p>BGP Attributes for Network:</p>
          <h4>{attrs.network}</h4>
        </Header>

        <Body>
          <table className="table table-compact">
           <tbody>
            <tr>
              <th>Origin:</th><td>{attrs.bgp.origin}</td>
            </tr>
            <tr>
              <th>Local Pref:</th><td>{attrs.bgp.local_pref}</td>
            </tr>
            <tr>
              <th>Med:</th><td>{attrs.bgp.med}</td>
            </tr>
            <tr>
              <th>AS Path:</th><td>{attrs.bgp.as_path.join(', ')}</td>
            </tr>
            <tr>
              <th>Communities:</th>
              <td>{communities}</td>
            </tr>
           </tbody>
          </table>
        </Body>

        <Footer>
          <button className="btn btn-default"
                  onClick={() => this.closeModal()}>Close</button>
        </Footer>

      </Modal>
    );
  }
}

export default connect(
  (state) => {
    return {
      show: state.bgpAttributesModal.show,
      bgpAttributes: state.bgpAttributesModal.bgpAttributes
    }
  }
)(BgpAttributesModal);

