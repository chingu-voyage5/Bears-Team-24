import React from 'react';
import PropTypes from 'prop-types';

class Collapsible extends React.Component { 
  state = { isExpanded: false }
  
  handleToggle = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }
  render(){
    const {title, children} = this.props;
    const {isExpanded} = this.state;
    
    return (
      <div className={`panel ${isExpanded ? 'isExpanded' : ''}`} onClick={this.handleToggle}>
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

Collapsible.propTypes = {
  title: PropTypes.string
}

export default Collapsible;