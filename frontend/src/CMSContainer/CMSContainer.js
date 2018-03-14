import React from 'react';
import ContentArea from '../ContentArea';
import Sidebar from '../Sidebar';
import { Wrapper } from './styled';

const CMSContainer = () => (
  <Wrapper>
    <Sidebar />
    <ContentArea />
  </Wrapper>
);

export default CMSContainer;
