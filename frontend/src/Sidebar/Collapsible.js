import React from 'react';
import PropTypes from 'prop-types';

class Collapsible extends React.Component {
  render() {
    const { title, children } = this.props;

    return (
      <details>
        <summary className="panel-heading">{title}</summary>
        <p className="panel-body">{children}</p>
      </details>
    );
  }
}

Collapsible.propTypes = {
  children: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Collapsible;
