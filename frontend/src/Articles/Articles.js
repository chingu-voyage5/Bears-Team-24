import React from 'react';
import PropTypes from 'prop-types';

import actions from './actions';
import Row, { dataNames } from './Row';
import {
  Button,
  RowWrapper,
  Separator,
  TitleRowWrapper,
  Wrapper,
} from './styled';

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const renderRows = (arr, onClick) =>
  arr.map(d => (
    <RowWrapper
      href={`articles/${d._id}`}
      key={d._id}
      onClick={e => onClick(e, d._id)}
    >
      <Row
        topic={d.topic}
        subTopic={d.sub_topic}
        title={d.title}
        creator={d.creator.username}
      />
    </RowWrapper>
  ));

class Articles extends React.Component {
  state = {
    data: [],
  };
  componentDidMount = () => {
    actions.getAll().then(data => this.setState({ data }));
  };
  handleClick = (e, id) => {
    e.preventDefault();
    const { name } = e.target.dataset;
    if (name === dataNames.creator) {
      const articles = this.state.data.filter(row => row._id === id);
      const uid = articles[0].creator._id;
      this.props.history.push(`/users/${uid}`);
    } else {
      this.props.history.push(`${this.props.location.pathname}/${id}`);
    }
  };

  handleNewArticle = () => {
    this.props.history.push(`${this.props.location.pathname}/new`);
  };

  render() {
    return (
      <Wrapper>
        <Button onClick={this.handleNewArticle}>New Article</Button>
        <TitleRowWrapper>
          <Row
            topic="Topic"
            subTopic="Sub Topic"
            title="Title"
            creator="Owner"
          />
        </TitleRowWrapper>
        <Separator />
        {renderRows(this.state.data, this.handleClick)}
      </Wrapper>
    );
  }
}

Articles.propTypes = propTypes;

export default Articles;

export { renderRows };
