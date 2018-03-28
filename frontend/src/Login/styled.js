import styled from 'styled-components';

export const ButtonLikeText = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin: 1rem;
`;

export const Fields = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 13rem;
  min-width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Heading2 = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

export const Wrapper = styled.div`
  align-items: center;
  box-shadow: 0 1px 2px 1px #aeaeae;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 2rem;
  width: 100%;
`;

export const Message = styled.div`
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  color: ${props => (props.error ? 'tomato' : 'gold')};
`;
