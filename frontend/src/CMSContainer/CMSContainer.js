import React from 'react';
import ContentArea from '../ContentArea';
import Sidebar from '../Sidebar';
import { Wrapper } from './styled';
import * as operate from './operate';



const CMSContainer = (props) => {
	operate.checkLocalStorage();
	let {path} = props.match.params;
	
	
	return (
  <Wrapper>
    <Sidebar />
    <ContentArea path={path}/>
  </Wrapper>
)
};

export default CMSContainer;
