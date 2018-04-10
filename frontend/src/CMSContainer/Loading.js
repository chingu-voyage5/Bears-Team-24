import React from 'react';
import Wait from './wait.png';

export default class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <div className='pic'>
        	<img src={Wait} alt="" />
        </div>
        <p className="description">Loading...</p>
      </div>
    );
  }
}
