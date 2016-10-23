
import React from 'react'


export default class SearchInput extends React.Component {
  render() {
    return(
      <div className="input-group">
         <span className="input-group-addon">
          <i className="fa fa-search"></i>
         </span>
         <input type="text" 
                className="form-control"
                value={this.props.value}
                placeholder={this.props.placeholder}
                onChange={this.props.onChange} />
      </div>
    );
  }
}


