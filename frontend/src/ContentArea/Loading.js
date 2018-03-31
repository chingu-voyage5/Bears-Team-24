import React from 'react';

export default class Loading extends React.Component {
  render() {
    
    return (
      <div className='loading'>
      	<div className='pic'></div>
      	<p className='description'>Loading...</p>
      </div>
    );
  }
}
