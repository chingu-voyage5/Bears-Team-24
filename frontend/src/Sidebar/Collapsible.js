import React from 'react';
import PropTypes from 'prop-types';

class Collapsible extends React.Component {
  render() {
    const { title, children } = this.props;

    return (
      <details style={{ marginLeft: '1rem' }}>
        <summary>{title}</summary>
        {children}
      </details>
    );
  }
}

Collapsible.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  title: PropTypes.string.isRequired,
};

export default Collapsible;
