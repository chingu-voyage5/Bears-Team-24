import React from 'react';
import { LoadingPic } from './styled';

export default class Loading extends React.Component {
  render() {
    
    return (
      <div className='loading'>
      	<LoadingPic />
      	<p className='description'>Loading...</p>
      </div>
    );
  }
}
