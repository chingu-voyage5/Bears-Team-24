import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, TextField, Wrapper } from './styled';

class Search extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchString: '',
  };

  handleChange = e => {
    const { value } = e.target;

    this.setState(() => ({ searchString: value }));
  };

  handleSubmit = e => {
    e.preventDefault();

    const { searchString } = this.state;
    const { onSubmit } = this.props;

    if (!searchString) return;

    onSubmit(searchString);

    this.setState(() => ({
      searchString: '',
    }));
  };

  render() {
    const { searchString } = this.state;

    return (
      <Wrapper>
        <form onSubmit={this.handleSubmit}>
          <TextField
            type="text"
            value={searchString}
            onChange={this.handleChange}
            data-testid="search-input"
          />
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            disabled={!searchString}
          >
            Search
          </Button>
        </form>
      </Wrapper>
    );
  }
}

export default Search;
