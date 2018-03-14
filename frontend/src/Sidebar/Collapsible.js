import React from 'react';
import PropTypes from 'prop-types';

class Collapsible extends React.Component {
  render() {
    const { title, children } = this.props;

    return (
      <details>
        <summary className="panel-heading">{title}</summary>
        <p className="panel-body">
          <a>{children}</a>
        </p>
      </details>
    );
  }
}

Collapsible.propTypes = {
  title: PropTypes.string,
};

export default Collapsible;
