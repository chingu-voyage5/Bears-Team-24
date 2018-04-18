import React from 'react';
import PropTypes from 'prop-types';

class Collapsible extends React.Component {
  render() {
    const { title, children, open } = this.props;

    return (
      <details style={{ marginLeft: '1rem' }} open={open}>
        <summary>{title}</summary>
        {children}
      </details>
    );
  }
}

Collapsible.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Collapsible;
