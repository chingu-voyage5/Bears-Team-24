import React from 'react';
import ProTypes from 'prop-types';

class Collapsible extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isExpanded: false 
    }
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }
  render(){
    const {title, children} = this.props;
    const {isExpanded} = this.state;
    return (
      <div className={`panel ${isExpanded ? 'isExpanded' : ''}`} onClick={(e) => this.handleToggle(e)}>
        <div className="panel-heading">
          <h2>{title}</h2> 
        </div>
        <div className="panel-body">
          {children}
        </div>
      </div>
    )
  }
}

Collapsible.ProTypes = {
  title: ProTypes.string
}

export default Collapsible;