import styled from 'styled-components';

export const CloseButton = styled.button`
  align-self: center;
  background-color: transparent;
  border: 1px solid gray;
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  margin: 0.5rem;
  max-width: 250px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SearchStatus = styled.div`
  margin-top: 1rem;
  text-align: center;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  padding-top: 10px;
`;

export default Wrapper;
