import styled from 'styled-components';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import RootRef from '@material-ui/core/RootRef';
import Select from '@material-ui/core/Select';
import TextFieldMUI from '@material-ui/core/TextField';

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: 'flex-start';
  margin: 1rem auto;
`;

export const DragHandle = styled.div`
  background-color: orange;
  width: 100px;

  &:hover {
    background-color: darkorange;
  }
`;

export const TextField = styled(TextFieldMUI).attrs({
  fullWidth: true,
  margin: 'none',
})`
  & .pink {
    background-color: pink;
  }
`;

const TopicWrapperRaw = styled(Paper)`
  display: flex;
  flex-direction: column;
  margin: 16px auto;
  max-width: 768px;
  padding-top: 8px;
  padding-bottom: 16px;
  padding-left: ${p => (p.mobile ? 10 : 20)}px;
  padding-right: ${p => (p.mobile ? 50 : 0)}px;

  &:active {
    background-color: #e2e2e2;
  }

  &:hover {
    background-color: #f2f2f2;
  }
`;

// eslint-disable-next-line
export const TopicWrapper = ({ innerRef, ...rest }) => (
  <RootRef rootRef={innerRef}>
    <TopicWrapperRaw {...rest} />
  </RootRef>
);

export const SubTopicWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #eee;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1px;
  max-width: 500px;
  padding: 0;

  && {
    padding-left: 10px;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const SelectWrapper = styled(Select)`
  width: 200px;
  margin-bottom: 1rem;
`;

export const Wrapper = styled.div`
  cursor: default;
  display: flex;
  flex-direction: column;
  margin: auto;
  /* padding: 2rem 0; */
  max-width: 60rem;
  padding: ${p => (p.mobile ? 0 : '1rem')};
`;
