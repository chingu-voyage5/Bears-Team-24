import React from 'react';
import PropTypes from 'prop-types';
import SingleArticle from './SingleArticle';
import Topic from './Topic';
import Root from './Root';


export default class ContentArea extends React.Component {
  render() {
    const { path } = this.props;
    let view = 'none';
    const id = JSON.parse(localStorage.getItem('pathTable'))[path] || '';

    if (id) {
      // exists id for that path

      view = <SingleArticle id={id} />;
    } else if (path) {
      // illegal path - article id not found, check one level up topic
      view = <Topic path={path} />;
    } else {
      // no additional path - we are at /cms page
      view = <Root />;
    }

    return (
      <div>
        <section className="content-area">{view}</section>
      </div>
    );
  }
}

ContentArea.propTypes = {
  path: PropTypes.string,
};

ContentArea.defaultProps = {
  path: '',
};
